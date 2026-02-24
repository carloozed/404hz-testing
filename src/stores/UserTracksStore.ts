import { create } from 'zustand';

// API helpers
import { fetchUserTracks } from '@/lib/api/tracks';
import { searchMeTracks } from '@/lib/api/search/searchMeTracks';

// types
import { TrackResults } from '@/types/track';

interface TracksStore {
  trackResults: TrackResults;
  loading: boolean;
  hasMore: boolean;
  page: number;
  error: string | null;
  searchQuery: string;
  needsReload: boolean;
  setSearchQuery: (query: string) => void;
  loadTracks: () => Promise<void>;
  searchTracks: (query: string) => Promise<void>;
  loadMoreTracks: () => Promise<void>;
  resetTracks: () => void;
  markNeedsReload: () => void;
}

export const useUserTracksStore = create<TracksStore>((set, get) => ({
  trackResults: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  loading: false,
  hasMore: true,
  page: 1,
  error: null,
  searchQuery: '',
  needsReload: true,

  markNeedsReload: () => set({ needsReload: true }),

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  loadTracks: async () => {
    const { loading, needsReload, trackResults } = get();

    if (loading || (!needsReload && trackResults.results.length > 0)) return;

    set({ loading: true, error: null, searchQuery: '', needsReload: false });

    try {
      const response = await fetchUserTracks(1);

      set({
        trackResults: response,
        loading: false,
        page: 2,
        hasMore: response.next !== null
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false
      });
    }
  },

  searchTracks: async (query: string) => {
    const { loading } = get();
    if (loading) return;

    set({ loading: true, error: null, searchQuery: query });

    try {
      const response = await searchMeTracks({
        q: query,
        page: 1,
        page_size: 20
      });
      set({
        trackResults: response,
        loading: false,
        page: 2,
        hasMore: response.next !== null
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false
      });
    }
  },

  loadMoreTracks: async () => {
    const { loading, hasMore, page, searchQuery } = get();
    if (loading || !hasMore) return;

    set({ loading: true });

    try {
      const response = searchQuery
        ? await searchMeTracks({
            q: searchQuery,
            page,
            page_size: 20
          })
        : await fetchUserTracks(page);

      set((state) => ({
        trackResults: {
          ...response,
          results: [...state.trackResults.results, ...response.results]
        },
        loading: false,
        page: page + 1,
        hasMore: response.next !== null
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false
      });
    }
  },

  resetTracks: () =>
    set({
      trackResults: {
        count: 0,
        next: null,
        previous: null,
        results: []
      },
      loading: false,
      hasMore: true,
      page: 1,
      error: null,
      searchQuery: ''
    })
}));
