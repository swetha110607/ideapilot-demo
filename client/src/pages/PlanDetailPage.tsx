import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import type { Plan } from '../types';
import PlanDetail from '../components/PlanDetail';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Disclaimer from '../components/Disclaimer';

export default function PlanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    api
      .getPlan(id)
      .then(setPlan)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load plan.'),
      )
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  return (
    <div className="flex animate-fade-in flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <Disclaimer />

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      )}

      {error && !loading && <ErrorMessage message={error} onRetry={fetchPlan} />}

      {plan && !loading && <PlanDetail plan={plan} />}
    </div>
  );
}
