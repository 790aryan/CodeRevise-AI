import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar.jsx';


export function AppLayout() {
  


  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex h-screen overflow-hidden">


        <Sidebar />

      

        <div className="flex min-w-0 flex-1 flex-col">

          <header className="border-b border-white/10 bg-background/95 px-5 py-4 backdrop-blur md:px-8">

            <div className="mx-auto flex max-w-6xl items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  Foundation
                </p>

                <h1 className="mt-1 text-lg font-semibold">
                  CodeRevise AI Workspace
                </h1>

              </div>

              <div className="rounded-lg border border-white/10 bg-surface px-4 py-2 text-sm">
                Phase 1A
              </div>

            </div>

          </header>

          <main className="flex-1 overflow-y-auto px-5 py-6 md:px-8">
            <div className="mx-auto max-w-6xl">
              <Outlet />
            </div>
          </main>

        </div>

      </div>
    </div>
  );
}