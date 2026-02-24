// app/_components/FavoritesInitializer.tsx
'use client';

import { useEffect } from 'react';

//stores
import { useFavoritesStore } from '@/stores/useFavoriteStore';
import { useUserStore } from '@/stores/UserStore';

// helpers
import { fetchFavorites } from '@/lib/api/favorites';

export default function FavoritesInitializer() {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        try {
          const response = await fetchFavorites();

          useFavoritesStore.getState().setFavorites(response);
        } catch (error) {
          console.error('Failed to load favorites:', error);
        }
      }
    };

    loadFavorites();
  }, [user]);

  return null;
}
