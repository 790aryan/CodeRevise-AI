import { LineChart as LineChartIcon } from 'lucide-react';
import TrendChart from './TrendChart';

export default function TrendSection({ trend }) {
  if (!trend) return null;

  return (
    <section className="mt-12">
      {/* Section Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400">
          <LineChartIcon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Performance Trends</h2>
          <p className="text-sm text-gray-400">Evolution of your problem mastery over the last 5 attempts.</p>
        </div>
      </div>

      {/* Grid of Mini-Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TrendCard 
          title="Confidence Trend" 
          color="#22c55e" 
          data={trend.confidence} 
        />
        <TrendCard 
          title="Memory Retention" 
          color="#3b82f6" 
          data={trend.memoryScore} 
        />
        <TrendCard 
          title="Mastery Progress" 
          color="#f59e0b" 
          data={trend.masteryScore} 
        />
        <TrendCard 
          title="Retrieval Speed" 
          color="#ef4444" 
          data={trend.speedScore} 
        />
      </div>
    </section>
  );
}

/**
 * Wrapper for individual charts to ensure consistent padding and framing
 */
function TrendCard({ title, color, data }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm transition-all hover:border-white/20">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-semibold text-gray-300">{title}</h4>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last 5</span>
      </div>
      <div className="h-32">
        <TrendChart title={title} color={color} data={data} />
      </div>
    </div>
  );
}