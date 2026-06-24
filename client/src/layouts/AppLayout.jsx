import { NavLink, Outlet } from 'react-router-dom';
import { APP_NAME, NAV_ITEMS } from '@/constants/app.js';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-white/10 bg-surface/80 px-6 py-6 lg:block">
          <div className="text-xl font-semibold tracking-wide">{APP_NAME}</div>
          <nav className="mt-10 space-y-2" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  [
                    'block rounded-md px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-accent text-background'
                      : 'text-text-muted hover:bg-white/10 hover:text-text',
                  ].join(' ')
                }
                key={item.href}
                to={item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/10 bg-background/95 px-5 py-4 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  Foundation
                </p>
                <h1 className="mt-1 text-lg font-semibold text-text">
                  CodeRevise AI Workspace
                </h1>
              </div>
              <div className="rounded-md border border-white/10 bg-surface px-3 py-2 text-sm text-text-muted">
                Phase 1A
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 py-6 md:px-8">
            <div className="mx-auto max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
