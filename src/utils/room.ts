export function normalizeRoomCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
}

export function roomUrl(code: string): string {
  const origin = window.location.origin;
  return `${origin}/room/${code}`;
}

export function saveSession(code: string, self: { id: string; name: string; isHost: boolean }) {
  try {
    sessionStorage.setItem(
      `lpb:${code}`,
      JSON.stringify({ ...self, savedAt: Date.now() })
    );
  } catch {
    /* ignore quota */
  }
}

export function loadSession(code: string): { id: string; name: string; isHost: boolean } | null {
  try {
    const raw = sessionStorage.getItem(`lpb:${code}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.id || !parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSession(code: string) {
  try {
    sessionStorage.removeItem(`lpb:${code}`);
  } catch {
    /* ignore */
  }
}

export function isSecureContextForCamera(): boolean {
  if (typeof window === 'undefined') return false;
  return window.isSecureContext || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
}
