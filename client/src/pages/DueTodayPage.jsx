import { useEffect, useState } from 'react';
import { getDueTodaySchedules } from '@/services/revisionSchedule.service.js';

export default function DueTodayPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSchedules() {
      try {
        const data = await getDueTodaySchedules();

        console.log('Due Today:', data);

        setSchedules(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSchedules();
  }, []);

  if (loading) {
    return <p>Loading today's revisions...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Due Today
      </h1>

      {schedules.length === 0 ? (
        <p>No revisions due today.</p>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule._id}
              className="rounded-lg border p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {schedule.problemId.title}
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-md border px-2 py-1 text-sm">
                  {schedule.problemId.platform}
                </span>

                <span className="rounded-md border px-2 py-1 text-sm">
                  {schedule.problemId.difficulty}
                </span>
              </div>

              <p className="mt-3 text-sm opacity-70">
                Due:{' '}
                {new Date(
                  schedule.nextRevisionAt
                ).toLocaleString()}
              </p>

              <button
                className="
                  mt-4
                  rounded-lg
                  border
                  px-4
                  py-2
                  hover:bg-slate-700
                  transition
                "
              >
                Start Revision
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}