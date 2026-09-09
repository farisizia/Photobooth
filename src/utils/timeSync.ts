/**
 * Lightweight clock offset vs server.
 * offset = serverNow - Date.now()  →  estimatedServerNow = Date.now() + offset
 */
let offsetMs = 0;

export function updateOffset(serverNow: number, roundTripMs = 0) {
  const localNow = Date.now();
  const oneWay = roundTripMs / 2;
  offsetMs = serverNow + oneWay - localNow;
}

export function nowServer(): number {
  return Date.now() + offsetMs;
}

export function msUntil(serverTimestamp: number): number {
  return serverTimestamp - nowServer();
}

/**
 * Run a synchronized countdown that ticks locally, aligned to captureAt.
 * Returns a cancel function.
 */
export function runSyncedCountdown(
  captureAt: number,
  onTick: (remainingSec: number) => void,
  onCapture: () => void
): () => void {
  let cancelled = false;
  let lastShown = -1;
  let timeoutId: number | undefined;

  const loop = () => {
    if (cancelled) return;
    const remainingMs = msUntil(captureAt);
    if (remainingMs <= 40) {
      onTick(0);
      onCapture();
      return;
    }
    const remainingSec = Math.max(1, Math.ceil(remainingMs / 1000));
    if (remainingSec !== lastShown) {
      lastShown = remainingSec;
      onTick(remainingSec);
    }
    timeoutId = window.setTimeout(loop, Math.min(80, remainingMs));
  };

  loop();
  return () => {
    cancelled = true;
    if (timeoutId) window.clearTimeout(timeoutId);
  };
}
