import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  renderPhotoboothCanvas,
  downloadCanvas,
  renderInstagramStoryCanvas,
  printPhotoboothCanvas,
  sharePhotoboothCanvas,
  FontStyleOption,
  TextColorOption,
} from '../utils/canvas';
import { PhotoboothTemplate } from '../utils/templates';
import { CameraFilter, DEFAULT_FILTER } from '../utils/filters';
import { OverlayItem, DEFAULT_OVERLAY } from '../utils/overlays';
import { getActiveBuilderConfig, FrameMotif } from '../utils/customBuilder';
import { PhotoEditorPanel } from './PhotoEditorPanel';
import { Download, RotateCcw, LayoutTemplate, Printer, Share2, Sparkles, Check } from 'lucide-react';

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
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const [doubleStrip4R, setDoubleStrip4R] = useState(true);
  const activeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isStripLayout =
    template.id.includes('strip') ||
    template.layoutType === 'korean-4cut' ||
    template.layoutType === 'music-player' ||
    template.layoutType === 'receipt' ||
    template.layoutType === 'cinema-ticket' ||
    template.layoutType === 'film-sprocket' ||
    template.layoutType === 'y2k-chrome' ||
    template.layoutType === 'genz-coquette' ||
    template.layoutType === 'genz-y2k-digicam' ||
    template.layoutType === 'genz-neko' ||
    template.layoutType === 'polaroid-dual' ||
    (activeCanvasRef.current ? activeCanvasRef.current.height / activeCanvasRef.current.width >= 1.7 : false);

  const isLandscapeLayout =
    template.layoutType.includes('landscape') ||
    (activeCanvasRef.current ? activeCanvasRef.current.width > activeCanvasRef.current.height : false);

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

  // Clean up Object URL on component unmount
  useEffect(() => {
    return () => {
      if (canvasDataUrl && canvasDataUrl.startsWith('blob:')) {
        URL.revokeObjectURL(canvasDataUrl);
      }
    };
  }, [canvasDataUrl]);

  // Re-generate canvas whenever photos, template, customBgColor, customTextColor, fontStyle, customTexts, motif, cornerRadius, photoGap, activeFilter, or activeOverlay changes
  useEffect(() => {
    let isCurrent = true;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsGenerating(true);

    // Fast 40ms debounce enabled by in-memory image bitmap caching
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

          // Asynchronous off-thread blob generation (0 main-thread string allocation)
          canvas.toBlob(
            (blob) => {
              if (!isCurrent || !blob) return;
              const newUrl = URL.createObjectURL(blob);
              setCanvasDataUrl((prev) => {
                if (prev && prev.startsWith('blob:')) {
                  URL.revokeObjectURL(prev);
                }
                return newUrl;
              });
              setIsGenerating(false);
            },
            'image/png'
          );
        })
        .catch((err) => {
          console.error('[PhotoTemplate] Render error:', err);
          setIsGenerating(false);
        });
    }, 40);

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

  const handleDownloadStory = async () => {
    if (!activeCanvasRef.current) return;
    try {
      setIsGeneratingStory(true);
      const storyCanvas = await renderInstagramStoryCanvas(activeCanvasRef.current, {
        bgColor: customBgColor !== 'default' ? customBgColor : template.theme.bg,
        accentColor: template.theme.accent,
        title: customTexts.header || template.name,
      });
      downloadCanvas(storyCanvas, `iziaphoto-story-9x16-${template.id}.png`);
    } catch (err) {
      console.error('[PhotoTemplate] Story canvas generation failed:', err);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const handlePrint = () => {
    if (activeCanvasRef.current) {
      printPhotoboothCanvas(activeCanvasRef.current, {
        title: `IziaPhoto - ${template.name}`,
        isStrip: isStripLayout,
        isLandscape: isLandscapeLayout,
        doubleStrip4R: isStripLayout ? doubleStrip4R : false,
      });
    }
  };

  const handleShare = async () => {
    if (!activeCanvasRef.current) return;
    const res = await sharePhotoboothCanvas(
      activeCanvasRef.current,
      `iziaphoto-${template.id}.png`,
      'Lihat hasil photobooth estetik dari IziaPhoto! ✨📸'
    );
    if (res.method === 'clipboard') {
      setShareFeedback('Foto berhasil disalin ke clipboard! Siap di-paste di chat atau story.');
      setTimeout(() => setShareFeedback(null), 4000);
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

          {/* Share Feedback Toast Banner */}
          {shareFeedback && (
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{shareFeedback}</span>
            </div>
          )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* Primary Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={!canvasDataUrl || isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-coral-500 via-rose-500 to-coral-600 hover:opacity-95 text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-coral-500/30 transition-all active:scale-95 disabled:opacity-50"
              >
                <Download className="w-5 h-5 text-white stroke-[2.5]" />
                <span>Download Photo (High-Res PNG)</span>
              </button>

              {/* Print Feature Card (Responsive & Touch-Friendly) */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/35 flex flex-col gap-2.5 shadow-lg">
                {/* Checklist / Toggle 2in1 for Strip Layouts */}
                {isStripLayout && (
                  <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 cursor-pointer transition-all select-none">
                    <input
                      type="checkbox"
                      checked={doubleStrip4R}
                      onChange={(e) => setDoubleStrip4R(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded-md accent-cyan-400 cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1 text-left">
                      <div className="text-xs font-bold text-cyan-200 flex items-center gap-1.5 flex-wrap">
                        <span>Cetak Dobel Strip di Kertas 4R (2in1)</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-400/20 text-cyan-300 font-mono">
                          Rekomendasi ✂️
                        </span>
                      </div>
                      <div className="text-[10.5px] text-gray-300 mt-0.5 leading-tight">
                        {doubleStrip4R
                          ? 'Otomatis digandakan 2 strip berdampingan di kertas 4R (10x15cm) siap potong.'
                          : 'Cetak 1 strip tunggal di kertas strip khusus (5x15cm / 2x6 inci).'}
                      </div>
                    </div>
                  </label>
                )}

                {/* Main Print Button */}
                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={!canvasDataUrl || isGenerating}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:opacity-95 text-white font-extrabold text-sm sm:text-base flex items-center justify-between shadow-lg shadow-cyan-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Printer className="w-5 h-5 text-white stroke-[2.5]" />
                    <span>Cetak / Print Foto</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold">
                    {isStripLayout
                      ? doubleStrip4R
                        ? 'Kertas 4R (2in1) ✂️'
                        : 'Kertas Strip 2x6"'
                      : isLandscapeLayout
                      ? 'Kertas 4R Landscape'
                      : 'Kertas 4R Portrait'}
                  </span>
                </button>
              </div>

              {/* Instagram Story 9:16 Special Button (Anti-Terpotong) */}
              <button
                type="button"
                onClick={handleDownloadStory}
                disabled={!canvasDataUrl || isGenerating || isGeneratingStory}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-sm flex items-center justify-between shadow-lg shadow-pink-500/20 transition-all active:scale-95 disabled:opacity-50 border border-white/20"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Unduh Format IG Story (9:16)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-mono uppercase tracking-wider">
                  {isGeneratingStory ? 'Menyiapkan...' : 'Anti-Terpotong ✨'}
                </span>
              </button>

              {/* Row 2: Share & Retake Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={!canvasDataUrl || isGenerating}
                  className="py-3 px-4 rounded-2xl glass-pill hover:bg-white/10 text-gray-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15 disabled:opacity-50 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-emerald-300 stroke-[2.2]" />
                  <span>Bagikan / Share</span>
                </button>

                <button
                  type="button"
                  onClick={onRetake}
                  className="py-3 px-4 rounded-2xl glass-pill hover:bg-white/10 text-gray-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-gray-300 stroke-[2.2]" />
                  <span>Foto Ulang</span>
                </button>
              </div>

              {/* Row 3: Change Template */}
              <Link
                to="/templates"
                className="w-full py-3 px-4 rounded-2xl glass-pill hover:bg-white/10 text-coral-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15 text-center"
              >
                <LayoutTemplate className="w-4 h-4 text-coral-300 stroke-[2.2]" />
                <span>Ganti Template Frame</span>
              </Link>
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
