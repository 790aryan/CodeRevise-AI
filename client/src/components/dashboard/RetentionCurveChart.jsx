import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ReferenceLine,
} from 'recharts';

export default function RetentionCurveChart({ timelineData }) {
  if (!timelineData || timelineData.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] text-sm text-gray-500">
        Solve a problem to generate your memory decay curve.
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Predicted Memory Decay</h3>
        <p className="text-xs text-gray-400 mt-1">Forecast of your retention probability over time.</p>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" strokeOpacity={0.05} />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="#6b7280" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--surface)', 
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '12px'
              }}
            />
            
            <ReferenceLine 
              y={85} 
              stroke="#f43f5e" 
              strokeDasharray="4 4" 
              label={{ position: 'right', value: 'Threshold', fill: '#f43f5e', fontSize: 10, fontWeight: 700 }} 
            />

            <Line
              type="monotone"
              dataKey="retention"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}