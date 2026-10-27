export interface AIPlanStep {
  title: string;
  description: string;
}

export interface AIPlanResult {
  summary: string;
  techStack: string[];
  steps: AIPlanStep[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  challenges: string[];
}

export interface Plan {
  id: string;
  title: string;
  description: string;
  category: string;
  ai_result: AIPlanResult;
  created_at: string;
}

export interface CreatePlanInput {
  title: string;
  description: string;
  category: string;
}

export type ApiResponse<T> = { data: T } | { error: string; details?: unknown };
