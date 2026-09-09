import { PhotoboothTemplate } from '../constants/templatesData';

interface TemplateCardMockupProps {
  template: PhotoboothTemplate;
}

const PORTRAITS = [
  '/mockups/korean_pose_1.jpg',
  '/mockups/korean_pose_2.jpg',
  '/mockups/korean_pose_3.jpg',
  '/mockups/korean_pose_4.jpg',
  '/mockups/vintage_pose_1.jpg',
  '/mockups/vintage_pose_2.jpg',
];

export function TemplateCardMockup({ template }: TemplateCardMockupProps) {
  const { layoutType, theme } = template;

  return (
    <div className="w-full h-full flex items-center justify-center p-1.5 sm:p-2 select-none overflow-hidden">
      {/* 1. KOREAN 4-CUT (Classic & Checkerboard) */}
      {layoutType === 'korean-4cut' && (
        <div
          style={{ backgroundColor: theme.bg }}
          className={`w-[140px] sm:w-[155px] h-[260px] rounded-xl p-2 shadow-md flex flex-col justify-between transition-all duration-300 relative ${
            template.id === 'korean-4cut-checker'
              ? 'border-2 border-black ring-2 ring-black/10'
              : 'border border-pink-200/80'
          }`}
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-0.5 text-[7px] font-bold text-rose-500 uppercase tracking-wider mb-1">
            <div className="flex items-center gap-1">
              <img src="/logo-icon.png" alt="IziaPhoto" className="w-2.5 h-2.5 rounded-xs object-contain" />
              <span className="truncate">IZIAPHOTO</span>
            </div>
            <span>4-CUTS</span>
          </div>

          {/* 4 Stacked Photo Slots with real close-up models */}
          <div className="space-y-1 flex-1 flex flex-col justify-between">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-xs overflow-hidden shadow-2xs ${
                  template.id === 'korean-4cut-checker' ? 'border border-black' : 'bg-white'
                }`}
              >
                <img
                  src={PORTRAITS[idx]}
                  alt={`Slot ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Bottom Branding & Date */}
          <div className="mt-1 text-center pt-1 border-t border-black/10 text-[7px] font-bold text-slate-800 tracking-wider">
            <div>✦ 인생네컷 • SEOUL ✦</div>
            <div className="text-[5.5px] text-slate-400 font-mono mt-0.5">2026.09.09 • IZIAPHOTO</div>
          </div>
        </div>
      )}

      {/* 2. KOREAN WIDE 2-CUT */}
      {layoutType === 'korean-wide' && (
        <div
          style={{ backgroundColor: theme.bg }}
          className="w-[170px] sm:w-[185px] h-[250px] rounded-xl p-2.5 shadow-md border border-stone-200 flex flex-col justify-between text-stone-800"
        >
          <div className="flex items-center justify-between text-[7.5px] font-bold tracking-wider px-1">
            <span>✦ KOREAN WIDE CUT</span>
            <span className="text-rose-500">2-SHOTS ✦</span>
          </div>

          <div className="space-y-1.5 my-1 flex-1 flex flex-col justify-between">
            <div className="flex-1 rounded-md overflow-hidden bg-white shadow-2xs border border-stone-200 relative group">
              <img
                src={PORTRAITS[0]}
                alt="Wide 1"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <span className="absolute bottom-1 right-1 text-[6px] bg-black/60 text-white px-1 py-0.2 rounded-full backdrop-blur-xs">
                SHOT 01
              </span>
            </div>
            <div className="flex-1 rounded-md overflow-hidden bg-white shadow-2xs border border-stone-200 relative group">
              <img
                src={PORTRAITS[1]}
                alt="Wide 2"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <span className="absolute bottom-1 right-1 text-[6px] bg-black/60 text-white px-1 py-0.2 rounded-full backdrop-blur-xs">
                SHOT 02
              </span>
            </div>
          </div>

          <div className="text-center text-[6.5px] font-semibold text-stone-500 pt-1 border-t border-stone-200">
            SWEET LIFE WITH BESTIES • 2026
          </div>
        </div>
      )}

      {/* 3. VINTAGE NEWSPAPER */}
      {layoutType === 'newspaper' && (
        <div
          style={{ backgroundColor: theme.bg }}
          className="w-[180px] sm:w-[195px] h-[260px] rounded-xs p-2 shadow-md border-2 border-[#1C1917] flex flex-col justify-between font-serif text-[#1C1917]"
        >
          {/* Masthead Header */}
          <div className="text-center border-b border-[#1C1917] pb-1">
            <div className="text-[5.5px] font-bold tracking-widest uppercase text-stone-800">
              ★ SPECIAL HISTORIC EDITION ★
            </div>
            <div className="text-[10px] sm:text-[11px] font-black tracking-wider text-[#1C1917] leading-tight">
              THE VINTAGE GAZETTE
            </div>
            <div className="text-[5px] font-mono text-stone-600">
              VOL. XXIV • 2 CENTS • RETRO B&W
            </div>
          </div>

          {/* Headline */}
          <div className="text-[6.5px] font-black text-[#1C1917] text-center my-0.5 leading-tight uppercase truncate">
            Moments of Pure Joy Recorded Today
          </div>

          {/* 2 Monochrome Photos */}
          <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5">
            <div className="bg-stone-900 border border-[#1C1917] p-0.5 shadow-2xs flex-1 flex flex-col">
              <div className="flex-1 overflow-hidden relative">
                <img
                  src={PORTRAITS[4]}
                  alt="Archival 1"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-0.5 text-[5px] font-mono bg-black/70 text-white px-0.5 rounded">
                  B&W
                </span>
              </div>
              <div className="text-[5px] italic text-stone-300 mt-0.5 px-0.5">
                FIG. 01 — Archival smile
              </div>
            </div>

            <div className="bg-stone-900 border border-[#1C1917] p-0.5 shadow-2xs flex-1 flex flex-col">
              <div className="flex-1 overflow-hidden relative">
                <img
                  src={PORTRAITS[5]}
                  alt="Archival 2"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-0.5 text-[5px] font-mono bg-black/70 text-white px-0.5 rounded">
                  B&W
                </span>
              </div>
              <div className="text-[5px] italic text-stone-300 mt-0.5 px-0.5">
                FIG. 02 — Historic pose
              </div>
            </div>
          </div>

          {/* Column Articles */}
          <div className="grid grid-cols-2 gap-1 border-t border-[#1C1917] pt-0.5 text-[4.5px] leading-tight text-stone-700">
            <div>Citizens gathered to capture timeless memories...</div>
            <div className="border-l border-[#1C1917] pl-1">
              Archivists confirmed joy never fades.
            </div>
          </div>
        </div>
      )}

      {/* 4. THERMAL RECEIPT */}
      {layoutType === 'receipt' && (
        <div className="w-[160px] sm:w-[175px] h-[260px] bg-[#FAF9F6] text-[#18181B] shadow-md border border-neutral-300 p-2 flex flex-col justify-between font-mono relative">
          {/* Top zigzag simulation */}
          <div className="absolute top-0 inset-x-0 h-1 bg-[#FAF9F6] border-b border-dashed border-neutral-400/50" />

          {/* Receipt Header */}
          <div className="text-center pt-1 border-b border-neutral-400/60 pb-1">
            <div className="text-[7.5px] font-black tracking-wider">*** IZIAPHOTO MART ***</div>
            <div className="text-[5px] text-neutral-500">STORE #2026 • PHOTO RECEIPT</div>
            <div className="text-[5px] text-neutral-500">DATE: 2026.09.09 • TIME: 14:42</div>
          </div>

          {/* 3 Photos stacked with monochrome tone */}
          <div className="space-y-1 my-1 flex-1 flex flex-col justify-between">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex-1 bg-white border border-neutral-300 overflow-hidden relative">
                <img
                  src={PORTRAITS[idx]}
                  alt={`Receipt ${idx + 1}`}
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 left-0.5 text-[5px] bg-black/70 text-white px-1 py-0.2">
                  ITEM #{idx + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Total & Barcode */}
          <div className="border-t border-neutral-400/60 pt-1 text-[5px] space-y-0.5">
            <div className="flex justify-between font-bold text-[6px]">
              <span>TOTAL MEMORIES</span>
              <span>$0.00 (FREE)</span>
            </div>
            {/* Fake Barcode lines */}
            <div className="h-4 w-3/4 mx-auto flex items-center justify-center gap-0.5 pt-0.5">
              {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2].map((w, i) => (
                <div key={i} style={{ width: `${w}px` }} className="h-full bg-black" />
              ))}
            </div>
            <div className="text-center text-[4.5px] text-neutral-500">THANK YOU FOR VISITING!</div>
          </div>
        </div>
      )}

      {/* 5. MUSIC PLAYER / SPOTIFY */}
      {layoutType === 'music-player' && (
        <div className="w-[160px] sm:w-[175px] h-[260px] bg-[#121212] text-white rounded-2xl p-2 shadow-md border border-neutral-800 flex flex-col justify-between">
          <div className="text-center text-[6px] text-neutral-400 tracking-widest uppercase">
            PLAYING FROM PLAYLIST
          </div>

          {/* 4 Photo Strip */}
          <div className="grid grid-cols-2 gap-1 my-1 flex-1">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="rounded-xs overflow-hidden bg-neutral-900 border border-neutral-800">
                <img
                  src={PORTRAITS[idx]}
                  alt={`Track ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Audio Controls & Seekbar */}
          <div className="pt-1 border-t border-neutral-800 space-y-1">
            <div className="flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-[7.5px] font-bold text-white truncate">About You</div>
                <div className="text-[5.5px] text-neutral-400 truncate">The 1975 • Photobooth</div>
              </div>
              <span className="text-emerald-400 text-[9px]">💚</span>
            </div>

            {/* Seek Bar */}
            <div className="space-y-0.5">
              <div className="w-full h-1 bg-neutral-700 rounded-full overflow-hidden flex">
                <div className="w-2/3 h-full bg-emerald-500" />
              </div>
              <div className="flex justify-between text-[5px] text-neutral-400 font-mono">
                <span>2:45</span>
                <span>3:58</span>
              </div>
            </div>

            {/* Play Button Controls */}
            <div className="flex items-center justify-center gap-3 text-[8px] text-neutral-400">
              <span>⏮</span>
              <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[7px] font-bold">
                ▶
              </div>
              <span>⏭</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. 35MM ANALOG FILM ROLL */}
      {layoutType === 'film-sprocket' && (
        <div className="w-[155px] sm:w-[170px] h-[260px] bg-[#141416] text-amber-500 rounded-lg p-1.5 shadow-md border border-neutral-800 flex justify-between">
          {/* Left Sprocket Column */}
          <div className="w-3 flex flex-col justify-around items-center py-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-2.5 bg-neutral-800 rounded-2xs border border-neutral-700" />
            ))}
          </div>

          {/* Center 3 Photos */}
          <div className="flex-1 flex flex-col justify-between px-1">
            <div className="text-center text-[6px] font-mono tracking-widest text-amber-500">
              ▶ KODAK PORTRA 400
            </div>

            <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex-1 bg-black border border-neutral-700 rounded-2xs overflow-hidden relative">
                  <img
                    src={PORTRAITS[idx]}
                    alt={`Film ${idx + 1}`}
                    className="w-full h-full object-cover object-center filter saturate-110"
                    loading="lazy"
                  />
                  <span className="absolute bottom-0.5 right-0.5 text-[5px] font-mono text-amber-400 bg-black/70 px-0.5">
                    0{idx + 1}A
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center text-[5.5px] font-mono text-amber-500/80">
              ISO 400 • 35MM ANALOG
            </div>
          </div>

          {/* Right Sprocket Column */}
          <div className="w-3 flex flex-col justify-around items-center py-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-2.5 bg-neutral-800 rounded-2xs border border-neutral-700" />
            ))}
          </div>
        </div>
      )}

      {/* 7. CLASSIC POLAROID 600 */}
      {layoutType === 'polaroid-single' && (
        <div className="w-[170px] sm:w-[185px] h-[250px] bg-white rounded-lg p-2.5 pb-4 shadow-lg border border-slate-200 flex flex-col justify-between text-slate-800 rotate-1">
          {/* Top Washi tape */}
          <div className="w-10 h-2.5 bg-amber-200/80 border border-amber-300 mx-auto -mt-3 mb-1 shadow-2xs rotate-1" />

          {/* Single Square Photo */}
          <div className="flex-1 bg-stone-900 border border-stone-200 overflow-hidden shadow-inner relative">
            <img
              src={PORTRAITS[0]}
              alt="Polaroid Single"
              className="w-full h-full object-cover object-center filter contrast-105"
              loading="lazy"
            />
          </div>

          {/* Thick Bottom Margin with Handwritten Text */}
          <div className="pt-2 text-center">
            <div className="font-serif italic font-bold text-[9px] text-slate-800">
              Our Little Moments ♡
            </div>
            <div className="text-[6px] font-mono text-slate-400 mt-0.5">
              2026.09.09 • POLAROID 600
            </div>
          </div>
        </div>
      )}

      {/* 8. DUAL POLAROID STACK */}
      {layoutType === 'polaroid-dual' && (
        <div className="w-[170px] sm:w-[185px] h-[250px] bg-[#FDFBF7] rounded-xl p-2 shadow-md border border-stone-200 flex flex-col justify-between">
          <div className="text-center text-[7px] font-bold text-stone-700 tracking-wider">
            ✦ DUAL POLAROID MEMORIES ✦
          </div>

          <div className="space-y-1.5 flex-1 flex flex-col justify-between my-1">
            <div className="flex-1 bg-white p-1 rounded-sm border border-stone-200 shadow-2xs flex flex-col">
              <div className="flex-1 overflow-hidden">
                <img
                  src={PORTRAITS[0]}
                  alt="Dual 1"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <span className="text-[5.5px] italic text-stone-500 text-right mt-0.5">pose #1</span>
            </div>

            <div className="flex-1 bg-white p-1 rounded-sm border border-stone-200 shadow-2xs flex flex-col">
              <div className="flex-1 overflow-hidden">
                <img
                  src={PORTRAITS[1]}
                  alt="Dual 2"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <span className="text-[5.5px] italic text-stone-500 text-right mt-0.5">pose #2</span>
            </div>
          </div>

          <div className="text-center text-[6px] text-stone-400 font-mono">
            IZIAPHOTO CLASSIC • 2026
          </div>
        </div>
      )}

      {/* 9. Y2K CYBER SILVER */}
      {layoutType === 'y2k-chrome' && (
        <div className="w-[145px] sm:w-[160px] h-[260px] bg-gradient-to-b from-slate-300 via-slate-100 to-slate-300 rounded-xl p-2 shadow-md border-2 border-indigo-300 flex flex-col justify-between text-indigo-950">
          <div className="flex items-center justify-between text-[7px] font-extrabold tracking-widest text-indigo-900">
            <span>✦ CYBER 2000</span>
            <span>CD-PRISM ✦</span>
          </div>

          <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="flex-1 rounded-xs overflow-hidden border border-indigo-400/80 bg-white relative">
                <img
                  src={PORTRAITS[idx]}
                  alt={`Y2K ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <span className="absolute top-0.5 right-0.5 text-[6px] text-indigo-500">✧</span>
              </div>
            ))}
          </div>

          <div className="text-center text-[6.5px] font-bold tracking-widest text-indigo-800 pt-0.5 border-t border-indigo-300">
            ★ HOLOGRAM VIBE • 2026 ★
          </div>
        </div>
      )}

      {/* 10. PASSPORT / ID PHOTO (6 Slots 2x3 Grid) */}
      {layoutType === 'passport-grid' && (
        <div className="w-[170px] sm:w-[185px] h-[250px] bg-[#F8FAFC] rounded-xl p-2 shadow-md border border-slate-300 flex flex-col justify-between text-slate-800">
          <div className="flex items-center justify-between text-[7px] font-bold text-blue-900 border-b border-slate-200 pb-0.5">
            <span>PASSPORT & ID PHOTO</span>
            <span className="text-[6px] text-blue-600 bg-blue-50 px-1 rounded">2x3 GRID</span>
          </div>

          {/* 2x3 Photo Grid */}
          <div className="grid grid-cols-2 grid-rows-3 gap-1 flex-1 my-1">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xs overflow-hidden relative">
                <img
                  src={PORTRAITS[idx]}
                  alt={`ID ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[5.5px] text-slate-500 border-t border-slate-200 pt-0.5">
            <span>REG #IZIA-2026</span>
            <span className="text-blue-600 font-bold">VERIFIED AUTHENTIC</span>
          </div>
        </div>
      )}

      {/* 11. FLORAL ROMANCE */}
      {layoutType === 'floral-romance' && (
        <div className="w-[145px] sm:w-[160px] h-[260px] bg-[#FFFBEB] rounded-xl p-2 shadow-md border border-amber-200 flex flex-col justify-between text-amber-950">
          <div className="text-center text-[7px] font-serif italic text-rose-800">
            🌹 Floral Romance • Rose Edition 🌹
          </div>

          <div className="space-y-1 flex-1 flex flex-col justify-between my-1">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="flex-1 rounded-xs overflow-hidden border border-rose-200 bg-white relative">
                <img
                  src={PORTRAITS[idx]}
                  alt={`Floral ${idx + 1}`}
                  className="w-full h-full object-cover object-center filter saturate-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="text-center text-[6px] font-serif italic text-amber-800">
            Pure Love & Memories • 2026
          </div>
        </div>
      )}

      {/* 12. KAWAII STICKER BOMB */}
      {layoutType === 'kawaii-sticker' && (
        <div className="w-[155px] sm:w-[170px] h-[260px] bg-[#FEF3C7] rounded-2xl p-2 shadow-md border-2 border-pink-300 flex flex-col justify-between text-pink-900 relative">
          <div className="text-center text-[7.5px] font-extrabold text-pink-600">
            🎀 CUTE KAWAII PHOTOBOOTH 🎀
          </div>

          <div className="space-y-1 flex-1 flex flex-col justify-between my-1">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex-1 rounded-lg overflow-hidden border border-pink-300 bg-white relative">
                <img
                  src={PORTRAITS[idx]}
                  alt={`Kawaii ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <span className="absolute top-0.5 right-1 text-[8px]">
                  {idx === 0 ? '🐰' : idx === 1 ? '✨' : '💖'}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center text-[6px] font-bold text-pink-500">
            ♡ Bestie Forever • 2026 ♡
          </div>
        </div>
      )}

      {/* 13. CINEMA TICKET */}
      {layoutType === 'cinema-ticket' && (
        <div className="w-[175px] sm:w-[190px] h-[250px] bg-[#FEF2F2] rounded-xl p-2 shadow-md border-2 border-red-300 flex flex-col justify-between text-red-950 relative">
          <div className="flex items-center justify-between border-b border-red-200 pb-1 text-[7px] font-black text-red-700">
            <span>🎟️ CINEMA MOVIE TICKET</span>
            <span>ADMIT ONE</span>
          </div>

          <div className="space-y-1 flex-1 flex flex-col justify-between my-1">
            <div className="flex-1 rounded-sm overflow-hidden border border-red-300 bg-white relative">
              <img
                src={PORTRAITS[0]}
                alt="Cinema 1"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <span className="absolute bottom-0.5 right-1 text-[5px] bg-red-700 text-white px-1 rounded-xs">
                SCENE 01
              </span>
            </div>
            <div className="flex-1 rounded-sm overflow-hidden border border-red-300 bg-white relative">
              <img
                src={PORTRAITS[1]}
                alt="Cinema 2"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <span className="absolute bottom-0.5 right-1 text-[5px] bg-red-700 text-white px-1 rounded-xs">
                SCENE 02
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-red-300 pt-1 text-[5px]">
            <div>SEAT: A-12 • AUDITORIUM 4</div>
            <div className="font-mono text-[6px] font-bold text-red-800">||| 88492026 |||</div>
          </div>
        </div>
      )}
    </div>
  );
}
