import { useEffect, useState } from 'react';
import { getRevisionSessions } from '@/services/revisionSession.service.js';
import { Loader2, History, Clock, Trophy, AlertCircle } from 'lucide-react';

export default function RevisionSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      try {
        const data = await getRevisionSessions();
        setSessions(data);
      } catch (error) {
        console.error("Failed to load sessions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSessions();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-text-muted animate-pulse">Loading your history...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Revision History</h1>
        <p className="mt-2 text-gray-400">Review your past performance and track your growth.</p>
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-surface p-12 text-center">
          <History className="mb-4 h-12 w-12 text-gray-600" />
          <h3 className="text-lg font-semibold">No sessions yet</h3>
          <p className="text-text-muted mt-1">Your completed revisions will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-4">Problem</th>
                <th className="px-6 py-4">Result</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sessions.map((session) => (
                <tr key={session._id} className="group transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-gray-200">
                    {session.problemId?.title || 'Unknown Problem'}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge result={session.result} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 capitalize">
                    {session.sessionType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {session.durationMinutes}m
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(session.completedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

// Sub-component for result styling
function StatusBadge({ result }) {
  const styles = {
    mastered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    solved: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles[result] || 'bg-gray-500/10 text-gray-400'}`}>
      {result === 'mastered' && <Trophy className="h-3 w-3" />}
      {result === 'failed' && <AlertCircle className="h-3 w-3" />}
      {result.toUpperCase()}
    </span>
  );
}