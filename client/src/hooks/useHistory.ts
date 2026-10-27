import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import type { Plan } from '../types';

export function useHistory() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    api
      .getPlans()
      .then(setPlans)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load plans.'),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { plans, loading, error, refresh };
}
