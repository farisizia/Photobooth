import { useState } from 'react';
import { RefreshCw, Trash2, ChevronLeft, ChevronRight, GripVertical, Plus } from 'lucide-react';

interface PhotoGridProps {
  photos: string[];
  totalSlots: number;
  onRetakePhoto: (index: number) => void;
  onDeletePhoto: (index: number) => void;
  onReorderPhotos: (newPhotos: string[]) => void;
  onAddPhoto?: () => void;
}

export function PhotoGrid({
  photos,
  totalSlots,
  onRetakePhoto,
  onDeletePhoto,
  onReorderPhotos,
  onAddPhoto,
}: PhotoGridProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const movePhoto = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;
    const next = [...photos];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    onReorderPhotos(next);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const next = [...photos];
    const [draggedItem] = next.splice(draggedIndex, 1);
    next.splice(dropIndex, 0, draggedItem);
    setDraggedIndex(null);
    setDragOverIndex(null);
    onReorderPhotos(next);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const gridColsClass =
    totalSlots <= 3
      ? 'grid-cols-3'
      : totalSlots === 4
      ? 'grid-cols-4'
      : totalSlots === 6
      ? 'grid-cols-3 sm:grid-cols-6'
      : 'grid-cols-4';

  return (
    <div className="w-full max-w-xl mx-auto space-y-2.5">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <span>📸</span>
            <span>FOTO YANG DIAMBIL ({photos.length}/{totalSlots})</span>
          </h3>
          {photos.length === totalSlots && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Lengkap
            </span>
          )}
        </div>
        <p className="text-[11px] text-gray-400 font-medium">
          Sentuh <span className="text-coral-400 font-semibold">Ubah Foto</span>, <span className="text-rose-400 font-semibold">Hapus</span>, atau <span className="text-purple-300 font-semibold">Geser</span> untuk tukar posisi
        </p>
      </div>

      {/* Grid Cards Container */}
      <div className={`grid ${gridColsClass} gap-2 sm:gap-2.5`}>
        {photos.map((photo, idx) => {
          const isBeingDragged = draggedIndex === idx;
          const isDragOver = dragOverIndex === idx;

          return (
            <div
              key={idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#12131a] border transition-all duration-200 shadow-lg select-none group cursor-grab active:cursor-grabbing ${
                isDragOver
                  ? 'border-coral-400 ring-4 ring-coral-500/40 scale-105 z-20 shadow-coral-500/30'
                  : isBeingDragged
                  ? 'opacity-30 border-white/30 scale-95'
                  : 'border-white/15 hover:border-white/30 hover:shadow-xl'
              }`}
            >
              {/* Photo Image */}
              <img
                src={photo}
                alt={`Snap #${idx + 1}`}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
              />

              {/* Slot Number Badge (Top Left) */}
              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-black text-white border border-white/20 shadow-md">
                #{idx + 1}
              </div>

              {/* Action Buttons: Ubah Foto & Delete (Top Right) */}
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-20">
                {/* Single Ubah Foto Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRetakePhoto(idx);
                  }}
                  title={`Ubah foto #${idx + 1}`}
                  className="w-7 h-7 rounded-full bg-black/75 hover:bg-coral-500 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-md transition-all active:scale-90 hover:scale-110"
                >
                  <RefreshCw className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePhoto(idx);
                  }}
                  title={`Hapus foto #${idx + 1}`}
                  className="w-7 h-7 rounded-full bg-black/75 hover:bg-rose-600 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-md transition-all active:scale-90 hover:scale-110"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
              </div>

              {/* Bottom Reorder Controller (Left & Right Chevron Arrows) */}
              <div className="absolute bottom-1 inset-x-1 flex items-center justify-between px-1.5 py-0.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    movePhoto(idx, 'left');
                  }}
                  disabled={idx === 0}
                  title="Pindah ke kiri"
                  className="w-5 h-5 rounded flex items-center justify-center text-white hover:bg-coral-500 disabled:opacity-20 disabled:hover:bg-transparent transition-all active:scale-90"
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                <div className="flex items-center text-gray-400 cursor-grab">
                  <GripVertical className="w-3 h-3 stroke-[2]" />
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    movePhoto(idx, 'right');
                  }}
                  disabled={idx === photos.length - 1}
                  title="Pindah ke kanan"
                  className="w-5 h-5 rounded flex items-center justify-center text-white hover:bg-coral-500 disabled:opacity-20 disabled:hover:bg-transparent transition-all active:scale-90"
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty Slots if photos are deleted or missing */}
        {Array.from({ length: Math.max(0, totalSlots - photos.length) }).map((_, emptyIdx) => {
          const slotNum = photos.length + emptyIdx + 1;
          return (
            <button
              key={`empty-${emptyIdx}`}
              type="button"
              onClick={onAddPhoto}
              title={`Ambil foto untuk slot #${slotNum}`}
              className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-coral-500/40 hover:border-coral-400 bg-coral-500/5 hover:bg-coral-500/15 flex flex-col items-center justify-center gap-1.5 p-2 transition-all active:scale-95 group text-coral-400 shadow-inner"
            >
              <div className="w-8 h-8 rounded-full bg-coral-500/20 group-hover:bg-coral-500 text-coral-300 group-hover:text-white flex items-center justify-center transition-all shadow-md">
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[10px] font-extrabold text-gray-300 group-hover:text-coral-300 tracking-tight text-center">
                Isi #{slotNum}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
