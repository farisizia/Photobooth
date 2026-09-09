import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FrameColor,
  DEFAULT_FRAME_COLORS,
  renderPhotoboothCanvas,
  downloadCanvas,
} from '../utils/canvas';
import { PhotoboothTemplate } from '../utils/templates';

interface PhotoTemplateProps {
  photos: string[];
  template: PhotoboothTemplate;
  onRetake: () => void;
}

export function PhotoTemplate({ photos, template, onRetake }: PhotoTemplateProps) {
  const [selectedColor, setSelectedColor] = useState<FrameColor>(DEFAULT_FRAME_COLORS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const activeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Re-generate canvas whenever template or color changes
  useEffect(() => {
    let isCurrent = true;
    setIsGenerating(true);

    const colorOverride = selectedColor.id === 'default' ? undefined : selectedColor;

    renderPhotoboothCanvas(photos, template, colorOverride)
      .then((canvas) => {
        if (!isCurrent) return;
        activeCanvasRef.current = canvas;
        setCanvasDataUrl(canvas.toDataURL('image/png'));
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error('[PhotoTemplate] Render error:', err);
        setIsGenerating(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [photos, template, selectedColor]);

  const handleDownload = () => {
    if (activeCanvasRef.current) {
      downloadCanvas(activeCanvasRef.current, `iziaphoto-${template.id}.png`);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-5 animate-fade-in pb-12">
      {/* Title Header */}
      <div className="text-center">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-2 uppercase">
          ✦ Sesi Selesai • {template.name} ✦
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Your Photos Are Ready!
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          Frame: <strong className="text-coral-400">{template.name}</strong> ({template.slots} Foto)
        </p>
      </div>

      {/* Frame Color Picker */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-gray-300">Warna Frame:</span>
        <div className="flex items-center gap-2 sm:gap-2.5">
          {DEFAULT_FRAME_COLORS.map((fc) => {
            const isSelected = selectedColor.id === fc.id;
            return (
              <button
                key={fc.id}
                type="button"
                onClick={() => setSelectedColor(fc)}
                title={fc.name}
                style={{
                  backgroundColor: fc.id === 'default' ? template.theme.bg : fc.bg,
                }}
                className={`w-7 h-7 rounded-full border-2 transition-all active:scale-95 flex items-center justify-center text-[9px] ${
                  isSelected
                    ? 'border-coral-500 ring-2 ring-coral-400/40 scale-110'
                    : 'border-white/30 hover:scale-105'
                }`}
              >
                {fc.id === 'default' ? '★' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Canvas Preview */}
      <div className="relative min-h-[360px] max-h-[560px] flex items-center justify-center p-4 bg-noir-800/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        {isGenerating && (
          <div className="absolute inset-0 z-10 bg-noir-900/60 backdrop-blur-xs flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-coral-500 border-t-transparent animate-spin" />
              <span className="text-xs text-gray-300 font-medium">Memproses foto...</span>
            </div>
          </div>
        )}

        {canvasDataUrl ? (
          <img
            src={canvasDataUrl}
            alt="Photobooth Result Preview"
            className="max-h-[520px] max-w-full rounded-lg shadow-2xl object-contain border border-black/10"
          />
        ) : (
          <span className="text-sm text-gray-400">Menyiapkan pratinjau...</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        {/* Primary Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={!canvasDataUrl || isGenerating}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-coral-500 via-rose-500 to-coral-600 hover:opacity-95 text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-coral-500/30 transition-all active:scale-95 disabled:opacity-50"
        >
          <span className="text-xl">⬇️</span>
          <span>Download Photo</span>
        </button>

        {/* Secondary Buttons Row: Retake & Change Template */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onRetake}
            className="py-3.5 px-4 rounded-2xl glass-pill hover:bg-white/10 text-gray-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15"
          >
            <span>🔄</span>
            <span>Foto Ulang</span>
          </button>

          <Link
            to="/templates"
            className="py-3.5 px-4 rounded-2xl glass-pill hover:bg-white/10 text-coral-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15 text-center"
          >
            <span>🎨</span>
            <span>Ganti Template</span>
          </Link>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400">
        Foto diolah langsung di peramban Anda dengan resolusi tinggi tanpa perlu diunggah ke server.
      </p>
    </div>
  );
}
