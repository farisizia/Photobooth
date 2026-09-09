import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coral-500 via-rose-500 to-pink-500 flex items-center justify-center text-xl shadow-md shadow-coral-500/25 group-hover:scale-105 transition-transform">
            📸
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
              SnapMoment
            </span>
            <span className="block text-[10px] font-bold tracking-widest text-coral-500 uppercase -mt-0.5">
              LIVE PHOTOBOOTH
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-coral-500 transition-colors">
            Fitur
          </a>
          <a href="#how-it-works" className="hover:text-coral-500 transition-colors">
            Cara Kerja
          </a>
          <a href="#preview" className="hover:text-coral-500 transition-colors">
            Preview
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 shadow-md shadow-coral-500/25 active:scale-95 transition-all"
          >
            <span>📸</span>
            <span>Mulai Photobooth</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
