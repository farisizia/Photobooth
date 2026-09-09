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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-xs font-bold text-rose-600 mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>📸 GRATIS • LIVE PHOTOBOOTH</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-900 leading-[1.12] mb-5">
              Photobooth Gratis, <br />
              <span className="bg-gradient-to-r from-coral-500 via-rose-500 to-violet-600 bg-clip-text text-transparent">
                Langsung dari HP Kamu.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
              Mau foto bareng ayang atau bestie? Nggak perlu datang ke photobooth. Buka IziaPhoto dari browser, pilih template, pose, dan jepret langsung dari HP.
            </p>

            {/* Gen Z Microcopy Callout */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-violet-50 text-violet-700 text-xs font-semibold mb-7 border border-violet-200/60">
              <span>✨</span>
              <span>POV: punya photobooth sendiri di HP. Pose dulu, mikir belakangan 😎</span>
            </div>

            {/* Dominant Primary CTA & Secondary Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4">
              <Link
                to="/templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-9 sm:py-4.5 rounded-2xl text-base sm:text-lg font-black text-white bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 shadow-xl shadow-rose-500/30 hover:shadow-rose-500/45 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all ring-4 ring-rose-500/10"
              >
                <span className="text-xl">📸</span>
                <span>Mulai Photobooth Gratis</span>
              </Link>

              <a
                href="#templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:shadow transition-all"
              >
                <span>Pick Your Vibe ✨</span>
                <span className="text-slate-400">↓</span>
              </a>
            </div>

            {/* Supporting Text Kecil */}
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-8 flex items-center justify-center lg:justify-start gap-4 flex-wrap">
              <span className="text-emerald-600">✓ Gratis</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600">✓ Tanpa aplikasi</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600">✓ Langsung dari browser</span>
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs text-left">
                <span className="text-base">🆓</span>
                <p className="text-xs font-bold text-slate-900 mt-1">100% Gratis</p>
                <p className="text-[11px] text-slate-500">Foto sepuasnya</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs text-left">
                <span className="text-base">📱</span>
                <p className="text-xs font-bold text-slate-900 mt-1">Dari HP Kamu</p>
                <p className="text-[11px] text-slate-500">Tanpa antre fisik</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs text-left">
                <span className="text-base">⚡</span>
                <p className="text-xs font-bold text-slate-900 mt-1">Tanpa Install</p>
                <p className="text-[11px] text-slate-500">Langsung browser</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs text-left">
                <span className="text-base">🔒</span>
                <p className="text-xs font-bold text-slate-900 mt-1">Privasi Aman</p>
                <p className="text-[11px] text-slate-500">Foto di browser</p>
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

                {/* Photo 1 (Real Vintage Monochrome Illustration) */}
                <div className="relative bg-stone-900 border border-[#1C1917] p-1 mb-1.5 shadow-inner">
                  <div className="h-20 bg-stone-800 rounded-sm flex items-center justify-center relative overflow-hidden">
                    <img
                      src="/mockups/vintage_pose_1.jpg"
                      alt="Vintage newspaper photobooth portrait"
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute bottom-1 right-1 text-[7px] font-mono text-white/90 bg-black/60 px-1 rounded backdrop-blur-xs">
                      B&W
                    </span>
                  </div>
                  <div className="text-[6px] italic font-serif text-stone-600 mt-0.5">FIG. 01 — Archival smile</div>
                </div>

                {/* Photo 2 (Real Vintage Monochrome Illustration) */}
                <div className="relative bg-stone-900 border border-[#1C1917] p-1 mb-1.5 shadow-inner">
                  <div className="h-20 bg-stone-800 rounded-sm flex items-center justify-center relative overflow-hidden">
                    <img
                      src="/mockups/vintage_pose_2.jpg"
                      alt="Vintage photobooth candid friends"
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute bottom-1 right-1 text-[7px] font-mono text-white/90 bg-black/60 px-1 rounded backdrop-blur-xs">
                      B&W
                    </span>
                  </div>
                  <div className="text-[6px] italic font-serif text-stone-600 mt-0.5">FIG. 02 — Historic pose</div>
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
                  <span>IZIAPHOTO</span>
                  <span>✨ 4-CUTS</span>
                </div>
                
                {/* 4 Photo Frames with Real Candid Photobooth Selfie Portraits */}
                <div className="space-y-1 sm:space-y-1.5 mb-1 sm:mb-1.5">
                  <div className="h-14 sm:h-16 rounded-md bg-rose-50 overflow-hidden shadow-2xs">
                    <img
                      src="/mockups/korean_pose_1.jpg"
                      alt="Korean photobooth candid pose 1"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="h-14 sm:h-16 rounded-md bg-rose-50 overflow-hidden shadow-2xs">
                    <img
                      src="/mockups/korean_pose_2.jpg"
                      alt="Korean photobooth candid pose 2"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="h-14 sm:h-16 rounded-md bg-rose-50 overflow-hidden shadow-2xs">
                    <img
                      src="/mockups/korean_pose_3.jpg"
                      alt="Korean photobooth candid pose 3"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="h-14 sm:h-16 rounded-md bg-rose-50 overflow-hidden shadow-2xs">
                    <img
                      src="/mockups/korean_pose_4.jpg"
                      alt="Korean photobooth candid pose 4"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
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
