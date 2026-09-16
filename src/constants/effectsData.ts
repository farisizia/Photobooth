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
  category: 'beauty' | 'color' | 'floral' | 'cute' | 'y2k';
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

  // BEAUTY: HEART BLUSH & SPARKLES (AR Cheeks)
  beautyHeartBlush: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <radialGradient id="rb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fb7185" stop-opacity="0.65"/>
          <stop offset="60%" stop-color="#f43f5e" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Left Cheek Blush -->
      <ellipse cx="-85" cy="0" rx="34" ry="20" fill="url(#rb1)"/>
      <path d="M -85 -4 C -87 -8 -93 -6 -93 -2 C -93 3 -85 7 -85 7 C -85 7 -77 3 -77 -2 C -77 -6 -83 -8 -85 -4 Z" fill="#ffffff" opacity="0.95"/>
      <circle cx="-72" cy="-8" r="2.5" fill="#ffffff" opacity="0.9"/>
      <circle cx="-98" cy="6" r="2" fill="#ffffff" opacity="0.8"/>
      <!-- Right Cheek Blush -->
      <ellipse cx="85" cy="0" rx="34" ry="20" fill="url(#rb1)"/>
      <path d="M 85 -4 C 83 -8 77 -6 77 -2 C 77 3 85 7 85 7 C 85 7 93 3 93 -2 C 93 -6 87 -8 85 -4 Z" fill="#ffffff" opacity="0.95"/>
      <circle cx="98" cy="-8" r="2.5" fill="#ffffff" opacity="0.9"/>
      <circle cx="72" cy="6" r="2" fill="#ffffff" opacity="0.8"/>
    </svg>
  `),

  // BEAUTY: DOUYIN GLITTER TEARS (AR Eyes)
  beautyDouyinTears: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -40 300 80" width="300" height="80">
      <defs>
        <g id="spk">
          <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#ffffff"/>
          <circle cx="0" cy="0" r="1.5" fill="#c084fc"/>
        </g>
      </defs>
      <!-- Left Under-eye gems -->
      <circle cx="-75" cy="12" r="3.5" fill="#ffffff" stroke="#c084fc" stroke-width="1.5"/>
      <use href="#spk" transform="translate(-60, 18) scale(1)"/>
      <circle cx="-90" cy="16" r="2.2" fill="#ffffff"/>
      <circle cx="-48" cy="10" r="2" fill="#ffffff"/>
      <!-- Right Under-eye gems -->
      <circle cx="75" cy="12" r="3.5" fill="#ffffff" stroke="#c084fc" stroke-width="1.5"/>
      <use href="#spk" transform="translate(60, 18) scale(1)"/>
      <circle cx="90" cy="16" r="2.2" fill="#ffffff"/>
      <circle cx="48" cy="10" r="2" fill="#ffffff"/>
    </svg>
  `),

  // BEAUTY: COQUETTE CHEEK BOWS (AR Cheeks)
  beautyCoquetteBows: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <g id="miniBow">
          <path d="M 0 0 C -12 -12 -28 -10 -24 0 C -28 10 -12 12 0 0 Z" fill="#fb7185"/>
          <path d="M 0 0 C 12 -12 28 -10 24 0 C 28 10 12 12 0 0 Z" fill="#fb7185"/>
          <circle cx="0" cy="0" r="4.5" fill="#e11d48"/>
          <path d="M -3 3 L -10 16 L -5 16 L 0 5 Z" fill="#be123c"/>
          <path d="M 3 3 L 10 16 L 5 16 L 0 5 Z" fill="#be123c"/>
        </g>
      </defs>
      <use href="#miniBow" transform="translate(-85, 0) scale(0.95)"/>
      <use href="#miniBow" transform="translate(85, 0) scale(0.95)"/>
    </svg>
  `),

  // BEAUTY: ANGEL HALO & GLOW (AR Forehead)
  beautyAngelHalo: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -100 300 120" width="300" height="120">
      <defs>
        <filter id="haloGlow"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#facc15" flood-opacity="0.8"/></filter>
      </defs>
      <ellipse cx="0" cy="-35" rx="72" ry="18" fill="none" stroke="#fef08a" stroke-width="5" filter="url(#haloGlow)"/>
      <ellipse cx="0" cy="-35" rx="71" ry="17" fill="none" stroke="#ffffff" stroke-width="2.5"/>
      <polygon points="0,-48 3,-42 9,-40 3,-38 0,-32 -3,-38 -9,-40 -3,-42" fill="#ffffff"/>
      <polygon points="-55,-35 -53,-30 -47,-29 -53,-28 -55,-23 -57,-28 -63,-29 -57,-30" fill="#ffffff"/>
      <polygon points="55,-35 53,-30 47,-29 53,-28 55,-23 57,-28 63,-29 57,-30" fill="#ffffff"/>
    </svg>
  `),

  // BEAUTY: FAIRY BUTTERFLY CHEEKS (AR Cheeks)
  beautyButterfly: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <g id="bf">
          <path d="M 0 0 C -12 -20 -28 -16 -20 -2 C -26 4 -14 16 0 0 Z" fill="#c084fc" opacity="0.85"/>
          <path d="M 0 0 C 12 -20 28 -16 20 -2 C 26 4 14 16 0 0 Z" fill="#f472b6" opacity="0.85"/>
          <circle cx="0" cy="0" r="2.5" fill="#ffffff"/>
        </g>
      </defs>
      <use href="#bf" transform="translate(-85, -2) scale(1.1) rotate(-12)"/>
      <use href="#bf" transform="translate(85, -2) scale(1.1) rotate(12)"/>
    </svg>
  `),

  // BEAUTY: SUNKISSED FAUX FRECKLES (AR Cheeks)
  beautyFreckles: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <radialGradient id="sunFlush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.35"/>
          <stop offset="70%" stop-color="#fb7185" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#fb7185" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="0" cy="0" rx="105" ry="18" fill="url(#sunFlush)"/>
      <circle cx="-75" cy="-2" r="1.5" fill="#78350f" opacity="0.6"/>
      <circle cx="-62" cy="4" r="1.8" fill="#9a3412" opacity="0.5"/>
      <circle cx="-50" cy="-3" r="1.3" fill="#78350f" opacity="0.65"/>
      <circle cx="-35" cy="2" r="1.6" fill="#9a3412" opacity="0.55"/>
      <circle cx="-20" cy="-4" r="1.2" fill="#78350f" opacity="0.6"/>
      <circle cx="-8" cy="1" r="1.6" fill="#9a3412" opacity="0.5"/>
      <circle cx="5" cy="-2" r="1.4" fill="#78350f" opacity="0.6"/>
      <circle cx="18" cy="3" r="1.7" fill="#9a3412" opacity="0.55"/>
      <circle cx="32" cy="-4" r="1.3" fill="#78350f" opacity="0.6"/>
      <circle cx="48" cy="2" r="1.8" fill="#9a3412" opacity="0.5"/>
      <circle cx="65" cy="-2" r="1.5" fill="#78350f" opacity="0.65"/>
      <circle cx="78" cy="4" r="1.6" fill="#9a3412" opacity="0.55"/>
    </svg>
  `),

  // BEAUTY: DOUYIN PEARL GEMS & TEARS (AR Eyes)
  beautyPearlGems: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -40 300 80" width="300" height="80">
      <defs>
        <radialGradient id="pg" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="45%" stop-color="#f8fafc"/>
          <stop offset="80%" stop-color="#e2e8f0"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </radialGradient>
        <filter id="pglow"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#ffffff" flood-opacity="0.8"/></filter>
        <g id="spk4">
          <polygon points="0,-6 1.5,-1.5 6,0 1.5,1.5 0,6 -1.5,1.5 -6,0 -1.5,-1.5" fill="#ffffff"/>
        </g>
      </defs>
      <g filter="url(#pglow)">
        <!-- Left Eye Pearls -->
        <circle cx="-75" cy="10" r="4" fill="url(#pg)"/>
        <circle cx="-62" cy="14" r="3" fill="url(#pg)"/>
        <circle cx="-88" cy="13" r="2.8" fill="url(#pg)"/>
        <circle cx="-50" cy="8" r="2.2" fill="url(#pg)"/>
        <use href="#spk4" transform="translate(-75, 20) scale(1)"/>
        <use href="#spk4" transform="translate(-95, 8) scale(0.7)"/>
        <!-- Right Eye Pearls -->
        <circle cx="75" cy="10" r="4" fill="url(#pg)"/>
        <circle cx="62" cy="14" r="3" fill="url(#pg)"/>
        <circle cx="88" cy="13" r="2.8" fill="url(#pg)"/>
        <circle cx="50" cy="8" r="2.2" fill="url(#pg)"/>
        <use href="#spk4" transform="translate(75, 20) scale(1)"/>
        <use href="#spk4" transform="translate(95, 8) scale(0.7)"/>
      </g>
    </svg>
  `),

  // BEAUTY: KAWAII KITTY WHISKER BLUSH (AR Cheeks)
  beautyKittyWhiskers: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <radialGradient id="kpblush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fb7185" stop-opacity="0.55"/>
          <stop offset="60%" stop-color="#f43f5e" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="-85" cy="5" rx="35" ry="20" fill="url(#kpblush)"/>
      <ellipse cx="85" cy="5" rx="35" ry="20" fill="url(#kpblush)"/>
      <path d="M 0 -8 C -4 -13 -10 -11 -10 -6 C -10 -1 0 4 0 4 C 0 4 10 -1 10 -6 C 10 -11 4 -13 0 -8 Z" fill="#f43f5e"/>
      <ellipse cx="-3" cy="-7" rx="2" ry="1.2" fill="#ffffff" opacity="0.8"/>
      <path d="M -22 -4 Q -55 -10 -90 -8" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
      <path d="M -22 2 Q -55 2 -88 6" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
      <path d="M -20 8 Q -52 14 -82 20" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
      <path d="M 22 -4 Q 55 -10 90 -8" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
      <path d="M 22 2 Q 55 2 88 6" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
      <path d="M 20 8 Q 52 14 82 20" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    </svg>
  `),

  // BEAUTY: Y2K STAR & SPARKLE FRECKLES (AR Cheeks)
  beautyStarFreckles: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <radialGradient id="sfblush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fb7185" stop-opacity="0.45"/>
          <stop offset="60%" stop-color="#f43f5e" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
        </radialGradient>
        <g id="gstar">
          <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" fill="#facc15"/>
          <circle cx="0" cy="0" r="1.5" fill="#ffffff"/>
        </g>
        <g id="sstar">
          <polygon points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5" fill="#ffffff"/>
        </g>
      </defs>
      <ellipse cx="0" cy="0" rx="110" ry="18" fill="url(#sfblush)"/>
      <use href="#gstar" transform="translate(-85, -2) scale(1.1)"/>
      <use href="#sstar" transform="translate(-70, 8) scale(1)"/>
      <use href="#gstar" transform="translate(-50, -4) scale(0.9)"/>
      <use href="#sstar" transform="translate(-32, 4) scale(0.8)"/>
      <use href="#gstar" transform="translate(-15, -6) scale(0.7)"/>
      <use href="#sstar" transform="translate(0, 0) scale(1)"/>
      <use href="#gstar" transform="translate(15, -6) scale(0.7)"/>
      <use href="#sstar" transform="translate(32, 4) scale(0.8)"/>
      <use href="#gstar" transform="translate(50, -4) scale(0.9)"/>
      <use href="#sstar" transform="translate(70, 8) scale(1)"/>
      <use href="#gstar" transform="translate(85, -2) scale(1.1)"/>
      <circle cx="-95" cy="6" r="1.5" fill="#facc15"/>
      <circle cx="-60" cy="-6" r="1.8" fill="#ffffff"/>
      <circle cx="-25" cy="5" r="1.4" fill="#fde047"/>
      <circle cx="25" cy="5" r="1.4" fill="#fde047"/>
      <circle cx="60" cy="-6" r="1.8" fill="#ffffff"/>
      <circle cx="95" cy="6" r="1.5" fill="#facc15"/>
    </svg>
  `),

  // BEAUTY: SAKURA BLOSSOM CHEEKS (AR Cheeks)
  beautySakuraCheeks: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <g id="skflower">
          <circle cx="0" cy="-10" r="6" fill="#fbcfe8"/>
          <circle cx="9" cy="-3" r="6" fill="#fbcfe8"/>
          <circle cx="6" cy="8" r="6" fill="#fbcfe8"/>
          <circle cx="-6" cy="8" r="6" fill="#fbcfe8"/>
          <circle cx="-9" cy="-3" r="6" fill="#fbcfe8"/>
          <circle cx="0" cy="0" r="3.5" fill="#f43f5e"/>
        </g>
        <g id="skpetal">
          <path d="M 0 0 C -4 -7 4 -7 0 0 Z" fill="#f472b6" opacity="0.9"/>
        </g>
      </defs>
      <use href="#skflower" transform="translate(-85, -2) scale(1.1) rotate(-15)"/>
      <use href="#skpetal" transform="translate(-70, 10) scale(1.3) rotate(35)"/>
      <use href="#skpetal" transform="translate(-98, 8) scale(1) rotate(-45)"/>
      <use href="#skpetal" transform="translate(-80, -16) scale(0.9) rotate(70)"/>
      <use href="#skflower" transform="translate(85, -2) scale(1.1) rotate(15)"/>
      <use href="#skpetal" transform="translate(70, 10) scale(1.3) rotate(-35)"/>
      <use href="#skpetal" transform="translate(98, 8) scale(1) rotate(45)"/>
      <use href="#skpetal" transform="translate(80, -16) scale(0.9) rotate(-70)"/>
    </svg>
  `),

  // BEAUTY: KAWAII HEART BANDAID (AR Cheeks/Nose)
  beautyCuteBandaid: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <filter id="bds"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.25"/></filter>
      </defs>
      <g filter="url(#bds)" transform="translate(0, 0) rotate(-4)">
        <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#ffe4e6" stroke="#fda4af" stroke-width="2"/>
        <rect x="-18" y="-10" width="36" height="20" rx="4" fill="#ffffff" opacity="0.9"/>
        <path d="M -7 -2 C -9 -5 -13 -4 -13 -1 C -13 2 -7 5 -7 5 C -7 5 -1 2 -1 -1 C -1 -4 -5 -5 -7 -2 Z" fill="#f43f5e"/>
        <path d="M 7 -2 C 5 -5 1 -4 1 -1 C 1 2 7 5 7 5 C 7 5 13 2 13 -1 C 13 -4 9 -5 7 -2 Z" fill="#f43f5e"/>
        <circle cx="-30" cy="-4" r="1" fill="#f43f5e" opacity="0.5"/>
        <circle cx="-30" cy="4" r="1" fill="#f43f5e" opacity="0.5"/>
        <circle cx="30" cy="-4" r="1" fill="#f43f5e" opacity="0.5"/>
        <circle cx="30" cy="4" r="1" fill="#f43f5e" opacity="0.5"/>
      </g>
    </svg>
  `),

  // BEAUTY: CUTE BUNNY BLUSH (AR Cheeks)
  beautyBunnyBlush: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <radialGradient id="bnblush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f472b6" stop-opacity="0.55"/>
          <stop offset="70%" stop-color="#f472b6" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#f472b6" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="-85" cy="5" rx="32" ry="18" fill="url(#bnblush)"/>
      <ellipse cx="85" cy="5" rx="32" ry="18" fill="url(#bnblush)"/>
      <ellipse cx="0" cy="-5" rx="7" ry="5" fill="#fb7185"/>
      <circle cx="-2" cy="-6" r="1.5" fill="#ffffff" opacity="0.85"/>
      <circle cx="-16" cy="-2" r="1.6" fill="#f43f5e"/>
      <circle cx="-22" cy="1" r="1.6" fill="#f43f5e"/>
      <circle cx="-18" cy="5" r="1.6" fill="#f43f5e"/>
      <circle cx="16" cy="-2" r="1.6" fill="#f43f5e"/>
      <circle cx="22" cy="1" r="1.6" fill="#f43f5e"/>
      <circle cx="18" cy="5" r="1.6" fill="#f43f5e"/>
      <path d="M -85 0 C -87 -4 -92 -3 -92 0 C -92 4 -85 7 -85 7 C -85 7 -78 4 -78 0 C -78 -3 -83 -4 -85 0 Z" fill="#ffffff" opacity="0.85"/>
      <path d="M 85 0 C 83 -4 78 -3 78 0 C 78 4 85 7 85 7 C 85 7 92 4 92 0 C 92 -3 87 -4 85 0 Z" fill="#ffffff" opacity="0.85"/>
    </svg>
  `),

  // BEAUTY: DIAMOND CAT-EYE WINGS (AR Eyes)
  beautyDiamondWings: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -40 300 80" width="300" height="80">
      <defs>
        <g id="gemwing">
          <polygon points="0,0 8,-5 20,-10 12,-2 0,0" fill="#c084fc"/>
          <polygon points="0,0 12,-2 22,-3 10,2 0,0" fill="#e0e7ff"/>
          <polygon points="0,0 10,2 18,5 6,4 0,0" fill="#f472b6"/>
          <circle cx="23" cy="-11" r="2.5" fill="#ffffff"/>
          <polygon points="12,-15 13.5,-12 16.5,-10.5 13.5,-9 12,-6 10.5,-9 7.5,-10.5 10.5,-12" fill="#ffffff"/>
        </g>
      </defs>
      <use href="#gemwing" transform="translate(-85, 0) scale(-1, 1)"/>
      <use href="#gemwing" transform="translate(85, 0) scale(1, 1)"/>
    </svg>
  `),

  // BEAUTY: STRAWBERRY CHEEK DECALS (AR Cheeks)
  beautyStrawberryDecals: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <g id="berry">
          <path d="M 0 -12 C 10 -12 16 -2 12 10 C 8 18 0 22 0 22 C 0 22 -8 18 -12 10 C -16 -2 -10 -12 0 -12 Z" fill="#ef4444"/>
          <path d="M 0 -12 L -6 -16 L -2 -11 L 0 -18 L 2 -11 L 6 -16 Z" fill="#22c55e"/>
          <circle cx="-4" cy="-2" r="1" fill="#fef08a"/>
          <circle cx="4" cy="-2" r="1" fill="#fef08a"/>
          <circle cx="0" cy="5" r="1" fill="#fef08a"/>
          <circle cx="-3" cy="11" r="0.9" fill="#fef08a"/>
          <circle cx="3" cy="11" r="0.9" fill="#fef08a"/>
        </g>
      </defs>
      <use href="#berry" transform="translate(-85, 0) scale(0.9) rotate(-12)"/>
      <use href="#berry" transform="translate(85, 0) scale(0.9) rotate(12)"/>
    </svg>
  `),

  // BEAUTY: CELESTIAL MOON BINDI & STARS (AR Forehead)
  beautyCelestialMoon: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -100 300 120" width="300" height="120">
      <defs>
        <filter id="moonGlow"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#facc15" flood-opacity="0.85"/></filter>
      </defs>
      <g filter="url(#moonGlow)">
        <path d="M 0 -60 C 14 -60 22 -48 20 -35 C 16 -44 8 -50 -3 -49 C -12 -48 -18 -41 -18 -32 C -18 -20 -7 -14 5 -14 C -10 -12 -26 -24 -26 -40 C -26 -52 -14 -60 0 -60 Z" fill="#fef08a"/>
        <circle cx="0" cy="-10" r="3.5" fill="#ffffff"/>
        <polygon points="0,-2 2,3 7,5 2,7 0,12 -2,7 -7,5 -2,3" fill="#facc15"/>
        <circle cx="-65" cy="-35" r="2.5" fill="#ffffff"/>
        <circle cx="65" cy="-35" r="2.5" fill="#ffffff"/>
      </g>
    </svg>
  `),

  // BEAUTY: SWEET PEACH STICKERS (AR Cheeks)
  beautyPeachStickers: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <linearGradient id="pch" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fca5a5"/>
          <stop offset="100%" stop-color="#f87171"/>
        </linearGradient>
        <g id="peachItem">
          <path d="M 0 -8 C -12 -14 -22 0 -12 14 C -4 22 0 24 0 24 C 0 24 4 22 12 14 C 22 0 12 -14 0 -8 Z" fill="url(#pch)"/>
          <path d="M 0 -8 C -6 -18 2 -18 0 -8 Z" fill="#4ade80"/>
          <path d="M 0 -8 C 6 -16 12 -10 0 -8 Z" fill="#22c55e"/>
          <circle cx="-4" cy="2" r="2" fill="#ffffff" opacity="0.6"/>
        </g>
      </defs>
      <use href="#peachItem" transform="translate(-85, 0) scale(0.95) rotate(-10)"/>
      <use href="#peachItem" transform="translate(85, 0) scale(0.95) rotate(10)"/>
    </svg>
  `),

  // BEAUTY: DAISY FLOWER CHEEKS (AR Cheeks)
  beautyDaisyCheeks: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <g id="minidaisy">
          <circle cx="0" cy="-10" r="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
          <circle cx="7" cy="-7" r="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
          <circle cx="10" cy="0" r="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
          <circle cx="7" cy="7" r="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
          <circle cx="0" cy="10" r="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
          <circle cx="-7" cy="7" r="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
          <circle cx="-10" cy="0" r="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
          <circle cx="-7" cy="-7" r="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
          <circle cx="0" cy="0" r="6" fill="#facc15"/>
        </g>
      </defs>
      <use href="#minidaisy" transform="translate(-85, 0) scale(0.95)"/>
      <use href="#minidaisy" transform="translate(85, 0) scale(0.95)"/>
    </svg>
  `),

  // BEAUTY: SWEET LOVE LETTER (AR Cheeks)
  beautyLoveLetter: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <g id="loveLetter">
          <rect x="-14" y="-10" width="28" height="20" rx="3" fill="#ffffff" stroke="#fda4af" stroke-width="1.5"/>
          <path d="M -14 -10 L 0 2 L 14 -10" fill="none" stroke="#fda4af" stroke-width="1.5"/>
          <path d="M 0 0 C -2 -3 -5 -2 -5 0 C -5 2 0 4 0 4 C 0 4 5 2 5 0 C 5 -2 2 -3 0 0 Z" fill="#f43f5e"/>
        </g>
      </defs>
      <use href="#loveLetter" transform="translate(-85, 0) scale(1) rotate(-8)"/>
      <use href="#loveLetter" transform="translate(85, 0) scale(1) rotate(8)"/>
    </svg>
  `),

  // BEAUTY: EUPHORIA GLITTER DUST (AR Cheeks)
  beautyEuphoriaGlitter: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <g id="eglit">
          <circle cx="-85" cy="-8" r="3.5" fill="#c084fc" opacity="0.9"/>
          <circle cx="-75" cy="4" r="2.8" fill="#38bdf8" opacity="0.9"/>
          <circle cx="-95" cy="6" r="3" fill="#f472b6" opacity="0.85"/>
          <circle cx="-65" cy="-4" r="2.2" fill="#facc15" opacity="0.9"/>
          <polygon points="-80,-20 -78,-16 -74,-14 -78,-12 -80,-8 -82,-12 -86,-14 -82,-16" fill="#ffffff"/>
          <polygon points="-100,0 -98,3 -95,4 -98,5 -100,8 -102,5 -105,4 -102,3" fill="#ffffff"/>
        </g>
      </defs>
      <use href="#eglit" transform="translate(0, 0)"/>
      <use href="#eglit" transform="scale(-1, 1)"/>
    </svg>
  `),

  // BEAUTY: SWEET CHERRY DUO (AR Cheeks)
  beautyCherryDuo: makeSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -50 300 100" width="300" height="100">
      <defs>
        <g id="cherryPair">
          <path d="M 0 -16 Q -6 -6 -10 4" fill="none" stroke="#65a30d" stroke-width="2"/>
          <path d="M 0 -16 Q 6 -6 8 6" fill="none" stroke="#65a30d" stroke-width="2"/>
          <path d="M 0 -16 Q 8 -22 14 -16 Q 6 -14 0 -16 Z" fill="#84cc16"/>
          <circle cx="-10" cy="8" r="8" fill="#e11d48"/>
          <circle cx="-12" cy="6" r="2.5" fill="#ffffff" opacity="0.7"/>
          <circle cx="8" cy="10" r="8" fill="#be123c"/>
          <circle cx="6" cy="8" r="2.5" fill="#ffffff" opacity="0.7"/>
        </g>
      </defs>
      <use href="#cherryPair" transform="translate(-85, -2) scale(0.95) rotate(-10)"/>
      <use href="#cherryPair" transform="translate(85, -2) scale(0.95) rotate(10)"/>
    </svg>
  `),
};

// ============================================================================
// 100+ PRESET DATASET (28 Color, 27 Floral, 27 Cute, 27 Y2K = 109 Total)
// ============================================================================

const RAW_EFFECT_PRESETS: EffectItem[] = [
  // ==========================================================================
  // KATEGORI BEAUTY TIKTOK (24+ Preset Glowing, Flawless & AR Makeup)
  // ==========================================================================
  {
    id: 'tiktok_smooth',
    name: 'TikTok Smooth Beauty',
    category: 'beauty',
    type: 'css-filter',
    icon: '💄',
    cssFilter: 'brightness(108%) contrast(97%) saturate(106%)',
    description: 'Kulit halus bercahaya ala filter beauty TikTok populer.',
    badgeLabel: 'Viral TikTok',
  },
  {
    id: 'tiktok_rosy_blush',
    name: 'Rosy Cheek Blush',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌸',
    cssFilter: 'saturate(125%) hue-rotate(-6deg) brightness(107%) contrast(102%)',
    description: 'Sentuhan rona pipi segar dan bibir merona glowing alami.',
    badgeLabel: 'Blush Glow',
  },
  {
    id: 'tiktok_golden_hour',
    name: 'Golden Hour Sunkissed',
    category: 'beauty',
    type: 'css-filter',
    icon: '✨',
    cssFilter: 'sepia(24%) contrast(108%) brightness(105%) saturate(122%) hue-rotate(-4deg)',
    description: 'Pancaran hangat matahari sore estetik yang mempertegas garis wajah.',
    badgeLabel: 'Sunkissed',
  },
  {
    id: 'tiktok_korean_doll',
    name: 'Korean Doll High-Key',
    category: 'beauty',
    type: 'css-filter',
    icon: '🎀',
    cssFilter: 'brightness(116%) contrast(94%) saturate(110%)',
    description: 'Pencahayaan terang lembut khas foto studio idol Korea.',
    badgeLabel: 'K-Pop Idol',
  },
  {
    id: 'tiktok_clean_girl',
    name: 'Clean Girl Aesthetic',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌿',
    cssFilter: 'contrast(105%) brightness(105%) saturate(108%)',
    description: 'Penampilan segar, bersih natural tanpa terasa diedit.',
    badgeLabel: 'Fresh Clean',
  },
  {
    id: 'tiktok_indie_glam',
    name: 'Indie Glam Vintage',
    category: 'beauty',
    type: 'css-filter',
    icon: '📸',
    cssFilter: 'contrast(115%) saturate(135%) brightness(105%) hue-rotate(-3deg)',
    description: 'Saturasi hangat estetik bernuansa retro glam TikTok.',
    badgeLabel: 'Indie Kid',
  },
  {
    id: 'beauty_peach_fuzz',
    name: 'Peach Fuzz Velvet',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍑',
    cssFilter: 'brightness(108%) contrast(98%) saturate(118%) sepia(12%) hue-rotate(-8deg)',
    description: 'Rona buah persik lembut yang manis memikat.',
    badgeLabel: 'Peach Glow',
  },
  {
    id: 'beauty_glass_skin',
    name: 'Glass Skin Dewy',
    category: 'beauty',
    type: 'css-filter',
    icon: '💎',
    cssFilter: 'brightness(114%) contrast(104%) saturate(112%)',
    description: 'Tampilan kulit kaca berkilau bening khas K-Beauty.',
    badgeLabel: 'Glass Skin',
  },
  {
    id: 'beauty_sakura_pink',
    name: 'Sakura Blossom Tone',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌸',
    cssFilter: 'brightness(110%) contrast(96%) saturate(120%) hue-rotate(-8deg)',
    description: 'Nuansa merah muda kelopak bunga sakura yang anggun.',
    badgeLabel: 'Sakura Blush',
  },
  {
    id: 'beauty_douyin_fair',
    name: 'Douyin Fair Radiance',
    category: 'beauty',
    type: 'css-filter',
    icon: '✨',
    cssFilter: 'brightness(115%) contrast(106%) saturate(102%)',
    description: 'Pencerah kulit bercahaya kontras tinggi ala Douyin makeup.',
    badgeLabel: 'Douyin Fair',
  },
  {
    id: 'beauty_milk_tea',
    name: 'Milk Tea Soft Beige',
    category: 'beauty',
    type: 'css-filter',
    icon: '🧋',
    cssFilter: 'brightness(106%) contrast(98%) sepia(20%) saturate(106%)',
    description: 'Tone hangat lembut aesthetic teh susu yang nyaman dipandang.',
    badgeLabel: 'Milk Tea',
  },
  {
    id: 'beauty_lavender_fair',
    name: 'Lavender Brightening',
    category: 'beauty',
    type: 'css-filter',
    icon: '💜',
    cssFilter: 'brightness(112%) contrast(98%) saturate(108%) hue-rotate(10deg)',
    description: 'Koreksi tone sejuk untuk tampilan kulit cerah segar.',
    badgeLabel: 'Lavender Fair',
  },
  {
    id: 'beauty_sunset_bronze',
    name: 'Sunset Bronze Glam',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌇',
    cssFilter: 'brightness(105%) contrast(110%) saturate(128%) sepia(30%) hue-rotate(-12deg)',
    description: 'Kilau keemasan sunset eksotis bernuansa musim panas.',
    badgeLabel: 'Bronze Glam',
  },
  {
    id: 'beauty_pearl_luminous',
    name: 'Pearl Luminous Light',
    category: 'beauty',
    type: 'css-filter',
    icon: '🦪',
    cssFilter: 'brightness(118%) contrast(94%) saturate(104%)',
    description: 'Pencahayaan mutiara lembut dreamy nan mewah.',
    badgeLabel: 'Pearl Glow',
  },
  {
    id: 'beauty_strawberry_cream',
    name: 'Strawberry & Cream',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍓',
    cssFilter: 'brightness(110%) contrast(102%) saturate(132%) hue-rotate(-5deg)',
    description: 'Pipi merona manis warna buah stroberi segar ceria.',
    badgeLabel: 'Strawberry',
  },
  {
    id: 'beauty_honey_glow',
    name: 'Honey Glaze Sunbeam',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍯',
    cssFilter: 'brightness(107%) contrast(106%) saturate(124%) sepia(18%)',
    description: 'Sinar madu hangat memancarkan aura positif berseri.',
    badgeLabel: 'Honey Glow',
  },
  {
    id: 'beauty_soft_blur',
    name: 'Soft Velvet Focus',
    category: 'beauty',
    type: 'css-filter',
    icon: '☁️',
    cssFilter: 'brightness(109%) contrast(92%) saturate(106%)',
    description: 'Efek fokus halus selembut kain beludru memudarkan ketidaksempurnaan.',
    badgeLabel: 'Velvet Soft',
  },
  {
    id: 'beauty_angelic_bloom',
    name: 'Angelic Bloom',
    category: 'beauty',
    type: 'css-filter',
    icon: '🪽',
    cssFilter: 'brightness(116%) contrast(95%) saturate(115%) sepia(8%)',
    description: 'Pancaran bidadari lembut dan menawan layaknya lukisan.',
    badgeLabel: 'Angelic',
  },
  {
    id: 'beauty_y2k_pop_gloss',
    name: 'Y2K Pop Lipgloss',
    category: 'beauty',
    type: 'css-filter',
    icon: '💖',
    cssFilter: 'brightness(111%) contrast(116%) saturate(130%)',
    description: 'Warna pop cerah berani dan bibir berkilau era 2000-an.',
    badgeLabel: 'Y2K Pop',
  },
  {
    id: 'beauty_cottage_warm',
    name: 'Cottagecore Warm Sun',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌻',
    cssFilter: 'brightness(106%) contrast(104%) saturate(114%) sepia(16%)',
    description: 'Kehangatan sinar matahari alami padang bunga pedesaan.',
    badgeLabel: 'Cottage Warm',
  },

  // AR FACE BEAUTY STICKERS
  {
    id: 'ar_heart_blush',
    name: 'Heart Blush & Sparkles',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '💖',
    assetUrl: SVG_ASSETS.beautyHeartBlush,
    description: 'Blush pink merona dengan cap hati putih dan bintang.',
    badgeLabel: 'AR Blush',
  },
  {
    id: 'ar_douyin_tears',
    name: 'Douyin Rhinestones',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'eyes',
    icon: '💎',
    assetUrl: SVG_ASSETS.beautyDouyinTears,
    description: 'Kilau kristal permata estetik di bawah mata ala Douyin.',
    badgeLabel: 'AR Rhinestones',
  },
  {
    id: 'ar_coquette_bows',
    name: 'Coquette Satin Bows',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🎀',
    assetUrl: SVG_ASSETS.beautyCoquetteBows,
    description: 'Pita satin merah muda manis di kedua tulang pipi.',
    badgeLabel: 'AR Coquette',
  },
  {
    id: 'ar_angel_halo',
    name: 'Celestial Angel Halo',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'forehead',
    icon: '👑',
    assetUrl: SVG_ASSETS.beautyAngelHalo,
    description: 'Lingkaran cahaya halo malaikat berkilau di atas dahi.',
    badgeLabel: 'AR Halo',
  },
  {
    id: 'ar_butterfly_fairy',
    name: 'Fairy Butterfly Cheeks',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🦋',
    assetUrl: SVG_ASSETS.beautyButterfly,
    description: 'Kupu-kupu pastel anggun bertengger di pipi.',
    badgeLabel: 'AR Butterfly',
  },
  {
    id: 'ar_sunkissed_freckles',
    name: 'Sunkissed Faux Freckles',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '☀️',
    assetUrl: SVG_ASSETS.beautyFreckles,
    description: 'Bintik freckles manis bermandikan rona hangat matahari.',
    badgeLabel: 'AR Freckles',
  },
  {
    id: 'ar_pearl_under_eyes',
    name: 'Douyin Pearl Tears',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'eyes',
    icon: '🦪',
    assetUrl: SVG_ASSETS.beautyPearlGems,
    description: 'Permata mutiara putih berkilau anggun di bawah mata ala Douyin.',
    badgeLabel: 'AR Pearls',
  },
  {
    id: 'ar_kitty_blush',
    name: 'Kawaii Kitty Whiskers',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🐱',
    assetUrl: SVG_ASSETS.beautyKittyWhiskers,
    description: 'Hidung hati, kumis kucing imut, dan blush pink merona.',
    badgeLabel: 'AR Kitty',
  },
  {
    id: 'ar_star_freckles',
    name: 'Y2K Star & Sparkle Freckles',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '⭐',
    assetUrl: SVG_ASSETS.beautyStarFreckles,
    description: 'Taburan bintang emas dan kilauan berkilau melintasi hidung & pipi.',
    badgeLabel: 'AR Stars',
  },
  {
    id: 'ar_sakura_cheeks',
    name: 'Sakura Petals Cheeks',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🌸',
    assetUrl: SVG_ASSETS.beautySakuraCheeks,
    description: 'Kelopak bunga sakura lembut mekar manis di tulang pipi.',
    badgeLabel: 'AR Sakura',
  },
  {
    id: 'ar_anime_bandaid',
    name: 'Kawaii Heart Band-aid',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🩹',
    assetUrl: SVG_ASSETS.beautyCuteBandaid,
    description: 'Plester pastel manis berhias hati merah di batang hidung.',
    badgeLabel: 'AR Band-aid',
  },
  {
    id: 'ar_bunny_blush',
    name: 'Cute Bunny Whisker Blush',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🐰',
    assetUrl: SVG_ASSETS.beautyBunnyBlush,
    description: 'Hidung kelinci imut dengan titik kumis dan pipi merah jambu.',
    badgeLabel: 'AR Bunny',
  },
  {
    id: 'ar_diamond_wings',
    name: 'Diamond Wing Eyeliner',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'eyes',
    icon: '💎',
    assetUrl: SVG_ASSETS.beautyDiamondWings,
    description: 'Sayap eyeliner kristal berkilauan di sudut luar mata.',
    badgeLabel: 'AR Wings',
  },
  {
    id: 'ar_strawberry_cheeks',
    name: 'Sweet Strawberry Decals',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🍓',
    assetUrl: SVG_ASSETS.beautyStrawberryDecals,
    description: 'Stiker buah stroberi merah segar manis di pipi.',
    badgeLabel: 'AR Berry',
  },
  {
    id: 'ar_celestial_moon',
    name: 'Celestial Moon Bindi',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'forehead',
    icon: '🌙',
    assetUrl: SVG_ASSETS.beautyCelestialMoon,
    description: 'Bulan sabit emas dan kristal suci mistis di tengah dahi.',
    badgeLabel: 'AR Moon',
  },
  {
    id: 'ar_sweet_peach',
    name: 'Sweet Peach Decals',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🍑',
    assetUrl: SVG_ASSETS.beautyPeachStickers,
    description: 'Buah persik manis merekah dengan rona pipi segar merona.',
    badgeLabel: 'AR Peach',
  },
  {
    id: 'ar_daisy_cheeks',
    name: 'Daisy Blossom Cheeks',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🌼',
    assetUrl: SVG_ASSETS.beautyDaisyCheeks,
    description: 'Bunga daisy putih ceria dengan inti madu cerah di pipi.',
    badgeLabel: 'AR Daisy',
  },
  {
    id: 'ar_love_letter',
    name: 'Sweet Love Letter Decals',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '💌',
    assetUrl: SVG_ASSETS.beautyLoveLetter,
    description: 'Amplop surat cinta merah muda dengan segel hati di pipi.',
    badgeLabel: 'AR Love',
  },
  {
    id: 'ar_euphoria_glitter',
    name: 'Euphoria Shimmer Dust',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🔮',
    assetUrl: SVG_ASSETS.beautyEuphoriaGlitter,
    description: 'Taburan kilau holografik ungu-biru-pink ala serial Euphoria.',
    badgeLabel: 'AR Euphoria',
  },
  {
    id: 'ar_cherry_duo',
    name: 'Sweet Cherry Duo',
    category: 'beauty',
    type: 'ar-face',
    anchor: 'cheeks',
    icon: '🍒',
    assetUrl: SVG_ASSETS.beautyCherryDuo,
    description: 'Sepasang buah ceri merah mengilap manis di kedua pipi.',
    badgeLabel: 'AR Cherry',
  },

  // 45 NEW TIKTOK, DOUYIN & K-BEAUTY TONE FILTERS
  {
    id: 'beauty_porcelain_white',
    name: 'Porcelain Doll White',
    category: 'beauty',
    type: 'css-filter',
    icon: '🎀',
    cssFilter: 'brightness(116%) contrast(96%) saturate(108%) sepia(8%) hue-rotate(-5deg)',
    description: 'Kulit porselen bening bercahaya dengan highlight lembut khas boneka.',
    badgeLabel: 'Porcelain',
  },
  {
    id: 'beauty_kpop_stage',
    name: 'K-Pop Stage Center',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌟',
    cssFilter: 'brightness(118%) contrast(108%) saturate(128%)',
    description: 'Pencahayaan panggung idol dengan kontras pop dan saturasi warna cerah.',
    badgeLabel: 'K-Pop Stage',
  },
  {
    id: 'beauty_cherry_syrup',
    name: 'Cherry Syrup Gloss',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍒',
    cssFilter: 'saturate(136%) contrast(106%) brightness(108%) hue-rotate(-8deg)',
    description: 'Rona bibir dan pipi sirup cherry merah merona manis nan segar.',
    badgeLabel: 'Cherry Gloss',
  },
  {
    id: 'beauty_glazed_donut',
    name: 'Glazed Donut Dewy',
    category: 'beauty',
    type: 'css-filter',
    icon: '✨',
    cssFilter: 'brightness(112%) contrast(102%) saturate(114%) sepia(10%)',
    description: 'Tampilan super dewy dan berkilau alami ala Hailey Bieber.',
    badgeLabel: 'Glazed Dew',
  },
  {
    id: 'beauty_espresso_glam',
    name: 'Espresso Cozy Glam',
    category: 'beauty',
    type: 'css-filter',
    icon: '☕',
    cssFilter: 'sepia(30%) contrast(114%) brightness(102%) saturate(118%) hue-rotate(-12deg)',
    description: 'Nuansa hangat cokelat latte dengan kontras lembut elegan.',
    badgeLabel: 'Latte Glam',
  },
  {
    id: 'beauty_matcha_toneup',
    name: 'Matcha Tone-Up Fair',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍵',
    cssFilter: 'contrast(103%) brightness(110%) saturate(98%) hue-rotate(10deg)',
    description: 'Koreksi kemerahan kulit dengan tone dingin sejuk yang mencerahkan.',
    badgeLabel: 'Tone-Up',
  },
  {
    id: 'beauty_apricot_coral',
    name: 'Apricot Coral Radiance',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍑',
    cssFilter: 'brightness(110%) contrast(102%) saturate(122%) sepia(14%) hue-rotate(-6deg)',
    description: 'Warna aprikot ceria yang memberi kesan awet muda dan energetik.',
    badgeLabel: 'Apricot',
  },
  {
    id: 'beauty_cloud_dream',
    name: 'Cloud Nine Dreamy',
    category: 'beauty',
    type: 'css-filter',
    icon: '☁️',
    cssFilter: 'brightness(118%) contrast(90%) saturate(110%)',
    description: 'Efek dreamy lembut berkabut putih seperti berdiri di atas awan.',
    badgeLabel: 'Dreamy',
  },
  {
    id: 'beauty_champagne_pop',
    name: 'Champagne Shimmer',
    category: 'beauty',
    type: 'css-filter',
    icon: '🥂',
    cssFilter: 'brightness(112%) contrast(105%) saturate(118%) sepia(18%) hue-rotate(-2deg)',
    description: 'Highlight keemasan mewah di tulang pipi dan dahi ala karpet merah.',
    badgeLabel: 'Champagne',
  },
  {
    id: 'beauty_tokyo_anime',
    name: 'Tokyo Anime Glow',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍡',
    cssFilter: 'brightness(115%) contrast(106%) saturate(132%) hue-rotate(-4deg)',
    description: 'Warna pastel cerah hidup dengan skin tone terang seperti karakter anime.',
    badgeLabel: 'Tokyo Anime',
  },
  {
    id: 'beauty_rose_gold',
    name: 'Rose Gold Luxe',
    category: 'beauty',
    type: 'css-filter',
    icon: '👑',
    cssFilter: 'brightness(109%) contrast(104%) saturate(124%) sepia(20%) hue-rotate(-10deg)',
    description: 'Paduan elegan emas dan merah muda yang memberi kesan glamor eksklusif.',
    badgeLabel: 'Rose Gold',
  },
  {
    id: 'beauty_mochi_matte',
    name: 'Mochi Velvet Matte',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍥',
    cssFilter: 'brightness(107%) contrast(95%) saturate(106%) sepia(5%)',
    description: 'Tampilan kulit bebas kilap yang lembut, empuk, dan halus bagai mochi.',
    badgeLabel: 'Mochi Matte',
  },
  {
    id: 'beauty_snow_white',
    name: 'Snow White Fairytale',
    category: 'beauty',
    type: 'css-filter',
    icon: '❄️',
    cssFilter: 'brightness(122%) contrast(110%) saturate(118%) hue-rotate(-6deg)',
    description: 'Kulit seputih salju dengan aksen merah delima tajam mempesona.',
    badgeLabel: 'Snow White',
  },
  {
    id: 'beauty_baddie_contour',
    name: 'Baddie Golden Glow',
    category: 'beauty',
    type: 'css-filter',
    icon: '💅',
    cssFilter: 'contrast(116%) brightness(106%) saturate(125%) sepia(15%)',
    description: 'Kontras tegas dengan highlight keemasan yang menonjolkan fitur wajah.',
    badgeLabel: 'Baddie',
  },
  {
    id: 'beauty_sunset_hour',
    name: 'Sunset Beach Glow',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌅',
    cssFilter: 'brightness(108%) contrast(106%) saturate(128%) sepia(22%) hue-rotate(-14deg)',
    description: 'Rona jingga keemasan saat matahari terbenam di tepi pantai.',
    badgeLabel: 'Sunset Beach',
  },
  {
    id: 'beauty_retro_camellia',
    name: 'Retro Camellia Pink',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌺',
    cssFilter: 'brightness(106%) contrast(104%) saturate(118%) sepia(16%) hue-rotate(-4deg)',
    description: 'Nuansa bunga kamelia klasik dengan tone vintage lembut.',
    badgeLabel: 'Camellia',
  },
  {
    id: 'beauty_crystal_dew',
    name: 'Crystal Morning Dew',
    category: 'beauty',
    type: 'css-filter',
    icon: '💧',
    cssFilter: 'brightness(115%) contrast(102%) saturate(112%) hue-rotate(2deg)',
    description: 'Kesegaran tetesan embun pagi yang melembapkan kulit seketika.',
    badgeLabel: 'Crystal Dew',
  },
  {
    id: 'beauty_egirl_flush',
    name: 'E-Girl Anime Flush',
    category: 'beauty',
    type: 'css-filter',
    icon: '🖤',
    cssFilter: 'brightness(107%) contrast(108%) saturate(140%) hue-rotate(-10deg)',
    description: 'Rona merah muda intens di area pipi hingga batang hidung.',
    badgeLabel: 'E-Girl',
  },
  {
    id: 'beauty_french_chic',
    name: 'French Girl Chic',
    category: 'beauty',
    type: 'css-filter',
    icon: '🥐',
    cssFilter: 'brightness(104%) contrast(103%) saturate(105%) sepia(8%)',
    description: 'Gaya minimalis Parisienne dengan kontras alami tanpa usaha berlebih.',
    badgeLabel: 'French Chic',
  },
  {
    id: 'beauty_berry_plum',
    name: 'Berry Plum Velvet',
    category: 'beauty',
    type: 'css-filter',
    icon: '🫐',
    cssFilter: 'brightness(104%) contrast(108%) saturate(128%) hue-rotate(-16deg)',
    description: 'Rona ungu berry manis yang memberi kesan misterius nan memikat.',
    badgeLabel: 'Plum Velvet',
  },
  {
    id: 'beauty_caramel_latte',
    name: 'Caramel Latte Warmth',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍮',
    cssFilter: 'sepia(26%) brightness(106%) contrast(108%) saturate(120%)',
    description: 'Kehangatan karamel manis yang memberi glow eksotis eksklusif.',
    badgeLabel: 'Caramel Glow',
  },
  {
    id: 'beauty_almond_milk',
    name: 'Almond Milk Softness',
    category: 'beauty',
    type: 'css-filter',
    icon: '🥛',
    cssFilter: 'brightness(112%) contrast(96%) saturate(104%) sepia(8%)',
    description: 'Tone lembut susu almond yang menenangkan dan meratakan warna kulit.',
    badgeLabel: 'Almond Milk',
  },
  {
    id: 'beauty_candy_pop',
    name: 'Cotton Candy Bloom',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍭',
    cssFilter: 'brightness(114%) contrast(102%) saturate(130%) hue-rotate(12deg)',
    description: 'Nuansa manis permen kapas biru-pink pastel yang ceria.',
    badgeLabel: 'Cotton Candy',
  },
  {
    id: 'beauty_vintage_velvet',
    name: 'Vintage Velvet Glam',
    category: 'beauty',
    type: 'css-filter',
    icon: '🎞️',
    cssFilter: 'sepia(22%) contrast(112%) brightness(104%) saturate(116%)',
    description: 'Keanggunan film klasik Hollywood dengan tone hangat berkilau.',
    badgeLabel: 'Velvet Glam',
  },
  {
    id: 'beauty_ice_queen',
    name: 'Ice Queen Luminous',
    category: 'beauty',
    type: 'css-filter',
    icon: '🧊',
    cssFilter: 'brightness(116%) contrast(102%) saturate(102%) hue-rotate(18deg)',
    description: 'Aura dingin elegan berhias kilau kebiruan yang mendinginkan wajah.',
    badgeLabel: 'Ice Queen',
  },
  {
    id: 'beauty_sunflower_radiance',
    name: 'Sunflower Radiance',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌻',
    cssFilter: 'brightness(110%) contrast(106%) saturate(126%) sepia(15%) hue-rotate(-2deg)',
    description: 'Pancaran kuning cerah hangat yang mencerahkan senyum Anda.',
    badgeLabel: 'Sunflower',
  },
  {
    id: 'beauty_peony_blush',
    name: 'Peony Petal Blush',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌸',
    cssFilter: 'brightness(108%) contrast(100%) saturate(122%) hue-rotate(-8deg)',
    description: 'Sentuhan merah muda kelopak bunga peoni mekar di pagi hari.',
    badgeLabel: 'Peony Petal',
  },
  {
    id: 'beauty_golden_nectar',
    name: 'Golden Nectar Glow',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍯',
    cssFilter: 'brightness(111%) contrast(105%) saturate(124%) sepia(20%)',
    description: 'Kehangatan madu emas murni yang memberi kilau mewah berkilau.',
    badgeLabel: 'Nectar Glow',
  },
  {
    id: 'beauty_milky_way',
    name: 'Milky Way Ethereal',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌌',
    cssFilter: 'brightness(113%) contrast(98%) saturate(116%) hue-rotate(14deg)',
    description: 'Gradasi lembut bercahaya dengan nuansa kosmik mistis nan cantik.',
    badgeLabel: 'Milky Way',
  },
  {
    id: 'beauty_soft_glam',
    name: 'Soft Glam Masterpiece',
    category: 'beauty',
    type: 'css-filter',
    icon: '💄',
    cssFilter: 'brightness(108%) contrast(104%) saturate(114%) sepia(10%)',
    description: 'Filter kecantikan serbaguna untuk pesta, wisuda, atau kencan.',
    badgeLabel: 'Soft Glam',
  },
  {
    id: 'beauty_hydra_fresh',
    name: 'Hydra Fresh Aqua',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌊',
    cssFilter: 'brightness(112%) contrast(105%) saturate(110%) hue-rotate(5deg)',
    description: 'Efek hidrasi segar air mineral yang membuat wajah tampak bugar seketika.',
    badgeLabel: 'Hydra Fresh',
  },
  {
    id: 'beauty_tangerine_pop',
    name: 'Tangerine Juice Pop',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍊',
    cssFilter: 'brightness(109%) contrast(107%) saturate(132%) hue-rotate(-12deg)',
    description: 'Kesegaran buah jeruk keprok ceria yang memberi kecerahan instan.',
    badgeLabel: 'Tangerine',
  },
  {
    id: 'beauty_sweet_lavender',
    name: 'Sweet Lilac Dream',
    category: 'beauty',
    type: 'css-filter',
    icon: '🪻',
    cssFilter: 'brightness(114%) contrast(97%) saturate(112%) hue-rotate(16deg)',
    description: 'Tone ungu lilac pastel yang menyamarkan noda kusam pada kulit.',
    badgeLabel: 'Lilac Dream',
  },
  {
    id: 'beauty_rose_quartz',
    name: 'Rose Quartz Crystal',
    category: 'beauty',
    type: 'css-filter',
    icon: '🔮',
    cssFilter: 'brightness(111%) contrast(101%) saturate(118%) hue-rotate(-6deg)',
    description: 'Energi kristal kuarsa mawar yang memancarkan aura cinta dan kelembutan.',
    badgeLabel: 'Rose Quartz',
  },
  {
    id: 'beauty_hollywood_star',
    name: 'Hollywood Studio Key',
    category: 'beauty',
    type: 'css-filter',
    icon: '🎬',
    cssFilter: 'brightness(113%) contrast(109%) saturate(115%) sepia(6%)',
    description: 'Tata cahaya studio film profesional yang menyorot kesempurnaan wajah.',
    badgeLabel: 'Studio Key',
  },
  {
    id: 'beauty_sparkle_filter',
    name: 'Glimmer Star Sparkle',
    category: 'beauty',
    type: 'css-filter',
    icon: '❇️',
    cssFilter: 'brightness(116%) contrast(110%) saturate(120%)',
    description: 'Sentuhan kilau gemerlap bintang di setiap sudut senyuman.',
    badgeLabel: 'Star Sparkle',
  },
  {
    id: 'beauty_barbie_core',
    name: 'Barbiecore Pink Pop',
    category: 'beauty',
    type: 'css-filter',
    icon: '💖',
    cssFilter: 'brightness(110%) contrast(108%) saturate(145%) hue-rotate(-12deg)',
    description: 'Warna merah muda cerah ikonis yang feminin, bold, dan percaya diri.',
    badgeLabel: 'Barbiecore',
  },
  {
    id: 'beauty_cinnamon_spice',
    name: 'Cinnamon Warm Spice',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍂',
    cssFilter: 'sepia(25%) contrast(110%) brightness(105%) saturate(122%) hue-rotate(-10deg)',
    description: 'Nuansa kayu manis hangat untuk rona wajah eksotis mempesona.',
    badgeLabel: 'Cinnamon',
  },
  {
    id: 'beauty_douyin_twilight',
    name: 'Douyin Twilight Glow',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌆',
    cssFilter: 'brightness(114%) contrast(104%) saturate(124%) hue-rotate(-15deg)',
    description: 'Efek viral Douyin dengan tone senja magis dan kulit berkilau.',
    badgeLabel: 'Douyin Dusk',
  },
  {
    id: 'beauty_vanilla_cream',
    name: 'Vanilla Cream Soft',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍦',
    cssFilter: 'brightness(113%) contrast(96%) saturate(108%) sepia(12%)',
    description: 'Sentuhan lembut es krim vanila dengan kehangatan lembut dan bersih.',
    badgeLabel: 'Vanilla Cream',
  },
  {
    id: 'beauty_opal_holo',
    name: 'Opal Holographic Glow',
    category: 'beauty',
    type: 'css-filter',
    icon: '🪞',
    cssFilter: 'brightness(115%) contrast(100%) saturate(122%) hue-rotate(8deg)',
    description: 'Kilau opal holografik multi-warna dengan pencahayaan prismatik.',
    badgeLabel: 'Opal Holo',
  },
  {
    id: 'beauty_sweet_papaya',
    name: 'Sweet Papaya Sun',
    category: 'beauty',
    type: 'css-filter',
    icon: '🥭',
    cssFilter: 'brightness(108%) contrast(106%) saturate(126%) sepia(18%) hue-rotate(-8deg)',
    description: 'Rona buah pepaya tropis yang menghangatkan dan mencerahkan warna kulit.',
    badgeLabel: 'Papaya Sun',
  },
  {
    id: 'beauty_moonlit_silver',
    name: 'Moonlit Silver Glow',
    category: 'beauty',
    type: 'css-filter',
    icon: '🌕',
    cssFilter: 'brightness(112%) contrast(104%) saturate(92%) hue-rotate(15deg)',
    description: 'Kemilau cahaya rembulan perak yang sejuk dan menawan hati.',
    badgeLabel: 'Moonlit Silver',
  },
  {
    id: 'beauty_honeycomb_amber',
    name: 'Honeycomb Amber',
    category: 'beauty',
    type: 'css-filter',
    icon: '🐝',
    cssFilter: 'brightness(107%) contrast(107%) saturate(124%) sepia(24%)',
    description: 'Kehangatan madu sarang lebah dengan kontras kaya dan bercahaya.',
    badgeLabel: 'Amber Honey',
  },
  {
    id: 'beauty_pink_peppermint',
    name: 'Pink Peppermint',
    category: 'beauty',
    type: 'css-filter',
    icon: '🍬',
    cssFilter: 'brightness(112%) contrast(102%) saturate(120%) hue-rotate(4deg)',
    description: 'Kesegaran permen mint dengan rona merah muda ceria.',
    badgeLabel: 'Peppermint',
  },

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

// Export all effect presets (CSS color grading, AR face stickers, and graphic overlays)
export const ALL_EFFECT_PRESETS: EffectItem[] = RAW_EFFECT_PRESETS;

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
    isArEffect: effect.type === 'ar-face',
    arAnchor:
      effect.anchor === 'forehead' || effect.anchor === 'eyes' || effect.anchor === 'cheeks'
        ? effect.anchor
        : undefined,
    arAssetUrl: effect.assetUrl,
  };
}
