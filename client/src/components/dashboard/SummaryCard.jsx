

const colorClasses = {
  accent: 'bg-accent/20 text-accent',
  emerald: 'bg-emerald-500/20 text-emerald-400',
  blue: 'bg-blue-500/20 text-blue-400',
  amber: 'bg-amber-500/20 text-amber-400',
  red: 'bg-red-500/20 text-red-400',
};

export default function SummaryCard({
  title,
  value,
  subtitle = '',
  icon,
  color = 'accent',
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-surface
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-accent/50
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">

        <div className="min-w-0">

          <p className="text-sm font-medium text-text-muted">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-text">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-text-muted">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${colorClasses[color]}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}