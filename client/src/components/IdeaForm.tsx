import { useState } from 'react';
import { z } from 'zod';
import type { CreatePlanInput } from '../types';
import Spinner from './Spinner';

const CATEGORIES = [
  'Technology',
  'Business',
  'Education',
  'Health',
  'Entertainment',
  'Social Impact',
  'Finance',
  'Other',
] as const;

const FormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title is too long')
    .trim(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description is too long')
    .trim(),
  category: z.enum(CATEGORIES, {
    errorMap: () => ({ message: 'Please select a category' }),
  }),
});

type FormErrors = Partial<Record<keyof CreatePlanInput, string>>;

interface IdeaFormProps {
  onSubmit: (input: CreatePlanInput) => void;
  loading: boolean;
}

export default function IdeaForm({ onSubmit, loading }: IdeaFormProps) {
  const [values, setValues] = useState<CreatePlanInput>({
    title: '',
    description: '',
    category: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = FormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof CreatePlanInput;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  };

  const update =
    (key: keyof CreatePlanInput) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((err) => ({ ...err, [key]: undefined }));
    };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="title" className="label">
          Idea Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. AI-powered meal planner for busy professionals"
          value={values.title}
          onChange={update('title')}
          disabled={loading}
          className={`input-field ${errors.title ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          id="category"
          value={values.category}
          onChange={update('category')}
          disabled={loading}
          className={`input-field ${errors.category ? 'border-red-400' : ''}`}
        >
          <option value="" disabled>
            Select a category…
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-red-600">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="label">
          Idea Description
          <span className="ml-1 font-normal text-gray-400">
            ({values.description.length}/2000)
          </span>
        </label>
        <textarea
          id="description"
          rows={5}
          placeholder="Describe your idea in detail — the problem it solves, your target users, and any initial thoughts on how it might work."
          value={values.description}
          onChange={update('description')}
          disabled={loading}
          className={`input-field resize-none ${errors.description ? 'border-red-400' : ''}`}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600">{errors.description}</p>
        )}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
        {loading ? (
          <>
            <Spinner size="sm" className="text-white" />
            Generating your plan…
          </>
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Generate Plan
          </>
        )}
      </button>
    </form>
  );
}
