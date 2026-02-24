import { useUserStore } from '@/stores/UserStore';
import { useUserTracksStore } from '@/stores/UserTracksStore';
import { useUserSetsStore } from '@/stores/UserSetsStore';

class ApiClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  private refreshPromise: Promise<boolean> | null = null;

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return useUserStore.getState().accessToken;
  }

  private async refreshToken(): Promise<boolean> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const refreshToken = useUserStore.getState().refreshToken;
        if (!refreshToken) {
          this.performLogout();
          return false;
        }

        const response = await fetch(
          `${this.baseUrl}/registration/token/refresh/`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.access) {
            useUserStore.getState().setAccessToken(data.access);
            return true;
          }
        }

        this.performLogout();
        return false;
      } catch (error) {
        console.error('Token refresh failed:', error);
        this.performLogout();
        return false;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private performLogout(): void {
    useUserStore.getState().logout();
    useUserTracksStore.getState().resetTracks();
    useUserSetsStore.getState().resetSets();
  }

  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (typeof window === 'undefined') {
      throw new Error('API calls not available during SSR');
    }

    const token = this.getToken();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers
      }
    });

    if (
      response.status === 401 &&
      !endpoint.includes('/registration/token/refresh')
    ) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        return this.fetch<T>(endpoint, options);
      }
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`${endpoint}: ${error || `HTTP ${response.status}`}`);
    }

    return response.json();
  }

  get<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined
    });
  }

  patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
