import type { Plan } from '../types';

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 border-green-200',
  Intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Advanced: 'bg-red-100 text-red-700 border-red-200',
};

interface PlanDetailProps {
  plan: Plan;
}

export default function PlanDetail({ plan }: PlanDetailProps) {
  const { ai_result } = plan;

  return (
    <div className="flex animate-fade-in flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              {plan.category}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${DIFFICULTY_COLORS[ai_result.difficulty] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}
            >
              {ai_result.difficulty}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
          <p className="mt-1 text-sm text-gray-500">
            Created{' '}
            {new Date(plan.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="card border-brand-200 bg-brand-50">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">
          Summary
        </h3>
        <p className="leading-relaxed text-gray-800">{ai_result.summary}</p>
      </div>

      {/* Original Description */}
      <div className="card">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Your Idea
        </h3>
        <p className="leading-relaxed text-gray-700">{plan.description}</p>
      </div>

      {/* Tech Stack */}
      <div className="card">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Recommended Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {ai_result.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="card">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Implementation Steps
        </h3>
        <ol className="flex flex-col gap-4">
          {ai_result.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{step.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Potential Challenges */}
      <div className="card">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Potential Challenges
        </h3>
        <ul className="flex flex-col gap-2">
          {ai_result.challenges.map((challenge, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-700">{challenge}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
