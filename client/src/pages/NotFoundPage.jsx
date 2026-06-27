import { Link } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <section className="text-center">
        {/* Visual Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 border border-white/10">
          <Search className="h-10 w-10 text-accent" />
        </div>

        {/* Error Messaging */}
        <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-100">Page not found</h2>
        <p className="mt-4 max-w-sm leading-7 text-gray-400">
          The page you are looking for has been moved or doesn't exist in the CodeRevise workspace.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-background transition hover:opacity-90"
          >
            <Home className="h-4 w-4" /> Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
        </div>
      </section>
    </main>
  );
}