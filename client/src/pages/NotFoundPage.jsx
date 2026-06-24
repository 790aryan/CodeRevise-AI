import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-text">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          Not Found
        </p>
        <h1 className="mt-4 text-4xl font-bold">This page is not available.</h1>
        <p className="mt-4 leading-7 text-text-muted">
          The route does not exist in the current CodeRevise AI foundation.
        </p>
        <Link
          className="mt-8 inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-background transition hover:bg-accent-strong"
          to="/"
        >
          Return Home
        </Link>
      </section>
    </main>
  );
}
