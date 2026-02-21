const ACCESS_TOKEN_STORAGE_KEY = 'baseweb2_access_token';

function readStoredToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

let accessToken: string | null = readStoredToken();
const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

export function setAccessToken(token: string): void {
  accessToken = token;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }

  notifyListeners();
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function clearAccessToken(): void {
  accessToken = null;

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  notifyListeners();
}

export function subscribeAuth(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
