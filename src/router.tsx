import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSyncExternalStore } from 'react';
import { getAccessToken, subscribeAuth } from './auth/tokenStore';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/Login';

function RequireAuth({ children }: { children: JSX.Element }) {
  const accessToken = useSyncExternalStore(subscribeAuth, getAccessToken, getAccessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function RedirectIfAuthenticated({ children }: { children: JSX.Element }) {
  const accessToken = useSyncExternalStore(subscribeAuth, getAccessToken, getAccessToken);

  if (accessToken) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

const dashboardElement = (
  <RequireAuth>
    <DashboardPage />
  </RequireAuth>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: 'home',
        element: dashboardElement,
      },
      {
        path: 'analytics',
        element: dashboardElement,
      },
      {
        path: 'users',
        element: dashboardElement,
      },
      {
        path: 'settings',
        element: dashboardElement,
      },
    ],
  },
]);
