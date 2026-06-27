import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import ProblemForm from '@/components/problems/ProblemForm.jsx';
import { getProblemById, updateProblem } from '@/services/problem.service.js';
import { getTopics } from '@/services/topic.service.js';

export default function EditProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [availableTopics, setAvailableTopics] = useState([]);
  
  // Updated to support multiple topics as per the modern ProblemForm
  const [selectedTopicIds, setSelectedTopicIds] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    platformProblemId: '',
    problemUrl: '',
    difficulty: '',
    isPremium: false,
    isActive: true,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [problem, topics] = await Promise.all([
          getProblemById(id),
          getTopics(),
        ]);

        setAvailableTopics(topics);
        setFormData({
          title: problem.title,
          platform: problem.platform,
          platformProblemId: problem.platformProblemId,
          problemUrl: problem.problemUrl,
          difficulty: problem.difficulty,
          isPremium: problem.isPremium,
          isActive: problem.isActive,
        });

        // Ensure we map existing topic IDs correctly
        setSelectedTopicIds(problem.topics?.map(t => t._id) || []);
      } catch (error) {
        toast.error('Failed to load problem data.');
        navigate('/problems');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, navigate]);

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setUpdating(true);

    try {
      await updateProblem(id, {
        ...formData,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        topics: selectedTopicIds,
      });

      toast.success('Problem updated successfully!');
      navigate('/problems');
    } catch (error) {
      toast.error('Failed to update problem.');
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 md:p-8">
      <button 
        onClick={() => navigate('/problems')}
        className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Library
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Problem</h1>
        <p className="text-gray-400 mt-2">Modify the details of your saved coding challenge.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-white/10 p-8 shadow-sm">
        <ProblemForm
          formData={formData}
          onChange={handleInputChange}
          availableTopics={availableTopics}
          selectedTopicIds={selectedTopicIds}
          setSelectedTopicIds={setSelectedTopicIds}
          submitLabel="Update Problem"
          submitting={updating}
        />
      </form>
    </main>
  );
}