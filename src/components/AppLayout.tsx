import { Link, NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/dashboard" className="text-lg font-semibold text-blue-600">
            BaseWeb2
          </Link>
          <nav className="flex gap-3 text-sm">
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'font-semibold text-blue-600' : 'text-slate-600')}>
              Dashboard
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'font-semibold text-blue-600' : 'text-slate-600')}>
              Login
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
