import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar.jsx';

export function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-background text-text overflow-hidden font-sans">
      {/* Sidebar - Fixed width, high visual prominence */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 bg-background/50">
        
        {/* Header - Subtle glassmorphism, sticky positioning */}
        <header className="sticky top-0 z-30 border-b border-white/5 bg-background/80 backdrop-blur-md px-6 py-4 shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Workspace
              </span>
              <h1 className="text-sm font-semibold tracking-wide text-gray-200">
                CodeRevise AI
              </h1>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Phase 1A
            </div>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}