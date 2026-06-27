import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  Shield,
} from 'lucide-react';

function Stars({ value }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`h-3 w-8 rounded-full ${
            star <= value
              ? 'bg-cyan-400'
              : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  );
}

function Metric({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">

      <div className="mb-3 flex items-center gap-2">

        {icon}

        <p className="text-sm font-medium">
          {title}
        </p>

      </div>

      <Stars value={value} />

    </div>
  );
}

export default function LearningDNACard({
  learningDNA,
}) {
  if (!learningDNA) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-surface p-6">

      <p className="text-sm uppercase tracking-widest text-cyan-400">
        AI Learning DNA
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        Learning Profile
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <Metric
          title="Learning Speed"
          value={learningDNA.learningSpeed}
          icon={<Zap className="h-5 w-5 text-cyan-400" />}
        />

        <Metric
          title="Retrieval Ability"
          value={learningDNA.retrieval}
          icon={<Brain className="h-5 w-5 text-cyan-400" />}
        />

        <Metric
          title="Improvement"
          value={learningDNA.improvement}
          icon={<TrendingUp className="h-5 w-5 text-cyan-400" />}
        />

        <Metric
          title="Confidence"
          value={learningDNA.confidence}
          icon={<Target className="h-5 w-5 text-cyan-400" />}
        />

        <Metric
          title="Retention"
          value={learningDNA.retention}
          icon={<Shield className="h-5 w-5 text-cyan-400" />}
        />

      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">

        <p className="mb-4 font-semibold">
          Learning Style
        </p>

        <div className="flex flex-wrap gap-3">

          {learningDNA.style.map((item) => (
            <span
              key={item}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-300"
            >
              {item}
            </span>
          ))}

        </div>

      </div>

    </section>
  );
}