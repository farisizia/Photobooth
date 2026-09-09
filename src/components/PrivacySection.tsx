import { Link } from 'react-router-dom';

export function PrivacySection() {
  const privacyPillars = [
    {
      icon: '🛡️',
      title: '100% Client-Side',
      description: 'Foto diproses langsung di browser kamu menggunakan Canvas API lokal tanpa campur tangan server.',
      badge: 'Zero Upload',
    },
    {
      icon: '🔐',
      title: 'Tanpa Database & Akun',
      description: 'Kamu nggak perlu login atau registrasi. Kami tidak pernah menyimpan wajah atau data pribadimu.',
      badge: 'No Account',
    },
    {
      icon: '💾',
      title: 'Tersimpan di Perangkatmu',
      description: 'Hasil photobooth langsung diunduh ke galeri HP atau folder download komputermu sendiri.',
      badge: 'Direct Download',
    },
  ];

  return (
    <section id="privacy" className="py-20 sm:py-24 relative bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 mb-3 uppercase shadow-xs">
            PRIVASI PRIORITAS #1
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">
            Foto Kamu, Tetap Punya Kamu. 🔒
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Privasi tetap nomor satu. IziaPhoto dirancang agar seluruh proses kamera dan render frame berjalan 100% langsung di perangkatmu tanpa perlu upload foto ke server.
          </p>
        </div>

        {/* 3 Privacy Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {privacyPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-2xl mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  {pillar.badge}
                </span>
                <span className="text-xs text-emerald-600 font-bold">
                  Terjamin ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Verification */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌿</span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Aman untuk foto bareng ayang, sahabat, atau sendiri.
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Tidak ada pelacakan wajah, analitik gambar, ataupun penyimpanan cloud tersembunyi.
              </p>
            </div>
          </div>

          <Link
            to="/templates"
            className="whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            Mulai Tanpa Khawatir →
          </Link>
        </div>
      </div>
    </section>
  );
}
