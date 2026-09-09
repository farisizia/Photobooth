interface PhotoGridProps {
  photos: string[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
          Foto Yang Diambil (4/4)
        </h3>
        <span className="text-xs text-coral-400 font-medium">Siap digabungkan</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="relative aspect-[3/4] rounded-xl overflow-hidden bg-noir-800 border border-white/10 shadow-md group"
          >
            <img
              src={photo}
              alt={`Snap ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-bold text-white">
              #{idx + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
