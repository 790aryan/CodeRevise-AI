import { Link } from 'react-router-dom';
import { APP_NAME } from '@/constants/app.js';
import heroPreview from '@/assets/revision-preview.svg';

const benefits = [
  'Structured revision for solved problems',
  'Mistake-aware learning habits',
  'Preparation signals that focus on retention',
];

const previewCards = [
  {
    title: 'Revision Queue',
    description: 'A focused place for problems that need another pass.',
  },
  {
    title: 'Retention View',
    description: 'A foundation for measuring what still sticks over time.',
  },
  {
    title: 'Topic Signals',
    description: 'A clean surface for future mastery and readiness insights.',
  },
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-text">
      <section className="border-b border-white/10">
        <div className="mx-auto grid min-h-[86vh] max-w-7xl items-center gap-10 px-5 py-10 md:px-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              {APP_NAME}
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
              Never Forget a Problem Again.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted">
              A focused revision workspace for programmers who want solved
              problems to become durable interview and contest readiness.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-background shadow-accent transition hover:bg-accent-strong"
                to="/dashboard"
              >
                View Foundation
              </Link>
              <a
                className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-text transition hover:border-accent hover:text-accent"
                href="#benefits"
              >
                Explore Benefits
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface p-4 shadow-elevated">
            <img
              alt="CodeRevise AI revision workspace preview"
              className="h-auto w-full rounded-md"
              src={heroPreview}
            />
          </div>
        </div>
      </section>

      <section className="bg-surface/40 px-5 py-14 md:px-8" id="benefits">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                className="rounded-lg border border-white/10 bg-surface p-5 text-base font-medium text-text"
                key={benefit}
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Product Foundation
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Built around revision, retention, and readiness.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {previewCards.map((card) => (
              <article
                className="rounded-lg border border-white/10 bg-surface p-6 shadow-soft"
                key={card.title}
              >
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-3 leading-7 text-text-muted">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
