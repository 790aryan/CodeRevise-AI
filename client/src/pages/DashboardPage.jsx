const dashboardCards = [
  {
    title: 'Revision Queue',
    value: 'Ready',
    description: 'Daily review structure is in place.',
  },
  {
    title: 'Retention',
    value: 'Pending',
    description: 'Retention metrics will connect in a later phase.',
  },
  {
    title: 'Topic Mastery',
    value: 'Pending',
    description: 'Topic signals will appear after tracking exists.',
  },
  {
    title: 'Readiness',
    value: 'Pending',
    description: 'Interview readiness will be added after analytics.',
  },
];

export function DashboardPage() {
  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          Dashboard
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Foundation Overview</h2>
        <p className="mt-3 max-w-2xl leading-7 text-text-muted">
          The application shell is ready for future product modules while this
          phase keeps business logic intentionally out of scope.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => (
          <article
            className="rounded-lg border border-white/10 bg-surface p-5 shadow-soft"
            key={card.title}
          >
            <p className="text-sm text-text-muted">{card.title}</p>
            <p className="mt-4 text-2xl font-semibold text-text">{card.value}</p>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
