import {
  Brain,
  Sparkles,
  Target,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';

export default function AILearningReport({
  report,
}) {
  if (!report) return null;

  return (
    <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/15 p-3">

          <Brain className="h-7 w-7 text-cyan-400" />

        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            AI Powered
          </p>

          <h2 className="text-2xl font-bold">
            Learning Report
          </h2>

        </div>

      </div>

      {/* Personality */}

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">

        <div className="flex items-center gap-2">

          <Sparkles className="h-5 w-5 text-yellow-400" />

          <h3 className="font-semibold">
            Learning Personality
          </h3>

        </div>

        <p className="mt-3 text-xl font-bold text-cyan-300">

          {report.personality}

        </p>

      </div>

      {/* Strengths */}

      <div className="mt-8">

        <div className="mb-4 flex items-center gap-2">

          <ShieldCheck className="h-5 w-5 text-green-400" />

          <h3 className="font-semibold">
            Strengths
          </h3>

        </div>

        <div className="space-y-3">

          {report.strengths.map((item) => (

            <div
              key={item}
              className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-300"
            >
              ✓ {item}
            </div>

          ))}

        </div>

      </div>

      {/* Weaknesses */}

      <div className="mt-8">

        <div className="mb-4 flex items-center gap-2">

          <TriangleAlert className="h-5 w-5 text-orange-400" />

          <h3 className="font-semibold">
            Improvement Areas
          </h3>

        </div>

        <div className="space-y-3">

          {report.weaknesses.length === 0 ? (

            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-400">
              No significant weaknesses detected.
            </div>

          ) : (

            report.weaknesses.map((item) => (

              <div
                key={item}
                className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-orange-300"
              >
                • {item}
              </div>

            ))

          )}

        </div>

      </div>

      {/* Prediction */}

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-400">
              30-Day Retention Prediction
            </p>

            <p className="mt-2 text-4xl font-bold text-cyan-300">

              {report.retentionPrediction}%

            </p>

          </div>

          <Target className="h-10 w-10 text-cyan-400" />

        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-700"
            style={{
              width: `${report.retentionPrediction}%`,
            }}
          />

        </div>

      </div>

      {/* Recommendation */}

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
          AI Recommendation
        </p>

        <p className="mt-3 leading-7">

          {report.recommendation}

        </p>

        <div className="mt-6 rounded-lg bg-black/20 p-4">

          <p className="text-sm text-gray-400">

            Estimated Remaining Revisions

          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-300">

            {report.revisionsRemaining}

          </p>

        </div>

      </div>

    </section>
  );
}