interface CountdownProps {
  count: number | null; // 3, 2, 1, or 0 (flash)
  photoIndex: number; // 0, 1, 2, 3
  isFlashing: boolean;
  totalPhotos?: number;
}

export function Countdown({ count, photoIndex, isFlashing, totalPhotos = 4 }: CountdownProps) {
  return (
    <>
      {/* Camera White Flash Overlay */}
      {isFlashing && (
        <div className="absolute inset-0 bg-white z-50 animate-flash pointer-events-none rounded-3xl" />
      )}

      {/* Photobooth Active Capture Tally Glow (Border perimeter only - ZERO obstruction of face) */}
      {count !== null && count > 0 && (
        <div className="absolute inset-0 z-30 rounded-3xl ring-4 ring-rose-500/70 shadow-[inset_0_0_24px_rgba(244,63,94,0.25)] pointer-events-none animate-pulse" />
      )}

      {/* Top Floating Countdown HUD (Safe zone at top of camera, away from faces) */}
      {count !== null && count > 0 && (
        <div className="absolute top-3 sm:top-4 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-2xl animate-scale-in">
            {/* Animated Countdown Circle Badge */}
            <div className="relative flex items-center justify-center flex-shrink-0">
              <div className="absolute -inset-1 rounded-full bg-rose-500/40 animate-ping" />
              <div
                key={count}
                className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-coral-500 via-rose-500 to-pink-500 text-white font-display font-black text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white/60 animate-scale-in"
              >
                {count}
              </div>
            </div>

            {/* Information Text */}
            <div className="flex flex-col text-left pr-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse flex-shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-rose-300">
                  Foto {photoIndex + 1} dari {totalPhotos}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                {count === 1 ? 'Senyum! 😊' : 'Bersiap... ✨'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Instant Shutter Snap Moment */}
      {count === 0 && (
        <div className="absolute top-3 sm:top-4 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-rose-500 to-coral-500 text-white shadow-2xl border border-white/50 animate-scale-in font-bold text-xs sm:text-sm">
            <span>📸</span>
            <span className="tracking-wider uppercase">Cekrek!</span>
          </div>
        </div>
      )}
    </>
  );
}
