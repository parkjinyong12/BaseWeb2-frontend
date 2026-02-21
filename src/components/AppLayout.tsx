import { useSyncExternalStore } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { http } from '../api/http';
import { clearAccessToken, getAccessToken, subscribeAuth } from '../auth/tokenStore';

export function AppLayout() {
  const navigate = useNavigate();
  const accessToken = useSyncExternalStore(subscribeAuth, getAccessToken, getAccessToken);
  const isLoggedIn = Boolean(accessToken);

  const handleLogout = async () => {
    try {
      await http.post('/api/auth/logout');
    } catch {
      // 서버 요청 실패 여부와 관계없이 클라이언트 인증 상태는 정리합니다.
    } finally {
      clearAccessToken();
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/home" className="text-lg font-semibold text-blue-600">
            BaseWeb2
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'font-semibold text-blue-600' : 'text-slate-600')}
              >
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
