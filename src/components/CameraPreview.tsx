import { useEffect, useRef, useState } from 'react';
import {
  SwitchCamera,
  Zap,
  Grid3X3,
  FlipHorizontal,
  Wand2,
} from 'lucide-react';
import type { FacingMode } from '../utils/camera';
import { CameraFilter } from '../utils/filters';
import { OverlayItem } from '../utils/overlays';

interface CameraPreviewProps {
  stream: MediaStream | null;
  facing: FacingMode;
  mirrored: boolean;
  onSwitchCamera: () => void;
  onToggleMirror: () => void;
  disabled?: boolean;
  selectedFilter: CameraFilter;
  onSelectFilter: (filter: CameraFilter) => void;
  selectedOverlay: OverlayItem;
  onSelectOverlay: (overlay: OverlayItem) => void;
  templateName?: string;
  templateSlots?: number;
  lightingBoost?: boolean;
  onToggleLighting?: () => void;
  arCanvasRef?: React.RefObject<HTMLCanvasElement>;
  showFilterTray?: boolean;
  onToggleFilterTray?: () => void;
}

export function CameraPreview({
  stream,
  facing,
  mirrored,
  onSwitchCamera,
  onToggleMirror,
  disabled = false,
  selectedFilter,
  onSelectFilter: _onSelectFilter,
  selectedOverlay,
  onSelectOverlay: _onSelectOverlay,
  templateName,
  templateSlots,
  lightingBoost = false,
  onToggleLighting,
  showFilterTray,
  onToggleFilterTray,
}: CameraPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [internalShowFilterTray, setInternalShowFilterTray] = useState(false);
  const isTrayOpen = showFilterTray !== undefined ? showFilterTray : internalShowFilterTray;
  const toggleTray = onToggleFilterTray || (() => setInternalShowFilterTray((prev) => !prev));
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => {
        console.warn('[CameraPreview] Video play interrupted:', err);
      });
    }
  }, [stream]);

  // Close filter tray automatically when countdown or capture starts
  useEffect(() => {
    if (disabled && internalShowFilterTray) {
      setInternalShowFilterTray(false);
    }
  }, [disabled, internalShowFilterTray]);

  // Combine active color filter and lighting boost for live preview
  const liveVideoFilter = [
    selectedFilter.cssFilter !== 'none' ? selectedFilter.cssFilter : '',
    lightingBoost ? 'brightness(1.14) contrast(1.06) saturate(1.04)' : '',
  ].filter(Boolean).join(' ') || 'none';

  return (
    <div
      ref={containerRef}
      className={`camera-preview-box relative mx-auto rounded-3xl overflow-hidden bg-[#0a0a0f] shadow-2xl border border-white/15 flex items-center justify-center select-none transition-shadow duration-300 ${
        lightingBoost ? 'ring-4 ring-amber-300/40 shadow-[0_0_50px_rgba(251,191,36,0.22)]' : ''
      }`}
    >
      {/* Live Video Feed with real-time CSS filter & lighting */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ filter: liveVideoFilter }}
        className={`w-full h-full object-cover transition-[transform,filter] duration-200 ${
          mirrored ? '-scale-x-100' : 'scale-x-100'
        }`}
      />

      {/* Static Full-Frame Graphic Overlay (Bunga / Bingkai / Stiker) */}
      {selectedOverlay.url && (
        <img
          src={selectedOverlay.url}
          alt={selectedOverlay.name}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 animate-fade-in"
        />
      )}

      {/* 3x3 Rule-of-Thirds Grid Overlay (Toggleable) */}
      {showGrid && (
        <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10 transition-opacity">
          <div className="border-r border-b border-white/20" />
          <div className="border-r border-b border-white/20" />
          <div className="border-b border-white/20" />
          <div className="border-r border-b border-white/20" />
          <div className="border-r border-b border-white/20" />
          <div className="border-b border-white/20" />
          <div className="border-r border-b border-white/20" />
          <div className="border-r border-b border-white/20" />
          <div />
        </div>
      )}

      {/* Viewfinder Aesthetic Framing Corners */}
      <div className="absolute inset-0 pointer-events-none p-3.5 sm:p-4 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div className="w-5 h-5 border-t-2 border-l-2 border-white/50 rounded-tl-lg" />
          <div className="w-5 h-5 border-t-2 border-r-2 border-white/50 rounded-tr-lg" />
        </div>
        <div className="flex justify-between items-end">
          <div className="w-5 h-5 border-b-2 border-l-2 border-white/50 rounded-bl-lg" />
          <div className="w-5 h-5 border-b-2 border-r-2 border-white/50 rounded-br-lg" />
        </div>
      </div>

      {/* Top Bar (Di dalam viewfinder): Badge LIVE & Info Template Aktif */}
      <div className="absolute top-0 inset-x-0 p-3 sm:p-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex flex-col gap-1 items-start pointer-events-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE • {facing === 'user' ? 'FRONT' : 'BACK'}</span>
          </div>

          {templateName && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-semibold text-rose-300 shadow-sm">
              <span className="truncate max-w-[130px]">{templateName}</span>
              {templateSlots && <span>• {templateSlots} Foto</span>}
            </div>
          )}
        </div>
      </div>

      {/* Right Action Bar (Sisi Kanan Kamera) - Uniform Glassmorphism & Minimal Vector Icons */}
      <div className="absolute right-3 top-3 sm:top-4 flex flex-col gap-2.5 z-20">
        {/* 1. Switch Camera: SwitchCamera */}
        <button
          type="button"
          onClick={onSwitchCamera}
          disabled={disabled}
          title="Ganti Kamera (Depan / Belakang)"
          aria-label="Ganti Kamera"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 disabled:opacity-50 backdrop-blur-md ${
            facing === 'environment'
              ? 'bg-black/50 border border-rose-400/80 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.35)] ring-1 ring-rose-400/50'
              : 'bg-black/40 hover:bg-black/60 border border-white/15 text-white shadow-sm'
          }`}
        >
          <SwitchCamera className="w-5 h-5" strokeWidth={1.8} />
        </button>

        {/* 2. Lighting / Flash: Zap */}
        <button
          type="button"
          onClick={onToggleLighting}
          disabled={disabled}
          title={lightingBoost ? 'Matikan Beauty Lighting' : 'Nyalakan Beauty Lighting'}
          aria-label="Beauty Lighting"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 disabled:opacity-50 backdrop-blur-md ${
            lightingBoost
              ? 'bg-black/50 border border-rose-400/80 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.35)] ring-1 ring-rose-400/50'
              : 'bg-black/40 hover:bg-black/60 border border-white/15 text-white shadow-sm'
          }`}
        >
          <Zap className="w-5 h-5" strokeWidth={1.8} />
        </button>

        {/* 3. Grid / Kisi: Grid3X3 */}
        <button
          type="button"
          onClick={() => setShowGrid((prev) => !prev)}
          disabled={disabled}
          title={showGrid ? 'Sembunyikan Grid Pemandu' : 'Tampilkan Grid Pemandu (Rule of Thirds)'}
          aria-label="Grid Pemandu"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 disabled:opacity-50 backdrop-blur-md ${
            showGrid
              ? 'bg-black/50 border border-rose-400/80 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.35)] ring-1 ring-rose-400/50'
              : 'bg-black/40 hover:bg-black/60 border border-white/15 text-white shadow-sm'
          }`}
        >
          <Grid3X3 className="w-5 h-5" strokeWidth={1.8} />
        </button>

        {/* 4. Selfie Mirror: FlipHorizontal */}
        <button
          type="button"
          onClick={onToggleMirror}
          disabled={disabled}
          title={mirrored ? 'Matikan Cermin (Mirror)' : 'Nyalakan Cermin (Mirror)'}
          aria-label="Cermin Kamera"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 disabled:opacity-50 backdrop-blur-md ${
            mirrored
              ? 'bg-black/50 border border-rose-400/80 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.35)] ring-1 ring-rose-400/50'
              : 'bg-black/40 hover:bg-black/60 border border-white/15 text-white shadow-sm'
          }`}
        >
          <FlipHorizontal className="w-5 h-5" strokeWidth={1.8} />
        </button>

        {/* 5. Filter & Effect Drawer: Wand2 */}
        <button
          type="button"
          onClick={toggleTray}
          disabled={disabled}
          title={isTrayOpen ? 'Tutup Panel Filter' : 'Buka 100+ Katalog Filter & Efek'}
          aria-label="Katalog Filter & Efek"
          className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 disabled:opacity-50 backdrop-blur-md ${
            isTrayOpen || selectedFilter.id !== 'normal' || selectedOverlay.id !== 'none'
              ? 'bg-black/50 border border-rose-400/80 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.35)] ring-1 ring-rose-400/50'
              : 'bg-black/40 hover:bg-black/60 border border-white/15 text-white shadow-sm'
          }`}
        >
          <Wand2 className="w-5 h-5" strokeWidth={1.8} />
          {(selectedFilter.id !== 'normal' || selectedOverlay.id !== 'none') && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
          )}
        </button>
      </div>

      {/* Pill Filter & Efek Aktif (Bagian Bawah Viewfinder - Klik untuk Buka/Tutup Tray) */}
      {!disabled && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none animate-fade-in px-4">
          <button
            type="button"
            onClick={toggleTray}
            className="pointer-events-auto inline-flex items-center gap-1.5 max-w-full px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all group overflow-hidden"
          >
            <Wand2 className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-12 transition-transform flex-shrink-0" strokeWidth={2} />
            <span className="text-gray-200 truncate">
              {selectedFilter.id !== 'normal' ? selectedFilter.name : 'Normal'}
            </span>
            {selectedOverlay.id !== 'none' && (
              <>
                <span className="text-white/40">•</span>
                <span className="text-rose-300 truncate">{selectedOverlay.name}</span>
              </>
            )}
            <span className="text-[10px] text-gray-400 ml-0.5 transition-transform flex-shrink-0">
              {isTrayOpen ? '▼' : '▲'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
