import {
  ShieldAlert,
  TrendingDown,
} from 'lucide-react';

export default function MemoryBattleCard({
  battle,
}) {
  if (!battle) return null;

  return (
    <section className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6">

      <div className="flex items-center gap-3">

        <ShieldAlert className="h-8 w-8 text-red-400" />

        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-red-400">
            Prediction
          </p>

          <h2 className="text-2xl font-bold">
            Memory Battle
          </h2>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        {battle.timeline.map((item) => (

          <div key={item.day}>

            <div className="mb-2 flex justify-between">

              <span>

                Day {item.day}

              </span>

              <span>

                {item.retrievability}%

              </span>

            </div>

            <div className="h-3 rounded-full bg-white/10">

              <div
                className="h-3 rounded-full bg-cyan-400 transition-all duration-700"
                style={{
                  width: `${item.retrievability}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4">

        <div className="flex items-center gap-2">

          <TrendingDown className="h-5 w-5 text-red-400" />

          <p className="font-semibold">

            Danger Zone

          </p>

        </div>

        <p className="mt-3">

          Review before

          <span className="font-bold text-red-300">

            {' '}Day {battle.dangerDay}

          </span>

        </p>

        <p className="mt-3 text-sm text-gray-300">

          {battle.recommendation}

        </p>

      </div>

    </section>
  );
}