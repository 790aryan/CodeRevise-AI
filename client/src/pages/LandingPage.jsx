import { Link } from 'react-router-dom';
import { APP_NAME } from '@/constants/app.js';
import { Sparkles, BrainCircuit, BarChart3, ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';
import heroPreview from '@/assets/revision-preview.svg';

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold tracking-tight text-white">{APP_NAME}</div>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/login" 
              className="text-sm font-medium text-gray-400 hover:text-white transition"
            >
              Sign In
            </Link>
            
            {/* Professional Glassmorphism CTA Button */}
            <Link 
              to="/register" 
              className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/10 hover:border-white/40 transition-all active:scale-95"
            >
              <UserPlus className="h-4 w-4" /> 
              Create Account
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                <Sparkles className="h-3.5 w-3.5" /> {APP_NAME} AI
              </span>
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
                Never Forget a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Problem Again.</span>
              </h1>
              <p className="max-w-lg text-lg text-gray-400 leading-8">
                Stop wasting time on solved problems. Our adaptive memory engine turns your coding practice into a high-retention, interview-ready workflow.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/dashboard" className="flex items-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-background transition hover:opacity-90 shadow-lg shadow-accent/20">
                  Launch Workspace <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#benefits" className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
                  See How It Works
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative rounded-3xl border border-white/10 bg-surface p-2 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl" />
              <img alt="Workspace" className="w-full rounded-2xl shadow-inner" src={heroPreview} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-white/5" id="benefits">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold">Engineered for Mastery</h2>
            <p className="text-gray-400 mt-4">Built by developers, for developers.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard 
              icon={<BrainCircuit className="h-6 w-6 text-purple-400" />} 
              title="Adaptive Revision" 
              desc="Forget static intervals. Our engine adapts to your specific learning pace."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-6 w-6 text-blue-400" />} 
              title="Retention Analytics" 
              desc="Visualize your memory decay and predict your true mastery levels."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6 text-emerald-400" />} 
              title="Anti-Cramming" 
              desc="Intelligent cooldowns prevent bad habits and force deep long-term encoding."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-surface p-8 transition hover:border-accent/30 hover:bg-surface/80">
      <div className="mb-4 inline-flex rounded-xl bg-white/5 p-3">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-gray-400 leading-relaxed">{desc}</p>
    </article>
  );
}