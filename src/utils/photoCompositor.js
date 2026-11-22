/**
 * PHOODLE 3-Layer Offscreen Canvas Compositor
 * Memastikan hasil export PNG/JPG 100% menggabungkan:
 * Layer 1 (Bawah): Foto jepretan dipotong rounded rect dengan rasio cover
 * Layer 2 (Tengah): Frame PHOODLE dengan lubang transparan (destination-out)
 * Layer 3 (Atas): Coretan doodle & stiker dari Fabric.js
 */

// Helper fallback untuk rounded rectangle path
function drawRoundRectPath(ctx, x, y, width, height, radius = 16) {
  if (ctx.roundRect) {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

// Helper untuk load gambar via Promise
function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => {
      console.warn('Gagal memuat gambar:', src, e);
      resolve(null);
    };
    img.src = src;
  });
}

// Koordinat slot berdasarkan layout
export function getLayoutSlots(layoutId) {
  if (layoutId === 'grid-2x2') {
    const slotWidth = 430;
    const slotHeight = 430;
    return [
      { x: 50, y: 130, width: slotWidth, height: slotHeight },
      { x: 520, y: 130, width: slotWidth, height: slotHeight },
      { x: 50, y: 590, width: slotWidth, height: slotHeight },
      { x: 520, y: 590, width: slotWidth, height: slotHeight },
    ];
  } else if (layoutId === 'strip-4') {
    const slotWidth = 480;
    const slotHeight = 360;
    const x = 60;
    return [
      { x, y: 140, width: slotWidth, height: slotHeight },
      { x, y: 525, width: slotWidth, height: slotHeight },
      { x, y: 910, width: slotWidth, height: slotHeight },
      { x, y: 1295, width: slotWidth, height: slotHeight },
    ];
  } else {
    // Default strip-3
    const slotWidth = 480;
    const slotHeight = 390;
    const x = 60;
    return [
      { x, y: 150, width: slotWidth, height: slotHeight },
      { x, y: 570, width: slotWidth, height: slotHeight },
      { x, y: 990, width: slotWidth, height: slotHeight },
    ];
  }
}

/**
 * Layer 2: Generator Frame Overlay Mandiri dengan LUBANG TRANSPARAN PENUH (alpha = 0)
 * Menggunakan destination-out sehingga foto di bawahnya terlihat utuh.
 */
export function createTransparentFrameCanvas(
  currentFrame,
  slots,
  baseWidth,
  baseHeight,
  userTier,
  showWatermark = true,
  customFooterText = ''
) {
  const frameCanvas = document.createElement('canvas');
  frameCanvas.width = baseWidth;
  frameCanvas.height = baseHeight;
  const fCtx = frameCanvas.getContext('2d');

  const frameId = currentFrame.id;
  const isProTier = userTier === 'pro';

  // Support options object if passed as 6th parameter
  let shouldShowWatermark = showWatermark;
  let customText = customFooterText;
  if (typeof showWatermark === 'object' && showWatermark !== null) {
    shouldShowWatermark = showWatermark.showWatermark !== undefined
      ? Boolean(showWatermark.showWatermark)
      : (userTier !== 'pro');
    customText = showWatermark.customFooterText || '';
  }

  // 1. Gambar background frame solid
  fCtx.fillStyle = currentFrame.bgColor || '#FFFFFF';
  fCtx.fillRect(0, 0, baseWidth, baseHeight);

  // 2. Ornamen khusus di bawah lubang (jika ada)
  if (frameId === 'frame-campus-event-edition') {
    // Top varsity pennant
    fCtx.fillStyle = '#F59E0B';
    fCtx.beginPath();
    drawRoundRectPath(fCtx, 60, 35, baseWidth - 120, 55, 14);
    fCtx.fill();
  }

  // 3. LUBANGI SLOT FOTO SECARA TRANSPARAN (destination-out)
  fCtx.globalCompositeOperation = 'destination-out';
  slots.forEach((slot) => {
    fCtx.beginPath();
    drawRoundRectPath(fCtx, slot.x, slot.y, slot.width, slot.height, 16);
    fCtx.fill();
  });

  // 4. KEMBALIKAN KE SOURCE-OVER untuk menggambar ornamen, garis tepi, dan teks
  fCtx.globalCompositeOperation = 'source-over';

  // Gambar garis tepi (stroke) slot
  fCtx.strokeStyle = currentFrame.borderColor || '#CBD5E1';
  fCtx.lineWidth = 3;
  slots.forEach((slot) => {
    fCtx.beginPath();
    drawRoundRectPath(fCtx, slot.x, slot.y, slot.width, slot.height, 16);
    fCtx.stroke();
  });

  // Garis tepi luar frame
  fCtx.strokeStyle = currentFrame.borderColor || '#E2E8F0';
  fCtx.lineWidth = frameId === 'frame-campus-event-edition' ? 4 : 3;
  fCtx.beginPath();
  drawRoundRectPath(fCtx, 14, 14, baseWidth - 28, baseHeight - 28, 20);
  fCtx.stroke();

  // Ornamen Retro Film Strip (Gerigi film sprocket)
  if (frameId === 'frame-retro-film-strip') {
    fCtx.fillStyle = '#FFFFFF';
    for (let y = 30; y < baseHeight - 40; y += 50) {
      // Lubang kiri
      fCtx.beginPath();
      drawRoundRectPath(fCtx, 16, y, 24, 32, 6);
      fCtx.fill();
      // Lubang kanan
      fCtx.beginPath();
      drawRoundRectPath(fCtx, baseWidth - 40, y, 24, 32, 6);
      fCtx.fill();
    }

    fCtx.font = '700 16px monospace';
    fCtx.fillStyle = '#EA580C';
    fCtx.fillText('▶ 24A   KODAK 400', 65, 545);
    fCtx.fillText('▶ 25   SAFETY FILM', 65, 965);
  }

  // Ornamen Y2K Silver Chrome (Sudut siber)
  if (frameId === 'frame-y2k-silver-chrome') {
    fCtx.strokeStyle = '#38BDF8';
    fCtx.lineWidth = 4;
    // Top-Left
    fCtx.beginPath();
    fCtx.moveTo(30, 70);
    fCtx.lineTo(30, 30);
    fCtx.lineTo(70, 30);
    fCtx.stroke();
    // Top-Right
    fCtx.beginPath();
    fCtx.moveTo(baseWidth - 70, 30);
    fCtx.lineTo(baseWidth - 30, 30);
    fCtx.lineTo(baseWidth - 30, 70);
    fCtx.stroke();
    // Bottom-Left
    fCtx.strokeStyle = '#F43F5E';
    fCtx.beginPath();
    fCtx.moveTo(30, baseHeight - 70);
    fCtx.lineTo(30, baseHeight - 30);
    fCtx.lineTo(70, baseHeight - 30);
    fCtx.stroke();
    // Bottom-Right
    fCtx.beginPath();
    fCtx.moveTo(baseWidth - 70, baseHeight - 30);
    fCtx.lineTo(baseWidth - 30, baseHeight - 30);
    fCtx.lineTo(baseWidth - 30, baseHeight - 70);
    fCtx.stroke();
  }

  // Header Tagline
  const isCampus = frameId === 'frame-campus-event-edition';
  fCtx.font = "900 20px 'Plus Jakarta Sans', Arial, sans-serif";
  fCtx.textAlign = 'center';
  fCtx.textBaseline = 'middle';
  fCtx.fillStyle = isCampus ? '#0F172A' : (currentFrame.textColor || '#1E293B');
  fCtx.fillText(currentFrame.tagline || 'PHOODLE PHOTOBOOTH • 2026', baseWidth / 2, isCampus ? 62 : 65);

  // Footer Branding
  const footerY = baseHeight - 90;
  fCtx.font = "900 24px 'Plus Jakarta Sans', Arial, sans-serif";
  fCtx.fillStyle = currentFrame.textColor || '#1E293B';
  const brandTitle = frameId === 'frame-retro-film-strip'
    ? 'PHOODLE FILM CO. • 35MM'
    : frameId === 'frame-campus-event-edition'
    ? 'COLLEGE MEMORIES • 2026'
    : 'PHOODLE PHOTOBOOTH';
  fCtx.fillText(brandTitle, baseWidth / 2, footerY);

  // Watermark Area (di bagian paling bawah bingkai)
  const watermarkY = footerY + 36;
  fCtx.textAlign = 'center';
  fCtx.textBaseline = 'middle';

  if (shouldShowWatermark) {
    // Teks watermark default "Made with PHOODLE" menyatu dengan bingkai
    fCtx.font = "700 13px 'Plus Jakarta Sans', Arial, sans-serif";
    fCtx.fillStyle = currentFrame.textColor ? currentFrame.textColor + '90' : '#64748B';
    fCtx.fillText('Made with PHOODLE', baseWidth / 2, watermarkY);
  } else if (customText && customText.trim()) {
    // Teks kustom dari user Pro jika watermark dihilangkan
    fCtx.font = "700 13px 'Plus Jakarta Sans', Arial, sans-serif";
    fCtx.fillStyle = isProTier ? '#F59E0B' : (currentFrame.textColor || '#1E293B');
    fCtx.fillText(customText.trim(), baseWidth / 2, watermarkY);
  }
  // Jika shouldShowWatermark === false dan customText kosong, area watermark bersih/kosong.

  return frameCanvas;
}

/**
 * CORE COMPOSITOR: Render Final Photo Strip Resolusi Tinggi (3 Layer)
 */
export async function renderFinalPhotoStrip({
  selectedLayout,
  capturedPhotos,
  currentFrame,
  fabricCanvas,
  userTier,
  multiplier = 2,
  showWatermark = true,
  customFooterText = '',
}) {
  const isGrid = selectedLayout === 'grid-2x2';
  const isStrip4 = selectedLayout === 'strip-4';

  const baseWidth = isGrid ? 1000 : 600;
  const baseHeight = isGrid ? 1200 : isStrip4 ? 2000 : 1800;

  const targetWidth = baseWidth * multiplier;
  const targetHeight = baseHeight * multiplier;

  // 1. Buat Canvas Offscreen Resolusi Tinggi
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = targetWidth;
  offscreenCanvas.height = targetHeight;
  const ctx = offscreenCanvas.getContext('2d');

  // Skalakan context agar koordinat tetap dalam skala baseWidth x baseHeight
  ctx.scale(multiplier, multiplier);

  // Koordinat slot pose
  const slots = getLayoutSlots(selectedLayout);

  // -------------------------------------------------------------
  // LAYER 1: FOTO-FOTO PENGGUNA (PALING BAWAH)
  // -------------------------------------------------------------
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const photoDataUrl = capturedPhotos[i];

    if (photoDataUrl) {
      const img = await loadImage(photoDataUrl);
      if (img) {
        ctx.save();
        ctx.beginPath();
        drawRoundRectPath(ctx, slot.x, slot.y, slot.width, slot.height, 16);
        ctx.clip();

        // Hitung rasio cover (crop tengah tanpa distorsi)
        const scale = Math.max(slot.width / img.width, slot.height / img.height);
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const drawX = slot.x + (slot.width - drawWidth) / 2;
        const drawY = slot.y + (slot.height - drawHeight) / 2;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
      }
    } else {
      // Placeholder jika slot kosong
      ctx.save();
      ctx.fillStyle = '#E2E8F0';
      ctx.beginPath();
      drawRoundRectPath(ctx, slot.x, slot.y, slot.width, slot.height, 16);
      ctx.fill();
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`#${i + 1}`, slot.x + slot.width / 2, slot.y + slot.height / 2);
      ctx.restore();
    }
  }

  // -------------------------------------------------------------
  // LAYER 2: OVERLAY BINGKAI PHOODLE DENGAN LUBANG TRANSPARAN
  // -------------------------------------------------------------
  const frameCanvas = createTransparentFrameCanvas(
    currentFrame,
    slots,
    baseWidth,
    baseHeight,
    userTier,
    showWatermark,
    customFooterText
  );
  ctx.drawImage(frameCanvas, 0, 0, baseWidth, baseHeight);

  // -------------------------------------------------------------
  // LAYER 3: CORETAN DOODLE & STIKER DARI FABRIC.JS (PALING ATAS)
  // -------------------------------------------------------------
  if (fabricCanvas) {
    // Simpan seleksi aktif saat ini
    fabricCanvas.discardActiveObject();

    // Sembunyikan objek non-dekorasi (misal jika ada objek frame/foto internal Fabric)
    const objects = fabricCanvas.getObjects();
    const hiddenObjects = [];

    objects.forEach((obj) => {
      if (obj.customType !== 'doodle' && obj.customType !== 'sticker') {
        if (obj.visible !== false) {
          obj.set('visible', false);
          hiddenObjects.push(obj);
        }
      }
    });

    const prevBg = fabricCanvas.backgroundColor;
    fabricCanvas.backgroundColor = null; // Transparan penuh
    fabricCanvas.renderAll();

    // Export hanya layer dekorasi dengan multiplier yang tepat
    const fabricZoom = fabricCanvas.getZoom() || 1;
    const decDataUrl = fabricCanvas.toDataURL({
      format: 'png',
      multiplier: 1 / fabricZoom,
    });

    // Kembalikan visibilitas objek di Fabric
    hiddenObjects.forEach((obj) => obj.set('visible', true));
    fabricCanvas.backgroundColor = prevBg;
    fabricCanvas.renderAll();

    // Gambar layer dekorasi ke atas offscreen canvas
    const decImg = await loadImage(decDataUrl);
    if (decImg) {
      ctx.drawImage(decImg, 0, 0, baseWidth, baseHeight);
    }
  }

  // Selesai! Hasilkan PNG resolusi tinggi
  const finalDataUrl = offscreenCanvas.toDataURL('image/png');

  return {
    dataUrl: finalDataUrl,
    canvas: offscreenCanvas,
    width: targetWidth,
    height: targetHeight,
  };
}
