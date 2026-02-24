import { create } from 'zustand';

// types
import { PlayerTrack } from '@/types/track';

interface TrackPlayerStore {
  // Track metadata
  track: PlayerTrack | null;
  setTrack: (track: PlayerTrack | null) => void;

  // Playback state
  audioUrl: string | null;
  currentPosition: number;
  duration: number;
  isPlaying: boolean;
  seekToPosition: number | null;

  // Actions
  setAudioUrl: (url: string | null) => void;
  setCurrentPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  requestSeek: (position: number) => void;
  clearSeekRequest: () => void;
  resetProgress: () => void;
}

export const useTrackPlayerStore = create<TrackPlayerStore>((set, get) => ({
  track: null,
  setTrack: (track) => {
    const currentTrack = get().track;
    if (track?.id !== currentTrack?.id) {
      set({ track, audioUrl: null });
    } else {
      set({ track });
    }
  },
  audioUrl: null,
  setAudioUrl: (audioUrl) => set({ audioUrl }),
  currentPosition: 0,
  duration: 0,
  isPlaying: false,
  seekToPosition: null,
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
  setDuration: (duration) => set({ duration }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  requestSeek: (position) => set({ seekToPosition: position }),
  clearSeekRequest: () => set({ seekToPosition: null }),
  resetProgress: () => set({ currentPosition: 0, duration: 0 })
}));
