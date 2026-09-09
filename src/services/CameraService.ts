export type FacingMode = 'user' | 'environment';

class CameraServiceImpl {
  private stream: MediaStream | null = null;
  private facing: FacingMode = 'user';
  private mirrored = true;

  getStream() {
    return this.stream;
  }

  getFacing() {
    return this.facing;
  }

  isMirrored() {
    return this.mirrored && this.facing === 'user';
  }

  isSupported() {
    return Boolean(navigator.mediaDevices?.getUserMedia);
  }

  async start(facing: FacingMode = 'user'): Promise<MediaStream> {
    this.stop();
    this.facing = facing;
    this.mirrored = facing === 'user';

    if (!this.isSupported()) {
      const err = new Error('BROWSER_UNSUPPORTED');
      err.name = 'NotSupportedError';
      throw err;
    }

    const constraints: MediaStreamConstraints = {
      audio: false,
      video: {
        facingMode: { ideal: facing },
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 24, max: 30 },
      },
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      const name = (err as DOMException)?.name;
      if (name !== 'NotAllowedError' && name !== 'PermissionDeniedError' && name !== 'NotFoundError') {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      } else {
        throw err;
      }
    }

    return this.stream;
  }

  async switchFacing(): Promise<MediaStream> {
    const next: FacingMode = this.facing === 'user' ? 'environment' : 'user';
    return this.start(next);
  }

  toggleMirror(): boolean {
    this.mirrored = !this.mirrored;
    return this.isMirrored();
  }

  stop() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
  }

  friendlyError(err: unknown): string {
    const name = (err as DOMException)?.name || '';
    const message = (err as Error)?.message || '';
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      return 'Izin kamera ditolak. Buka pengaturan browser, izinkan kamera, lalu coba lagi.';
    }
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      return 'Tidak ada kamera di perangkat ini.';
    }
    if (name === 'NotReadableError') {
      return 'Kamera sedang dipakai aplikasi lain. Tutup aplikasi itu lalu coba lagi.';
    }
    if (name === 'NotSupportedError' || message === 'BROWSER_UNSUPPORTED') {
      return 'Kamera tidak dapat diakses. Browser mewajibkan koneksi aman (HTTPS) atau localhost. Pastikan membuka dengan https:// atau via http://localhost:5173.';
    }
    if (name === 'OverconstrainedError') {
      return 'Kamera tidak mendukung resolusi yang diminta. Coba lagi.';
    }
    return 'Gagal membuka kamera. Pastikan halaman diakses lewat HTTPS atau localhost dan izin kamera diberikan.';
  }
}

export const CameraService = new CameraServiceImpl();
