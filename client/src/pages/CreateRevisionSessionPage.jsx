import { createRevisionSession } from '@/services/revisionSession.service.js';

export default function CreateRevisionSessionPage() {
  async function handleCreateSession() {
    try {
      const result = await createRevisionSession({
        userId: '6a3bc874736fe75234e8b425',
        problemId: '6a3bf6c1ccb082c1b2f302c0',
        revisionScheduleId: '6a3bf93b56dc28b9bd3a54c4',

        result: 'good',

        completedAt: new Date().toISOString(),
      });

      console.log('Created Revision Session:', result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create Revision Session
      </h1>

      <button
        onClick={handleCreateSession}
        className="rounded-lg border px-4 py-2"
      >
        Create Test Session
      </button>
    </div>
  );
}