import { Room, Participant, PublicRoom, PublicParticipant } from './types.js';

const MAX_PARTICIPANTS = Number(process.env.MAX_PARTICIPANTS || 10);
const ROOM_TTL_MS = Number(process.env.ROOM_TTL_MS || 4 * 60 * 60 * 1000); // 4 hours
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I

function generateCode(length = 6): string {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

function toPublicParticipant(p: Participant): PublicParticipant {
  return {
    id: p.id,
    name: p.name,
    isHost: p.isHost,
    cameraOn: p.cameraOn,
    micOn: p.micOn,
    connectionStatus: p.connectionStatus,
    joinedAt: p.joinedAt,
  };
}

export class RoomManager {
  private rooms = new Map<string, Room>();
  private socketToRoom = new Map<string, string>();
  private socketToParticipant = new Map<string, string>();

  constructor() {
    // Periodic cleanup of expired rooms
    setInterval(() => this.cleanupExpired(), 5 * 60 * 1000);
  }

  getMaxParticipants() {
    return MAX_PARTICIPANTS;
  }

  createRoom(opts: {
    hostSocketId: string;
    hostName: string;
    password?: string;
    eventName?: string;
  }): { room: Room; host: Participant } {
    let code = generateCode();
    while (this.rooms.has(code)) code = generateCode();

    const hostId = crypto.randomUUID();
    const now = Date.now();

    const host: Participant = {
      id: hostId,
      socketId: opts.hostSocketId,
      name: opts.hostName.trim().slice(0, 24) || 'Host',
      isHost: true,
      cameraOn: false,
      micOn: false,
      connectionStatus: 'connected',
      joinedAt: now,
    };

    const room: Room = {
      code,
      hostId,
      password: opts.password?.trim() || undefined,
      createdAt: now,
      lastActivity: now,
      participants: new Map([[hostId, host]]),
      photos: new Map(),
      sessionActive: false,
      captureAt: null,
      eventName: opts.eventName?.trim().slice(0, 32) || 'LIVE PHOTOBOOTH',
      caption: 'MEMORIES TO KEEP',
      dateText: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      templateId: 'classic',
      bgColor: '#FFFFFF',
    };

    this.rooms.set(code, room);
    this.socketToRoom.set(opts.hostSocketId, code);
    this.socketToParticipant.set(opts.hostSocketId, hostId);
    return { room, host };
  }

  joinRoom(opts: {
    code: string;
    socketId: string;
    name: string;
    password?: string;
  }): { room: Room; participant: Participant } | { error: string } {
    const code = opts.code.toUpperCase().trim();
    const room = this.rooms.get(code);
    if (!room) return { error: 'ROOM_NOT_FOUND' };

    if (Date.now() - room.lastActivity > ROOM_TTL_MS) {
      this.deleteRoom(code);
      return { error: 'ROOM_EXPIRED' };
    }

    if (room.password && room.password !== (opts.password || '').trim()) {
      return { error: 'INVALID_PASSWORD' };
    }

    if (room.participants.size >= MAX_PARTICIPANTS) {
      return { error: 'ROOM_FULL' };
    }

    const id = crypto.randomUUID();
    const now = Date.now();
    const participant: Participant = {
      id,
      socketId: opts.socketId,
      name: opts.name.trim().slice(0, 24) || 'Guest',
      isHost: false,
      cameraOn: false,
      micOn: false,
      connectionStatus: 'connected',
      joinedAt: now,
    };

    room.participants.set(id, participant);
    room.lastActivity = now;
    this.socketToRoom.set(opts.socketId, code);
    this.socketToParticipant.set(opts.socketId, id);
    return { room, participant };
  }

  leaveBySocket(socketId: string): {
    room?: Room;
    left?: Participant;
    hostTransferred?: Participant;
    roomDeleted?: boolean;
  } {
    const code = this.socketToRoom.get(socketId);
    const pid = this.socketToParticipant.get(socketId);
    this.socketToRoom.delete(socketId);
    this.socketToParticipant.delete(socketId);
    if (!code || !pid) return {};

    const room = this.rooms.get(code);
    if (!room) return {};

    const left = room.participants.get(pid);
    room.participants.delete(pid);
    room.photos.delete(pid);
    room.lastActivity = Date.now();

    if (room.participants.size === 0) {
      this.deleteRoom(code);
      return { left, roomDeleted: true };
    }

    let hostTransferred: Participant | undefined;
    if (left?.isHost) {
      const next = Array.from(room.participants.values())[0];
      if (next) {
        next.isHost = true;
        room.hostId = next.id;
        hostTransferred = next;
      }
    }

    return { room, left, hostTransferred };
  }

  reconnect(opts: {
    code: string;
    participantId: string;
    socketId: string;
  }): { room: Room; participant: Participant } | { error: string } {
    const room = this.rooms.get(opts.code.toUpperCase());
    if (!room) return { error: 'ROOM_NOT_FOUND' };
    const participant = room.participants.get(opts.participantId);
    if (!participant) return { error: 'PARTICIPANT_NOT_FOUND' };

    // Drop old socket mapping if any
    this.socketToRoom.delete(participant.socketId);
    this.socketToParticipant.delete(participant.socketId);

    participant.socketId = opts.socketId;
    participant.connectionStatus = 'connected';
    room.lastActivity = Date.now();
    this.socketToRoom.set(opts.socketId, room.code);
    this.socketToParticipant.set(opts.socketId, participant.id);
    return { room, participant };
  }

  getRoomBySocket(socketId: string): { room: Room; participant: Participant } | null {
    const code = this.socketToRoom.get(socketId);
    const pid = this.socketToParticipant.get(socketId);
    if (!code || !pid) return null;
    const room = this.rooms.get(code);
    const participant = room?.participants.get(pid);
    if (!room || !participant) return null;
    return { room, participant };
  }

  getRoom(code: string): Room | undefined {
    return this.rooms.get(code.toUpperCase());
  }

  setCamera(socketId: string, cameraOn: boolean) {
    const ctx = this.getRoomBySocket(socketId);
    if (!ctx) return null;
    ctx.participant.cameraOn = cameraOn;
    ctx.room.lastActivity = Date.now();
    return ctx;
  }

  setMic(socketId: string, micOn: boolean) {
    const ctx = this.getRoomBySocket(socketId);
    if (!ctx) return null;
    ctx.participant.micOn = micOn;
    return ctx;
  }

  updateSettings(
    socketId: string,
    patch: Partial<Pick<Room, 'eventName' | 'caption' | 'dateText' | 'templateId' | 'bgColor'>>
  ) {
    const ctx = this.getRoomBySocket(socketId);
    if (!ctx || !ctx.participant.isHost) return null;
    if (patch.eventName !== undefined) ctx.room.eventName = patch.eventName.slice(0, 32);
    if (patch.caption !== undefined) ctx.room.caption = patch.caption.slice(0, 48);
    if (patch.dateText !== undefined) ctx.room.dateText = patch.dateText.slice(0, 32);
    if (patch.templateId !== undefined) ctx.room.templateId = patch.templateId;
    if (patch.bgColor !== undefined) ctx.room.bgColor = patch.bgColor;
    ctx.room.lastActivity = Date.now();
    return ctx.room;
  }

  startPhotoSession(socketId: string, countdownMs = 3000):
    | { room: Room; captureAt: number; serverNow: number; countdownMs: number }
    | { error: string } {
    const ctx = this.getRoomBySocket(socketId);
    if (!ctx) return { error: 'NOT_IN_ROOM' };
    if (!ctx.participant.isHost) return { error: 'NOT_HOST' };
    if (ctx.room.sessionActive) return { error: 'SESSION_ACTIVE' };

    const serverNow = Date.now();
    const captureAt = serverNow + countdownMs;
    ctx.room.sessionActive = true;
    ctx.room.captureAt = captureAt;
    ctx.room.photos.clear();
    ctx.room.lastActivity = serverNow;
    return { room: ctx.room, captureAt, serverNow, countdownMs };
  }

  addPhoto(socketId: string, dataUrl: string): { room: Room; uploaded: number; total: number } | { error: string } {
    const ctx = this.getRoomBySocket(socketId);
    if (!ctx) return { error: 'NOT_IN_ROOM' };
    if (!ctx.room.sessionActive) return { error: 'NO_SESSION' };

    // Basic sanity: data URL jpeg/png, cap ~3MB string
    if (typeof dataUrl !== 'string' || dataUrl.length > 3_500_000) {
      return { error: 'PHOTO_TOO_LARGE' };
    }
    if (!dataUrl.startsWith('data:image/')) {
      return { error: 'INVALID_PHOTO' };
    }

    ctx.room.photos.set(ctx.participant.id, dataUrl);
    ctx.room.lastActivity = Date.now();
    return {
      room: ctx.room,
      uploaded: ctx.room.photos.size,
      total: ctx.room.participants.size,
    };
  }

  completeSessionIfReady(room: Room): boolean {
    if (!room.sessionActive) return false;
    if (room.photos.size < room.participants.size) return false;
    room.sessionActive = false;
    room.captureAt = null;
    return true;
  }

  getPhotosPayload(room: Room) {
    return Array.from(room.photos.entries()).map(([participantId, dataUrl]) => {
      const p = room.participants.get(participantId);
      return {
        participantId,
        name: p?.name || 'Unknown',
        dataUrl,
      };
    });
  }

  cancelSession(socketId: string) {
    const ctx = this.getRoomBySocket(socketId);
    if (!ctx || !ctx.participant.isHost) return null;
    ctx.room.sessionActive = false;
    ctx.room.captureAt = null;
    ctx.room.photos.clear();
    return ctx.room;
  }

  toPublic(room: Room): PublicRoom {
    return {
      code: room.code,
      hostId: room.hostId,
      createdAt: room.createdAt,
      maxParticipants: MAX_PARTICIPANTS,
      participantCount: room.participants.size,
      participants: Array.from(room.participants.values()).map(toPublicParticipant),
      sessionActive: room.sessionActive,
      eventName: room.eventName,
      caption: room.caption,
      dateText: room.dateText,
      templateId: room.templateId,
      bgColor: room.bgColor,
      hasPassword: Boolean(room.password),
    };
  }

  private deleteRoom(code: string) {
    const room = this.rooms.get(code);
    if (!room) return;
    for (const p of room.participants.values()) {
      this.socketToRoom.delete(p.socketId);
      this.socketToParticipant.delete(p.socketId);
    }
    this.rooms.delete(code);
  }

  private cleanupExpired() {
    const now = Date.now();
    for (const [code, room] of this.rooms) {
      if (now - room.lastActivity > ROOM_TTL_MS) {
        this.deleteRoom(code);
      }
    }
  }
}

export const roomManager = new RoomManager();
