import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BrainCircuit, Loader2, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import { simulateRevision } from '@/services/memorySimulator.service';

export default function MemorySimulatorPage() {
  const [form, setForm] = useState({
    problemId: '',
    confidence: 3,
    timeTaken: 600,
    hintLevel: 'none',
    result: 'solved',
    attemptType: 'revision',
    notes: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const problemId = searchParams.get('problemId');
    if (problemId) setForm(prev => ({ ...prev, problemId }));
  }, [searchParams]);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  async function runSimulation() {
    try {
      setLoading(true);
      const data = await simulateRevision(form);

      console.log("SIMULATION RESPONSE");
console.log(data);
      setPrediction(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 flex items-center gap-5">
        <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">
          <BrainCircuit className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revision Simulator</h1>
          <p className="text-gray-400 text-sm mt-1">Predict memory decay using our V8 Engine</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Simulation Inputs */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" /> Simulation Parameters
          </h2>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">Confidence ({form.confidence}/5)</label>
              <input type="range" min="1" max="5" value={form.confidence} onChange={(e) => update('confidence', Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Time (sec)</label>
                <input type="number" value={form.timeTaken} onChange={(e) => update('timeTaken', Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Hint Level</label>
                <select value={form.hintLevel} onChange={(e) => update('hintLevel', e.target.value)} className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none">
                  <option value="none">None</option>
                  <option value="small">Small Hint</option>
                  <option value="major">Major Hint</option>
                  <option value="editorial">Editorial</option>
                </select>
              </div>
            </div>

            <button onClick={runSimulation} disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-4 font-bold text-white hover:bg-cyan-400 transition-all active:scale-[0.98]">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Run AI Simulation'}
            </button>
          </div>
        </section>

        {/* Prediction Panel */}
        <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" /> AI Prediction
          </h2>

          {!prediction ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-white/10">
              <p className="text-gray-400 text-sm">Enter parameters to visualize memory decay.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Metric label="Strength" value={prediction.analytics.strength.toFixed(2)} color="text-cyan-300" />
                <Metric label="Stability" value={`${prediction.analytics.stability.toFixed(0)}d`} color="text-green-400" />
                <Metric label="Recall" value={`${prediction.analytics.retrievability.toFixed(0)}%`} color="text-yellow-300" />
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">AI Recommendation</p>
                <p className="text-sm leading-relaxed text-gray-300">{prediction.analytics.forgetRisk === 'Low' ? 'Memory is robust. You are clear for high-interval scheduling.' : 'Memory is unstable. Immediate revision is required.'}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// Small helper for consistent metric blocks
function Metric({ label, value, color }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
      <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}