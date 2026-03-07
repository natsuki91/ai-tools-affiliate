-- Add one more comparison: Claude vs Jasper
-- Run in Supabase SQL Editor after 001_initial_schema.sql

INSERT INTO public.comparisons (slug, tool_a_id, tool_b_id, title, meta_desc, verdict) VALUES
  ('claude-vs-jasper', '11111111-1111-1111-1111-111111111102'::uuid, '11111111-1111-1111-1111-111111111103'::uuid, 'Claude vs Jasper: Which Is Better for Writing in 2026?', 'Compare Claude and Jasper for long-form writing, marketing copy, and brand content.', 'Claude for nuanced long-form; Jasper for marketing workflows and templates.')
ON CONFLICT (slug) DO NOTHING;
