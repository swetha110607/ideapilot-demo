-- ============================================================
-- IdeaPilot — Initial Schema Migration
-- ============================================================
-- DEMO NOTE: This application has no authentication.
-- All plans are shared demo data visible to everyone.
-- RLS is enabled but the policies permit public read/write
-- so that the demo works without user sessions.
-- In production, restrict policies to authenticated users.
--
-- All database access is performed server-side via the Express
-- backend using the Supabase service-role key. The service-role
-- key bypasses RLS; the anon key would be subject to the policies
-- below. Neither key is exposed to the browser.
-- ============================================================

-- Enable the uuid-ossp extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Table: plans
-- ============================================================
CREATE TABLE IF NOT EXISTS plans (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL CHECK (char_length(title) BETWEEN 3 AND 120),
  description TEXT        NOT NULL CHECK (char_length(description) BETWEEN 10 AND 2000),
  category    TEXT        NOT NULL CHECK (
                            category IN (
                              'Technology', 'Business', 'Education',
                              'Health', 'Entertainment', 'Social Impact',
                              'Finance', 'Other'
                            )
                          ),
  ai_result   JSONB       NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================

-- Speed up the default "recent plans" query
CREATE INDEX IF NOT EXISTS idx_plans_created_at
  ON plans (created_at DESC);

-- Allow fast filtering by category
CREATE INDEX IF NOT EXISTS idx_plans_category
  ON plans (category);

-- GIN index for full-text / containment queries on ai_result
CREATE INDEX IF NOT EXISTS idx_plans_ai_result_gin
  ON plans USING GIN (ai_result);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- DEMO POLICY: allow anyone to read all plans.
-- Replace with: USING (auth.uid() = user_id) once auth is added.
CREATE POLICY "demo_select_all_plans"
  ON plans FOR SELECT
  USING (true);

-- DEMO POLICY: allow anyone to insert plans.
-- Replace with: WITH CHECK (auth.uid() = user_id) once auth is added.
CREATE POLICY "demo_insert_plans"
  ON plans FOR INSERT
  WITH CHECK (true);

-- DEMO POLICY: allow anyone to delete plans.
-- Replace with per-user check once auth is added.
CREATE POLICY "demo_delete_plans"
  ON plans FOR DELETE
  USING (true);

-- ============================================================
-- Comments
-- ============================================================
COMMENT ON TABLE plans IS
  'Stores AI-generated project plans. Demo mode: all data is public.';

COMMENT ON COLUMN plans.ai_result IS
  'Structured JSON from Gemini: { summary, techStack, steps, difficulty, challenges }';

-- Grant service_role access (needed on new Supabase projects)
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
