import { Sparkles, Smartphone, Zap, Film, ShieldCheck, Wand2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 relative overflow-hidden bg-white">
      {/* Subtle ambient decorative pastel blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Soft Gradient Headline */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 mb-4 uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>KENAPA IZIAPHOTO?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Photobooth Vibes,{' '}
            <span className="bg-gradient-to-r from-coral-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Tanpa Ribet & Tanpa Boncos. ✨
            </span>
          </h2>

          <p className="text-slate-600 mt-3.5 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Nggak perlu antre di mall atau bayar puluhan ribu. Bikin konten aesthetic langsung dari HP kamu bareng ayang atau bestie.
          </p>
        </div>

        {/* Dynamic Gen Z Bento Grid (2:1, 1:2, 2:1 alternating layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* CARD 1 (WIDE, 2 COLS): 100% Gratis Tanpa Tipu-Tipu */}
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-50/90 via-amber-50/40 to-white border border-amber-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
            {/* Ambient inner soft glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

            <div>
              {/* Header row: Icon pill + Floating sticker tag */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-2xl sm:text-3xl shadow-xs group-hover:scale-110 transition-transform">
                  💸
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300/70 shadow-2xs rotate-1">
                    ✨ No Tipu-Tipu
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-emerald-700 border border-emerald-200 shadow-2xs">
                    Rp 0 Selamanya
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight mb-2">
                100% Gratis, Foto Sepuasnya
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Nggak ada biaya tersembunyi, nggak ada batasan kuota foto, dan nggak perlu bayar sewa mesin photobooth. Pose sebanyak yang kamu mau sampai dapet hasil yang paling estetik!
              </p>
            </div>

            {/* Visual Pills comparison */}
            <div className="mt-6 pt-5 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white/90 px-3 py-1 rounded-xl border border-amber-200/70 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Unlimited Shoot
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white/90 px-3 py-1 rounded-xl border border-amber-200/70 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Bebas Ganti Frame
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white/90 px-3 py-1 rounded-xl border border-amber-200/70 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Download HD Gratis
                </span>
              </div>
              <span className="text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Yuk Coba Sekarang <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* CARD 2 (COMPACT, 1 COL): Dari HP Kamu (Mini Phone Mockup) */}
          <div className="lg:col-span-1 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-rose-50/90 via-pink-50/40 to-white border border-rose-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
            <div>
              {/* Top row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-rose-100/80 border border-rose-200 flex items-center justify-center text-rose-600 shadow-xs group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-300/70 -rotate-2">
                  📱 Pocket Booth
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight mb-2">
                Langsung dari HP Kamu
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Kafe, kamar, kampus, atau pas nongkrong bareng bestie. Cukup buka browser dan photobooth langsung ready!
              </p>
            </div>

            {/* Mini Visual Smartphone Mockup */}
            <div className="bg-white rounded-2xl p-2.5 border border-rose-200/90 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 overflow-hidden relative flex-shrink-0 border border-slate-800">
                <img
                  src="/mockups/korean_pose_1.jpg"
                  alt="Mini selfie preview"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-800 truncate">Kamera Selfie Aktif</div>
                <div className="text-[10px] text-slate-500 font-mono">03s • Auto Flash Ready</div>
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                Live
              </span>
            </div>
          </div>

          {/* CARD 3 (COMPACT, 1 COL): Tanpa Install Aplikasi */}
          <div className="lg:col-span-1 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-sky-50/90 via-sky-50/40 to-white border border-sky-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
            <div>
              {/* Top row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-sky-100/80 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300/70 rotate-1">
                  ⚡ 0 Detik Delay
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight mb-2">
                Tanpa Install Aplikasi
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Memori HP penuh? Nggak masalah. Langsung jalan di Safari, Chrome, atau browser apa pun tanpa unduh apa-apa.
              </p>
            </div>

            {/* Mini Browser Bar Mockup */}
            <div className="bg-white rounded-2xl p-2.5 border border-sky-200/90 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="truncate">iziaphoto.com</span>
                <span className="ml-auto text-[9px] font-bold text-sky-600 bg-sky-100 px-1.5 py-0.5 rounded">
                  INSTANT
                </span>
              </div>
            </div>
          </div>

          {/* CARD 4 (WIDE, 2 COLS): Template Kekinian Viral (Korean, Koran, B&W) */}
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-50/90 via-purple-50/40 to-white border border-purple-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
            {/* Ambient glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200/25 rounded-full blur-2xl pointer-events-none -mr-16 -mb-16" />

            <div>
              {/* Header row */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-purple-100/80 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs group-hover:scale-110 transition-transform">
                  <Film className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300/70 -rotate-1">
                    🔥 Trend TikTok & IG
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight mb-2">
                Template Kekinian & Viral
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Dari layout Korean 4-Cut yang super hits, Koran Jadul monokrom berita retro, polaroid B&W klasik, sampai struk kasir lucu. Semua siap dipakai tanpa ribet edit!
              </p>
            </div>

            {/* Interactive mini vibe chips with visual icons */}
            <div className="mt-6 pt-5 border-t border-purple-200/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/templates"
                  className="text-xs font-bold text-purple-700 bg-white hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200 shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <span>🇰🇷</span> Korean 4-Cut
                </Link>
                <Link
                  to="/templates"
                  className="text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <span>📰</span> Koran Jadul
                </Link>
                <Link
                  to="/templates"
                  className="text-xs font-bold text-zinc-700 bg-white hover:bg-zinc-100 px-3 py-1.5 rounded-xl border border-zinc-200 shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <span>🖤</span> Classic B&W
                </Link>
                <Link
                  to="/templates"
                  className="text-xs font-bold text-pink-700 bg-white hover:bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-200 shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <span>🍓</span> Sweet Mascot
                </Link>
              </div>

              <Link
                to="/templates"
                className="text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform flex items-center gap-1"
              >
                Lihat Semua Vibes <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* CARD 5 (WIDE, 2 COLS): Privasi 100% Aman (Client-Side) */}
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-50/90 via-emerald-50/40 to-white border border-emerald-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none -mt-20" />

            <div>
              {/* Header row */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/70 shadow-2xs rotate-1">
                    🔒 100% Client-Side
                  </span>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    Tanpa Database
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight mb-2">
                Privasi Aman, Foto Milik Kamu Sepenuhnya
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Semua foto kamu diproses langsung di browser perangkatmu menggunakan Canvas API lokal. Tidak ada yang dikirim atau disimpan ke cloud/server kami. Aman 100%!
              </p>
            </div>

            {/* Privacy highlights badge list */}
            <div className="mt-6 pt-5 border-t border-emerald-200/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-white/90 px-3 py-1 rounded-xl border border-emerald-200/70 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Nggak Perlu Bikin Akun
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-white/90 px-3 py-1 rounded-xl border border-emerald-200/70 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Langsung Tersimpan di Galeri HP
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                Zero Cloud Upload 🛡️
              </span>
            </div>
          </div>

          {/* CARD 6 (COMPACT, 1 COL): Aesthetic Filters & Tone */}
          <div className="lg:col-span-1 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-pink-50/90 via-rose-50/40 to-white border border-pink-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
            <div>
              {/* Top row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-pink-100/80 border border-pink-200 flex items-center justify-center text-pink-600 shadow-xs group-hover:scale-110 transition-transform">
                  <Wand2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-300/70 -rotate-2">
                  ✨ Instant Glow
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight mb-2">
                Aesthetic Filters
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Tone warna otomatis yang sudah dikurasi biar fotomu langsung estetik tanpa perlu diedit manual lagi.
              </p>
            </div>

            {/* Filter tags mini pills */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                Monochrome B&W
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200">
                Analog Warm
              </span>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-200">
                Seoul Soft Pink
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
