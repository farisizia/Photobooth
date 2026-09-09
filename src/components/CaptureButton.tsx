interface CaptureButtonProps {
  onStart: () => void;
  isCapturing: boolean;
  photoIndex: number;
  totalPhotos?: number;
  disabled?: boolean;
  isSingleRetake?: boolean;
  retakeSlotIndex?: number;
  onCancelRetake?: () => void;
}

export function CaptureButton({
  onStart,
  isCapturing,
  photoIndex,
  totalPhotos = 4,
  disabled = false,
  isSingleRetake = false,
  retakeSlotIndex,
  onCancelRetake,
}: CaptureButtonProps) {
  const targetSlotNumber = (retakeSlotIndex ?? photoIndex) + 1;

  return (
    <div className="photobooth-capture-stage mx-auto flex flex-col items-center gap-2.5 pt-2 pb-safe">
      {!isCapturing ? (
        <div className="w-full flex flex-col gap-2">
          <button
            type="button"
            onClick={onStart}
            disabled={disabled}
            className={`group relative flex items-center justify-center gap-3.5 w-full py-3.5 sm:py-4 px-6 rounded-2xl text-white font-bold text-base sm:text-lg shadow-xl hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none ${
              isSingleRetake
                ? 'bg-gradient-to-r from-purple-600 via-rose-500 to-coral-500 shadow-rose-500/30 ring-2 ring-rose-400/40'
                : 'bg-gradient-to-r from-coral-500 via-rose-500 to-coral-600 shadow-coral-500/30'
            }`}
          >
            {/* Native Shutter Button Double Ring Accent */}
            <div className="w-8 h-8 rounded-full border-2 border-white/80 p-0.5 flex items-center justify-center shadow-inner">
              <div className="w-full h-full rounded-full bg-white group-hover:scale-90 group-active:scale-75 transition-transform" />
            </div>
            <span className="tracking-wide">
              {isSingleRetake
                ? `Jepret Foto Pengganti #${targetSlotNumber}`
                : `Mulai Sesi Foto (${totalPhotos} Foto)`}
            </span>
          </button>

          {isSingleRetake && onCancelRetake && (
            <button
              type="button"
              onClick={onCancelRetake}
              className="w-full py-2.5 px-4 rounded-xl glass-panel border border-white/15 text-xs font-semibold text-gray-300 hover:text-white hover:border-white/30 transition-all active:scale-95"
            >
              ✕ Batal Ubah Foto • Kembali ke Hasil
            </button>
          )}
        </div>
      ) : (
        <div className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl glass-panel border border-coral-500/30 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-coral-400 animate-ping" />
            <span className="text-sm font-bold text-white">
              {isSingleRetake
                ? `Mengambil Foto Pengganti #${targetSlotNumber}...`
                : `Mengambil Foto ${photoIndex + 1} dari ${totalPhotos}...`}
            </span>
          </div>

          {/* Dots Indicator or Single Retake Badge */}
          {!isSingleRetake ? (
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
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-xs font-semibold border border-purple-400/30">
              Slot #{targetSlotNumber}
            </span>
          )}
        </div>
      )}

      {/* Helper text with safe bottom margin */}
      <p className="text-[11px] sm:text-xs text-gray-400 text-center font-medium px-2 leading-tight">
        {!isCapturing
          ? isSingleRetake
            ? `Hanya 1 foto baru yang akan diambil untuk memperbarui slot #${targetSlotNumber}.`
            : `Pose terbaikmu! ${totalPhotos} foto akan diambil otomatis berturut-turut.`
          : isSingleRetake
          ? 'Tetap di depan kamera sampai foto pengganti selesai diambil.'
          : `Tetap di depan kamera sampai seluruh ${totalPhotos} foto selesai.`}
      </p>
    </div>
  );
}
