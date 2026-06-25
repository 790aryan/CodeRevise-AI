import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProblemForm from '@/components/problems/ProblemForm.jsx';

import {
  getProblemById,
  updateProblem,
} from '@/services/problem.service.js';

import { getTopics } from '@/services/topic.service.js';

export default function EditProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [availableTopics, setAvailableTopics] = useState([]);

  const [selectedTopicId, setSelectedTopicId] =
    useState('');

  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    platformProblemId: '',
    problemUrl: '',
    difficulty: '',
    isPremium: false,
    isActive: true,
  });

  function handleInputChange(event) {
    const { name, value, type, checked } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [problem, topics] =
          await Promise.all([
            getProblemById(id),
            getTopics(),
          ]);

        setAvailableTopics(topics);

        setFormData({
          title: problem.title,
          platform: problem.platform,
          platformProblemId:
            problem.platformProblemId,
          problemUrl: problem.problemUrl,
          difficulty: problem.difficulty,
          isPremium: problem.isPremium,
          isActive: problem.isActive,
        });

        setSelectedTopicId(
          problem.topics?.[0]?._id ??
            problem.topics?.[0] ??
            '',
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setUpdating(true);

      await updateProblem(id, {
        ...formData,

        slug: formData.title
          .toLowerCase()
          .replace(/\s+/g, '-'),

        topics: [selectedTopicId],
      });

      alert(
        'Problem updated successfully!',
      );

      navigate('/problems');
    } catch (error) {
      console.error(error);

      alert('Failed to update problem.');
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Problem
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <ProblemForm
          formData={formData}
          onChange={handleInputChange}
          availableTopics={availableTopics}
          selectedTopicId={selectedTopicId}
          setSelectedTopicId={
            setSelectedTopicId
          }
          submitLabel="Update Problem"
          submitting={updating}
        />
      </form>
    </div>
  );
}