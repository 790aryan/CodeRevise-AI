export default function ProblemForm({
  formData,
  onChange,
  availableTopics,
  selectedTopicId,
  setSelectedTopicId,
  submitLabel,
  submitting = false,
}) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Problem Title"
        value={formData.title}
        onChange={onChange}
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
      />

      <input
        type="text"
        name="platform"
        placeholder="Platform"
        value={formData.platform}
        onChange={onChange}
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
      />

      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={onChange}
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
          Select Difficulty
        </option>

        <option value="easy">
          Easy
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="hard">
          Hard
        </option>
      </select>

      <input
        type="text"
        name="platformProblemId"
        placeholder="Platform Problem ID"
        value={formData.platformProblemId}
        onChange={onChange}
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
      />

      <input
        type="url"
        name="problemUrl"
        placeholder="Problem URL"
        value={formData.problemUrl}
        onChange={onChange}
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
      />

      <select
  value={selectedTopicId}
  onChange={(e) =>
    setSelectedTopicId(e.target.value)
  }
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

<button
  type="submit"
  disabled={submitting}
  className="
    w-full
    rounded-lg
    bg-accent
    px-4
    py-3
    font-semibold
    text-background
    transition
    hover:opacity-90
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {submitting
    ? 'Please wait...'
    : submitLabel}
</button>
    </div>
  );
}