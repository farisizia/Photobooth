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
              <span className="font-display font-bold text-lg text-slate-900 group-hover:text-rose-600 transition-colors">SnapMoment</span>
            </Link>
            <p className="text-sm text-slate-500 mt-1">
              Your joyful digital photobooth experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <Link to="/" className="hover:text-rose-600 transition-colors">
              Home
            </Link>
            <Link to="/templates" className="hover:text-rose-600 transition-colors">
              Katalog Template
            </Link>
            <Link to="/photobooth" className="hover:text-rose-600 transition-colors">
              Photobooth
            </Link>
            <a href="#how-it-works" className="hover:text-rose-600 transition-colors">
              How It Works
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          © 2026 SnapMoment. All rights reserved. Clean & Colorful Edition.
        </div>
      </div>
    </footer>
  );
}
