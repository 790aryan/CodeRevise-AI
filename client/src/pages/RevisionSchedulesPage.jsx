import { useEffect, useState } from 'react';
import { getRevisionSchedules } from '@/services/revision.service.js';
import { Loader2, Calendar, BrainCircuit, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function RevisionSchedulesPage() {
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRevisions() {
      try {
        const data = await getRevisionSchedules();
        setRevisions(data);
      } catch (error) {
        console.error('Failed to load schedules:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRevisions();
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
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Revision Queue</h1>
        <p className="mt-2 text-gray-400">Manage your upcoming spaced repetition milestones.</p>
      </header>

      {revisions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-surface p-16 text-center">
          <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-500/50" />
          <h3 className="text-xl font-semibold">All caught up!</h3>
          <p className="text-gray-400 mt-2">Your current revision queue is empty.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {revisions.map((revision) => (
            <article
              key={revision._id}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-surface p-6 shadow-sm transition-all hover:border-white/20 hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-6">
                {/* Visual Date Indicator */}
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-3 min-w-[70px]">
                  <span className="text-[10px] font-bold uppercase text-gray-400">
                    {new Date(revision.nextRevisionAt).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-xl font-bold">
                    {new Date(revision.nextRevisionAt).getDate()}
                  </span>
                </div>

                {/* Problem Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-blue-400 transition-colors">
                    {revision.problemId.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                    <span className="capitalize">{revision.problemId.platform}</span>
                    <span>•</span>
                    <span className="capitalize text-accent">{revision.problemId.difficulty}</span>
                    <span>•</span>
                    <span>Attempt #{revision.revisionCount + 1}</span>
                  </div>
                </div>
              </div>

              {/* Action Side */}
              <div className="flex items-center gap-6">
                <StatusBadge status={revision.status} />
                <button className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all">
                  Details <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function StatusBadge({ status }) {
  const color = status === 'scheduled' ? 'text-blue-400' : 'text-emerald-400';
  return (
    <span className={`text-xs font-bold uppercase tracking-wider ${color}`}>
      {status}
    </span>
  );
}