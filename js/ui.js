/**
 * UI MODULE - SNAPBOOTH
 * Screen routing, toast, modal, tab switching, and DOM helpers.
 */

const UI = (function () {
  const screens = {
    landing: document.getElementById('screen-landing'),
    camera: document.getElementById('screen-camera'),
    preview: document.getElementById('screen-preview'),
    editor: document.getElementById('screen-editor')
  };

  let currentScreen = 'landing';

  function showScreen(name) {
    if (!screens[name]) return;
    Object.keys(screens).forEach(key => {
      screens[key].classList.toggle('screen-active', key === name);
    });
    currentScreen = name;
  }

  function getCurrentScreen() {
    return currentScreen;
  }

  /* ---------- Toast ---------- */
  function toast(message, type = 'info', duration = 2400) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-8px)';
      el.style.transition = 'all 0.2s';
      setTimeout(() => el.remove(), 220);
    }, duration);
  }

  /* ---------- Permission Modal ---------- */
  function showPermissionModal(message) {
    const modal = document.getElementById('modal-permission');
    const msgEl = document.getElementById('permission-error-msg');
    if (msgEl && message) msgEl.textContent = message;
    modal.classList.remove('hidden');
  }

  function hidePermissionModal() {
    document.getElementById('modal-permission').classList.add('hidden');
  }

  /* ---------- Camera UI bits ---------- */
  function setPhotoIndicator(index, total) {
    const el = document.getElementById('session-photo-indicator');
    if (el) el.textContent = 'Photo ' + Math.min(index + 1, total) + ' / ' + total;
  }

  function setShotDots(photos, currentIndex) {
    const dots = document.querySelectorAll('.shot-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (photos[i]) {
        dot.classList.add('done');
      } else if (i === currentIndex) {
        dot.classList.add('active');
      }
    });
  }

  function showCountdown(n) {
    const overlay = document.getElementById('countdown-overlay');
    const text = document.getElementById('countdown-number');
    if (n > 0) {
      overlay.classList.remove('hidden');
      // Restart animation
      text.style.animation = 'none';
      void text.offsetWidth;
      text.style.animation = '';
      text.textContent = String(n);
    } else {
      overlay.classList.add('hidden');
    }
  }

  function hideCountdown() {
    document.getElementById('countdown-overlay').classList.add('hidden');
  }

  function flash() {
    const overlay = document.getElementById('flash-overlay');
    overlay.classList.remove('flash-active');
    void overlay.offsetWidth;
    overlay.classList.add('flash-active');
    setTimeout(() => overlay.classList.remove('flash-active'), 250);
  }

  function setShutterDisabled(disabled) {
    const btn = document.getElementById('btn-shutter');
    if (disabled) btn.classList.add('disabled');
    else btn.classList.remove('disabled');
  }

  function setCameraHint(text) {
    const el = document.getElementById('camera-hint');
    if (el) el.textContent = text;
  }

  function setAutoModeBadge(isAuto) {
    const el = document.getElementById('shutter-mode-label');
    if (el) el.textContent = isAuto ? 'AUTO' : 'MANUAL';
  }

  /* ---------- Preview thumbs ---------- */
  function renderThumbs(photos) {
    photos.forEach((url, i) => {
      const img = document.getElementById('thumb-' + i);
      if (img && url) img.src = url;
    });
  }

  /* ---------- Editor tabs ---------- */
  function initTabs() {
    const tabs = document.querySelectorAll('.editor-tab');
    const panes = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        panes.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const pane = document.getElementById(tab.dataset.tab);
        if (pane) pane.classList.add('active');
      });
    });
  }

  function setActiveTemplate(id) {
    document.querySelectorAll('.template-item').forEach(el => {
      el.classList.toggle('active', el.dataset.template === id);
    });
  }

  function setActiveColor(hex) {
    document.querySelectorAll('.color-swatch').forEach(el => {
      el.classList.toggle('active', el.dataset.color === hex);
    });
  }

  function setActiveFilter(name) {
    document.querySelectorAll('.filter-item').forEach(el => {
      el.classList.toggle('active', el.dataset.filter === name);
    });
  }

  function setActiveSticker(emoji) {
    document.querySelectorAll('.sticker-chip').forEach(el => {
      el.classList.toggle('active', el.dataset.sticker === emoji);
    });
  }

  return {
    showScreen,
    getCurrentScreen,
    toast,
    showPermissionModal,
    hidePermissionModal,
    setPhotoIndicator,
    setShotDots,
    showCountdown,
    hideCountdown,
    flash,
    setShutterDisabled,
    setCameraHint,
    setAutoModeBadge,
    renderThumbs,
    initTabs,
    setActiveTemplate,
    setActiveColor,
    setActiveFilter,
    setActiveSticker
  };
})();
