import { CameraService } from './CameraService';
import { captureFrame } from '../utils/canvas';

class PhotoCaptureServiceImpl {
  captureFromVideo(video: HTMLVideoElement): string {
    if (!video || video.readyState < 2) {
      throw new Error('Kamera belum siap. Tunggu sebentar lalu coba lagi.');
    }
    return captureFrame(video, { mirror: CameraService.isMirrored() });
  }
}

export const PhotoCaptureService = new PhotoCaptureServiceImpl();
