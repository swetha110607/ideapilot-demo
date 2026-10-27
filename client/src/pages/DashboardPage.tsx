import { useState, useCallback } from 'react';
import { api } from '../api';
import type { Plan, CreatePlanInput } from '../types';
import IdeaForm from '../components/IdeaForm';
import PlanCard from '../components/PlanCard';
import PlanDetail from '../components/PlanDetail';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Disclaimer from '../components/Disclaimer';
import { useHistory } from '../hooks/useHistory';

type Tab = 'generate' | 'history';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('generate');
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState<Plan | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { plans, loading: historyLoading, error: historyError, refresh } = useHistory();

  const handleGenerate = useCallback(async (input: CreatePlanInput) => {
    setGenerating(true);
    setGenerateError(null);
    setNewPlan(null);
    try {
      const plan = await api.generatePlan(input);
      setNewPlan(plan);
    } catch (err) {
      setGenerateError(
        err instanceof Error ? err.message : 'Failed to generate plan.',
      );
    } finally {
      setGenerating(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm('Delete this plan? This cannot be undone.')) return;
      setDeletingId(id);
      try {
        await api.deletePlan(id);
        refresh();
      } catch {
        alert('Failed to delete plan. Please try again.');
      } finally {
        setDeletingId(null);
      }
    },
    [refresh],
  );

  const switchToHistory = useCallback(() => {
    setActiveTab('history');
    refresh();
  }, [refresh]);

  return (
    <div className="flex animate-fade-in flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">Generate AI-powered project plans from your ideas.</p>
      </div>

      <Disclaimer />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {(['generate', 'history'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === 'history') refresh();
            }}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab === 'generate'
              ? '✨ Generate Plan'
              : `📋 History${plans.length > 0 ? ` (${plans.length})` : ''}`}
          </button>
        ))}
      </div>

      {/* Generate Tab */}
      {activeTab === 'generate' && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">Describe Your Idea</h2>
            <IdeaForm onSubmit={handleGenerate} loading={generating} />
          </div>

          <div>
            {generating && (
              <div className="card flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Spinner size="lg" />
                <div>
                  <p className="font-semibold text-gray-700">Generating your plan…</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Gemini AI is analyzing your idea. This usually takes 10–20 seconds.
                  </p>
                </div>
              </div>
            )}

            {generateError && !generating && (
              <ErrorMessage
                message={generateError}
                onRetry={() => setGenerateError(null)}
              />
            )}

            {newPlan && !generating && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Generated Plan</h2>
                  <button
                    onClick={switchToHistory}
                    className="text-sm text-brand-600 hover:underline"
                  >
                    View in History →
                  </button>
                </div>
                <PlanDetail plan={newPlan} />
              </div>
            )}

            {!generating && !generateError && !newPlan && (
              <div className="card flex flex-col items-center justify-center gap-3 py-16 text-center text-gray-400">
                <svg className="h-12 w-12 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a7 7 0 015.292 11.58A5 5 0 0117 23H7a5 5 0 01-.292-9.42A7 7 0 0112 2z" />
                </svg>
                <p className="text-sm">
                  Fill in your idea and click <strong>Generate Plan</strong> to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div>
          {historyLoading && (
            <div className="flex items-center justify-center py-16">
              <Spinner size="lg" />
            </div>
          )}

          {historyError && !historyLoading && (
            <ErrorMessage message={historyError} onRetry={refresh} />
          )}

          {!historyLoading && !historyError && plans.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-400">
              <svg
                className="h-12 w-12 text-gray-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <p className="text-sm">No saved plans yet.</p>
              <button
                onClick={() => setActiveTab('generate')}
                className="btn-primary mt-2"
              >
                Generate your first plan
              </button>
            </div>
          )}

          {!historyLoading && !historyError && plans.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onDelete={handleDelete}
                  deleting={deletingId === plan.id}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
