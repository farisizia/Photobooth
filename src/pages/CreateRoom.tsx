import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomService } from '../services/RoomService';
import { toast } from 'react-hot-toast';

export function CreateRoomPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name) return toast.error('Nama wajib diisi');
    setLoading(true);
    try {
      const { room } = await RoomService.create(name);
      navigate(`/room/${room.code}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Gagal membuat room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-6 gap-6">
      <h1 className="text-3xl font-display font-bold text-white">Create Room</h1>
      <input
        type="text"
        placeholder="Nama Anda"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-xs p-3 rounded-lg bg-ink-800 text-white border border-white/10"
      />
      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full max-w-xs p-3 rounded-lg bg-booth-500 font-semibold text-white disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Room'}
      </button>
    </div>
  );
}
