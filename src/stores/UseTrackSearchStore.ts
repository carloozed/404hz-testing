import { create } from 'zustand';
import { Track } from '@/types/track';
import { searchTracks } from '@/lib/api/search/searchTracks';

type SearchFilters = {
  q: string;
  genre: string;
  artist: string;
  label: string;
  scope: 'global' | 'user';
};

type TrackSearchState = {
  tracks: Track[];
  filters: SearchFilters;
  page: number;
  hasMore: boolean;
  loading: boolean;

  setTracksearchFilters: (filters: Partial<SearchFilters>) => void;
  fetchTracks: () => Promise<void>;
  loadMoreTracks: () => Promise<void>;
  reset: () => void;
  areFiltersEmpty: () => boolean;
};

export const useTrackSearchStore = create<TrackSearchState>((set, get) => ({
  tracks: [],
  filters: {
    q: '',
    genre: '',
    artist: '',
    label: '',
    scope: 'global'
  },
  filtersAreEmpty: true,
  page: 1,
  hasMore: true,
  loading: false,

  setTracksearchFilters: (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...get().filters, ...newFilters };

    set({
      filters: updatedFilters,
      page: 1,
      tracks: [],
      hasMore: true
    });

    if (
      updatedFilters.q ||
      updatedFilters.genre ||
      updatedFilters.artist ||
      updatedFilters.label
    ) {
      get().fetchTracks();
    }
  },

  fetchTracks: async () => {
    const { filters, loading } = get();

    // Prevent duplicate requests
    if (loading) return;

    // Don't fetch if all filters are empty
    if (!filters.q && !filters.genre && !filters.artist && !filters.label) {
      set({ tracks: [], loading: false });
      return;
    }

    set({ loading: true });
    const { page } = get();

    try {
      const data = await searchTracks({
        q: filters.q,
        genre: filters.genre,
        author: filters.artist,
        label: filters.label,
        scope: filters.scope,
        page,
        page_size: 20
      });

      set({
        tracks: data.results || [],
        hasMore: data.next !== null,
        loading: false
      });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ loading: false, tracks: [], hasMore: false });
    }
  },

  loadMoreTracks: async () => {
    const { loading, hasMore } = get();
    if (loading || !hasMore) return;

    set({ loading: true, page: get().page + 1 });
    const { filters, page } = get();

    try {
      const data = await searchTracks({
        q: filters.q,
        genre: filters.genre,
        author: filters.artist,
        label: filters.label,
        scope: filters.scope,
        page,
        page_size: 20
      });

      set({
        tracks: [...get().tracks, ...data.results],
        hasMore: data.next !== null,
        loading: false
      });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ loading: false });
    }
  },

  areFiltersEmpty: () => {
    const { filters } = get();
    return !filters.q && !filters.genre && !filters.artist && !filters.label;
  },

  reset: () =>
    set({
      tracks: [],
      page: 1,
      filters: { q: '', genre: '', artist: '', label: '', scope: 'global' },
      hasMore: true,
      loading: false
    })
}));
