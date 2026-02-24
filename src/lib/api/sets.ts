import { apiClient } from './client';
import { Track } from '@/types/track';
import { SetResults } from '@/types/set';

interface SetTracksResponse {
  tracks?: Track[];
}

export const fetchUserSets = async (
  page: number,
  limit: number = 20
): Promise<SetResults> => {
  return apiClient.get<SetResults>(
    `/api/users/me/sets/?page=${page}&page_size=${limit}`
  );
};

export const fetchSetTracks = async (
  id: number
): Promise<SetTracksResponse> => {
  return apiClient.get<SetTracksResponse>(`/api/set/${id}`);
};
