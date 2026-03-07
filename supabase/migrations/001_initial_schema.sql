-- AI Tools Affiliate — initial schema
-- Run this in Supabase Dashboard → SQL Editor → New query, then paste and Run.

-- Tools table
CREATE TABLE IF NOT EXISTS public.tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text,
  description text,
  logo_url text,
  website_url text,
  affiliate_url text,
  category text[] DEFAULT '{}',
  pricing_type text NOT NULL DEFAULT 'paid' CHECK (pricing_type IN ('free', 'freemium', 'paid')),
  starting_price numeric,
  rating numeric(3,1),
  is_featured boolean DEFAULT false,
  is_sponsored boolean DEFAULT false,
  sponsored_tier text CHECK (sponsored_tier IN ('basic', 'pro', 'premium')),
  features jsonb DEFAULT '{}',
  pros text[] DEFAULT '{}',
  cons text[] DEFAULT '{}',
  best_for text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comparisons table
CREATE TABLE IF NOT EXISTS public.comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  tool_a_id uuid NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  tool_b_id uuid NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  title text NOT NULL,
  meta_desc text,
  verdict text,
  content text,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sponsored listings (for Stripe / paid placements)
CREATE TABLE IF NOT EXISTS public.sponsored_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  tier text NOT NULL CHECK (tier IN ('basic', 'pro', 'premium')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  stripe_id text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Blog views (optional analytics)
CREATE TABLE IF NOT EXISTS public.blog_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_is_featured ON public.tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_tools_category ON public.tools USING GIN(category);
CREATE INDEX IF NOT EXISTS idx_comparisons_slug ON public.comparisons(slug);

-- Seed data: tools (use these IDs for comparisons)
INSERT INTO public.tools (id, name, slug, tagline, description, website_url, category, pricing_type, starting_price, rating, is_featured, is_sponsored, sponsored_tier, pros, cons, best_for) VALUES
  ('11111111-1111-1111-1111-111111111101'::uuid, 'ChatGPT', 'chatgpt', 'AI assistant for conversation and tasks', 'OpenAI''s flagship conversational AI.', 'https://chat.openai.com', ARRAY['writing','productivity','coding'], 'freemium', 20, 9.2, true, false, null, ARRAY['Versatile','Strong reasoning','Plugins'], ARRAY['Rate limits on free tier'], ARRAY['General writing','Research','Coding help']),
  ('11111111-1111-1111-1111-111111111102'::uuid, 'Claude', 'claude', 'Long-form and nuanced AI', 'Anthropic''s AI for long-form and careful reasoning.', 'https://claude.ai', ARRAY['writing','productivity'], 'freemium', 20, 9.0, true, false, null, ARRAY['Long context','Nuanced writing','Strong safety'], ARRAY['Less ecosystem than ChatGPT'], ARRAY['Long-form content','Analysis','Editing']),
  ('11111111-1111-1111-1111-111111111103'::uuid, 'Jasper', 'jasper', 'AI marketing copy', 'Marketing-focused AI writing and campaigns.', 'https://www.jasper.ai', ARRAY['writing','marketing'], 'paid', 49, 8.5, true, true, 'pro', ARRAY['Templates','Brand voice','Integrations'], ARRAY['Higher price'], ARRAY['Marketing teams','Ads','Blogs']),
  ('11111111-1111-1111-1111-111111111104'::uuid, 'Copy.ai', 'copy-ai', 'Short-form copy at scale', 'Fast short-form and ad copy generation.', 'https://www.copy.ai', ARRAY['writing','marketing'], 'freemium', 0, 8.2, true, false, null, ARRAY['Free tier','Fast','Templates'], ARRAY['Less suited to long-form'], ARRAY['Ads','Social','Product copy']),
  ('11111111-1111-1111-1111-111111111105'::uuid, 'Writesonic', 'writesonic', 'SEO and blog-focused AI', 'AI writing with SEO and WordPress focus.', 'https://writesonic.com', ARRAY['writing','seo'], 'freemium', 19, 8.0, true, false, null, ARRAY['SEO tools','WordPress','Chatsonic'], ARRAY['Quality varies by template'], ARRAY['Bloggers','SEO content','Landing pages']),
  ('11111111-1111-1111-1111-111111111106'::uuid, 'Grammarly', 'grammarly', 'Writing clarity and tone', 'Grammar, clarity, and AI writing assistance.', 'https://www.grammarly.com', ARRAY['writing','productivity'], 'freemium', 12, 8.8, true, false, null, ARRAY['Everywhere you write','Tone detection','Plagiarism'], ARRAY['Premium for full AI'], ARRAY['Emails','Reports','Clarity'])
ON CONFLICT (id) DO NOTHING;

-- Seed data: comparisons
INSERT INTO public.comparisons (slug, tool_a_id, tool_b_id, title, meta_desc, verdict) VALUES
  ('chatgpt-vs-claude', '11111111-1111-1111-1111-111111111101'::uuid, '11111111-1111-1111-1111-111111111102'::uuid, 'ChatGPT vs Claude: Which Is Better in 2026?', 'Side-by-side comparison of ChatGPT and Claude. Pricing, features, and who each is best for.', 'ChatGPT leads on ecosystem; Claude leads on long-form nuance.'),
  ('chatgpt-vs-jasper', '11111111-1111-1111-1111-111111111101'::uuid, '11111111-1111-1111-1111-111111111103'::uuid, 'ChatGPT vs Jasper: Which Is Better for Marketing?', 'Compare ChatGPT and Jasper for marketing copy, ads, and brand content.', 'Jasper for marketing workflows; ChatGPT for versatility.'),
  ('best-ai-writing-tools', '11111111-1111-1111-1111-111111111101'::uuid, '11111111-1111-1111-1111-111111111102'::uuid, 'Best AI Writing Tools for 2026', 'Top AI writing tools compared: ChatGPT, Claude, Jasper, and more.', 'Depends on use case: writing, marketing, or coding.')
ON CONFLICT (slug) DO NOTHING;
