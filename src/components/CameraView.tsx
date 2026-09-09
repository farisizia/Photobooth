import { useEffect, useRef } from 'react';

interface Props {
  stream: MediaStream | null;
  mirrored?: boolean;
}

export function CameraView({ stream, mirrored = true }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={`w-full h-full object-cover ${mirrored ? '-scale-x-100' : ''}`}
    />
  );
}
