import { BookOpen, Clock3, Flame, Target } from 'lucide-react';
import SummaryCard from './SummaryCard.jsx';

export default function SummaryCards({ summary }) {
  const stats = [
    { title: "Solved", value: summary?.solvedProblems ?? 0, subtitle: "Total Challenges", icon: <BookOpen className="h-5 w-5" />, color: "blue" },
    { title: "Due Today", value: summary?.dueToday ?? 0, subtitle: "Pending Revisions", icon: <Clock3 className="h-5 w-5" />, color: "amber" },
    { title: "Current Streak", value: summary?.streak ?? 0, subtitle: "Active Days", icon: <Flame className="h-5 w-5" />, color: "red" },
    { title: "Accuracy", value: `${summary?.accuracy ?? 0}%`, subtitle: "Success Rate", icon: <Target className="h-5 w-5" />, color: "emerald" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <SummaryCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}