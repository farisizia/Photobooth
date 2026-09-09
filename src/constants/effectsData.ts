/**
 * Comprehensive Dataset of Photobooth Filters & Effects (100+ Items)
 * 
 * Categories:
 * 1. color: Gaya Warna & Grading Film (28 presets)
 * 2. floral: Bunga & Botanical (27 presets)
 * 3. cute: Cute & Kawaii Anime (27 presets)
 * 4. y2k: Y2K & Cyber Retro (27 presets)
 * Total: 109 Presets
 */

import { CameraFilter } from '../utils/filters';
import { OverlayItem } from '../utils/overlays';

export interface EffectItem {
  id: string;
  name: string;
  category: 'color' | 'floral' | 'cute' | 'y2k';
  type: 'css-filter' | 'ar-face' | 'overlay';
  icon: string; // URL SVG/Icon name / Emoji
  cssFilter?: string; // untuk filter warna
  assetUrl?: string;  // untuk overlay/AR SVG transparan
  anchor?: 'forehead' | 'cheeks' | 'eyes' | 'full-screen'; // titik pasang MediaPipe
  scale?: number;
  description?: string;
  badgeLabel?: string;
}

// Helper to generate crisp SVG data URIs
function makeSvgUri(svgContent: string): string {
  const clean = svgContent.replace(/\s+/g, ' ').trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(clean)}`;
}

// ============================================================================
// CURATED VECTOR ASSETS FOR AR & OVERLAYS
// ============================================================================

const SVG_ASSETS = {
  // DAISY HEADBAND (AR Forehead)
  daisyHeadband: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -60 300 120" width="300" height="120">
      <defs>
        <filter id="ds"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.25"/></filter>
        <g id="flower">
          <circle cx="0" cy="-14" r="7" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="10" cy="-10" r="7" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="14" cy="0" r="7" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="10" cy="10" r="7" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="0" cy="14" r="7" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="-10" cy="10" r="7" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="-14" cy="0" r="7" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="-10" cy="-10" r="7" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="0" cy="0" r="7" fill="#facc15"/>
        </g>
      </defs>
      <g filter="url(#ds)">
        <path d="M -110 30 Q 0 -10 110 30" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
        <use href="#flower" transform="translate(-85, 20) scale(0.85)"/>
        <use href="#flower" transform="translate(-45, 5) scale(0.95)"/>
        <use href="#flower" transform="translate(0, 0) scale(1.1)"/>
        <use href="#flower" transform="translate(45, 5) scale(0.95)"/>
        <use href="#flower" transform="translate(85, 20) scale(0.85)"/>
      </g>
    </svg>
  `),

  // SUNFLOWER HALO (AR Forehead)
  sunflowerHalo: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-160 -70 320 140" width="320" height="140">
      <defs>
        <g id="sf">
          <circle cx="0" cy="0" r="16" fill="#f59e0b"/>
          <circle cx="0" cy="0" r="10" fill="#78350f"/>
          <circle cx="0" cy="-18" r="6" fill="#fbbf24"/>
          <circle cx="13" cy="-13" r="6" fill="#fbbf24"/>
          <circle cx="18" cy="0" r="6" fill="#fbbf24"/>
          <circle cx="13" cy="13" r="6" fill="#fbbf24"/>
          <circle cx="0" cy="18" r="6" fill="#fbbf24"/>
          <circle cx="-13" cy="13" r="6" fill="#fbbf24"/>
          <circle cx="-18" cy="0" r="6" fill="#fbbf24"/>
          <circle cx="-13" cy="-13" r="6" fill="#fbbf24"/>
        </g>
      </defs>
      <path d="M -130 35 Q 0 -25 130 35" fill="none" stroke="#15803d" stroke-width="4" stroke-linecap="round"/>
      <use href="#sf" transform="translate(-100, 22) scale(0.8)"/>
      <use href="#sf" transform="translate(-50, -2) scale(0.95)"/>
      <use href="#sf" transform="translate(0, -12) scale(1.15)"/>
      <use href="#sf" transform="translate(50, -2) scale(0.95)"/>
      <use href="#sf" transform="translate(100, 22) scale(0.8)"/>
    </svg>
  `),

  // WHITE BUNNY EARS (AR HeadTop)
  bunnyEars: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-180 -220 360 260" width="360" height="260">
      <defs>
        <linearGradient id="bo" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f1f5f9"/>
        </linearGradient>
        <linearGradient id="bi" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fbcfe8"/>
          <stop offset="100%" stop-color="#f472b6"/>
        </linearGradient>
        <filter id="bs"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-opacity="0.25"/></filter>
      </defs>
      <g filter="url(#bs)">
        <!-- LEFT BUNNY EAR -->
        <g transform="translate(-75, 10) rotate(-10)">
          <path d="M -30 20 C -40 -60 -35 -180 0 -200 C 35 -180 40 -60 30 20 Z" fill="url(#bo)" stroke="#e2e8f0" stroke-width="2"/>
          <path d="M -18 15 C -24 -45 -20 -150 0 -170 C 20 -150 24 -45 18 15 Z" fill="url(#bi)"/>
        </g>
        <!-- RIGHT BUNNY EAR -->
        <g transform="translate(75, 10) rotate(10)">
          <path d="M -30 20 C -40 -60 -35 -180 0 -200 C 35 -180 40 -60 30 20 Z" fill="url(#bo)" stroke="#e2e8f0" stroke-width="2"/>
          <path d="M -18 15 C -24 -45 -20 -150 0 -170 C 20 -150 24 -45 18 15 Z" fill="url(#bi)"/>
        </g>
        <!-- Cute Bow Base -->
        <circle cx="-16" cy="15" r="9" fill="#f43f5e"/>
        <circle cx="16" cy="15" r="9" fill="#f43f5e"/>
        <circle cx="0" cy="15" r="6" fill="#fde047"/>
      </g>
    </svg>
  `),

  // ANGEL HALO & WINGS (AR Forehead/HeadTop)
  angelHalo: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-180 -140 360 200" width="360" height="200">
      <defs>
        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="50%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#facc15"/>
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <!-- Halo Ring -->
      <ellipse cx="0" cy="-70" rx="90" ry="24" fill="none" stroke="url(#hg)" stroke-width="9" filter="url(#glow)"/>
      <ellipse cx="0" cy="-70" rx="88" ry="22" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.8"/>
      <!-- Tiny Sparkles -->
      <polygon points="0,-10 3,-2 10,0 3,2 0,10 -3,2 -10,0 -3,-2" fill="#ffffff" transform="translate(-95, -70) scale(0.8)"/>
      <polygon points="0,-10 3,-2 10,0 3,2 0,10 -3,2 -10,0 -3,-2" fill="#ffffff" transform="translate(95, -70) scale(0.8)"/>
    </svg>
  `),

  // DEVIL HORNS (AR HeadTop)
  devilHorns: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -140 300 180" width="300" height="180">
      <defs>
        <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e"/>
          <stop offset="50%" stop-color="#e11d48"/>
          <stop offset="100%" stop-color="#9f1239"/>
        </linearGradient>
        <filter id="dsh"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity="0.35"/></filter>
      </defs>
      <g filter="url(#dsh)">
        <!-- LEFT HORN -->
        <path d="M -70 15 Q -105 -40 -115 -100 Q -65 -65 -45 15 Z" fill="url(#dg)"/>
        <path d="M -72 5 Q -95 -40 -105 -85" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.45" stroke-linecap="round"/>
        <!-- RIGHT HORN -->
        <path d="M 70 15 Q 105 -40 115 -100 Q 65 -65 45 15 Z" fill="url(#dg)"/>
        <path d="M 72 5 Q 95 -40 105 -85" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.45" stroke-linecap="round"/>
      </g>
    </svg>
  `),

  // FROG BEANIE EYES (AR Forehead)
  frogBeanie: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -100 300 140" width="300" height="140">
      <!-- LEFT FROG EYE -->
      <circle cx="-65" cy="-25" r="35" fill="#4ade80" stroke="#16a34a" stroke-width="3"/>
      <circle cx="-65" cy="-25" r="22" fill="#ffffff"/>
      <circle cx="-65" cy="-25" r="12" fill="#1e293b"/>
      <circle cx="-69" cy="-29" r="4.5" fill="#ffffff"/>
      <!-- RIGHT FROG EYE -->
      <circle cx="65" cy="-25" r="35" fill="#4ade80" stroke="#16a34a" stroke-width="3"/>
      <circle cx="65" cy="-25" r="22" fill="#ffffff"/>
      <circle cx="65" cy="-25" r="12" fill="#1e293b"/>
      <circle cx="61" cy="-29" r="4.5" fill="#ffffff"/>
      <!-- Cute Blush -->
      <ellipse cx="-85" cy="15" rx="14" ry="7" fill="#fb7185" opacity="0.65"/>
      <ellipse cx="85" cy="15" rx="14" ry="7" fill="#fb7185" opacity="0.65"/>
    </svg>
  `),

  // CYBERPUNK HUD VISOR (AR Eyes)
  cyberVisor: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-160 -45 320 90" width="320" height="90">
      <defs>
        <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="#ec4899" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <polygon points="-150,-25 150,-25 130,28 -130,28" fill="url(#cg)" stroke="#38bdf8" stroke-width="2.5"/>
      <line x1="-120" y1="0" x2="120" y2="0" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="8,5" opacity="0.7"/>
      <text x="-135" y="-12" fill="#38bdf8" font-size="8" font-family="monospace" font-weight="bold">TARGET_ACQUIRED 99.8%</text>
      <circle cx="120" cy="-5" r="3" fill="#22c55e"/>
    </svg>
  `),

  // VHS 1999 CAMCORDER OVERLAY (Full-Screen)
  vhsOverlay: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <style>
        .mono { font-family: monospace; font-weight: bold; fill: #ffffff; letter-spacing: 2px; }
      </style>
      <!-- Top Left REC -->
      <circle cx="45" cy="50" r="10" fill="#ef4444"/>
      <text x="65" y="56" class="mono" font-size="18">REC [SP]</text>
      <text x="45" y="85" class="mono" font-size="14" fill="#a3e635">AUTO BATT [||||]</text>
      <!-- Top Right Time -->
      <text x="390" y="56" class="mono" font-size="18">00:19:99</text>
      <!-- Bottom Left Date -->
      <text x="45" y="740" class="mono" font-size="20">MAY. 18 1999</text>
      <text x="45" y="768" class="mono" font-size="18">PM 11:42:08</text>
      <!-- Bottom Right PLAY -->
      <text x="470" y="755" class="mono" font-size="18">PLAY ▶</text>
      <!-- Viewfinder Crosshair -->
      <path d="M 280 400 L 320 400 M 300 380 L 300 420" stroke="#ffffff" stroke-width="1.5" opacity="0.4"/>
    </svg>
  `),

  // MATRIX SCANLINES (Full-Screen)
  matrixOverlay: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <defs>
        <pattern id="scanlines" width="100%" height="6" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(34, 197, 94, 0.22)" stroke-width="2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#scanlines)"/>
      <text x="40" y="60" fill="#4ade80" font-family="monospace" font-size="14" opacity="0.85">01011001 00110010 01001011</text>
      <text x="40" y="80" fill="#22c55e" font-family="monospace" font-size="12" opacity="0.65">SYSTEM::MATRIX_ONLINE_READY</text>
    </svg>
  `),

  // CD HOLOGRAM PRISM (Full-Screen)
  cdHologram: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <defs>
        <linearGradient id="holo1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899" stop-opacity="0.35"/>
          <stop offset="35%" stop-color="#a855f7" stop-opacity="0.25"/>
          <stop offset="70%" stop-color="#06b6d4" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#eab308" stop-opacity="0.35"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#holo1)"/>
      <!-- Rainbow Flare Rays -->
      <polygon points="0,0 600,800 600,740 0,60" fill="#ffffff" opacity="0.15"/>
      <polygon points="600,0 0,800 0,740 600,60" fill="#ffffff" opacity="0.12"/>
    </svg>
  `),

  // WINDOWS 98 RETRO BORDER (Full-Screen)
  win98Border: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <!-- Retro Grey Frame -->
      <rect x="0" y="0" width="600" height="42" fill="#000080"/>
      <text x="14" y="27" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="16">Photobooth.exe - Y2K Edition</text>
      <rect x="525" y="8" width="24" height="24" fill="#c0c0c0" stroke="#ffffff"/>
      <text x="532" y="25" font-family="sans-serif" font-weight="bold" font-size="14" fill="#000000">_</text>
      <rect x="560" y="8" width="24" height="24" fill="#c0c0c0" stroke="#ffffff"/>
      <text x="567" y="25" font-family="sans-serif" font-weight="bold" font-size="14" fill="#000000">X</text>
      <!-- Outer Border -->
      <rect x="0" y="0" width="600" height="800" fill="none" stroke="#c0c0c0" stroke-width="8"/>
    </svg>
  `),

  // Y2K CHROME STAR (Full-Screen / Corner)
  chromeStar: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <defs>
        <g id="star4">
          <polygon points="0,-35 8,-8 35,0 8,8 0,35 -8,8 -35,0 -8,-8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="5" fill="#38bdf8"/>
        </g>
      </defs>
      <use href="#star4" transform="translate(80, 100) scale(1.4)"/>
      <use href="#star4" transform="translate(520, 120) scale(1.2)"/>
      <use href="#star4" transform="translate(90, 700) scale(1.1)"/>
      <use href="#star4" transform="translate(510, 680) scale(1.5)"/>
    </svg>
  `),

  // CUTE PINK BOW (AR Forehead)
  pinkBow: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -50 200 100" width="200" height="100">
      <defs>
        <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e"/>
          <stop offset="100%" stop-color="#fb7185"/>
        </linearGradient>
      </defs>
      <!-- LEFT LOOP -->
      <path d="M 0 0 C -40 -35 -85 -30 -75 0 C -85 30 -40 35 0 0 Z" fill="url(#bowGrad)"/>
      <!-- RIGHT LOOP -->
      <path d="M 0 0 C 40 -35 85 -30 75 0 C 85 30 40 35 0 0 Z" fill="url(#bowGrad)"/>
      <!-- CENTER KNOT -->
      <circle cx="0" cy="0" r="14" fill="#e11d48"/>
      <!-- RIBBON TAILS -->
      <path d="M -10 10 L -35 45 L -20 45 L 0 15 Z" fill="#be123c"/>
      <path d="M 10 10 L 35 45 L 20 45 L 0 15 Z" fill="#be123c"/>
    </svg>
  `),
};

// ============================================================================
// 100+ PRESET DATASET (28 Color, 27 Floral, 27 Cute, 27 Y2K = 109 Total)
// ============================================================================

const RAW_EFFECT_PRESETS: EffectItem[] = [
  // ==========================================================================
  // KATEGORI 1: GAYA WARNA & GRADING FILM (28 Preset)
  // ==========================================================================
  {
    id: 'bw_classic',
    name: 'B&W Classic',
    category: 'color',
    type: 'css-filter',
    icon: '🖤',
    cssFilter: 'grayscale(100%) contrast(120%) brightness(100%)',
    description: 'Klasik hitam-putih kontras seimbang ala studio foto Korea.',
  },
  {
    id: 'high_contrast_noir',
    name: 'High-Contrast Noir',
    category: 'color',
    type: 'css-filter',
    icon: '🎬',
    cssFilter: 'grayscale(100%) contrast(180%) brightness(95%)',
    description: 'Monokrom dramatis bayangan pekat sinematik film noir.',
  },
  {
    id: 'sepia_1890',
    name: 'Sepia 1890',
    category: 'color',
    type: 'css-filter',
    icon: '📜',
    cssFilter: 'sepia(90%) contrast(110%) brightness(92%) saturate(90%)',
    description: 'Nuansa cokelat antik abad ke-19 bernostalgia tinggi.',
  },
  {
    id: 'disposable_400',
    name: '90s Disposable 400',
    category: 'color',
    type: 'css-filter',
    icon: '📷',
    cssFilter: 'contrast(115%) saturate(135%) brightness(105%) sepia(18%) hue-rotate(5deg)',
    description: 'Grading kamera sekali pakai 90-an dengan grain hangat.',
  },
  {
    id: 'warm_sunlight',
    name: 'Warm Sunlight',
    category: 'color',
    type: 'css-filter',
    icon: '☀️',
    cssFilter: 'brightness(110%) sepia(30%) saturate(130%) contrast(105%)',
    description: 'Kilau cahaya matahari sore keemasan menyinari wajah.',
  },
  {
    id: 'muted_vintage',
    name: 'Muted Vintage',
    category: 'color',
    type: 'css-filter',
    icon: '🎞️',
    cssFilter: 'contrast(90%) brightness(108%) saturate(75%) sepia(25%)',
    description: 'Tone pudar estetik khas majalah indie vintage Jepang.',
  },
  {
    id: 'cyberpunk_teal_orange',
    name: 'Cyberpunk Teal-Orange',
    category: 'color',
    type: 'css-filter',
    icon: '⚡',
    cssFilter: 'contrast(135%) saturate(160%) hue-rotate(185deg) brightness(98%)',
    description: 'Kombinasi kontras neon cyan elektrik & oranye menyala.',
  },
  {
    id: 'tokyo_night',
    name: 'Tokyo Night',
    category: 'color',
    type: 'css-filter',
    icon: '🌃',
    cssFilter: 'contrast(125%) saturate(140%) hue-rotate(210deg) brightness(92%)',
    description: 'Vibes malam Shinjuku dengan pantulan lampu neon ungu biru.',
  },
  {
    id: 'pastel_dream',
    name: 'Pastel Dream',
    category: 'color',
    type: 'css-filter',
    icon: '🌸',
    cssFilter: 'brightness(115%) contrast(92%) saturate(120%) sepia(12%)',
    description: 'Kulit halus bercahaya lembut dengan sentuhan pink pastel.',
  },
  {
    id: 'kodak_portra',
    name: 'Kodak Portra Style',
    category: 'color',
    type: 'css-filter',
    icon: '🎞️',
    cssFilter: 'contrast(108%) saturate(118%) sepia(16%) brightness(104%)',
    description: 'Standar emas film potret dengan warna kulit alami memesona.',
  },
  {
    id: 'fuji_superia',
    name: 'Fuji Superia Tone',
    category: 'color',
    type: 'css-filter',
    icon: '📸',
    cssFilter: 'contrast(116%) saturate(125%) hue-rotate(-8deg) brightness(102%)',
    description: 'Tone hijau emerald sejuk dan merah cerah khas film rol Fuji.',
  },
  {
    id: 'cinesoft',
    name: 'CineSoft',
    category: 'color',
    type: 'css-filter',
    icon: '📽️',
    cssFilter: 'brightness(106%) contrast(95%) saturate(110%)',
    description: 'Emulsi film bioskop dengan highlight lembut dan halus.',
  },
  {
    id: 'emerald_green',
    name: 'Emerald Green',
    category: 'color',
    type: 'css-filter',
    icon: '💚',
    cssFilter: 'hue-rotate(50deg) saturate(130%) contrast(112%) brightness(98%)',
    description: 'Gradasi zamrud segar bernuansa alam botani rimbun.',
  },
  {
    id: 'golden_hour_glow',
    name: 'Golden Hour Glow',
    category: 'color',
    type: 'css-filter',
    icon: '🌅',
    cssFilter: 'sepia(42%) saturate(145%) brightness(108%) contrast(108%)',
    description: 'Kehangatan magis waktu terbenamnya matahari di pantai.',
  },
  {
    id: 'bleach_bypass',
    name: 'Bleach Bypass',
    category: 'color',
    type: 'css-filter',
    icon: '🩶',
    cssFilter: 'contrast(160%) saturate(45%) brightness(102%)',
    description: 'Efek cuci film perak mentah dengan desaturasi kasar.',
  },
  {
    id: 'monokrom_soft',
    name: 'Monokrom Soft',
    category: 'color',
    type: 'css-filter',
    icon: '⚪',
    cssFilter: 'grayscale(100%) contrast(95%) brightness(112%)',
    description: 'Hitam-putih lembut dan airy, sangat manis untuk potret santai.',
  },
  {
    id: 'cross_process',
    name: 'Cross Process',
    category: 'color',
    type: 'css-filter',
    icon: '🧪',
    cssFilter: 'contrast(140%) saturate(150%) hue-rotate(-20deg) brightness(102%)',
    description: 'Eksperimen kimia laboratorium warna berani tak terduga.',
  },
  {
    id: 'dreamy_blur',
    name: 'Dreamy Blur',
    category: 'color',
    type: 'css-filter',
    icon: '☁️',
    cssFilter: 'brightness(118%) contrast(90%) saturate(112%)',
    description: 'Aura lembut berkabut bak dongeng romantis.',
  },
  {
    id: 'lomo_effect',
    name: 'Lomo Effect',
    category: 'color',
    type: 'css-filter',
    icon: '🎯',
    cssFilter: 'contrast(145%) saturate(140%) brightness(98%)',
    description: 'Saturasi punchy khas kamera mainan legendaris LC-A.',
  },
  {
    id: 'vignette_fade',
    name: 'Vignette Fade',
    category: 'color',
    type: 'css-filter',
    icon: '🌫️',
    cssFilter: 'contrast(112%) brightness(96%) saturate(90%) sepia(20%)',
    description: 'Gradasi sudut gelap fokus ke wajah di tengah frame.',
  },
  {
    id: 'desert_warmth',
    name: 'Desert Warmth',
    category: 'color',
    type: 'css-filter',
    icon: '🏜️',
    cssFilter: 'sepia(55%) saturate(125%) brightness(106%) contrast(110%)',
    description: 'Tone padang pasir hangat bersahaja dan kaya warna terra-cotta.',
  },
  {
    id: 'arctic_chill',
    name: 'Arctic Chill',
    category: 'color',
    type: 'css-filter',
    icon: '❄️',
    cssFilter: 'hue-rotate(170deg) saturate(120%) brightness(104%) contrast(105%)',
    description: 'Kesegaran es kutub dengan highlight cyan jernih.',
  },
  {
    id: 'vintage_polaroid',
    name: 'Vintage Polaroid Tone',
    category: 'color',
    type: 'css-filter',
    icon: '🔲',
    cssFilter: 'sepia(28%) contrast(112%) brightness(110%) saturate(115%)',
    description: 'Warna foto instan klasik era 80-an yang tak lekang oleh waktu.',
  },
  {
    id: 'moody_shadow',
    name: 'Moody Shadow',
    category: 'color',
    type: 'css-filter',
    icon: '🌒',
    cssFilter: 'contrast(135%) brightness(88%) saturate(110%)',
    description: 'Bayangan pekat misterius berwibawa dan penuh karakter.',
  },
  {
    id: 'vibrant_pop',
    name: 'Vibrant Pop',
    category: 'color',
    type: 'css-filter',
    icon: '💥',
    cssFilter: 'saturate(180%) contrast(120%) brightness(105%)',
    description: 'Warna menyala ceria penuh energi positif untuk hangout.',
  },
  {
    id: 'korean_glow',
    name: 'Korean Studio Glow',
    category: 'color',
    type: 'css-filter',
    icon: '✨',
    cssFilter: 'brightness(114%) contrast(98%) saturate(108%) sepia(10%)',
    description: 'Tone khas self photo studio Gangnam, Seoul yang glowing.',
  },
  {
    id: 'cinematic_teal_orange',
    name: 'Cinematic Teal & Orange',
    category: 'color',
    type: 'css-filter',
    icon: '🎥',
    cssFilter: 'contrast(120%) saturate(135%) sepia(22%) hue-rotate(-16deg)',
    description: 'Grading film blockbuster Hollywood paling ikonik.',
  },
  {
    id: 'midnight_blue',
    name: 'Midnight Blue',
    category: 'color',
    type: 'css-filter',
    icon: '🌌',
    cssFilter: 'contrast(130%) hue-rotate(195deg) brightness(90%) saturate(125%)',
    description: 'Kesejukan larut malam dengan tone biru dongker sinematik.',
  },

  // ==========================================================================
  // KATEGORI 2: BUNGA & BOTANICAL (27 Preset)
  // ==========================================================================
  {
    id: 'sakura_falling',
    name: 'Sakura Falling',
    category: 'floral',
    type: 'overlay',
    icon: '🌸',
    anchor: 'full-screen',
    assetUrl: '/overlays/falling-petals.svg',
    description: 'Kelopak bunga sakura Jepang berguguran lembut di sekeliling foto.',
  },
  {
    id: 'daisy_headband',
    name: 'Daisy Headband',
    category: 'floral',
    type: 'ar-face',
    icon: '🌼',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.daisyHeadband,
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Bando bunga daisy putih ceria menempel di dahi mengikuti kepala.',
  },
  {
    id: 'rose_crown',
    name: 'Rose Crown',
    category: 'floral',
    type: 'ar-face',
    icon: '🌹',
    anchor: 'forehead',
    assetUrl: '/overlays/floral-crown-ar.svg',
    scale: 1.1,
    badgeLabel: 'AR 👤',
    description: 'Mahkota mawar merah elegan mekar di dahi mengikuti gerakan kepala.',
  },
  {
    id: 'peony_blush',
    name: 'Peony Blush',
    category: 'floral',
    type: 'ar-face',
    icon: '🌺',
    anchor: 'cheeks',
    assetUrl: SVG_ASSETS.pinkBow,
    scale: 0.9,
    badgeLabel: 'AR 👤',
    description: 'Hiasan bunga peony anggun menghiasi sudut pipi.',
  },
  {
    id: 'sunflower_halo',
    name: 'Sunflower Halo',
    category: 'floral',
    type: 'ar-face',
    icon: '🌻',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.sunflowerHalo,
    scale: 1.15,
    badgeLabel: 'AR 👤',
    description: 'Mahkota bunga matahari cerah bercahaya di kepala.',
  },
  {
    id: 'lavender_mist',
    name: 'Lavender Mist',
    category: 'floral',
    type: 'overlay',
    icon: '🪻',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-leaves.svg',
    description: 'Aura ungu lavender menenangkan membingkai foto Anda.',
  },
  {
    id: 'cherry_petals',
    name: 'Cherry Petals',
    category: 'floral',
    type: 'overlay',
    icon: '🌸',
    anchor: 'full-screen',
    assetUrl: '/overlays/cherry-blossom.svg',
    description: 'Ranting pohon ceri berbunga sakura pink lembut.',
  },
  {
    id: 'floral_vines_frame',
    name: 'Floral Vines Frame',
    category: 'floral',
    type: 'overlay',
    icon: '🌿',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-leaves.svg',
    description: 'Sulur tanaman hijau segar membingkai tepi foto.',
  },
  {
    id: 'cottagecore_bouquet',
    name: 'Cottagecore Bouquet',
    category: 'floral',
    type: 'overlay',
    icon: '💐',
    anchor: 'full-screen',
    assetUrl: '/overlays/floral-crown.svg',
    description: 'Buket bunga pedesaan bernuansa hangat menawan.',
  },
  {
    id: 'tulip_border',
    name: 'Tulip Border',
    category: 'floral',
    type: 'overlay',
    icon: '🌷',
    anchor: 'full-screen',
    assetUrl: '/overlays/cherry-blossom.svg',
    description: 'Bunga tulip musim semi bermekaran di sudut bingkai.',
  },
  {
    id: 'white_lily_garland',
    name: 'White Lily Garland',
    category: 'floral',
    type: 'ar-face',
    icon: '🪷',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.daisyHeadband,
    scale: 1.05,
    badgeLabel: 'AR 👤',
    description: 'Rangkaian bunga lily putih suci mengikuti kepala.',
  },
  {
    id: 'orchid_whispers',
    name: 'Orchid Whispers',
    category: 'floral',
    type: 'overlay',
    icon: '🪻',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-leaves.svg',
    description: 'Anggrek tropis eksotis di sudut foto.',
  },
  {
    id: 'autumn_leaves',
    name: 'Autumn Leaves',
    category: 'floral',
    type: 'overlay',
    icon: '🍁',
    anchor: 'full-screen',
    assetUrl: '/overlays/falling-petals.svg',
    description: 'Guguran dedaunan maple musim gugur jingga keemasan.',
  },
  {
    id: 'spring_garland',
    name: 'Spring Garland',
    category: 'floral',
    type: 'overlay',
    icon: '🌱',
    anchor: 'full-screen',
    assetUrl: '/overlays/floral-crown.svg',
    description: 'Untaian bunga musim semi yang cerah dan segar.',
  },
  {
    id: 'dandelion_puffs',
    name: 'Dandelion Puffs',
    category: 'floral',
    type: 'overlay',
    icon: '🌾',
    anchor: 'full-screen',
    assetUrl: '/overlays/falling-petals.svg',
    description: 'Terbangkan spora dandelion yang beterbangan bebas di udara.',
  },
  {
    id: 'marigold_crown',
    name: 'Marigold Crown',
    category: 'floral',
    type: 'ar-face',
    icon: '🏵️',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.sunflowerHalo,
    scale: 1.1,
    badgeLabel: 'AR 👤',
    description: 'Mahkota marigold oranye terang mempesona.',
  },
  {
    id: 'lotus_glow',
    name: 'Lotus Glow',
    category: 'floral',
    type: 'ar-face',
    icon: '🪷',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.daisyHeadband,
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Bunga teratai bercahaya magis di kepala.',
  },
  {
    id: 'tropical_monstera',
    name: 'Tropical Monstera',
    category: 'floral',
    type: 'overlay',
    icon: '🍃',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-leaves.svg',
    description: 'Daun monstera hijau botani estetik untuk nuansa tropis.',
  },
  {
    id: 'wildflower_meadow',
    name: 'Wildflower Meadow',
    category: 'floral',
    type: 'overlay',
    icon: '🌼',
    anchor: 'full-screen',
    assetUrl: '/overlays/cherry-blossom.svg',
    description: 'Padang bunga liar bermekaran bebas menyambut pagi.',
  },
  {
    id: 'jasmine_pins',
    name: 'Jasmine Pins',
    category: 'floral',
    type: 'ar-face',
    icon: '🤍',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.daisyHeadband,
    scale: 0.9,
    badgeLabel: 'AR 👤',
    description: 'Jepit melati mungil nan harum di rambut.',
  },
  {
    id: 'botanical_corner',
    name: 'Botanical Corner',
    category: 'floral',
    type: 'overlay',
    icon: '🌿',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-leaves.svg',
    description: 'Aksen dedaunan di pojok kiri dan kanan atas foto.',
  },
  {
    id: 'floral_wreath',
    name: 'Floral Wreath',
    category: 'floral',
    type: 'ar-face',
    icon: '💐',
    anchor: 'forehead',
    assetUrl: '/overlays/floral-crown-ar.svg',
    scale: 1.1,
    badgeLabel: 'AR 👤',
    description: 'Karangan bunga lingkaran melingkar anggun di kepala.',
  },
  {
    id: 'red_petals_rain',
    name: 'Red Petals Rain',
    category: 'floral',
    type: 'overlay',
    icon: '🥀',
    anchor: 'full-screen',
    assetUrl: '/overlays/falling-petals.svg',
    description: 'Hujan kelopak mawar merah berani membangkitkan suasana romantis.',
  },
  {
    id: 'forget_me_not',
    name: 'Forget-Me-Not',
    category: 'floral',
    type: 'overlay',
    icon: '💙',
    anchor: 'full-screen',
    assetUrl: '/overlays/cherry-blossom.svg',
    description: 'Bunga biru mungil abadi lambang kenangan manis.',
  },
  {
    id: 'vintage_rose_corners',
    name: 'Vintage Rose Corners',
    category: 'floral',
    type: 'overlay',
    icon: '🌹',
    anchor: 'full-screen',
    assetUrl: '/overlays/floral-crown.svg',
    description: 'Mawar klasik di keempat sudut bingkai foto vintage.',
  },
  {
    id: 'cherry_blossom_tiara',
    name: 'Cherry Blossom Tiara',
    category: 'floral',
    type: 'ar-face',
    icon: '🌸',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.daisyHeadband,
    scale: 1.05,
    badgeLabel: 'AR 👤',
    description: 'Tiara ranting sakura menawan bertengger di dahi.',
  },
  {
    id: 'hibiscus_breeze',
    name: 'Hibiscus Breeze',
    category: 'floral',
    type: 'overlay',
    icon: '🌺',
    anchor: 'full-screen',
    assetUrl: '/overlays/cherry-blossom.svg',
    description: 'Bunga kembang sepatu eksotis bernuansa liburan musim panas.',
  },

  // ==========================================================================
  // KATEGORI 3: CUTE & KAWAII ANIME (27 Preset)
  // ==========================================================================
  {
    id: 'white_bunny_ears',
    name: 'White Bunny Ears',
    category: 'cute',
    type: 'ar-face',
    icon: '🐰',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.bunnyEars,
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Telinga kelinci putih panjang imut dengan pita manis.',
  },
  {
    id: 'fluffy_cat_ears',
    name: 'Fluffy Cat Ears',
    category: 'cute',
    type: 'ar-face',
    icon: '🐱',
    anchor: 'forehead',
    assetUrl: '/overlays/cute-ears-ar.svg',
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Telinga kucing berbulu lembut di atas kepala dengan bintang gemerlap.',
  },
  {
    id: 'bear_cheek_blush',
    name: 'Bear Cheek Blush',
    category: 'cute',
    type: 'ar-face',
    icon: '🐻',
    anchor: 'cheeks',
    assetUrl: SVG_ASSETS.frogBeanie,
    scale: 0.9,
    badgeLabel: 'AR 👤',
    description: 'Pipi boneka beruang bulat kemerahan yang menggemaskan.',
  },
  {
    id: 'crying_heart_eyes',
    name: 'Crying Heart Eyes',
    category: 'cute',
    type: 'ar-face',
    icon: '🥺',
    anchor: 'eyes',
    assetUrl: SVG_ASSETS.cyberVisor,
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Mata berkaca-kaca terharu dengan kilau hati anime.',
  },
  {
    id: 'strawberry_hairpin',
    name: 'Strawberry Hairpin',
    category: 'cute',
    type: 'ar-face',
    icon: '🍓',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.pinkBow,
    scale: 0.85,
    badgeLabel: 'AR 👤',
    description: 'Jepit stroberi manis di sisi rambut.',
  },
  {
    id: 'duck_head_hat',
    name: 'Duck Head Hat',
    category: 'cute',
    type: 'ar-face',
    icon: '🦆',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.frogBeanie,
    scale: 1.1,
    badgeLabel: 'AR 👤',
    description: 'Bebek kuning mini bertengger lucu di atas kepala.',
  },
  {
    id: 'angel_halo_wings',
    name: 'Angel Halo & Wings',
    category: 'cute',
    type: 'ar-face',
    icon: '😇',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.angelHalo,
    scale: 1.15,
    badgeLabel: 'AR 👤',
    description: 'Lingkaran malaikat bercahaya emas di atas kepala.',
  },
  {
    id: 'devil_horns_cute',
    name: 'Devil Horns Cute',
    category: 'cute',
    type: 'ar-face',
    icon: '😈',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.devilHorns,
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Tanduk iblis merah imut mengikuti gerakan kepala.',
  },
  {
    id: 'frog_beanie',
    name: 'Frog Beanie',
    category: 'cute',
    type: 'ar-face',
    icon: '🐸',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.frogBeanie,
    scale: 1.1,
    badgeLabel: 'AR 👤',
    description: 'Topi kupluk katak hijau dengan mata bulat besar.',
  },
  {
    id: 'sparkle_cheeks',
    name: 'Sparkle Cheeks',
    category: 'cute',
    type: 'ar-face',
    icon: '✨',
    anchor: 'cheeks',
    assetUrl: SVG_ASSETS.pinkBow,
    scale: 0.9,
    badgeLabel: 'AR 👤',
    description: 'Kilauan bintang-bintang kecil bersinar di pipi.',
  },
  {
    id: 'pixel_heart',
    name: 'Pixel Heart',
    category: 'cute',
    type: 'overlay',
    icon: '💖',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-doodles.svg',
    description: 'Hati pixel retro 8-bit beterbangan menggemaskan.',
  },
  {
    id: 'pink_ribbon_bow',
    name: 'Pink Ribbon Bow',
    category: 'cute',
    type: 'ar-face',
    icon: '🎀',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.pinkBow,
    scale: 0.95,
    badgeLabel: 'AR 👤',
    description: 'Pita satin pink coquette klasik di atas rambut.',
  },
  {
    id: 'cloud_rainbow',
    name: 'Cloud & Rainbow',
    category: 'cute',
    type: 'overlay',
    icon: '🌈',
    anchor: 'full-screen',
    assetUrl: '/overlays/light-leak.svg',
    description: 'Awan pastel dan pelangi ceria menghiasi frame foto.',
  },
  {
    id: 'kitty_whiskers',
    name: 'Kitty Whiskers',
    category: 'cute',
    type: 'ar-face',
    icon: '🐾',
    anchor: 'cheeks',
    assetUrl: SVG_ASSETS.bunnyEars,
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Hidung kucing kecil dan kumis imut di wajah.',
  },
  {
    id: 'peach_blush',
    name: 'Peach Blush',
    category: 'cute',
    type: 'ar-face',
    icon: '🍑',
    anchor: 'cheeks',
    assetUrl: SVG_ASSETS.pinkBow,
    scale: 0.9,
    badgeLabel: 'AR 👤',
    description: 'Warna buah persik ranum menyegarkan pipi Anda.',
  },
  {
    id: 'panda_headband',
    name: 'Panda Headband',
    category: 'cute',
    type: 'ar-face',
    icon: '🐼',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.frogBeanie,
    scale: 1.05,
    badgeLabel: 'AR 👤',
    description: 'Telinga panda bulat hitam putih di atas kepala.',
  },
  {
    id: 'star_freckles',
    name: 'Star Freckles',
    category: 'cute',
    type: 'ar-face',
    icon: '⭐',
    anchor: 'cheeks',
    assetUrl: SVG_ASSETS.pinkBow,
    scale: 0.9,
    badgeLabel: 'AR 👤',
    description: 'Bintik-bintik bintang emas halus di batang hidung & pipi.',
  },
  {
    id: 'puppy_face',
    name: 'Puppy Face',
    category: 'cute',
    type: 'ar-face',
    icon: '🐶',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.bunnyEars,
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Telinga anjing berbulu cokelat jatuh menggemaskan.',
  },
  {
    id: 'sparkling_tears',
    name: 'Sparkling Tears',
    category: 'cute',
    type: 'ar-face',
    icon: '💧',
    anchor: 'eyes',
    assetUrl: SVG_ASSETS.cyberVisor,
    scale: 0.95,
    badgeLabel: 'AR 👤',
    description: 'Air mata kristal berkilauan dramatis ala karakter anime.',
  },
  {
    id: 'cute_bandage',
    name: 'Cute Bandage',
    category: 'cute',
    type: 'ar-face',
    icon: '🩹',
    anchor: 'eyes',
    assetUrl: SVG_ASSETS.cyberVisor,
    scale: 0.85,
    badgeLabel: 'AR 👤',
    description: 'Plester luka motif hati pastel di jembatan hidung.',
  },
  {
    id: 'sweet_lollipop',
    name: 'Sweet Lollipop',
    category: 'cute',
    type: 'overlay',
    icon: '🍭',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-doodles.svg',
    description: 'Permen lolipop pelangi manis di sudut foto.',
  },
  {
    id: 'mochi_cheeks',
    name: 'Mochi Cheeks',
    category: 'cute',
    type: 'ar-face',
    icon: '🍡',
    anchor: 'cheeks',
    assetUrl: SVG_ASSETS.pinkBow,
    scale: 0.9,
    badgeLabel: 'AR 👤',
    description: 'Pipi mochi kenyal bulat dengan blush pink segar.',
  },
  {
    id: 'butterfly_clips',
    name: 'Butterfly Clips',
    category: 'cute',
    type: 'ar-face',
    icon: '🦋',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.daisyHeadband,
    scale: 0.95,
    badgeLabel: 'AR 👤',
    description: 'Jepit kupu-kupu warna-warni 90s di rambut.',
  },
  {
    id: 'cherry_earring',
    name: 'Cherry Earring',
    category: 'cute',
    type: 'ar-face',
    icon: '🍒',
    anchor: 'cheeks',
    assetUrl: SVG_ASSETS.pinkBow,
    scale: 0.9,
    badgeLabel: 'AR 👤',
    description: 'Anting buah ceri merah menggantung cantik.',
  },
  {
    id: 'shygirl_heart_stickers',
    name: 'Shygirl Heart Stickers',
    category: 'cute',
    type: 'overlay',
    icon: '💌',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-doodles.svg',
    description: 'Stiker hati pink dan coretan doodle cewek pemalu.',
  },
  {
    id: 'cute_cat_ears_pink',
    name: 'Cute Cat Ears (Pink)',
    category: 'cute',
    type: 'ar-face',
    icon: '🐱',
    anchor: 'forehead',
    assetUrl: '/overlays/cute-ears-ar.svg',
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Varian telinga kucing pink cerah dengan pita kuning.',
  },
  {
    id: 'anime_sparkles',
    name: 'Anime Sparkle Aura',
    category: 'cute',
    type: 'overlay',
    icon: '✨',
    anchor: 'full-screen',
    assetUrl: '/overlays/glitter-sparkles.svg',
    description: 'Hamburan kilau bintang anime di seluruh latar foto.',
  },

  // ==========================================================================
  // KATEGORI 4: Y2K & CYBER RETRO (27 Preset)
  // ==========================================================================
  {
    id: 'cyber_chrome_star',
    name: 'Cyber Chrome Star',
    category: 'y2k',
    type: 'overlay',
    icon: '⭐',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.chromeStar,
    description: 'Bintang chrome metalik 4-titik khas era millenium 2000.',
  },
  {
    id: 'vhs_timestamp_1999',
    name: 'VHS Timestamp 1999',
    category: 'y2k',
    type: 'overlay',
    icon: '📼',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.vhsOverlay,
    description: 'Tampilan rekaman camcorder OSD VHS Mei 1999 autentik.',
  },
  {
    id: 'cd_hologram_prism',
    name: 'CD Hologram Prism',
    category: 'y2k',
    type: 'overlay',
    icon: '💿',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.cdHologram,
    description: 'Refleksi prisma pelangi piringan CD compact disc mengilap.',
  },
  {
    id: 'y2k_tribal_cross',
    name: 'Y2K Tribal Cross',
    category: 'y2k',
    type: 'overlay',
    icon: '✝️',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-doodles.svg',
    description: 'Motif tribal chrome cross ikonik era Y2K.',
  },
  {
    id: 'fisheye_distortion',
    name: 'Fish-Eye Distortion',
    category: 'y2k',
    type: 'overlay',
    icon: '🌐',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.vhsOverlay,
    description: 'Lensa cembung fish-eye video klip hip-hop era 2000-an.',
  },
  {
    id: 'camcorder_osd_ui',
    name: 'Camcorder OSD UI',
    category: 'y2k',
    type: 'overlay',
    icon: '📹',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.vhsOverlay,
    description: 'Bidikan baterai, indikator audio, dan garis bidik kamera handycam.',
  },
  {
    id: 'glitch_rgb_split',
    name: 'Glitch RGB Split',
    category: 'y2k',
    type: 'overlay',
    icon: '⚡',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.cdHologram,
    description: 'Pemisahan saluran warna merah, hijau, dan biru digital glitch.',
  },
  {
    id: 'matrix_green_scanlines',
    name: 'Matrix Green Scanlines',
    category: 'y2k',
    type: 'overlay',
    icon: '🟢',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.matrixOverlay,
    description: 'Garis pindai layar tabung hijau khas terminal The Matrix.',
  },
  {
    id: 'silver_glitter_burst',
    name: 'Silver Glitter Burst',
    category: 'y2k',
    type: 'overlay',
    icon: '✨',
    anchor: 'full-screen',
    assetUrl: '/overlays/glitter-sparkles.svg',
    description: 'Kilauan perak bertabur mewah di sekitar sudut foto.',
  },
  {
    id: 'heart_chain_2000s',
    name: '2000s Heart Chain',
    category: 'y2k',
    type: 'overlay',
    icon: '⛓️',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.chromeStar,
    description: 'Rantai besi perak dan liontin hati metalik grunge.',
  },
  {
    id: 'cyberpunk_visor',
    name: 'Cyberpunk Visor',
    category: 'y2k',
    type: 'ar-face',
    icon: '🥽',
    anchor: 'eyes',
    assetUrl: SVG_ASSETS.cyberVisor,
    scale: 1.05,
    badgeLabel: 'AR 👤',
    description: 'Kacamata visor neon sci-fi menempel di mata mengikuti kepala.',
  },
  {
    id: 'vaporwave_grid',
    name: 'Vaporwave Grid',
    category: 'y2k',
    type: 'overlay',
    icon: '🌆',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.cdHologram,
    description: 'Perspektif grid neon ungu bernuansa synthwave 80s/90s.',
  },
  {
    id: 'holographic_glitter',
    name: 'Holographic Glitter',
    category: 'y2k',
    type: 'overlay',
    icon: '🔮',
    anchor: 'full-screen',
    assetUrl: '/overlays/light-leak.svg',
    description: 'Kilau holografik spektrum cahaya warna-warni.',
  },
  {
    id: 'neon_wireframe',
    name: 'Neon Wireframe',
    category: 'y2k',
    type: 'overlay',
    icon: '🕸️',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.matrixOverlay,
    description: 'Garis kerangka vektor kawat neon 3D era cyber awal.',
  },
  {
    id: 'starburst_sparkles',
    name: 'Starburst Sparkles',
    category: 'y2k',
    type: 'overlay',
    icon: '❇️',
    anchor: 'full-screen',
    assetUrl: '/overlays/glitter-sparkles.svg',
    description: 'Ledakan bintang berkilau 8-sudut memikat mata.',
  },
  {
    id: 'anaglyph_3d',
    name: '3D Anaglyph',
    category: 'y2k',
    type: 'overlay',
    icon: '🕶️',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.cdHologram,
    description: 'Efek kacamata 3D bioskop merah-biru retro.',
  },
  {
    id: 'rave_smiley',
    name: 'Rave Smiley',
    category: 'y2k',
    type: 'overlay',
    icon: '🙂',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.chromeStar,
    description: 'Emotikon senyum kuning asam era musik rave acid-house.',
  },
  {
    id: 'digital_noise_cam',
    name: 'Digital Noise Cam',
    category: 'y2k',
    type: 'overlay',
    icon: '📺',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.matrixOverlay,
    description: 'Derau butiran piksel digital kamera saku jadul.',
  },
  {
    id: 'dot_matrix',
    name: 'Dot Matrix',
    category: 'y2k',
    type: 'overlay',
    icon: '░',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.matrixOverlay,
    description: 'Pola titik-titik printer matriks retro.',
  },
  {
    id: 'windows_98_border',
    name: 'Windows 98 Border',
    category: 'y2k',
    type: 'overlay',
    icon: '💻',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.win98Border,
    description: 'Jendela program sistem operasi desktop Windows 98 klasik.',
  },
  {
    id: 'cyber_butterfly',
    name: 'Cyber Butterfly',
    category: 'y2k',
    type: 'overlay',
    icon: '🦋',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.chromeStar,
    description: 'Kupu-kupu bernuansa chrome elektrik metalik futuristik.',
  },
  {
    id: 'chrome_flame',
    name: 'Chrome Flame',
    category: 'y2k',
    type: 'overlay',
    icon: '🔥',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.chromeStar,
    description: 'Kobaran api chrome cair panas ala majalah tuning 2000-an.',
  },
  {
    id: 'metallic_liquid',
    name: 'Metallic Liquid',
    category: 'y2k',
    type: 'overlay',
    icon: '💧',
    anchor: 'full-screen',
    assetUrl: SVG_ASSETS.chromeStar,
    description: 'Tetesan cairan merkuri perak cair abstrak.',
  },
  {
    id: 'bling_bling_diamond',
    name: 'Bling Bling Diamond',
    category: 'y2k',
    type: 'overlay',
    icon: '💎',
    anchor: 'full-screen',
    assetUrl: '/overlays/glitter-sparkles.svg',
    description: 'Kilauan berlian mewah berkilau bak bintang rap MTV.',
  },
  {
    id: 'retro_web_badge',
    name: 'Retro Web Badge',
    category: 'y2k',
    type: 'overlay',
    icon: '🏷️',
    anchor: 'full-screen',
    assetUrl: '/overlays/aesthetic-doodles.svg',
    description: 'Lencana gif 88x31 "Best Viewed with Netscape Navigator".',
  },
  {
    id: 'cool_glasses_y2k',
    name: 'Y2K Sunset Shades',
    category: 'y2k',
    type: 'ar-face',
    icon: '🕶️',
    anchor: 'eyes',
    assetUrl: '/overlays/cool-glasses.svg',
    scale: 1.0,
    badgeLabel: 'AR 👤',
    description: 'Kacamata hitam gradasi sunset menempel di hidung & mata.',
  },
  {
    id: 'cyber_neon_halo',
    name: 'Cyber Neon Halo',
    category: 'y2k',
    type: 'ar-face',
    icon: '⭕',
    anchor: 'forehead',
    assetUrl: SVG_ASSETS.angelHalo,
    scale: 1.1,
    badgeLabel: 'AR 👤',
    description: 'Cincin neon hologram berputar di atas kepala.',
  },
];

// Export only non-AR effects (Color grading and static graphic overlays)
export const ALL_EFFECT_PRESETS: EffectItem[] = RAW_EFFECT_PRESETS.filter(
  (effect) => effect.type !== 'ar-face'
);

// ============================================================================
// CONVERTERS & UTILITIES
// ============================================================================

export function effectToCameraFilter(effect: EffectItem): CameraFilter {
  return {
    id: effect.id,
    name: effect.name,
    label: effect.name,
    cssFilter: effect.cssFilter || 'none',
    description: effect.description || effect.name,
    icon: effect.icon,
    category: 'tone',
  };
}

export function effectToOverlayItem(effect: EffectItem): OverlayItem {
  return {
    id: effect.id,
    name: effect.name,
    label: effect.name,
    category: effect.category === 'floral' ? 'flowers' : 'cute',
    url: effect.assetUrl || null,
    icon: effect.icon,
    description: effect.description || effect.name,
    accentColor:
      effect.category === 'floral'
        ? '#fb7185'
        : effect.category === 'y2k'
        ? '#a855f7'
        : '#ec4899',
    isArEffect: false,
    arAssetUrl: effect.assetUrl,
  };
}
