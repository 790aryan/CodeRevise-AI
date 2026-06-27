export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) {
  const variants = {
    primary:
      'bg-accent text-background hover:opacity-90',

    secondary:
      'border border-white/10 hover:bg-white/10',

    danger:
      'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
  w-full
  rounded-lg
  px-4
  py-3
  font-semibold
  transition-all
  duration-200
  cursor-pointer
  hover:-translate-y-0.5
  active:translate-y-0
  disabled:opacity-60
  disabled:cursor-not-allowed
  ${variants[variant]}
  ${className}
`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}