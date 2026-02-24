import { create } from 'zustand';

// type imports
import { Set } from '@/types/set';

interface FilterStore {
  selectedGenres: string[];
  selectedChannels: string[];
  toggleGenre: (genre: string) => void;
  toggleChannel: (channel: string) => void;
  clearFilters: () => void;
  clearGenres: () => void;
  clearChannels: () => void;
  getFilteredSets: (sets: Set[]) => Set[];
}

const useFilterStore = create<FilterStore>((set, get) => ({
  selectedGenres: [],
  selectedChannels: [],

  toggleGenre: (genre: string) =>
    set((state) => ({
      selectedGenres: state.selectedGenres.includes(genre)
        ? state.selectedGenres.filter((g) => g !== genre)
        : [...state.selectedGenres, genre]
    })),

  toggleChannel: (channel: string) =>
    set((state) => ({
      selectedChannels: state.selectedChannels.includes(channel)
        ? state.selectedChannels.filter((c) => c !== channel)
        : [...state.selectedChannels, channel]
    })),

  clearFilters: () =>
    set({
      selectedGenres: [],
      selectedChannels: []
    }),

  clearGenres: () =>
    set({
      selectedGenres: []
    }),

  clearChannels: () =>
    set({
      selectedChannels: []
    }),

  getFilteredSets: (sets: Set[]) => {
    const { selectedGenres, selectedChannels } = get();
    return sets.filter(
      (set) =>
        (selectedGenres.length === 0 ||
          (set.genre !== null && selectedGenres.includes(set.genre))) &&
        (selectedChannels.length === 0 || selectedChannels.includes(set.author))
    );
  }
}));

export default useFilterStore;
