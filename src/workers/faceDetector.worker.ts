import {
  FilesetResolver,
  FaceLandmarker,
  FaceLandmarkerResult,
  NormalizedLandmark,
} from '@mediapipe/tasks-vision';

let landmarker: FaceLandmarker | null = null;
let isInitializing = false;
let isBusy = false;

async function initLandmarker(): Promise<FaceLandmarker | null> {
  if (landmarker) return landmarker;
  if (isInitializing) return null;
  isInitializing = true;

  try {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
    );

    let modelPath = '/models/face_landmarker.task';
    try {
      const testRes = await fetch(modelPath, { method: 'HEAD' });
      if (!testRes.ok) {
        modelPath =
          'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
      }
    } catch {
      modelPath =
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
    }

    try {
      landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelPath,
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numFaces: 4,
        minFaceDetectionConfidence: 0.4,
        minFacePresenceConfidence: 0.4,
        minTrackingConfidence: 0.4,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      });
      console.log('[FaceWorker] MediaPipe GPU delegate initialized in background worker.');
    } catch (gpuErr) {
      console.warn('[FaceWorker] GPU delegate fallback to CPU in worker:', gpuErr);
      landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelPath,
          delegate: 'CPU',
        },
        runningMode: 'VIDEO',
        numFaces: 4,
      });
    }

    self.postMessage({ type: 'INIT_SUCCESS' });
    return landmarker;
  } catch (err) {
    console.error('[FaceWorker] Fatal initialization error:', err);
    self.postMessage({ type: 'INIT_ERROR', error: String(err) });
    return null;
  } finally {
    isInitializing = false;
  }
}

self.onmessage = async (e: MessageEvent) => {
  const data = e.data;
  if (!data) return;

  if (data.type === 'INIT') {
    await initLandmarker();
    return;
  }

  if (data.type === 'DETECT') {
    const bitmap = data.bitmap as ImageBitmap;
    const timestamp = data.timestamp as number;

    if (!landmarker) {
      if (bitmap) bitmap.close();
      await initLandmarker();
      return;
    }

    // Skip frame if previous inference is still processing to avoid queue lag
    if (isBusy) {
      if (bitmap) bitmap.close();
      return;
    }

    isBusy = true;
    try {
      const result: FaceLandmarkerResult = landmarker.detectForVideo(bitmap, timestamp);
      const faceLandmarks: NormalizedLandmark[][] = result.faceLandmarks || [];

      self.postMessage({
        type: 'RESULT',
        faceLandmarks,
        timestamp,
      });
    } catch (err) {
      console.warn('[FaceWorker] Detection error:', err);
      self.postMessage({
        type: 'RESULT',
        faceLandmarks: [],
        timestamp,
      });
    } finally {
      if (bitmap) {
        bitmap.close();
      }
      isBusy = false;
    }
  }
};
