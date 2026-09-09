import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden p-8 sm:p-14 text-center bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 shadow-2xl shadow-rose-500/25 border border-rose-400/40">
          {/* Ambient Glows inside CTA card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 blur-[90px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-300/25 blur-[90px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-4xl mb-3 inline-block">✨</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight mb-4">
              Udah Siap Foto? <span className="inline-block whitespace-nowrap">👀📸</span>
            </h2>
            <p className="text-rose-100 text-base sm:text-lg mb-8 max-w-lg mx-auto font-medium leading-relaxed">
              Nggak perlu ke photobooth. <br className="hidden sm:inline" />
              Nggak perlu install aplikasi. <br className="hidden sm:inline" />
              Tinggal buka dan mulai foto.
            </p>

            <div className="mb-4">
              <Link
                to="/templates"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-lg sm:text-xl font-black text-rose-600 bg-white hover:bg-rose-50 shadow-2xl shadow-rose-950/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>📸 Mulai Photobooth Gratis</span>
              </Link>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-rose-100/90 tracking-wide">
              Gratis • Browser-based • No app needed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
