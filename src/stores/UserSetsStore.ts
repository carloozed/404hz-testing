import { create } from 'zustand';

// api helpers
import { fetchUserSets } from '@/lib/api/sets';

// types
import { SetResults } from '@/types/set';

interface SetsStore {
  setResults: SetResults;
  loading: boolean;
  hasMore: boolean;
  page: number;
  error: string | null;
  loadSets: () => Promise<void>;
  loadMoreSets: () => Promise<void>;
  resetSets: () => void;
}

// Remove persist entirely for sets
export const useUserSetsStore = create<SetsStore>((set, get) => ({
  setResults: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  loading: false,
  hasMore: true,
  page: 1,
  error: null,

  loadSets: async () => {
    const { loading } = get();
    if (loading) return;

    set({ loading: true, error: null });

    try {
      const response = await fetchUserSets(1);

      set({
        setResults: response,
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

  loadMoreSets: async () => {
    const { loading, hasMore, page } = get();
    if (loading || !hasMore) return;

    set({ loading: true });

    try {
      const response = await fetchUserSets(page);
      set((state) => ({
        setResults: {
          ...response,
          results: [...state.setResults.results, ...response.results]
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

  resetSets: () =>
    set({
      setResults: {
        count: 0,
        next: null,
        previous: null,
        results: []
      },
      loading: false,
      hasMore: true,
      page: 1,
      error: null
    })
}));
