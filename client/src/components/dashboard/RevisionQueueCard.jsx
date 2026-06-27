import { CalendarClock, Zap, BrainCircuit, ShieldAlert, ChevronRight } from 'lucide-react';

export default function RevisionQueueCard({ item }) {
  // Determine color based on forget risk
  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 shadow-sm transition-all hover:border-white/20 hover:shadow-md">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
            <span className="px-2 py-0.5 rounded bg-white/5">{item.platform}</span>
            <span>•</span>
            <span className="text-accent">{item.difficulty}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getRiskColor(item.forgetRisk)}`}>
          {item.forgetRisk} Risk
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Metric icon={<BrainCircuit className="h-4 w-4" />} title="Health" value={`${item.memoryHealth}%`} />
        <Metric icon={<Zap className="h-4 w-4" />} title="Stability" value={`${item.stability}d`} />
      </div>

      {/* Progress Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <CalendarClock className="h-4 w-4" />
          <span>Due in {item.nextRevisionIn} days</span>
        </div>
        <button className="flex items-center gap-1 text-sm font-semibold text-accent hover:text-blue-400 transition-colors">
          Review Now <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function Metric({ icon, title, value }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-3 border border-white/5">
      <div className="text-gray-500">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 uppercase">{title}</span>
        <span className="text-sm font-bold text-gray-200">{value}</span>
      </div>
    </div>
  );
}