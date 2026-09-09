import { SignalingService } from './SignalingService';

function iceServers(): RTCIceServer[] {
  const servers: RTCIceServer[] = [];
  const stun = import.meta.env.VITE_STUN_SERVER || 'stun:stun.l.google.com:19302';
  servers.push({ urls: stun });

  const turn = import.meta.env.VITE_TURN_SERVER as string | undefined;
  const username = import.meta.env.VITE_TURN_USERNAME as string | undefined;
  const credential = import.meta.env.VITE_TURN_CREDENTIAL as string | undefined;
  if (turn && username && credential) {
    servers.push({ urls: turn, username, credential });
  }
  return servers;
}

type RemoteHandler = (peerId: string, stream: MediaStream | null) => void;
type StateHandler = (peerId: string, state: RTCPeerConnectionState) => void;

class WebRTCServiceImpl {
  private peers = new Map<string, RTCPeerConnection>();
  private localStream: MediaStream | null = null;
  private selfId: string | null = null;
  private onRemote: RemoteHandler | null = null;
  private onState: StateHandler | null = null;
  private unsubscribers: Array<() => void> = [];
  private makingOffer = new Set<string>();

  attach(selfId: string, onRemote: RemoteHandler, onState?: StateHandler) {
    this.detach();
    this.selfId = selfId;
    this.onRemote = onRemote;
    this.onState = onState || null;

    this.unsubscribers.push(
      SignalingService.on<{ from: string; sdp: RTCSessionDescriptionInit }>('offer', async ({ from, sdp }) => {
        try {
          const pc = this.ensurePeer(from);
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          SignalingService.sendAnswer(from, pc.localDescription!);
        } catch (err) {
          console.warn('[WebRTC] offer handling failed', err);
        }
      })
    );

    this.unsubscribers.push(
      SignalingService.on<{ from: string; sdp: RTCSessionDescriptionInit }>('answer', async ({ from, sdp }) => {
        const pc = this.peers.get(from);
        if (!pc) return;
        try {
          if (!pc.currentRemoteDescription) {
            await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          }
        } catch (err) {
          console.warn('[WebRTC] answer handling failed', err);
        }
      })
    );

    this.unsubscribers.push(
      SignalingService.on<{ from: string; candidate: RTCIceCandidateInit }>('ice-candidate', async ({ from, candidate }) => {
        const pc = this.peers.get(from);
        if (!pc || !candidate) return;
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch {
          /* candidate may arrive before remote description */
        }
      })
    );
  }

  setLocalStream(stream: MediaStream | null) {
    this.localStream = stream;
    for (const [, pc] of this.peers) {
      this.syncTracks(pc, stream);
    }
  }

  async connectTo(peerId: string) {
    if (!this.selfId || peerId === this.selfId) return;
    const pc = this.ensurePeer(peerId);
    if (this.shouldOffer(peerId) && !this.makingOffer.has(peerId)) {
      try {
        this.makingOffer.add(peerId);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        SignalingService.sendOffer(peerId, pc.localDescription!);
      } catch (err) {
        console.warn('[WebRTC] createOffer failed', err);
      } finally {
        this.makingOffer.delete(peerId);
      }
    }
  }

  disconnectPeer(peerId: string) {
    const pc = this.peers.get(peerId);
    if (pc) {
      pc.onicecandidate = null;
      pc.ontrack = null;
      pc.onconnectionstatechange = null;
      pc.close();
      this.peers.delete(peerId);
    }
    this.onRemote?.(peerId, null);
  }

  disconnectAll() {
    for (const id of Array.from(this.peers.keys())) {
      this.disconnectPeer(id);
    }
  }

  detach() {
    this.unsubscribers.forEach((u) => u());
    this.unsubscribers = [];
    this.disconnectAll();
    this.selfId = null;
    this.onRemote = null;
    this.onState = null;
  }

  private shouldOffer(peerId: string) {
    // Deterministic glare avoidance: lower id is the polite/answerer, higher id offers
    return (this.selfId || '') > peerId;
  }

  private ensurePeer(peerId: string): RTCPeerConnection {
    const existing = this.peers.get(peerId);
    if (existing && existing.connectionState !== 'closed' && existing.connectionState !== 'failed') {
      return existing;
    }
    if (existing) {
      existing.close();
      this.peers.delete(peerId);
    }

    const pc = new RTCPeerConnection({ iceServers: iceServers() });
    this.peers.set(peerId, pc);
    this.syncTracks(pc, this.localStream);

    pc.onicecandidate = (ev) => {
      if (ev.candidate) SignalingService.sendIce(peerId, ev.candidate.toJSON());
    };

    pc.ontrack = (ev) => {
      const stream = ev.streams[0] || new MediaStream([ev.track]);
      this.onRemote?.(peerId, stream);
    };

    pc.onconnectionstatechange = () => {
      this.onState?.(peerId, pc.connectionState);
      if (pc.connectionState === 'failed') {
        // ICE restart attempt
        pc.restartIce();
      }
    };

    return pc;
  }

  private syncTracks(pc: RTCPeerConnection, stream: MediaStream | null) {
    const senders = pc.getSenders();
    const videoSender = senders.find((s) => s.track?.kind === 'video' || s.track === null && s.track === undefined);

    if (!stream) {
      senders.forEach((s) => {
        if (s.track) pc.removeTrack(s);
      });
      return;
    }

    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;

    const existingVideo = senders.find((s) => s.track?.kind === 'video');
    if (existingVideo) {
      existingVideo.replaceTrack(videoTrack).catch(() => {
        pc.addTrack(videoTrack, stream);
      });
    } else if (videoSender && !videoSender.track) {
      videoSender.replaceTrack(videoTrack).catch(() => pc.addTrack(videoTrack, stream));
    } else {
      pc.addTrack(videoTrack, stream);
    }
  }
}

export const WebRTCService = new WebRTCServiceImpl();
