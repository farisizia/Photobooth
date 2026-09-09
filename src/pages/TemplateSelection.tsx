import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TEMPLATES, TEMPLATE_CATEGORIES, PhotoboothTemplate } from '../utils/templates';
import { getCapturedPhotos, clearCapturedPhotos } from '../utils/storage';

export function TemplateSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedPhotos, setSavedPhotos] = useState<string[]>(() => getCapturedPhotos());
  const navigate = useNavigate();

  const hasPhotos = savedPhotos.length > 0;

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    if (selectedCategory === 'all') return true;
    return tpl.category === selectedCategory;
  });

  const handleSelect = (template: PhotoboothTemplate) => {
    navigate(`/photobooth?template=${template.id}`);
  };

  const handleResetPhotos = () => {
    clearCapturedPhotos();
    setSavedPhotos([]);
  };

  return (
    <div className="min-h-screen bg-[#0C0D12] text-white flex flex-col selection:bg-coral-500">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-gray-300 hover:text-white transition-all active:scale-95"
        >
          <span>←</span>
          <span>Beranda</span>
        </Link>

        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img
            src="/logo-icon.png"
            alt="IziaPhoto"
            className="w-8 h-8 rounded-lg shadow-sm object-contain"
          />
          <div className="text-left">
            <span className="font-display font-black text-sm sm:text-base tracking-tight text-white block leading-none">
              Izia<span className="text-violet-400">Photo</span>
            </span>
            <span className="block text-[8px] font-bold text-coral-400 tracking-widest uppercase mt-0.5">
              {hasPhotos ? 'GANTI TEMPLATE' : 'PRESET VIRAL'}
            </span>
          </div>
        </Link>

        <div className="w-16 flex justify-end">
          <span className="text-xs px-2.5 py-1 rounded-full bg-coral-500/10 text-coral-400 font-semibold border border-coral-500/20">
            {hasPhotos ? 'Hasil Siap' : 'Langkah 1/2'}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Banner if user already has photos */}
        {hasPhotos && (
          <div className="max-w-2xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-xl">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-2xl">📸</span>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Foto Anda Sudah Siap ({savedPhotos.length} foto)
                </h4>
                <p className="text-xs text-gray-300 mt-0.5">
                  Pilih frame di bawah untuk langsung melihat hasil barumu tanpa perlu foto ulang.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetPhotos}
              className="text-xs text-gray-400 hover:text-rose-400 underline underline-offset-2 flex-shrink-0 transition-colors"
            >
              Hapus & Foto Ulang
            </button>
          </div>
        )}

        {/* Title Section */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-coral-400 glass-pill mb-3 uppercase">
            Preset Photobooth Viral
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {hasPhotos ? 'Pilih Frame Baru' : 'Pilih Template Favoritmu'}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            {hasPhotos
              ? 'Klik template mana saja, foto Anda akan langsung ditempelkan secara otomatis ke frame tersebut.'
              : 'Pilih tema frame viral yang kamu inginkan. Sesi kamera akan otomatis mengambil foto sesuai jumlah slot.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-10">
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-coral-500 to-rose-500 text-white shadow-lg shadow-coral-500/25 scale-105'
                    : 'glass-pill text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelect(template)}
              className="glass-panel rounded-3xl p-5 border border-white/10 hover:border-coral-500/50 hover:shadow-2xl hover:shadow-coral-500/15 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-coral-300 border border-white/10 uppercase tracking-wider">
                    {template.badge}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 capitalize">
                    {template.category}
                  </span>
                </div>

                {/* Custom Card Mockup representing each theme */}
                <div
                  style={{ backgroundColor: template.theme.bg }}
                  className="w-full aspect-[3/4] max-h-[300px] rounded-2xl p-3 mb-4 flex flex-col justify-between border shadow-inner transition-transform group-hover:scale-[1.02] duration-300 overflow-hidden relative"
                >
                  {/* --- NEWSPAPER MOCKUP --- */}
                  {template.category === 'newspaper' && (
                    <div className="h-full flex flex-col justify-between text-stone-900 border-2 border-stone-800 p-2">
                      <div className="text-center border-b border-stone-800 pb-1">
                        <span className="text-[7px] font-bold tracking-widest block uppercase">
                          ★ SPECIAL EDITION ★
                        </span>
                        <h4 className="text-xs font-extrabold font-serif tracking-wider">
                          THE DAILY SNAP
                        </h4>
                        <span className="text-[6px] tracking-wide block font-mono">
                          BREAKING NEWS • 2026
                        </span>
                      </div>
                      <div className="flex-1 my-1.5 flex flex-col gap-1.5 justify-center">
                        {Array.from({ length: template.slots }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-none bg-stone-300 border border-stone-800 flex items-center justify-center text-[8px] font-serif text-stone-700 font-bold"
                          >
                            [ FIG. {i + 1} PHOTO ]
                          </div>
                        ))}
                      </div>
                      <div className="text-[6px] text-center font-mono uppercase border-t border-stone-800 pt-1">
                        ALL STORIES AUTHENTIC • 2026
                      </div>
                    </div>
                  )}

                  {/* --- MUSIC PLAYER MOCKUP --- */}
                  {template.category === 'music' && (
                    <div className="h-full flex flex-col justify-between text-white p-1">
                      <div className="text-center text-[7px] text-gray-400 font-medium">
                        PLAYING FROM ALBUM: ABOUT YOU
                      </div>
                      <div className="flex-1 my-1.5 flex flex-col gap-1 justify-center">
                        {Array.from({ length: template.slots }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm bg-neutral-800 border border-white/10 flex items-center justify-center text-[8px] text-gray-400 font-mono"
                          >
                            Foto {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="pt-1 border-t border-white/10">
                        <div className="flex justify-between items-center text-[8px]">
                          <span className="font-bold text-white truncate">About You - The 1975</span>
                          <span className="text-emerald-400">💚</span>
                        </div>
                        {/* Mock Progress Bar */}
                        <div className="w-full h-1 bg-neutral-700 rounded-full mt-1 overflow-hidden">
                          <div className="w-2/3 h-full bg-emerald-500 rounded-full" />
                        </div>
                        <div className="flex justify-center gap-3 text-[9px] mt-1 text-gray-300">
                          <span>⏮</span>
                          <span className="text-white">▶</span>
                          <span>⏭</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- KOREAN 4-CUT MOCKUP --- */}
                  {template.category === 'korean' && (
                    <div className="h-full flex flex-col justify-between text-black p-1">
                      <div className="text-center text-[8px] font-bold tracking-widest">
                        ✦ 인생네컷 • IZIAPHOTO ✦
                      </div>
                      <div className="flex-1 my-1.5 flex flex-col gap-1 justify-center">
                        {Array.from({ length: template.slots }).map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 ${
                              template.id === 'korean-4cut-checker'
                                ? 'border border-black bg-neutral-200'
                                : 'rounded-md bg-rose-200/50 border border-rose-300'
                            } flex items-center justify-center text-[8px] font-medium text-neutral-800`}
                          >
                            Foto {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="text-[7px] text-center font-bold tracking-widest">
                        KOREAN PHOTOBOOTH 2026
                      </div>
                    </div>
                  )}

                  {/* --- RETRO 35MM FILM MOCKUP --- */}
                  {template.category === 'retro-film' && (
                    <div className="h-full flex flex-col justify-between text-amber-500 p-1 bg-zinc-950">
                      <div className="text-center text-[7px] font-mono tracking-widest">
                        ▶ KODAK PORTRA 400 • 35MM
                      </div>
                      <div className="flex-1 my-1 flex flex-col gap-1.5 justify-center px-4 relative">
                        {/* Sprocket Holes left & right */}
                        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around">
                          {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="w-2 h-3 bg-zinc-700 rounded-xs" />
                          ))}
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around">
                          {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="w-2 h-3 bg-zinc-700 rounded-xs" />
                          ))}
                        </div>
                        {Array.from({ length: template.slots }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[8px] font-mono text-zinc-400"
                          >
                            FRAME 2{i + 4}A
                          </div>
                        ))}
                      </div>
                      <div className="text-[6px] text-center font-mono text-red-500">
                        FILM LAB ARCHIVE • 2026
                      </div>
                    </div>
                  )}

                  {/* --- CUTE FRUIT MASCOT MOCKUP --- */}
                  {template.category === 'cute' && (
                    <div className="h-full flex flex-col justify-between text-rose-900 p-1">
                      <div className="text-center text-[8px] font-bold tracking-wider">
                        🍓 SWEET BERRY MOMENTS 🍑
                      </div>
                      <div className="flex-1 my-1 flex flex-col gap-1 justify-center items-center">
                        {Array.from({ length: template.slots }).map((_, i) => (
                          <div
                            key={i}
                            className="w-14 h-14 rounded-full bg-white border-2 border-rose-400 flex items-center justify-center text-[8px] font-bold text-rose-600 shadow-sm"
                          >
                            Foto {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="text-[7px] text-center font-handwriting font-bold">
                        ♡ Cutest Moments • 2026 ♡
                      </div>
                    </div>
                  )}

                  {/* --- RECEIPT / STRUK BELANJA MOCKUP --- */}
                  {template.category === 'receipt' && (
                    <div className="h-full flex flex-col justify-between text-zinc-900 font-mono p-1 border-x border-dashed border-zinc-400">
                      <div className="text-center border-b border-dashed border-zinc-400 pb-1">
                        <span className="text-[7px] font-bold block">*** IZIAPHOTO MART ***</span>
                        <span className="text-[6px] block">RECEIPT #2026 • 14:45</span>
                      </div>
                      <div className="flex-1 my-1 flex flex-col gap-1 justify-center">
                        {Array.from({ length: template.slots }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-zinc-200 border border-zinc-300 flex items-center justify-center text-[7px] text-zinc-600"
                          >
                            [ITEM #{i + 1} MEMORY]
                          </div>
                        ))}
                      </div>
                      <div className="text-[6px] border-t border-dashed border-zinc-400 pt-1 text-center">
                        <span>TOTAL: FREE!</span>
                        <span className="block tracking-widest mt-0.5">|||| ||| || ||||</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-base font-display font-bold text-white group-hover:text-coral-400 transition-colors">
                  {template.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(template);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-white/10 group-hover:bg-gradient-to-r group-hover:from-coral-500 group-hover:to-rose-500 transition-all flex items-center justify-center gap-2"
                >
                  <span>{hasPhotos ? 'Terapkan ke Foto Ini' : 'Gunakan Template'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
