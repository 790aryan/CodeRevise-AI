import { useEffect, useState } from 'react';
import { 
  getDashboardSummary, getDashboardProgress, getRecentActivity, 
  getDifficultyBreakdown, getWeakTopics, getPlatformDistribution, 
  getCurrentStreak, getAccuracy, getRevisionQueue 
} from '@/services/dashboard.service.js';

import { Zap, Target, History, RefreshCcw, Coffee } from 'lucide-react';
import RevisionQueueCard from '@/components/dashboard/RevisionQueueCard.jsx';
import SummaryCards from '@/components/dashboard/SummaryCards.jsx';
import WeeklyActivityChart from '@/components/dashboard/WeeklyActivityChart.jsx';
import DifficultyChart from '@/components/dashboard/DifficultyChart.jsx';
import RetentionCurveChart from '@/components/dashboard/RetentionCurveChart.jsx';

export function DashboardPage() {
  const [data, setData] = useState({
    summary: null, progress: null, recent: [], difficulty: null, 
    weak: [], platform: [], streak: 0, accuracy: 0, queue: [], memory: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const [s, p, act, diff, weak, plat, str, acc, q] = await Promise.all([
          getDashboardSummary(), getDashboardProgress(), getRecentActivity(),
          getDifficultyBreakdown(), getWeakTopics(), getPlatformDistribution(),
          getCurrentStreak(), getAccuracy(), getRevisionQueue(),
        ]);
        setData({ 
          summary: s, progress: p, recent: act?.activities ?? [], difficulty: diff, 
          weak, platform: plat, streak: str?.streak ?? 0, accuracy: acc?.accuracy ?? 0, 
          queue: q ?? [], memory: s?.memoryAnalytics ?? null 
        });
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <RefreshCcw className="h-8 w-8 animate-spin text-accent" />
        <p className="text-gray-400 font-medium">Syncing your progress...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back. Here is your current learning trajectory.</p>
        </div>
      </header>

      <SummaryCards summary={{ 
        solvedProblems: data.summary?.solvedProblems ?? 0, 
        dueToday: data.summary?.dueRevisions ?? 0, 
        streak: data.streak, 
        accuracy: data.accuracy 
      }} />

      {/* Hero Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <RetentionCurveChart timelineData={data.memory?.timeline ?? []} />
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <WeeklyActivityChart progress={data.progress} />
        </div>
      </div>

      {/* Insight Section */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <DifficultyChart difficultyBreakdown={data.difficulty} />
        </div>
        
        {/* Weak Topics */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" /> Areas for Improvement
          </h3>
          <div className="space-y-3">
            {data.weak.length > 0 ? data.weak.map(t => (
              <div key={t.topic} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="font-medium text-sm">{t.topic}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-red-500/10 text-red-400">Score: {t.score}</span>
              </div>
            )) : (
              <p className="text-gray-500 text-sm">Everything looks great! No weak topics identified.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer Grid: Queue & Activity */}
      <div className="grid gap-8 lg:grid-cols-12">
        <section className="lg:col-span-7 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2"><Zap className="h-5 w-5 text-amber-400" /> Revision Queue</h3>
          {data.queue.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {data.queue.map(item => <RevisionQueueCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed border-white/5 rounded-2xl text-center">
              <Coffee className="mx-auto h-8 w-8 text-gray-600 mb-2" />
              <p className="text-gray-500">All caught up. Enjoy your time!</p>
            </div>
          )}
        </section>

        <section className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2"><History className="h-5 w-5 text-blue-400" /> Recent Activity</h3>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-6">
            {data.recent.length > 0 ? data.recent.map(activity => (
              <div key={activity.id} className="relative pl-6 border-l border-white/10">
                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-black" />
                <h4 className="font-medium text-sm text-gray-200">{activity.type === 'problem_attempt' ? 'Completed Revision' : activity.type}</h4>
                <p className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleDateString()}</p>
              </div>
            )) : <p className="text-sm text-gray-500 italic">No recent history.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}