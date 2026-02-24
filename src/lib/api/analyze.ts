import { apiClient } from './client';
import { AnalyzeResponse } from '@/types/analyze';

export const analyze = async (url: string): Promise<AnalyzeResponse> => {
  const encodedUrl = encodeURIComponent(url);
  return apiClient.get<AnalyzeResponse>(`/api/set/${encodedUrl}`);
};
