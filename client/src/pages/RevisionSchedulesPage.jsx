import { useEffect, useState } from 'react';
import { getRevisionSchedules } from '@/services/revision.service.js';


export default function RevisionSchedulesPage() {
    const [revisions, setRevisions] = useState([]);
   
    useEffect(() => {
  async function loadRevisions() {
    try {
      const data = await getRevisionSchedules();
      console.log('Revision Schedules:', data);
      setRevisions(data);

      
    } catch (error) {
  console.log('FULL ERROR:', error);

  console.log(
    'BACKEND RESPONSE:',
    error.response?.data
  );

  console.log(
    'VALIDATION DETAILS:',
    error.response?.data?.error?.details
  );
}
  }

  loadRevisions();
}, []);
  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          Revisions
        </p>

        <h2 className="mt-3 text-3xl font-semibold">
          Revision Queue
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-text-muted">
          Review upcoming revision schedules and track spaced repetition progress.
        </p>
      </div>

   {revisions.length === 0 ? (
  <div className="rounded-lg border border-white/10 bg-surface p-6">
    <p className="text-text-muted">
      No revision schedules found.
    </p>
  </div>
) : (
  <div className="grid gap-5">
    {revisions.map((revision) => (
      <article
        key={revision._id}
        className="rounded-lg border border-white/10 bg-surface p-5 shadow-soft"
      >
        <h3 className="text-xl font-semibold">
          {revision.problemId.title}
        </h3>

        <p className="mt-2 text-sm text-text-muted">
          Platform: {revision.problemId.platform}
        </p>

        <p className="mt-2 text-sm text-text-muted">
          Difficulty: {revision.problemId.difficulty}
        </p>

        <p className="mt-2 text-sm text-text-muted">
          Status: {revision.status}
        </p>

        <p className="mt-2 text-sm text-text-muted">
          Revision Count: {revision.revisionCount}
        </p>

        <p className="mt-2 text-sm text-text-muted">
          Next Revision:{' '}
          {new Date(
            revision.nextRevisionAt,
          ).toLocaleDateString()}
        </p>
      </article>
    ))}
  </div>
)}
    </section>
  );
}