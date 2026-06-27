import { Button, Input, Select } from '@/components/ui';
import { 
  Rocket, 
  CheckCircle2, 
  Tag, 
  TriangleAlert, 
  Loader2, 
  Unlock 
} from 'lucide-react';

export default function ProblemForm({
  formData,
  onChange,
  availableTopics,
  selectedTopicIds = [],
  setSelectedTopicIds,
  submitLabel,
  submitting = false,
  isFetching,
  isAutoFilled,
  setIsAutoFilled,
  duplicateProblem,
}) {
  // NOTE: Changed from <form> to <div> to prevent nested form hydration errors
  return (
    <div className="space-y-8">
      
      {/* 1. Alert Section */}
      {duplicateProblem && (
        <div className="flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 animate-in fade-in slide-in-from-top-2">
          <TriangleAlert className="h-5 w-5 text-yellow-400 shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-400">Problem Already Exists</h3>
            <p className="text-sm text-yellow-200/80 mt-0.5">{duplicateProblem.title}</p>
          </div>
        </div>
      )}

      {/* 2. Import Section */}
      <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Rocket className="h-5 w-5 text-blue-400" />
          Auto-Import Problem
        </h3>
        <p className="mt-1 text-sm text-gray-400 mb-6">
          Paste a problem URL (LeetCode/Codeforces) to instantly sync metadata.
        </p>

        <div className="relative">
          <Input
            name="problemUrl"
            placeholder="https://leetcode.com/problems/..."
            value={formData.problemUrl}
            onChange={onChange}
            disabled={isFetching}
            className="pr-12"
          />
          {isFetching && (
            <div className="absolute right-3 top-3">
              <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
            </div>
          )}
        </div>
      </div>

      {/* 3. Manual Fields Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Manual Details</span>
          {isAutoFilled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoFilled(false)}
              className="h-8 gap-2 text-xs"
            >
              <Unlock className="h-3 w-3" /> Unlock Fields
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input label="Title" name="title" value={formData.title} onChange={onChange} readOnly={isAutoFilled} />
          <Input label="Platform" name="platform" value={formData.platform} onChange={onChange} readOnly={isAutoFilled} />
          <Select
            label="Difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={onChange}
            disabled={isAutoFilled}
            options={[
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
            ]}
          />
          <Input label="Platform ID" name="platformProblemId" value={formData.platformProblemId} onChange={onChange} readOnly={isAutoFilled} />
        </div>
      </div>

      {/* 4. Topic Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">Topics</label>
        <div className="flex flex-wrap gap-2">
          {availableTopics.map((topic) => {
            const isSelected = selectedTopicIds.includes(topic._id);
            return (
              <button
                key={topic._id}
                type="button"
                disabled={isAutoFilled}
                onClick={() => setSelectedTopicIds(
                  isSelected ? selectedTopicIds.filter(id => id !== topic._id) : [...selectedTopicIds, topic._id]
                )}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                  isSelected 
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                } ${isAutoFilled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Tag className="h-3 w-3" />
                {topic.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Submit Button */}
      <Button 
        type="submit" 
        disabled={submitting || isFetching || duplicateProblem} 
        className="w-full py-6 text-lg"
      >
        {submitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : submitLabel}
      </Button>
    </div>
  );
}