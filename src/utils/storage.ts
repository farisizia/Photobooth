const STORAGE_KEY = 'iziaphoto_session_photos';
const OLD_STORAGE_KEY = 'snapmoment_session_photos';
const DB_NAME = 'iziaphoto_db';
const DB_STORE = 'session_photos';
const DB_KEY = 'active_photos';

// Tier 1: In-Memory Cache (Global Module Scope)
// Guarantees 100% data preservation during SPA navigation (/photobooth <-> /templates)
// with zero size limitation and 0ms synchronous access time.
let memoryCachedPhotos: string[] = [];

// Initialize memory cache immediately from sessionStorage on module load
try {
  const raw = sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(OLD_STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryCachedPhotos = parsed;
    }
  }
} catch {
  // Silent fallback
}

// Tier 3: IndexedDB Helper for Large/Durable Storage
function getIndexedDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      resolve(null);
      return;
    }
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(DB_STORE)) {
          db.createObjectStore(DB_STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function saveToIndexedDB(photos: string[]): Promise<void> {
  try {
    const db = await getIndexedDB();
    if (!db) return;
    const tx = db.transaction(DB_STORE, 'readwrite');
    const store = tx.objectStore(DB_STORE);
    store.put(photos, DB_KEY);
  } catch (err) {
    console.warn('[Storage] Failed to save to IndexedDB:', err);
  }
}

async function loadFromIndexedDB(): Promise<string[]> {
  try {
    const db = await getIndexedDB();
    if (!db) return [];
    return new Promise((resolve) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const store = tx.objectStore(DB_STORE);
      const req = store.get(DB_KEY);
      req.onsuccess = () => {
        const val = req.result;
        if (Array.isArray(val) && val.length > 0) {
          resolve(val);
        } else {
          resolve([]);
        }
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

async function clearIndexedDBPhotos(): Promise<void> {
  try {
    const db = await getIndexedDB();
    if (!db) return;
    const tx = db.transaction(DB_STORE, 'readwrite');
    const store = tx.objectStore(DB_STORE);
    store.delete(DB_KEY);
  } catch {
    // Silent fallback
  }
}

// Background restoration from IndexedDB if memory & sessionStorage were empty (e.g. after refresh)
if (typeof window !== 'undefined' && memoryCachedPhotos.length === 0) {
  loadFromIndexedDB().then((idbPhotos) => {
    if (idbPhotos && idbPhotos.length > 0 && memoryCachedPhotos.length === 0) {
      memoryCachedPhotos = idbPhotos;
      window.dispatchEvent(
        new CustomEvent('iziaphoto:photos-restored', { detail: idbPhotos })
      );
    }
  }).catch(() => {});
}

/**
 * Save captured / uploaded photos across all storage tiers
 */
export function saveCapturedPhotos(photos: string[]): void {
  // 1. In-Memory Cache (Immediate & unlimited capacity)
  memoryCachedPhotos = [...photos];

  // 2. sessionStorage (Fast across soft route shifts)
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (err) {
    console.warn('[Storage] sessionStorage save failed (quota exceeded or disabled):', err);
  }

  // 3. IndexedDB (Durable background persistence)
  saveToIndexedDB(photos).catch(() => {});

  // Dispatch event for any active page listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('iziaphoto:photos-updated', { detail: photos })
    );
  }
}

/**
 * Synchronously retrieves photos currently held in session
 */
export function getCapturedPhotos(): string[] {
  // Priority 1: In-memory cache
  if (memoryCachedPhotos && memoryCachedPhotos.length > 0) {
    return memoryCachedPhotos;
  }

  // Priority 2: sessionStorage
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(OLD_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCachedPhotos = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Storage] Failed to read from sessionStorage:', err);
  }

  return [];
}

/**
 * Completely clears photo session across all tiers
 */
export function clearCapturedPhotos(): void {
  memoryCachedPhotos = [];
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(OLD_STORAGE_KEY);
  } catch (err) {
    console.warn('[Storage] Failed to clear sessionStorage:', err);
  }
  clearIndexedDBPhotos().catch(() => {});

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('iziaphoto:photos-cleared'));
  }
}

export function hasCapturedPhotos(): boolean {
  return getCapturedPhotos().length > 0;
}

