import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BrainCircuit, Share2, Loader2, Sparkles, Play } from 'lucide-react';

import { getProblemAnalytics } from '@/services/problemAnalytics.service';
import ProblemAnalyticsCard from '@/components/problems/ProblemAnalyticsCard';
import AICoachCard from '@/components/problems/AICoachCard';
import RetentionCurveChart from '@/components/dashboard/RetentionCurveChart';
import TrendSection from '@/components/problems/TrendSection';
import LearningDNACard from '@/components/problems/LearningDNACard';
import AILearningReport from '@/components/problems/AILearningReport';
import MemoryBattleCard from '@/components/problems/MemoryBattleCard';

export default function ProblemAnalyticsPage() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await getProblemAnalytics(problemId);
        setAnalytics(data);
      } catch (err) {
        console.error("Analytics load error:", err);
      } finally {
        setLoading(false);
      }
    }
    if (problemId) loadAnalytics();
  }, [problemId]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
          <p className="text-sm text-gray-400 font-medium tracking-wide animate-pulse">
            Analyzing memory patterns...
          </p>
        </div>
      </div>
    );
  }

  if (!analytics) return <div className="text-center mt-20 text-gray-500">No data found for this problem.</div>;

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-8">
      {/* 1. Header Area */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">
              <BrainCircuit className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{analytics.title || 'Problem Intelligence'}</h1>
              <p className="text-gray-400 text-sm mt-1">Memory optimization & learning analysis</p>
            </div>
          </div>
        </div>
        
        {/* Updated Actions Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/memory-simulator?problemId=${problemId}`)}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Play className="h-4 w-4 fill-white" /> AI Simulator
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-sm font-semibold hover:bg-white/5 transition-all">
            <Share2 className="h-4 w-4" /> Export
          </button>
        </div>
      </header>

      {/* 2. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Primary Insights) */}
        <div className="lg:col-span-8 space-y-8">
          <ProblemAnalyticsCard analytics={analytics} />
          
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-sm">
            <RetentionCurveChart timelineData={analytics?.timeline ?? []} />
          </div>

          <LearningDNACard learningDNA={analytics.learningDNA} />
          <TrendSection trend={analytics.trend} />
        </div>

        {/* Right Column (AI Insights) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent mb-2">
              <Sparkles className="h-4 w-4" /> AI Workspace
            </div>
            <AICoachCard analytics={analytics} />
            <AILearningReport report={analytics.learningReport} />
            <MemoryBattleCard battle={analytics.memoryBattle} />
          </div>
        </aside>
      </div>
    </main>
  );
}