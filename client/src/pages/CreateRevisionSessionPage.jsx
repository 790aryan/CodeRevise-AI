import { useEffect, useState } from 'react';
import { createRevisionSession } from '@/services/revisionSession.service.js';
import { getRevisionSchedules, updateRevisionSchedule } from '@/services/revisionSchedule.service.js';
import { calculateNextRevision } from '@/utils/revision.js';
import toast from 'react-hot-toast';
import { 
  Loader2, 
  MessageSquare, 
  CheckCircle2, 
  ChevronDown,
  BrainCircuit,
  Clock
} from 'lucide-react';

export default function CreateRevisionSessionPage() {
  const [schedules, setSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState('');
  const [result, setResult] = useState('good');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [notes, setNotes] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function loadSchedules() {
      try {
        const data = await getRevisionSchedules();
        setSchedules(data);
      } catch (error) {
        toast.error("Failed to load your schedule.");
      }
    }
    loadSchedules();
  }, []);

  const selectedSchedule = schedules.find((s) => s._id === selectedScheduleId);

  async function handleCreateSession() {
    if (!selectedSchedule) return toast.error('Please select a problem to review.');
    
    setCreating(true);
    try {
      await createRevisionSession({
        userId: selectedSchedule.userId._id,
        problemId: selectedSchedule.problemId._id,
        revisionScheduleId: selectedSchedule._id,
        result,
        durationMinutes,
        notes,
        completedAt: new Date().toISOString(),
      });

      const next = calculateNextRevision(result);
      await updateRevisionSchedule(selectedSchedule._id, {
        status: 'scheduled',
        currentIntervalDays: next.currentIntervalDays,
        nextRevisionAt: next.nextRevisionAt,
        lastRevisionAt: new Date().toISOString(),
        revisionCount: selectedSchedule.revisionCount + 1,
        successfulRevisionCount: result === 'again' ? selectedSchedule.successfulRevisionCount : selectedSchedule.successfulRevisionCount + 1,
        lastRevisionResult: result,
      });

      toast.success('Session recorded & schedule updated!');
      setSelectedScheduleId('');
      setNotes('');
    } catch (error) {
      toast.error('Failed to process revision.');
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Record Revision</h1>
        <p className="text-gray-400 mt-1">Log your practice session and update your mastery intervals.</p>
      </header>

      <div className="space-y-6 bg-surface p-8 rounded-2xl border border-white/10 shadow-sm">
        
        {/* Schedule Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Target Problem</label>
          <div className="relative group">
            <select
              value={selectedScheduleId}
              onChange={(e) => setSelectedScheduleId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-surface px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-accent cursor-pointer text-white [&>option]:bg-surface [&>option]:text-white"
            >
              <option value="" className="text-gray-400">Select a problem from your queue...</option>
              {schedules.map((s) => (
                <option key={s._id} value={s._id}>{s.problemId.title}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-gray-500 pointer-events-none group-hover:text-accent transition-colors" />
          </div>
        </div>

        {/* Result Selection Grid */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Assessment</label>
          <div className="grid grid-cols-4 gap-3">
            {['again', 'hard', 'good', 'easy'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setResult(r)}
                className={`py-3 rounded-xl border capitalize font-semibold transition-all ${
                  result === r 
                    ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                    : 'border-white/10 bg-white/5 hover:border-white/20 text-gray-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Duration (minutes)
          </label>
          <input 
            type="number" 
            value={durationMinutes} 
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Reflection Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="What was the hardest part of this problem?"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <button
          onClick={handleCreateSession}
          disabled={!selectedScheduleId || creating}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent py-4 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {creating ? <Loader2 className="h-5 w-5 animate-spin" /> : <><CheckCircle2 className="h-5 w-5" /> Save Session</>}
        </button>
      </div>
    </main>
  );
}