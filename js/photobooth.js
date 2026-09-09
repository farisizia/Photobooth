/**
 * PHOTOBOOTH SESSION MODULE - SNAPBOOTH
 * Manages 4-photo session state, countdown, capture sequence, and retake.
 */

const PhotoboothSession = (function () {
  const TOTAL_SHOTS = 4;
  const COUNTDOWN_SECONDS = 3;
  const GAP_BETWEEN_SHOTS_MS = 700;

  let photos = [null, null, null, null]; // data URLs
  let currentIndex = 0;
  let isCapturing = false;
  let isAutoMode = true;
  let countdownTimer = null;
  let retakeTarget = null; // if not null, only recapture this index then stop

  const listeners = {};

  function on(event, fn) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(fn);
  }

  function emit(event, payload) {
    (listeners[event] || []).forEach(fn => {
      try { fn(payload); } catch (e) { console.error('[Photobooth] listener error', e); }
    });
  }

  function reset() {
    stopCountdown();
    photos = [null, null, null, null];
    currentIndex = 0;
    isCapturing = false;
    retakeTarget = null;
    emit('reset');
    emit('progress', { index: 0, total: TOTAL_SHOTS, photos: photos.slice() });
  }

  function getPhotos() {
    return photos.slice();
  }

  function getCurrentIndex() {
    return currentIndex;
  }

  function isSessionComplete() {
    return photos.every(p => !!p);
  }

  function getIsCapturing() {
    return isCapturing;
  }

  function getIsAutoMode() {
    return isAutoMode;
  }

  function toggleAutoMode() {
    isAutoMode = !isAutoMode;
    emit('modechange', { auto: isAutoMode });
    return isAutoMode;
  }

  function stopCountdown() {
    if (countdownTimer) {
      clearTimeout(countdownTimer);
      countdownTimer = null;
    }
  }

  /**
   * Run visual countdown then fire onComplete
   */
  function runCountdown(onComplete) {
    return new Promise((resolve) => {
      let remaining = COUNTDOWN_SECONDS;
      emit('countdown', { remaining, active: true });

      function tick() {
        if (remaining <= 0) {
          emit('countdown', { remaining: 0, active: false });
          resolve();
          if (onComplete) onComplete();
          return;
        }
        emit('countdown', { remaining, active: true });
        remaining -= 1;
        countdownTimer = setTimeout(tick, 1000);
      }

      tick();
    });
  }

  /**
   * Capture a single photo at `index` using CameraController
   * @param {HTMLVideoElement} videoEl
   * @param {number} index
   */
  async function captureOne(videoEl, index) {
    emit('flash');
    // tiny delay so flash is visible
    await wait(80);
    const dataUrl = CameraController.capture(videoEl);
    photos[index] = dataUrl;
    emit('captured', { index, dataUrl, photos: photos.slice() });
    emit('progress', { index: index + 1, total: TOTAL_SHOTS, photos: photos.slice() });
    return dataUrl;
  }

  /**
   * Start a full 4-shot auto session from currentIndex
   * @param {HTMLVideoElement} videoEl
   */
  async function startSession(videoEl) {
    if (isCapturing) return;
    isCapturing = true;
    emit('sessionstart');

    try {
      while (currentIndex < TOTAL_SHOTS) {
        if (!isCapturing) break; // cancelled

        emit('waiting', { index: currentIndex });
        await runCountdown();
        if (!isCapturing) break;

        await captureOne(videoEl, currentIndex);
        currentIndex += 1;

        if (currentIndex < TOTAL_SHOTS) {
          await wait(GAP_BETWEEN_SHOTS_MS);
        }
      }

      if (isSessionComplete()) {
        emit('sessioncomplete', { photos: photos.slice() });
      }
    } catch (err) {
      console.error('[Photobooth] session error', err);
      emit('error', { message: err.message || 'Gagal mengambil foto' });
    } finally {
      isCapturing = false;
      stopCountdown();
      emit('countdown', { remaining: 0, active: false });
    }
  }

  /**
   * Manual single-shot (when auto mode is off)
   * @param {HTMLVideoElement} videoEl
   */
  async function captureManual(videoEl) {
    if (isCapturing) return;
    if (currentIndex >= TOTAL_SHOTS) return;

    isCapturing = true;
    emit('sessionstart');
    try {
      emit('waiting', { index: currentIndex });
      await runCountdown();
      if (!isCapturing) return;
      await captureOne(videoEl, currentIndex);
      currentIndex += 1;

      if (isSessionComplete()) {
        emit('sessioncomplete', { photos: photos.slice() });
      }
    } catch (err) {
      console.error('[Photobooth] manual capture error', err);
      emit('error', { message: err.message || 'Gagal mengambil foto' });
    } finally {
      isCapturing = false;
      stopCountdown();
      emit('countdown', { remaining: 0, active: false });
    }
  }

  /**
   * Retake a specific photo then return to preview
   * @param {HTMLVideoElement} videoEl
   * @param {number} index
   */
  async function retakeOne(videoEl, index) {
    if (isCapturing) return;
    if (index < 0 || index > 3) return;

    isCapturing = true;
    retakeTarget = index;
    emit('sessionstart');
    emit('waiting', { index });

    try {
      await runCountdown();
      if (!isCapturing) return;
      await captureOne(videoEl, index);
      emit('retakecomplete', { index, photos: photos.slice() });
    } catch (err) {
      console.error('[Photobooth] retake error', err);
      emit('error', { message: err.message || 'Gagal retake foto' });
    } finally {
      isCapturing = false;
      retakeTarget = null;
      stopCountdown();
      emit('countdown', { remaining: 0, active: false });
    }
  }

  function cancel() {
    isCapturing = false;
    stopCountdown();
    emit('countdown', { remaining: 0, active: false });
    emit('cancelled');
  }

  function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  return {
    on,
    reset,
    getPhotos,
    getCurrentIndex,
    isSessionComplete,
    getIsCapturing,
    getIsAutoMode,
    toggleAutoMode,
    startSession,
    captureManual,
    retakeOne,
    cancel,
    TOTAL_SHOTS
  };
})();
