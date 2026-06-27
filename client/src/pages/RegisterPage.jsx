import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/services/auth.service.js';
import { Loader2, Mail, Lock, User, AlertCircle, Sparkles } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-8 shadow-2xl">
        <div className="mb-8 flex items-center gap-2 text-accent">
          <Sparkles className="h-6 w-6" />
          <span className="font-bold tracking-widest uppercase text-sm">CodeRevise AI</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="mt-2 text-sm text-text-muted">Start your journey to mastery today.</p>

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-accent py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>
      </div>
    </section>
  );
}