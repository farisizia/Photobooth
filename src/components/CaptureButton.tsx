interface CaptureButtonProps {
  onStart: () => void;
  isCapturing: boolean;
  photoIndex: number;
  totalPhotos?: number;
  disabled?: boolean;
}

export function CaptureButton({
  onStart,
  isCapturing,
  photoIndex,
  totalPhotos = 4,
  disabled = false,
}: CaptureButtonProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 pt-4">
      {!isCapturing ? (
        <button
          type="button"
          onClick={onStart}
          disabled={disabled}
          className="group relative flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-coral-500 via-rose-500 to-coral-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-coral-500/30 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {/* Shutter Circle Icon */}
          <div className="w-8 h-8 rounded-full border-2 border-white/60 p-0.5 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white group-hover:scale-95 transition-transform" />
          </div>
          <span>Mulai Sesi Foto (4 Foto)</span>
        </button>
      ) : (
        <div className="w-full py-4 px-6 rounded-2xl glass-panel border border-coral-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-coral-400 animate-ping" />
            <span className="text-sm font-semibold text-white">
              Mengambil Foto {photoIndex + 1} dari {totalPhotos}...
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalPhotos }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i < photoIndex
                    ? 'bg-emerald-400 scale-95'
                    : i === photoIndex
                    ? 'bg-coral-400 scale-125 animate-pulse'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        {!isCapturing
          ? 'Pose terbaikmu! 4 foto akan diambil otomatis berturut-turut.'
          : 'Tetap di depan kamera sampai seluruh 4 foto selesai.'}
      </p>
    </div>
  );
}
