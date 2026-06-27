import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Star, X, Frown, CheckCircle, Trophy, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { getProblemById } from '@/services/problem.service.js';
import { processMemorySession } from '@/services/memorySession.service.js';

export default function MemorySessionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get('problemId');
  const mode = searchParams.get('mode') ?? 'revision';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [problem, setProblem] = useState(null);
  const [form, setForm] = useState({
    confidence: 3,
    timeTaken: 600,
    hintLevel: 'none',
    result: 'solved',
    notes: '',
  });

  useEffect(() => {
    async function loadProblem() {
      try {
        const data = await getProblemById(problemId);
        setProblem(data);
      } catch (error) {
        toast.error('Failed to load problem.');
      } finally {
        setLoading(false);
      }
    }
    if (problemId) loadProblem();
  }, [problemId]);

  async function handleSubmit() {
    setSaving(true);
    try {
      await processMemorySession({
        problemId,
        confidence: Number(form.confidence),
        timeTaken: Number(form.timeTaken),
        hintLevel: form.hintLevel,
        result: form.result,
        notes: form.notes,
        attemptType: mode === 'learning' ? 'first_solve' : 'revision',
      });
      toast.success('🧠 Memory Updated Successfully!');
      navigate(`/problem-analytics/${problemId}`);
    } catch (error) {
      toast.error('Failed to save session.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
    </div>
  );

  const results = [
    { id: 'forgot', label: 'Forgot', icon: <X className="h-5 w-5" />, color: 'red' },
    { id: 'struggled', label: 'Struggled', icon: <Frown className="h-5 w-5" />, color: 'orange' },
    { id: 'solved', label: 'Solved', icon: <CheckCircle className="h-5 w-5" />, color: 'green' },
    { id: 'mastered', label: 'Mastered', icon: <Trophy className="h-5 w-5" />, color: 'yellow' },
  ];

  return (
    <section className="mx-auto max-w-3xl p-8">
      {/* 1. Header with Metadata */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          {mode === 'learning' ? 'Initial Learning' : 'Revision Session'}
        </span>
        <h1 className="mt-2 text-4xl font-bold">{problem?.title}</h1>
        
        {/* Crash-proof Tag Rendering */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            'LeetCode', 
            problem?.difficulty, 
            ...(Array.isArray(problem?.tags) ? problem.tags.map(t => t.name || t) : [])
          ]
          .filter(Boolean)
          .map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-white/10 bg-surface p-8">
        {/* 2. Confidence Slider */}
        <div>
          <label className="mb-4 block font-medium">Confidence: {form.confidence} / 5</label>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                onClick={() => setForm(f => ({...f, confidence: star}))} 
                className={`h-8 w-8 cursor-pointer transition ${star <= form.confidence ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} 
              />
            ))}
          </div>
        </div>

        {/* 3. Rich Result Cards */}
        <div>
          <label className="mb-4 block font-medium">Result</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r) => (
              <button 
                key={r.id} 
                onClick={() => setForm(f => ({...f, result: r.id}))} 
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition ${form.result === r.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10 hover:border-white/20'}`}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Notes */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <MessageSquare className="h-4 w-4" /> Reflection Notes
          </label>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) => setForm(f => ({...f, notes: e.target.value}))}
            placeholder="What mistake did you make? What trick helped you solve it? Anything to remember next time?"
            className="w-full rounded-xl border border-white/10 bg-background p-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* 5. Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button 
            onClick={handleSubmit} 
            disabled={saving} 
            className="flex-1 rounded-xl bg-cyan-500 py-4 font-bold text-white hover:bg-cyan-400 transition"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Save Memory'}
          </button>
          <button 
            onClick={() => navigate(-1)} 
            className="rounded-xl border border-white/10 px-8 py-4 font-medium hover:bg-white/5 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}