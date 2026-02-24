import { apiClient } from '../client';
import { Track } from '@/types/track';

interface TrackSearchResponse {
  results: Track[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const searchTracks = async (params: {
  q?: string;
  genre?: string;
  author?: string;
  label?: string;
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
  if (params.label) searchParams.set('label', params.label);
  if (params.scope) searchParams.set('scope', params.scope);

  return apiClient.get<TrackSearchResponse>(
    `/api/track/search/?${searchParams.toString()}`
  );
};
