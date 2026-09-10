import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  PhotoboothTemplate,
} from '../utils/templates';
import { getCapturedPhotos, clearCapturedPhotos } from '../utils/storage';
import { TemplateCardMockup } from '../components/TemplateCardMockup';
import { CustomBuilderModal } from '../components/CustomBuilderModal';
import { Sparkles, Plus } from 'lucide-react';

export function TemplateSelectionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || 'all');
  const [savedPhotos, setSavedPhotos] = useState<string[]>(() => getCapturedPhotos());
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams, { replace: true });
  };

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
              {hasPhotos ? 'GANTI TEMPLATE' : 'Studio Preset'}
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
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide text-coral-400 glass-pill mb-3">
            Selamat Datang
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {hasPhotos ? 'Pilih Frame Baru' : 'Studio Photobooth IziaPhoto'}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            {hasPhotos
              ? 'Klik template mana saja, foto Anda akan langsung ditempelkan secara otomatis ke frame tersebut.'
              : 'Pilih tema frame viral atau buat desain template Anda sendiri sesuai selera.'}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2.5 select-none">
            <span className="w-6 h-px bg-white/15" />
            <span className="text-xs sm:text-sm italic text-gray-400">
              powered by : Faris Izzi Asrori
            </span>
            <span className="w-6 h-px bg-white/15" />
          </div>
        </div>

        {/* HERO BANNER BUTTON: + Bikin Template Kustom Sendiri (Top Prominent Placement) */}
        <div
          onClick={() => setIsBuilderOpen(true)}
          className="w-full max-w-4xl mx-auto mb-8 rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-coral-500/15 via-rose-500/20 to-purple-500/15 border-2 border-coral-500/40 hover:border-coral-400 hover:shadow-2xl hover:shadow-coral-500/20 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 group active:scale-[0.99] relative overflow-hidden"
        >
          {/* Subtle glow effect */}
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-coral-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-coral-500/20 transition-all" />

          {/* Left: Icon & Text Info */}
          <div className="flex items-center gap-4 text-left w-full sm:w-auto">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-coral-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-coral-500/30 group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <Sparkles className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-coral-500 text-white uppercase tracking-wider shadow-xs">
                  ✦ Custom Builder
                </span>
                <span className="text-xs font-semibold text-coral-300">
                  7 Layout Dasar Bebas Kustom
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-extrabold text-white group-hover:text-coral-300 transition-colors">
                + Bikin Template Kustom Sendiri
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5 max-w-xl leading-relaxed">
                Pilih layout strip Korea, 4R landscape & portrait, atau polaroid. Atur motif catur/border, warna latar, dan teks sesukamu!
              </p>
            </div>
          </div>

          {/* Right: Prominent Action Button */}
          <div className="w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsBuilderOpen(true);
              }}
              className="w-full sm:w-auto py-3 px-6 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-coral-500 via-rose-500 to-coral-600 group-hover:opacity-95 shadow-lg shadow-coral-500/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Mulai Bikin Template</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-10">
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
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

                {/* Authentic Realistic Mockup representing each template layout */}
                <div className="w-full h-[270px] sm:h-[285px] rounded-2xl mb-4 flex items-center justify-center border border-white/5 bg-black/30 shadow-inner transition-transform group-hover:scale-[1.02] duration-300 overflow-hidden relative">
                  <TemplateCardMockup template={template} />
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

      {/* In-App Custom Template Builder Modal */}
      <CustomBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
      />
    </div>
  );
}
