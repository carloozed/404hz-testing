import { create } from 'zustand';
import { Set } from '@/types/set'; // Your set type
import { searchSets } from '@/lib/api/search/searchSets';

type SearchFilters = {
  q: string;
  genre: string;
  artist: string;
  channel: string;
  scope: 'global' | 'user';
};

type SetSearchState = {
  sets: Set[];
  filters: SearchFilters;
  page: number;
  hasMore: boolean;
  loading: boolean;

  setFilters: (filters: Partial<SearchFilters>) => void;
  fetchSets: () => Promise<void>;
  loadMoreSets: () => Promise<void>;
  reset: () => void;
  areFiltersEmpty: () => boolean;
};

export const useSetSearchStore = create<SetSearchState>((set, get) => ({
  sets: [],
  filters: {
    q: '',
    genre: '',
    artist: '',
    channel: '',
    scope: 'global'
  },
  page: 1,
  hasMore: true,
  loading: false,

  setFilters: (newFilters) => {
    set({
      filters: { ...get().filters, ...newFilters },
      page: 1,
      sets: [],
      hasMore: true
    });
    get().fetchSets();
  },

  fetchSets: async () => {
    set({ loading: true });
    const { filters, page } = get();

    try {
      const data = await searchSets({
        q: filters.q,
        genre: filters.genre,
        author: filters.artist,
        scope: filters.scope,
        page,
        page_size: 20
      });

      set({
        sets: data.results || [],
        hasMore: data.next !== null,
        loading: false
      });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ loading: false, sets: [] });
    }
  },

  loadMoreSets: async () => {
    const { loading, hasMore } = get();
    if (loading || !hasMore) return;

    set({ loading: true, page: get().page + 1 });
    const { filters, page } = get();

    try {
      const data = await searchSets({
        q: filters.q,
        genre: filters.genre,
        author: filters.artist,
        channel: filters.channel,
        scope: filters.scope,
        page,
        page_size: 20
      });

      set({
        sets: [...get().sets, ...data.results],
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
    return !filters.q && !filters.genre && !filters.artist;
  },

  reset: () =>
    set({
      sets: [],
      page: 1,
      filters: { q: '', genre: '', artist: '', scope: 'global', channel: '' },
      hasMore: true,
      loading: false
    })
}));
