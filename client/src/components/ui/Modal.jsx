export default function Modal({
  open,
  title,
  children,
  footer,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-xl cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="mt-5">
          {children}
        </div>

        {footer && (
          <div className="mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}