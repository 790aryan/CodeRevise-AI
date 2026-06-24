import { useState } from 'react';
import { createProblem } from '@/services/problem.service.js';
import { useEffect} from 'react';
import { getTopics } from '@/services/topic.service.js';

export default function AddProblemPage() {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
    const [platformProblemId, setPlatformProblemId] = useState('');
    const [problemUrl, setProblemUrl] = useState('');
    const [availableTopics, setAvailableTopics] = useState([]);
const [selectedTopicId, setSelectedTopicId] = useState('');

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
  title,
  slug: title
    .toLowerCase()
    .replace(/\s+/g, '-'),

  platform,

  platformProblemId,

  problemUrl,

  difficulty,

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
        <input
          type="text"
          placeholder="Problem Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />

        <input
          type="text"
          placeholder="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />
        <input
  type="text"
  placeholder="Platform Problem ID"
  value={platformProblemId}
  onChange={(e) => setPlatformProblemId(e.target.value)}
  className="w-full rounded-lg border px-4 py-3 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
/>
<input
  type="text"
  placeholder="Problem URL"
  value={problemUrl}
  onChange={(e) => setProblemUrl(e.target.value)}
  className="w-full rounded-lg border px-4 py-3 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
/>
<select
  value={selectedTopicId}
  onChange={(e) => setSelectedTopicId(e.target.value)}
  className="
    w-full
    rounded-lg
    border
    px-4
    py-3
    bg-slate-800
    text-white
    focus:outline-none
    focus:ring-2
    focus:ring-cyan-500
  "
>
  <option value="">
    Select Topic
  </option>

  {availableTopics.map((topic) => (
    <option
      key={topic._id}
      value={topic._id}
    >
      {topic.name}
    </option>
  ))}
</select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full rounded-lg bg-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          type="submit"
          className="rounded-lg border px-4 py-2"
        >
          Create Problem
        </button>
      </form>
    </div>
  );
}