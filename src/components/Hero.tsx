import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Background Soft Pastel Glows */}
      <div className="absolute -top-12 left-1/4 w-96 h-96 bg-rose-200/45 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-200/40 blur-[130px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/50 blur-[100px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Split Screen 2 Kolom di Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================================================================= */}
          {/* KOLOM KIRI: Headline, Subheadline, CTA & Trust Badges                     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-xs font-bold text-rose-600 mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>SNAPMOMENT • LIVE PHOTOBOOTH</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              Capture Your Smile, <br />
              <span className="bg-gradient-to-r from-coral-500 via-rose-500 to-violet-600 bg-clip-text text-transparent">
                Frame Every Memory.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Abadikan momen seru bareng bestie & ayang langsung dari browser. Beragam pilihan template viral—mulai dari Korean 4-Cut, Koran Jadul monokrom B&W, hingga 35mm Roll Film—tanpa aplikasi!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link
                to="/templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 shadow-xl shadow-coral-500/25 hover:shadow-coral-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
              >
                <span className="text-xl">📸</span>
                <span>Mulai Photobooth</span>
              </Link>

              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow active:scale-[0.98] transition-all"
              >
                <span>Lihat Fitur</span>
                <span className="text-slate-400">↓</span>
              </a>
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs text-left">
                <span className="text-base">⚡</span>
                <p className="text-xs font-bold text-slate-900 mt-1">100% Client-Side</p>
                <p className="text-[11px] text-slate-500">Cepat tanpa server</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs text-left">
                <span className="text-base">🎞️</span>
                <p className="text-xs font-bold text-slate-900 mt-1">6+ Tema Viral</p>
                <p className="text-[11px] text-slate-500">Koran, K-Strip, dll</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs text-left">
                <span className="text-base">✨</span>
                <p className="text-xs font-bold text-slate-900 mt-1">Filter B&W</p>
                <p className="text-[11px] text-slate-500">Otomatis koran jadul</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs text-left">
                <span className="text-base">🔒</span>
                <p className="text-xs font-bold text-slate-900 mt-1">Privasi Aman</p>
                <p className="text-[11px] text-slate-500">Foto tetap di HP</p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* KOLOM KANAN: Visual Contoh Nyata Hasil Photobooth (Photo Strip & Mockups) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex justify-center items-center relative select-none">
            {/* Ambient colorful backdrop box */}
            <div className="relative w-full max-w-[420px] h-[520px] sm:h-[560px] flex items-center justify-center">
              
              {/* Soft colorful backdrop glow halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/40 via-purple-150/40 to-sky-200/40 rounded-[3rem] blur-2xl -z-10" />

              {/* TIKET / FRAME 1: Vintage Newspaper Mockup (Tilted Left -6deg) */}
              <div className="absolute left-2 sm:left-4 top-6 w-[210px] sm:w-[230px] bg-[#F5EFEB] border-2 border-[#1C1917] rounded-lg p-3 shadow-[0_20px_45px_rgba(15,23,42,0.16)] -rotate-6 hover:rotate-0 hover:z-20 hover:scale-105 transition-all duration-300 cursor-pointer">
                {/* Washi tape accent on top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-200/70 border-t border-b border-amber-300/80 backdrop-blur-xs shadow-xs rotate-1" />

                {/* Newspaper Masthead */}
                <div className="text-center border-b border-[#1C1917] pb-1.5 mb-1.5">
                  <div className="text-[7px] tracking-widest font-serif font-bold text-[#1C1917] uppercase">
                    ★ SPECIAL HISTORIC EDITION ★
                  </div>
                  <div className="text-xs font-black font-serif tracking-wider text-[#1C1917]">
                    THE VINTAGE GAZETTE
                  </div>
                  <div className="text-[6px] font-mono text-[#44403C] tracking-wide">
                    VOL. XXIV • 2 CENTS • RETRO B&W
                  </div>
                </div>

                {/* Fake Headline */}
                <div className="text-[8px] font-black font-serif text-[#1C1917] leading-tight text-center mb-1.5 uppercase">
                  Moments of Pure Joy Recorded Today
                </div>

                {/* Photo 1 (Simulated B&W photo) */}
                <div className="relative bg-stone-900 border border-[#1C1917] p-1 mb-1.5 shadow-inner">
                  <div className="h-20 bg-gradient-to-tr from-stone-800 via-stone-700 to-stone-500 rounded-sm flex items-center justify-center relative overflow-hidden">
                    <span className="text-3xl filter grayscale contrast-125">😊</span>
                    <span className="absolute bottom-1 right-1 text-[7px] font-mono text-white/80 bg-black/50 px-1 rounded">B&W</span>
                  </div>
                  <div className="text-[6px] italic font-serif text-stone-300 mt-0.5">FIG. 01 — Archival smile</div>
                </div>

                {/* Photo 2 (Simulated B&W photo) */}
                <div className="relative bg-stone-900 border border-[#1C1917] p-1 mb-1.5 shadow-inner">
                  <div className="h-20 bg-gradient-to-tr from-stone-900 via-stone-700 to-stone-600 rounded-sm flex items-center justify-center relative overflow-hidden">
                    <span className="text-3xl filter grayscale contrast-125">✌️</span>
                    <span className="absolute bottom-1 right-1 text-[7px] font-mono text-white/80 bg-black/50 px-1 rounded">B&W</span>
                  </div>
                  <div className="text-[6px] italic font-serif text-stone-300 mt-0.5">FIG. 02 — Historic pose</div>
                </div>

                {/* Mini Article Column Text */}
                <div className="grid grid-cols-2 gap-1 border-t border-[#1C1917] pt-1 text-[5.5px] leading-tight font-serif text-[#44403C]">
                  <div>Citizens gathered to capture timeless memories in monochrome...</div>
                  <div className="border-l border-[#1C1917] pl-1">Archivists confirmed these smiles will last forever.</div>
                </div>
              </div>

              {/* TIKET / FRAME 2: Korean 4-Cut Strip Pastel (Tilted Right +5deg, Higher Z-index) */}
              <div className="absolute right-2 sm:right-4 top-2 w-[190px] sm:w-[205px] bg-white border border-rose-100 rounded-2xl p-2.5 shadow-[0_25px_50px_rgba(244,63,94,0.18)] rotate-5 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 z-10 cursor-pointer">
                {/* Washi tape cute accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-pink-300/80 border-t border-b border-pink-400/80 backdrop-blur-xs shadow-xs -rotate-2 rounded-xs" />

                {/* Top Strip Header */}
                <div className="flex items-center justify-between px-1 mb-1.5 text-[8px] font-bold text-rose-500 tracking-wider uppercase">
                  <span>SNAPMOMENT</span>
                  <span>✨ 4-CUTS</span>
                </div>

                {/* 4 Photo Frames */}
                <div className="space-y-1.5">
                  {/* Photo 1 */}
                  <div className="h-16 rounded-lg bg-gradient-to-tr from-rose-100 via-orange-50 to-pink-100 border border-rose-200/50 flex items-center justify-center relative overflow-hidden shadow-xs">
                    <span className="text-2xl">😄</span>
                    <span className="absolute top-1 right-1 text-[8px]">💖</span>
                  </div>
                  {/* Photo 2 */}
                  <div className="h-16 rounded-lg bg-gradient-to-tr from-sky-100 via-indigo-50 to-purple-100 border border-sky-200/50 flex items-center justify-center relative overflow-hidden shadow-xs">
                    <span className="text-2xl">😎</span>
                    <span className="absolute bottom-1 left-1 text-[8px]">⭐</span>
                  </div>
                  {/* Photo 3 */}
                  <div className="h-16 rounded-lg bg-gradient-to-tr from-amber-100 via-emerald-50 to-teal-100 border border-amber-200/50 flex items-center justify-center relative overflow-hidden shadow-xs">
                    <span className="text-2xl">🥰</span>
                    <span className="absolute top-1 left-1 text-[8px]">🍒</span>
                  </div>
                  {/* Photo 4 */}
                  <div className="h-16 rounded-lg bg-gradient-to-tr from-purple-100 via-pink-50 to-rose-100 border border-purple-200/50 flex items-center justify-center relative overflow-hidden shadow-xs">
                    <span className="text-2xl">🤪</span>
                    <span className="absolute bottom-1 right-1 text-[8px]">✨</span>
                  </div>
                </div>

                {/* Bottom Strip Label */}
                <div className="mt-2 text-center pt-1 border-t border-slate-100">
                  <div className="text-[9px] font-bold text-slate-800 tracking-wider">
                    인생네컷 • SEOUL VIBE
                  </div>
                  <div className="text-[7px] text-slate-400 font-mono">
                    2026.09.09 • MEMORY STRIP
                  </div>
                </div>
              </div>

              {/* FLOATING PILL BADGE: Template Count & Rating */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-xl shadow-slate-900/10 flex items-center gap-2 whitespace-nowrap">
                <span className="flex text-amber-400 text-xs">★★★★★</span>
                <span className="text-xs font-bold text-slate-800">6+ Desain Viral Siap Cetak!</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
