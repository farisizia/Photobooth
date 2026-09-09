export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

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

export interface SelfIdentity {
  id: string;
  name: string;
  isHost: boolean;
}

export interface PhotoPayload {
  participantId: string;
  name: string;
  dataUrl: string;
}

export interface BoothSettings {
  eventName: string;
  caption: string;
  dateText: string;
  templateId: string;
  bgColor: string;
}

export interface CountdownEvent {
  type: 'PHOTO_COUNTDOWN';
  timestamp: number; // captureAt (server epoch ms)
  duration: number;
  serverNow: number;
}

export type RoomPhase = 'lobby' | 'live' | 'countdown' | 'uploading' | 'result';

export const TEMPLATES = [
  { id: 'classic', name: 'Classic' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'polaroid', name: 'Polaroid' },
  { id: 'wedding', name: 'Wedding' },
  { id: 'birthday', name: 'Birthday' },
  { id: 'party', name: 'Party' },
  { id: 'black', name: 'Black' },
  { id: 'white', name: 'White' },
] as const;

export const BG_PRESETS = [
  '#FFFFFF',
  '#18181B',
  '#FFE4E6',
  '#EDE9FE',
  '#DCFCE7',
  '#FEF08A',
  '#E0F2FE',
  '#4F46E5',
  '#BE123C',
  '#FDF2F8',
];
