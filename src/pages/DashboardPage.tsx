import { useQuery } from '@tanstack/react-query';
import { fetchHealth } from '../api/health';

export function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  });

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
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
}
