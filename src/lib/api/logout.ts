import { useUserStore } from '@/stores/UserStore';
import { useUserTracksStore } from '@/stores/UserTracksStore';
import { useUserSetsStore } from '@/stores/UserSetsStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const logout = async (): Promise<void> => {
  const token = useUserStore.getState().accessToken;

  // Clear state first
  useUserStore.getState().logout();
  useUserTracksStore.getState().resetTracks();
  useUserSetsStore.getState().resetSets();

  // Notify server (fire and forget)
  if (token) {
    fetch(`${BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).catch(() => {});
  }
};
