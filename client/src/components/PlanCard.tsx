import { useNavigate } from 'react-router-dom';
import type { Plan } from '../types';

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
};

interface PlanCardProps {
  plan: Plan;
  onDelete: (id: string) => void;
  deleting?: boolean;
}

export default function PlanCard({ plan, onDelete, deleting = false }: PlanCardProps) {
  const navigate = useNavigate();
  const difficulty = plan.ai_result.difficulty;

  return (
    <div className="card flex flex-col gap-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
              {plan.category}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[difficulty] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {difficulty}
            </span>
          </div>
          <h3 className="mt-2 truncate text-base font-semibold text-gray-900">{plan.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">{plan.description}</p>
        </div>
      </div>

      <p className="line-clamp-3 text-sm text-gray-700">{plan.ai_result.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {plan.ai_result.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {tech}
          </span>
        ))}
        {plan.ai_result.techStack.length > 4 && (
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            +{plan.ai_result.techStack.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-xs text-gray-400">
          {new Date(plan.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onDelete(plan.id)}
            disabled={deleting}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
          <button
            onClick={() => navigate(`/plans/${plan.id}`)}
            className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100"
          >
            View Plan
          </button>
        </div>
      </div>
    </div>
  );
}
