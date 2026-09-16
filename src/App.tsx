import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Route-level code-splitting to keep initial bundle ultra-light
const HomePage = lazy(() =>
  import('./pages/Home').then((m) => ({ default: m.HomePage }))
);
const TemplateSelectionPage = lazy(() =>
  import('./pages/TemplateSelection').then((m) => ({ default: m.TemplateSelectionPage }))
);
const PhotoboothPage = lazy(() =>
  import('./pages/Photobooth').then((m) => ({ default: m.PhotoboothPage }))
);

function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0C0D12] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-500 to-rose-500 animate-pulse flex items-center justify-center shadow-lg shadow-coral-500/20">
          <span className="text-white text-lg font-black">✦</span>
        </div>
        <div className="text-xs font-semibold text-gray-400 tracking-wider uppercase animate-pulse">
          Memuat Studio...
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#181A22',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            fontSize: '14px',
          },
        }}
      />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplateSelectionPage />} />
          <Route path="/photobooth" element={<PhotoboothPage />} />
          {/* Redirect unknown paths back to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
