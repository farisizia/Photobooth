export function Features() {
  const features = [
    {
      icon: '📸',
      title: 'Instant Photos',
      description: 'Ambil foto langsung menggunakan kamera browser ponsel atau laptopmu tanpa delay.',
      tag: 'Direct Camera',
      badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/70',
      tagBg: 'text-rose-600 bg-rose-50',
    },
    {
      icon: '✨',
      title: '6+ Viral Frames',
      description: 'Pilihan template hits: Koran Jadul, Korean 4-Cut, Music Player Spotify, hingga 35mm Roll Film.',
      tag: 'Viral Aesthetics',
      badgeBg: 'bg-purple-50 text-purple-600 border-purple-200/70',
      tagBg: 'text-purple-600 bg-purple-50',
    },
    {
      icon: '⚡',
      title: 'Zero Install & Cepat',
      description: 'Langsung klik dan mulai sesi foto seketika tanpa perlu download aplikasi atau login.',
      tag: '100% Client-Side',
      badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/70',
      tagBg: 'text-amber-600 bg-amber-50',
    },
    {
      icon: '⬇️',
      title: 'Download Instantly',
      description: 'Simpan hasil strip foto resolusi tinggi berformat PNG siap upload ke Instagram Story atau TikTok.',
      tag: 'High Definition',
      badgeBg: 'bg-sky-50 text-sky-600 border-sky-200/70',
      tagBg: 'text-sky-600 bg-sky-50',
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 mb-3 uppercase">
            Fitur Unggulan
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Capture the Moment
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Nikmati sensasi photobooth seru ala Korea dan vintage langsung dari layar smartphonemu secara instan dan gratis.
          </p>
        </div>

        {/* Feature Cards - Modern Clean White with Varied Pastel Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Varied Pastel Icon Badge */}
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform ${feat.badgeBg}`}
                >
                  {feat.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md ${feat.tagBg}`}>
                  {feat.tag}
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-coral-500 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
