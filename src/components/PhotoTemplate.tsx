import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FrameColor,
  DEFAULT_FRAME_COLORS,
  renderPhotoboothCanvas,
  downloadCanvas,
} from '../utils/canvas';
import { PhotoboothTemplate } from '../utils/templates';
import { CameraFilter, DEFAULT_FILTER } from '../utils/filters';
import { OverlayItem, DEFAULT_OVERLAY } from '../utils/overlays';
import { FilterOverlayTray } from './FilterOverlayTray';
import { Download, RotateCcw, LayoutTemplate, Wand2, Palette } from 'lucide-react';

interface PhotoTemplateProps {
  photos: string[];
  template: PhotoboothTemplate;
  onRetake: () => void;
  selectedFilter?: CameraFilter;
  onSelectFilter?: (filter: CameraFilter) => void;
  selectedOverlay?: OverlayItem;
  onSelectOverlay?: (overlay: OverlayItem) => void;
}

export function PhotoTemplate({
  photos,
  template,
  onRetake,
  selectedFilter: externalFilter,
  onSelectFilter: externalSetFilter,
  selectedOverlay: externalOverlay,
  onSelectOverlay: externalSetOverlay,
}: PhotoTemplateProps) {
  const [selectedColor, setSelectedColor] = useState<FrameColor>(DEFAULT_FRAME_COLORS[0]);
  const [localFilter, setLocalFilter] = useState<CameraFilter>(externalFilter || DEFAULT_FILTER);
  const [localOverlay, setLocalOverlay] = useState<OverlayItem>(externalOverlay || DEFAULT_OVERLAY);
  const [showFilterTray, setShowFilterTray] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const activeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeFilter = externalFilter || localFilter;
  const activeOverlay = externalOverlay || localOverlay;

  const handleSelectFilter = (filter: CameraFilter) => {
    setLocalFilter(filter);
    if (externalSetFilter) externalSetFilter(filter);
  };

  const handleSelectOverlay = (overlay: OverlayItem) => {
    setLocalOverlay(overlay);
    if (externalSetOverlay) externalSetOverlay(overlay);
  };

  // Re-generate canvas whenever photos, template, frame color, tone filter, or overlay changes
  useEffect(() => {
    let isCurrent = true;
    setIsGenerating(true);

    const colorOverride = selectedColor.id === 'default' ? undefined : selectedColor;

    renderPhotoboothCanvas(photos, template, colorOverride, {
      filter: activeFilter.cssFilter,
      overlayUrl: activeOverlay.url,
    })
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
  }, [photos, template, selectedColor, activeFilter, activeOverlay]);

  const handleDownload = () => {
    if (activeCanvasRef.current) {
      downloadCanvas(activeCanvasRef.current, `iziaphoto-${template.id}.png`);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 animate-fade-in pb-12">
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

      {/* Control Bar: Frame Color & Filter/Overlay Modifier */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Frame Color Picker */}
        <div className="glass-panel p-3 rounded-2xl border border-white/10 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-coral-400" />
            <span>Warna Frame:</span>
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
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
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all active:scale-95 flex items-center justify-center text-[9px] ${
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

        {/* Filter & Overlay Editor Trigger */}
        <div className="glass-panel p-3 rounded-2xl border border-white/10 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 truncate">
            <Wand2 className="w-3.5 h-3.5 text-coral-400 flex-shrink-0" />
            <span className="truncate">Filter & Efek:</span>
          </span>
          <button
            type="button"
            onClick={() => setShowFilterTray((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-coral-500/20 to-pink-500/20 hover:from-coral-500/30 hover:to-pink-500/30 text-coral-300 border border-coral-500/30 text-xs font-bold transition-all active:scale-95 shadow-sm truncate max-w-[180px]"
          >
            <span className="truncate">{activeFilter.name}</span>
            {activeOverlay.id !== 'none' && (
              <span className="text-pink-300 truncate">• {activeOverlay.name}</span>
            )}
            <span className="text-[9px] text-coral-400">▼</span>
          </button>
        </div>
      </div>

      {/* Filter & Overlay Panel for Review Screen */}
      {showFilterTray && (
        <div className="w-full my-2 animate-fade-in">
          <FilterOverlayTray
            selectedFilter={activeFilter}
            onSelectFilter={handleSelectFilter}
            selectedOverlay={activeOverlay}
            onSelectOverlay={handleSelectOverlay}
            onClose={() => setShowFilterTray(false)}
          />
        </div>
      )}

      {/* Live Canvas Preview */}
      <div className="relative min-h-[360px] max-h-[560px] flex items-center justify-center p-4 bg-noir-800/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        {isGenerating && (
          <div className="absolute inset-0 z-10 bg-noir-900/60 backdrop-blur-xs flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-coral-500 border-t-transparent animate-spin" />
              <span className="text-xs text-gray-300 font-medium">Memproses filter & render foto...</span>
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
          <Download className="w-5 h-5 text-white stroke-[2.5]" />
          <span>Download Photo</span>
        </button>

        {/* Secondary Buttons Row: Retake & Change Template */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onRetake}
            className="py-3.5 px-4 rounded-2xl glass-pill hover:bg-white/10 text-gray-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15"
          >
            <RotateCcw className="w-4 h-4 text-gray-200 stroke-[2.2]" />
            <span>Foto Ulang</span>
          </button>

          <Link
            to="/templates"
            className="py-3.5 px-4 rounded-2xl glass-pill hover:bg-white/10 text-coral-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15 text-center"
          >
            <LayoutTemplate className="w-4 h-4 text-coral-300 stroke-[2.2]" />
            <span>Ganti Template</span>
          </Link>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400">
        Foto dan efek diolah langsung di peramban Anda dengan resolusi tinggi tanpa perlu diunggah ke server.
      </p>
    </div>
  );
}
