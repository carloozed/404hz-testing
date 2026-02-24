import { apiClient } from '@/lib/api/client';
import { TrackResults } from '@/types/track';

export const fetchUserTracks = async (page: number, limit: number = 20) => {
  return apiClient.get<TrackResults>(
    `/api/users/me/tracks/?page=${page}&page_size=${limit}`
  );
};

export const fetchGlobalTracks = async (page: number, limit: number = 20) => {
  return apiClient.get<TrackResults>(
    `/api/users/tracks/?page=${page}&page_size=${limit}`
  );
};
