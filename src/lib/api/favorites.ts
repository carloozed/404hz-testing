import { apiClient } from './client';
import { FavoriteItem } from '@/types/favoriteItem';

interface FavoritesResponse {
  results: FavoriteItem[];
  count: number;
}

export const fetchFavorites = async (): Promise<FavoritesResponse> => {
  return apiClient.get<FavoritesResponse>('/api/track/favorites');
};
export const toggleFavorite = async (track_id: number) => {
  return apiClient.post(`/api/track/favorites/toggle/${track_id}/`);
};
