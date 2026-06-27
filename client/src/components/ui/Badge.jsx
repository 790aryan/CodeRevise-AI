export default function Badge({
  children,
}) {
  return (
    <span
      className="
        rounded-md
        border
        border-white/10
        px-3
        py-1
        text-sm
        bg-background
      "
    >
      {children}
    </span>
  );
}