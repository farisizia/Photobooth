import { PublicParticipant } from '../types/photobooth';
import { ParticipantCard } from './ParticipantCard';

interface Props {
  participants: PublicParticipant[];
  streams: Map<string, MediaStream>;
  selfId: string;
}

export function VideoGrid({ participants, streams, selfId }: Props) {
  const getGridClass = () => {
    const count = participants.length;
    if (count <= 1) return 'grid-cols-1';
    if (count <= 2) return 'grid-cols-2';
    return 'grid-cols-2';
  };

  return (
    <div className={`grid ${getGridClass()} gap-2 p-2`}>
      {participants.map((p) => (
        <ParticipantCard
          key={p.id}
          participant={p}
          stream={streams.get(p.id) || null}
          isSelf={p.id === selfId}
        />
      ))}
    </div>
  );
}
