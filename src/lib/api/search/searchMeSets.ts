import { apiClient } from '../client';
import { Set } from '@/types/set';

interface SetSearchResponse {
  results: Set[];
  count: number;
}

export const searchMeSets = async (params: {
  q: string;
  genre?: string;
  author?: string;
  page?: number;
  page_size?: number;
}) => {
  const searchParams = new URLSearchParams({
    page: (params.page || 1).toString(),
    page_size: (params.page_size || 20).toString()
  });

  if (params.q) searchParams.set('q', params.q);
  if (params.genre) searchParams.set('genre', params.genre);
  if (params.author) searchParams.set('author', params.author);

  return apiClient.get<SetSearchResponse>(
    `/api/users/me/sets/search/?${searchParams.toString()}`
  );
};
