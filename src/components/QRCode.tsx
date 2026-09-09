import { QRCodeSVG } from 'qrcode.react';
import { roomUrl } from '../utils/room';

interface Props {
  code: string;
}

export function QRCodeDisplay({ code }: Props) {
  const url = roomUrl(code);
  return (
    <div className="bg-white p-4 rounded-xl inline-block">
      <QRCodeSVG value={url} size={160} />
      <p className="text-ink-900 font-mono text-center mt-2 font-bold">{code}</p>
    </div>
  );
}
