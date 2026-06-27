export default function Spinner() {
  return (
    <div className="flex justify-center py-10">
      <div
        className="
          h-8
          w-8
          animate-spin
          rounded-full
          border-4
          border-accent
          border-t-transparent
        "
      />
    </div>
  );
}