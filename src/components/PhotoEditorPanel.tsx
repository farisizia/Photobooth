import { useState } from 'react';
import { Palette, Type, Wand2, RotateCcw, Sparkles } from 'lucide-react';
import { PhotoboothTemplate } from '../utils/templates';
import { CameraFilter, CAMERA_FILTERS } from '../utils/filters';
import { OverlayItem, OVERLAY_ITEMS } from '../utils/overlays';
import { FontStyleOption, TextColorOption } from '../utils/canvas';
import { FrameMotif } from '../utils/customBuilder';

interface PhotoEditorPanelProps {
  template: PhotoboothTemplate;
  customBgColor: string;
  onBgColorChange: (color: string) => void;
  customTextColor: TextColorOption;
  onTextColorChange: (color: TextColorOption) => void;
  fontStyle: FontStyleOption;
  onFontStyleChange: (font: FontStyleOption) => void;
  customTexts: {
    header?: string;
    subhead?: string;
    footer?: string;
  };
  onCustomTextsChange: (texts: { header?: string; subhead?: string; footer?: string }) => void;
  motif?: FrameMotif;
  onMotifChange?: (motif: FrameMotif) => void;
  cornerRadius?: number;
  onCornerRadiusChange?: (radius: number) => void;
  photoGap?: number;
  onPhotoGapChange?: (gap: number) => void;
  selectedFilter: CameraFilter;
  onSelectFilter: (filter: CameraFilter) => void;
  selectedOverlay: OverlayItem;
  onSelectOverlay: (overlay: OverlayItem) => void;
  onResetDefaults: () => void;
}

// Curated aesthetic presets
const PRESET_COLORS = [
  { label: 'Template', hex: 'default' },
  { label: 'Putih Bersih', hex: '#FFFFFF' },
  { label: 'Charcoal Noir', hex: '#0F1015' },
  { label: 'Kertas Retro', hex: '#F4EFEB' },
  { label: 'Pastel Pink', hex: '#FFF0F5' },
  { label: 'Soft Lavender', hex: '#F5F3FF' },
  { label: 'Cream Butter', hex: '#FEF9C3' },
  { label: 'Sage Mint', hex: '#ECFDF5' },
  { label: 'Sky Blue', hex: '#F0F9FF' },
  { label: 'Deep Crimson', hex: '#450A0A' },
  { label: 'Midnight Blue', hex: '#0F172A' },
];

const FONT_OPTIONS: { id: FontStyleOption; label: string; preview: string; sub: string }[] = [
  { id: 'sans', label: 'Sans Modern', preview: 'Sans Modern', sub: 'Plus Jakarta Sans' },
  { id: 'serif', label: 'Serif Klasik', preview: 'Serif Editorial', sub: 'Playfair / Cinzel' },
  { id: 'mono', label: 'Typewriter / Mono', preview: 'Space Mono', sub: 'Retro Mesin Tik' },
  { id: 'cursive', label: 'Script / Handwriting', preview: 'Handwritten ♡', sub: 'Aesthetic Cursive' },
  { id: 'display', label: 'Bold Display', preview: 'BOLD DISPLAY', sub: 'Impact / Headline' },
];

export function PhotoEditorPanel({
  template,
  customBgColor,
  onBgColorChange,
  customTextColor,
  onTextColorChange,
  fontStyle,
  onFontStyleChange,
  customTexts,
  onCustomTextsChange,
  motif,
  onMotifChange,
  cornerRadius,
  onCornerRadiusChange,
  photoGap,
  onPhotoGapChange,
  selectedFilter,
  onSelectFilter,
  selectedOverlay,
  onSelectOverlay,
  onResetDefaults,
}: PhotoEditorPanelProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'style' | 'effects'>('text');

  // Determine placeholder hints based on template layout
  const getHeaderPlaceholder = () => {
    if (template.layoutType === 'newspaper') return 'BREAKING NEWS';
    if (template.layoutType === 'korean-4cut') return '✦ 인생네컷 • IZIAPHOTO ✦';
    if (template.layoutType === 'music-player') return 'The 1975 • About You';
    if (template.layoutType === 'cinema-ticket') return '🎟️ CINEMA MOVIE TICKET • ADMIT ONE 🎟️';
    if (template.layoutType === 'receipt') return 'IZIAPHOTO COFFEE & ROASTERY';
    if (template.layoutType.startsWith('4r-')) return 'IziaPhoto • 4R PHOTOBOOTH';
    return 'Judul / Header Kustom...';
  };

  const getFooterPlaceholder = () => {
    if (template.layoutType === 'newspaper') return 'IZIAPHOTO SPECIAL EDITION • 2026';
    if (template.layoutType === 'korean-4cut') return 'KOREAN PHOTOBOOTH • [DATE]';
    if (template.layoutType === 'music-player') return 'SPOTIFY CANVAS • LIVE SOUND';
    if (template.layoutType === 'receipt') return 'THANK YOU FOR VISITING! • HAVE A NICE DAY';
    if (template.layoutType.startsWith('4r-')) return 'IZIAPHOTO • 4R PRINT';
    return 'Stempel Tanggal / Footer Kustom...';
  };

  return (
    <div className="w-full bg-[#12131A] border border-white/10 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col text-white">
      {/* Panel Header with Title & Reset */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-coral-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
            Editor Kustomisasi Frame
          </span>
        </div>

        <button
          type="button"
          onClick={onResetDefaults}
          title="Reset Semua ke Default"
          className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-coral-300 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Default</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-2xl border border-white/5 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('text')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'text'
              ? 'bg-gradient-to-r from-coral-500 to-rose-500 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Teks & Font</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'style'
              ? 'bg-gradient-to-r from-coral-500 to-rose-500 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Warna & Frame</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('effects')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'effects'
              ? 'bg-gradient-to-r from-coral-500 to-rose-500 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Filter</span>
        </button>
      </div>

      {/* TAB 1: EDIT TEKS FRAME & PILIHAN FONT */}
      {activeTab === 'text' && (
        <div className="space-y-4 animate-fade-in">
          {/* Judul Utama / Header */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold text-gray-200">
              <span>1. Judul Utama / Nama Frame:</span>
              {customTexts.header && (
                <button
                  type="button"
                  onClick={() => onCustomTextsChange({ ...customTexts, header: undefined })}
                  className="text-[10px] text-coral-400 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <input
              type="text"
              value={customTexts.header ?? ''}
              onChange={(e) =>
                onCustomTextsChange({
                  ...customTexts,
                  header: e.target.value,
                })
              }
              placeholder={getHeaderPlaceholder()}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-coral-400 font-medium"
            />
            <span className="text-[10px] text-gray-400">
              Ganti judul header dengan nama event, nama teman/pasangan, dll.
            </span>
          </div>

          {/* Subtitle / Tanggal / Catatan Kaki */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold text-gray-200">
              <span>2. Subtitle / Tanggal / Catatan Kaki:</span>
              {customTexts.subhead && (
                <button
                  type="button"
                  onClick={() => onCustomTextsChange({ ...customTexts, subhead: undefined })}
                  className="text-[10px] text-coral-400 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <input
              type="text"
              value={customTexts.subhead ?? ''}
              onChange={(e) =>
                onCustomTextsChange({
                  ...customTexts,
                  subhead: e.target.value,
                })
              }
              placeholder="Misal: Graduation Day, Seoul Trip, pesan pendek..."
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-coral-400 font-medium"
            />
          </div>

          {/* Teks Tengah Footer / Catatan Layout */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold text-gray-200">
              <span>3. Teks Tengah Footer / Catatan Layout:</span>
              {customTexts.footer && (
                <button
                  type="button"
                  onClick={() => onCustomTextsChange({ ...customTexts, footer: undefined })}
                  className="text-[10px] text-coral-400 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <input
              type="text"
              value={customTexts.footer ?? ''}
              onChange={(e) =>
                onCustomTextsChange({
                  ...customTexts,
                  footer: e.target.value,
                })
              }
              placeholder={getFooterPlaceholder()}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-coral-400 font-medium"
            />
            <span className="text-[10px] text-gray-400 block">
              🔒 Logo branding 'IziaPhoto' di pojok kiri bawah dan tanggal di pojok kanan bawah terkunci permanen untuk hak cipta.
            </span>
          </div>

          {/* Pilihan Gaya Font */}
          <div className="pt-2 space-y-2 border-t border-white/10">
            <div className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Pilihan Gaya Font (Tipografi)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {FONT_OPTIONS.map((f) => {
                const isSelected = fontStyle === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onFontStyleChange(f.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-coral-500 bg-coral-500/20 shadow-sm'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`text-xs font-bold truncate ${
                        f.id === 'serif'
                          ? 'font-serif'
                          : f.id === 'mono'
                          ? 'font-mono'
                          : f.id === 'cursive'
                          ? 'italic font-serif'
                          : 'font-sans'
                      }`}
                    >
                      {f.preview}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{f.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STYLING (WARNA BACKGROUND & WARNA TEKS) */}
      {activeTab === 'style' && (
        <div className="space-y-4 animate-fade-in">
          {/* Warna Background Frame */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <label className="text-xs font-bold text-gray-200 uppercase tracking-wider block">
              1. Warna Background Frame
            </label>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={customBgColor === 'default' ? template.theme.bg : customBgColor}
                  onChange={(e) => onBgColorChange(e.target.value)}
                  className="w-11 h-11 rounded-xl cursor-pointer bg-transparent border-2 border-white/20 p-0.5 shadow-sm"
                />
              </div>

              <div className="flex-1 space-y-1">
                <div className="text-[11px] text-gray-400 font-medium">Hex Color:</div>
                <input
                  type="text"
                  value={customBgColor === 'default' ? template.theme.bg : customBgColor}
                  onChange={(e) => onBgColorChange(e.target.value)}
                  placeholder="#FFFFFF"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs font-mono font-bold text-white uppercase focus:outline-hidden focus:border-coral-400"
                />
              </div>
            </div>
          </div>

          {/* Quick Preset Swatches */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-gray-400">Palet Warna Cepat:</div>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((pc) => {
                const colorVal = pc.hex === 'default' ? template.theme.bg : pc.hex;
                const isSelected =
                  customBgColor === pc.hex ||
                  (pc.hex === 'default' && customBgColor === template.theme.bg);

                return (
                  <button
                    key={pc.label}
                    type="button"
                    onClick={() => onBgColorChange(colorVal)}
                    title={`${pc.label} (${colorVal})`}
                    style={{ backgroundColor: colorVal }}
                    className={`w-7 h-7 rounded-full border-2 transition-all active:scale-90 flex items-center justify-center text-[10px] ${
                      isSelected
                        ? 'border-coral-500 ring-2 ring-coral-400/50 scale-110 shadow-md'
                        : 'border-white/30 hover:scale-105'
                    }`}
                  >
                    {pc.hex === 'default' && (
                      <span className="text-[9px] drop-shadow-sm">★</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Motif Frame */}
          {onMotifChange && (
            <div className="pt-2 space-y-2 border-t border-white/10">
              <div className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                2. Motif Frame
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'plain', label: 'Polos', desc: 'Minimalist' },
                  { id: 'checkerboard', label: 'Catur', desc: 'Checker' },
                  { id: 'double-border', label: 'Garis Ganda', desc: 'Double line' },
                ].map((m) => {
                  const isSelected = (motif || 'plain') === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onMotifChange(m.id as FrameMotif)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-coral-500 bg-coral-500/20 text-white font-bold shadow-xs'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{m.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Radius Sudut & Jarak Foto Sliders */}
          {(onCornerRadiusChange || onPhotoGapChange) && (
            <div className="pt-2 space-y-3 border-t border-white/10">
              {onCornerRadiusChange && cornerRadius !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-gray-200">
                    <span>Radius Sudut Foto:</span>
                    <span className="text-coral-400 font-mono">{cornerRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="2"
                    value={cornerRadius}
                    onChange={(e) => onCornerRadiusChange(Number(e.target.value))}
                    className="w-full accent-coral-500 cursor-pointer"
                  />
                </div>
              )}

              {onPhotoGapChange && photoGap !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-gray-200">
                    <span>Jarak Antar Foto (Gap):</span>
                    <span className="text-coral-400 font-mono">{photoGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="36"
                    step="2"
                    value={photoGap}
                    onChange={(e) => onPhotoGapChange(Number(e.target.value))}
                    className="w-full accent-coral-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}

          {/* Pilihan Warna Teks (Hitam / Putih / Auto) */}
          <div className="pt-2 space-y-2 border-t border-white/10">
            <div className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              3. Warna Teks (Hitam / Putih / Auto)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'auto', label: 'Auto', desc: 'Bawaan Frame' },
                { id: '#FFFFFF', label: 'Putih', desc: '#FFFFFF' },
                { id: '#111111', label: 'Hitam', desc: '#111111' },
              ].map((opt) => {
                const isSelected = customTextColor === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onTextColorChange(opt.id as TextColorOption)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-coral-500 bg-coral-500/20 text-white font-bold shadow-xs'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center justify-center gap-1.5">
                      {opt.id !== 'auto' && (
                        <span
                          style={{ backgroundColor: opt.id }}
                          className="w-3 h-3 rounded-full border border-white/30 inline-block"
                        />
                      )}
                      <span>{opt.label}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FILTER & EFEK */}
      {activeTab === 'effects' && (
        <div className="space-y-3.5 animate-fade-in">
          {/* Tone Filters */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-gray-200">Filter Tone Foto:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {CAMERA_FILTERS.map((f) => {
                const isSelected = selectedFilter.id === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onSelectFilter(f)}
                    className={`px-2.5 py-1.5 rounded-xl text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-coral-500 text-white font-bold shadow-xs'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="block truncate">{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overlays */}
          <div className="space-y-1.5 pt-1">
            <div className="text-xs font-bold text-gray-200">Stiker & Overlay:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {OVERLAY_ITEMS.map((o) => {
                const isSelected = selectedOverlay.id === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => onSelectOverlay(o)}
                    className={`px-2.5 py-1.5 rounded-xl text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-pink-500 text-white font-bold shadow-xs'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="block truncate">{o.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
