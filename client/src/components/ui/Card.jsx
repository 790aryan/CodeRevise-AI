export default function Card({
  children,
  className = '',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl
        border
        border-white/10
        bg-surface
        p-6
        shadow-sm
        transition-all
        hover:border-accent/50
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}