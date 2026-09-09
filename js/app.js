/**
 * APP CONTROLLER - SNAPBOOTH
 * Wires Camera + Photobooth + Canvas + UI. Handles routing, state, events, and exports.
 */

(function () {
  // DOM refs
  const videoEl = document.getElementById('camera-video');
  const canvasEl = document.getElementById('final-canvas');

  const btnStart = document.getElementById('btn-start');
  const btnCameraBack = document.getElementById('btn-camera-back');
  const btnShutter = document.getElementById('btn-shutter');
  const btnSwitchCamera = document.getElementById('btn-switch-camera');
  const btnToggleMirror = document.getElementById('btn-toggle-mirror');
  const btnCameraSettings = document.getElementById('btn-camera-settings');

  const btnPreviewBack = document.getElementById('btn-preview-back');
  const btnGoCustomize = document.getElementById('btn-go-customize');
  const btnRetakeAll = document.getElementById('btn-retake-all');

  const btnEditorBack = document.getElementById('btn-editor-back');
  const btnEditorReset = document.getElementById('btn-editor-reset');
  const btnDownload = document.getElementById('btn-download');
  const btnShare = document.getElementById('btn-share');

  const btnRetryPermission = document.getElementById('btn-retry-permission');
  const btnClosePermission = document.getElementById('btn-close-permission');

  // Inputs
  const inputEventName = document.getElementById('input-event-name');
  const inputCaption = document.getElementById('input-caption');
  const inputDate = document.getElementById('input-date');
  const customColorInput = document.getElementById('custom-color-input');

  // Editor state
  const editorState = {
    templateId: 'classic-strip',
    bgColor: '#FFFFFF',
    filter: 'normal',
    eventName: 'SNAPBOOTH',
    caption: 'MEMORIES TO KEEP',
    dateText: '09.09.2026',
    sticker: 'none'
  };

  let pendingRetakeIndex = null;

  // --- Default date today ---
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const todayStr = dd + '.' + mm + '.' + yyyy;

  if (inputDate) {
    inputDate.value = todayStr;
    editorState.dateText = todayStr;
  }

  // =========================================================================
  // ROUTING HELPERS
  // =========================================================================

  async function enterCamera(retakeIndex = null) {
    pendingRetakeIndex = retakeIndex;

    if (retakeIndex !== null) {
      UI.toast('Retake Pose ' + (retakeIndex + 1) + ' — Tap shutter siap 3s', 'info');
    }

    UI.showScreen('camera');
    UI.setAutoModeBadge(PhotoboothSession.getIsAutoMode());

    try {
      await CameraController.start(videoEl, CameraController.getFacingMode());
      const idx = retakeIndex !== null ? retakeIndex : PhotoboothSession.getCurrentIndex();
      UI.setPhotoIndicator(idx, 4);
      UI.setShotDots(PhotoboothSession.getPhotos(), idx);
      UI.setCameraHint(retakeIndex !== null ? 'Siap retake Pose ' + (retakeIndex + 1) + ' — Tap shutter' : 'Tap shutter untuk sesi foto 4 pose');
      UI.setShutterDisabled(false);
    } catch (err) {
      handleCameraError(err);
    }
  }

  function exitCamera() {
    CameraController.stop();
    UI.hideCountdown();
  }

  function goLanding() {
    exitCamera();
    if (pendingRetakeIndex !== null) {
      // Was in retake mode but user backed out — stay on current preview state
      pendingRetakeIndex = null;
    }
    UI.showScreen('landing');
  }

  async function goPreview() {
    exitCamera();
    pendingRetakeIndex = null;
    UI.renderThumbs(PhotoboothSession.getPhotos());
    UI.showScreen('preview');
  }

  async function goEditor() {
    UI.showScreen('editor');
    // Sync inputs into editorState
    syncInputsToState();
    await compose();
  }

  // =========================================================================
  // CANVAS COMPOSER
  // =========================================================================

  async function compose() {
    syncInputsToState();
    const photos = PhotoboothSession.getPhotos();
    await CanvasRenderer.loadPhotos(photos);
    CanvasRenderer.render(canvasEl, { ...editorState });
  }

  function syncInputsToState() {
    if (inputEventName) editorState.eventName = inputEventName.value.trim() || 'SNAPBOOTH';
    if (inputCaption) editorState.caption = inputCaption.value.trim() || '';
    if (inputDate) editorState.dateText = inputDate.value.trim() || todayStr;
  }

  // =========================================================================
  // CAMERA ERROR HANDLING
  // =========================================================================

  function handleCameraError(err) {
    const name = err.name || '';
    const msg = name;

    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      UI.showPermissionModal('Izin kamera ditolak browser. Untuk melanjutkan, buka pengaturan situs/izin kamera dan izinkan akses kamera, lalu tap Coba Lagi.');
      UI.toast('Izin kamera ditolak', 'error');
    } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError' || msg.includes('Requested device not found')) {
      UI.showPermissionModal('Tidak ada kamera yang ditemukan di perangkat ini. Pastikan perangkat memiliki kamera dan tidak sedang dipakai aplikasi lain.');
      UI.toast('Kamera tidak ditemukan', 'error');
    } else if (name === 'NotReadableError') {
      UI.showPermissionModal('Kamera sedang dipakai aplikasi lain atau error hardware. Tutup aplikasi kamera lain lalu coba lagi.');
      UI.toast('Kamera dipakai aplikasi lain', 'error');
    } else if (msg === 'BROWSER_UNSUPPORTED') {
      UI.showPermissionModal('Browser ini tidak mendukung akses kamera. Coba buka di Chrome/Safari versi terbaru lewat HTTPS atau localhost.');
      UI.toast('Browser tidak mendukung kamera', 'error');
    } else {
      UI.showPermissionModal('Gagal mengakses kamera. Pastikan halaman diakses lewat HTTPS atau localhost, coba tutup aplikasi kamera lain, lalu tap Coba Lagi. (' + (name || 'unknown') + ')');
      UI.toast('Gagal membuka kamera', 'error');
    }
  }

  // =========================================================================
  // BUTTON EVENTS
  // =========================================================================

  // Start on landing
  btnStart.addEventListener('click', () => {
    PhotoboothSession.reset();
    enterCamera();
  });

  // Camera back
  btnCameraBack.addEventListener('click', () => {
    if (PhotoboothSession.getIsCapturing()) {
      PhotoboothSession.cancel();
    }
    if (PhotoboothSession.isSessionComplete() || PhotoboothSession.getCurrentIndex() > 0) {
      // Has at least one shot, return to preview or landing appropriately
      goPreview();
      UI.toast('Sesi dibatalkan', 'info');
    } else {
      goLanding();
    }
  });

  // Switch camera (front / back)
  btnSwitchCamera.addEventListener('click', async () => {
    if (PhotoboothSession.getIsCapturing()) {
      UI.toast('Switch dinonaktifkan saat countdown', 'info', 1600);
      return;
    }
    try {
      await CameraController.switchFacingMode(videoEl);
      UI.toast('Camera: ' + (CameraController.getFacingMode() === 'user' ? 'depan' : 'belakang'), 'info', 1400);
    } catch (err) {
      UI.toast('Gagal ganti kamera', 'error');
    }
  });

  // Toggle mirror
  btnToggleMirror.addEventListener('click', () => {
    CameraController.toggleMirror(videoEl);
    UI.toast('Mirror: ' + (CameraController.getIsMirrored() ? 'ON' : 'OFF'), 'info', 1200);
  });

  // Auto / Manual shutter mode
  btnCameraSettings.addEventListener('click', () => {
    if (PhotoboothSession.getIsCapturing()) {
      UI.toast('Mode terkunci saat countdown', 'info', 1400);
      return;
    }
    const isAuto = PhotoboothSession.toggleAutoMode();
    UI.setAutoModeBadge(isAuto);
    UI.toast(isAuto ? 'Auto 4-shot aktif' : 'Manual — tap per Pose', 'info', 1600);
    UI.setCameraHint(isAuto ? 'Tap shutter untuk sesi 4 foto otomatis' : 'Tap shutter per Pose (manual)');
  });

  // Big shutter press
  btnShutter.addEventListener('click', async () => {
    if (PhotoboothSession.getIsCapturing()) return;
    if (!CameraController.isActive()) {
      UI.toast('Kamera belum siap', 'error');
      return;
    }

    // Retake flow: single shot then go back to preview
    if (pendingRetakeIndex !== null) {
      const idx = pendingRetakeIndex;
      const savedIdx = idx;
      pendingRetakeIndex = null; // consume retake ticket
      await PhotoboothSession.retakeOne(videoEl, savedIdx);
      // After single retake return to preview
      await goPreview();
      return;
    }

    if (PhotoboothSession.isSessionComplete()) {
      await goPreview();
      return;
    }

    if (PhotoboothSession.getIsAutoMode()) {
      await PhotoboothSession.startSession(videoEl);
      // Auto sessioncomplete will carry navigation
    } else {
      await PhotoboothSession.captureManual(videoEl);
      const idx = PhotoboothSession.getCurrentIndex();
      UI.setPhotoIndicator(idx, 4);
      UI.setShotDots(PhotoboothSession.getPhotos(), idx);
      if (PhotoboothSession.isSessionComplete()) {
        await goPreview();
      } else {
        UI.toast('Pose ' + idx + ' OK — lanjut Pose ' + (idx + 1), 'success', 1500);
      }
    }
  });

  // Permission modal actions
  btnRetryPermission.addEventListener('click', async () => {
    UI.hidePermissionModal();
    try {
      await CameraController.start(videoEl, CameraController.getFacingMode());
      UI.setPhotoIndicator(pendingRetakeIndex !== null ? pendingRetakeIndex : PhotoboothSession.getCurrentIndex(), 4);
      UI.setShutterDisabled(false);
      if (pendingRetakeIndex === null && UI.getCurrentScreen() !== 'camera') {
        UI.showScreen('camera');
      }
      UI.toast('Kamera tersambung ✓', 'success');
    } catch (err) {
      handleCameraError(err);
    }
  });

  btnClosePermission.addEventListener('click', () => {
    UI.hidePermissionModal();
    // Decide destination: if retake -> go back preview, else landing
    if (pendingRetakeIndex !== null) {
      pendingRetakeIndex = null;
      goPreview();
    } else if (PhotoboothSession.getCurrentIndex() === 0) {
      goLanding();
    }
  });

  // Preview nav
  btnPreviewBack.addEventListener('click', () => {
    goLanding();
  });

  btnRetakeAll.addEventListener('click', () => {
    PhotoboothSession.reset();
    enterCamera();
  });

  // Retake single photo from grid
  document.querySelectorAll('.btn-retake-single').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index, 10);
      enterCamera(idx);
    });
  });

  // Clicking whole preview card also triggers retake
  document.querySelectorAll('.preview-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index, 10);
      enterCamera(idx);
    });
  });

  btnGoCustomize.addEventListener('click', () => {
    goEditor();
  });

  // Editor nav
  btnEditorBack.addEventListener('click', () => {
    goPreview();
  });

  btnEditorReset.addEventListener('click', async () => {
    editorState.templateId = 'classic-strip';
    editorState.bgColor = '#FFFFFF';
    editorState.filter = 'normal';
    editorState.sticker = 'none';
    inputEventName.value = 'SNAPBOOTH';
    inputCaption.value = 'MEMORIES TO KEEP';
    inputDate.value = todayStr;

    UI.setActiveTemplate('classic-strip');
    UI.setActiveColor('#FFFFFF');
    UI.setActiveFilter('normal');
    UI.setActiveSticker('none');
    if (customColorInput) customColorInput.value = '#FFFFFF';

    await compose();
    UI.toast('Di-reset ke default', 'info');
  });

  // =========================================================================
  // EDITOR CONTROLS — Templates, Colors, Filters, Text, Stickers
  // =========================================================================

  UI.initTabs();

  document.querySelectorAll('.template-item').forEach(btn => {
    btn.addEventListener('click', async () => {
      editorState.templateId = btn.dataset.template;
      UI.setActiveTemplate(editorState.templateId);
      await compose();
      UI.toast('Template: ' + btn.querySelector('.tpl-name').textContent.trim(), 'info', 1200);
    });
  });

  document.querySelectorAll('.color-swatch[data-color]').forEach(btn => {
    btn.addEventListener('click', async () => {
      editorState.bgColor = btn.dataset.color;
      UI.setActiveColor(editorState.bgColor);
      if (customColorInput) customColorInput.value = editorState.bgColor;
      await compose();
    });
  });

  if (customColorInput) {
    customColorInput.addEventListener('input', async () => {
      editorState.bgColor = customColorInput.value;
      // Don't highlight any preset swatch when custom picked
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      await compose();
    });
  }

  document.querySelectorAll('.filter-item').forEach(btn => {
    btn.addEventListener('click', async () => {
      editorState.filter = btn.dataset.filter;
      UI.setActiveFilter(editorState.filter);
      await compose();
    });
  });

  [inputEventName, inputCaption, inputDate].forEach(input => {
    if (!input) return;
    input.addEventListener('input', async () => {
      syncInputsToState();
      await compose();
    });
  });

  document.querySelectorAll('.sticker-chip').forEach(chip => {
    chip.addEventListener('click', async () => {
      const emoji = chip.dataset.sticker;
      editorState.sticker = emoji;
      UI.setActiveSticker(emoji);
      await compose();
      UI.toast(emoji === 'none' ? 'Stiker dihapus' : 'Stiker ' + emoji, 'info', 1100);
    });
  });

  // =========================================================================
  // DOWNLOAD & SHARE
  // =========================================================================

  async function shareOrDownload(options) {
    syncInputsToState();
    await compose();

    const ts = Date.now();
    const fileName = 'photobooth-' + ts + '.png';

    // Build blob for sharing/downloading
    const blob = await CanvasRenderer.toBlob(canvasEl, 'image/png', 1.0);
    if (!blob) {
      UI.toast('Gagal membuat file foto', 'error');
      return;
    }

    // Try Web Share API
    if (options.tryShare) {
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: editorState.eventName || 'SNAPBOOTH',
            text: editorState.caption || 'Photobooth strip by SNAPBOOTH'
          });
          UI.toast('Dibagikan ✓', 'success');
          return;
        } catch (err) {
          if (err && err.name === 'AbortError') return;
          console.warn('[Share] failed, falling back to download:', err);
        }
      } else if (navigator.share) {
        // Share without files fallback
        try {
          await navigator.share({
            title: editorState.eventName || 'SNAPBOOTH',
            text: editorState.caption || 'Photobooth strip by SNAPBOOTH'
          });
          return;
        } catch (err) {
          if (err && err.name === 'AbortError') return;
        }
      }
      if (options.tryShareOnly) {
        UI.toast('Web Share tidak didukung — gunakan Download', 'info', 2600);
        return;
      }
    }

    // Fallback: direct download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    UI.toast('Foto berhasil didownload ✓', 'success');
  }

  btnDownload.addEventListener('click', () => {
    // Download should NOT attempt share sheet first
    shareOrDownload({ tryShare: false });
  });

  btnShare.addEventListener('click', () => {
    shareOrDownload({ tryShare: true, tryShareOnly: true });
    // Add fallback download hint
  });

  // =========================================================================
  // PHOTOBOOTH SESSION EVENTS (countdown, capture progress, complete)
  // =========================================================================

  PhotoboothSession.on('progress', ({ index }) => {
    UI.setPhotoIndicator(index, 4);
    UI.setShotDots(PhotoboothSession.getPhotos(), index);
  });

  PhotoboothSession.on('countdown', ({ remaining, active }) => {
    if (active && remaining > 0) {
      UI.showCountdown(remaining);
      UI.setShutterDisabled(true);
      UI.setCameraHint('Siap... ' + remaining);
    } else if (!active) {
      UI.hideCountdown();
      UI.setShutterDisabled(false);
    }
  });

  PhotoboothSession.on('flash', () => {
    UI.flash();
    UI.hideCountdown();
    // Soft shutter sound via Audio if you want to extend later
  });

  PhotoboothSession.on('captured', ({ index }) => {
    UI.setShotDots(PhotoboothSession.getPhotos(), index + 1);
    UI.toast('Pose ' + (index + 1) + ' tersimpan', 'success', 1200);
  });

  PhotoboothSession.on('sessioncomplete', async () => {
    UI.toast('Semua 4 Pose selesai! Lihat hasilnya ↓', 'success', 2200);
    // Small pause so user sees last dot animating before navigation
    setTimeout(async () => {
      await goPreview();
    }, 550);
  });

  PhotoboothSession.on('retakecomplete', ({ index }) => {
    UI.toast('Pose ' + (index + 1) + ' berhasil di-retake ✓', 'success');
  });

  PhotoboothSession.on('error', ({ message }) => {
    UI.toast(message || 'Terjadi error', 'error');
  });

  PhotoboothSession.on('reset', () => {
    UI.setPhotoIndicator(0, 4);
    UI.setShotDots([null, null, null, null], 0);
    UI.hideCountdown();
    UI.setShutterDisabled(false);
  });

  // =========================================================================
  // LIFECYCLE: Document visibility — stop camera when leaving app
  // =========================================================================

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (UI.getCurrentScreen() === 'camera') {
        // Pause stream but don't destroy — restore when visible again
        // For battery saving on mobile, actually stop stream
        // We restore in the resume handler
      }
    } else {
      // Back to foreground — restart camera if we're on camera screen
      if (UI.getCurrentScreen() === 'camera' && !CameraController.isActive() && !PhotoboothSession.getIsCapturing()) {
        CameraController.start(videoEl, CameraController.getFacingMode()).catch(handleCameraError);
      }
    }
  });

  // Window resize: recompose editor canvas scaling (CSS handles visually, no relayout needed)

  console.log('%cSNAPBOOTH %cready', 'color:#ec4899;font-size:1.4rem;font-weight:800;', 'color:#94a3b8;');

})();
