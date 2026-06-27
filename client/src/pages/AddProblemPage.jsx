import { useState } from 'react';
import { createProblem } from '@/services/problem.service.js';
import { useEffect} from 'react';
import { getTopics } from '@/services/topic.service.js';
import ProblemForm from '@/components/problems/ProblemForm.jsx';
import { fetchProblemDetails } from '@/services/metadata.service.js';
import { checkProblemExists } from '@/services/problemExists.service.js';
import toast from 'react-hot-toast'
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
const [selectedTopicIds, setSelectedTopicIds] = useState([]);
const [isFetching, setIsFetching] = useState(false);
const [isAutoFilled, setIsAutoFilled] = useState(false);
const [duplicateProblem, setDuplicateProblem] =
  useState(null);
function handleInputChange(event) {
  const { name, value, type, checked } = event.target;

  if (name === 'problemUrl') {
    setDuplicateProblem(null);
    setIsAutoFilled(false);
    setSelectedTopicIds([]);
  }

  setFormData((previous) => ({
    ...previous,
    [name]: type === 'checkbox' ? checked : value,
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
  
  if (duplicateProblem) {
    toast.error('This problem already exists.');
    return;
  }
// 1. A tiny helper function to turn "Valid Parentheses" into "valid-parentheses"
  const generateSlug = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')    // Remove non-word characters
      .replace(/[\s_-]+/g, '-')    // Replace spaces and underscores with a hyphen
      .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
  };
 // 2. Group the payload and attach the newly generated slug
  const payload = {
    ...formData,
    platformProblemId: Number(formData.platformProblemId), 
    slug: generateSlug(formData.title), // 👈 ADD THIS LINE
    topics: selectedTopicIds,
  };
  console.log('🚀 Payload being sent to backend:', payload);

  try {
    const result = await createProblem(payload);
    console.log('✅ Created Problem:', result);
    toast.success('Problem created successfully!');

    setFormData({
      title: '',
      platform: '',
      platformProblemId: '',
      problemUrl: '',
      difficulty: '',
      isPremium: false,
      isActive: true,
    });
    setSelectedTopicIds([]);
    setDuplicateProblem(null);
    setIsAutoFilled(false);

  } catch (error) {
    // 2. Extract the SPECIFIC backend error message
    if (error.response && error.response.data) {
      console.error('❌ Backend Validation Error Details:', error.response.data);
      
      // Attempt to toast the exact message so you can see it on screen
      const errorMessage = error.response.data.message || error.response.data.error || 'Validation Error';
      toast.error(String(errorMessage));
    } else {
      console.error('❌ Network or Unknown Error:', error);
      toast.error('Failed to create problem. Check console.');
    }

    setDuplicateProblem(null);
    setIsAutoFilled(false);
    setSelectedTopicIds([]);
  }
}
async function handleFetchDetails() {
  if (!formData.problemUrl.trim()) return;

  try {
    setIsFetching(true);

    const data = await fetchProblemDetails(formData.problemUrl);
    const duplicate =
  await checkProblemExists(
    data.platform,
    data.platformProblemId,
  );

if (duplicate.exists) {
  setDuplicateProblem(
    duplicate.problem,
  );
} else {
  setDuplicateProblem(null);
}
    setFormData((previous) => ({
      ...previous,
      title: data.title,
      platform: data.platform,
      platformProblemId: data.platformProblemId,
      difficulty:data.difficulty.toLowerCase(),
    }));

setSelectedTopicIds(
  data.topics.map((topic) => topic._id)
);
    setIsAutoFilled(true);

  } catch (error) {
    console.error(error);
  } finally {
    setIsFetching(false);
  }
}

useEffect(() => {
  const url = formData.problemUrl.trim();

  if (!url) return;

  if (
    !url.includes("leetcode.com") &&
    !url.includes("codeforces.com")
  ) {
    return;
  }

  const timer = setTimeout(() => {
    handleFetchDetails();
  }, 700);

  return () => clearTimeout(timer);
}, [formData.problemUrl]);


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
  selectedTopicIds={selectedTopicIds}
setSelectedTopicIds={setSelectedTopicIds}
  submitLabel="Create Problem"

  onFetchDetails={handleFetchDetails}
  isFetching={isFetching}
  isAutoFilled={isAutoFilled}
  setIsAutoFilled={setIsAutoFilled}
  duplicateProblem={duplicateProblem}
/>
      </form>
    </div>
  );
}