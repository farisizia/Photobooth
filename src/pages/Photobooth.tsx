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
  const templateId = searchParams.get('template') || 'classic-strip';
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

  // Capture session state
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [countdownValue, setCountdownValue] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);

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

  // Capture single frame from the active video stream
  const captureCurrentFrame = (): string | null => {
    const video = containerRef.current?.querySelector('video');
    if (!video) return null;
    return CameraService.captureFrame(video, mirrored);
  };

  // Run the automated photobooth sequence matching template slot count
  const startPhotoSession = async () => {
    if (state === 'capturing') return;

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
      const frame = captureCurrentFrame();
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

  // Reset to live camera mode
  const handleRetake = () => {
    clearCapturedPhotos();
    setPhotos([]);
    setCurrentShotIndex(0);
    setCountdownValue(null);
    setIsFlashing(false);
    setState('ready');
    initCamera(facing);
  };

  return (
    <div className="h-[100dvh] min-h-screen bg-[#0C0D12] text-white flex flex-col justify-between overflow-y-auto pt-safe pb-safe selection:bg-coral-500">
      {/* Photobooth Header */}
      <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/10 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <Link
          to="/templates"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-gray-300 hover:text-white transition-all active:scale-95"
        >
          <span>←</span>
          <span>Ganti Template</span>
        </Link>

        <div className="text-center">
          <span className="font-display font-bold text-sm sm:text-base tracking-wider text-white">
            {template.name}
          </span>
          <span className="block text-[9px] font-semibold text-coral-400 tracking-widest uppercase">
            {totalShots} SLOT FOTO
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
            {state === 'ready'
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
      <main className="flex-1 min-h-0 flex flex-col justify-center items-center px-4 py-2 sm:py-4 pb-8 sm:pb-12 max-w-2xl mx-auto w-full">
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
          <div className="flex flex-col items-center justify-center w-full animate-fade-in my-auto">
            {/* Viewfinder Frame with Countdown Overlay */}
            <div ref={containerRef} className="relative w-auto flex justify-center items-center">
              <CameraPreview
                stream={stream}
                facing={facing}
                mirrored={mirrored}
                onSwitchCamera={handleSwitchCamera}
                onToggleMirror={handleToggleMirror}
                disabled={state === 'capturing'}
              />

              <Countdown
                count={countdownValue}
                photoIndex={currentShotIndex}
                isFlashing={isFlashing}
              />
            </div>

            {/* Shutter Button & Status */}
            <CaptureButton
              onStart={startPhotoSession}
              isCapturing={state === 'capturing'}
              photoIndex={currentShotIndex}
              totalPhotos={totalShots}
              disabled={!stream}
            />
          </div>
        )}

        {/* Result & Template Editor */}
        {state === 'result' && (
          <div className="space-y-6 w-full animate-fade-in">
            <PhotoGrid photos={photos} />
            <PhotoTemplate
              photos={photos}
              template={template}
              onRetake={handleRetake}
            />
          </div>
        )}
      </main>
    </div>
  );
}
