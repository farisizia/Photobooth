import { SignalingService } from './SignalingService';
import { saveSession } from '../utils/room';
import type { PublicRoom, SelfIdentity } from '../types/photobooth';

class RoomServiceImpl {
  async create(name: string, password?: string, eventName?: string) {
    const data = await SignalingService.createRoom(name, password, eventName);
    saveSession(data.room.code, data.self);
    return data;
  }

  async join(code: string, name: string, password?: string) {
    const data = await SignalingService.joinRoom(code.toUpperCase(), name, password);
    saveSession(data.room.code, data.self);
    return data;
  }

  async reconnect(code: string, participantId: string): Promise<{ room: PublicRoom; self: SelfIdentity }> {
    const data = await SignalingService.reconnectRoom(code.toUpperCase(), participantId);
    saveSession(data.room.code, data.self);
    return data;
  }

  leave() {
    SignalingService.leaveRoom();
  }
}

export const RoomService = new RoomServiceImpl();
