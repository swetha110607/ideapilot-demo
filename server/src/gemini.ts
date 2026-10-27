import { GoogleGenAI } from '@google/genai';
import { config } from './config';
import { AIPlanResultSchema, type AIPlanResult, type CreatePlanInput } from './types';

const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

export async function generatePlan(input: CreatePlanInput): Promise<AIPlanResult> {
  const prompt = `You are a senior product and engineering advisor. A user has submitted an idea and needs an actionable project plan.

Idea Title: ${input.title}
Category: ${input.category}
Description: ${input.description}

Respond ONLY with a valid JSON object (no markdown fences, no commentary) matching this exact schema:
{
  "summary": "A clear 2-3 sentence overview of the idea and its value proposition.",
  "techStack": ["Technology 1", "Technology 2", "..."],
  "steps": [
    { "title": "Step title", "description": "What to do and why." },
    ...4 to 6 steps total...
  ],
  "difficulty": "Beginner" | "Intermediate" | "Advanced",
  "challenges": ["Challenge 1", "Challenge 2", "Challenge 3"]
}

Rules:
- techStack: 3–7 specific technologies, tools, or frameworks relevant to this idea.
- steps: exactly 4 to 6 concrete implementation steps.
- challenges: exactly 3 potential obstacles the team should anticipate.
- difficulty: assess based on the technical depth and scope of the idea.
- Be specific and actionable, not generic.
- Output ONLY the JSON object.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const text = response.text ?? '';

  // Strip accidental markdown fences if the model adds them
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Gemini returned non-JSON response: ${text.slice(0, 200)}`);
  }

  const validated = AIPlanResultSchema.safeParse(parsed);
  if (!validated.success) {
    throw new Error(`Gemini response failed validation: ${JSON.stringify(validated.error.issues)}`);
  }

  return validated.data;
}
