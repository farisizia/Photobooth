import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CameraService, FacingMode } from '../utils/camera';
import { CameraPreview } from '../components/CameraPreview';
import { Countdown } from '../components/Countdown';
import { CaptureButton } from '../components/CaptureButton';
import { PhotoGrid } from '../components/PhotoGrid';
import { PhotoTemplate } from '../components/PhotoTemplate';
import { getTemplateById } from '../utils/templates';
import {
  getCapturedPhotos,
  saveCapturedPhotos,
  clearCapturedPhotos,
} from '../utils/storage';
import { CameraFilter, DEFAULT_FILTER } from '../utils/filters';
import { OverlayItem, DEFAULT_OVERLAY } from '../utils/overlays';
import { FilterOverlayTray } from '../components/FilterOverlayTray';

type PhotoboothState = 'camera-request' | 'ready' | 'capturing' | 'result' | 'error';

// Web Audio API soft sound generator (zero asset dependency)
const playSound = (type: 'beep' | 'shutter') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'beep') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else {
      // Shutter click sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch {
    // Silent fail if AudioContext is blocked by browser policy
  }
};

export function PhotoboothPage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'korean-4cut-classic';
  const template = getTemplateById(templateId);
  const totalShots = template.slots;

  // Check if photos were already taken in this session
  const [photos, setPhotos] = useState<string[]>(() => getCapturedPhotos());
  const [state, setState] = useState<PhotoboothState>(() =>
    getCapturedPhotos().length > 0 ? 'result' : 'camera-request'
  );

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facing, setFacing] = useState<FacingMode>('user');
  const [mirrored, setMirrored] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<CameraFilter>(DEFAULT_FILTER);
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayItem>(DEFAULT_OVERLAY);
  const [lightingBoost, setLightingBoost] = useState(false);
  const [retakeTargetIndex, setRetakeTargetIndex] = useState<number | null>(null);

  // Capture session state
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [countdownValue, setCountdownValue] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [showFilterTray, setShowFilterTray] = useState(false);

  // Video container reference for taking snapshots
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize camera
  const initCamera = useCallback(async (targetFacing: FacingMode = 'user') => {
    try {
      setErrorMessage(null);
      const mediaStream = await CameraService.requestCamera(targetFacing);
      setStream(mediaStream);
      setFacing(targetFacing);
      setMirrored(targetFacing === 'user');
      setState('ready');
    } catch (err) {
      console.error('[Photobooth] Camera init error:', err);
      setErrorMessage(CameraService.getFriendlyErrorMessage(err));
      setState('error');
    }
  }, []);

  // Request camera on mount only if photos don't already exist
  useEffect(() => {
    if (getCapturedPhotos().length === 0) {
      initCamera('user');
    }
    return () => {
      CameraService.stopCamera();
    };
  }, [initCamera]);

  // Switch between front and rear cameras
  const handleSwitchCamera = async () => {
    if (state === 'capturing') return;
    const nextFacing: FacingMode = facing === 'user' ? 'environment' : 'user';
    await initCamera(nextFacing);
  };

  const handleToggleMirror = () => {
    setMirrored((prev) => !prev);
  };

  // Capture single frame from the active video stream with active filter, lighting, and overlay
  const captureCurrentFrame = async (): Promise<string | null> => {
    const video = containerRef.current?.querySelector('video');
    if (!video) return null;

    const combinedFilter = [
      selectedFilter.cssFilter !== 'none' ? selectedFilter.cssFilter : '',
      lightingBoost ? 'brightness(1.14) contrast(1.06) saturate(1.04)' : '',
    ].filter(Boolean).join(' ') || 'none';
    return await CameraService.captureFrame(
      video,
      mirrored,
      combinedFilter,
      selectedOverlay.url
    );
  };

  // Run automated photobooth sequence (full session or single retake)
  const startPhotoSession = async () => {
    if (state === 'capturing') return;
    setShowFilterTray(false);

    // SINGLE PHOTO RETAKE MODE
    if (retakeTargetIndex !== null) {
      setState('capturing');
      setCurrentShotIndex(retakeTargetIndex);

      // Countdown: 3, 2, 1
      for (let sec = 3; sec >= 1; sec--) {
        setCountdownValue(sec);
        playSound('beep');
        await new Promise((r) => setTimeout(r, 1000));
      }

      // 0 = Snap trigger
      setCountdownValue(0);
      playSound('shutter');
      setIsFlashing(true);

      const frame = await captureCurrentFrame();
      await new Promise((r) => setTimeout(r, 300));
      setIsFlashing(false);
      setCountdownValue(null);

      if (frame) {
        setPhotos((prev) => {
          const updated = [...prev];
          if (retakeTargetIndex < updated.length) {
            updated[retakeTargetIndex] = frame;
          } else {
            updated.push(frame);
          }
          saveCapturedPhotos(updated);
          return updated;
        });
      }

      setRetakeTargetIndex(null);
      setState('result');
      return;
    }

    // FULL SESSION MULTI-SHOT MODE
    setPhotos([]);
    setCurrentShotIndex(0);
    setState('capturing');

    const capturedPhotos: string[] = [];

    for (let shot = 0; shot < totalShots; shot++) {
      setCurrentShotIndex(shot);

      // Countdown: 3, 2, 1
      for (let sec = 3; sec >= 1; sec--) {
        setCountdownValue(sec);
        playSound('beep');
        await new Promise((r) => setTimeout(r, 1000));
      }

      // 0 = Snap trigger
      setCountdownValue(0);
      playSound('shutter');
      setIsFlashing(true);

      // Capture frame
      const frame = await captureCurrentFrame();
      if (frame) {
        capturedPhotos.push(frame);
        setPhotos([...capturedPhotos]);
      }

      // Hold flash for 300ms
      await new Promise((r) => setTimeout(r, 300));
      setIsFlashing(false);
      setCountdownValue(null);

      // 2 seconds breathing room between shots (except after the last one)
      if (shot < totalShots - 1) {
        await new Promise((r) => setTimeout(r, 1800));
      }
    }

    // Sequence completed -> save to storage and transition to Result view
    saveCapturedPhotos(capturedPhotos);
    setState('result');
  };

  // Single photo retake (opens camera specifically for slot index)
  const handleRetakeSingle = (index: number) => {
    setRetakeTargetIndex(index);
    setCurrentShotIndex(index);
    setState('ready');
    initCamera(facing);
  };

  // Delete single photo from slot
  const handleDeleteSingle = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    saveCapturedPhotos(updated);
  };

  // Reorder photos (drag & drop or arrows)
  const handleReorderPhotos = (newPhotos: string[]) => {
    setPhotos(newPhotos);
    saveCapturedPhotos(newPhotos);
  };

  // Add photo into next empty slot
  const handleAddMissingPhoto = () => {
    const nextIdx = photos.length;
    setRetakeTargetIndex(nextIdx);
    setCurrentShotIndex(nextIdx);
    setState('ready');
    initCamera(facing);
  };

  // Cancel single retake and return to result screen safely
  const handleCancelRetake = () => {
    setRetakeTargetIndex(null);
    setState('result');
  };

  // Reset full session to live camera mode
  const handleRetake = () => {
    clearCapturedPhotos();
    setPhotos([]);
    setRetakeTargetIndex(null);
    setCurrentShotIndex(0);
    setCountdownValue(null);
    setIsFlashing(false);
    setState('ready');
    initCamera(facing);
  };

  return (
    <div
      className={`min-h-[100dvh] bg-[#0C0D12] text-white flex flex-col justify-between pt-safe pb-safe selection:bg-coral-500 ${
        state === 'result' || showFilterTray ? 'overflow-y-auto' : 'h-[100dvh] overflow-hidden'
      }`}
    >
      {/* Photobooth Header */}
      <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/10 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          {retakeTargetIndex !== null ? (
            <button
              type="button"
              onClick={handleCancelRetake}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-rose-300 hover:text-white border border-rose-500/30 transition-all active:scale-95"
            >
              <span>✕</span>
              <span>Batal Ubah Foto</span>
            </button>
          ) : (
            <Link
              to="/templates"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-gray-300 hover:text-white transition-all active:scale-95"
            >
              <span>←</span>
              <span className="hidden sm:inline">Ganti Template</span>
            </Link>
          )}
          <Link to="/" className="hidden xs:flex items-center gap-1.5 hover:opacity-90 transition-opacity" title="IziaPhoto Home">
            <img src="/logo-icon.png" alt="IziaPhoto" className="w-7 h-7 rounded-md object-contain" />
          </Link>
        </div>

        <div className="text-center">
          <span className="font-display font-bold text-sm sm:text-base tracking-wider text-white">
            {retakeTargetIndex !== null ? `UBAH FOTO #${retakeTargetIndex + 1}` : template.name}
          </span>
          <span className="block text-[9px] font-semibold text-coral-400 tracking-widest uppercase">
            {retakeTargetIndex !== null ? `PENGGANTI SLOT #${retakeTargetIndex + 1}` : `${totalShots} SLOT FOTO`}
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-300">
          <span
            className={`w-2 h-2 rounded-full ${
              state === 'ready'
                ? 'bg-emerald-400 animate-pulse'
                : state === 'capturing'
                ? 'bg-coral-500 animate-ping'
                : state === 'result'
                ? 'bg-purple-400'
                : 'bg-amber-400'
            }`}
          />
          <span className="capitalize hidden sm:inline">
            {retakeTargetIndex !== null
              ? state === 'capturing' ? 'Mengambil Foto...' : 'Siap Ubah Foto'
              : state === 'ready'
              ? 'Ready'
              : state === 'capturing'
              ? 'Taking Photo'
              : state === 'result'
              ? 'Finished'
              : 'Standby'}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="photobooth-main-stage flex-1 min-h-0 flex flex-col justify-between items-center px-3 sm:px-4 py-1 sm:py-2 mx-auto w-full">
        {/* Permission Request / Error State */}
        {(state === 'camera-request' || state === 'error') && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center max-w-md mx-auto my-auto animate-fade-in shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-coral-500/10 border border-coral-400/20 text-3xl flex items-center justify-center mx-auto mb-5">
              📷
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Camera Access Required
            </h2>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              {errorMessage || 'Allow camera access to start your photobooth.'}
            </p>

            <button
              type="button"
              onClick={() => initCamera(facing)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-coral-500 to-rose-500 font-bold text-white shadow-lg shadow-coral-500/25 active:scale-95 transition-all"
            >
              Enable Camera
            </button>

            {state === 'error' && (
              <p className="text-[11px] text-gray-400 mt-4 leading-normal">
                Tips: Jika diakses lewat IP LAN / HP, pastikan membuka via <strong>HTTPS</strong> atau gunakan <strong>http://localhost:5173</strong>.
              </p>
            )}
          </div>
        )}

        {/* Live View & Capture Session */}
        {(state === 'ready' || state === 'capturing') && (
          <div className="flex flex-col items-center w-full animate-fade-in flex-1 min-h-0">
            {/* Viewfinder Frame with Countdown Overlay */}
            <div ref={containerRef} className="relative w-full flex-shrink-0 flex justify-center items-center my-auto min-h-0">
              <CameraPreview
                stream={stream}
                facing={facing}
                mirrored={mirrored}
                onSwitchCamera={handleSwitchCamera}
                onToggleMirror={handleToggleMirror}
                disabled={state === 'capturing'}
                selectedFilter={selectedFilter}
                onSelectFilter={setSelectedFilter}
                selectedOverlay={selectedOverlay}
                onSelectOverlay={setSelectedOverlay}
                templateName={
                  retakeTargetIndex !== null
                    ? `Ubah Foto #${retakeTargetIndex + 1}`
                    : template.name
                }
                templateSlots={retakeTargetIndex !== null ? 1 : totalShots}
                lightingBoost={lightingBoost}
                onToggleLighting={() => setLightingBoost((prev) => !prev)}
                showFilterTray={showFilterTray}
                onToggleFilterTray={() => setShowFilterTray((prev) => !prev)}
              />

              <Countdown
                count={countdownValue}
                photoIndex={currentShotIndex}
                isFlashing={isFlashing}
                totalPhotos={retakeTargetIndex !== null ? 1 : totalShots}
              />
            </div>

            {/* Effect / Filter Picker (In normal document flow, placed directly beneath camera preview) */}
            {showFilterTray && state !== 'capturing' && (
              <div className="photobooth-tray-stage w-full mx-auto my-2.5 z-20 flex-shrink-0 animate-fade-in">
                <FilterOverlayTray
                  selectedFilter={selectedFilter}
                  onSelectFilter={setSelectedFilter}
                  selectedOverlay={selectedOverlay}
                  onSelectOverlay={setSelectedOverlay}
                  onClose={() => setShowFilterTray(false)}
                />
              </div>
            )}

            {/* Shutter Button & Status in Thumb Zone */}
            <div className="w-full flex-shrink-0 pt-1.5 pb-safe mt-auto">
              <CaptureButton
                onStart={startPhotoSession}
                isCapturing={state === 'capturing'}
                photoIndex={currentShotIndex}
                totalPhotos={totalShots}
                disabled={!stream}
                isSingleRetake={retakeTargetIndex !== null}
                retakeSlotIndex={retakeTargetIndex ?? undefined}
                onCancelRetake={handleCancelRetake}
              />
            </div>
          </div>
        )}

        {/* Result & Template Editor */}
        {state === 'result' && (
          <div className="space-y-6 w-full animate-fade-in py-4">
            <PhotoGrid
              photos={photos}
              totalSlots={totalShots}
              onRetakePhoto={handleRetakeSingle}
              onDeletePhoto={handleDeleteSingle}
              onReorderPhotos={handleReorderPhotos}
              onAddPhoto={handleAddMissingPhoto}
            />
            <PhotoTemplate
              photos={photos}
              template={template}
              onRetake={handleRetake}
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              selectedOverlay={selectedOverlay}
              onSelectOverlay={setSelectedOverlay}
            />
          </div>
        )}
      </main>
    </div>
  );
}
