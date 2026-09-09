import { Link } from 'react-router-dom';

export function PreviewSection() {
  return (
    <section id="preview" className="min-h-screen lg:min-h-0 lg:h-[calc(100vh-4rem)] flex items-center justify-center py-10 sm:py-14 pb-24 sm:pb-28 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-200/35 blur-[140px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 mb-3 uppercase">
              Live Preview
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-4 sm:mb-6">
              Your camera. <br />
              <span className="bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                Your moment.
              </span> <br />
              Your story.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
              Pengalaman photobooth autentik dengan hitungan mundur dinamis, frame photobooth klasik & viral, dan hasil foto resolusi tinggi yang siap disimpan langsung ke galerimu.
            </p>

            <Link
              to="/templates"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 shadow-lg shadow-coral-500/25 active:scale-95 transition-all"
            >
              <span>Lihat Semua Template</span>
              <span className="text-lg">→</span>
            </Link>
          </div>

          {/* Right Interactive Clean White Mockup */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="w-full max-w-[340px] sm:max-w-sm bg-white rounded-[2.5rem] p-4 sm:p-5 border-2 border-slate-200 shadow-2xl shadow-slate-300/60 relative flex flex-col justify-between max-h-[calc(100vh-140px)]">
              {/* Smartphone Top Speaker */}
              <div className="w-20 sm:w-24 h-3.5 bg-slate-100 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-slate-300 mr-2" />
                <div className="w-6 h-1 bg-slate-300 rounded-full" />
              </div>

              {/* Mockup Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  IZIAPHOTO LIVE
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-full">
                  PHOTO 2 / 4
                </span>
              </div>

              {/* Viewfinder Container (Clean Light Camera Preview) */}
              <div className="relative aspect-[3/4] max-h-[300px] sm:max-h-[360px] w-full bg-gradient-to-b from-slate-100 via-rose-50/40 to-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex flex-col items-center justify-center mx-auto shadow-inner">
                {/* Mock Viewfinder Corner Borders */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-slate-400 rounded-tl" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-slate-400 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-slate-400 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-slate-400 rounded-br" />

                {/* Animated Countdown Circle */}
                <div className="relative z-10 flex flex-col items-center justify-center scale-90 sm:scale-100">
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white/90 backdrop-blur-md border-2 border-rose-300 flex items-center justify-center shadow-lg shadow-rose-500/15 animate-pulse-fast">
                    <span className="text-4xl sm:text-5xl font-display font-black text-rose-500">
                      3
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 tracking-wider mt-2 uppercase bg-white/80 px-2.5 py-0.5 rounded-full shadow-xs">
                    Bersiap... Senyum! 😊
                  </span>
                </div>

                {/* Floating Strip Preview on Side */}
                <div className="absolute right-2.5 bottom-2.5 w-14 sm:w-16 bg-white p-1 rounded-lg shadow-lg rotate-2 scale-90 border border-slate-200">
                  <div className="space-y-1">
                    <img src="/mockups/korean_pose_1.jpg" alt="Pose 1" className="h-4 w-full object-cover object-center rounded-xs" />
                    <img src="/mockups/korean_pose_2.jpg" alt="Pose 2" className="h-4 w-full object-cover object-center rounded-xs" />
                    <img src="/mockups/korean_pose_3.jpg" alt="Pose 3" className="h-4 w-full object-cover object-center rounded-xs" />
                    <img src="/mockups/korean_pose_4.jpg" alt="Pose 4" className="h-4 w-full object-cover object-center rounded-xs" />
                  </div>
                  <div className="text-[5px] text-center font-bold text-slate-800 mt-1">IZIAPHOTO</div>
                </div>
              </div>

              {/* Mockup Bottom Controls (Clean Light Buttons) */}
              <div className="pt-3 sm:pt-4 pb-1 flex items-center justify-between px-3">
                {/* Switcher Button */}
                <button
                  type="button"
                  title="Switch Camera"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-sm text-slate-700 transition-colors shadow-xs"
                >
                  🔄
                </button>

                {/* Large Shutter Button */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-rose-200 p-0.5 sm:p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-coral-500 to-rose-500 hover:from-coral-600 hover:to-rose-600 transition-colors flex items-center justify-center text-lg sm:text-xl text-white shadow-md shadow-rose-500/30">
                    📸
                  </div>
                </div>

                {/* Reset / Flash Control Button */}
                <button
                  type="button"
                  title="Reset / Flash"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-sm text-slate-700 transition-colors shadow-xs"
                >
                  ⚡
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

