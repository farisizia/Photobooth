/**
 * Comprehensive Dataset of Photobooth Templates (14 Curated Options)
 * Supporting 1, 2, 3, 4, and 6 photo slots with tailored physical layouts.
 */

export type TemplateCategory =
  | 'korean'
  | 'newspaper'
  | 'receipt'
  | 'music'
  | 'retro-film'
  | 'polaroid'
  | 'y2k'
  | 'passport'
  | 'floral'
  | 'cute'
  | 'cinema';

export type TemplateLayoutType =
  | 'korean-4cut'
  | 'korean-wide'
  | 'newspaper'
  | 'receipt'
  | 'music-player'
  | 'film-sprocket'
  | 'polaroid-single'
  | 'polaroid-dual'
  | 'y2k-chrome'
  | 'passport-grid'
  | 'floral-romance'
  | 'kawaii-sticker'
  | 'cinema-ticket';

export interface PhotoboothTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  slots: 1 | 2 | 3 | 4 | 6;
  layoutType: TemplateLayoutType;
  description: string;
  badge: string;
  aspectRatio: string; // for card display, e.g. '1/2', '3/4', '9/16'
  theme: {
    bg: string;
    text: string;
    accent: string;
    border?: string;
  };
}

export const TEMPLATE_CATEGORIES: { id: string; name: string; icon: string }[] = [
  { id: 'all', name: 'Semua', icon: '✨' },
  { id: 'korean', name: 'Korean Cut', icon: '🎞️' },
  { id: 'newspaper', name: 'Koran Jadul', icon: '📰' },
  { id: 'receipt', name: 'Struk Kasir', icon: '🧾' },
  { id: 'music', name: 'Music Player', icon: '🎵' },
  { id: 'retro-film', name: '35mm Film', icon: '📷' },
  { id: 'polaroid', name: 'Polaroid', icon: '📸' },
  { id: 'y2k', name: 'Y2K Cyber', icon: '💿' },
  { id: 'passport', name: 'Pasfoto ID', icon: '👤' },
  { id: 'floral', name: 'Floral Romance', icon: '🌹' },
  { id: 'cute', name: 'Cute Kawaii', icon: '🎀' },
  { id: 'cinema', name: 'Cinema Ticket', icon: '🎟️' },
];

export const TEMPLATES_DATA: PhotoboothTemplate[] = [
  // 1. KOREAN 4-CUT CLASSIC (4 Slots Vertical Strip)
  {
    id: 'korean-4cut-classic',
    name: 'Korean 4-Cut Classic (Soft Pink)',
    category: 'korean',
    slots: 4,
    layoutType: 'korean-4cut',
    aspectRatio: '1/2',
    description: 'Strip foto vertikal ramping khas street photobooth Korea dengan frame pastel lembut dan stempel Seoul di bawah.',
    badge: '4 Foto • Strip Vertikal',
    theme: {
      bg: '#FFF0F5',
      text: '#4A1D2F',
      accent: '#FB7185',
      border: '#FBCFE8',
    },
  },

  // 2. KOREAN 4-CUT CHECKERBOARD (4 Slots Y2K Street)
  {
    id: 'korean-4cut-checker',
    name: 'Korean 4-Cut (Checkerboard)',
    category: 'korean',
    slots: 4,
    layoutType: 'korean-4cut',
    aspectRatio: '1/2',
    description: 'Strip 4 foto vertikal dengan motif papan catur hitam-putih monokrom yang sangat viral di Hongdae & Gangnam.',
    badge: '4 Foto • Y2K Checker',
    theme: {
      bg: '#FFFFFF',
      text: '#09090B',
      accent: '#E11D48',
      border: '#18181B',
    },
  },

  // 3. KOREAN WIDE 2-CUT (2 Slots Landscape Stacked)
  {
    id: 'korean-wide-2cut',
    name: 'Korean Wide 2-Cut (Warm Cream)',
    category: 'korean',
    slots: 2,
    layoutType: 'korean-wide',
    aspectRatio: '3/4',
    description: 'Format 2 foto landscape bertingkat yang estetik dengan frame warna gading hangat, stiker love, dan margin lega.',
    badge: '2 Foto • Wide Landscape',
    theme: {
      bg: '#FAF8F5',
      text: '#292524',
      accent: '#E11D48',
      border: '#E7E5E4',
    },
  },

  // 4. THE VINTAGE CHRONICLE / KORAN JADUL (2 Slots Newspaper)
  {
    id: 'vintage-chronicle',
    name: 'The Vintage Chronicle (Koran Jadul)',
    category: 'newspaper',
    slots: 2,
    layoutType: 'newspaper',
    aspectRatio: '3/4',
    description: 'Layout koran berita cetak klasik monokrom dengan masthead THE VINTAGE GAZETTE, headline breaking news, & artikel B&W.',
    badge: '2 Foto • Filter B&W Otomatis',
    theme: {
      bg: '#F5EFEB',
      text: '#1C1917',
      accent: '#292524',
      border: '#1C1917',
    },
  },

  // 5. CAFE & MART THERMAL RECEIPT (3 Slots Receipt)
  {
    id: 'thermal-receipt',
    name: 'Cafe & Mart Thermal Receipt',
    category: 'receipt',
    slots: 3,
    layoutType: 'receipt',
    aspectRatio: '9/16',
    description: 'Kertas struk kasir vintage dengan tepi robekan gerigi zigzag atas-bawah, nota belanja lucu, timestamp, & barcode.',
    badge: '3 Foto • Struk Kasir Estetik',
    theme: {
      bg: '#FAF9F6',
      text: '#18181B',
      accent: '#52525B',
      border: '#E4E4E7',
    },
  },

  // 6. MUSIC PLAYER / SPOTIFY VIBE (4 Slots Album Art & Controls)
  {
    id: 'music-player',
    name: 'Music Player (Spotify / The 1975)',
    category: 'music',
    slots: 4,
    layoutType: 'music-player',
    aspectRatio: '9/16',
    description: 'UI pemutar musik Spotify vertikal dengan 4 foto strip, judul lagu "About You", scrubber seekbar hijau, & audio controls.',
    badge: '4 Foto • Viral Spotify Vibe',
    theme: {
      bg: '#121212',
      text: '#FFFFFF',
      accent: '#1DB954',
      border: '#282828',
    },
  },

  // 7. 35MM ANALOG FILM ROLL (3 Slots Film Negatives)
  {
    id: 'analog-film-35mm',
    name: 'Retro 35mm Analog Film Roll',
    category: 'retro-film',
    slots: 3,
    layoutType: 'film-sprocket',
    aspectRatio: '9/16',
    description: 'Bingkai klise rol film analog hitam dengan lubang sproket perforasi di kedua sisi, label ISO 400, dan nomor frame 01-03.',
    badge: '3 Foto • Analog Sprocket',
    theme: {
      bg: '#141416',
      text: '#F59E0B',
      accent: '#EF4444',
      border: '#27272A',
    },
  },

  // 8. CLASSIC POLAROID 600 (1 Slot Classic Instant Photo)
  {
    id: 'classic-polaroid',
    name: 'Classic Polaroid 600 (Single Shot)',
    category: 'polaroid',
    slots: 1,
    layoutType: 'polaroid-single',
    aspectRatio: '4/5',
    description: 'Frame polaroid putih klasik dengan margin bawah tebal khas kamera instan dan catatan tanggal tulisan tangan handwriting.',
    badge: '1 Foto • Classic Polaroid',
    theme: {
      bg: '#FFFFFF',
      text: '#1F2937',
      accent: '#4B5563',
      border: '#E5E7EB',
    },
  },

  // 9. DUAL POLAROID STACK (2 Slots Stacked Instant Photos)
  {
    id: 'dual-polaroid',
    name: 'Dual Polaroid Stack (Washi Tape)',
    category: 'polaroid',
    slots: 2,
    layoutType: 'polaroid-dual',
    aspectRatio: '3/4',
    description: 'Dua foto polaroid bertingkat dengan aksen selotip washi tape vintage dan catatan momen manis di bawahnya.',
    badge: '2 Foto • Dual Polaroid',
    theme: {
      bg: '#FDFBF7',
      text: '#292524',
      accent: '#D97706',
      border: '#E7E5E4',
    },
  },

  // 10. Y2K CYBER SILVER / CD PRISM (4 Slots Metallic Chrome)
  {
    id: 'y2k-cyber-silver',
    name: 'Y2K Cyber Silver (CD Prism Chrome)',
    category: 'y2k',
    slots: 4,
    layoutType: 'y2k-chrome',
    aspectRatio: '1/2',
    description: 'Frame silver chrome metalik futuristik bertabur bintang 4-point sparkle Y2K dengan nuansa hologram era 2000-an.',
    badge: '4 Foto • 2000s Chrome',
    theme: {
      bg: '#E2E8F0',
      text: '#0F172A',
      accent: '#6366F1',
      border: '#CBD5E1',
    },
  },

  // 11. PASSPORT / PHOTOCARD BOOTH (6 Slots 2x3 Grid ID Photo)
  {
    id: 'passport-id-photo',
    name: 'Passport & Photocard Booth (2x3 Grid)',
    category: 'passport',
    slots: 6,
    layoutType: 'passport-grid',
    aspectRatio: '3/4',
    description: 'Grid 6 foto mini formal-playful ala pasfoto idola K-Pop dengan garis border presisi & stempel verifikasi digital.',
    badge: '6 Foto • Grid 2x3 Pasfoto',
    theme: {
      bg: '#F8FAFC',
      text: '#0F172A',
      accent: '#3B82F6',
      border: '#E2E8F0',
    },
  },

  // 12. ROMANTIC FLORAL ROMANCE (4 Slots Botanical Vines)
  {
    id: 'floral-romance',
    name: 'Romantic Floral Romance (Rose Vines)',
    category: 'floral',
    slots: 4,
    layoutType: 'floral-romance',
    aspectRatio: '1/2',
    description: 'Frame bernuansa dedaunan botanis & mawar elegan dengan warna krem hangat, ideal untuk momen romantis bersama pasangan.',
    badge: '4 Foto • Botanical Vines',
    theme: {
      bg: '#FFFBEB',
      text: '#78350F',
      accent: '#BE185D',
      border: '#FDE68A',
    },
  },

  // 13. CUTE KAWAII STICKER BOMB (3 Slots Cutout Stickers)
  {
    id: 'kawaii-sticker-bomb',
    name: 'Cute Kawaii Sticker Bomb',
    category: 'cute',
    slots: 3,
    layoutType: 'kawaii-sticker',
    aspectRatio: '9/16',
    description: 'Frame pastel ceria bertabur stiker lucu (pita kelinci, bintang, heart, blush) untuk foto seru bersama bestie.',
    badge: '3 Foto • Sticker Bomb',
    theme: {
      bg: '#FEF3C7',
      text: '#9D174D',
      accent: '#EC4899',
      border: '#FBCFE8',
    },
  },

  // 14. CINEMA FILM STRIP / MOVIE TICKET (2 Slots Retro Ticket)
  {
    id: 'cinema-ticket',
    name: 'Cinema Film Strip (Retro Movie Ticket)',
    category: 'cinema',
    slots: 2,
    layoutType: 'cinema-ticket',
    aspectRatio: '3/4',
    description: 'Desain tiket bioskop retro dengan admit-one stub, nomor barcode, nomor kursi teater, dan detail robekan perforasi tiket.',
    badge: '2 Foto • Retro Movie Ticket',
    theme: {
      bg: '#FEF2F2',
      text: '#7F1D1D',
      accent: '#DC2626',
      border: '#FECACA',
    },
  },
];

export function getTemplateById(id: string): PhotoboothTemplate {
  const found = TEMPLATES_DATA.find((t) => t.id === id);
  if (found) return found;

  // Backward-compatibility aliases for earlier ids
  if (id === 'korean-4cut-pastel' || id === 'korean-4cut') {
    return TEMPLATES_DATA.find((t) => t.id === 'korean-4cut-classic') || TEMPLATES_DATA[0];
  }
  if (id === 'vintage-newspaper') {
    return TEMPLATES_DATA.find((t) => t.id === 'vintage-chronicle') || TEMPLATES_DATA[0];
  }
  if (id === 'cafe-receipt') {
    return TEMPLATES_DATA.find((t) => t.id === 'thermal-receipt') || TEMPLATES_DATA[0];
  }
  if (id === 'retro-film-35mm') {
    return TEMPLATES_DATA.find((t) => t.id === 'analog-film-35mm') || TEMPLATES_DATA[0];
  }
  if (id === 'black-and-white') {
    return TEMPLATES_DATA.find((t) => t.id === 'classic-polaroid') || TEMPLATES_DATA[0];
  }
  if (id === 'cute-pink') {
    return TEMPLATES_DATA.find((t) => t.id === 'kawaii-sticker-bomb') || TEMPLATES_DATA[0];
  }
  if (id === 'receipt') {
    return TEMPLATES_DATA.find((t) => t.id === 'thermal-receipt') || TEMPLATES_DATA[0];
  }
  if (id === 'retro-film') {
    return TEMPLATES_DATA.find((t) => t.id === 'analog-film-35mm') || TEMPLATES_DATA[0];
  }

  return TEMPLATES_DATA[0];
}
