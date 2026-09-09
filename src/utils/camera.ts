export type FacingMode = 'user' | 'environment';

export interface CameraState {
  stream: MediaStream | null;
  facing: FacingMode;
  error: string | null;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unsupported';
}

export class CameraService {
  private static stream: MediaStream | null = null;
  private static currentFacing: FacingMode = 'user';

  static isSupported(): boolean {
    return Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  static async requestCamera(facing: FacingMode = 'user'): Promise<MediaStream> {
    this.stopCamera();
    this.currentFacing = facing;

    if (!this.isSupported()) {
      const err = new Error('BROWSER_UNSUPPORTED');
      err.name = 'NotSupportedError';
      throw err;
    }

    const constraints: MediaStreamConstraints = {
      audio: false,
      video: {
        facingMode: { ideal: facing },
        width: { ideal: 1920, min: 640 },
        height: { ideal: 1080, min: 480 },
        frameRate: { ideal: 30 },
      },
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      return this.stream;
    } catch (err: unknown) {
      // Fallback to basic video constraints if specific resolution was rejected
      const name = (err as DOMException)?.name;
      if (name !== 'NotAllowedError' && name !== 'PermissionDeniedError' && name !== 'NotFoundError') {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        return this.stream;
      }
      throw err;
    }
  }

  static stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  static getStream(): MediaStream | null {
    return this.stream;
  }

  static getFacing(): FacingMode {
    return this.currentFacing;
  }

  /**
   * Captures a single still image from a <video> element with proper aspect ratio and mirroring if selfie
   */
  static captureFrame(video: HTMLVideoElement, mirror = true): string {
    const canvas = document.createElement('canvas');
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');

    if (mirror) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.95);
  }

  static getFriendlyErrorMessage(err: unknown): string {
    const name = (err as DOMException)?.name || '';
    const msg = (err as Error)?.message || '';

    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      return 'Izin kamera ditolak. Silakan klik ikon gembok di address bar browser untuk mengizinkan akses kamera, lalu coba lagi.';
    }
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      return 'Kamera tidak ditemukan pada perangkat Anda.';
    }
    if (name === 'NotReadableError') {
      return 'Kamera sedang digunakan oleh aplikasi lain (Zoom, Teams, dll). Silakan tutup aplikasi tersebut lalu coba lagi.';
    }
    if (name === 'NotSupportedError' || msg === 'BROWSER_UNSUPPORTED') {
      return 'Browser tidak mengizinkan akses kamera di HTTP. Pastikan halaman diakses via HTTPS atau http://localhost:5173.';
    }
    return 'Gagal mengakses kamera. Pastikan browser mendukung kamera dan koneksi aman (HTTPS/localhost).';
  }
}
