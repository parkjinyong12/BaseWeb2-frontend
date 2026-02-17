import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { clearAccessToken, getAccessToken, setAccessToken } from '../auth/tokenStore';

type RefreshResponse = {
  accessToken: string;
  expiresIn: number;
};

type RetryableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const API_BASE_URL = 'http://localhost:8080';

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = http
      .post<RefreshResponse>('/api/auth/refresh')
      .then((response) => {
        const newToken = response.data.accessToken;
        setAccessToken(newToken);
        return newToken;
      })
      .catch((error: AxiosError) => {
        clearAccessToken();
        window.location.assign('/login');
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

http.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig | undefined;

    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes('/api/auth/login') || originalRequest.url?.includes('/api/auth/refresh')) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return http(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
