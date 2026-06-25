import { useEffect, useState } from 'react';
import { createRevisionSession } from '@/services/revisionSession.service.js';
import { getRevisionSchedules } from '@/services/revisionSchedule.service.js';
import { updateRevisionSchedule } from '@/services/revisionSchedule.service.js';
import { calculateNextRevision } from '@/utils/revision.js';

export default function CreateRevisionSessionPage() {
  const [schedules, setSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState('');

  const [result, setResult] = useState('good');
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [notes, setNotes] = useState('');

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function loadSchedules() {
      try {
        const data = await getRevisionSchedules();

        console.log('Revision Schedules:', data);

        setSchedules(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadSchedules();
  }, []);

  const selectedSchedule = schedules.find(
    (schedule) => schedule._id === selectedScheduleId,
  );

  async function handleCreateSession() {
    if (!selectedSchedule) {
      alert('Please select a revision schedule.');
      return;
    }

    try {
      setCreating(true);

      const resultData = await createRevisionSession({
        userId: selectedSchedule.userId._id,
        problemId: selectedSchedule.problemId._id,
        revisionScheduleId: selectedSchedule._id,
        result,
        durationMinutes,
        notes,
        completedAt: new Date().toISOString(),
      });

      console.log('Created Revision Session:', resultData);

      alert('Revision session created successfully!');

      const nextRevision =
        calculateNextRevision(result);

        console.log(
        'Next Revision:',
        nextRevision,
        );
        await updateRevisionSchedule(
  selectedSchedule._id,
  {
    status: 'scheduled',

    currentIntervalDays:
      nextRevision.currentIntervalDays,

    nextRevisionAt:
      nextRevision.nextRevisionAt,

    lastRevisionAt:
      new Date().toISOString(),

    revisionCount:
      selectedSchedule.revisionCount + 1,

    successfulRevisionCount:
      result === 'again'
        ? selectedSchedule.successfulRevisionCount
        : selectedSchedule.successfulRevisionCount + 1,

    lastRevisionResult: result,
  },
);

console.log(
  'Revision schedule updated successfully.',
);
      setSelectedScheduleId('');
      setResult('good');
      setDurationMinutes(0);
      setNotes('');
    } catch (error) {
      console.error(error);
      alert('Failed to create revision session.');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create Revision Session
      </h1>

      <div className="space-y-4">
        <select
          value={selectedScheduleId}
          onChange={(e) => setSelectedScheduleId(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-slate-800
            text-white
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        >
          <option value="">
            Select Revision Schedule
          </option>

          {schedules.map((schedule) => (
            <option
              key={schedule._id}
              value={schedule._id}
            >
              {schedule.problemId.title}
            </option>
          ))}
        </select>

        <select
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-slate-800
            text-white
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        >
          <option value="easy">
            Easy
          </option>

          <option value="good">
            Good
          </option>

          <option value="hard">
            Hard
          </option>

          <option value="again">
            Again
          </option>
        </select>

        <input
          type="number"
          min="0"
          value={durationMinutes}
          onChange={(e) =>
            setDurationMinutes(Number(e.target.value))
          }
          placeholder="Duration (minutes)"
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-slate-800
            text-white
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          rows={4}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-slate-800
            text-white
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />

        <button
          onClick={handleCreateSession}
          disabled={!selectedScheduleId || creating}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-slate-800
            text-white
            transition
            hover:bg-slate-700
            disabled:opacity-50
            disabled:cursor-not-allowed
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        >
          {creating
            ? 'Creating...'
            : 'Create Revision Session'}
        </button>
      </div>
    </div>
  );
}