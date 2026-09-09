export type TemplateCategory =
  | 'newspaper'
  | 'music'
  | 'korean'
  | 'retro-film'
  | 'cute'
  | 'receipt';

export interface PhotoboothTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  slots: number;
  description: string;
  badge: string;
  theme: {
    bg: string;
    text: string;
    accent: string;
    border?: string;
  };
}

export const TEMPLATE_CATEGORIES: { id: string; name: string; icon: string }[] = [
  { id: 'all', name: 'Semua', icon: '✨' },
  { id: 'newspaper', name: 'Vintage Newspaper', icon: '📰' },
  { id: 'music', name: 'Music Player', icon: '🎵' },
  { id: 'korean', name: 'Korean 4-Cut', icon: '🎞️' },
  { id: 'retro-film', name: '35mm Roll Film', icon: '📷' },
  { id: 'cute', name: 'Cute Fruit', icon: '🍓' },
  { id: 'receipt', name: 'Struk Belanja', icon: '🧾' },
];

export const TEMPLATES: PhotoboothTemplate[] = [
  // 1. VINTAGE NEWSPAPER
  {
    id: 'vintage-newspaper',
    name: 'Koran Jadul (The Vintage Chronicle)',
    category: 'newspaper',
    slots: 2,
    description: 'Layout koran cetak klasik monokrom lengkap dengan header nama koran, headline berita fiktif, kolom artikel retro, dan filter B&W otomatis.',
    badge: '2 Foto • Filter B&W Otomatis',
    theme: {
      bg: '#F5EFEB',
      text: '#111111',
      accent: '#292524',
      border: '#1C1917',
    },
  },

  // 2. MUSIC PLAYER (SPOTIFY / THE 1975 STYLE)
  {
    id: 'music-player',
    name: 'Music Player (The 1975 / Spotify)',
    category: 'music',
    slots: 4,
    description: 'UI pemutar musik vertikal dengan judul lagu, scrubber progress bar, tombol shuffle/play/pause, dan 4 foto strip.',
    badge: '4 Foto • Viral Spotify',
    theme: {
      bg: '#121212',
      text: '#FFFFFF',
      accent: '#1DB954',
      border: '#282828',
    },
  },

  // 3. KOREAN 4-CUT STRIP (PASTEL & CHECKERBOARD)
  {
    id: 'korean-4cut-pastel',
    name: 'Korean 4-Cut (Soft Pastel)',
    category: 'korean',
    slots: 4,
    description: 'Format strip 4 kotak vertikal minimalis khas photobooth Korea dengan frame pastel lembut dan stempel tanggal.',
    badge: '4 Foto • K-Photobooth',
    theme: {
      bg: '#FDF2F4',
      text: '#4A1D2F',
      accent: '#FB7185',
      border: '#FBCFE8',
    },
  },
  {
    id: 'korean-4cut-checker',
    name: 'Korean 4-Cut (Checkerboard)',
    category: 'korean',
    slots: 4,
    description: 'Strip 4 foto vertikal dengan motif border papan catur hitam-putih yang sangat viral di street photobooth Seoul.',
    badge: '4 Foto • Y2K Checker',
    theme: {
      bg: '#FFFFFF',
      text: '#09090B',
      accent: '#E11D48',
      border: '#18181B',
    },
  },

  // 4. RETRO POLAROID / 35MM ROLL FILM
  {
    id: 'retro-film-35mm',
    name: 'Retro 35mm Roll Film Negative',
    category: 'retro-film',
    slots: 3,
    description: 'Bingkai klise roll film analog 35mm lengkap dengan lubang perforasi sproket di samping, kode ISO 400, dan nomor frame.',
    badge: '3 Foto • Analog Film',
    theme: {
      bg: '#18181B',
      text: '#F59E0B',
      accent: '#EF4444',
      border: '#27272A',
    },
  },

  // 5. CUTE FRUIT / MASCOT CUTOUT
  {
    id: 'cute-fruit-mascot',
    name: 'Sweet Berry Fruit Mascot',
    category: 'cute',
    slots: 3,
    description: 'Desain karakter buah strawberry & peach lucu dengan slot foto melingkar di tengah dan stiker dekoratif menggemaskan.',
    badge: '3 Foto • Circular Cutout',
    theme: {
      bg: '#FFF1F2',
      text: '#881337',
      accent: '#F43F5E',
      border: '#FECDD3',
    },
  },

  // 6. RECEIPT / STRUK BELANJA
  {
    id: 'cafe-receipt',
    name: 'Cafe & Mart Thermal Receipt',
    category: 'receipt',
    slots: 3,
    description: 'Desain struk kasir kafe/minimarket estetik lengkap dengan potongan bergerigi, barcode asli, detail harga momen, dan timestamp.',
    badge: '3 Foto • Viral Receipt',
    theme: {
      bg: '#FAF9F6',
      text: '#18181B',
      accent: '#52525B',
      border: '#E4E4E7',
    },
  },
];

export function getTemplateById(id: string): PhotoboothTemplate {
  const found = TEMPLATES.find((t) => t.id === id);
  return found || TEMPLATES[0];
}
