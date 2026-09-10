import { PhotoboothTemplate } from '../constants/templatesData';
import { getTemplateSamplePhotos } from '../constants/templateSamplePhotos';
import { getContrastColors } from '../utils/customBuilder';

interface TemplateCardMockupProps {
  template: PhotoboothTemplate;
  customPhotos?: string[];
}

export function TemplateCardMockup({ template, customPhotos }: TemplateCardMockupProps) {
  const { layoutType, theme, slots, id } = template;

  // Use custom captured photos if provided, otherwise use curated varied sample photos
  const photos =
    customPhotos && customPhotos.length > 0
      ? Array.from({ length: slots }).map((_, i) => customPhotos[i % customPhotos.length])
      : getTemplateSamplePhotos(id, slots);

  const now = new Date();
  const dateStr = now
    .toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();

  const contrast = getContrastColors(theme.bg);

  return (
    <div className="w-full h-full flex items-center justify-center p-1 sm:p-2 select-none overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. KOREAN 4-CUT (Classic Pastel Pink & Checkerboard)                      */}
      {/* ========================================================================= */}
      {layoutType === 'korean-4cut' && (
        <>
          {id === 'korean-4cut-checker' ? (
            // Checkerboard variation with genuine checkerboard outer pattern border
            <div
              className="w-[140px] sm:w-[155px] h-[264px] p-[6px] shadow-lg flex flex-col justify-between transition-all duration-300 relative rounded-sm"
              style={{
                backgroundImage:
                  'repeating-conic-gradient(#000000 0% 25%, #ffffff 0% 50%)',
                backgroundSize: '8px 8px',
              }}
            >
              <div className="w-full h-full bg-white p-1.5 flex flex-col justify-between border border-black">
                {/* Header Branding (Single Source of Truth match with Canvas) */}
                <div className="text-center font-display font-bold text-[7.5px] sm:text-[8px] tracking-[0.2em] text-[#09090B] uppercase shrink-0 py-0.5">
                  ✦ 인생네컷 • IZIAPHOTO ✦
                </div>

                {/* 4 Stacked Photo Slots */}
                <div className="flex-1 flex flex-col justify-between space-y-1 my-0.5 overflow-hidden">
                  {photos.slice(0, 4).map((src, idx) => (
                    <div
                      key={idx}
                      className="flex-1 overflow-hidden shadow-2xs border border-black/80 rounded-[1px] bg-black/5"
                    >
                      <img
                        src={src}
                        alt={`Checker Pose ${idx + 1}`}
                        className="w-full h-full object-cover object-center block"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Bottom Stamp & Date */}
                <div className="text-center shrink-0 pt-0.5 border-t border-black/20 text-[#09090B]">
                  <div className="font-display font-bold text-[8px] sm:text-[8.5px] tracking-[0.2em] leading-tight uppercase">
                    KOREAN PHOTOBOOTH
                  </div>
                  <div className="text-[5.5px] sm:text-[6px] font-sans font-semibold tracking-[0.12em] opacity-80 mt-0.5 uppercase">
                    2026 • {dateStr}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Classic Soft Pink variation (Single Source of Truth match with Canvas)
            <div
              style={{ backgroundColor: theme.bg }}
              className="w-[140px] sm:w-[155px] h-[264px] rounded-xl p-2 shadow-md border-2 border-[#FBCFE8] flex flex-col justify-between transition-all duration-300 relative"
            >
              {/* Header atas: persis seperti hasil akhir (✦ 인생네컷 • IZIAPHOTO ✦) */}
              <div
                className="text-center font-display font-bold text-[7.5px] sm:text-[8px] tracking-[0.22em] uppercase shrink-0 py-0.5"
                style={{ color: theme.text }}
              >
                ✦ 인생네컷 • IZIAPHOTO ✦
              </div>

              {/* 4 Stacked Photo Slots */}
              <div className="flex-1 flex flex-col justify-between space-y-1 my-0.5 overflow-hidden">
                {photos.slice(0, 4).map((src, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-[3px] overflow-hidden shadow-2xs bg-white/60"
                  >
                    <img
                      src={src}
                      alt={`Pose ${idx + 1}`}
                      className="w-full h-full object-cover object-center block"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Footer bawah: stempel bawah (KOREAN PHOTOBOOTH + tanggal) */}
              <div
                className="text-center shrink-0 pt-1 border-t border-pink-200/60"
                style={{ color: theme.text }}
              >
                <div className="font-display font-bold text-[8.5px] sm:text-[9px] tracking-[0.22em] leading-tight uppercase">
                  KOREAN PHOTOBOOTH
                </div>
                <div className="text-[6px] sm:text-[6.5px] font-sans font-semibold tracking-[0.15em] opacity-80 mt-0.5 uppercase">
                  2026 • {dateStr}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. KOREAN WIDE 2-CUT (Landscape Stacked 2 Shots)                         */}
      {/* ========================================================================= */}
      {layoutType === 'korean-wide' && (
        <div
          style={{ backgroundColor: theme.bg }}
          className="w-[170px] sm:w-[185px] h-[256px] rounded-xl p-2.5 shadow-md border-2 border-[#E7E5E4] flex flex-col justify-between text-[#292524] relative"
        >
          {/* Header */}
          <div className="text-center font-display font-bold text-[7.5px] sm:text-[8px] tracking-[0.2em] uppercase shrink-0">
            ✦ KOREAN WIDE CUT • 2-SHOTS ✦
          </div>

          {/* 2 Landscape Photos */}
          <div className="space-y-1.5 my-1 flex-1 flex flex-col justify-between overflow-hidden">
            {photos.slice(0, 2).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-md overflow-hidden bg-white shadow-2xs border border-stone-200 relative group"
              >
                <img
                  src={src}
                  alt={`Wide ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
                <span className="absolute top-1 left-1 text-[5px] sm:text-[5.5px] font-mono font-bold bg-[#1C1917] text-white px-1.5 py-0.2 rounded-full shadow-xs">
                  SHOT 0{idx + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center text-[6px] sm:text-[6.5px] font-sans font-semibold text-stone-600 tracking-wider pt-1 border-t border-stone-200 shrink-0 uppercase">
            SWEET MEMORIES WITH BESTIES • {dateStr} • IZIAPHOTO
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VINTAGE NEWSPAPER (The Vintage Chronicle / Koran Jadul)               */}
      {/* ========================================================================= */}
      {layoutType === 'newspaper' && (
        <div
          style={{ backgroundColor: theme.bg }}
          className="w-[180px] sm:w-[195px] h-[264px] rounded-xs p-2 shadow-md border-2 border-[#1C1917] flex flex-col justify-between font-serif text-[#1C1917] relative"
        >
          {/* Masthead Header */}
          <div className="text-center border-b border-[#1C1917] pb-1 shrink-0">
            <div className="text-[5px] sm:text-[5.5px] font-bold tracking-widest uppercase text-stone-800">
              ★ SPECIAL REPORT • BREAKING EDITION ★
            </div>
            <div className="text-[12px] sm:text-[13px] font-black tracking-widest text-[#1C1917] leading-tight">
              BREAKING NEWS
            </div>
            <div className="text-[5px] font-mono text-stone-600 border-y border-[#1C1917]/40 py-0.5 my-0.5">
              VOL. XXIV • SPECIAL EDITION • {dateStr} • ARCHIVAL B&W
            </div>
            <div className="text-[6px] sm:text-[6.5px] font-black uppercase tracking-tight text-[#1C1917] truncate mt-0.5">
              MOMENTS OF PURE JOY & SMILES RECORDED LIVE
            </div>
          </div>

          {/* 2 Monochrome Photos with Letterpress Borders & Captions */}
          <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5 overflow-hidden">
            {photos.slice(0, 2).map((src, idx) => (
              <div
                key={idx}
                className="bg-[#0A0A0A] p-0.5 shadow-2xs flex-1 flex flex-col overflow-hidden"
              >
                <div className="flex-1 overflow-hidden relative">
                  <img
                    src={src}
                    alt={`Archival ${idx + 1}`}
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 block"
                    loading="lazy"
                  />
                  <span className="absolute bottom-0.5 right-0.5 text-[4.5px] font-mono bg-black/80 text-white px-0.5 rounded">
                    B&W
                  </span>
                </div>
                <div className="text-[4.5px] italic text-stone-300 mt-0.5 px-0.5 truncate">
                  FIG. 0{idx + 1} — Live photobooth archival frame recorded in monochrome.
                </div>
              </div>
            ))}
          </div>

          {/* Articles & Footer */}
          <div className="shrink-0 border-t border-[#1C1917] pt-0.5">
            <div className="grid grid-cols-2 gap-1 text-[4.5px] leading-tight text-stone-700">
              <div className="truncate">Citizens gathered to preserve memories...</div>
              <div className="border-l border-[#1C1917] pl-1 truncate">
                Archivists confirmed joy never fades.
              </div>
            </div>
            <div className="text-center text-[5px] sm:text-[5.5px] font-sans font-black tracking-widest text-[#1C1917] border-t border-[#1C1917]/40 mt-0.5 pt-0.5 uppercase">
              IZIAPHOTO SPECIAL EDITION • 2026
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. THERMAL RECEIPT (Struk Kasir Cafe & Mart)                              */}
      {/* ========================================================================= */}
      {layoutType === 'receipt' && (
        <div className="w-[160px] sm:w-[175px] h-[264px] bg-[#FAF9F6] text-[#18181B] shadow-md border border-neutral-300 p-2 flex flex-col justify-between font-mono relative">
          {/* Top zigzag simulation */}
          <div className="absolute top-0 inset-x-0 h-1 bg-[#FAF9F6] border-b border-dashed border-neutral-400/60" />

          {/* Receipt Header */}
          <div className="text-center pt-1 border-b border-neutral-400/60 pb-1 shrink-0">
            <div className="text-[7.5px] sm:text-[8px] font-black tracking-wider">
              *** IZIAPHOTO MART & CAFE ***
            </div>
            <div className="text-[5px] text-neutral-500">
              STORE #2026 • DIGITAL PHOTOBOOTH MEMORIES
            </div>
            <div className="text-[5px] text-neutral-500">
              RECEIPT NO: #SM-8849202 | DATE: {dateStr}
            </div>
          </div>

          {/* 3 Photos stacked with monochrome tone */}
          <div className="space-y-1 my-0.5 flex-1 flex flex-col justify-between overflow-hidden">
            {photos.slice(0, 3).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 bg-white border border-neutral-300 overflow-hidden relative"
              >
                <img
                  src={src}
                  alt={`Receipt ${idx + 1}`}
                  className="w-full h-full object-cover object-center filter grayscale contrast-115 brightness-95 block"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 left-0.5 text-[4.5px] bg-black/75 text-white px-1 py-0.2">
                  [PHOTO ITEM #0{idx + 1}]
                </span>
              </div>
            ))}
          </div>

          {/* Total & Barcode */}
          <div className="border-t border-dashed border-neutral-400/60 pt-0.5 text-[5px] space-y-0.5 shrink-0">
            <div className="flex justify-between font-bold text-[6px]">
              <span>TOTAL MEMORIES</span>
              <span>$0.00 (FREE!)</span>
            </div>
            {/* Fake Barcode lines */}
            <div className="h-3 w-3/4 mx-auto flex items-center justify-center gap-0.5 pt-0.5">
              {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2].map((w, i) => (
                <div key={i} style={{ width: `${w}px` }} className="h-full bg-black" />
              ))}
            </div>
            <div className="text-center text-[4.5px] text-neutral-500">
              *** THANK YOU FOR VISITING IZIAPHOTO ***
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MUSIC PLAYER (Spotify / The 1975)                                      */}
      {/* ========================================================================= */}
      {layoutType === 'music-player' && (
        <div className="w-[160px] sm:w-[175px] h-[264px] bg-[#121212] text-white rounded-2xl p-2 shadow-md border border-neutral-800 flex flex-col justify-between relative">
          <div className="text-center shrink-0">
            <div className="text-[5.5px] text-neutral-400 tracking-widest uppercase">
              PLAYING FROM ALBUM
            </div>
            <div className="text-[7px] font-bold text-white tracking-wide">
              Live Photobooth • The 1975 Edition
            </div>
          </div>

          {/* 4 Photos Grid */}
          <div className="grid grid-cols-2 gap-1 my-1 flex-1 overflow-hidden">
            {photos.slice(0, 4).map((src, idx) => (
              <div
                key={idx}
                className="rounded-xs overflow-hidden bg-neutral-900 border border-neutral-800"
              >
                <img
                  src={src}
                  alt={`Track ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Audio Controls & Seekbar */}
          <div className="pt-1 border-t border-neutral-800 space-y-1 shrink-0">
            <div className="flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-[7.5px] font-bold text-white truncate">About You</div>
                <div className="text-[5.5px] text-neutral-400 truncate">
                  The 1975 • {dateStr}
                </div>
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
              <span>🔀</span>
              <span>⏮️</span>
              <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[7px] font-bold">
                ▶
              </div>
              <span>⏭️</span>
              <span>🔁</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. 35MM ANALOG FILM ROLL (Film Negatives & Sprockets)                     */}
      {/* ========================================================================= */}
      {layoutType === 'film-sprocket' && (
        <div className="w-[155px] sm:w-[170px] h-[264px] bg-[#141416] text-amber-500 rounded-lg p-1.5 shadow-md border border-neutral-800 flex justify-between relative">
          {/* Left Sprocket Column */}
          <div className="w-3 flex flex-col justify-around items-center py-1 shrink-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-2.5 bg-[#FAF6EF] rounded-2xs border border-neutral-700"
              />
            ))}
          </div>

          {/* Center 3 Photos */}
          <div className="flex-1 flex flex-col justify-between px-1 overflow-hidden">
            <div className="text-center text-[5.5px] sm:text-[6px] font-mono tracking-widest text-amber-500 shrink-0 truncate">
              ▶ KODAK PORTRA 400 • 35MM
            </div>

            <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5 overflow-hidden">
              {photos.slice(0, 3).map((src, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-black border border-neutral-700 rounded-2xs overflow-hidden relative"
                >
                  <img
                    src={src}
                    alt={`Film ${idx + 1}`}
                    className="w-full h-full object-cover object-center filter saturate-105 block"
                    loading="lazy"
                  />
                  <span className="absolute bottom-0.5 right-0.5 text-[5px] font-mono text-amber-400 bg-black/80 px-0.5">
                    2{idx + 4}A
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center text-[5px] font-mono text-red-500/90 shrink-0 truncate">
              IZIAPHOTO FILM LAB • {dateStr}
            </div>
          </div>

          {/* Right Sprocket Column */}
          <div className="w-3 flex flex-col justify-around items-center py-1 shrink-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-2.5 bg-[#FAF6EF] rounded-2xs border border-neutral-700"
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. CLASSIC POLAROID 600 (Single Shot Instant)                             */}
      {/* ========================================================================= */}
      {layoutType === 'polaroid-single' && (
        <div className="w-[170px] sm:w-[185px] h-[256px] bg-white rounded-lg p-2.5 pb-3.5 shadow-lg border border-slate-200 flex flex-col justify-between text-slate-800 relative">
          {/* Top Washi tape */}
          <div className="w-12 h-2.5 bg-amber-200/80 border border-amber-300 mx-auto -mt-3.5 mb-1 shadow-2xs" />

          {/* Single Square Photo */}
          <div className="aspect-square w-full bg-stone-900 border border-stone-200 overflow-hidden shadow-inner relative">
            <img
              src={photos[0]}
              alt="Polaroid Single"
              className="w-full h-full object-cover object-center filter contrast-105 block"
              loading="lazy"
            />
          </div>

          {/* Thick Bottom Margin with Handwritten Text */}
          <div className="pt-2 text-center shrink-0">
            <div className="font-serif italic font-bold text-[10px] text-slate-800">
              Our Little Moments ♡
            </div>
            <div className="text-[5.5px] font-mono text-slate-500 tracking-wider mt-0.5">
              POLAROID 600 • {dateStr} • IZIAPHOTO
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. DUAL POLAROID STACK                                                   */}
      {/* ========================================================================= */}
      {layoutType === 'polaroid-dual' && (
        <div className="w-[170px] sm:w-[185px] h-[256px] bg-[#FDFBF7] rounded-xl p-2 shadow-md border border-stone-200 flex flex-col justify-between relative">
          <div className="text-center text-[7px] font-bold text-stone-700 tracking-wider shrink-0">
            ✦ DUAL POLAROID MEMORIES ✦
          </div>

          <div className="space-y-1.5 flex-1 flex flex-col justify-between my-1 overflow-hidden">
            {photos.slice(0, 2).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 bg-white p-1 rounded-sm border border-stone-200 shadow-2xs flex flex-col relative"
              >
                {/* Washi tape on corner */}
                <div
                  className={`absolute -top-1.5 left-2 w-8 h-2 ${
                    idx === 0 ? 'bg-amber-200/80' : 'bg-rose-200/80'
                  } border border-black/10`}
                />
                <div className="flex-1 overflow-hidden">
                  <img
                    src={src}
                    alt={`Dual ${idx + 1}`}
                    className="w-full h-full object-cover object-center block"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-[6px] font-serif italic text-stone-500 shrink-0">
            Captured with love • {dateStr} • IziaPhoto
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. Y2K CYBER SILVER (CD Prism Chrome)                                    */}
      {/* ========================================================================= */}
      {layoutType === 'y2k-chrome' && (
        <div className="w-[145px] sm:w-[160px] h-[264px] bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-xl p-2 shadow-md border-2 border-indigo-300 flex flex-col justify-between text-indigo-950 relative">
          <div className="text-center text-[7.5px] font-black tracking-widest text-indigo-900 shrink-0">
            ✦ CYBER 2000 • CD PRISM ✦
          </div>

          <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5 overflow-hidden">
            {photos.slice(0, 4).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-xs overflow-hidden border border-indigo-400/80 bg-white relative"
              >
                <img
                  src={src}
                  alt={`Y2K ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
                <span className="absolute top-0.5 right-0.5 text-[6px] text-indigo-600">✦</span>
              </div>
            ))}
          </div>

          <div className="text-center text-[6px] font-bold tracking-widest text-indigo-900 pt-0.5 border-t border-indigo-300 shrink-0">
            ★ FUTURE NOSTALGIA • {dateStr} ★
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. PASSPORT / ID PHOTO (6 Slots 2x3 Grid Sheet)                         */}
      {/* ========================================================================= */}
      {layoutType === 'passport-grid' && (
        <div className="w-[170px] sm:w-[185px] h-[256px] bg-[#F8FAFC] rounded-xl p-2 shadow-md border border-slate-300 flex flex-col justify-between text-slate-800 relative">
          <div className="text-center border-b border-slate-200 pb-0.5 shrink-0">
            <div className="text-[6.5px] sm:text-[7px] font-bold text-blue-900 tracking-wider">
              OFFICIAL PASSPORT & ID PHOTOBOOTH
            </div>
            <div className="text-[5px] text-blue-600 font-mono">
              REG: #IZIA-2026 • 2x3 PASFOTO SHEET
            </div>
          </div>

          {/* 2x3 Photo Grid */}
          <div className="grid grid-cols-2 grid-rows-3 gap-1 flex-1 my-1 overflow-hidden">
            {photos.slice(0, 6).map((src, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xs overflow-hidden relative shadow-2xs"
              >
                <img
                  src={src}
                  alt={`ID ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
                {/* Crosshair marks in corners */}
                <div className="absolute top-0.5 left-0.5 text-[4px] text-white/80">+</div>
                <div className="absolute bottom-0.5 right-0.5 text-[4px] text-white/80">+</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[5px] text-slate-500 border-t border-slate-200 pt-0.5 shrink-0">
            <span>ISSUED: {dateStr}</span>
            <span className="text-blue-600 font-bold">VERIFIED AUTHENTIC</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11. FLORAL ROMANCE                                                       */}
      {/* ========================================================================= */}
      {layoutType === 'floral-romance' && (
        <div className="w-[145px] sm:w-[160px] h-[264px] bg-[#FFFBEB] rounded-xl p-2 shadow-md border-2 border-amber-200 flex flex-col justify-between text-amber-950 relative">
          <div className="text-center text-[7px] font-serif italic text-rose-800 shrink-0">
            🌹 Floral Romance • Rose Edition 🌹
          </div>

          <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5 overflow-hidden">
            {photos.slice(0, 4).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-xs overflow-hidden border border-rose-200 bg-white relative"
              >
                <img
                  src={src}
                  alt={`Floral ${idx + 1}`}
                  className="w-full h-full object-cover object-center filter saturate-105 block"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-0.5 text-[6px]">
                  {idx % 2 === 0 ? '🌸' : '🌿'}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center text-[5.5px] font-serif italic text-amber-800 shrink-0">
            ♡ Cherished Love & Memories • {dateStr} ♡
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 12. KAWAII STICKER BOMB                                                  */}
      {/* ========================================================================= */}
      {layoutType === 'kawaii-sticker' && (
        <div className="w-[155px] sm:w-[170px] h-[264px] bg-[#FEF3C7] rounded-2xl p-2 shadow-md border-2 border-pink-300 flex flex-col justify-between text-pink-900 relative">
          <div className="text-center text-[7.5px] font-extrabold text-pink-600 shrink-0">
            🍓 SWEET BERRY PHOTOBOOTH 🍑
          </div>

          <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5 overflow-hidden">
            {photos.slice(0, 3).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-lg overflow-hidden border border-pink-300 bg-white relative"
              >
                <img
                  src={src}
                  alt={`Kawaii ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
                <span className="absolute top-0.5 right-1 text-[8px]">
                  {idx === 0 ? '🍓' : idx === 1 ? '🍑' : '🍒'}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center text-[6px] font-bold text-pink-500 shrink-0">
            ♡ Cutest Moments • {dateStr} ♡
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 13. CINEMA TICKET                                                        */}
      {/* ========================================================================= */}
      {layoutType === 'cinema-ticket' && (
        <div className="w-[175px] sm:w-[190px] h-[256px] bg-[#FEF2F2] rounded-xl p-2 shadow-md border-2 border-red-300 flex flex-col justify-between text-red-950 relative">
          {/* Ticket notches */}
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0C0D12] rounded-full" />
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0C0D12] rounded-full" />

          <div className="flex items-center justify-between border-b border-red-200 pb-0.5 text-[6.5px] font-black text-red-700 shrink-0">
            <span>🎟️ CINEMA MOVIE TICKET</span>
            <span>ADMIT ONE</span>
          </div>

          <div className="space-y-1 flex-1 flex flex-col justify-between my-0.5 overflow-hidden">
            {photos.slice(0, 2).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-sm overflow-hidden border border-red-300 bg-white relative"
              >
                <img
                  src={src}
                  alt={`Cinema ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-1 text-[5px] bg-red-700 text-white px-1 rounded-xs">
                  SCENE 0{idx + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-red-300 pt-0.5 text-[4.5px] shrink-0">
            <div>SEAT: A-12 • {dateStr}</div>
            <div className="font-mono text-[5.5px] font-bold text-red-800">||| 88492026 |||</div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 14. LANDSCAPE 4R — SINGLE SHOT (1 Foto)                                  */}
      {/* ========================================================================= */}
      {layoutType === '4r-landscape-single' && (
        <div
          style={{ backgroundColor: theme.bg, borderColor: contrast.divider }}
          className="w-[215px] sm:w-[230px] h-[148px] sm:h-[158px] rounded-lg p-2 shadow-lg border flex flex-col justify-between relative select-none"
        >
          {template.customTexts?.header && (
            <div className="text-center py-0.5 shrink-0 overflow-hidden px-1">
              <div
                style={{ color: contrast.primaryText }}
                className="text-[8px] sm:text-[9px] font-bold leading-tight truncate"
              >
                {template.customTexts.header}
              </div>
              {template.customTexts?.subhead && (
                <div
                  style={{ color: contrast.secondaryText }}
                  className="text-[5.5px] sm:text-[6px] font-mono tracking-wider truncate mt-0.5"
                >
                  {template.customTexts.subhead}
                </div>
              )}
            </div>
          )}
          <div className="flex-1 w-full rounded-xs overflow-hidden border border-black/10 bg-black/50 relative">
            <img
              src={photos[0]}
              alt="4R Single Landscape"
              className="w-full h-full object-cover object-center block"
              loading="lazy"
            />
          </div>
          <div
            style={{ borderColor: contrast.divider }}
            className="flex items-center justify-between pt-1 shrink-0 border-t mt-1"
          >
            <div
              className="font-display font-black text-[7.5px] tracking-wider"
              style={{ color: contrast.primaryText }}
            >
              Izia<span style={{ color: contrast.photoAccent }}>Photo</span>
            </div>
            <div
              className="text-[5.5px] font-mono tracking-widest uppercase opacity-80"
              style={{ color: contrast.secondaryText }}
            >
              {template.customTexts?.footer || '4R PHOTOBOOTH'}
            </div>
            <div
              className="text-[5px] font-mono tracking-wider opacity-70"
              style={{ color: contrast.secondaryText }}
            >
              {dateStr}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 15. LANDSCAPE 4R — 4-GRID (2x2) (4 Foto)                                 */}
      {/* ========================================================================= */}
      {layoutType === '4r-landscape-grid4' && (
        <div
          style={{ backgroundColor: theme.bg, borderColor: contrast.divider }}
          className="w-[215px] sm:w-[230px] h-[148px] sm:h-[158px] rounded-lg p-2 shadow-lg border flex flex-col justify-between relative select-none"
        >
          {template.customTexts?.header && (
            <div className="text-center py-0.5 shrink-0 overflow-hidden px-1">
              <div
                style={{ color: contrast.primaryText }}
                className="text-[8px] sm:text-[9px] font-bold leading-tight truncate"
              >
                {template.customTexts.header}
              </div>
              {template.customTexts?.subhead && (
                <div
                  style={{ color: contrast.secondaryText }}
                  className="text-[5.5px] sm:text-[6px] font-mono tracking-wider truncate mt-0.5"
                >
                  {template.customTexts.subhead}
                </div>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 grid-rows-2 gap-1 flex-1 my-0.5 overflow-hidden">
            {photos.slice(0, 4).map((src, idx) => (
              <div
                key={idx}
                className="rounded-xs overflow-hidden border border-black/10 bg-black/50"
              >
                <img
                  src={src}
                  alt={`4R Grid ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div
            style={{ borderColor: contrast.divider }}
            className="flex items-center justify-between pt-1 shrink-0 border-t mt-0.5"
          >
            <div
              className="font-display font-black text-[7.5px] tracking-wider"
              style={{ color: contrast.primaryText }}
            >
              Izia<span style={{ color: contrast.photoAccent }}>Photo</span>
            </div>
            <div
              className="text-[5.5px] font-mono tracking-widest uppercase opacity-80"
              style={{ color: contrast.secondaryText }}
            >
              {template.customTexts?.footer || '4-GRID • 4R PRINT'}
            </div>
            <div
              className="text-[5px] font-mono tracking-wider opacity-70"
              style={{ color: contrast.secondaryText }}
            >
              {dateStr}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 16. LANDSCAPE 4R — 3-GRID VERTIKAL (3 Foto)                              */}
      {/* ========================================================================= */}
      {layoutType === '4r-landscape-col3' && (
        <div
          style={{ backgroundColor: theme.bg, borderColor: contrast.divider }}
          className="w-[215px] sm:w-[230px] h-[148px] sm:h-[158px] rounded-lg p-2 shadow-lg border flex flex-col justify-between relative select-none"
        >
          {template.customTexts?.header && (
            <div className="text-center py-0.5 shrink-0 overflow-hidden px-1">
              <div
                style={{ color: contrast.primaryText }}
                className="text-[8px] sm:text-[9px] font-bold leading-tight truncate"
              >
                {template.customTexts.header}
              </div>
              {template.customTexts?.subhead && (
                <div
                  style={{ color: contrast.secondaryText }}
                  className="text-[5.5px] sm:text-[6px] font-mono tracking-wider truncate mt-0.5"
                >
                  {template.customTexts.subhead}
                </div>
              )}
            </div>
          )}
          <div className="grid grid-cols-3 gap-1 flex-1 my-0.5 overflow-hidden">
            {photos.slice(0, 3).map((src, idx) => (
              <div
                key={idx}
                className="rounded-xs overflow-hidden border border-black/10 bg-black/50"
              >
                <img
                  src={src}
                  alt={`4R Col ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div
            style={{ borderColor: contrast.divider }}
            className="flex items-center justify-between pt-1 shrink-0 border-t mt-0.5"
          >
            <div
              className="font-display font-black text-[7.5px] tracking-wider"
              style={{ color: contrast.primaryText }}
            >
              Izia<span style={{ color: contrast.photoAccent }}>Photo</span>
            </div>
            <div
              className="text-[5.5px] font-mono tracking-widest uppercase opacity-80"
              style={{ color: contrast.secondaryText }}
            >
              {template.customTexts?.footer || '3-COLUMN • 4R PRINT'}
            </div>
            <div
              className="text-[5px] font-mono tracking-wider opacity-70"
              style={{ color: contrast.secondaryText }}
            >
              {dateStr}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 17. LANDSCAPE 4R — SPLIT ASIMETRIS (1 Besar + 2 Kecil)                   */}
      {/* ========================================================================= */}
      {layoutType === '4r-landscape-split3' && (
        <div
          style={{ backgroundColor: theme.bg, borderColor: contrast.divider }}
          className="w-[215px] sm:w-[230px] h-[148px] sm:h-[158px] rounded-lg p-2 shadow-lg border flex flex-col justify-between relative select-none"
        >
          {template.customTexts?.header && (
            <div className="text-center py-0.5 shrink-0 overflow-hidden px-1">
              <div
                style={{ color: contrast.primaryText }}
                className="text-[8px] sm:text-[9px] font-bold leading-tight truncate"
              >
                {template.customTexts.header}
              </div>
              {template.customTexts?.subhead && (
                <div
                  style={{ color: contrast.secondaryText }}
                  className="text-[5.5px] sm:text-[6px] font-mono tracking-wider truncate mt-0.5"
                >
                  {template.customTexts.subhead}
                </div>
              )}
            </div>
          )}
          <div className="flex-1 flex flex-col justify-between gap-1 my-0.5 overflow-hidden">
            {/* Top 2 small photos */}
            <div className="grid grid-cols-2 gap-1 h-[48%]">
              <div className="rounded-xs overflow-hidden border border-black/10 bg-black/50">
                <img
                  src={photos[0]}
                  alt="Split Top 1"
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xs overflow-hidden border border-black/10 bg-black/50">
                <img
                  src={photos[1]}
                  alt="Split Top 2"
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Bottom 1 wide landscape photo */}
            <div className="h-[48%] rounded-xs overflow-hidden border border-black/10 bg-black/50">
              <img
                src={photos[2]}
                alt="Split Bottom Wide"
                className="w-full h-full object-cover object-center block"
                loading="lazy"
              />
            </div>
          </div>
          <div
            style={{ borderColor: contrast.divider }}
            className="flex items-center justify-between pt-1 shrink-0 border-t"
          >
            <div
              className="font-display font-black text-[7.5px] tracking-wider"
              style={{ color: contrast.primaryText }}
            >
              Izia<span style={{ color: contrast.photoAccent }}>Photo</span>
            </div>
            <div
              className="text-[5.5px] font-mono tracking-widest uppercase opacity-80"
              style={{ color: contrast.secondaryText }}
            >
              {template.customTexts?.footer || 'SPLIT ASYMMETRIC • 4R'}
            </div>
            <div
              className="text-[5px] font-mono tracking-wider opacity-70"
              style={{ color: contrast.secondaryText }}
            >
              {dateStr}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 18. LANDSCAPE 4R — ASIMETRIS 4-FOTO (1 Medium + 3 Mini)                  */}
      {/* ========================================================================= */}
      {layoutType === '4r-landscape-asym4' && (
        <div
          style={{ backgroundColor: theme.bg, borderColor: contrast.divider }}
          className="w-[215px] sm:w-[230px] h-[148px] sm:h-[158px] rounded-lg p-2 shadow-lg border flex flex-col justify-between relative select-none"
        >
          {template.customTexts?.header && (
            <div className="text-center py-0.5 shrink-0 overflow-hidden px-1">
              <div
                style={{ color: contrast.primaryText }}
                className="text-[8px] sm:text-[9px] font-bold leading-tight truncate"
              >
                {template.customTexts.header}
              </div>
              {template.customTexts?.subhead && (
                <div
                  style={{ color: contrast.secondaryText }}
                  className="text-[5.5px] sm:text-[6px] font-mono tracking-wider truncate mt-0.5"
                >
                  {template.customTexts.subhead}
                </div>
              )}
            </div>
          )}
          <div className="flex-1 flex flex-col justify-between gap-1 my-0.5 overflow-hidden">
            {/* Top 1 medium landscape photo */}
            <div className="h-[52%] rounded-xs overflow-hidden border border-black/10 bg-black/50">
              <img
                src={photos[0]}
                alt="Asym Top Medium"
                className="w-full h-full object-cover object-center block"
                loading="lazy"
              />
            </div>
            {/* Bottom 3 mini portrait photos */}
            <div className="grid grid-cols-3 gap-1 h-[44%]">
              {photos.slice(1, 4).map((src, idx) => (
                <div
                  key={idx}
                  className="rounded-xs overflow-hidden border border-black/10 bg-black/50"
                >
                  <img
                    src={src}
                    alt={`Asym Mini ${idx + 1}`}
                    className="w-full h-full object-cover object-center block"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ borderColor: contrast.divider }}
            className="flex items-center justify-between pt-1 shrink-0 border-t"
          >
            <div
              className="font-display font-black text-[7.5px] tracking-wider"
              style={{ color: contrast.primaryText }}
            >
              Izia<span style={{ color: contrast.photoAccent }}>Photo</span>
            </div>
            <div
              className="text-[5.5px] font-mono tracking-widest uppercase opacity-80"
              style={{ color: contrast.secondaryText }}
            >
              {template.customTexts?.footer || '1+3 ASYMMETRIC • 4R'}
            </div>
            <div
              className="text-[5px] font-mono tracking-wider opacity-70"
              style={{ color: contrast.secondaryText }}
            >
              {dateStr}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 19. PORTRAIT 4R — SINGLE POLAROID (1 Foto)                               */}
      {/* ========================================================================= */}
      {layoutType === '4r-portrait-polaroid' && (
        <div
          style={{ backgroundColor: theme.bg, borderColor: contrast.divider }}
          className="w-[160px] sm:w-[172px] h-[256px] rounded-xl p-2.5 shadow-lg border flex flex-col justify-between relative select-none"
        >
          {/* Main portrait photo */}
          <div className="flex-1 w-full rounded-xs overflow-hidden border border-black/10 bg-black/50 relative">
            <img
              src={photos[0]}
              alt="4R Single Polaroid"
              className="w-full h-full object-cover object-center block"
              loading="lazy"
            />
          </div>
          {/* Spacious bottom branding */}
          <div className="pt-2 text-center shrink-0">
            <div
              className="font-display font-black text-[9px] sm:text-[10px] tracking-wider"
              style={{ color: contrast.primaryText }}
            >
              Izia<span style={{ color: contrast.photoAccent }}>Photo</span>
            </div>
            <div
              className="text-[6px] font-mono tracking-widest mt-0.5 uppercase opacity-80"
              style={{ color: contrast.secondaryText }}
            >
              {template.customTexts?.footer || `4R PHOTOBOOTH • ${dateStr}`}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 20. PORTRAIT 4R — 2-CUT VERTIKAL (2 Foto)                                */}
      {/* ========================================================================= */}
      {layoutType === '4r-portrait-cut2' && (
        <div
          style={{ backgroundColor: theme.bg, borderColor: contrast.divider }}
          className="w-[160px] sm:w-[172px] h-[256px] rounded-xl p-2.5 shadow-lg border flex flex-col justify-between relative select-none"
        >
          {template.customTexts?.header && (
            <div className="text-center py-0.5 shrink-0 overflow-hidden px-1">
              <div
                style={{ color: contrast.primaryText }}
                className="text-[8px] sm:text-[9px] font-bold leading-tight truncate"
              >
                {template.customTexts.header}
              </div>
              {template.customTexts?.subhead && (
                <div
                  style={{ color: contrast.secondaryText }}
                  className="text-[5.5px] sm:text-[6px] font-mono tracking-wider truncate mt-0.5"
                >
                  {template.customTexts.subhead}
                </div>
              )}
            </div>
          )}
          {/* Top and Bottom 2 photos */}
          <div className="space-y-1.5 flex-1 flex flex-col justify-between my-1 overflow-hidden">
            {photos.slice(0, 2).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-xs overflow-hidden border border-black/10 bg-black/50 relative"
              >
                <img
                  src={src}
                  alt={`2-Cut ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div
            style={{ borderColor: contrast.divider }}
            className="flex items-center justify-between pt-1 shrink-0 border-t"
          >
            <div
              className="font-display font-black text-[7.5px] tracking-wider"
              style={{ color: contrast.primaryText }}
            >
              Izia<span style={{ color: contrast.photoAccent }}>Photo</span>
            </div>
            <div
              className="text-[5.5px] font-mono tracking-widest uppercase opacity-80"
              style={{ color: contrast.secondaryText }}
            >
              {template.customTexts?.footer || '2-CUT • 4R PRINT'}
            </div>
            <div
              className="text-[5px] font-mono tracking-wider opacity-70"
              style={{ color: contrast.secondaryText }}
            >
              {dateStr}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 21. PORTRAIT 4R — 4-GRID (2x2) (4 Foto)                                   */}
      {/* ========================================================================= */}
      {layoutType === '4r-portrait-grid4' && (
        <div
          style={{ backgroundColor: theme.bg, borderColor: contrast.divider }}
          className="w-[160px] sm:w-[172px] h-[256px] rounded-xl p-2.5 shadow-lg border flex flex-col justify-between relative select-none"
        >
          {template.customTexts?.header && (
            <div className="text-center py-0.5 shrink-0 overflow-hidden px-1">
              <div
                style={{ color: contrast.primaryText }}
                className="text-[8px] sm:text-[9px] font-bold leading-tight truncate"
              >
                {template.customTexts.header}
              </div>
              {template.customTexts?.subhead && (
                <div
                  style={{ color: contrast.secondaryText }}
                  className="text-[5.5px] sm:text-[6px] font-mono tracking-wider truncate mt-0.5"
                >
                  {template.customTexts.subhead}
                </div>
              )}
            </div>
          )}
          {/* 2x2 Grid of Photos */}
          <div className="grid grid-cols-2 grid-rows-2 gap-1.5 flex-1 my-1 overflow-hidden">
            {photos.slice(0, 4).map((src, idx) => (
              <div
                key={idx}
                className="rounded-xs overflow-hidden border border-black/10 bg-black/50 relative"
              >
                <img
                  src={src}
                  alt={`4-Grid Portrait ${idx + 1}`}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div
            style={{ borderColor: contrast.divider }}
            className="flex items-center justify-between pt-1 shrink-0 border-t"
          >
            <div
              className="font-display font-black text-[7.5px] tracking-wider"
              style={{ color: contrast.primaryText }}
            >
              Izia<span style={{ color: contrast.photoAccent }}>Photo</span>
            </div>
            <div
              className="text-[5.5px] font-mono tracking-widest uppercase opacity-80"
              style={{ color: contrast.secondaryText }}
            >
              {template.customTexts?.footer || '4-GRID • 4R PRINT'}
            </div>
            <div
              className="text-[5px] font-mono tracking-wider opacity-70"
              style={{ color: contrast.secondaryText }}
            >
              {dateStr}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
