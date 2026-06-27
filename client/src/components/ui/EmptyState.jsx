export default function EmptyState({
  title,
  description,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-dashed
        border-white/10
        py-12
        text-center
      "
    >
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-text-muted">
        {description}
      </p>
    </div>
  );
}