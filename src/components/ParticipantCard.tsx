import { PublicParticipant } from '../types/photobooth';
import { CameraView } from './CameraView';

interface Props {
  participant: PublicParticipant;
  stream: MediaStream | null;
  isSelf?: boolean;
}

export function ParticipantCard({ participant, stream, isSelf = false }: Props) {
  return (
    <div className="relative aspect-[3/4] bg-ink-800 rounded-lg overflow-hidden border border-white/10">
      {participant.cameraOn && stream ? (
        <CameraView stream={stream} mirrored={isSelf} />
      ) : (
        <div className="flex items-center justify-center h-full text-white/20">
          Camera Off
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white text-xs font-semibold truncate">{participant.name} {isSelf ? '(You)' : ''}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <div className={`w-1.5 h-1.5 rounded-full ${participant.connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[10px] text-white/70">
            {participant.cameraOn ? 'LIVE' : 'Camera Off'}
          </span>
        </div>
      </div>
    </div>
  );
}
