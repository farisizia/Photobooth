import { Server, Socket } from 'socket.io';
import { roomManager } from './roomManager.js';
import type { SocketAck } from './types.js';

const ERROR_MESSAGES: Record<string, string> = {
  ROOM_NOT_FOUND: 'Room tidak ditemukan. Cek kode room-nya ya.',
  ROOM_EXPIRED: 'Room sudah kadaluarsa. Buat room baru.',
  ROOM_FULL: 'Room penuh. Maksimal peserta tercapai.',
  INVALID_PASSWORD: 'Password room salah.',
  NOT_IN_ROOM: 'Kamu tidak sedang di dalam room.',
  NOT_HOST: 'Hanya host yang bisa melakukan ini.',
  SESSION_ACTIVE: 'Sesi foto sedang berjalan.',
  NO_SESSION: 'Tidak ada sesi foto aktif.',
  PHOTO_TOO_LARGE: 'Foto terlalu besar. Coba turunkan kualitas.',
  INVALID_PHOTO: 'Format foto tidak valid.',
  PARTICIPANT_NOT_FOUND: 'Peserta tidak ditemukan. Join ulang room.',
  NAME_REQUIRED: 'Nama wajib diisi.',
  CODE_REQUIRED: 'Kode room wajib diisi.',
};

function friendly(code: string) {
  return ERROR_MESSAGES[code] || 'Terjadi kesalahan. Coba lagi.';
}

function ackError(code: string): SocketAck {
  return { ok: false, error: friendly(code) };
}

export function registerSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.on('create-room', (payload: { name?: string; password?: string; eventName?: string }, cb?: (ack: SocketAck) => void) => {
      const name = (payload?.name || '').trim();
      if (!name) return cb?.(ackError('NAME_REQUIRED'));

      const { room, host } = roomManager.createRoom({
        hostSocketId: socket.id,
        hostName: name,
        password: payload?.password,
        eventName: payload?.eventName,
      });
      socket.join(room.code);
      cb?.({
        ok: true,
        data: {
          room: roomManager.toPublic(room),
          self: { id: host.id, name: host.name, isHost: true },
        },
      });
    });

    socket.on('join-room', (payload: { code?: string; name?: string; password?: string }, cb?: (ack: SocketAck) => void) => {
      const name = (payload?.name || '').trim();
      const code = (payload?.code || '').trim();
      if (!name) return cb?.(ackError('NAME_REQUIRED'));
      if (!code) return cb?.(ackError('CODE_REQUIRED'));

      const result = roomManager.joinRoom({
        code,
        socketId: socket.id,
        name,
        password: payload?.password,
      });
      if ('error' in result) return cb?.(ackError(result.error));

      socket.join(result.room.code);
      socket.to(result.room.code).emit('participant-joined', {
        participant: {
          id: result.participant.id,
          name: result.participant.name,
          isHost: false,
          cameraOn: false,
          micOn: false,
          connectionStatus: 'connected',
          joinedAt: result.participant.joinedAt,
        },
        room: roomManager.toPublic(result.room),
      });
      cb?.({
        ok: true,
        data: {
          room: roomManager.toPublic(result.room),
          self: { id: result.participant.id, name: result.participant.name, isHost: false },
        },
      });
    });

    socket.on('reconnect-room', (payload: { code?: string; participantId?: string }, cb?: (ack: SocketAck) => void) => {
      if (!payload?.code || !payload?.participantId) return cb?.(ackError('ROOM_NOT_FOUND'));
      const result = roomManager.reconnect({
        code: payload.code,
        participantId: payload.participantId,
        socketId: socket.id,
      });
      if ('error' in result) return cb?.(ackError(result.error));
      socket.join(result.room.code);
      socket.to(result.room.code).emit('participant-reconnected', {
        participantId: result.participant.id,
        room: roomManager.toPublic(result.room),
      });
      cb?.({
        ok: true,
        data: {
          room: roomManager.toPublic(result.room),
          self: {
            id: result.participant.id,
            name: result.participant.name,
            isHost: result.participant.isHost,
          },
        },
      });
    });

    socket.on('leave-room', (cb?: (ack: SocketAck) => void) => {
      handleLeave(socket);
      cb?.({ ok: true });
    });

    // --- WebRTC signaling (P2P mesh) ---
    socket.on('offer', (payload: { to: string; sdp: RTCSessionDescriptionInit }) => {
      forwardToParticipant(socket, payload?.to, 'offer', { from: selfId(socket), sdp: payload.sdp });
    });

    socket.on('answer', (payload: { to: string; sdp: RTCSessionDescriptionInit }) => {
      forwardToParticipant(socket, payload?.to, 'answer', { from: selfId(socket), sdp: payload.sdp });
    });

    socket.on('ice-candidate', (payload: { to: string; candidate: RTCIceCandidateInit }) => {
      forwardToParticipant(socket, payload?.to, 'ice-candidate', {
        from: selfId(socket),
        candidate: payload.candidate,
      });
    });

    socket.on('camera-on', () => {
      const ctx = roomManager.setCamera(socket.id, true);
      if (!ctx) return;
      io.to(ctx.room.code).emit('camera-on', { participantId: ctx.participant.id });
    });

    socket.on('camera-off', () => {
      const ctx = roomManager.setCamera(socket.id, false);
      if (!ctx) return;
      io.to(ctx.room.code).emit('camera-off', { participantId: ctx.participant.id });
    });

    socket.on('mic-on', () => {
      const ctx = roomManager.setMic(socket.id, true);
      if (!ctx) return;
      io.to(ctx.room.code).emit('mic-on', { participantId: ctx.participant.id });
    });

    socket.on('mic-off', () => {
      const ctx = roomManager.setMic(socket.id, false);
      if (!ctx) return;
      io.to(ctx.room.code).emit('mic-off', { participantId: ctx.participant.id });
    });

    socket.on(
      'update-settings',
      (
        patch: { eventName?: string; caption?: string; dateText?: string; templateId?: string; bgColor?: string },
        cb?: (ack: SocketAck) => void
      ) => {
        const room = roomManager.updateSettings(socket.id, patch || {});
        if (!room) return cb?.(ackError('NOT_HOST'));
        io.to(room.code).emit('settings-updated', {
          eventName: room.eventName,
          caption: room.caption,
          dateText: room.dateText,
          templateId: room.templateId,
          bgColor: room.bgColor,
        });
        cb?.({ ok: true, data: { room: roomManager.toPublic(room) } });
      }
    );

    socket.on('photo-session-start', (payload: { countdownMs?: number } | undefined, cb?: (ack: SocketAck) => void) => {
      const countdownMs = Math.min(Math.max(Number(payload?.countdownMs) || 3000, 1000), 10000);
      const result = roomManager.startPhotoSession(socket.id, countdownMs);
      if ('error' in result) return cb?.(ackError(result.error));

      const event = {
        type: 'PHOTO_COUNTDOWN',
        timestamp: result.captureAt,
        duration: result.countdownMs,
        serverNow: result.serverNow,
      };

      io.to(result.room.code).emit('photo-session-start', event);
      io.to(result.room.code).emit('photo-countdown', event);
      cb?.({ ok: true, data: event });
    });

    socket.on('photo-uploaded', (payload: { dataUrl?: string }, cb?: (ack: SocketAck) => void) => {
      if (!payload?.dataUrl) return cb?.(ackError('INVALID_PHOTO'));
      const result = roomManager.addPhoto(socket.id, payload.dataUrl);
      if ('error' in result) return cb?.(ackError(result.error));

      io.to(result.room.code).emit('photo-uploaded', {
        participantId: selfId(socket),
        uploaded: result.uploaded,
        total: result.total,
      });

      if (roomManager.completeSessionIfReady(result.room)) {
        io.to(result.room.code).emit('photo-session-complete', {
          photos: roomManager.getPhotosPayload(result.room),
          settings: {
            eventName: result.room.eventName,
            caption: result.room.caption,
            dateText: result.room.dateText,
            templateId: result.room.templateId,
            bgColor: result.room.bgColor,
          },
        });
      }
      cb?.({ ok: true, data: { uploaded: result.uploaded, total: result.total } });
    });

    socket.on('photo-session-cancel', (cb?: (ack: SocketAck) => void) => {
      const room = roomManager.cancelSession(socket.id);
      if (!room) return cb?.(ackError('NOT_HOST'));
      io.to(room.code).emit('photo-session-cancel');
      cb?.({ ok: true });
    });

    socket.on('disconnect', () => {
      handleLeave(socket);
    });
  });
}

function selfId(socket: Socket): string | undefined {
  return roomManager.getRoomBySocket(socket.id)?.participant.id;
}

function forwardToParticipant(socket: Socket, toParticipantId: string, event: string, data: unknown) {
  if (!toParticipantId) return;
  const ctx = roomManager.getRoomBySocket(socket.id);
  if (!ctx) return;
  const target = ctx.room.participants.get(toParticipantId);
  if (!target) return;
  socket.to(target.socketId).emit(event, data);
}

function handleLeave(socket: Socket) {
  const result = roomManager.leaveBySocket(socket.id);
  if (result.left && result.room) {
    socket.to(result.room.code).emit('participant-left', {
      participantId: result.left.id,
      name: result.left.name,
      hostId: result.room.hostId,
      hostTransferred: result.hostTransferred
        ? { id: result.hostTransferred.id, name: result.hostTransferred.name }
        : null,
      room: roomManager.toPublic(result.room),
    });
  }
}
