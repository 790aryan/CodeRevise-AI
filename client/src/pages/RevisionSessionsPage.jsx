import { useEffect, useState } from 'react';
import { getRevisionSessions } from '@/services/revisionSession.service.js';

export default function RevisionSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      try {
        const data = await getRevisionSessions();

        console.log('Revision Sessions:', data);

        setSessions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSessions();
  }, []);

  if (loading) {
    return <p>Loading revision sessions...</p>;
  }

  return (
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="mb-6 text-3xl font-bold">
      Revision Sessions
    </h1>

    {sessions.length === 0 ? (
      <p>No revision sessions found.</p>
    ) : (
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session._id}
            className="rounded-lg border p-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {session.problemId?.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md border px-2 py-1 text-sm">
                {session.result}
              </span>

              <span className="rounded-md border px-2 py-1 text-sm">
                {session.sessionType}
              </span>
            </div>

            <p className="mt-3 text-sm opacity-70">
              Completed:
              {' '}
              {new Date(
                session.completedAt,
              ).toLocaleString()}
            </p>

            <p className="text-sm opacity-70">
              Duration:
              {' '}
              {session.durationMinutes}
              {' '}
              min
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);
}