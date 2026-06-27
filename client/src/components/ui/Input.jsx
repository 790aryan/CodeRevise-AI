export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  required = false,
  error,
  helperText,
}) {
  return (
    <div className="space-y-2">

      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-text"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-400">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className="
          w-full
          rounded-lg
          border
          border-white/10
          bg-surface
          px-4
          py-3
          text-text
          placeholder:text-text-muted
          transition-all
          duration-200
          hover:border-accent/50
          focus:border-accent
          focus:outline-none
          focus:ring-2
          focus:ring-accent/40
          cursor-text
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />

      {helperText && !error && (
        <p className="text-xs text-text-muted">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}