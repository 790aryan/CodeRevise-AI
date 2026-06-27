export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
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

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
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
          transition-all
          duration-200
          cursor-pointer
          hover:border-accent/50
          focus:border-accent
          focus:outline-none
          focus:ring-2
          focus:ring-accent/40
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

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