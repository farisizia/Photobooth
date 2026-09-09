export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

export interface Participant {
  id: string;
  socketId: string;
  name: string;
  isHost: boolean;
  cameraOn: boolean;
  micOn: boolean;
  connectionStatus: ConnectionStatus;
  joinedAt: number;
}

export interface Room {
  code: string;
  hostId: string;
  password?: string;
  createdAt: number;
  lastActivity: number;
  participants: Map<string, Participant>;
  photos: Map<string, string>; // participantId -> dataURL
  sessionActive: boolean;
  captureAt: number | null;
  eventName: string;
  caption: string;
  dateText: string;
  templateId: string;
  bgColor: string;
}

export interface PublicParticipant {
  id: string;
  name: string;
  isHost: boolean;
  cameraOn: boolean;
  micOn: boolean;
  connectionStatus: ConnectionStatus;
  joinedAt: number;
}

export interface PublicRoom {
  code: string;
  hostId: string;
  createdAt: number;
  maxParticipants: number;
  participantCount: number;
  participants: PublicParticipant[];
  sessionActive: boolean;
  eventName: string;
  caption: string;
  dateText: string;
  templateId: string;
  bgColor: string;
  hasPassword: boolean;
}

export interface SocketAck<T = unknown> {
  ok: boolean;
  error?: string;
  data?: T;
}
