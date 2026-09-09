export interface CameraFilter {
  id: string;
  name: string;
  label: string;
  cssFilter: string;
  description: string;
  icon?: string;
  category?: 'tone' | 'creative';
  previewBadgeBg?: string;
}

export const CAMERA_FILTERS: CameraFilter[] = [
  {
    id: 'normal',
    name: 'Normal',
    label: 'Tanpa Filter',
    cssFilter: 'none',
    description: 'Warna alami kamera tanpa efek tambahan.',
    icon: '✨',
    category: 'tone',
    previewBadgeBg: 'from-gray-600 to-gray-800',
  },
  {
    id: 'bw',
    name: 'B&W Monokrom',
    label: 'Classic Monochrome',
    cssFilter: 'grayscale(100%) contrast(120%) brightness(102%)',
    description: 'Klasik hitam-putih kontras tajam ala studio monokrom Korea.',
    icon: '🖤',
    category: 'tone',
    previewBadgeBg: 'from-zinc-900 to-zinc-600',
  },
  {
    id: 'vintage',
    name: 'Film Roll Vintage',
    label: 'Analog 35mm',
    cssFilter: 'sepia(45%) contrast(110%) brightness(98%) saturate(115%) hue-rotate(-10deg)',
    description: 'Tone hangat bernuansa rol film analog 35mm nostalgia.',
    icon: '📜',
    category: 'tone',
    previewBadgeBg: 'from-amber-800 to-amber-600',
  },
  {
    id: 'vhs_90s',
    name: '90s Camcorder',
    label: 'Retro VHS',
    cssFilter: 'contrast(125%) saturate(145%) brightness(104%) sepia(20%) hue-rotate(10deg)',
    description: 'Estetika video camcorder era 90-an dengan saturasi berani.',
    icon: '📼',
    category: 'tone',
    previewBadgeBg: 'from-fuchsia-800 to-purple-600',
  },
  {
    id: 'pastel',
    name: 'Soft Warm Pastel',
    label: 'Korean Pastel Glow',
    cssFilter: 'brightness(112%) contrast(96%) saturate(115%) sepia(15%)',
    description: 'Warna pastel lembut dan hangat, membuat kulit halus glowing.',
    icon: '🌸',
    category: 'tone',
    previewBadgeBg: 'from-pink-500 to-rose-400',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    label: 'Neon Night',
    cssFilter: 'contrast(135%) saturate(160%) hue-rotate(185deg) brightness(98%)',
    description: 'Vibes malam neon futuristik dengan warna elektrik menyala.',
    icon: '⚡',
    category: 'tone',
    previewBadgeBg: 'from-cyan-600 to-blue-700',
  },
  {
    id: 'teal_orange',
    name: 'Teal & Orange',
    label: 'Cinematic Grade',
    cssFilter: 'contrast(118%) saturate(130%) sepia(25%) hue-rotate(-18deg) brightness(102%)',
    description: 'Color grading sinematik blockbuster Hollywood terpopuler.',
    icon: '🎬',
    category: 'tone',
    previewBadgeBg: 'from-teal-600 to-orange-600',
  },
  {
    id: 'dreamy_glow',
    name: 'Dreamy Soft Glow',
    label: 'Ethereal Bloom',
    cssFilter: 'brightness(116%) contrast(92%) saturate(108%)',
    description: 'Efek soft focus lembut dan dreamy mempesona.',
    icon: '☁️',
    category: 'tone',
    previewBadgeBg: 'from-violet-400 to-pink-300',
  },
];

export const DEFAULT_FILTER = CAMERA_FILTERS[0];
