import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/Home';
import { TemplateSelectionPage } from './pages/TemplateSelection';
import { PhotoboothPage } from './pages/Photobooth';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<TemplateSelectionPage />} />
        <Route path="/photobooth" element={<PhotoboothPage />} />
        {/* Redirect unknown paths back to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
