import { Router, type Request, type Response, type Router as ExpressRouter } from 'express';
import rateLimit from 'express-rate-limit';
import { supabase } from '../db';
import { generatePlan } from '../gemini';
import { CreatePlanSchema, type Plan, type ApiError, type ApiSuccess } from '../types';

const router: ExpressRouter = Router();

const generateRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many plan generation requests. Please wait a minute before trying again.',
  },
});

// POST /api/plans — Validate input, call Gemini, save to DB, return plan
router.post('/', generateRateLimit, async (req: Request, res: Response) => {
  const parsed = CreatePlanSchema.safeParse(req.body);
  if (!parsed.success) {
    const response: ApiError = {
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    };
    res.status(400).json(response);
    return;
  }

  const input = parsed.data;

  let aiResult;
  try {
    aiResult = await generatePlan(input);
  } catch (err) {
    console.error('Gemini generation error:', err);
    const response: ApiError = {
      error: 'Failed to generate plan. The AI service is unavailable or returned an invalid response.',
    };
    res.status(502).json(response);
    return;
  }

  const { data, error } = await supabase
    .from('plans')
    .insert({
      title: input.title,
      description: input.description,
      category: input.category,
      ai_result: aiResult,
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    const response: ApiError = { error: 'Failed to save the plan. Please try again.' };
    res.status(500).json(response);
    return;
  }

  const response: ApiSuccess<Plan> = { data: data as Plan };
  res.status(201).json(response);
});

// GET /api/plans — Return recent plans
router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Supabase fetch error:', error);
    const response: ApiError = { error: 'Failed to fetch plans.' };
    res.status(500).json(response);
    return;
  }

  const response: ApiSuccess<Plan[]> = { data: (data as Plan[]) ?? [] };
  res.json(response);
});

// GET /api/plans/:id — Return one plan
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase.from('plans').select('*').eq('id', id).single();

  if (error || !data) {
    const response: ApiError = { error: 'Plan not found.' };
    res.status(404).json(response);
    return;
  }

  const response: ApiSuccess<Plan> = { data: data as Plan };
  res.json(response);
});

// DELETE /api/plans/:id — Delete a plan
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase.from('plans').delete().eq('id', id);

  if (error) {
    console.error('Supabase delete error:', error);
    const response: ApiError = { error: 'Failed to delete plan.' };
    res.status(500).json(response);
    return;
  }

  res.status(204).send();
});

export default router;
