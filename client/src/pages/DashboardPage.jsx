import { useEffect, useState } from 'react';
import { getDashboardSummary, getDashboardProgress,  getRecentActivity, getDifficultyBreakdown,getWeakTopics,} from '@/services/dashboard.service.js';

 
export function DashboardPage() {

    const [summary, setSummary] = useState(null);
    const [progress, setProgress] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [difficultyBreakdown, setDifficultyBreakdown] = useState(null);
    const [weakTopics, setWeakTopics] = useState([]);

  useEffect(() => {
  async function loadDashboardData() {
    try {

     const [summaryData, progressData, activityData,difficultyData,weakTopicsData,] = await Promise.all([

     
        getDashboardSummary(),
        getDashboardProgress(),
        getRecentActivity(),
        getDifficultyBreakdown(),
        getWeakTopics(),
      ]);



      setSummary(summaryData);
      setProgress(progressData);
      setRecentActivity(activityData.activities ?? []);
      setDifficultyBreakdown(difficultyData);
      setWeakTopics(weakTopicsData);
    } catch (error) {
      console.error(error);
    }
  }

  loadDashboardData();
}, []);

   const dashboardCards = [
    {
      title: 'Solved Problems',
      value: summary?.solvedProblems ?? 0,
      description: 'Problems successfully solved.',
    },
    {
      title: 'Attempted Problems',
      value: summary?.attemptedProblems ?? 0,
      description: 'Problems tracked in the system.',
    },
    {
      title: 'Active Revisions',
      value: summary?.activeRevisions ?? 0,
      description: 'Problems currently scheduled for revision.',
    },
    {
      title: 'Due Revisions',
      value: summary?.dueRevisions ?? 0,
      description: 'Revisions that should be completed now.',
    },
  ];
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
      <section className="mt-8">
  <h3 className="text-2xl font-semibold mb-4">
    Progress Overview
  </h3>

  <div className="grid gap-5 md:grid-cols-2">
    <article className="rounded-lg border border-white/10 bg-surface p-5 shadow-soft">
      <h4 className="text-lg font-medium mb-3">
        Last 7 Days
      </h4>

      <p>
        Attempts: {progress?.last7Days?.attempts ?? 0}
      </p>

      <p>
        Revisions: {progress?.last7Days?.revisions ?? 0}
      </p>
    </article>

    <article className="rounded-lg border border-white/10 bg-surface p-5 shadow-soft">
      <h4 className="text-lg font-medium mb-3">
        Last 30 Days
      </h4>

      <p>
        Attempts: {progress?.last30Days?.attempts ?? 0}
      </p>

      <p>
        Revisions: {progress?.last30Days?.revisions ?? 0}
      </p>
    </article>
  </div>
</section>
<section className="mt-8">
  <h3 className="text-2xl font-semibold mb-4">
    Recent Activity
  </h3>

  <div className="space-y-3">
    {recentActivity.length === 0 ? (
      <p className="text-text-muted">
        No recent activity found.
      </p>
    ) : (
      recentActivity.map((activity) => (
        <article
          key={activity.id}
          className="rounded-lg border border-white/10 bg-surface p-4 shadow-soft"
        >
          <p className="font-medium">
            {activity.type === 'problem_attempt'
              ? 'Problem Attempt'
              : activity.type}
          </p>

          <p className="text-sm text-text-muted mt-1">
            {new Date(activity.createdAt).toLocaleString()}
          </p>
        </article>
      ))
    )}
  </div>
</section>
<section className="mt-8">
  <h3 className="text-2xl font-semibold mb-4">
    Difficulty Breakdown
  </h3>

  <div className="grid gap-4 md:grid-cols-3">
    <article className="rounded-lg border border-white/10 bg-surface p-5 shadow-soft">
      <p className="text-sm text-text-muted">Easy</p>
      <p className="mt-3 text-2xl font-semibold">
        {difficultyBreakdown?.easy ?? 0}
      </p>
    </article>

    <article className="rounded-lg border border-white/10 bg-surface p-5 shadow-soft">
      <p className="text-sm text-text-muted">Medium</p>
      <p className="mt-3 text-2xl font-semibold">
        {difficultyBreakdown?.medium ?? 0}
      </p>
    </article>

    <article className="rounded-lg border border-white/10 bg-surface p-5 shadow-soft">
      <p className="text-sm text-text-muted">Hard</p>
      <p className="mt-3 text-2xl font-semibold">
        {difficultyBreakdown?.hard ?? 0}
      </p>
    </article>
  </div>
</section>

<section className="mt-8">
  <h3 className="text-2xl font-semibold mb-4">
    Weak Topics
  </h3>

  <div className="space-y-3">
    {weakTopics.length === 0 ? (
      <p className="text-text-muted">
        No weak topics found.
      </p>
    ) : (
      weakTopics.map((topic) => (
        <article
          key={topic.topic}
          className="rounded-lg border border-white/10 bg-surface p-4 shadow-soft"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium">
              {topic.topic}
            </p>

            <p className="text-sm text-text-muted">
              Score: {topic.score}
            </p>
          </div>
        </article>
      ))
    )}
  </div>
</section>
    </section>
  );
}
