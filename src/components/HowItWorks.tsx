import { Link } from 'react-router-dom';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Pilih Template Favorit',
      description: 'Pilih salah satu dari 6+ template viral (Koran Jadul, Korean 4-Cut, Music Player, dll).',
      icon: '✨',
      badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/60',
    },
    {
      number: '02',
      title: 'Jepret Foto Otomatis',
      description: 'Izinkan kamera dan pose dengan countdown otomatis yang memandu setiap posemu.',
      icon: '📸',
      badgeBg: 'bg-purple-50 text-purple-600 border-purple-200/60',
    },
    {
      number: '03',
      title: 'Simpan & Bagikan',
      description: 'Lihat hasil fotomu yang langsung terpasang cantik di frame, lalu download instan tanpa watermark!',
      icon: '🎉',
      badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/60',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-100/50 relative border-y border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 mb-3 uppercase">
            Mudah & Cepat
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Hanya butuh 3 langkah instan untuk menciptakan kenangan tak terlupakan.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all group"
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

        <div className="mt-12 text-center">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-sm hover:underline transition-all"
          >
            <span>Pilih Template Sekarang</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
