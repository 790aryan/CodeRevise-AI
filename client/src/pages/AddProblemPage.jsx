import { useState } from 'react';
import { createProblem } from '@/services/problem.service.js';
import { useEffect} from 'react';
import { getTopics } from '@/services/topic.service.js';
import ProblemForm from '@/components/problems/ProblemForm.jsx';

export default function AddProblemPage() {
  


  const [formData, setFormData] = useState({
  title: '',
  platform: '',
  platformProblemId: '',
  problemUrl: '',
  difficulty: '',
  
  isPremium: false,
  isActive: true,
});

    const [availableTopics, setAvailableTopics] = useState([]);
const [selectedTopicId, setSelectedTopicId] = useState('');

function handleInputChange(event) {
  const { name, value, type, checked } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]:
      type === 'checkbox'
        ? checked
        : value,
  }));
}

useEffect(() => {
  async function loadTopics() {
    try {
      const data = await getTopics();

      console.log('Topics:', data);

      setAvailableTopics(data);
    } catch (error) {
      console.error(error);
    }
  }

  loadTopics();
}, []);

  async function handleSubmit(event) {
  event.preventDefault();

  console.log('Submit clicked');

  try {
    const result = await createProblem({
  ...formData,

  slug: formData.title
    .toLowerCase()
    .replace(/\s+/g, '-'),

  topics: [selectedTopicId],
});

    console.log('Created Problem:', result);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Add Problem
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
  setSelectedTopicId={setSelectedTopicId}
  submitLabel="Create Problem"
/>
      </form>
    </div>
  );
}