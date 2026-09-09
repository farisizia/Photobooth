import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SignalingService, PublicRoom, SelfIdentity } from '../services/SignalingService';
import { WebRTCService } from '../services/WebRTCService';
import { CameraService } from '../services/CameraService';
import { loadSession, clearSession } from '../utils/room';
import { VideoGrid } from '../components/VideoGrid';
import { toast } from 'react-hot-toast';

export function RoomPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<PublicRoom | null>(null);
  const [self, setSelf] = useState<SelfIdentity | null>(null);
  const [streams, setStreams] = useState<Map<string, MediaStream>>(new Map());
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!code) return;
    const session = loadSession(code);
    if (!session) {
      navigate('/join');
      return;
    }
    setSelf(session);

    SignalingService.reconnectRoom(code, session.id).then(({ room }) => {
        setRoom(room);
        initWebRTC(session.id);
    }).catch(() => {
        clearSession(code);
        navigate('/join');
    });

    return () => {
        WebRTCService.detach();
    };
  }, [code, navigate]);

  const initWebRTC = async (selfId: string) => {
    WebRTCService.attach(selfId, (peerId, stream) => {
        if (stream) setStreams(prev => new Map(prev.set(peerId, stream)));
        else setStreams(prev => {
            const next = new Map(prev);
            next.delete(peerId);
            return next;
        });
    });

    try {
        const stream = await CameraService.start('user');
        localStreamRef.current = stream;
        WebRTCService.setLocalStream(stream);
        SignalingService.cameraOn();
    } catch (e) {
        toast.error('Gagal akses kamera');
    }
  };

  if (!room || !self) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col h-dvh bg-ink-900">
      <header className="p-4 border-b border-white/10 flex justify-between items-center text-white">
        <h1 className="font-display font-bold">ROOM {room.code}</h1>
        <span className="text-sm">{room.participantCount}/{room.maxParticipants}</span>
      </header>

      <div className="flex-1 overflow-auto">
        <VideoGrid participants={room.participants} streams={streams} selfId={self.id} />
      </div>

      <footer className="p-4 border-t border-white/10 bg-ink-800">
        <button
            disabled={!self.isHost}
            className="w-full p-3 rounded-lg bg-booth-500 font-semibold text-white disabled:opacity-50"
        >
            Start Session
        </button>
      </footer>
    </div>
  );
}
