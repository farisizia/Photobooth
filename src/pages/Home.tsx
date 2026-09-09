import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { TemplateShowcase } from '../components/TemplateShowcase';
import { HowItWorks } from '../components/HowItWorks';
import { EmotionalSection } from '../components/EmotionalSection';
import { PreviewSection } from '../components/PreviewSection';
import { PrivacySection } from '../components/PrivacySection';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative overflow-x-hidden selection:bg-coral-500 selection:text-white">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[600px] h-[600px] bg-gradient-to-br from-rose-200/40 via-pink-100/30 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-20 right-0 translate-x-1/4 w-[550px] h-[550px] bg-gradient-to-bl from-sky-200/40 via-indigo-100/30 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-100/40 via-purple-100/30 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <Hero />
        <Features />
        <TemplateShowcase />
        <HowItWorks />
        <EmotionalSection />
        <PreviewSection />
        <PrivacySection />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
