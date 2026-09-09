import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-coral-500 via-rose-500 to-pink-500 flex items-center justify-center text-lg sm:text-xl shadow-md shadow-coral-500/20 group-hover:scale-105 transition-transform">
            📸
          </div>
          <div>
            <span className="font-display font-black text-base sm:text-lg tracking-tight text-slate-900 flex items-center">
              IziaPhoto
            </span>
            <span className="block text-[9px] sm:text-[10px] font-bold tracking-wider text-rose-500 uppercase -mt-0.5">
              LIVE PHOTOBOOTH
            </span>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-rose-600 transition-colors">
            Kenapa IziaPhoto?
          </a>
          <a href="#templates" className="hover:text-rose-600 transition-colors">
            Vibes Template
          </a>
          <a href="#how-it-works" className="hover:text-rose-600 transition-colors">
            Cara Kerja
          </a>
          <a href="#privacy" className="hover:text-rose-600 transition-colors">
            Privasi Aman
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center">
          <Link
            to="/templates"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 shadow-md shadow-rose-500/25 active:scale-95 transition-all"
          >
            <span>📸</span>
            <span className="hidden xs:inline sm:inline">Mulai Photobooth</span>
            <span className="inline xs:hidden sm:hidden">Mulai</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
