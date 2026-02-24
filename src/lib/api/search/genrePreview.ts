import { apiClient } from '../client';
import { Track } from '@/types/track';

interface GenrePreviewResponse {
  results: Track[];
  count: number;
}

export const genrePreview = async (
  type: 'set' | 'track',
  query: string,
  genre?: string
): Promise<GenrePreviewResponse> => {
  return apiClient.get<GenrePreviewResponse>(
    `/api/${type}/search/?q=${query}&scope=global&genre=${genre}`
  );
};
