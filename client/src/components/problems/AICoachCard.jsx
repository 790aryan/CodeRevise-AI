import { BrainCircuit, AlertTriangle, CheckCircle2, TrendingUp, Clock } from 'lucide-react';

export default function AICoachCard({ analytics }) {
  if (!analytics) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'success': return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case 'tip': return <TrendingUp className="h-5 w-5 text-blue-400" />;
      default: return <BrainCircuit className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-xl bg-cyan-500/15 p-3">
          <BrainCircuit className="h-7 w-7 text-cyan-400" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Real-time Insights
          </p>
          <h2 className="text-2xl font-bold">AI Coach</h2>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {analytics.aiCoach?.length > 0 ? (
          analytics.aiCoach.map((message, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-5 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5"
            >
              <div className="mt-0.5 shrink-0">
                {getIcon(index === 0 ? 'tip' : 'default')}
              </div>
              <p className="text-sm leading-relaxed text-gray-300 group-hover:text-white transition-colors">
                {message}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
            <Clock className="mb-2 h-8 w-8 opacity-20" />
            <p className="text-sm">No coaching insights available yet. Keep practicing!</p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-8 flex gap-6 border-t border-white/10 pt-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Stability</p>
          <p className="text-xl font-bold text-emerald-400">{analytics.stability} Days</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Memory Health</p>
          <p className="text-xl font-bold text-blue-400">{analytics.memoryHealth}%</p>
        </div>
      </div>
    </section>
  );
}