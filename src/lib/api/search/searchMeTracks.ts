import { apiClient } from '@/lib/api/client';
import { TrackResults } from '@/types/track';

export const searchMeTracks = async (params: {
  q: string;
  genre?: string;
  author?: string;
  label?: string;
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

  return apiClient.get<TrackResults>(
    `/api/users/me/tracks/search/?${searchParams.toString()}`
  );
};
