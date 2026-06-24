import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemById } from '@/services/problem.service.js';

export default function ProblemDetailPage() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProblem() {
      try {
        const data = await getProblemById(id);

        console.log('Problem:', data);

        setProblem(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProblem();
  }, [id]);

  if (loading) {
    return <p>Loading problem...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Problem Detail
      </h1>

      <div className="rounded-lg border p-6 space-y-4">
  <h2 className="text-2xl font-semibold">
    {problem.title}
  </h2>

  <div className="flex flex-wrap gap-2">
    <span className="rounded-md border px-2 py-1 text-sm">
      {problem.platform}
    </span>

    <span className="rounded-md border px-2 py-1 text-sm">
      {problem.difficulty}
    </span>
  </div>

  <div>
    <h3 className="mb-2 text-lg font-semibold">
    Topics
    </h3>

    <div className="flex flex-wrap gap-2">
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

  <div>
    <h3 className="text-lg font-semibold">
    Problem URL
    </h3>

    <a
      href={problem.problemUrl}
      target="_blank"
      rel="noreferrer"
      className="text-cyan-500 hover:underline"
    >
      Open Problem
    </a>
  </div>

  <div className="text-sm opacity-70">
    Created:
    {' '}
    {new Date(problem.createdAt).toLocaleString()}
  </div>

  <div className="text-sm opacity-70">
    Updated:
    {' '}
    {new Date(problem.updatedAt).toLocaleString()}
  </div>
</div>
    </div>
  );
}