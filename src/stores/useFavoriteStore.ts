import { create } from 'zustand';

// API helpers
import { toggleFavorite as toggleFavoriteAPI } from '@/lib/api/favorites';

// types
import { PlayerTrack, Track } from '@/types/track';
import { FavoriteItem } from '@/types/favoriteItem';

interface FavoritesStore {
  favorites: FavoriteItem[];
  count: number;
  isLoading: boolean;

  // Actions
  setFavorites: (data: { results: FavoriteItem[]; count: number }) => void;
  toggleFavorite: (track: Track | PlayerTrack) => Promise<void>;
  isFavorited: (trackId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  count: 0,
  isLoading: false,

  setFavorites: (data) => {
    set({
      favorites: data.results,
      count: data.count
    });
  },

  toggleFavorite: async (track) => {
    const { favorites } = get();

    // Check if favorited by comparing fav.track.id
    const isFavorited = favorites.some((fav) => fav.track.id === track.id);

    if (isFavorited) {
      // Remove from favorites
      set({
        favorites: favorites.filter((fav) => fav.track.id !== track.id),
        count: get().count - 1
      });
    } else {
      // Add to favorites with proper structure
      const newFavorite: FavoriteItem = {
        id: Date.now(), // Temporary ID until API returns real one
        track: track,
        created_at: new Date().toISOString()
      };

      set({
        favorites: [...favorites, newFavorite],
        count: get().count + 1
      });
    }

    try {
      await toggleFavoriteAPI(track.id);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);

      if (isFavorited) {
        const revertFavorite: FavoriteItem = {
          id: Date.now(),
          track: track,
          created_at: new Date().toISOString()
        };
        set({
          favorites: [...get().favorites, revertFavorite],
          count: get().count + 1
        });
      } else {
        set({
          favorites: favorites.filter((fav) => fav.track.id !== track.id),
          count: get().count - 1
        });
      }
    }
  },
  isFavorited: (trackId: number) => {
    return get().favorites.some((favorite) => favorite.track.id === trackId);
  }
}));
