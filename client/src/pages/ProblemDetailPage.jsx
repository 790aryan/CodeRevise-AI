import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProblemById } from '@/services/problem.service.js';
import { Loader2, ArrowLeft, ExternalLink, Calendar, Tag, Layers, BarChart2 } from 'lucide-react';
import {
  getProblemAnalytics,
} from '@/services/problemAnalytics.service';

export default function ProblemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLearned, setHasLearned] =
  useState(false);
  useEffect(() => {
    async function loadProblem() {
      try {
        const data = await getProblemById(id);
        setProblem(data);
        try {
  const analytics =
    await getProblemAnalytics(id);

  setHasLearned(
    analytics !== null,
  );
} catch {
  setHasLearned(false);
}
      } catch (error) {
        console.error("Failed to load problem:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProblem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6 md:p-8">
      {/* Navigation & Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Library
        </button>
        <h1 className="text-4xl font-bold tracking-tight text-white">{problem.title}</h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5 capitalize rounded-full bg-white/5 px-3 py-1 border border-white/5">
            <Layers className="h-3.5 w-3.5" /> {problem.platform}
          </span>
          <span className="capitalize text-accent font-semibold">{problem.difficulty}</span>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="rounded-2xl border border-white/10 bg-surface p-8 shadow-sm space-y-8">
        
        {/* Topics Section */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
            <Tag className="h-4 w-4" /> Relevant Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {problem.topics.map((topic) => (
              <span key={topic._id} className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-gray-300 border border-white/5">
                {topic.name}
              </span>
            ))}
          </div>
        </div>

        {/* Resource Section */}
        <div className="flex items-center justify-between border-t border-white/10 pt-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Problem Source</h3>
            <a 
              href={problem.problemUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-accent hover:text-blue-400 font-medium"
            >
              Open External Problem <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="text-right">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Last Activity</h3>
            <p className="text-sm text-gray-300 flex items-center gap-2 justify-end">
              <Calendar className="h-4 w-4 text-gray-600" /> {new Date(problem.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action */}
<div className="mt-8 flex flex-wrap gap-4">

  <button
    onClick={() =>
      navigate(
        `/revision-sessions/new?problemId=${id}&mode=${
          hasLearned
            ? 'revision'
            : 'learning'
        }`,
      )
    }
    className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-400"
  >
    {hasLearned
      ? '📖 Review Problem'
      : '🚀 Start Learning'}
  </button>

  {hasLearned && (
    <button
      onClick={() =>
        navigate(
          `/problem-analytics/${id}`,
        )
      }
      className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-background"
    >
      <BarChart2 className="h-4 w-4" />
      View Analytics
    </button>
  )}

</div>
    </main>
  );
}