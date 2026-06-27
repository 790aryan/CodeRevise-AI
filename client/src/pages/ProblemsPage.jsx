import { useEffect, useState } from 'react';
import { getProblems, deleteProblem } from '@/services/problem.service.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, Plus, Trash2, BarChart3, Edit2, Eye, Loader2, Tag } from 'lucide-react';

export default function ProblemsPage() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await getProblems();
        setProblems(data);
      } catch (error) {
        toast.error('Failed to load problems.');
      } finally {
        setLoading(false);
      }
    }
    loadProblems();
  }, []);

  const filteredProblems = problems.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleDelete() {
    if (!selectedProblem) return;
    try {
      setDeleting(true);
      await deleteProblem(selectedProblem._id);
      setProblems((prev) => prev.filter((p) => p._id !== selectedProblem._id));
      setShowDeleteModal(false);
      toast.success('Problem removed.');
    } catch (error) {
      toast.error('Deletion failed.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library</h1>
          <p className="text-gray-400">Manage your problem repository and mastery metrics.</p>
        </div>
        <button 
          onClick={() => navigate('/problems/new')}
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-semibold text-background hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add Problem
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-surface py-3 pl-10 pr-4 outline-none transition-all focus:border-accent"
        />
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex h-64 items-center justify-center text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4">Topics</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredProblems.map((p) => (
                <tr key={p._id} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">{p.title}</td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-accent">{p.difficulty}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.topics.slice(0, 3).map((t) => (
                        <span key={t._id} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <ActionBtn onClick={() => navigate(`/problems/${p._id}`)} icon={<Eye />} />
                      <ActionBtn onClick={() => navigate(`/problems/${p._id}/edit`)} icon={<Edit2 />} />
                      <ActionBtn onClick={() => navigate(`/problem-analytics/${p._id}`)} icon={<BarChart3 />} />
                      <ActionBtn 
                        className="text-red-400 hover:bg-red-500/10" 
                        onClick={() => { setSelectedProblem(p); setShowDeleteModal(true); }} 
                        icon={<Trash2 />} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-6 shadow-2xl">
            <h2 className="text-xl font-bold">Delete Problem</h2>
            <p className="mt-2 text-gray-400 text-sm">Are you sure you want to delete <span className="text-white font-medium">{selectedProblem?.title}</span>? This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-xl border border-white/10 py-2.5 font-semibold" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="flex-1 rounded-xl bg-red-500 py-2.5 font-semibold text-white" onClick={handleDelete}>{deleting ? '...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ActionBtn({ onClick, icon, className = "" }) {
  return (
    <button onClick={onClick} className={`p-2 rounded-lg hover:bg-white/10 transition-all ${className}`}>
      {icon}
    </button>
  );
}