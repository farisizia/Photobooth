import { Link } from 'react-router-dom';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Buka IziaPhoto',
      description: 'Langsung dari browser, nggak perlu install.',
      icon: '🚀',
      badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/70',
    },
    {
      number: '02',
      title: 'Pilih Template',
      description: 'Pilih vibes yang paling kamu banget.',
      icon: '✨',
      badgeBg: 'bg-purple-50 text-purple-600 border-purple-200/70',
    },
    {
      number: '03',
      title: 'Pose & Jepret',
      description: 'Pose bareng ayang atau bestie, lalu simpan fotonya.',
      icon: '📸',
      badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/70',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-100/50 relative border-y border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 mb-3 uppercase shadow-xs">
            ALUR SIMPLE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">
            Foto Gampang, <span className="inline-block whitespace-nowrap">Serius. 😭📸</span>
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed">
            Cuma butuh 3 langkah buat bikin memori bareng orang favorit.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all group"
            >
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-rose-500">
                  {step.number}
                </span>
                <span className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform ${step.badgeBg}`}>
                  {step.icon}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button after section */}
        <div className="text-center">
          <Link
            to="/templates"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 shadow-xl shadow-rose-500/25 hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
          >
            <span>📸</span>
            <span>Coba Sekarang — Gratis</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
