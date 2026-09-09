import { io, Socket } from 'socket.io-client';
import type {
  BoothSettings,
  CountdownEvent,
  PhotoPayload,
  PublicParticipant,
  PublicRoom,
  SelfIdentity,
} from '../types/photobooth';

const getSocketUrl = (): string | undefined => {
  const envUrl = import.meta.env.VITE_SOCKET_URL;
  if (!envUrl) return undefined;

  // If page is accessed via LAN IP / custom domain, do not connect to localhost
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))
  ) {
    return undefined;
  }
  return envUrl;
};

type Ack<T> = { ok: boolean; error?: string; data?: T };

class SignalingServiceImpl {
  private socket: Socket | null = null;
  private connecting = false;

  connect(): Socket {
    if (this.socket?.connected) return this.socket;
    if (this.socket) return this.socket;

    this.connecting = true;
    const targetUrl = getSocketUrl();
    this.socket = io(targetUrl || window.location.origin, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 800,
      reconnectionDelayMax: 5000,
      timeout: 10000,
    });

    this.socket.on('connect', () => {
      this.connecting = false;
      console.log('[SignalingService] Connected successfully. Socket ID:', this.socket?.id);
    });

    this.socket.on('connect_error', (err) => {
      this.connecting = false;
      console.error('[SignalingService] Connection error:', err.message);
    });

    return this.socket;
  }

  getSocket() {
    return this.socket;
  }

  isConnected() {
    return Boolean(this.socket?.connected);
  }

  isConnecting() {
    return this.connecting && !this.socket?.connected;
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.connecting = false;
  }

  private emitAck<T>(event: string, payload?: unknown): Promise<T> {
    const socket = this.connect();
    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => reject(new Error('Server tidak merespons. Coba lagi.')), 8000);

      const doEmit = () => {
        socket.emit(event, payload, (ack: Ack<T>) => {
          window.clearTimeout(timer);
          if (!ack?.ok) reject(new Error(ack?.error || 'Gagal terhubung ke server.'));
          else resolve(ack.data as T);
        });
      };

      if (socket.connected) {
        doEmit();
      } else {
        socket.once('connect', doEmit);
        socket.once('connect_error', (err) => {
          window.clearTimeout(timer);
          reject(new Error(`Koneksi server gagal: ${err.message}`));
        });
      }
    });
  }

  createRoom(name: string, password?: string, eventName?: string) {
    return this.emitAck<{ room: PublicRoom; self: SelfIdentity }>('create-room', { name, password, eventName });
  }

  joinRoom(code: string, name: string, password?: string) {
    return this.emitAck<{ room: PublicRoom; self: SelfIdentity }>('join-room', { code, name, password });
  }

  reconnectRoom(code: string, participantId: string) {
    return this.emitAck<{ room: PublicRoom; self: SelfIdentity }>('reconnect-room', { code, participantId });
  }

  leaveRoom() {
    this.socket?.emit('leave-room');
  }

  sendOffer(to: string, sdp: RTCSessionDescriptionInit) {
    this.socket?.emit('offer', { to, sdp });
  }

  sendAnswer(to: string, sdp: RTCSessionDescriptionInit) {
    this.socket?.emit('answer', { to, sdp });
  }

  sendIce(to: string, candidate: RTCIceCandidateInit) {
    this.socket?.emit('ice-candidate', { to, candidate });
  }

  cameraOn() {
    this.socket?.emit('camera-on');
  }

  cameraOff() {
    this.socket?.emit('camera-off');
  }

  startPhotoSession(countdownMs = 3000) {
    return this.emitAck<CountdownEvent>('photo-session-start', { countdownMs });
  }

  uploadPhoto(dataUrl: string) {
    return this.emitAck<{ uploaded: number; total: number }>('photo-uploaded', { dataUrl });
  }

  updateSettings(patch: Partial<BoothSettings>) {
    return this.emitAck<{ room: PublicRoom }>('update-settings', patch);
  }

  on<T>(event: string, handler: (data: T) => void) {
    this.connect().on(event, handler);
    return () => {
      this.socket?.off(event, handler);
    };
  }
}

export const SignalingService = new SignalingServiceImpl();

export type {
  PublicRoom,
  PublicParticipant,
  SelfIdentity,
  PhotoPayload,
  CountdownEvent,
};
