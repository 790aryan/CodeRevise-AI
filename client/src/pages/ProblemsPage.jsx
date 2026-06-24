import { useEffect, useState } from 'react';
import { getProblems } from '@/services/problem.service.js';

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await getProblems();

        console.log('Problems:', data);

        setProblems(data);
      } catch (error) {
        console.error('Failed to fetch problems:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProblems();
  }, []);

  if (loading) {
    return <p>Loading problems...</p>;
  }
const filteredProblems = problems.filter((problem) =>
  problem.title.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className="max-w-5xl mx-auto p-6">
    <h1 className="mb-6 text-3xl font-bold">
      Problems
    </h1>
        <div className="mb-6">
  <input
    type="text"
    placeholder="Search problems..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full rounded-lg border px-4 py-3 text-sm"
  />
</div>
      <div className="space-y-4">
  {filteredProblems.length === 0 ? (
  <p>No problems found.</p>
) : filteredProblems.map((problem) => (
    <div
      key={problem._id}
      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      <h2 className="text-xl font-semibold">
        {problem.title}
      </h2>

      <div className="mt-3 flex flex-wrap gap-2">
  <span className="rounded-md border px-2 py-1 text-sm">
    {problem.platform}
  </span>

  <span className="rounded-md border px-2 py-1 text-sm">
    {problem.difficulty}
  </span>
</div>

      <div className="mt-4">
        Topics:
        <div className="flex flex-wrap gap-2 mt-2">
  {problem.topics.map((topic) => (
    <span
      key={topic._id}
      className="rounded-md border px-2 py-1 text-sm"
    >
      {topic.name}
    </span>
  ))}
</div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}