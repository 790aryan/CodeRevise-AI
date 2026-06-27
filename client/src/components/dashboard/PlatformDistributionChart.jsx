import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const COLORS = [
  '#9AB17A',
  '#C3CC9B',
  '#E4DFB5',
  '#FBE8CE',
  '#3B82F6',
];

export default function PlatformDistributionChart({
  platformData,
}) {
  const hasData =
    platformData.length > 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">
        Platform Distribution
      </h3>

      <div className="h-80">
        {!hasData ? (
          <div className="flex h-full items-center justify-center text-text-muted">
            No platform data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
  data={platformData}
  margin={{
    top: 10,
    right: 20,
    left: 0,
    bottom: 10,
  }}
>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#2b2b2b"
              />

<XAxis
  dataKey="platform"
  stroke="#C3CC9B"
  tickFormatter={(value) =>
    value.charAt(0).toUpperCase() +
    value.slice(1)
  }
/>

              <YAxis
                allowDecimals={false}
                stroke="#C3CC9B"
              />

              <Tooltip
  formatter={(value) => [
    `${value} Problems`,
    'Solved',
  ]}
  contentStyle={{
    backgroundColor: '#232933',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: 12,
  }}
  labelStyle={{
    color: '#fff',
  }}
  itemStyle={{
    color: '#9AB17A',
  }}
/>

              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                barSize={70}
                animationDuration={1200}
    animationEasing="ease-out"
              >
                {platformData.map(
                  (entry, index) => (
                    <Cell
                      key={entry.platform}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  ),
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}