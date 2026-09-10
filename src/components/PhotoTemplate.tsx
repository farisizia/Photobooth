import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  renderPhotoboothCanvas,
  downloadCanvas,
  FontStyleOption,
  TextColorOption,
} from '../utils/canvas';
import { PhotoboothTemplate } from '../utils/templates';
import { CameraFilter, DEFAULT_FILTER } from '../utils/filters';
import { OverlayItem, DEFAULT_OVERLAY } from '../utils/overlays';
import { getActiveBuilderConfig, FrameMotif } from '../utils/customBuilder';
import { PhotoEditorPanel } from './PhotoEditorPanel';
import { Download, RotateCcw, LayoutTemplate } from 'lucide-react';

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
  const initialBuilderConfig = template.id === 'custom-builder' ? getActiveBuilderConfig() : null;

  const [customBgColor, setCustomBgColor] = useState<string>(
    initialBuilderConfig?.bgColor || template.theme.bg
  );
  const [customTextColor, setCustomTextColor] = useState<TextColorOption>(
    (initialBuilderConfig?.textColor as TextColorOption) || 'auto'
  );
  const [fontStyle, setFontStyle] = useState<FontStyleOption>(
    initialBuilderConfig?.fontStyle || 'sans'
  );
  const [motif, setMotif] = useState<FrameMotif>(
    initialBuilderConfig?.motif || 'plain'
  );
  const [cornerRadius, setCornerRadius] = useState<number>(
    initialBuilderConfig?.cornerRadius ?? 8
  );
  const [photoGap, setPhotoGap] = useState<number>(
    initialBuilderConfig?.photoGap ?? 16
  );
  const [customTexts, setCustomTexts] = useState<{
    header?: string;
    subhead?: string;
    footer?: string;
  }>({
    header: initialBuilderConfig?.name || template.customTexts?.header,
    subhead: initialBuilderConfig?.subtitle || template.customTexts?.subhead,
    footer: initialBuilderConfig?.footer || template.customTexts?.footer,
  });

  const [localFilter, setLocalFilter] = useState<CameraFilter>(externalFilter || DEFAULT_FILTER);
  const [localOverlay, setLocalOverlay] = useState<OverlayItem>(externalOverlay || DEFAULT_OVERLAY);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const activeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleResetDefaults = () => {
    const cfg = template.id === 'custom-builder' ? getActiveBuilderConfig() : null;
    setCustomBgColor(cfg?.bgColor || template.theme.bg);
    setCustomTextColor((cfg?.textColor as TextColorOption) || 'auto');
    setFontStyle(cfg?.fontStyle || 'sans');
    setMotif(cfg?.motif || 'plain');
    setCornerRadius(cfg?.cornerRadius ?? 8);
    setPhotoGap(cfg?.photoGap ?? 16);
    setCustomTexts({
      header: cfg?.name || template.customTexts?.header,
      subhead: cfg?.subtitle || template.customTexts?.subhead,
      footer: cfg?.footer || template.customTexts?.footer,
    });
    setLocalFilter(DEFAULT_FILTER);
    if (externalSetFilter) externalSetFilter(DEFAULT_FILTER);
    setLocalOverlay(DEFAULT_OVERLAY);
    if (externalSetOverlay) externalSetOverlay(DEFAULT_OVERLAY);
  };

  // Re-generate canvas whenever photos, template, customBgColor, customTextColor, fontStyle, customTexts, motif, cornerRadius, photoGap, activeFilter, or activeOverlay changes
  useEffect(() => {
    let isCurrent = true;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsGenerating(true);

    debounceTimerRef.current = setTimeout(() => {
      renderPhotoboothCanvas(photos, template, undefined, {
        filter: activeFilter.cssFilter,
        overlayUrl: activeOverlay.url,
        customBgColor,
        customTextColor,
        fontStyle,
        customTexts,
        motif,
        cornerRadius,
        photoGap,
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
    }, 120);

    return () => {
      isCurrent = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [
    photos,
    template,
    customBgColor,
    customTextColor,
    fontStyle,
    customTexts,
    motif,
    cornerRadius,
    photoGap,
    activeFilter,
    activeOverlay,
  ]);

  const handleDownload = () => {
    if (activeCanvasRef.current) {
      downloadCanvas(activeCanvasRef.current, `iziaphoto-${template.id}.png`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
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

      {/* Main Studio Grid: Left = Canvas Preview & Actions, Right = Side Editor Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Canvas Preview & Download/Retake (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Live Canvas Preview */}
          <div className="relative min-h-[380px] max-h-[580px] flex items-center justify-center p-4 bg-noir-800/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {isGenerating && (
              <div className="absolute inset-0 z-10 bg-noir-900/60 backdrop-blur-xs flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-coral-500 border-t-transparent animate-spin" />
                  <span className="text-xs text-gray-300 font-medium">
                    Merender teks & frame kustom...
                  </span>
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
          <div className="flex flex-col gap-3">
            {/* Primary Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={!canvasDataUrl || isGenerating}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-coral-500 via-rose-500 to-coral-600 hover:opacity-95 text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-coral-500/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-5 h-5 text-white stroke-[2.5]" />
              <span>Download Photo (High-Res PNG)</span>
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
        </div>

        {/* RIGHT COLUMN: Side Editor Panel (5 cols on desktop) */}
        <div className="lg:col-span-5">
          <PhotoEditorPanel
            template={template}
            customBgColor={customBgColor}
            onBgColorChange={setCustomBgColor}
            customTextColor={customTextColor}
            onTextColorChange={setCustomTextColor}
            fontStyle={fontStyle}
            onFontStyleChange={setFontStyle}
            customTexts={customTexts}
            onCustomTextsChange={setCustomTexts}
            motif={motif}
            onMotifChange={setMotif}
            cornerRadius={cornerRadius}
            onCornerRadiusChange={setCornerRadius}
            photoGap={photoGap}
            onPhotoGapChange={setPhotoGap}
            selectedFilter={activeFilter}
            onSelectFilter={handleSelectFilter}
            selectedOverlay={activeOverlay}
            onSelectOverlay={handleSelectOverlay}
            onResetDefaults={handleResetDefaults}
          />
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400">
        Foto dan efek diolah langsung di peramban Anda dengan resolusi tinggi tanpa perlu diunggah ke server.
      </p>
    </div>
  );
}
