import { useEffect, useRef } from 'react';
import type { FacingMode } from '../utils/camera';

interface CameraPreviewProps {
  stream: MediaStream | null;
  facing: FacingMode;
  mirrored: boolean;
  onSwitchCamera: () => void;
  onToggleMirror: () => void;
  disabled?: boolean;
}

export function CameraPreview({
  stream,
  facing,
  mirrored,
  onSwitchCamera,
  onToggleMirror,
  disabled = false,
}: CameraPreviewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => {
        console.warn('[CameraPreview] Video play interrupted:', err);
      });
    }
  }, [stream]);

  return (
    <div className="relative aspect-[3/4] max-h-[50dvh] sm:max-h-[55dvh] w-auto max-w-sm sm:max-w-md mx-auto rounded-3xl overflow-hidden bg-noir-800 shadow-2xl border border-white/10 flex items-center justify-center">
      {/* Live Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-transform duration-200 ${
          mirrored ? '-scale-x-100' : 'scale-x-100'
        }`}
      />

      {/* Viewfinder Aesthetic Framing */}
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
        {/* Top Viewfinder Markers */}
        <div className="flex justify-between items-start">
          <div className="w-6 h-6 border-t-2 border-l-2 border-white/60 rounded-tl-lg" />
          <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white/90 border border-white/10 tracking-widest uppercase">
            LIVE • {facing === 'user' ? 'FRONT' : 'BACK'}
          </div>
          <div className="w-6 h-6 border-t-2 border-r-2 border-white/60 rounded-tr-lg" />
        </div>

        {/* Center Crosshair (Subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-white/50 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 h-8 w-[1px] bg-white/50 -translate-x-1/2" />
        </div>

        {/* Bottom Viewfinder Markers */}
        <div className="flex justify-between items-end">
          <div className="w-6 h-6 border-b-2 border-l-2 border-white/60 rounded-bl-lg" />
          <div className="w-6 h-6 border-b-2 border-r-2 border-white/60 rounded-br-lg" />
        </div>
      </div>

      {/* Floating Camera Controls Toolbar */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        {/* Switch Camera Button */}
        <button
          type="button"
          onClick={onSwitchCamera}
          disabled={disabled}
          title="Ganti Kamera (Depan / Belakang)"
          className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-base shadow-lg transition-transform active:scale-90 disabled:opacity-50"
        >
          🔄
        </button>

        {/* Mirror Toggle Button */}
        <button
          type="button"
          onClick={onToggleMirror}
          disabled={disabled}
          title="Cermin Kamera (Mirror)"
          className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center text-sm shadow-lg transition-transform active:scale-90 disabled:opacity-50 ${
            mirrored ? 'bg-coral-500/80 text-white' : 'bg-black/50 text-white/70 hover:bg-black/70'
          }`}
        >
          🪞
        </button>
      </div>
    </div>
  );
}
