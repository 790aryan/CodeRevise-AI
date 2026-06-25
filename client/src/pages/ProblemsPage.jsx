import { useEffect, useState } from 'react';
import { getProblems,deleteProblem, } from '@/services/problem.service.js';
import { useNavigate } from 'react-router-dom';

export default function ProblemsPage() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] =
  useState(false);
const [selectedProblem, setSelectedProblem] =
  useState(null);
  const [deleting, setDeleting] = useState(false);
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

async function handleDelete() {
  if (!selectedProblem) {
    return;
  }

  try {
    setDeleting(true);

    await deleteProblem(selectedProblem._id);

    setProblems((previous) =>
      previous.filter(
        (problem) =>
          problem._id !== selectedProblem._id,
      ),
    );

    setShowDeleteModal(false);
    setSelectedProblem(null);

    alert('Problem deleted successfully.');
  } catch (error) {
    console.error(error);

    alert('Failed to delete problem.');
  } finally {
    setDeleting(false);
  }
}
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
  onClick={() => navigate(`/problems/${problem._id}`)}
  className="
    rounded-lg
    border
    p-4
    shadow-sm
    cursor-pointer
    transition
    hover:border-cyan-500
  "
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
  <p className="mb-2 font-medium">
    Topics
  </p>

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

  <div className="mt-6 flex gap-3">

    <button
      onClick={(event) => {
        event.stopPropagation();
        navigate(`/problems/${problem._id}`);
      }}
      className="rounded-lg border px-4 py-2 hover:bg-white/10"
    >
      View
    </button>

    <button
      onClick={(event) => {
        event.stopPropagation();
        navigate(`/problems/${problem._id}/edit`);
      }}
      className="rounded-lg border px-4 py-2 hover:bg-white/10"
    >
      Edit
    </button>

    <button
  onClick={(event) => {
    event.stopPropagation();

    setSelectedProblem(problem);

    setShowDeleteModal(true);
  }}
  className="rounded-lg border border-red-500 px-4 py-2 text-red-400 hover:bg-red-500/10"
>
  Delete
</button>

  </div>
</div>
    </div>
  ))}
</div>

{showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

    <div className="w-full max-w-md rounded-xl border border-white/10 bg-surface p-6">

      <h2 className="text-xl font-semibold">
        Delete Problem
      </h2>

      <p className="mt-4 text-text-muted">
        Are you sure you want to delete
        <span className="font-semibold">
          {' '}
          {selectedProblem?.title}
        </span>
        ?
      </p>

      <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedProblem(null);
          }}
          className="rounded-lg border border-white/10 px-5 py-2"
        >
          Cancel
        </button>

<button
  onClick={handleDelete}
  disabled={deleting}
  className="
    rounded-lg
    bg-red-500
    px-5
    py-2
    text-white
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {deleting
    ? 'Deleting...'
    : 'Delete'}
</button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}