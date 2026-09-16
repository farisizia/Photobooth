import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Sparkles,
  Layout,
  Palette,
  Type,
  Sliders,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  CustomBaseLayout,
  FrameMotif,
  FontStyleOption,
  CustomBuilderConfig,
  BASE_LAYOUTS,
  DEFAULT_BUILDER_CONFIG,
  saveActiveBuilderConfig,
  builderConfigToPhotoboothTemplate,
  isLightColor,
  getContrastColors,
} from '../utils/customBuilder';
import { PhotoboothTemplate } from '../constants/templatesData';

interface CustomBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (template: PhotoboothTemplate) => void;
}

const PRESET_COLORS = [
  // 1. Hitam & Kontras Tajam
  { label: 'Charcoal Noir', hex: '#0F1015' },
  { label: 'Hitam Pekat', hex: '#000000' },
  // 2. Off-White & Vintage Clean
  { label: 'Off-White Paper', hex: '#FAF8F5' },
  { label: 'Putih Bersih', hex: '#FFFFFF' },
  // 3. Pastel Estetik
  { label: 'Pastel Pink', hex: '#FCE7F3' },
  { label: 'Soft Lilac', hex: '#EDE9FE' },
  { label: 'Sage Green', hex: '#D1FAE5' },
  { label: 'Baby Sky Blue', hex: '#E0F2FE' },
  { label: 'Butter Cream', hex: '#FEF9C3' },
  { label: 'Soft Peach', hex: '#FFEDD5' },
  // 4. Warna Bold & Mewah
  { label: 'Deep Maroon', hex: '#450A0A' },
  { label: 'Deep Emerald', hex: '#064E3B' },
  { label: 'Midnight Navy', hex: '#0F172A' },
  { label: 'Cokelat Espresso', hex: '#3E2723' },
  { label: 'Cokelat Moka', hex: '#451A03' },
  { label: 'Midnight Plum', hex: '#3B0764' },
];

const SAMPLE_PHOTOS = [
  '/mockups/korean_pose_1.jpg', // Sahabat senyum manis peace sign
  '/mockups/korean_pose_2.jpg', // Sahabat pose seru ketawa bareng bunny ears
  '/mockups/korean_pose_4.jpg', // Pose cinta / heart hands senyum bahagia (ideal untuk slot landscape lebar)
  '/mockups/korean_pose_3.jpg', // Potret pemuda senyum hangat photobooth
];

export function CustomBuilderModal({
  isOpen,
  onClose,
  onApply,
}: CustomBuilderModalProps) {
  const navigate = useNavigate();
  const [config, setConfig] = useState<CustomBuilderConfig>(DEFAULT_BUILDER_CONFIG);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const triggerColorPicker = () => {
    if (colorInputRef.current) {
      if ('showPicker' in colorInputRef.current) {
        try {
          colorInputRef.current.showPicker();
          return;
        } catch {
          // fallback
        }
      }
      colorInputRef.current.click();
    }
  };

  if (!isOpen) return null;

  const currentMeta = useMemo(
    () => BASE_LAYOUTS[config.layoutBase] || BASE_LAYOUTS['strip-4'],
    [config.layoutBase]
  );
  const isStrip = config.layoutBase.startsWith('strip-');
  const isPortrait4R = config.layoutBase === '4r-portrait-grid4';
  const isPolaroid = config.layoutBase === 'polaroid-1';
  const isLandscape4R = !isStrip && !isPortrait4R && !isPolaroid;

  const nowDateStr = useMemo(
    () =>
      new Date()
        .toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        .toUpperCase(),
    []
  );

  const contrast = useMemo(
    () => getContrastColors(config.bgColor, config.textColor),
    [config.bgColor, config.textColor]
  );

  const handleUpdate = <K extends keyof CustomBuilderConfig>(
    key: K,
    value: CustomBuilderConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleBgColorChange = (hex: string) => {
    setConfig((prev) => {
      const light = isLightColor(hex);
      return {
        ...prev,
        bgColor: hex,
        textColor: light ? '#0F172A' : '#FFFFFF',
      };
    });
  };

  const handleReset = () => {
    setConfig(DEFAULT_BUILDER_CONFIG);
  };

  const handleSaveAndUse = () => {
    saveActiveBuilderConfig(config);
    const template = builderConfigToPhotoboothTemplate(config);
    if (onApply) {
      onApply(template);
    } else {
      navigate('/photobooth?template=custom-builder');
    }
    onClose();
  };

  // Font class resolver for live mockup
  const getFontFamilyClass = () => {
    switch (config.fontStyle) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      case 'cursive':
        return 'italic font-serif';
      case 'display':
        return 'font-black tracking-widest uppercase';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-hidden">
      <div className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[92vh] max-w-5xl bg-[#12131A] border-0 sm:border border-white/15 rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white">
        {/* Header (Sticky top) */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-[#161722] shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl bg-gradient-to-r from-coral-500/20 to-rose-500/20 text-coral-400 border border-coral-500/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-display font-extrabold text-white truncate">
                Bikin Template Kustom Sendiri
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-400 truncate hidden sm:block">
                Pilih layout dasar, motif bingkai, warna, teks, dan gaya font sesukamu
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Scrollable with overscroll containment) */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* LEFT: Live Mockup Preview (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-black/40 rounded-2xl border border-white/10 p-3 sm:p-4 relative min-h-[300px] sm:min-h-[440px]">
            <div className="w-full flex items-center justify-between text-xs text-gray-400 mb-2 px-1">
              <span>Pratinjau Hasil Frame</span>
              <span className="text-coral-400 font-mono text-[11px] font-semibold">
                {currentMeta.name} ({currentMeta.slots} Foto)
              </span>
            </div>

            {/* Mockup Frame Container with dynamic responsive sizing */}
            <div
              style={{
                backgroundColor: config.bgColor,
                color: contrast.primaryText,
                backgroundImage:
                  config.motif === 'checkerboard'
                    ? 'repeating-conic-gradient(#000000 0% 25%, #ffffff 0% 50%)'
                    : undefined,
                backgroundSize: config.motif === 'checkerboard' ? '12px 12px' : undefined,
                padding: config.motif === 'checkerboard' ? '8px' : `${Math.max(5, Math.round(config.photoGap * 0.4))}px`,
              }}
              className={`relative rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between select-none transition-all duration-300 mx-auto gpu-layer will-change-transform ${isLandscape4R
                  ? 'w-full max-w-[330px] sm:max-w-[360px] aspect-[3/2]'
                  : isPortrait4R
                    ? 'w-[230px] sm:w-[270px] aspect-[2/3]'
                    : isStrip
                      ? 'w-[155px] sm:w-[185px] aspect-[1/3]'
                      : 'w-[220px] sm:w-[250px] aspect-[3/4]'
                }`}
            >
              {/* Inner wrapper for double-border or checkerboard nesting */}
              <div
                style={{
                  backgroundColor: config.motif === 'checkerboard' ? config.bgColor : 'transparent',
                }}
                className={`w-full h-full flex flex-col justify-between relative p-1 sm:p-1.5 ${config.motif === 'double-border'
                    ? contrast.isLight
                      ? 'border-2 border-double border-slate-900/40'
                      : 'border-2 border-double border-white/40'
                    : ''
                  }`}
              >
                {/* Header Title & Subtitle */}
                <div className="text-center py-0.5 shrink-0 overflow-hidden px-1">
                  <div
                    style={{ color: contrast.primaryText }}
                    className={`text-[9px] sm:text-[10.5px] font-bold leading-tight truncate ${getFontFamilyClass()}`}
                  >
                    {config.name || 'Our Special Moments'}
                  </div>
                  {config.subtitle && (
                    <div
                      style={{ color: contrast.secondaryText }}
                      className="text-[6px] sm:text-[6.5px] font-mono tracking-wider truncate mt-0.5 leading-tight"
                    >
                      {config.subtitle}
                    </div>
                  )}
                </div>

                {/* Photos Layout Rendering (Proper Aspect Ratio, Centered Photos, No Cut-Off Faces) */}
                <div className="flex-1 flex flex-col justify-between my-0.5 overflow-hidden min-h-0">
                  {/* 1. Strip Vertikal 3 Foto */}
                  {config.layoutBase === 'strip-3' && (
                    <div
                      style={{ gap: `${Math.round(config.photoGap * 0.3)}px` }}
                      className="flex-1 flex flex-col justify-between h-full min-h-0"
                    >
                      {[SAMPLE_PHOTOS[0], SAMPLE_PHOTOS[1], SAMPLE_PHOTOS[2]].map((src, i) => (
                        <div
                          key={i}
                          style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                          className="flex-1 min-h-0 overflow-hidden bg-black/40 shadow-xs relative border border-black/10"
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 2. Korean Strip Vertikal 4 Foto */}
                  {config.layoutBase === 'strip-4' && (
                    <div
                      style={{ gap: `${Math.round(config.photoGap * 0.25)}px` }}
                      className="flex-1 flex flex-col justify-between h-full min-h-0"
                    >
                      {SAMPLE_PHOTOS.slice(0, 4).map((src, i) => (
                        <div
                          key={i}
                          style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                          className="flex-1 min-h-0 overflow-hidden bg-black/40 shadow-xs relative border border-black/10"
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3. 4R Landscape Grid 2x2 */}
                  {config.layoutBase === '4r-grid4' && (
                    <div
                      style={{ gap: `${Math.round(config.photoGap * 0.3)}px` }}
                      className="grid grid-cols-2 grid-rows-2 flex-1 h-full min-h-0"
                    >
                      {SAMPLE_PHOTOS.slice(0, 4).map((src, i) => (
                        <div
                          key={i}
                          style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                          className="overflow-hidden bg-black/40 shadow-xs relative border border-black/10 w-full h-full min-h-0"
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 4. 4R Portrait Grid 2x2 (Tegak 4 Foto) */}
                  {config.layoutBase === '4r-portrait-grid4' && (
                    <div
                      style={{ gap: `${Math.round(config.photoGap * 0.3)}px` }}
                      className="grid grid-cols-2 grid-rows-2 flex-1 h-full min-h-0"
                    >
                      {SAMPLE_PHOTOS.slice(0, 4).map((src, i) => (
                        <div
                          key={i}
                          style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                          className="overflow-hidden bg-black/40 shadow-xs relative border border-black/10 w-full h-full min-h-0"
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 5. 4R 3-Kolom Vertikal */}
                  {config.layoutBase === '4r-col3' && (
                    <div
                      style={{ gap: `${Math.round(config.photoGap * 0.3)}px` }}
                      className="grid grid-cols-3 flex-1 h-full min-h-0"
                    >
                      {SAMPLE_PHOTOS.slice(0, 3).map((src, i) => (
                        <div
                          key={i}
                          style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                          className="overflow-hidden bg-black/40 shadow-xs relative border border-black/10 w-full h-full min-h-0"
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 6. 4R Asimetris (1 Besar + 2 Kecil) */}
                  {config.layoutBase === '4r-split3' && (
                    <div
                      style={{ gap: `${Math.round(config.photoGap * 0.25)}px` }}
                      className="flex-1 flex flex-col justify-between h-full min-h-0"
                    >
                      <div
                        style={{ gap: `${Math.round(config.photoGap * 0.25)}px` }}
                        className="grid grid-cols-2 flex-1 min-h-0"
                      >
                        <div
                          style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                          className="overflow-hidden bg-black/40 shadow-xs border border-black/10 w-full h-full min-h-0"
                        >
                          <img
                            src={SAMPLE_PHOTOS[0]}
                            alt=""
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>
                        <div
                          style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                          className="overflow-hidden bg-black/40 shadow-xs border border-black/10 w-full h-full min-h-0"
                        >
                          <img
                            src={SAMPLE_PHOTOS[1]}
                            alt=""
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>
                      </div>
                      <div
                        style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                        className="flex-1 min-h-0 overflow-hidden bg-black/40 shadow-xs border border-black/10 w-full"
                      >
                        <img
                          src={SAMPLE_PHOTOS[2]}
                          alt=""
                          className="w-full h-full object-cover object-center block"
                        />
                      </div>
                    </div>
                  )}

                  {/* 7. Single Card / Polaroid */}
                  {config.layoutBase === 'polaroid-1' && (
                    <div className="flex-1 flex flex-col justify-center items-center h-full min-h-0">
                      <div
                        style={{ borderRadius: `${Math.round(config.cornerRadius * 0.4)}px` }}
                        className="w-full aspect-square max-h-[90%] overflow-hidden bg-black/40 shadow-inner border border-black/10"
                      >
                        <img
                          src={SAMPLE_PHOTOS[0]}
                          alt=""
                          className="w-full h-full object-cover object-center block"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3-Part Footer Branding: Left (Locked IziaPhoto), Center (Format/Note), Right (Date) */}
                <div
                  style={{ borderColor: contrast.divider }}
                  className="pt-1 border-t flex items-center justify-between px-1 shrink-0"
                >
                  {/* Left: Locked IziaPhoto Logo */}
                  <div className="flex items-center text-[8.5px] sm:text-[9.5px] font-extrabold tracking-tight select-none">
                    <span style={{ color: contrast.primaryText }}>Izia</span>
                    <span style={{ color: contrast.photoAccent }}>Photo</span>
                  </div>

                  {/* Center: Layout Format / Custom Subtext */}
                  <div
                    style={{ color: contrast.secondaryText }}
                    className="text-[6.5px] sm:text-[7.5px] font-mono tracking-wider truncate max-w-[120px] text-center uppercase px-1"
                  >
                    {config.footer || currentMeta.name.replace('Format ', '').toUpperCase()}
                  </div>

                  {/* Right: Date */}
                  <div
                    style={{ color: contrast.secondaryText }}
                    className="text-[6.5px] sm:text-[7.5px] font-mono tracking-wider opacity-80 text-right"
                  >
                    {nowDateStr}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Controls & Settings (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* STEP 1: Pilih Tata Letak Kotak Foto (Layout Base) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Layout className="w-3.5 h-3.5 text-coral-400" />
                  <span>1. Pilih Tata Letak Kotak Foto (Layout Base)</span>
                </label>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] text-gray-400 hover:text-coral-300 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(BASE_LAYOUTS) as CustomBaseLayout[]).map((layoutKey) => {
                  const item = BASE_LAYOUTS[layoutKey];
                  const isSelected = config.layoutBase === layoutKey;

                  return (
                    <button
                      key={layoutKey}
                      type="button"
                      onClick={() => handleUpdate('layoutBase', layoutKey)}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${isSelected
                          ? 'border-coral-500 bg-coral-500/20 shadow-md ring-1 ring-coral-400/50'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                        }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-coral-400/20 text-coral-300 font-bold">
                          {item.slots} Foto
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-coral-400" />}
                      </div>
                      <div className="text-xs font-bold text-white leading-snug">
                        {item.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Warna & Motif Frame */}
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <label className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-coral-400" />
                <span>2. Warna & Motif Frame</span>
              </label>

              {/* Interactive Color Swatch + Native Color Picker */}
              {(() => {
                const isLightActive = isLightColor(config.bgColor);
                return (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-black/40 border border-white/10">
                      {/* Kolom Kiri: Kotak Warna Preview + Label/Tombol di Bawahnya */}
                      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                        {/* Kotak Warna Preview dengan Palette Icon */}
                        <div
                          onClick={triggerColorPicker}
                          className="relative group cursor-pointer"
                          title="Sentuh untuk Custom Warna"
                        >
                          <div
                            style={{ backgroundColor: config.bgColor }}
                            className="w-13 h-13 rounded-xl border-2 border-white/40 shadow-md flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-rose-400 overflow-hidden"
                          >
                            <Palette
                              className={`w-5 h-5 drop-shadow-xs transition-transform group-hover:rotate-12 ${isLightActive ? 'text-gray-900' : 'text-white'
                                }`}
                            />
                          </div>
                          {/* Native Color Picker (Fills whole swatch) */}
                          <input
                            ref={colorInputRef}
                            type="color"
                            value={config.bgColor.startsWith('#') ? config.bgColor : '#FFFFFF'}
                            onChange={(e) => handleBgColorChange(e.target.value)}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            title="Sentuh untuk Custom Warna"
                          />
                        </div>

                        {/* Teks Bantuan di Bawah Kotak Warna */}
                        <button
                          type="button"
                          onClick={triggerColorPicker}
                          className="text-xs text-rose-400 font-medium hover:text-rose-300 transition-colors text-center cursor-pointer active:scale-95 leading-tight"
                        >
                          Sentuh untuk Custom Warna
                        </button>
                      </div>

                      {/* Kolom Kanan: Label 'Kode Hex:' dan Input Bersih */}
                      <div className="flex-1 space-y-1.5">
                        <label className="text-xs font-bold text-gray-300 block">
                          Kode Hex:
                        </label>
                        <input
                          type="text"
                          value={config.bgColor}
                          onChange={(e) => handleBgColorChange(e.target.value)}
                          placeholder="#FEF9C3"
                          maxLength={9}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/15 text-xs font-mono font-bold text-white uppercase focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all placeholder:text-gray-600"
                        />
                      </div>
                    </div>

                    {/* Quick Preset Swatches with Highlight & Thick Checkmark */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-gray-300">Palet Warna Cepat:</span>
                        <span className="text-gray-400 text-[10px]">Hitam, Off-White, Pastel & Bold</span>
                      </div>

                      <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-black/25 border border-white/5">
                        {PRESET_COLORS.map((c) => {
                          const isSelected = config.bgColor.toLowerCase() === c.hex.toLowerCase();
                          const isLight = isLightColor(c.hex);

                          return (
                            <button
                              key={c.hex}
                              type="button"
                              onClick={() => handleBgColorChange(c.hex)}
                              style={{ backgroundColor: c.hex }}
                              title={`${c.label} (${c.hex})`}
                              className={`relative w-8 h-8 rounded-full transition-all active:scale-90 flex items-center justify-center shadow-xs ${isSelected
                                  ? 'border-2 border-white ring-4 ring-coral-500 scale-110 shadow-coral-500/40 z-10'
                                  : 'border border-white/25 hover:scale-105 hover:border-white/60'
                                }`}
                            >
                              {isSelected && (
                                <Check
                                  className={`w-4 h-4 stroke-[3.5] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${isLight ? 'text-gray-950' : 'text-white'
                                    }`}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Motif Frame (Polos, Checkerboard catur, Double-border) */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-[11px] font-semibold text-gray-300 mb-1.5">
                  Pilihan Motif Frame:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'plain', label: 'Polos', desc: 'Minimalis Elegan' },
                    { id: 'checkerboard', label: 'Checkerboard', desc: 'Papan Catur Korea' },
                    { id: 'double-border', label: 'Border Ganda', desc: 'Garis Dobel Retro' },
                  ].map((m) => {
                    const isSelected = config.motif === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleUpdate('motif', m.id as FrameMotif)}
                        className={`p-2 rounded-xl border text-center transition-all ${isSelected
                            ? 'border-coral-500 bg-coral-500/20 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                      >
                        <div className="text-xs font-bold">{m.label}</div>
                        <div className="text-[9px] text-gray-400">{m.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 3: Edit Teks Frame */}
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <label className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-coral-400" />
                <span>3. Edit Teks Frame</span>
              </label>

              {/* Judul Utama */}
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-gray-300">
                  Judul Utama / Nama Frame:
                </div>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => handleUpdate('name', e.target.value)}
                  placeholder="Misal: Our Anniversary, Birthday Party, Seoul Trip..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-coral-400"
                />
              </div>

              {/* Subtitle / Tanggal */}
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-gray-300">
                  Subtitle / Tanggal / Pesan Singkat:
                </div>
                <input
                  type="text"
                  value={config.subtitle}
                  onChange={(e) => handleUpdate('subtitle', e.target.value)}
                  placeholder="Misal: 10 SEPTEMBER 2026 • BEST FRIENDS FOREVER"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-coral-400"
                />
              </div>

              {/* Footer / Subtext Note */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300">
                  <span>Teks Tengah Footer / Catatan Layout:</span>
                  <span className="text-[10px] text-coral-400 font-mono">
                    🔒 Kiri: IziaPhoto • Kanan: Tanggal (Terkunci)
                  </span>
                </div>
                <input
                  type="text"
                  value={config.footer}
                  onChange={(e) => handleUpdate('footer', e.target.value)}
                  placeholder="Misal: 4-GRID • 4R PRINT atau catatan kustom..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-coral-400"
                />
                <span className="text-[10px] text-gray-400 block">
                  Branding logo 'IziaPhoto' di pojok kiri bawah dan tanggal di pojok kanan bawah dikunci permanen untuk menjaga hak cipta.
                </span>
              </div>

              {/* Gaya Font & Warna Font */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Gaya Font */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-gray-300">Gaya Font:</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'sans', label: 'Modern Sans' },
                      { id: 'serif', label: 'Serif Retro' },
                      { id: 'cursive', label: 'Handwritten' },
                      { id: 'display', label: 'Bold Display' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleUpdate('fontStyle', f.id as FontStyleOption)}
                        className={`p-2 rounded-xl border text-xs text-center transition-all ${config.fontStyle === f.id
                            ? 'border-coral-500 bg-coral-500/20 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Warna Font */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-gray-300">Warna Font:</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdate('textColor', '#111111')}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${config.textColor === '#111111'
                          ? 'border-coral-500 bg-coral-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-black border border-white/40 inline-block" />
                      <span>Hitam</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdate('textColor', '#FFFFFF')}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${config.textColor === '#FFFFFF'
                          ? 'border-coral-500 bg-coral-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-white border border-black/40 inline-block" />
                      <span>Putih</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: Radius & Jarak Foto (Sliders) */}
            <div className="space-y-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <label className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-coral-400" />
                <span>4. Radius Sudut & Jarak Foto (Gap/Padding)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Corner Radius Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-300">
                    <span>Kebulatan Sudut (Corner Radius):</span>
                    <span className="font-mono font-bold text-coral-400">{config.cornerRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="2"
                    value={config.cornerRadius}
                    onChange={(e) => handleUpdate('cornerRadius', parseInt(e.target.value, 10))}
                    className="w-full accent-coral-500 cursor-pointer"
                  />
                </div>

                {/* Gap Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-300">
                    <span>Jarak / Padding Foto:</span>
                    <span className="font-mono font-bold text-coral-400">{config.photoGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="36"
                    step="2"
                    value={config.photoGap}
                    onChange={(e) => handleUpdate('photoGap', parseInt(e.target.value, 10))}
                    className="w-full accent-coral-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions - ALWAYS visible on mobile & desktop (Sticky Bottom & Safe Area Aware) */}
        <div className="sticky bottom-0 z-30 shrink-0 bg-[#14151F] border-t border-white/15 px-4 py-3 sm:px-6 sm:py-3.5 pb-safe flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors shrink-0 active:scale-95"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSaveAndUse}
            className="flex-1 sm:flex-initial px-4 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-coral-500 via-rose-500 to-coral-600 hover:opacity-95 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-coral-500/30 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="truncate">Gunakan & Mulai Foto ({currentMeta.slots} Foto)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
