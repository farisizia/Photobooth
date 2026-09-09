import { PhotoboothTemplate } from './templates';

export interface FrameColor {
  id: string;
  name: string;
  bg: string;
  text: string;
  border?: string;
}

export const DEFAULT_FRAME_COLORS: FrameColor[] = [
  { id: 'default', name: 'Warna Asli', bg: '', text: '', border: '' },
  { id: 'white', name: 'Classic White', bg: '#FFFFFF', text: '#111827', border: '#E5E7EB' },
  { id: 'black', name: 'Noir Black', bg: '#121319', text: '#FAF6EF', border: '#2A2D3A' },
  { id: 'cream', name: 'Warm Cream', bg: '#FAF6EF', text: '#3E342B', border: '#E7DEC8' },
  { id: 'pink', name: 'Soft Pink', bg: '#FDE2E4', text: '#7A2241', border: '#F8B4B8' },
];

/**
 * Capture frame from video element
 */
export function captureFrame(video: HTMLVideoElement, opts?: { mirror?: boolean }): string {
  const canvas = document.createElement('canvas');
  const width = video.videoWidth || 1280;
  const height = video.videoHeight || 720;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  if (opts?.mirror) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', 0.95);
}

/**
 * Loads an HTMLImageElement from a data URL asynchronously
 */
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
};

/**
 * Draws an image with object-fit: cover inside a destination rect
 */
const drawCoverImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number,
  radius = 0,
  filter?: string,
  overlayImg?: HTMLImageElement | null
) => {
  const imgRatio = img.width / img.height;
  const destRatio = dWidth / dHeight;

  let sx = 0;
  let sy = 0;
  let sWidth = img.width;
  let sHeight = img.height;

  if (imgRatio > destRatio) {
    sWidth = img.height * destRatio;
    sx = (img.width - sWidth) / 2;
  } else {
    sHeight = img.width / destRatio;
    sy = (img.height - sHeight) / 2;
  }

  ctx.save();
  if (radius > 0) {
    ctx.beginPath();
    ctx.roundRect(dx, dy, dWidth, dHeight, radius);
    ctx.clip();
  }
  if (filter && filter !== 'none') {
    try {
      ctx.filter = filter;
    } catch {
      // ignore
    }
  }
  ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

  if (overlayImg) {
    try {
      ctx.filter = 'none';
      ctx.drawImage(overlayImg, dx, dy, dWidth, dHeight);
    } catch {
      // ignore
    }
  }
  ctx.restore();
};

/**
 * Draws an image cropped inside a circle
 */
const drawCircleImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  radius: number,
  filter?: string,
  overlayImg?: HTMLImageElement | null
) => {
  const dSize = radius * 2;
  const imgRatio = img.width / img.height;

  let sx = 0;
  let sy = 0;
  let sWidth = img.width;
  let sHeight = img.height;

  if (imgRatio > 1) {
    sWidth = img.height;
    sx = (img.width - sWidth) / 2;
  } else {
    sHeight = img.width;
    sy = (img.height - sHeight) / 2;
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();
  if (filter && filter !== 'none') {
    try {
      ctx.filter = filter;
    } catch {
      // ignore
    }
  }
  ctx.drawImage(img, sx, sy, sWidth, sHeight, cx - radius, cy - radius, dSize, dSize);

  if (overlayImg) {
    try {
      ctx.filter = 'none';
      ctx.drawImage(overlayImg, cx - radius, cy - radius, dSize, dSize);
    } catch {
      // ignore
    }
  }
  ctx.restore();
};

/**
 * Helper to wrap and justify article column text
 */
const drawWrappedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number => {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY + lineHeight;
};

/**
 * Helper to draw checkerboard pattern along borders
 */
const drawCheckerboardBorder = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  borderWidth = 24,
  squareSize = 12
) => {
  ctx.fillStyle = '#000000';

  // Top and bottom borders
  for (let y = 0; y < borderWidth; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      if ((Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0) {
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }
  }

  for (let y = height - borderWidth; y < height; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      if ((Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0) {
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }
  }

  // Left and right borders
  for (let y = borderWidth; y < height - borderWidth; y += squareSize) {
    for (let x = 0; x < borderWidth; x += squareSize) {
      if ((Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0) {
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }
    for (let x = width - borderWidth; x < width; x += squareSize) {
      if ((Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0) {
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }
  }
};

/**
 * Renders photos into the selected viral template on high-DPI HTML Canvas
 */
export async function renderPhotoboothCanvas(
  photos: string[],
  template: PhotoboothTemplate,
  colorOverride?: FrameColor,
  options?: {
    filter?: string;
    overlayUrl?: string | null;
  }
): Promise<HTMLCanvasElement> {
  if (photos.length === 0) throw new Error('Tidak ada foto untuk dirender.');

  const count = template.slots;
  const photoUrls = Array.from({ length: count }).map((_, i) => photos[i % photos.length]);
  const images = await Promise.all(photoUrls.map(loadImage));

  let overlayImg: HTMLImageElement | null = null;
  if (options?.overlayUrl) {
    try {
      overlayImg = await loadImage(options.overlayUrl);
    } catch (err) {
      console.warn('[renderPhotoboothCanvas] Failed to load overlay:', err);
    }
  }
  const activeFilter = options?.filter && options.filter !== 'none' ? options.filter : undefined;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  const bgColor = colorOverride?.bg || template.theme.bg;
  const textColor = colorOverride?.text || template.theme.text;
  const borderColor = colorOverride?.border || template.theme.border;

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();

  // =========================================================================
  // 0. KOREAN WIDE 2-CUT (2 Slots Wide Landscape Stacked)
  // =========================================================================
  if (template.layoutType === 'korean-wide') {
    const width = 800;
    const padding = 44;
    const gap = 24;
    const photoWidth = width - padding * 2;
    const photoHeight = Math.round(photoWidth * (9 / 16));
    const headerHeight = 80;
    const footerHeight = 100;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + footerHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = bgColor || '#FAF8F5';
    ctx.fillRect(0, 0, width, height);

    if (borderColor) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(14, 14, width - 28, height - 28);
    }

    // Header
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('✦ KOREAN WIDE CUT • 2-SHOTS ✦', width / 2, 52);

    // Photos
    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);
      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight, 12, activeFilter, overlayImg);

      // Shot label
      ctx.fillStyle = '#1C1917';
      ctx.beginPath();
      ctx.roundRect(padding + 16, y + 16, 75, 26, 13);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px "Space Grotesk", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`SHOT 0${i + 1}`, padding + 16 + 37.5, y + 33);
    });

    // Footer
    const footerY = height - 42;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText(`SWEET MEMORIES WITH BESTIES • ${dateStr} • IZIAPHOTO`, width / 2, footerY);
  }

  // =========================================================================
  // 1. VINTAGE NEWSPAPER (Monochrome, B&W Filter, Headlines & Article Columns)
  // =========================================================================
  else if (template.layoutType === 'newspaper' || template.category === 'newspaper') {
    const width = 840;
    const padding = 44;
    const gap = 24;
    const photoWidth = width - padding * 2;
    const photoHeight = 310;
    const headerHeight = 220; // Banner + Masthead + Issue Bar + Big Headline
    const columnsHeight = 130; // 2 Retro text article columns
    const footerHeight = 60;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + columnsHeight + footerHeight;

    canvas.width = width;
    canvas.height = height;

    // Aged Newsprint Monokrom Background
    ctx.fillStyle = bgColor || '#F4EFEB';
    ctx.fillRect(0, 0, width, height);

    // Double Border
    ctx.strokeStyle = textColor || '#111111';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, width - 32, height - 32);
    ctx.lineWidth = 1;
    ctx.strokeRect(22, 22, width - 44, height - 44);

    // Top Edition Bar
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = 'bold 11px "Space Grotesk", serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('★ SPECIAL HISTORIC EDITION • DAILY CHRONICLE ★', width / 2, 44);

    // Grand Newspaper Masthead
    ctx.font = '900 56px "Space Grotesk", serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('THE VINTAGE GAZETTE', width / 2, 100);

    // Issue Meta Bar between two decorative lines
    ctx.beginPath();
    ctx.moveTo(padding, 118);
    ctx.lineTo(width - padding, 118);
    ctx.moveTo(padding, 142);
    ctx.lineTo(width - padding, 142);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = textColor;
    ctx.stroke();

    ctx.font = '600 11px monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText(`VOL. XXIV NO. 9 • PRICE TWO CENTS • ${dateStr} • SPECIAL PHOTO ISSUE`, width / 2, 133);

    // Giant Headline
    ctx.font = '900 24px "Space Grotesk", serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('BREAKING NEWS: MOMENTS OF PURE JOY RECORDED TODAY', width / 2, 178);

    ctx.font = 'italic 13px "Plus Jakarta Sans", serif';
    ctx.letterSpacing = '0.5px';
    ctx.fillText('Photobooth cameras capture spontaneous smiles and historic memories across the nation', width / 2, 202);

    // Thin separator before photos
    ctx.beginPath();
    ctx.moveTo(padding, 214);
    ctx.lineTo(width - padding, 214);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Render Photos with AUTOMATIC B&W FILTER
    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);

      // Photo frame (Dark border typical of letterpress)
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(padding - 3, y - 3, photoWidth + 6, photoHeight - 22);

      // Apply automatic Black & White or user chosen filter
      ctx.save();
      const newsFilter = activeFilter || 'grayscale(100%) contrast(125%) brightness(96%)';
      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight - 28, 0, newsFilter, overlayImg);
      ctx.restore();

      // Editorial Caption under each photo
      ctx.fillStyle = textColor;
      ctx.textAlign = 'left';
      ctx.font = 'italic 12px "Plus Jakarta Sans", serif';
      ctx.fillText(
        `FIG. 0${i + 1} — Live photobooth archival frame recorded in monochrome on ${dateStr}.`,
        padding,
        y + photoHeight - 8
      );
    });

    // Retro Multi-Column Newspaper Article Text below photos
    const colStartY = headerHeight + count * photoHeight + (count - 1) * gap + 10;
    const colWidth = (photoWidth - 36) / 2;

    // Separator line above articles
    ctx.beginPath();
    ctx.moveTo(padding, colStartY);
    ctx.lineTo(width - padding, colStartY);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Article Column 1
    ctx.textAlign = 'left';
    ctx.fillStyle = textColor;
    ctx.font = 'bold 12px "Space Grotesk", serif';
    ctx.fillText('HISTORIC SENSATION OBSERVED', padding, colStartY + 20);

    ctx.font = '11px/15px serif';
    const article1 =
      'In an extraordinary turn of events today, citizens gathered to preserve genuine smiles and camaraderie. Eye-witnesses report unprecedented warmth and cheerfulness recorded on timeless silver-halide print paper. Archivists confirm these candid moments will be cherished for decades.';
    drawWrappedText(ctx, article1, padding, colStartY + 38, colWidth, 15);

    // Vertical column divider
    const dividerX = padding + colWidth + 18;
    ctx.beginPath();
    ctx.moveTo(dividerX, colStartY + 8);
    ctx.lineTo(dividerX, colStartY + columnsHeight - 15);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Article Column 2
    ctx.font = 'bold 12px "Space Grotesk", serif';
    ctx.fillText('EDITORIAL NOTE ON FRIENDSHIP', dividerX + 18, colStartY + 20);

    ctx.font = '11px/15px serif';
    const article2 =
      'Social commentators emphasize that heartfelt connections remain our most valuable heirloom. The historic portraits displayed above serve as an everlasting testament that authentic joy never fades. Published exclusively by IziaPhoto.';
    drawWrappedText(ctx, article2, dividerX + 18, colStartY + 38, colWidth, 15);

    // Footer
    const footerY = height - 32;
    ctx.beginPath();
    ctx.moveTo(padding, footerY - 14);
    ctx.lineTo(width - padding, footerY - 14);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = 'bold 11px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('THE VINTAGE CHRONICLE • ALL ARCHIVES ARE VERIFIED & TIMELESS • 2026', width / 2, footerY);
  }

  // =========================================================================
  // 2. MUSIC PLAYER (SPOTIFY / THE 1975 STYLE)
  // =========================================================================
  else if (template.category === 'music') {
    const width = 680;
    const padding = 36;
    const gap = 16;
    const photoWidth = width - padding * 2;
    const photoHeight = Math.round(photoWidth * (3 / 4));
    const headerHeight = 90;
    const playerControlsHeight = 180;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + playerControlsHeight;

    canvas.width = width;
    canvas.height = height;

    // Spotify Sleek Dark Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Top Bar Header
    ctx.fillStyle = '#A7A7A7';
    ctx.textAlign = 'center';
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('PLAYING FROM ALBUM', width / 2, 40);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px "Space Grotesk", sans-serif';
    ctx.fillText('Live Photobooth • The 1975 Edition', width / 2, 60);

    // Photos
    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);
      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight, 8, activeFilter, overlayImg);
    });

    // Music Player Controller Area
    const playerStartY = height - playerControlsHeight + 20;

    // Song Title & Artist + Heart Icon
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.fillText('About You', padding, playerStartY + 16);

    ctx.fillStyle = '#B3B3B3';
    ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`The 1975 • ${dateStr}`, padding, playerStartY + 38);

    // Heart Icon (Green Spotify Accent)
    ctx.fillStyle = '#1DB954';
    ctx.font = '20px sans-serif';
    ctx.fillText('💚', width - padding - 24, playerStartY + 26);

    // Progress Bar (Green scrubbed bar)
    const barY = playerStartY + 64;
    const barWidth = width - padding * 2;
    const progressWidth = barWidth * 0.65;

    // Background track
    ctx.fillStyle = '#4D4D4D';
    ctx.beginPath();
    ctx.roundRect(padding, barY, barWidth, 6, 3);
    ctx.fill();

    // Played track (Spotify Green)
    ctx.fillStyle = '#1DB954';
    ctx.beginPath();
    ctx.roundRect(padding, barY, progressWidth, 6, 3);
    ctx.fill();

    // Scrub handle dot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(padding + progressWidth, barY + 3, 6, 0, Math.PI * 2);
    ctx.fill();

    // Timestamp labels
    ctx.fillStyle = '#A7A7A7';
    ctx.font = '500 11px "Space Grotesk", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('2:45', padding, barY + 22);
    ctx.textAlign = 'right';
    ctx.fillText('3:58', width - padding, barY + 22);

    // Audio Control Buttons (Shuffle, Prev, Play, Next, Repeat)
    const ctrlY = barY + 50;
    ctx.textAlign = 'center';
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#B3B3B3';
    ctx.fillText('🔀', width / 2 - 120, ctrlY);
    ctx.fillText('⏮️', width / 2 - 60, ctrlY);

    // Play/Pause Big White Circle Button
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(width / 2, ctrlY - 4, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = '16px sans-serif';
    ctx.fillText('⏸️', width / 2, ctrlY + 2);

    ctx.fillStyle = '#B3B3B3';
    ctx.font = '18px sans-serif';
    ctx.fillText('⏭️', width / 2 + 60, ctrlY);
    ctx.fillText('🔁', width / 2 + 120, ctrlY);
  }

  // =========================================================================
  // 3. KOREAN 4-CUT STRIP (PASTEL OR CHECKERBOARD)
  // =========================================================================
  else if (template.category === 'korean') {
    const isChecker = template.id === 'korean-4cut-checker';
    const width = 640;
    const padding = isChecker ? 44 : 32;
    const gap = 20;
    const photoWidth = width - padding * 2;
    const photoHeight = Math.round(photoWidth * (3 / 4));
    const headerHeight = 70;
    const footerHeight = 120;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + footerHeight;

    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Checkerboard outer pattern if selected
    if (isChecker) {
      drawCheckerboardBorder(ctx, width, height, 24, 12);
    } else if (borderColor) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, width - 20, height - 20);
    }

    // Header Branding
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('✦ 인생네컷 • IZIAPHOTO ✦', width / 2, headerHeight / 2 + 8);

    // Photos
    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);
      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight, isChecker ? 2 : 8, activeFilter, overlayImg);
    });

    // Footer
    const footerCenterY = height - footerHeight / 2;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('KOREAN PHOTOBOOTH', width / 2, footerCenterY - 14);

    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(`2026 • ${dateStr}`, width / 2, footerCenterY + 16);
  }

  // =========================================================================
  // 4. RETRO POLAROID / 35MM ROLL FILM (ANALOG SPROCKETS)
  // =========================================================================
  else if (template.category === 'retro-film') {
    const width = 720;
    const sprocketMargin = 60; // Left & Right black borders with sprocket holes
    const gap = 24;
    const photoWidth = width - sprocketMargin * 2;
    const photoHeight = Math.round(photoWidth * (2 / 3)); // 35mm aspect ratio
    const headerHeight = 70;
    const footerHeight = 80;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + footerHeight;

    canvas.width = width;
    canvas.height = height;

    // Black Negative Film Strip Background
    ctx.fillStyle = '#141416';
    ctx.fillRect(0, 0, width, height);

    // Sprocket Holes (Perforations along left & right edges)
    const holeW = 18;
    const holeH = 26;
    const holeGap = 16;
    const holeXLeft = 14;
    const holeXRight = width - 14 - holeW;

    ctx.fillStyle = '#FAF6EF'; // Clear opening inside sprocket
    for (let y = 20; y < height - 30; y += holeH + holeGap) {
      // Left sprocket
      ctx.beginPath();
      ctx.roundRect(holeXLeft, y, holeW, holeH, 4);
      ctx.fill();

      // Right sprocket
      ctx.beginPath();
      ctx.roundRect(holeXRight, y, holeW, holeH, 4);
      ctx.fill();
    }

    // Top Film Info (Kodak Gold / Portra style)
    ctx.fillStyle = '#F59E0B'; // Film golden text
    ctx.textAlign = 'center';
    ctx.font = 'bold 15px "Space Grotesk", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('▶ KODAK PORTRA 400 • 35MM COLOR FILM', width / 2, 45);

    // Photos + Frame Counters
    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);

      // Photo frame
      ctx.fillStyle = '#000000';
      ctx.fillRect(sprocketMargin - 4, y - 4, photoWidth + 8, photoHeight + 8);
      drawCoverImage(ctx, img, sprocketMargin, y, photoWidth, photoHeight, 0, activeFilter, overlayImg);

      // Frame Number in Film Margin
      ctx.fillStyle = '#F59E0B';
      ctx.textAlign = 'left';
      ctx.font = 'bold 12px "Space Grotesk", monospace';
      ctx.fillText(`2${i + 4}A`, holeXLeft + 24, y + 20);

      ctx.textAlign = 'right';
      ctx.fillText(`SAFETY FILM`, holeXRight - 6, y + photoHeight - 10);
    });

    // Footer Film Code
    const footerY = height - 36;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#EF4444'; // Red negative stamp
    ctx.font = 'bold 13px "Space Grotesk", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText(`IZIAPHOTO FILM LAB • ${dateStr} • ISO 400`, width / 2, footerY);
  }

  // =========================================================================
  // 5. CUTE FRUIT / MASCOT CUTOUT (CIRCULAR FRAMES + STICKERS)
  // =========================================================================
  else if (template.category === 'cute') {
    const width = 680;
    const padding = 36;
    const gap = 30;
    const circleDiameter = 220;
    const circleRadius = circleDiameter / 2;
    const headerHeight = 90;
    const footerHeight = 110;
    const height = headerHeight + count * (circleDiameter + gap) + footerHeight;

    canvas.width = width;
    canvas.height = height;

    // Soft Sweet Pastel Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Cute border
    ctx.strokeStyle = borderColor || '#FECDD3';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // Cute Header
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('🍓 SWEET BERRY PHOTOBOOTH 🍑', width / 2, 55);

    // Circular Cutouts with Sweet Mascot Border
    const fruitIcons = ['🍓', '🍑', '🍒'];
    images.forEach((img, i) => {
      const cy = headerHeight + circleRadius + i * (circleDiameter + gap);
      const cx = width / 2;

      // Decorative white cloud/pill background card
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(padding, cy - circleRadius - 12, width - padding * 2, circleDiameter + 24, 28);
      ctx.fill();

      // Outer ring for circle photo
      ctx.strokeStyle = template.theme.accent;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(cx, cy, circleRadius + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Circle cropped photo
      drawCircleImage(ctx, img, cx, cy, circleRadius, activeFilter, overlayImg);

      // Mascot sticker emojis on sides
      ctx.font = '32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(fruitIcons[i % fruitIcons.length], padding + 40, cy + 10);
      ctx.fillText('✨', width - padding - 40, cy + 10);
    });

    // Cute Footer
    const footerY = height - 48;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px "Caveat", cursive, sans-serif';
    ctx.fillText(`♡ Cutest Moments • ${dateStr} • 2026 ♡`, width / 2, footerY);
  }

  // =========================================================================
  // 6. RECEIPT / STRUK BELANJA (THERMAL PAPER, BARCODE, TIMESTAMPS)
  // =========================================================================
  else if (template.category === 'receipt') {
    const width = 640;
    const padding = 40;
    const gap = 20;
    const photoWidth = width - padding * 2;
    const photoHeight = Math.round(photoWidth * (3 / 4));
    const headerHeight = 160;
    const receiptFooterHeight = 240;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + receiptFooterHeight;

    canvas.width = width;
    canvas.height = height;

    // Thermal Off-White Paper Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Top Zigzag Perforated Cut Edge
    ctx.fillStyle = '#0C0D12'; // Cutout matches dark background
    const toothSize = 14;
    for (let x = 0; x < width; x += toothSize * 2) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + toothSize, toothSize);
      ctx.lineTo(x + toothSize * 2, 0);
      ctx.fill();
    }

    // Bottom Zigzag Perforated Cut Edge
    for (let x = 0; x < width; x += toothSize * 2) {
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + toothSize, height - toothSize);
      ctx.lineTo(x + toothSize * 2, height);
      ctx.fill();
    }

    // Receipt Header
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px "Space Grotesk", monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText('*** IZIAPHOTO MART & CAFE ***', width / 2, 55);

    ctx.font = '500 12px monospace';
    ctx.fillText('STORE #2026 • DIGITAL PHOTOBOOTH MEMORIES', width / 2, 78);
    ctx.fillText(`RECEIPT NO: #SM-8849202  |  DATE: ${dateStr}`, width / 2, 98);

    // Dotted separator line
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, 118);
    ctx.lineTo(width - padding, 118);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Photos
    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);
      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight, 0, activeFilter, overlayImg);

      // Photo slip label
      ctx.fillStyle = textColor;
      ctx.textAlign = 'left';
      ctx.font = '500 11px monospace';
      ctx.fillText(`[PHOTO ITEM #0${i + 1}] — CAPTURED AT 14:${40 + i * 2}`, padding, y + photoHeight + 14);
    });

    // Receipt Itemized Price Details
    const itemsY = height - receiptFooterHeight + 35;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, itemsY);
    ctx.lineTo(width - padding, itemsY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = '600 13px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SWEET MEMORIES ............ 3x  $0.00', padding, itemsY + 28);
    ctx.fillText('UNLIMITED GOOD VIBES ...... 1x  $0.00', padding, itemsY + 50);
    ctx.fillText('LIFETIME HAPPINESS ........ 1x  $0.00', padding, itemsY + 72);

    ctx.font = 'bold 15px monospace';
    ctx.fillText('TOTAL: ........................ FREE!', padding, itemsY + 104);

    // Barcode Graphic at Bottom
    const barcodeY = itemsY + 125;
    ctx.fillStyle = textColor;
    // Draw series of vertical bars simulating a retail barcode
    const barcodeStartX = width / 2 - 120;
    const barcodeWidths = [2, 4, 1, 3, 2, 5, 1, 4, 2, 1, 3, 4, 2, 1, 5, 2, 3, 1, 4, 2, 3, 1, 4, 2, 1, 3, 4, 2];
    let curX = barcodeStartX;
    barcodeWidths.forEach((w) => {
      ctx.fillRect(curX, barcodeY, w, 32);
      curX += w + 4;
    });

    ctx.textAlign = 'center';
    ctx.font = '500 11px monospace';
    ctx.fillText('||| 2026 0909 8849 |||', width / 2, barcodeY + 48);

    ctx.font = 'italic 12px monospace';
    ctx.fillText('*** THANK YOU FOR VISITING IZIAPHOTO ***', width / 2, barcodeY + 70);
  }

  // =========================================================================
  // 7. CLASSIC POLAROID 600 (Single Shot Classic Instant Frame)
  // =========================================================================
  else if (template.layoutType === 'polaroid-single' || (template.category === 'polaroid' && count === 1)) {
    const width = 720;
    const padding = 44;
    const photoWidth = width - padding * 2;
    const photoHeight = photoWidth; // 1:1 square classic format
    const topMargin = 50;
    const bottomMargin = 170;
    const height = topMargin + photoHeight + bottomMargin;

    canvas.width = width;
    canvas.height = height;

    // Classic Polaroid White Paper
    ctx.fillStyle = bgColor || '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Subtle outer border
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Top washi tape accent
    ctx.fillStyle = '#FDE68A';
    ctx.globalAlpha = 0.85;
    ctx.fillRect(width / 2 - 60, 6, 120, 24);
    ctx.globalAlpha = 1.0;

    // Photo
    drawCoverImage(ctx, images[0], padding, topMargin, photoWidth, photoHeight, 2, activeFilter, overlayImg);

    // Subtle inner border around photo
    ctx.strokeStyle = '#1F2937';
    ctx.lineWidth = 1;
    ctx.strokeRect(padding, topMargin, photoWidth, photoHeight);

    // Handwritten cursive text in thick bottom margin
    ctx.fillStyle = textColor || '#1F2937';
    ctx.textAlign = 'center';
    ctx.font = 'bold 34px "Caveat", "Brush Script MT", cursive, sans-serif';
    ctx.fillText('Our Little Moments ♡', width / 2, topMargin + photoHeight + 68);

    ctx.font = '500 13px "Space Grotesk", monospace';
    ctx.letterSpacing = '2px';
    ctx.fillStyle = '#6B7280';
    ctx.fillText(`POLAROID 600 • ${dateStr} • IZIAPHOTO`, width / 2, topMargin + photoHeight + 110);
  }

  // =========================================================================
  // 8. DUAL POLAROID STACK (2 Stacked Polaroids with Washi Tape)
  // =========================================================================
  else if (template.layoutType === 'polaroid-dual' || (template.category === 'polaroid' && count === 2)) {
    const width = 720;
    const padding = 44;
    const photoWidth = width - padding * 2;
    const photoHeight = Math.round(photoWidth * (3 / 4));
    const headerHeight = 70;
    const footerHeight = 90;
    const gap = 36;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + footerHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = bgColor || '#FDFBF7';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = textColor || '#292524';
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('✦ DUAL POLAROID MEMORIES ✦', width / 2, 45);

    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);

      // Card backing
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(padding - 6, y - 6, photoWidth + 12, photoHeight + 12);
      ctx.strokeStyle = '#E7E5E4';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(padding - 6, y - 6, photoWidth + 12, photoHeight + 12);

      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight, 0, activeFilter, overlayImg);

      // Washi tape accent in corner
      ctx.fillStyle = i === 0 ? '#FDE68A' : '#FECDD3';
      ctx.globalAlpha = 0.85;
      ctx.fillRect(padding + 12, y - 14, 60, 18);
      ctx.globalAlpha = 1.0;
    });

    const footerY = height - 38;
    ctx.fillStyle = textColor || '#292524';
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px "Caveat", cursive, sans-serif';
    ctx.fillText(`Captured with love • ${dateStr} • IziaPhoto`, width / 2, footerY);
  }

  // =========================================================================
  // 9. Y2K CYBER SILVER (CD Prism Chrome Metallic)
  // =========================================================================
  else if (template.layoutType === 'y2k-chrome' || template.category === 'y2k') {
    const width = 640;
    const padding = 36;
    const gap = 20;
    const photoWidth = width - padding * 2;
    const photoHeight = Math.round(photoWidth * (3 / 4));
    const headerHeight = 85;
    const footerHeight = 110;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + footerHeight;

    canvas.width = width;
    canvas.height = height;

    // Metallic silver chrome linear gradient
    const chromeGrad = ctx.createLinearGradient(0, 0, width, height);
    chromeGrad.addColorStop(0, '#E2E8F0');
    chromeGrad.addColorStop(0.3, '#F8FAFC');
    chromeGrad.addColorStop(0.5, '#CBD5E1');
    chromeGrad.addColorStop(0.7, '#F1F5F9');
    chromeGrad.addColorStop(1, '#94A3B8');
    ctx.fillStyle = chromeGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Header Y2K
    ctx.fillStyle = '#0F172A';
    ctx.textAlign = 'center';
    ctx.font = '900 24px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('✦ CYBER 2000 • CD PRISM ✦', width / 2, 54);

    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);

      ctx.fillStyle = '#0F172A';
      ctx.fillRect(padding - 4, y - 4, photoWidth + 8, photoHeight + 8);
      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight, 0, activeFilter, overlayImg);

      ctx.font = '24px sans-serif';
      ctx.fillStyle = '#6366F1';
      ctx.fillText('✦', padding + 24, y + 32);
      ctx.fillText('✧', width - padding - 24, y + photoHeight - 16);
    });

    const footerY = height - 42;
    ctx.fillStyle = '#0F172A';
    ctx.textAlign = 'center';
    ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(`★ FUTURE NOSTALGIA • ${dateStr} ★`, width / 2, footerY);
  }

  // =========================================================================
  // 10. PASSPORT & ID PHOTO (6 Slots 2x3 Grid Sheet)
  // =========================================================================
  else if (template.layoutType === 'passport-grid' || template.category === 'passport') {
    const width = 800;
    const padding = 44;
    const cols = 2;
    const rows = 3;
    const gapX = 20;
    const gapY = 20;
    const cellWidth = Math.round((width - padding * 2 - (cols - 1) * gapX) / cols);
    const cellHeight = Math.round(cellWidth * (4 / 3));
    const headerHeight = 100;
    const footerHeight = 90;
    const height = headerHeight + rows * cellHeight + (rows - 1) * gapY + footerHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = bgColor || '#F8FAFC';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    ctx.strokeRect(14, 14, width - 28, height - 28);
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.fillStyle = '#0F172A';
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('OFFICIAL PASSPORT & ID PHOTOBOOTH', width / 2, 55);

    ctx.font = '600 12px "Space Grotesk", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillStyle = '#2563EB';
    ctx.fillText('REGISTRATION: #IZIA-2026 • 2x3 PASFOTO ID SHEET', width / 2, 78);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const img = images[idx % images.length];
        const x = padding + c * (cellWidth + gapX);
        const y = headerHeight + r * (cellHeight + gapY);

        ctx.fillStyle = '#E2E8F0';
        ctx.fillRect(x - 2, y - 2, cellWidth + 4, cellHeight + 4);
        drawCoverImage(ctx, img, x, y, cellWidth, cellHeight, 0, activeFilter, overlayImg);

        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 6);
        ctx.lineTo(x + 10, y + 16);
        ctx.moveTo(x + 6, y + 10);
        ctx.lineTo(x + 16, y + 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + cellWidth - 10, y + cellHeight - 6);
        ctx.lineTo(x + cellWidth - 10, y + cellHeight - 16);
        ctx.moveTo(x + cellWidth - 6, y + cellHeight - 10);
        ctx.lineTo(x + cellWidth - 16, y + cellHeight - 10);
        ctx.stroke();
      }
    }

    const stampX = width - padding - 80;
    const stampY = height - footerHeight / 2 - 10;
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(stampX, stampY, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#2563EB';
    ctx.textAlign = 'center';
    ctx.font = 'bold 8px "Space Grotesk", monospace';
    ctx.fillText('IZIAPHOTO', stampX, stampY - 8);
    ctx.fillText('VERIFIED', stampX, stampY + 2);
    ctx.fillText('2026', stampX, stampY + 12);

    ctx.fillStyle = '#475569';
    ctx.textAlign = 'left';
    ctx.font = '600 12px "Space Grotesk", monospace';
    ctx.fillText(`AUTHENTIC PHOTO IDENTIFICATION • ISSUED: ${dateStr}`, padding, height - 38);
  }

  // =========================================================================
  // 11. ROMANTIC FLORAL ROMANCE (4 Slots Botanical Vines)
  // =========================================================================
  else if (template.layoutType === 'floral-romance' || template.category === 'floral') {
    const width = 640;
    const padding = 36;
    const gap = 22;
    const photoWidth = width - padding * 2;
    const photoHeight = Math.round(photoWidth * (3 / 4));
    const headerHeight = 90;
    const footerHeight = 110;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + footerHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = bgColor || '#FFFBEB';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 2;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    ctx.fillStyle = '#831843';
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px "Caveat", "Brush Script MT", cursive, serif';
    ctx.fillText('🌹 Floral Romance • Rose Edition 🌹', width / 2, 55);

    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);

      ctx.fillStyle = '#FFF1F2';
      ctx.fillRect(padding - 4, y - 4, photoWidth + 8, photoHeight + 8);
      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight, 4, activeFilter, overlayImg);

      ctx.font = '22px sans-serif';
      ctx.fillText('🌸', padding + 16, y + 24);
      ctx.fillText('🌿', width - padding - 16, y + photoHeight - 12);
    });

    const footerY = height - 44;
    ctx.fillStyle = '#831843';
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px "Caveat", cursive, sans-serif';
    ctx.fillText(`♡ Cherished Love & Memories • ${dateStr} ♡`, width / 2, footerY);
  }

  // =========================================================================
  // 12. CINEMA FILM STRIP / MOVIE TICKET (2 Slots Retro Ticket)
  // =========================================================================
  else if (template.layoutType === 'cinema-ticket' || template.category === 'cinema') {
    const width = 720;
    const padding = 44;
    const gap = 24;
    const photoWidth = width - padding * 2;
    const photoHeight = Math.round(photoWidth * (9 / 16));
    const headerHeight = 110;
    const footerHeight = 120;
    const height = headerHeight + count * photoHeight + (count - 1) * gap + footerHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = bgColor || '#FEF2F2';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 3;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // Left and Right Ticket Notch Cutouts
    ctx.fillStyle = '#0C0D12';
    const notchRadius = 24;
    const notchY = headerHeight + photoHeight + gap / 2;
    ctx.beginPath();
    ctx.arc(0, notchY, notchRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width, notchY, notchRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#7F1D1D';
    ctx.textAlign = 'center';
    ctx.font = '900 24px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('🎟️ CINEMA MOVIE TICKET • ADMIT ONE 🎟️', width / 2, 54);

    ctx.font = '600 12px "Space Grotesk", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('SPECIAL PREMIERE • AUDITORIUM 04 • SEAT A-12', width / 2, 80);

    images.forEach((img, i) => {
      const y = headerHeight + i * (photoHeight + gap);
      drawCoverImage(ctx, img, padding, y, photoWidth, photoHeight, 6, activeFilter, overlayImg);

      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.roundRect(padding + 16, y + 16, 80, 24, 6);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`SCENE 0${i + 1}`, padding + 16 + 40, y + 32);
    });

    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - footerHeight + 15);
    ctx.lineTo(width - padding, height - footerHeight + 15);
    ctx.stroke();
    ctx.setLineDash([]);

    const barcodeY = height - footerHeight + 35;
    ctx.fillStyle = '#7F1D1D';
    const barcodeStartX = width / 2 - 110;
    const barcodeWidths = [2, 3, 1, 4, 2, 5, 1, 3, 2, 1, 4, 3, 2, 1, 4, 2, 3, 1, 3, 2, 4, 1, 3, 2];
    let curX = barcodeStartX;
    barcodeWidths.forEach((w) => {
      ctx.fillRect(curX, barcodeY, w, 36);
      curX += w + 5;
    });

    ctx.textAlign = 'center';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`||| TICKET #8849-2026 • DATE: ${dateStr} |||`, width / 2, barcodeY + 54);
  }

  return canvas;
}

/**
 * Download canvas directly as PNG
 */
export function downloadCanvas(canvas: HTMLCanvasElement, filename = 'iziaphoto-photobooth.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
