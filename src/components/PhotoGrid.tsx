import { useState, memo } from 'react';
import {
  RefreshCw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FolderUp,
  Camera,
  Check,
  Eye,
  X,
} from 'lucide-react';

interface PhotoGridProps {
  photos: string[];
  totalSlots: number;
  onRetakePhoto: (index: number) => void;
  onDeletePhoto: (index: number) => void;
  onReorderPhotos: (newPhotos: string[]) => void;
  onAddPhoto?: () => void;
  onUploadPhoto?: (file: File, targetIndex: number) => void;
}

export const PhotoGrid = memo(function PhotoGrid({
  photos,
  totalSlots,
  onRetakePhoto,
  onDeletePhoto,
  onReorderPhotos,
  onAddPhoto,
  onUploadPhoto,
}: PhotoGridProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [previewModalIndex, setPreviewModalIndex] = useState<number | null>(null);

  // Move photo left or right in sequence
  const movePhoto = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;
    const next = [...photos];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    onReorderPhotos(next);
  };

  // Desktop Drag and Drop Handlers
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

  // Responsive Grid Classes for Tablet / Desktop (while mobile uses horizontal snap carousel)
  const gridColsClass =
    totalSlots <= 2
      ? 'sm:grid-cols-2'
      : totalSlots === 3
      ? 'sm:grid-cols-3'
      : totalSlots === 4
      ? 'sm:grid-cols-4'
      : totalSlots === 6
      ? 'sm:grid-cols-3 md:grid-cols-6'
      : 'sm:grid-cols-4';

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2.5 select-none">
      {/* Header Info: Title, Counter Badge & Mobile Swipe Hint */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-coral-400">📸</span>
            <span>FOTO YANG DIAMBIL ({photos.length}/{totalSlots})</span>
          </h3>
          {photos.length >= totalSlots ? (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1 shadow-xs">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Lengkap</span>
            </span>
          ) : (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 shadow-xs">
              Kurang {totalSlots - photos.length} Foto
            </span>
          )}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden text-[10px] font-bold text-coral-400 flex items-center gap-1">
          <span>Geser foto</span>
          <ChevronRight className="w-3 h-3 animate-pulse" />
        </div>
      </div>

      {/* Helper text on desktop */}
      <p className="hidden sm:block text-[11px] text-gray-400 font-medium px-1">
        Sentuh <span className="text-coral-400 font-semibold">Ubah</span> untuk foto ulang,{' '}
        <span className="text-purple-300 font-semibold">Galeri</span> untuk ganti file, atau panah untuk menukar urutan cetak.
      </p>

      {/* Cards Container:
          - Mobile (< 640px): Horizontal Snap Carousel (spacious, never cramped, easy touch targets)
          - Tablet/Desktop (>= 640px): Clean responsive CSS grid
      */}
      <div
        className={`flex sm:grid ${gridColsClass} gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 sm:pb-0 px-0.5`}
      >
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
              className={`relative w-[142px] sm:w-auto flex-shrink-0 snap-start aspect-[3/4] rounded-2xl overflow-hidden bg-[#111218] border transition-all duration-200 shadow-xl select-none group cursor-pointer ${
                isDragOver
                  ? 'border-coral-400 ring-4 ring-coral-500/40 scale-105 z-20 shadow-coral-500/30'
                  : isBeingDragged
                  ? 'opacity-30 border-white/30 scale-95'
                  : 'border-white/15 hover:border-coral-400/60 hover:shadow-2xl'
              }`}
              onClick={() => setPreviewModalIndex(idx)}
            >
              {/* Photo Image */}
              <img
                src={photo}
                alt={`Foto #${idx + 1}`}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
              />

              {/* Slot Number Badge (Top Left) */}
              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-black text-white border border-white/20 shadow-md flex items-center gap-1">
                <span>#{idx + 1}</span>
              </div>

              {/* Quick Preview Hint on Hover */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] text-white flex items-center gap-1">
                <Eye className="w-2.5 h-2.5" />
                <span>Perbesar</span>
              </div>

              {/* Delete Button (Top Right) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePhoto(idx);
                }}
                title={`Hapus foto #${idx + 1}`}
                className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/80 hover:bg-rose-600 backdrop-blur-md border border-white/20 text-white/80 hover:text-white flex items-center justify-center shadow-md transition-all active:scale-90 z-10"
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
              </button>

              {/* Bottom Actions Overlay: Ubah, Galeri & Urutan */}
              <div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-6 pb-1.5 px-1.5 flex flex-col gap-1 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Action Buttons: Ubah Kamera & Upload Galeri */}
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => onRetakePhoto(idx)}
                    title={`Foto ulang slot #${idx + 1} lewat kamera`}
                    className="py-1 px-1 rounded-lg bg-white/10 hover:bg-coral-500 text-white text-[10px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 backdrop-blur-sm border border-white/15 shadow-xs"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Ubah</span>
                  </button>

                  {onUploadPhoto ? (
                    <label
                      title={`Ganti foto #${idx + 1} dari galeri HP`}
                      className="py-1 px-1 rounded-lg bg-purple-500/20 hover:bg-purple-600 text-purple-200 hover:text-white text-[10px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer backdrop-blur-sm border border-purple-400/30 shadow-xs"
                    >
                      <FolderUp className="w-2.5 h-2.5" />
                      <span>Galeri</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onUploadPhoto(file, idx);
                          }
                          e.target.value = '';
                        }}
                      />
                    </label>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Reorder Arrows: Pindah Kiri / Kanan */}
                <div className="flex items-center justify-between px-1 py-0.5 rounded-md bg-black/50 border border-white/10 text-[9px] text-gray-300">
                  <button
                    type="button"
                    onClick={() => movePhoto(idx, 'left')}
                    disabled={idx === 0}
                    title="Pindah ke kiri"
                    className="p-0.5 rounded text-white hover:text-coral-400 disabled:opacity-20 disabled:hover:text-white transition-all active:scale-75"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <span className="text-[9px] font-semibold text-gray-400">Urutan</span>
                  <button
                    type="button"
                    onClick={() => movePhoto(idx, 'right')}
                    disabled={idx === photos.length - 1}
                    title="Pindah ke kanan"
                    className="p-0.5 rounded text-white hover:text-coral-400 disabled:opacity-20 disabled:hover:text-white transition-all active:scale-75"
                  >
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty Slots: Prompt for Camera or Gallery */}
        {Array.from({ length: Math.max(0, totalSlots - photos.length) }).map((_, emptyIdx) => {
          const slotNum = photos.length + emptyIdx + 1;
          const targetSlotIdx = photos.length + emptyIdx;
          return (
            <div
              key={`empty-${emptyIdx}`}
              className="relative w-[142px] sm:w-auto flex-shrink-0 snap-start aspect-[3/4] rounded-2xl border-2 border-dashed border-coral-500/40 hover:border-coral-400 bg-coral-500/5 hover:bg-coral-500/10 flex flex-col items-center justify-between p-2.5 transition-all group text-coral-400 shadow-inner"
            >
              <div className="w-full flex justify-between items-center text-[10px] font-black text-coral-300 uppercase">
                <span>Slot #{slotNum}</span>
                <span className="text-[9px] text-gray-400 font-medium">Kosong</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 my-auto">
                <button
                  type="button"
                  onClick={onAddPhoto}
                  title={`Ambil foto kamera untuk slot #${slotNum}`}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-coral-500 to-rose-500 text-white flex items-center justify-center shadow-lg active:scale-90 hover:scale-105 transition-all"
                >
                  <Camera className="w-5 h-5 stroke-[2.2]" />
                </button>
                <span className="text-[10px] font-extrabold text-white text-center">
                  Foto Kamera
                </span>
              </div>

              {onUploadPhoto && (
                <label
                  title={`Pilih foto #${slotNum} dari galeri HP`}
                  className="w-full py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-400/30 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all shadow-xs"
                >
                  <FolderUp className="w-3 h-3 text-purple-300" />
                  <span>Dari Galeri</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onUploadPhoto(file, targetSlotIdx);
                      }
                      e.target.value = '';
                    }}
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>

      {/* High-Resolution Mobile Photo Preview & Action Modal */}
      {previewModalIndex !== null && photos[previewModalIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setPreviewModalIndex(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-[#13131a] border border-white/20 p-4 shadow-2xl flex flex-col gap-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-coral-500/20 text-coral-300 border border-coral-500/40 text-xs font-black">
                  Foto #{previewModalIndex + 1} dari {totalSlots}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalIndex(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Preview Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-inner">
              <img
                src={photos[previewModalIndex]}
                alt={`Preview #${previewModalIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Prev / Next Modal Arrows */}
              {previewModalIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setPreviewModalIndex((prev) => (prev !== null ? prev - 1 : 0))}
                  title="Foto sebelumnya"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center active:scale-90 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {previewModalIndex < photos.length - 1 && (
                <button
                  type="button"
                  onClick={() => setPreviewModalIndex((prev) => (prev !== null ? prev + 1 : 0))}
                  title="Foto berikutnya"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center active:scale-90 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Modal Action Buttons (Touch Friendly) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Retake Camera */}
              <button
                type="button"
                onClick={() => {
                  const idx = previewModalIndex;
                  setPreviewModalIndex(null);
                  onRetakePhoto(idx);
                }}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-coral-500 to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Foto Ulang</span>
              </button>

              {/* Replace from Gallery */}
              {onUploadPhoto && (
                <label className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95 transition-all">
                  <FolderUp className="w-4 h-4" />
                  <span>Ganti Galeri</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      const idx = previewModalIndex;
                      if (file && idx !== null) {
                        setPreviewModalIndex(null);
                        onUploadPhoto(file, idx);
                      }
                      e.target.value = '';
                    }}
                  />
                </label>
              )}
            </div>

            {/* Delete Option */}
            <button
              type="button"
              onClick={() => {
                const idx = previewModalIndex;
                setPreviewModalIndex(null);
                onDeletePhoto(idx);
              }}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Foto dari Strip</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
