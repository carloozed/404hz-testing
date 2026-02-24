import { create } from 'zustand';

import { useTrackPlayerStore } from './TrackPlayerStore';

interface PlayerStore {
  mixIsPlaying: number | null;
  setMixIsPlaying: (id: number | null) => void;
  currentPosition: number;
  duration: number;
  setCurrentPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  resetProgress: () => void;
  mixURL: string;
  setMixURL: (mixURL: string | undefined) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  seekToPosition: number | null;
  requestSeek: (position: number) => void;
  clearSeekRequest: () => void;

  // ui stuff
  mixTitle: string;
  setMixTitle: (mixTitle: string) => void;
  mixAuthor: string;
  setMixAuthor: (mixAuthor: string) => void;
  mixGenre: string;
  setMixGenre: (mixGenre: string) => void;
  mixSource: string;
  setMixSource: (mixSource: string) => void;
  mixThumbnail: string;
  setMixThumbnail: (mixThumbnail: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  mixIsPlaying: null,
  currentPosition: 0,
  duration: 0,
  mixURL: '',
  isPlaying: false,
  seekToPosition: null,
  setMixIsPlaying: (mixIsPlaying) => set({ mixIsPlaying }),
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
  setDuration: (duration) => set({ duration }),
  resetProgress: () => set({ currentPosition: 0, duration: 0 }),
  setMixURL: (url) => set({ mixURL: url }),
  setIsPlaying: (isPlaying) => {
    if (isPlaying) {
      useTrackPlayerStore.getState().setIsPlaying(false);
    }
    set({ isPlaying });
  },
  requestSeek: (position) => set({ seekToPosition: position }),
  clearSeekRequest: () => set({ seekToPosition: null }),

  // ui stuff
  mixTitle: '',
  setMixTitle: (title: string) => set({ mixTitle: title }),
  mixAuthor: '',
  setMixAuthor: (author: string) => set({ mixAuthor: author }),
  mixGenre: '',
  setMixGenre: (genre: string) => set({ mixGenre: genre }),
  mixSource: '',
  setMixSource: (source: string) => set({ mixSource: source }),
  mixThumbnail: '',
  setMixThumbnail: (thumbnail: string) => set({ mixThumbnail: thumbnail })
}));
