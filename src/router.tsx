import { createBrowserRouter, Navigate } from 'react-router-dom';
import { getAccessToken } from './auth/tokenStore';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/Login';

function RequireAuth({ children }: { children: JSX.Element }) {
  if (!getAccessToken()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: 'login',
        element: getAccessToken() ? <Navigate to="/dashboard" replace /> : <LoginPage />,
      },
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
