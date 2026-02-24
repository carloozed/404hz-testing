import { apiClient } from '../client';
import { Set } from '@/types/set';

interface SetSearchResponse {
  results: Set[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const searchSets = async (params: {
  q?: string;
  genre?: string;
  author?: string;
  channel?: string;
  scope?: string;
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
  if (params.channel) searchParams.set('label', params.channel);
  if (params.scope) searchParams.set('scope', params.scope);

  return apiClient.get<SetSearchResponse>(
    `/api/set/search/?${searchParams.toString()}`
  );
};
