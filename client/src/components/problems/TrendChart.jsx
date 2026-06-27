import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function TrendChart({ title, color, data }) {
  const chartData = data.map((value, index) => ({
    review: index + 1,
    value,
  }));

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {/* Professional hidden axes to maintain clean lines */}
          <XAxis dataKey="review" hide />
          <YAxis domain={['auto', 'auto']} hide />
          
          <Tooltip 
            cursor={{ stroke: '#ffffff20', strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#f3f4f6'
            }}
            itemStyle={{ color: '#fff' }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4, fill: '#111827', stroke: color, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}