import { Link } from 'react-router-dom';

export function EmotionalSection() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white border-b border-slate-200/60">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-pink-200/30 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Emotional Visual Mockup (Polaroid Card Stack) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[360px] h-[380px] sm:h-[400px] flex items-center justify-center select-none">
              
              {/* Back Card (Tilted right +6deg) */}
              <div className="absolute top-4 right-4 w-[240px] bg-white p-3 pb-5 rounded-2xl shadow-lg border border-slate-200/80 rotate-6 transition-transform hover:rotate-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-stone-100">
                  <img
                    src="/mockups/vintage_pose_2.jpg"
                    alt="Random laugh with bestie"
                    className="w-full h-full object-cover object-center filter grayscale contrast-125"
                    loading="lazy"
                  />
                </div>
                <p className="font-handwriting text-slate-700 text-lg text-center -rotate-1">
                  "random date ngopi sore ✨"
                </p>
              </div>

              {/* Front Card (Tilted left -4deg) */}
              <div className="absolute top-12 left-4 w-[250px] bg-white p-3.5 pb-6 rounded-2xl shadow-2xl border border-rose-100 -rotate-4 hover:rotate-0 hover:scale-105 transition-all duration-300 z-10">
                {/* Washi tape accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-pink-200/80 border-t border-b border-pink-300/80 backdrop-blur-xs shadow-2xs rotate-1" />
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2.5 bg-rose-50 shadow-inner">
                  <img
                    src="/mockups/korean_pose_4.jpg"
                    alt="Best friends forever"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="font-handwriting text-slate-800 text-xl">
                    bestie time 💖
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    #snap
                  </span>
                </div>
              </div>

              {/* Little sticky note badge */}
              <div className="absolute -bottom-2 right-6 z-20 bg-amber-100 border border-amber-300/70 px-3.5 py-1.5 rounded-xl shadow-md rotate-3 text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <span>📸</span>
                <span>Bukan cuma masuk galeri</span>
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2">
            <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 mb-4 uppercase shadow-xs">
              SWEET MEMORIES
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mb-6">
              Karena Momen Kecil Juga Layak Diabadikan. 💗
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              <p>
                Nggak harus nunggu ulang tahun, date spesial, atau acara besar.
              </p>
              <p className="font-medium text-slate-800">
                Kadang foto random bareng orang favorit justru jadi kenangan yang paling sering dilihat.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 shadow-xl shadow-rose-500/25 hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
              >
                <span>Abadikan Momenmu 📸</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
