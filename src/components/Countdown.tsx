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

      {/* Countdown Number Overlay */}
      {count !== null && count > 0 && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all rounded-3xl">
          <div className="relative">
            {/* Pulsing Outer Ring */}
            <div className="absolute -inset-4 rounded-full bg-coral-500/30 blur-md animate-ping" />

            {/* Countdown Badge */}
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-coral-600 to-rose-500 text-white flex items-center justify-center shadow-2xl border-2 border-white/40 scale-100 animate-scale-in">
              <span className="text-6xl font-display font-extrabold tracking-tighter drop-shadow-md">
                {count}
              </span>
            </div>
          </div>

          <div className="mt-5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white tracking-wider uppercase">
            Foto {photoIndex + 1} dari {totalPhotos} • Bersiap!
          </div>
        </div>
      )}

      {/* Instant Shutter Icon */}
      {count === 0 && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-[2px] rounded-3xl">
          <div className="w-24 h-24 rounded-full bg-white/90 text-black flex items-center justify-center text-4xl shadow-2xl animate-scale-in">
            📸
          </div>
        </div>
      )}
    </>
  );
}
