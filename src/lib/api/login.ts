import { LoginResponse, LoginRequest } from '@/types/login';
import { useUserStore } from '@/stores/UserStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    } as LoginRequest)
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Login failed: ${response.status} - ${errorData}`);
  }

  const data: LoginResponse = await response.json();

  const userResponse = await fetch(`${BASE_URL}/api/users/me/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!userResponse.ok) {
    throw new Error('Failed to fetch user data');
  }

  const user = await userResponse.json();

  useUserStore.getState().setAuth(user, data.access_token, data.refresh_token);

  return data;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const state = useUserStore.getState();
  return !!(state.accessToken && state.user);
};

export const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  return useUserStore.getState().user;
};
