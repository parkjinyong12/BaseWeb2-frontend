import { useQuery } from '@tanstack/react-query';
import { NavLink, useLocation } from 'react-router-dom';
import { fetchHealth } from '../api/health';

type DashboardMenu = 'home' | 'analytics' | 'users' | 'settings';

const MENU_ITEMS: Array<{ key: DashboardMenu; label: string; to: string }> = [
  { key: 'home', label: '홈', to: '/home' },
  { key: 'analytics', label: '분석', to: '/analytics' },
  { key: 'users', label: '사용자', to: '/users' },
  { key: 'settings', label: '설정', to: '/settings' },
];

function resolveSelectedMenu(pathname: string): DashboardMenu {
  if (pathname === '/analytics') {
    return 'analytics';
  }

  if (pathname === '/users') {
    return 'users';
  }

  if (pathname === '/settings') {
    return 'settings';
  }

  return 'home';
}

export function DashboardPage() {
  const { pathname } = useLocation();
  const selectedMenu = resolveSelectedMenu(pathname);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  });

  const renderContent = () => {
    if (selectedMenu === 'analytics') {
      return (
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">분석</h1>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-slate-700">트래픽, 전환율, 주요 지표를 확인할 수 있는 분석 화면입니다.</p>
          </article>
        </section>
      );
    }

    if (selectedMenu === 'users') {
      return (
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">사용자</h1>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-slate-700">사용자 목록과 권한을 관리하는 화면입니다.</p>
          </article>
        </section>
      );
    }

    if (selectedMenu === 'settings') {
      return (
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">설정</h1>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-slate-700">서비스 기본 설정을 관리하는 화면입니다.</p>
          </article>
        </section>
      );
    }

    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-bold">홈</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-medium text-slate-500">Backend Status</h2>
            <p className="mt-2 text-lg font-semibold">
              {isLoading && 'Checking API...'}
              {isError && 'API Error'}
              {!isLoading && !isError && (data?.status || data?.message ? 'API OK' : 'API OK')}
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-medium text-slate-500">Welcome</h2>
            <p className="mt-2 text-slate-700">React + Vite SPA is ready for JWT-based integration.</p>
          </article>
        </div>
      </section>
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = selectedMenu === item.key;
            return (
              <NavLink
                key={item.key}
                to={item.to}
                className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <div>{renderContent()}</div>
    </div>
  );
}
