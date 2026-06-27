import { useEffect, useState } from 'react';
import { getDueTodaySchedules } from '@/services/revisionSchedule.service.js';
import { Loader2, CalendarDays, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DueTodayPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSchedules() {
      try {
        const data = await getDueTodaySchedules();
        setSchedules(data);
      } catch (error) {
        toast.error("Failed to fetch daily revisions.");
      } finally {
        setLoading(false);
      }
    }
    loadSchedules();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-8">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Due Today</h1>
          <p className="mt-2 text-gray-400">
            {schedules.length} {schedules.length === 1 ? 'problem' : 'problems'} pending your attention.
          </p>
        </div>
        {schedules.length > 0 && (
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-2 text-accent border border-accent/20">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">High Priority</span>
          </div>
        )}
      </header>

      {schedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-surface p-16 text-center">
          <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-500/50" />
          <h3 className="text-xl font-semibold">All done!</h3>
          <p className="text-gray-400 mt-2">You have no pending revisions for today.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <article
              key={schedule._id}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-surface p-6 shadow-sm transition-all hover:border-white/20 hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-gray-400">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                    {schedule.problemId.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-gray-500 font-medium">
                    <span className="uppercase tracking-wide">{schedule.problemId.platform}</span>
                    <span className="text-gray-700">•</span>
                    <span className="capitalize text-accent">{schedule.problemId.difficulty}</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-background transition hover:opacity-90">
                Start Revision <ChevronRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}