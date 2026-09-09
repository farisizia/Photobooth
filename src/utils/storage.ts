const STORAGE_KEY = 'snapmoment_session_photos';

export function saveCapturedPhotos(photos: string[]): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (err) {
    console.warn('[Storage] Failed to save photos to sessionStorage:', err);
  }
}

export function getCapturedPhotos(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearCapturedPhotos(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('[Storage] Failed to clear sessionStorage:', err);
  }
}

export function hasCapturedPhotos(): boolean {
  return getCapturedPhotos().length > 0;
}
