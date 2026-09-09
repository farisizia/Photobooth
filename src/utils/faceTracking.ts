import {
  FilesetResolver,
  FaceLandmarker,
  FaceLandmarkerResult,
  NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { OverlayItem } from './overlays';

// Cache for decoded AR SVG images
const imageCache = new Map<string, HTMLImageElement>();

export function getCachedImage(url: string): Promise<HTMLImageElement> {
  if (imageCache.has(url)) {
    return Promise.resolve(imageCache.get(url)!);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

class FaceTrackerService {
  private landmarker: FaceLandmarker | null = null;
  private initPromise: Promise<FaceLandmarker | null> | null = null;
  private lastVideoTime = -1;

  // Offscreen downscaled canvas for lightweight, high-FPS AI inference
  private offscreenCanvas: HTMLCanvasElement | null = null;
  private offscreenCtx: CanvasRenderingContext2D | null = null;
  private lastDownscaleWidth = 0;
  private lastDownscaleHeight = 0;

  async init(): Promise<FaceLandmarker | null> {
    if (this.landmarker) return this.landmarker;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        // Resolve wasm fileset from fast CDN
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );

        // Try local model first, fallback to CDN if needed
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

        // Initialize with GPU delegate (WebGL/WebGPU) for maximum FPS on mobile
        this.landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: modelPath,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numFaces: 4, // Multi-person detection up to 4 faces
          minFaceDetectionConfidence: 0.45,
          minFacePresenceConfidence: 0.45,
          minTrackingConfidence: 0.45,
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
        });

        console.log('[FaceTracker] MediaPipe FaceLandmarker GPU initialized successfully.');
        return this.landmarker;
      } catch (err) {
        console.warn('[FaceTracker] Failed to initialize FaceLandmarker on GPU, trying CPU fallback:', err);
        try {
          const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
          );
          this.landmarker = await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: '/models/face_landmarker.task',
              delegate: 'CPU',
            },
            runningMode: 'VIDEO',
            numFaces: 4,
          });
          return this.landmarker;
        } catch (cpuErr) {
          console.error('[FaceTracker] Fatal FaceLandmarker initialization error:', cpuErr);
          return null;
        }
      }
    })();

    return this.initPromise;
  }

  isReady(): boolean {
    return Boolean(this.landmarker);
  }

  /**
   * Runs face detection on a lightweight downscaled frame (320x240 or 256x256)
   * to keep inference lightning fast (<5ms) while the camera video display stays
   * crystal clear and ultra-sharp at native 1080p/720p.
   */
  detect(video: HTMLVideoElement, timestamp: number): FaceLandmarkerResult | null {
    if (!this.landmarker || video.readyState < 2) return null;

    if (video.currentTime === this.lastVideoTime) return null;
    this.lastVideoTime = video.currentTime;

    const vWidth = video.videoWidth || 640;
    const vHeight = video.videoHeight || 480;

    // Dedicated 320x240 low-resolution target (maintains aspect ratio, max 320px)
    const maxDim = 320;
    let targetWidth = 320;
    let targetHeight = 240;

    if (vWidth >= vHeight) {
      targetWidth = maxDim;
      targetHeight = Math.max(160, Math.round(maxDim * (vHeight / vWidth)));
    } else {
      targetHeight = maxDim;
      targetWidth = Math.max(160, Math.round(maxDim * (vWidth / vHeight)));
    }

    if (
      !this.offscreenCanvas ||
      this.lastDownscaleWidth !== targetWidth ||
      this.lastDownscaleHeight !== targetHeight
    ) {
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCanvas.width = targetWidth;
      this.offscreenCanvas.height = targetHeight;
      this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
      this.lastDownscaleWidth = targetWidth;
      this.lastDownscaleHeight = targetHeight;
    }

    if (!this.offscreenCtx || !this.offscreenCanvas) return null;

    // Fast GPU draw onto 320x240 canvas
    this.offscreenCtx.drawImage(video, 0, 0, targetWidth, targetHeight);

    try {
      // Input is 320x240 offscreen canvas, landmarks returned in normalized 0.0-1.0 coordinates
      return this.landmarker.detectForVideo(this.offscreenCanvas, timestamp);
    } catch (err) {
      console.warn('[FaceTracker] Detection error:', err);
      return null;
    }
  }
}

/**
 * High-performance Web Worker Client that offloads MediaPipe neural network
 * face detection to a background thread, leaving the main JavaScript thread
 * 100% free for constant 60/120 FPS canvas rendering.
 */
class FaceTrackerWorkerClient {
  private worker: Worker | null = null;
  private workerReady = false;
  private isProcessing = false;
  private lastVideoTime = -1;
  private offscreenCanvas: HTMLCanvasElement | null = null;
  private offscreenCtx: CanvasRenderingContext2D | null = null;
  private onLandmarksCallback:
    | ((landmarks: NormalizedLandmark[][], timestamp: number) => void)
    | null = null;
  private fallbackService = new FaceTrackerService();
  private isFallback = false;
  private initPromise: Promise<boolean> | null = null;

  async init(): Promise<boolean> {
    if (this.workerReady) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        if (typeof Worker !== 'undefined') {
          this.worker = new Worker(
            new URL('../workers/faceDetector.worker.ts', import.meta.url),
            { type: 'module' }
          );

          this.worker.onmessage = (e: MessageEvent) => {
            const data = e.data;
            if (!data) return;

            if (data.type === 'INIT_SUCCESS') {
              this.workerReady = true;
              console.log('[FaceTrackerClient] Web Worker initialized successfully.');
            } else if (data.type === 'INIT_ERROR') {
              console.warn(
                '[FaceTrackerClient] Worker init error, falling back to in-thread MediaPipe:',
                data.error
              );
              this.useFallback();
            } else if (data.type === 'RESULT') {
              this.isProcessing = false;
              if (this.onLandmarksCallback) {
                this.onLandmarksCallback(data.faceLandmarks || [], data.timestamp);
              }
            }
          };

          this.worker.onerror = (err) => {
            console.warn('[FaceTrackerClient] Worker error, falling back to in-thread MediaPipe:', err);
            this.useFallback();
          };

          this.worker.postMessage({ type: 'INIT' });

          // Wait up to 3.5s for worker initialization
          await new Promise<void>((resolve) => {
            const startTime = Date.now();
            const interval = setInterval(() => {
              if (this.workerReady || this.isFallback || Date.now() - startTime > 3500) {
                clearInterval(interval);
                if (!this.workerReady && !this.isFallback) {
                  console.warn('[FaceTrackerClient] Worker init timeout, using fallback.');
                  this.useFallback();
                }
                resolve();
              }
            }, 100);
          });

          if (this.workerReady) return true;
        }
      } catch (e) {
        console.warn('[FaceTrackerClient] Could not spawn Web Worker, using fallback:', e);
        this.useFallback();
      }

      if (this.isFallback) {
        await this.fallbackService.init();
        return true;
      }

      return false;
    })();

    return this.initPromise;
  }

  private useFallback() {
    this.isFallback = true;
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  setCallback(cb: (landmarks: NormalizedLandmark[][], timestamp: number) => void) {
    this.onLandmarksCallback = cb;
  }

  requestDetection(video: HTMLVideoElement, timestamp: number): void {
    if (video.readyState < 2) return;
    if (video.currentTime === this.lastVideoTime) return;
    this.lastVideoTime = video.currentTime;

    const vWidth = video.videoWidth || 640;
    const vHeight = video.videoHeight || 480;

    // Downscale target: 320x240 or 256x256 for lightning-fast inference
    const maxDim = 320;
    let targetWidth = 320;
    let targetHeight = 240;

    if (vWidth >= vHeight) {
      targetWidth = maxDim;
      targetHeight = Math.max(160, Math.round(maxDim * (vHeight / vWidth)));
    } else {
      targetHeight = maxDim;
      targetWidth = Math.max(160, Math.round(maxDim * (vWidth / vHeight)));
    }

    if (
      !this.offscreenCanvas ||
      this.offscreenCanvas.width !== targetWidth ||
      this.offscreenCanvas.height !== targetHeight
    ) {
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCanvas.width = targetWidth;
      this.offscreenCanvas.height = targetHeight;
      this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
    }

    if (!this.offscreenCtx || !this.offscreenCanvas) return;

    this.offscreenCtx.drawImage(video, 0, 0, targetWidth, targetHeight);

    // If Web Worker is active, transfer ImageBitmap to worker without blocking main thread
    if (this.worker && this.workerReady && !this.isProcessing) {
      this.isProcessing = true;
      createImageBitmap(this.offscreenCanvas)
        .then((bitmap) => {
          if (this.worker && this.workerReady) {
            this.worker.postMessage({ type: 'DETECT', bitmap, timestamp }, [bitmap]);
          } else {
            bitmap.close();
            this.isProcessing = false;
          }
        })
        .catch((err) => {
          this.isProcessing = false;
          console.warn('[FaceTrackerClient] createImageBitmap error:', err);
        });
      return;
    }

    // In-thread fallback if worker is not available
    if (this.isFallback && this.fallbackService.isReady()) {
      const res = this.fallbackService.detect(video, timestamp);
      if (this.onLandmarksCallback) {
        this.onLandmarksCallback(res?.faceLandmarks || [], timestamp);
      }
    }
  }

  detect(video: HTMLVideoElement, timestamp: number): FaceLandmarkerResult | null {
    return this.fallbackService.detect(video, timestamp);
  }

  isReady(): boolean {
    return this.workerReady || (this.isFallback && this.fallbackService.isReady());
  }

  destroy(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.workerReady = false;
    this.isProcessing = false;
  }
}

export const faceTracker = new FaceTrackerWorkerClient();

/**
 * Geometric transform calculation for an individual face
 */
export interface FaceGeometry {
  forehead: { x: number; y: number };
  headTop: { x: number; y: number };
  noseBridge: { x: number; y: number };
  leftEye: { x: number; y: number };
  rightEye: { x: number; y: number };
  leftCheek: { x: number; y: number };
  rightCheek: { x: number; y: number };
  eyeDistance: number;
  earDistance: number;
  rollAngle: number; // in radians
  scale: number;
}

export interface ScreenMapping {
  toScreenX: (normX: number) => number;
  toScreenY: (normY: number) => number;
  scaleFactor: number;
}

/**
 * Projects normalized [0, 1] landmarks to container screen pixels matching
 * video object-cover scaling with 100% sub-pixel precision.
 */
export function computeCoverMapping(
  videoWidth: number,
  videoHeight: number,
  containerWidth: number,
  containerHeight: number,
  isMirrored: boolean
): ScreenMapping {
  const videoAspect = (videoWidth || 640) / (videoHeight || 480);
  const containerAspect = (containerWidth || 1) / (containerHeight || 1);

  let renderWidth = containerWidth;
  let renderHeight = containerHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (videoAspect > containerAspect) {
    // Video is wider than container: fits by height, cropped horizontally
    renderHeight = containerHeight;
    renderWidth = containerHeight * videoAspect;
    offsetX = (renderWidth - containerWidth) / 2;
  } else {
    // Video is taller than container: fits by width, cropped vertically
    renderWidth = containerWidth;
    renderHeight = containerWidth / videoAspect;
    offsetY = (renderHeight - containerHeight) / 2;
  }

  const scaleFactor = renderWidth / (videoWidth || 640);

  return {
    toScreenX: (normX: number) => {
      const x = isMirrored ? 1 - normX : normX;
      return x * renderWidth - offsetX;
    },
    toScreenY: (normY: number) => {
      return normY * renderHeight - offsetY;
    },
    scaleFactor,
  };
}

export function computeFaceGeometry(
  landmarks: NormalizedLandmark[],
  displayWidth: number,
  displayHeight: number,
  isMirrored = false,
  coverMapping?: ScreenMapping
): FaceGeometry {
  const toX = coverMapping
    ? coverMapping.toScreenX
    : (x: number) => (isMirrored ? (1 - x) * displayWidth : x * displayWidth);
  const toY = coverMapping
    ? coverMapping.toScreenY
    : (y: number) => y * displayHeight;

  // TWO EYE LANDMARKS AS PRIMARY ANCHORS:
  // Left eye corners: 33 (outer), 133 (inner)
  // Right eye corners: 263 (outer), 362 (inner)
  const l33 = landmarks[33] || landmarks[10];
  const l133 = landmarks[133] || l33;
  const l263 = landmarks[263] || landmarks[10];
  const l362 = landmarks[362] || l263;

  // Left & right eye center coordinates
  const leftEye = {
    x: toX((l33.x + l133.x) / 2),
    y: toY((l33.y + l133.y) / 2),
  };
  const rightEye = {
    x: toX((l263.x + l362.x) / 2),
    y: toY((l263.y + l362.y) / 2),
  };

  // 1. ANCHOR POSITION: Midpoint between both eyes (nose bridge)
  const eyeCenter = {
    x: (leftEye.x + rightEye.x) / 2,
    y: (leftEye.y + rightEye.y) / 2,
  };

  // 2. FILTER ROTATION: Angle between both eyes
  const dx = rightEye.x - leftEye.x;
  const dy = rightEye.y - leftEye.y;
  const eyeDistance = Math.hypot(dx, dy);
  const rollAngle = Math.atan2(dy, dx);

  // 3. FILTER SCALE: Distance between eyes
  // Normalize against standard eye distance (~22% of container width)
  const baseEyeDist = Math.max(30, displayWidth * 0.22);
  const scale = Math.max(0.35, Math.min(2.8, eyeDistance / baseEyeDist));

  // Head upward normal vector (perpendicular to eye line, towards top of head)
  const headUpX = -Math.sin(rollAngle);
  const headUpY = Math.cos(rollAngle);

  // Forehead anchor rigidly coupled to eye orientation & distance
  const l10 = landmarks[10];
  const rawForeheadX = l10 ? toX(l10.x) : eyeCenter.x - headUpX * (eyeDistance * 0.95);
  const rawForeheadY = l10 ? toY(l10.y) : eyeCenter.y - headUpY * (eyeDistance * 0.95);

  // Blend landmark 10 with perpendicular eye offset for ultra-stable forehead lock
  const forehead = {
    x: eyeCenter.x - headUpX * (eyeDistance * 0.95) * 0.7 + rawForeheadX * 0.3,
    y: eyeCenter.y - headUpY * (eyeDistance * 0.95) * 0.7 + rawForeheadY * 0.3,
  };

  // Top of head / crown of hair (atas kepala) rigidly anchored along head upward vector
  // Distance from eye center to crown of hair is ~1.38x eye distance
  const headTop = {
    x: eyeCenter.x - headUpX * (eyeDistance * 1.38),
    y: eyeCenter.y - headUpY * (eyeDistance * 1.38),
  };

  // Cheeks (for cute blushes/whiskers)
  const l205 = landmarks[205] || l33;
  const l425 = landmarks[425] || l263;
  const leftCheek = { x: toX(l205.x), y: toY(l205.y) };
  const rightCheek = { x: toX(l425.x), y: toY(l425.y) };

  // Ear to ear distance (head width)
  const l234 = landmarks[234] || l33;
  const l454 = landmarks[454] || l263;
  const earDistance = Math.hypot(toX(l454.x) - toX(l234.x), toY(l454.y) - toY(l234.y));

  return {
    forehead,
    headTop,
    noseBridge: eyeCenter,
    leftEye,
    rightEye,
    leftCheek,
    rightCheek,
    eyeDistance,
    earDistance,
    rollAngle,
    scale,
  };
}

// ============================================================================
// ONE EURO FILTER (1€ Filter) & ADAPTIVE DAMPING SMOOTHING PIPELINE
// Gold standard VR/AR head-tracking filter: Heavy damping when stationary to
// kill jitter completely, dynamic cutoff when moving fast to eliminate lag.
// ============================================================================

class LowPassFilter {
  private y: number | null = null;
  private s: number | null = null;

  filter(value: number, alpha: number): number {
    if (this.y === null) {
      this.s = value;
      this.y = value;
      return value;
    }
    this.s = alpha * value + (1 - alpha) * this.s!;
    this.y = this.s;
    return this.y;
  }

  hasLast(): boolean {
    return this.y !== null;
  }

  last(): number {
    return this.y ?? 0;
  }

  reset(): void {
    this.y = null;
    this.s = null;
  }
}

export class OneEuroFilter {
  private minCutoff: number; // Min cutoff frequency in Hz (lower = smoother when still)
  private beta: number; // Speed coefficient (higher = faster response to movement)
  private dCutoff: number; // Derivative cutoff
  private xFilter = new LowPassFilter();
  private dxFilter = new LowPassFilter();
  private lastTime: number | null = null;

  constructor(minCutoff = 0.8, beta = 0.006, dCutoff = 1.0) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
  }

  private alpha(rate: number, cutoff: number): number {
    const tau = 1.0 / (2 * Math.PI * cutoff);
    const te = 1.0 / rate;
    return 1.0 / (1.0 + tau / te);
  }

  filter(value: number, timestamp: number): number {
    if (this.lastTime === null) {
      this.lastTime = timestamp;
      return this.xFilter.filter(value, 1.0);
    }

    const dt = Math.max(1e-3, (timestamp - this.lastTime) / 1000.0);
    this.lastTime = timestamp;
    const rate = 1.0 / dt;

    // Estimate derivative (speed of head motion)
    const dx = this.xFilter.hasLast() ? (value - this.xFilter.last()) * rate : 0;
    const edx = this.dxFilter.filter(dx, this.alpha(rate, this.dCutoff));

    // Dynamic cutoff: high damping when stationary, responsive when moving
    const cutoff = this.minCutoff + this.beta * Math.abs(edx);
    return this.xFilter.filter(value, this.alpha(rate, cutoff));
  }

  reset(): void {
    this.xFilter.reset();
    this.dxFilter.reset();
    this.lastTime = null;
  }
}

/**
 * Filter for angles that unwraps cleanly across -PI / +PI
 */
export class OneEuroAngleFilter {
  private filterCos: OneEuroFilter;
  private filterSin: OneEuroFilter;

  constructor(minCutoff = 0.8, beta = 0.006) {
    this.filterCos = new OneEuroFilter(minCutoff, beta, 1.0);
    this.filterSin = new OneEuroFilter(minCutoff, beta, 1.0);
  }

  filter(angle: number, timestamp: number): number {
    const cos = this.filterCos.filter(Math.cos(angle), timestamp);
    const sin = this.filterSin.filter(Math.sin(angle), timestamp);
    return Math.atan2(sin, cos);
  }

  reset(): void {
    this.filterCos.reset();
    this.filterSin.reset();
  }
}

export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

export function lerpAngle(current: number, target: number, factor: number): number {
  let diff = (target - current) % (2 * Math.PI);
  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff -= 2 * Math.PI;
  return current + diff * factor;
}

export function lerpPoint(
  current: { x: number; y: number },
  target: { x: number; y: number },
  factor: number
): { x: number; y: number } {
  return {
    x: lerp(current.x, target.x, factor),
    y: lerp(current.y, target.y, factor),
  };
}

export function cloneGeometry(geo: FaceGeometry): FaceGeometry {
  return {
    forehead: { ...geo.forehead },
    headTop: { ...geo.headTop },
    noseBridge: { ...geo.noseBridge },
    leftEye: { ...geo.leftEye },
    rightEye: { ...geo.rightEye },
    leftCheek: { ...geo.leftCheek },
    rightCheek: { ...geo.rightCheek },
    eyeDistance: geo.eyeDistance,
    earDistance: geo.earDistance,
    rollAngle: geo.rollAngle,
    scale: geo.scale,
  };
}

export interface TrackedFaceResult {
  id: number;
  face: FaceGeometry;
  opacity: number;
  visible: boolean;
}

/**
 * Adaptive face filter featuring:
 * - Dead-zone for micro movement (kills 100% micro-jitter when stationary)
 * - Separate smoothing for position, scale, and rotation
 * - Adaptive LERP factors: strong smoothing when slow/still, fast responsiveness when moving
 * - Missing frame tolerance: keeps filter alive for up to 10 frames (~300ms) with gentle fade-out
 */
export class AdaptiveFaceFilter {
  id: number;
  missingFrames = 0;
  maxMissingFrames = 10; // ~300ms tolerance for blinks & brief occlusions

  // Dead-zone thresholds for micro movement (in screen space)
  private readonly DEAD_ZONE_POS = 1.2; // pixels
  private readonly DEAD_ZONE_SCALE = 0.006;
  private readonly DEAD_ZONE_ROT = 0.007; // ~0.4 degrees

  public current: FaceGeometry;
  public target: FaceGeometry;
  public opacity = 1.0;
  private targetOpacity = 1.0;

  constructor(id: number, initial: FaceGeometry) {
    this.id = id;
    this.current = cloneGeometry(initial);
    this.target = cloneGeometry(initial);
  }

  update(raw: FaceGeometry): void {
    this.missingFrames = 0;
    this.target = cloneGeometry(raw);
    this.targetOpacity = 1.0;
  }

  markMissing(): boolean {
    this.missingFrames += 1;
    // When missing for several frames, smoothly fade out instead of popping or jumping
    if (this.missingFrames > 3) {
      this.targetOpacity = Math.max(0, 1.0 - (this.missingFrames - 3) / 7);
    }
    return this.missingFrames <= this.maxMissingFrames;
  }

  /**
   * Adaptive step called at 60 FPS in requestAnimationFrame.
   * Separate smoothing for position, scale, and rotation with velocity-adaptive factor.
   */
  step(): FaceGeometry {
    // 1. POSITION (Nose Bridge / Eye Center & Forehead)
    const posDist = Math.hypot(
      this.target.noseBridge.x - this.current.noseBridge.x,
      this.target.noseBridge.y - this.current.noseBridge.y
    );

    if (posDist > this.DEAD_ZONE_POS) {
      // Adaptive smoothing: heavy damping (0.12) when still, fast responsive (0.55) when moving fast
      const speedRatio = Math.min(1.0, (posDist - this.DEAD_ZONE_POS) / 28);
      const posFactor = 0.12 + speedRatio * 0.43;

      this.current.noseBridge = lerpPoint(this.current.noseBridge, this.target.noseBridge, posFactor);
      this.current.forehead = lerpPoint(this.current.forehead, this.target.forehead, posFactor);
      this.current.headTop = lerpPoint(this.current.headTop, this.target.headTop, posFactor);
      this.current.leftEye = lerpPoint(this.current.leftEye, this.target.leftEye, posFactor);
      this.current.rightEye = lerpPoint(this.current.rightEye, this.target.rightEye, posFactor);
      this.current.leftCheek = lerpPoint(this.current.leftCheek, this.target.leftCheek, posFactor);
      this.current.rightCheek = lerpPoint(this.current.rightCheek, this.target.rightCheek, posFactor);
    }

    // 2. SCALE (Smoothed separately with higher damping to prevent pulsating)
    const scaleDiff = Math.abs(this.target.scale - this.current.scale);
    if (scaleDiff > this.DEAD_ZONE_SCALE) {
      const scaleRatio = Math.min(1.0, (scaleDiff - this.DEAD_ZONE_SCALE) / 0.12);
      const scaleFactor = 0.08 + scaleRatio * 0.26;
      this.current.scale = lerp(this.current.scale, this.target.scale, scaleFactor);
      this.current.eyeDistance = lerp(this.current.eyeDistance, this.target.eyeDistance, scaleFactor);
      this.current.earDistance = lerp(this.current.earDistance, this.target.earDistance, scaleFactor);
    }

    // 3. ROTATION (Smoothed separately with angular wrap-around handling)
    let rotDiff = (this.target.rollAngle - this.current.rollAngle) % (2 * Math.PI);
    if (rotDiff > Math.PI) rotDiff -= 2 * Math.PI;
    if (rotDiff < -Math.PI) rotDiff -= 2 * Math.PI;

    if (Math.abs(rotDiff) > this.DEAD_ZONE_ROT) {
      const rotRatio = Math.min(1.0, (Math.abs(rotDiff) - this.DEAD_ZONE_ROT) / 0.20);
      const rotFactor = 0.10 + rotRatio * 0.30;
      this.current.rollAngle += rotDiff * rotFactor;
    }

    // 4. OPACITY SMOOTHING
    this.opacity += (this.targetOpacity - this.opacity) * 0.20;

    return this.current;
  }
}

/**
 * Multi-person adaptive face tracker managing up to 4 persistent faces
 */
export class MultiPersonAdaptiveTracker {
  private tracked: AdaptiveFaceFilter[] = [];
  private nextId = 1;

  update(rawGeometries: FaceGeometry[]): void {
    const updated: AdaptiveFaceFilter[] = [];
    const unmatched = [...rawGeometries];

    // Match existing tracked faces with nearest neighbor
    this.tracked.forEach((item) => {
      let closestIdx = -1;
      let minDist = 220 * item.current.scale;

      unmatched.forEach((raw, idx) => {
        const dist = Math.hypot(
          raw.noseBridge.x - item.current.noseBridge.x,
          raw.noseBridge.y - item.current.noseBridge.y
        );
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== -1) {
        const matched = unmatched.splice(closestIdx, 1)[0];
        item.update(matched);
        updated.push(item);
      } else {
        const keep = item.markMissing();
        if (keep) {
          updated.push(item);
        }
      }
    });

    // Add new faces up to max 4
    unmatched.forEach((raw) => {
      if (updated.length < 4) {
        updated.push(new AdaptiveFaceFilter(this.nextId++, raw));
      }
    });

    this.tracked = updated;
  }

  step(): TrackedFaceResult[] {
    return this.tracked.map((t) => ({
      id: t.id,
      face: t.step(),
      opacity: t.opacity,
      visible: t.opacity > 0.02,
    }));
  }

  getGeometries(): FaceGeometry[] {
    return this.tracked.map((t) => t.current);
  }

  getFaceCount(): number {
    return this.tracked.filter((t) => t.missingFrames === 0).length;
  }

  reset(): void {
    this.tracked = [];
  }
}

// Backward compatibility alias
export { MultiPersonAdaptiveTracker as MultiPersonTracker };

export interface TrackedFace {
  id: number;
  current: FaceGeometry;
  target: FaceGeometry;
  missingFrames: number;
}

let nextLegacyFaceId = 1;

export function matchAndUpdateTrackedFaces(
  existing: TrackedFace[],
  rawGeometries: FaceGeometry[]
): TrackedFace[] {
  const updated: TrackedFace[] = [];
  const unmatchedIncoming = [...rawGeometries];

  existing.forEach((tracked) => {
    let closestIndex = -1;
    let minDistance = 200 * tracked.current.scale;

    unmatchedIncoming.forEach((raw, idx) => {
      const dist = Math.hypot(
        raw.noseBridge.x - tracked.current.noseBridge.x,
        raw.noseBridge.y - tracked.current.noseBridge.y
      );
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex !== -1) {
      const matched = unmatchedIncoming.splice(closestIndex, 1)[0];
      tracked.target = matched;
      tracked.missingFrames = 0;
      updated.push(tracked);
    } else {
      tracked.missingFrames += 1;
      if (tracked.missingFrames <= 6) {
        updated.push(tracked);
      }
    }
  });

  unmatchedIncoming.forEach((raw) => {
    if (updated.length < 4) {
      updated.push({
        id: nextLegacyFaceId++,
        current: cloneGeometry(raw),
        target: raw,
        missingFrames: 0,
      });
    }
  });

  return updated;
}

export function stepSmoothedFaces(trackedFaces: TrackedFace[], factor = 0.25): FaceGeometry[] {
  return trackedFaces.map((tracked) => {
    tracked.current.forehead = lerpPoint(tracked.current.forehead, tracked.target.forehead, factor);
    tracked.current.headTop = lerpPoint(tracked.current.headTop, tracked.target.headTop, factor);
    tracked.current.noseBridge = lerpPoint(
      tracked.current.noseBridge,
      tracked.target.noseBridge,
      factor
    );
    tracked.current.leftEye = lerpPoint(tracked.current.leftEye, tracked.target.leftEye, factor);
    tracked.current.rightEye = lerpPoint(tracked.current.rightEye, tracked.target.rightEye, factor);
    tracked.current.leftCheek = lerpPoint(
      tracked.current.leftCheek,
      tracked.target.leftCheek,
      factor
    );
    tracked.current.rightCheek = lerpPoint(
      tracked.current.rightCheek,
      tracked.target.rightCheek,
      factor
    );
    tracked.current.eyeDistance = lerp(
      tracked.current.eyeDistance,
      tracked.target.eyeDistance,
      factor
    );
    tracked.current.earDistance = lerp(
      tracked.current.earDistance,
      tracked.target.earDistance,
      factor
    );
    tracked.current.scale = lerp(tracked.current.scale, tracked.target.scale, factor);
    tracked.current.rollAngle = lerpAngle(
      tracked.current.rollAngle,
      tracked.target.rollAngle,
      factor
    );

    return tracked.current;
  });
}

/**
 * Renders AR effect on all smoothed faces with jitter-free high-precision transforms
 */
export function renderArEffectsFromGeometries(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  geometries: FaceGeometry[],
  overlayItem: OverlayItem,
  effectImg: HTMLImageElement | null
) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (!overlayItem.isArEffect || geometries.length === 0 || !effectImg) return;

  const isHeadTop =
    overlayItem.id.includes('ears') ||
    overlayItem.id.includes('horns') ||
    overlayItem.id.includes('halo') ||
    overlayItem.id.includes('puppy');

  geometries.forEach((geo) => {
    // 1. SUNGLASSES / EYEWEAR / VISOR (Anchored at Nose Bridge)
    if (overlayItem.arAnchor === 'eyes') {
      const glassesWidth = Math.max(120, geo.eyeDistance * 2.25);
      const aspect =
        effectImg.naturalWidth && effectImg.naturalHeight
          ? effectImg.naturalWidth / effectImg.naturalHeight
          : 3;
      const glassesHeight = glassesWidth / aspect;

      ctx.save();
      ctx.translate(geo.noseBridge.x, geo.noseBridge.y);
      ctx.rotate(geo.rollAngle);
      ctx.drawImage(effectImg, -glassesWidth / 2, -glassesHeight / 2, glassesWidth, glassesHeight);
      ctx.restore();
    }

    // 2. CHEEKS (Anchored on Left & Right Cheeks)
    else if (overlayItem.arAnchor === 'cheeks') {
      const cheekSize = Math.max(36, geo.eyeDistance * 0.45);
      ctx.save();
      ctx.translate(geo.leftCheek.x, geo.leftCheek.y);
      ctx.rotate(geo.rollAngle);
      ctx.drawImage(effectImg, -cheekSize / 2, -cheekSize / 2, cheekSize, cheekSize);
      ctx.restore();

      ctx.save();
      ctx.translate(geo.rightCheek.x, geo.rightCheek.y);
      ctx.rotate(geo.rollAngle);
      ctx.drawImage(effectImg, -cheekSize / 2, -cheekSize / 2, cheekSize, cheekSize);
      ctx.restore();
    }

    // 3. EARS / HORNS / HALO (Anchored at Top of Head / Crown of Hair)
    else if (isHeadTop) {
      const earsWidth = Math.max(130, geo.eyeDistance * 2.3);
      const aspect =
        effectImg.naturalWidth && effectImg.naturalHeight
          ? effectImg.naturalWidth / effectImg.naturalHeight
          : 360 / 260;
      const earsHeight = earsWidth / aspect;

      ctx.save();
      ctx.translate(geo.headTop.x, geo.headTop.y);
      ctx.rotate(geo.rollAngle);
      ctx.drawImage(effectImg, -earsWidth / 2, -earsHeight * 0.77, earsWidth, earsHeight);
      ctx.restore();
    }

    // 4. FLORAL CROWN / HEADBAND / TIARA / BEANIE (Anchored on Forehead)
    else {
      const crownWidth = Math.max(150, Math.max(geo.earDistance * 1.3, geo.eyeDistance * 2.9));
      const aspect =
        effectImg.naturalWidth && effectImg.naturalHeight
          ? effectImg.naturalWidth / effectImg.naturalHeight
          : 2.25;
      const crownHeight = crownWidth / aspect;

      ctx.save();
      ctx.translate(geo.forehead.x, geo.forehead.y);
      ctx.rotate(geo.rollAngle);
      ctx.drawImage(effectImg, -crownWidth / 2, -crownHeight * 0.85, crownWidth, crownHeight);
      ctx.restore();
    }
  });
}
