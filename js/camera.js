/**
 * CAMERA MODULE - SNAPBOOTH
 * Handles Web Camera API / MediaDevices API, stream lifetime, camera flipping, and snapshot capture.
 */

const CameraController = (function () {
  let activeStream = null;
  let currentFacingMode = 'user'; // 'user' (front) or 'environment' (back)
  let isMirrored = true;

  /**
   * Start camera stream on provided HTMLVideoElement
   * @param {HTMLVideoElement} videoElement
   * @param {string} facingMode 'user' | 'environment'
   * @returns {Promise<boolean>} success
   */
  async function start(videoElement, facingMode = 'user') {
    stop(); // Stop previous stream if running

    currentFacingMode = facingMode;
    isMirrored = (facingMode === 'user');

    // Video constraints optimized for mobile portrait photobooth
    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1280 },
        height: { ideal: 1706 }, // 3:4 or 4:3 portrait preference
        aspectRatio: { ideal: 0.75 }
      }
    };

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('BROWSER_UNSUPPORTED');
      }

      activeStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = activeStream;

      // Handle video mirror transform
      if (isMirrored) {
        videoElement.classList.remove('unmirrored');
      } else {
        videoElement.classList.add('unmirrored');
      }

      await videoElement.play();
      return true;
    } catch (err) {
      console.error('[Camera] getUserMedia error:', err);
      // Fallback try simple video constraint if ideal constraints failed
      if (err.name !== 'NotAllowedError' && err.name !== 'PermissionDeniedError' && err.message !== 'BROWSER_UNSUPPORTED') {
        try {
          activeStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
          videoElement.srcObject = activeStream;
          await videoElement.play();
          return true;
        } catch (fallbackErr) {
          console.error('[Camera] Fallback getUserMedia error:', fallbackErr);
          throw fallbackErr;
        }
      }
      throw err;
    }
  }

  /**
   * Stop active MediaStream tracks and release camera
   */
  function stop() {
    if (activeStream) {
      activeStream.getTracks().forEach(track => {
        track.stop();
      });
      activeStream = null;
    }
  }

  /**
   * Switch between front ('user') and rear ('environment') camera
   * @param {HTMLVideoElement} videoElement
   */
  async function switchFacingMode(videoElement) {
    const targetMode = currentFacingMode === 'user' ? 'environment' : 'user';
    return await start(videoElement, targetMode);
  }

  /**
   * Toggle mirror display on active camera preview
   * @param {HTMLVideoElement} videoElement
   * @returns {boolean} new mirror state
   */
  function toggleMirror(videoElement) {
    isMirrored = !isMirrored;
    if (isMirrored) {
      videoElement.classList.remove('unmirrored');
    } else {
      videoElement.classList.add('unmirrored');
    }
    return isMirrored;
  }

  /**
   * Capture crisp snapshot from HTMLVideoElement to canvas image string
   * @param {HTMLVideoElement} videoElement
   * @returns {string} Data URL of JPEG snapshot
   */
  function capture(videoElement) {
    if (!videoElement || videoElement.readyState < 2) {
      throw new Error('VIDEO_NOT_READY');
    }

    const canvas = document.createElement('canvas');
    const vWidth = videoElement.videoWidth || 1280;
    const vHeight = videoElement.videoHeight || 960;

    // Standardize photo aspect ratio to 3:4 portrait for photobooth strip
    let targetWidth = vWidth;
    let targetHeight = Math.round(vWidth * (4 / 3));

    if (vHeight < targetHeight) {
      targetHeight = vHeight;
      targetWidth = Math.round(vHeight * (3 / 4));
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');

    // Calculate center crop offsets
    const sx = (vWidth - targetWidth) / 2;
    const sy = (vHeight - targetHeight) / 2;

    ctx.save();

    // Mirror image if front camera & mirror active so captured photo matches preview
    if (isMirrored && currentFacingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      videoElement,
      sx, sy, targetWidth, targetHeight,
      0, 0, targetWidth, targetHeight
    );

    ctx.restore();

    return canvas.toDataURL('image/jpeg', 0.95);
  }

  function getFacingMode() {
    return currentFacingMode;
  }

  function getIsMirrored() {
    return isMirrored;
  }

  function isActive() {
    return activeStream !== null && activeStream.active;
  }

  return {
    start,
    stop,
    switchFacingMode,
    toggleMirror,
    capture,
    getFacingMode,
    getIsMirrored,
    isActive
  };
})();
