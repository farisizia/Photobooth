/**
 * CANVAS COMPOSITOR MODULE - SNAPBOOTH
 * Draws 4 photos + template + filters + text into a high-res photobooth strip.
 */

const CanvasRenderer = (function () {
  const PHOTO_W = 720;   // Internal photo slot width
  const PHOTO_H = 960;   // 3:4 portrait
  const GAP = 28;
  const PAD_X = 36;
  const FOOTER_H = 160;

  // Loaded HTMLImageElement cache
  const imageCache = [];

  const templates = {
    'classic-strip': {
      layout: 'strip',
      padX: 36, padTop: 36, gap: 24, footerH: 150,
      photoRadius: 8, polaroidPad: 0
    },
    'grid-2x2': {
      layout: 'grid',
      padX: 28, padTop: 28, gap: 16, footerH: 140,
      photoRadius: 12, polaroidPad: 0
    },
    'polaroid': {
      layout: 'strip',
      padX: 40, padTop: 40, gap: 40, footerH: 80,
      photoRadius: 4, polaroidPad: 48
    },
    'minimal-noir': {
      layout: 'strip',
      padX: 20, padTop: 20, gap: 12, footerH: 140,
      photoRadius: 0, polaroidPad: 0
    },
    'cute-pastel': {
      layout: 'strip',
      padX: 32, padTop: 32, gap: 20, footerH: 170,
      photoRadius: 16, polaroidPad: 0
    },
    'retro-film': {
      layout: 'strip',
      padX: 48, padTop: 48, gap: 16, footerH: 160,
      photoRadius: 0, polaroidPad: 0
    }
  };

  /**
   * Convert data URLs into HTMLImageElement so canvas can draw them
   * @param {string[]} dataUrls
   */
  async function loadPhotos(dataUrls) {
    const promises = dataUrls.map((url, i) => {
      return new Promise((resolve, reject) => {
        if (!url) { resolve(null); return; }
        const img = new Image();
        img.onload = () => {
          imageCache[i] = img;
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      });
    });
    await Promise.all(promises);
  }

  /**
   * Apply CSS-like filter onto a source image, return a new canvas
   * @param {HTMLImageElement} img
   * @param {string} filterName
   * @returns {HTMLCanvasElement}
   */
  function applyFilter(img, filterName) {
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');

    switch (filterName) {
      case 'bnw':
        ctx.filter = 'grayscale(100%) contrast(1.1)';
        break;
      case 'vintage':
        ctx.filter = 'sepia(0.45) contrast(1.05) brightness(0.95) saturate(0.8)';
        break;
      case 'warm':
        ctx.filter = 'sepia(0.25) saturate(1.3) brightness(1.05) hue-rotate(-8deg)';
        break;
      case 'cool':
        ctx.filter = 'saturate(0.85) brightness(1.05) hue-rotate(12deg) contrast(1.05)';
        break;
      case 'sepia':
        ctx.filter = 'sepia(0.85) contrast(1.05)';
        break;
      default:
        ctx.filter = 'none';
    }

    ctx.drawImage(img, 0, 0);

    // Extra vintage grain overlay
    if (filterName === 'vintage' || filterName === 'retro') {
      ctx.filter = 'none';
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#8B5A2B';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.globalAlpha = 1;
    }

    return c;
  }

  /**
   * Draw rounded rectangle path
   */
  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function getContrastText(hex) {
    if (!hex) return '#111111';
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.62 ? '#111111' : '#FFFFFF';
  }

  /**
   * Compute canvas size based on template layout
   */
  function computeSize(tpl) {
    if (tpl.layout === 'grid') {
      const w = PAD_X * 2 + PHOTO_W * 2 + tpl.gap;
      const h = tpl.padTop + PHOTO_H * 2 + tpl.gap + tpl.footerH;
      return { w, h, photoW: PHOTO_W, photoH: PHOTO_H };
    }
    // Strip (4 stacked photos)
    const extraPolaroid = tpl.polaroidPad || 0;
    const w = tpl.padX * 2 + PHOTO_W;
    const h = tpl.padTop + (PHOTO_H + extraPolaroid) * 4 + tpl.gap * 3 + tpl.footerH;
    return { w, h, photoW: PHOTO_W, photoH: PHOTO_H };
  }

  /**
   * Draw decorative elements depending on template
   */
  function drawDecor(ctx, w, h, templateId, bgColor, textColor) {
    if (templateId === 'cute-pastel') {
      ctx.save();
      ctx.font = '28px serif';
      ctx.globalAlpha = 0.55;
      const hearts = [
        [w - 70, 50], [40, h - 80], [w - 50, h * 0.35],
        [30, h * 0.55], [w - 80, h * 0.72]
      ];
      hearts.forEach(([x, y], i) => {
        ctx.fillText(i % 2 === 0 ? '♡' : '✦', x, y);
      });
      ctx.restore();
    }

    if (templateId === 'retro-film') {
      // Film sprocket holes
      ctx.save();
      ctx.fillStyle = '#111';
      const holeW = 22, holeH = 16, holeGap = 28;
      for (let y = 20; y < h - 20; y += holeGap) {
        ctx.fillRect(10, y, holeW, holeH);
        ctx.fillRect(w - 10 - holeW, y, holeW, holeH);
      }
      ctx.restore();
    }
  }

  /**
   * Draw footer text (event, caption, date, sticker)
   */
  function drawFooter(ctx, x, y, w, h, options, textColor) {
    const { eventName, caption, dateText, sticker, templateId } = options;
    ctx.save();
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const cx = x + w / 2;

    if (templateId === 'polaroid') {
      ctx.font = '700 42px "Caveat", cursive';
      ctx.fillText(eventName || 'SNAPBOOTH', cx, y + h * 0.4);
      ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
      ctx.globalAlpha = 0.7;
      ctx.fillText(dateText || '', cx, y + h * 0.75);
    } else if (templateId === 'cute-pastel') {
      ctx.font = '700 48px "Caveat", cursive';
      ctx.fillText((sticker && sticker !== 'none' ? sticker + ' ' : '') + (eventName || 'SNAPBOOTH'), cx, y + 48);
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.globalAlpha = 0.75;
      ctx.fillText(caption || '', cx, y + 92);
      ctx.font = '500 18px "Space Grotesk", sans-serif';
      ctx.fillText(dateText || '', cx, y + 122);
    } else if (templateId === 'minimal-noir') {
      ctx.font = '700 28px "Space Grotesk", sans-serif';
      ctx.letterSpacing = '0.18em';
      ctx.fillText((eventName || 'SNAPBOOTH').toUpperCase(), cx, y + 50);
      ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
      ctx.globalAlpha = 0.7;
      ctx.letterSpacing = '0.12em';
      ctx.fillText((caption || '').toUpperCase(), cx, y + 86);
      ctx.fillText(dateText || '', cx, y + 114);
    } else if (templateId === 'retro-film') {
      ctx.font = '700 26px "Space Grotesk", sans-serif';
      ctx.fillText((eventName || 'SNAPBOOTH').toUpperCase(), cx, y + 50);
      ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
      ctx.globalAlpha = 0.8;
      ctx.fillText(caption || '', cx, y + 86);
      ctx.fillText('▲ ' + (dateText || '') + ' ▲', cx, y + 116);
    } else {
      // Classic / Grid default
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(eventName || 'SNAPBOOTH', cx, y + 48);
      if (sticker && sticker !== 'none') {
        ctx.font = '28px serif';
        ctx.fillText(sticker, cx - ctx.measureText(eventName || 'SNAPBOOTH').width / 2 - 36, y + 50);
      }
      ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
      ctx.globalAlpha = 0.75;
      ctx.fillText(caption || '', cx, y + 86);
      ctx.font = '500 16px "Space Grotesk", sans-serif';
      ctx.fillText(dateText || '', cx, y + 116);
    }

    ctx.restore();
  }

  /**
   * Draw a photo into a slot, covering the target box (object-fit: cover)
   */
  function drawCover(ctx, source, dx, dy, dw, dh, radius) {
    const sw = source.width;
    const sh = source.height;
    const sRatio = sw / sh;
    const dRatio = dw / dh;

    let sx = 0, sy = 0, sW = sw, sH = sh;
    if (sRatio > dRatio) {
      sW = sh * dRatio;
      sx = (sw - sW) / 2;
    } else {
      sH = sw / dRatio;
      sy = (sh - sH) / 2;
    }

    ctx.save();
    if (radius > 0) {
      roundRect(ctx, dx, dy, dw, dh, radius);
      ctx.clip();
    }
    ctx.drawImage(source, sx, sy, sW, sH, dx, dy, dw, dh);
    ctx.restore();
  }

  /**
   * Main render: compose 4 photos + template onto #final-canvas
   * @param {HTMLCanvasElement} canvas
   * @param {object} options
   */
  function render(canvas, options) {
    const {
      templateId = 'classic-strip',
      bgColor = '#FFFFFF',
      filter = 'normal',
      eventName = 'SNAPBOOTH',
      caption = 'MEMORIES TO KEEP',
      dateText = '09.09.2026',
      sticker = 'none'
    } = options;

    const tpl = templates[templateId] || templates['classic-strip'];
    const size = computeSize(tpl);
    canvas.width = size.w;
    canvas.height = size.h;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size.w, size.h);

    const textColor = getContrastText(bgColor);

    // Decorative background extras
    drawDecor(ctx, size.w, size.h, templateId, bgColor, textColor);

    // Polaroid inner card color (slightly off-white)
    const innerCard = templateId === 'polaroid' ? '#FAFAF7' : null;

    const photos = imageCache;

    if (tpl.layout === 'grid') {
      const positions = [
        { x: tpl.padX, y: tpl.padTop },
        { x: tpl.padX + PHOTO_W + tpl.gap, y: tpl.padTop },
        { x: tpl.padX, y: tpl.padTop + PHOTO_H + tpl.gap },
        { x: tpl.padX + PHOTO_W + tpl.gap, y: tpl.padTop + PHOTO_H + tpl.gap }
      ];
      positions.forEach((pos, i) => {
        if (!photos[i]) return;
        const filtered = applyFilter(photos[i], filter);
        drawCover(ctx, filtered, pos.x, pos.y, PHOTO_W, PHOTO_H, tpl.photoRadius);
      });
      drawFooter(ctx, 0, size.h - tpl.footerH, size.w, tpl.footerH, { eventName, caption, dateText, sticker, templateId }, textColor);
    } else {
      // Vertical strip
      let y = tpl.padTop;
      const extra = tpl.polaroidPad || 0;
      for (let i = 0; i < 4; i++) {
        const slotX = tpl.padX;
        const slotY = y;
        const slotW = PHOTO_W;
        const slotH = PHOTO_H;

        if (templateId === 'polaroid') {
          // Polaroid card behind photo
          ctx.save();
          ctx.fillStyle = innerCard;
          ctx.shadowColor = 'rgba(0,0,0,0.18)';
          ctx.shadowBlur = 18;
          ctx.shadowOffsetY = 6;
          roundRect(ctx, slotX - 8, slotY - 8, slotW + 16, slotH + extra, 6);
          ctx.fill();
          ctx.restore();
        }

        if (photos[i]) {
          const filtered = applyFilter(photos[i], filter);
          drawCover(ctx, filtered, slotX, slotY, slotW, slotH, tpl.photoRadius);
        } else {
          ctx.fillStyle = '#e5e7eb';
          ctx.fillRect(slotX, slotY, slotW, slotH);
        }

        // Polaroid mini caption under each photo
        if (templateId === 'polaroid') {
          ctx.save();
          ctx.fillStyle = '#444';
          ctx.font = '600 22px "Caveat", cursive';
          ctx.textAlign = 'center';
          ctx.fillText('Pose ' + (i + 1), slotX + slotW / 2, slotY + slotH + extra * 0.55);
          ctx.restore();
        }

        y += PHOTO_H + extra + tpl.gap;
      }

      drawFooter(ctx, 0, size.h - tpl.footerH, size.w, tpl.footerH, { eventName, caption, dateText, sticker, templateId }, textColor);
    }

    // Outer border for some templates
    if (templateId === 'classic-strip' || templateId === 'cute-pastel') {
      ctx.save();
      ctx.strokeStyle = textColor;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, size.w - 20, size.h - 20);
      ctx.restore();
    }
  }

  /**
   * Export canvas as PNG blob
   */
  function toBlob(canvas, type = 'image/png', quality = 0.95) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), type, quality);
    });
  }

  /**
   * Export canvas as data URL
   */
  function toDataURL(canvas, type = 'image/png', quality = 0.95) {
    return canvas.toDataURL(type, quality);
  }

  return {
    loadPhotos,
    render,
    toBlob,
    toDataURL,
    templates
  };
})();
