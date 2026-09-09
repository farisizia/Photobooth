import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="text-center sm:text-left">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="text-xl">📸</span>
              <span className="font-display font-bold text-lg text-slate-900 group-hover:text-rose-600 transition-colors">IziaPhoto</span>
            </Link>
            <p className="text-sm text-slate-500 mt-1">
              Your joyful digital photobooth experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-sm font-semibold text-slate-600">
            <Link to="/" className="hover:text-rose-600 transition-colors">
              Home
            </Link>
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
            <Link to="/templates" className="text-rose-600 font-bold hover:underline transition-all">
              Mulai Foto →
            </Link>
          </div>
        </div>

        {/* Copyright & Microcopy */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <p>© 2026 IziaPhoto. All rights reserved. Made for besties & couples.</p>
          <p className="flex items-center gap-2">
            <span>✨ 100% Client-Side</span>
            <span>•</span>
            <span>Free Forever</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
