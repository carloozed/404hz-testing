import { create } from 'zustand';

// types
import { Track } from '@/types/track';
import { Set } from '@/types/set';

// Track Search Results

interface SearchResults {
  searchTrackResults: Track[];
  count: number;
  setTrackSearchResults: (data: { results: Track[]; count: number }) => void;
  clearTrackSearchResults: () => void;
}

export const useSearchResultsStore = create<SearchResults>((set) => ({
  searchTrackResults: [],
  count: 0,
  setTrackSearchResults: (data: { results: Track[]; count: number }) => {
    set({
      searchTrackResults: data.results,
      count: data.count
    });
  },
  clearTrackSearchResults: () => {
    set({
      searchTrackResults: [],
      count: 0
    });
  }
}));

// Set Search Results

interface SetSearchResults {
  searchSetResults: Set[];
  count: number;
  setSetSearchResults: (data: { results: Set[]; count: number }) => void;
  clearSetSearchResults: () => void;
}

export const useSetSearchResultsStore = create<SetSearchResults>((set) => ({
  searchSetResults: [],
  count: 0,
  setSetSearchResults: (data: { results: Set[]; count: number }) => {
    set({
      searchSetResults: data.results,
      count: data.count
    });
  },
  clearSetSearchResults: () => {
    set({
      searchSetResults: [],
      count: 0
    });
  }
}));
