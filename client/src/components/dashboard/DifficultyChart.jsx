import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = [
  '#9AB17A',
  '#F4B942',
  '#EF4444',
];

export default function DifficultyChart({
  difficultyBreakdown,
}) {
  const data = [
    {
      name: 'Easy',
      value: difficultyBreakdown?.easy ?? 0,
    },
    {
      name: 'Medium',
      value: difficultyBreakdown?.medium ?? 0,
    },
    {
      name: 'Hard',
      value: difficultyBreakdown?.hard ?? 0,
    },
  ];
const hasData = data.some((item) => item.value > 0);
  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">
        Difficulty Distribution
      </h3>

      <div className="h-80">
  {!hasData ? (
    <div className="flex h-full items-center justify-center text-text-muted">
      No difficulty data available yet.
    </div>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={55}
          paddingAngle={4}
          cornerRadius={8}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            background: '#232933',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 12,
          }}
          labelStyle={{
            color: '#fff',
          }}
          itemStyle={{
            color: '#fff',
          }}
        />

        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{
            color: '#E5E7EB',
            paddingTop: '20px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )}
</div>
    </div>
  );
}