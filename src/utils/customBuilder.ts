import { PhotoboothTemplate } from '../constants/templatesData';

export type CustomBaseLayout =
  | 'strip-3'
  | 'strip-4'
  | '4r-grid4'
  | '4r-col3'
  | '4r-split3'
  | '4r-portrait-grid4'
  | 'polaroid-1';

export type FrameMotif = 'plain' | 'checkerboard' | 'double-border';

export type FontStyleOption = 'sans' | 'serif' | 'cursive' | 'display' | 'mono';

export interface CustomBuilderConfig {
  layoutBase: CustomBaseLayout;
  name: string;
  subtitle: string;
  footer: string;
  bgColor: string;
  textColor: string; // '#FFFFFF', '#111111', or custom hex
  motif: FrameMotif;
  fontStyle: FontStyleOption;
  cornerRadius: number; // 0 - 24 px
  photoGap: number; // 8 - 36 px
}

/**
 * Detects if a given color string (hex or rgb) is light or dark based on luminance.
 */
export function isLightColor(colorStr: string): boolean {
  if (!colorStr) return false;
  const str = colorStr.trim().toLowerCase();
  if (str === 'white' || str === '#fff' || str === '#ffffff') return true;
  if (str === 'black' || str === '#000' || str === '#000000') return false;

  let r = 0, g = 0, b = 0;

  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    if (hex.length >= 6) {
      r = parseInt(hex.slice(0, 2), 16) || 0;
      g = parseInt(hex.slice(2, 4), 16) || 0;
      b = parseInt(hex.slice(4, 6), 16) || 0;
    }
  } else if (str.startsWith('rgb')) {
    const parts = str.match(/\d+/g);
    if (parts && parts.length >= 3) {
      r = parseInt(parts[0], 10) || 0;
      g = parseInt(parts[1], 10) || 0;
      b = parseInt(parts[2], 10) || 0;
    }
  }

  // Standard perceived brightness formula (YIQ / ITU-R BT.601)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 140;
}

/**
 * Returns accessible, high-contrast dynamic color tokens for text, logo, borders based on background luminance
 */
export function getContrastColors(bgColor: string, explicitTextColor?: string) {
  const light = isLightColor(bgColor);
  const isAuto = !explicitTextColor || explicitTextColor === 'auto';

  // Primary text: '#0F172A' on light bg, '#FFFFFF' on dark bg (or custom override if specified)
  const primaryText = !isAuto ? explicitTextColor : light ? '#0F172A' : '#FFFFFF';

  // Secondary text: '#475569' on light bg, '#E2E8F0' on dark bg
  const secondaryText = light ? '#475569' : '#E2E8F0';

  // Pink accent for 'Photo' logo: high-contrast dark rose '#E11D48' on light bg, bright coral rose '#FB7185' on dark bg
  const photoAccent = light ? '#E11D48' : '#FB7185';

  // Divider lines
  const divider = light ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.2)';

  // Photo slot frame border
  const photoBorder = light ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.25)';

  return {
    isLight: light,
    primaryText,
    secondaryText,
    photoAccent,
    divider,
    photoBorder,
  };
}

export interface BaseLayoutMeta {
  id: CustomBaseLayout;
  name: string;
  slots: 1 | 3 | 4;
  aspectRatio: string;
  canvasWidth: number;
  canvasHeight: number;
  description: string;
}

export const BASE_LAYOUTS: Record<CustomBaseLayout, BaseLayoutMeta> = {
  'strip-3': {
    id: 'strip-3',
    name: 'Strip Vertikal 3 Foto',
    slots: 3,
    aspectRatio: '1/3',
    canvasWidth: 600,
    canvasHeight: 1800,
    description: '3 foto bertingkat vertikal ramping ala photobooth strip 2x6".',
  },
  'strip-4': {
    id: 'strip-4',
    name: 'Korean Strip Vertikal 4 Foto',
    slots: 4,
    aspectRatio: '1/3',
    canvasWidth: 640,
    canvasHeight: 1920,
    description: '4 foto vertikal klasik khas street photobooth Korea.',
  },
  '4r-grid4': {
    id: '4r-grid4',
    name: 'Format 4R Landscape (Grid 2x2)',
    slots: 4,
    aspectRatio: '3/2',
    canvasWidth: 1800,
    canvasHeight: 1200,
    description: '4 kotak foto simetris berjejer 2 atas dan 2 bawah.',
  },
  '4r-portrait-grid4': {
    id: '4r-portrait-grid4',
    name: 'Format 4R Portrait (Grid 2x2)',
    slots: 4,
    aspectRatio: '2/3',
    canvasWidth: 1200,
    canvasHeight: 1800,
    description: '4 kotak foto simetris (2 atas, 2 bawah) dalam orientasi portrait tegak.',
  },
  '4r-col3': {
    id: '4r-col3',
    name: 'Format 4R Landscape (3 Kolom)',
    slots: 3,
    aspectRatio: '3/2',
    canvasWidth: 1800,
    canvasHeight: 1200,
    description: '3 foto portrait berdiri berdampingan secara horizontal.',
  },
  '4r-split3': {
    id: '4r-split3',
    name: 'Format 4R Asimetris (1 Besar + 2 Kecil)',
    slots: 3,
    aspectRatio: '3/2',
    canvasWidth: 1800,
    canvasHeight: 1200,
    description: '2 foto kecil di atas dan 1 foto landscape lebar di bawah.',
  },
  'polaroid-1': {
    id: 'polaroid-1',
    name: 'Single Card / Polaroid (1 Foto)',
    slots: 1,
    aspectRatio: '3/4',
    canvasWidth: 1200,
    canvasHeight: 1600,
    description: '1 foto besar di tengah dengan margin bawah tebal elegan.',
  },
};

export const DEFAULT_BUILDER_CONFIG: CustomBuilderConfig = {
  layoutBase: 'strip-4',
  name: 'Our Special Moments',
  subtitle: 'PHOTOBOOTH MEMORIES • 2026',
  footer: 'IZIAPHOTO STUDIO',
  bgColor: '#FAF8F5',
  textColor: '#111111',
  motif: 'plain',
  fontStyle: 'sans',
  cornerRadius: 8,
  photoGap: 16,
};

const STORAGE_KEY = 'iziaphoto_custom_builder_config';

/**
 * Saves the active custom template builder configuration
 */
export function saveActiveBuilderConfig(config: CustomBuilderConfig): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.warn('[customBuilder] Failed to save config to sessionStorage:', err);
  }
}

/**
 * Retrieves the active custom template builder configuration
 */
export function getActiveBuilderConfig(): CustomBuilderConfig {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BUILDER_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_BUILDER_CONFIG,
      ...parsed,
    };
  } catch {
    return DEFAULT_BUILDER_CONFIG;
  }
}

/**
 * Converts builder configuration to standard PhotoboothTemplate
 */
export function builderConfigToPhotoboothTemplate(config: CustomBuilderConfig): PhotoboothTemplate {
  const meta = BASE_LAYOUTS[config.layoutBase] || BASE_LAYOUTS['strip-4'];

  return {
    id: 'custom-builder',
    name: config.name || 'Template Kustom',
    category: 'custom' as any,
    slots: meta.slots,
    layoutType: 'custom-builder' as any,
    description: `${meta.name} dengan motif ${config.motif} dan warna kustom.`,
    badge: `Kustom • ${meta.slots} Foto`,
    aspectRatio: meta.aspectRatio,
    theme: {
      bg: config.bgColor,
      text: config.textColor,
      accent: '#FB7185',
      border: config.textColor,
    },
    customTexts: {
      header: config.name,
      subhead: config.subtitle,
      footer: config.footer,
    },
  };
}
