import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-8 sm:py-10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center">
          <Link to="/" className="inline-flex items-center group" aria-label="IziaPhoto Home">
            <img
              src="/logo-horizontal.png"
              alt="IziaPhoto"
              className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-2 sm:mt-2.5">
            Photobooth seru, langsung dari browser. 📸✨
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Footer Navigation"
          className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-slate-600"
        >
          <Link to="/" className="hover:text-rose-600 transition-colors">
            Home
          </Link>
          <a href="#features" className="hover:text-rose-600 transition-colors">
            Kenapa IziaPhoto?
          </a>
          <a href="#templates" className="hover:text-rose-600 transition-colors">
            Template
          </a>
          <a href="#how-it-works" className="hover:text-rose-600 transition-colors">
            Cara Kerja
          </a>
          <a href="#privacy" className="hover:text-rose-600 transition-colors">
            Privasi
          </a>
          <Link
            to="/templates"
            className="inline-flex items-center gap-1 text-rose-600 font-bold hover:text-rose-700 transition-all group"
          >
            <span>Mulai Foto</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </nav>

        {/* Thin Divider */}
        <div className="w-full max-w-lg h-px bg-slate-200/80 my-4 sm:my-5" />

        {/* Copyright & Developer Personal Branding */}
        <div className="flex flex-col items-center gap-1 text-slate-500">
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-tight">
            © 2026 IziaPhoto
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Designed &amp; Built by{' '}
            <span className="font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
              Faris Izzi Asrori
            </span>{' '}
            ✨
          </p>
        </div>

        {/* Microcopy Feature Highlight */}
        <p className="mt-3 text-[11px] sm:text-xs font-medium text-slate-400 flex items-center justify-center gap-1.5 tracking-tight">
          <span>✨ 100% Client-Side</span>
          <span className="text-slate-300">•</span>
          <span>Gratis</span>
        </p>
      </div>
    </footer>
  );
}

