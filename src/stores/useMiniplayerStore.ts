import { create } from 'zustand';

// types
import { Track } from '@/types/track';

interface MiniplayerStore {
  isMiniplayerOpen: boolean;
  setIsMiniplayerOpen: (isOpen: boolean) => void;
  miniplayerTracks: Track[];
  setMiniplayerTracks: (tracks: Track[]) => void;
  showMiniplayerTrack: boolean;
  setShowMiniplayerTrack: (isShown: boolean) => void;
  hoveredTrack: Track | null;
  setHoveredTrack: (track: Track | null) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (hoveredIndex: number) => void;
}

export const useMiniplayerStore = create<MiniplayerStore>((set) => ({
  isMiniplayerOpen: false,
  miniplayerTracks: [],
  showMiniplayerTrack: false,
  hoveredTrack: null,
  hoveredIndex: null,
  setIsMiniplayerOpen: (isOpen) => set({ isMiniplayerOpen: isOpen }),
  setMiniplayerTracks: (tracks) => set({ miniplayerTracks: tracks }),
  setShowMiniplayerTrack: (isShown: boolean) =>
    set({ showMiniplayerTrack: isShown }),
  setHoveredTrack: (track: Track | null) => set({ hoveredTrack: track }),
  setHoveredIndex: (hoveredIndex: number | null) =>
    set({ hoveredIndex: hoveredIndex })
}));
