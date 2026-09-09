export type OverlayCategory = 'all' | 'flowers' | 'cute';

export interface OverlayItem {
  id: string;
  name: string;
  label: string;
  category: 'none' | 'flowers' | 'cute';
  url: string | null;
  icon: string;
  description: string;
  accentColor: string;
  isArEffect?: boolean;
  arAnchor?: 'forehead' | 'eyes' | 'cheeks';
  arAssetUrl?: string;
}

export const OVERLAY_ITEMS: OverlayItem[] = [
  {
    id: 'none',
    name: 'Tanpa Efek',
    label: 'Polos',
    category: 'none',
    url: null,
    icon: '🚫',
    description: 'Tanpa stiker atau bingkai overlay grafis.',
    accentColor: '#9ca3af',
  },
  // Bunga & Alam
  {
    id: 'cherry_blossom',
    name: 'Cherry Blossom',
    label: 'Bunga Sakura',
    category: 'flowers',
    url: '/overlays/cherry-blossom.svg',
    icon: '🌸',
    description: 'Ranting bunga sakura mekar dan kelopak pink lembut membingkai sudut foto.',
    accentColor: '#f472b6',
  },
  {
    id: 'falling_petals',
    name: 'Falling Petals',
    label: 'Kelopak Gugur',
    category: 'flowers',
    url: '/overlays/falling-petals.svg',
    icon: '🍃',
    description: 'Hembusan kelopak mawar berguguran dramatis di sekitar foto.',
    accentColor: '#f43f5e',
  },
  {
    id: 'aesthetic_leaves',
    name: 'Aesthetic Leaves',
    label: 'Dedaunan Estetik',
    category: 'flowers',
    url: '/overlays/aesthetic-leaves.svg',
    icon: '🌿',
    description: 'Bingkai dedaunan monstera & eucalyptus bernuansa botani hijau segar.',
    accentColor: '#10b981',
  },
  // Cute & Y2K Stickers / Overlays
  {
    id: 'glitter_sparkles',
    name: 'Glitter & Sparkles',
    label: 'Kilau Y2K',
    category: 'cute',
    url: '/overlays/glitter-sparkles.svg',
    icon: '✨',
    description: 'Bintang kilauan berkilau 4-titik & berlian holografik Y2K estetik.',
    accentColor: '#facc15',
  },
  {
    id: 'light_leak',
    name: 'Light Leak 35mm',
    label: 'Bocoran Cahaya',
    category: 'cute',
    url: '/overlays/light-leak.svg',
    icon: '🌈',
    description: 'Pantulan spektrum cahaya prisma hangat ala kamera film analog.',
    accentColor: '#f97316',
  },
  {
    id: 'aesthetic_doodles',
    name: 'Aesthetic Doodles',
    label: 'Coretan Y2K',
    category: 'cute',
    url: '/overlays/aesthetic-doodles.svg',
    icon: '✏️',
    description: 'Coretan doodle tangan estetik: hati bersayap, bintang, dan xoxo.',
    accentColor: '#c084fc',
  },
];

export const DEFAULT_OVERLAY = OVERLAY_ITEMS[0];
