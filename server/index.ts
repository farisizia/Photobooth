import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { registerSocketHandlers } from './socket.js';
import { roomManager } from './roomManager.js';

const PORT = Number(process.env.PORT || 3001);

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '4mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, maxParticipants: roomManager.getMaxParticipants() });
});

app.get('/api/rooms/:code', (req, res) => {
  const room = roomManager.getRoom(req.params.code);
  if (!room) {
    res.status(404).json({ ok: false, error: 'Room tidak ditemukan.' });
    return;
  }
  res.json({ ok: true, data: { exists: true, hasPassword: Boolean(room.password), participantCount: room.participants.size, maxParticipants: roomManager.getMaxParticipants() } });
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: true, credentials: true },
  maxHttpBufferSize: 4e6,
  pingTimeout: 20000,
  pingInterval: 10000,
});

registerSocketHandlers(io);

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`[live-photobooth] signaling server on http://0.0.0.0:${PORT}`);
});
