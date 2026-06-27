export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
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
            <span className="ml-1 text-red-400">*</span>
          )}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
          placeholder:text-text-muted
          transition-all
          duration-200
          hover:border-accent/50
          focus:border-accent
          focus:outline-none
          focus:ring-2
          focus:ring-accent/40
          resize-none
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