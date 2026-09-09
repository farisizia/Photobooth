import { Link } from 'react-router-dom';

/**
 * Renders an authentic, realistic photobooth frame mockup for each vibe
 */
function FrameMockup({ id }: { id: string }) {
  switch (id) {
    // 1. KOREAN 4-CUT: Vertical photo strip (rasio 1:2 / 2:3) dengan 4 slot foto bertingkat & border pastel
    case 'korean-4cut':
      return (
        <div className="w-[145px] sm:w-[160px] bg-[#FFF0F5] border border-pink-200/90 rounded-xl p-2 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between select-none">
          {/* Top Header */}
          <div className="flex items-center justify-between px-0.5 mb-1 text-[7px] font-bold text-rose-500 uppercase tracking-wider">
            <div className="flex items-center gap-1">
              <img src="/logo-icon.png" alt="IziaPhoto" className="w-3 h-3 rounded-xs object-contain" />
              <span>IZIAPHOTO</span>
            </div>
            <span>✨ 4-CUTS</span>
          </div>

          {/* 4 Stacked Photo Slots */}
          <div className="space-y-1 sm:space-y-1.5">
            <div className="h-13 sm:h-14 rounded-md bg-white overflow-hidden shadow-2xs">
              <img
                src="/mockups/korean_pose_1.jpg"
                alt="Pose 1"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="h-13 sm:h-14 rounded-md bg-white overflow-hidden shadow-2xs">
              <img
                src="/mockups/korean_pose_2.jpg"
                alt="Pose 2"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="h-13 sm:h-14 rounded-md bg-white overflow-hidden shadow-2xs">
              <img
                src="/mockups/korean_pose_3.jpg"
                alt="Pose 3"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="h-13 sm:h-14 rounded-md bg-white overflow-hidden shadow-2xs">
              <img
                src="/mockups/korean_pose_4.jpg"
                alt="Pose 4"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bottom Branding & Date */}
          <div className="mt-1.5 text-center pt-1 border-t border-pink-200/70">
            <div className="text-[7.5px] font-bold text-slate-800 tracking-wider">
              ✦ 인생네컷 • IZIAPHOTO ✦
            </div>
            <div className="text-[6px] text-slate-400 font-mono">
              2026.09.09 • SEOUL VIBE
            </div>
          </div>
        </div>
      );

    // 2. KORAN JADUL: Layout koran vintage lengkap dengan masthead, double border, artikel kolom & foto monokrom
    case 'vintage-newspaper':
      return (
        <div className="w-[180px] sm:w-[195px] bg-[#F5EFEB] border-2 border-[#1C1917] rounded-sm p-2 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between font-serif select-none">
          {/* Masthead Header */}
          <div className="text-center border-b border-[#1C1917] pb-1 mb-1">
            <div className="text-[6px] font-bold tracking-widest uppercase text-stone-800">
              ★ SPECIAL HISTORIC EDITION ★
            </div>
            <div className="text-[10px] sm:text-[11px] font-black tracking-wider text-[#1C1917] leading-tight">
              THE VINTAGE GAZETTE
            </div>
            <div className="text-[5.5px] font-mono text-stone-600">
              VOL. XXIV • 2 CENTS • RETRO B&W
            </div>
          </div>

          {/* Headline */}
          <div className="text-[7.5px] font-black text-[#1C1917] text-center mb-1 leading-tight uppercase">
            Moments of Pure Joy Recorded Today
          </div>

          {/* 2 Monochrome Photos */}
          <div className="space-y-1 mb-1">
            <div className="bg-stone-900 border border-[#1C1917] p-0.5 shadow-2xs">
              <div className="h-13 sm:h-14 overflow-hidden relative">
                <img
                  src="/mockups/vintage_pose_1.jpg"
                  alt="Archival pose 1"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-0.5 text-[5px] font-mono bg-black/70 text-white px-0.5 rounded">
                  B&W
                </span>
              </div>
              <div className="text-[5px] italic text-stone-300 mt-0.5">
                FIG. 01 — Archival smile
              </div>
            </div>

            <div className="bg-stone-900 border border-[#1C1917] p-0.5 shadow-2xs">
              <div className="h-13 sm:h-14 overflow-hidden relative">
                <img
                  src="/mockups/vintage_pose_2.jpg"
                  alt="Archival pose 2"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-0.5 text-[5px] font-mono bg-black/70 text-white px-0.5 rounded">
                  B&W
                </span>
              </div>
              <div className="text-[5px] italic text-stone-300 mt-0.5">
                FIG. 02 — Historic pose
              </div>
            </div>
          </div>

          {/* Column Articles */}
          <div className="grid grid-cols-2 gap-1 border-t border-[#1C1917] pt-1 text-[5px] leading-tight text-stone-700">
            <div>Citizens gathered to capture timeless memories in monochrome...</div>
            <div className="border-l border-[#1C1917] pl-1">
              Archivists confirmed authentic joy never fades.
            </div>
          </div>
        </div>
      );

    // 3. BLACK & WHITE: Polaroid klasik dengan margin frame putih tebal & catatan handwritten
    case 'black-and-white':
      return (
        <div className="w-[170px] sm:w-[185px] bg-white border border-slate-300 rounded-lg p-3 pb-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between rotate-1 select-none">
          {/* Polaroid Washi Tape */}
          <div className="w-12 h-3 bg-stone-200/80 border border-stone-300 mx-auto -mt-4 mb-2 backdrop-blur-xs shadow-2xs rotate-1" />

          {/* Wide Margin Photo Box */}
          <div className="aspect-[4/3] bg-stone-900 overflow-hidden shadow-inner border border-stone-800 mb-2.5">
            <img
              src="/mockups/vintage_pose_2.jpg"
              alt="Monochrome candid"
              className="w-full h-full object-cover object-center filter grayscale contrast-130 brightness-95"
              loading="lazy"
            />
          </div>

          {/* Polaroid Bottom Note */}
          <div className="text-center">
            <p className="font-handwriting text-slate-800 text-lg leading-none mb-1">
              "laughing with bestie ✨"
            </p>
            <p className="text-[6.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              IZIAPHOTO • MONOCHROME 2026
            </p>
          </div>
        </div>
      );

    // 4. 35MM FILM ROLL: Klise roll film dengan lubang sproket & nomor frame
    case 'retro-film':
      return (
        <div className="w-[175px] sm:w-[190px] bg-[#111111] border border-stone-800 rounded-lg p-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col justify-between select-none">
          {/* Top Sprocket Perforations */}
          <div className="flex justify-between items-center px-1 mb-1">
            <span className="text-[6px] font-mono font-bold text-amber-500 tracking-wider">
              KODAK PORTRA 400
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-2 h-1.5 bg-stone-800 border border-stone-700 rounded-xs" />
              ))}
            </div>
          </div>

          {/* 2 Film Negative Frames */}
          <div className="space-y-1.5 my-1">
            <div className="relative h-13 sm:h-14 border border-stone-700 bg-stone-900 overflow-hidden shadow-inner">
              <img
                src="/mockups/korean_pose_3.jpg"
                alt="Film frame 24A"
                className="w-full h-full object-cover object-center filter sepia-[0.25] contrast-110"
                loading="lazy"
              />
              <span className="absolute bottom-0.5 right-1 text-[6px] font-mono text-amber-400 font-bold">
                24A
              </span>
            </div>

            <div className="relative h-13 sm:h-14 border border-stone-700 bg-stone-900 overflow-hidden shadow-inner">
              <img
                src="/mockups/korean_pose_2.jpg"
                alt="Film frame 25A"
                className="w-full h-full object-cover object-center filter sepia-[0.25] contrast-110"
                loading="lazy"
              />
              <span className="absolute bottom-0.5 right-1 text-[6px] font-mono text-amber-400 font-bold">
                25A
              </span>
            </div>
          </div>

          {/* Bottom Sprocket Perforations & Stamp */}
          <div className="flex justify-between items-center px-1 mt-1 border-t border-stone-800 pt-1">
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-2 h-1.5 bg-stone-800 border border-stone-700 rounded-xs" />
              ))}
            </div>
            <span className="text-[6px] font-mono font-bold text-red-500 tracking-wider">
              IZIAPHOTO LAB
            </span>
          </div>
        </div>
      );

    // 5. CUTE & PINK: Bingkai melingkar pastel & stiker buah kawaii
    case 'cute-pink':
      return (
        <div className="w-[170px] sm:w-[185px] bg-[#FFF5F8] border-2 border-pink-200 rounded-2xl p-2.5 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between select-none">
          {/* Header */}
          <div className="flex items-center justify-between px-1 mb-1 text-[7.5px] font-bold text-pink-500 uppercase tracking-wider">
            <span>🍓 SWEET BERRIES</span>
            <span>✨ CUTE</span>
          </div>

          {/* Circular Cutout Photo Slots */}
          <div className="space-y-1.5 my-1">
            <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-xl border border-pink-100 shadow-2xs">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-300 shadow-xs flex-shrink-0">
                <img
                  src="/mockups/korean_pose_4.jpg"
                  alt="Cute circle 1"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-[8px] font-bold text-pink-600 block">Bestie Forever 💖</span>
                <span className="text-[6px] text-pink-400">Sweet Cutout</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-xl border border-pink-100 shadow-2xs">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-300 shadow-xs flex-shrink-0">
                <img
                  src="/mockups/korean_pose_1.jpg"
                  alt="Cute circle 2"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-[8px] font-bold text-rose-600 block">Cheek Heart ✨</span>
                <span className="text-[6px] text-rose-400">Kawaii Mood</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-1 border-t border-pink-200">
            <span className="text-[7.5px] font-bold text-pink-700 tracking-wider">
              IZIAPHOTO • SWEET MASCOT
            </span>
          </div>
        </div>
      );

    // 6. RECEIPT / STRUK BELANJA: Kertas kasir termal dengan font monospace & barcode
    case 'receipt':
    default:
      return (
        <div className="w-[165px] sm:w-[180px] bg-white border-x border-dashed border-slate-300 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-2.5 font-mono text-[7px] text-slate-800 flex flex-col justify-between select-none">
          {/* Top Header */}
          <div className="border-b border-dashed border-slate-300 pb-1 text-center">
            <div className="text-[8px] font-bold text-slate-900">*** IZIAPHOTO MART ***</div>
            <div className="text-[6px] text-slate-400">RECEIPT #2026 • 15:45 WIB</div>
          </div>

          {/* 2 Mini Photo Slots */}
          <div className="space-y-1.5 my-1.5">
            <div className="border border-dashed border-slate-300 p-0.5">
              <div className="h-13 sm:h-14 overflow-hidden">
                <img
                  src="/mockups/korean_pose_2.jpg"
                  alt="Receipt item 1"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between text-[5.5px] text-slate-500 mt-0.5">
                <span>ITEM #01</span>
                <span>SMILE MEMORY</span>
              </div>
            </div>

            <div className="border border-dashed border-slate-300 p-0.5">
              <div className="h-13 sm:h-14 overflow-hidden">
                <img
                  src="/mockups/korean_pose_3.jpg"
                  alt="Receipt item 2"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between text-[5.5px] text-slate-500 mt-0.5">
                <span>ITEM #02</span>
                <span>COOL POSE</span>
              </div>
            </div>
          </div>

          {/* Total & Barcode */}
          <div className="border-t border-dashed border-slate-300 pt-1 text-center">
            <div className="flex justify-between font-bold text-[6.5px] mb-1">
              <span>TOTAL PRICE:</span>
              <span className="text-emerald-600">RP 0 (GRATIS)</span>
            </div>
            <div className="tracking-widest font-bold text-[7px] leading-none text-slate-900">
              |||||||||||||||||||||||||
            </div>
            <div className="text-[5.5px] text-slate-400 mt-0.5">
              *** THANK YOU FOR VISITING ***
            </div>
          </div>
        </div>
      );
  }
}

export function TemplateShowcase() {
  const vibes = [
    {
      id: 'korean-4cut',
      name: 'Korean 4-Cut 🇰🇷',
      tagline: 'Seoul Aesthetic Vibe',
      badge: 'Paling Viral 🔥',
      badgeColor: 'bg-rose-50 text-rose-600 border-rose-200/80',
      bgCard: 'bg-gradient-to-b from-rose-50/50 to-white',
      borderCard: 'border-rose-150 hover:border-rose-300',
      description: 'Format strip 4 foto vertikal memanjang ala photobooth hits Hongdae & Gangnam.',
      tags: ['4 Foto Strip', 'Pastel Pink', 'Stiker Lucu'],
    },
    {
      id: 'vintage-newspaper',
      name: 'Koran Jadul 📰',
      tagline: 'Daily Historic Edition',
      badge: 'Filter B&W Otomatis ✨',
      badgeColor: 'bg-stone-100 text-stone-700 border-stone-300',
      bgCard: 'bg-gradient-to-b from-stone-50 to-white',
      borderCard: 'border-stone-200 hover:border-stone-400',
      description: 'Layout koran cetak monokrom lengkap dengan masthead koran, double border, dan artikel teks.',
      tags: ['2 Foto Monokrom', 'Double Border', 'Headline Jadul'],
    },
    {
      id: 'black-and-white',
      name: 'Black & White 🖤',
      tagline: 'Timeless Monochrome',
      badge: 'Classic Mood 🕶️',
      badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-300',
      bgCard: 'bg-gradient-to-b from-zinc-50 to-white',
      borderCard: 'border-zinc-200 hover:border-zinc-500',
      description: 'Frame polaroid klasik dengan margin putih tebal di sekeliling foto dan teks tulisan tangan.',
      tags: ['Polaroid Margin', 'Handwritten Note', 'Kontras Tinggi'],
    },
    {
      id: 'retro-film',
      name: '35mm Film 🎞️',
      tagline: 'Analog Roll Negative',
      badge: 'Vintage Kodacolor 📷',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
      bgCard: 'bg-gradient-to-b from-amber-50/40 to-white',
      borderCard: 'border-amber-150 hover:border-amber-300',
      description: 'Bingkai klise film 35mm lengkap dengan perforasi lubang sproket tepi dan stempel lab.',
      tags: ['3 Foto Film', 'Sproket Klise', 'Tone Hangat'],
    },
    {
      id: 'cute-pink',
      name: 'Cute & Pink 💗',
      tagline: 'Sweet Mascot Cutout',
      badge: 'Super Gemas 🍓',
      badgeColor: 'bg-pink-50 text-pink-600 border-pink-200/80',
      bgCard: 'bg-gradient-to-b from-pink-50/50 to-white',
      borderCard: 'border-pink-150 hover:border-pink-300',
      description: 'Frame melingkar dengan ornamen buah manis dan stiker kawaii yang bikin mood naik.',
      tags: ['Foto Lingkaran', 'Stiker Strawberry', 'Aesthetic'],
    },
    {
      id: 'receipt',
      name: 'Receipt / Struk 🧾',
      tagline: 'Cafe & Mart Thermal',
      badge: 'Unik & Trendy ☕',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      bgCard: 'bg-gradient-to-b from-slate-50 to-white',
      borderCard: 'border-slate-200 hover:border-slate-400',
      description: 'Format kertas kasir termal lengkap dengan tepi zigzag bergerigi, nota belanja, dan barcode asli.',
      tags: ['Kertas Struk', 'Font Mesin Kasir', 'Barcode Asli'],
    },
  ];

  return (
    <section id="templates" className="py-20 relative bg-slate-50/60 border-t border-slate-200/60">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 mb-3 uppercase shadow-xs">
            PILIHAN FRAME VIRAL
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">
            Pick Your Vibe ✨
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed">
            Mau vibes Korea? Vintage? Cute? Tinggal pilih.
          </p>
        </div>

        {/* Big Aesthetic Template Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {vibes.map((item) => (
            <Link
              to="/templates"
              key={item.id}
              className={`group relative rounded-3xl p-5 sm:p-6 border transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between ${item.bgCard} ${item.borderCard}`}
            >
              <div>
                {/* Visual Frame Preview Box (Proporsional aspect-[3/4] menampilkan bentuk fisik frame photobooth utuh) */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-5 bg-gradient-to-b from-slate-100 via-rose-50/20 to-slate-200/60 p-3 sm:p-4 flex items-center justify-center shadow-inner border border-slate-200/80">
                  {/* Real Photobooth Frame Mockup */}
                  <FrameMockup id={item.id} />

                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Vibe Info */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    {item.tagline}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Tags & Action Button */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                  Pilih →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Centered Big CTA */}
        <div className="text-center">
          <Link
            to="/templates"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 shadow-xl shadow-rose-500/25 hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
          >
            <span>✨</span>
            <span>Lihat Semua Template</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
