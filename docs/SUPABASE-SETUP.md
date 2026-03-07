# Supabase Setup

Connect your AI tools site to Supabase so tools and comparisons are stored in the database. Until these env vars are set, the site uses **mock data** (no Supabase required for local or Hostinger).

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New project**.
3. Choose your org, set a **Project name** and **Database password** (save the password).
4. Pick a region and click **Create new project**. Wait for the project to be ready.

---

## 2. Run the schema and seed data

1. In the Supabase Dashboard, open your project.
2. Go to **SQL Editor** → **New query**.
3. Open the file **`supabase/migrations/001_initial_schema.sql`** in this repo and copy its full contents.
4. Paste into the SQL Editor and click **Run**.
5. You should see “Success” and the tables **tools** and **comparisons** (and **sponsored_listings**, **blog_views**) with seed rows.

---

## 3. Get your API keys

1. In Supabase: **Project Settings** (gear icon) → **API**.
2. Copy:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon public** key (under “Project API keys”).

---

## 4. Add environment variables

### Local (Cursor / your machine)

1. In the project root, copy the example env file:
   ```bash
   copy .env.local.example .env.local
   ```
   (On Mac/Linux: `cp .env.local.example .env.local`.)
2. Open **`.env.local`** and set:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon public key
3. Restart the dev server (`npm run dev`). The site will now load tools and comparisons from Supabase.

### Hostinger

1. In hPanel, open your **Node.js app** (the ai-tools-affiliate site).
2. Go to **Environment variables** (or **Settings** → **Env**).
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon public key
4. Save and **redeploy** the app.

---

## 5. Verify

- **Local:** Open [http://localhost:3000](http://localhost:3000). Homepage, Compare, and Tools should show the same 6 tools and 3 comparisons as before (now from Supabase).
- **Hostinger:** After redeploy, check your live URL. Same data should appear.

---

## Adding and editing data

- **Supabase Dashboard** → **Table Editor** → open **tools** or **comparisons** to add/edit/delete rows.
- New tools: add a row with at least `name`, `slug`, `pricing_type`. Use existing slugs (e.g. `chatgpt`, `claude`) as a reference.
- New comparisons: add a row with `slug`, `tool_a_id`, `tool_b_id`, `title` (use the UUIDs from the **tools** table for `tool_a_id` and `tool_b_id`).

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Site still shows mock data | Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set and the app was restarted/redeployed. |
| “Failed to fetch” or empty lists | Check Supabase Dashboard → Table Editor: do **tools** and **comparisons** have rows? Re-run the seed part of `001_initial_schema.sql` if needed. |
| RLS errors | The schema does not enable RLS by default. If you enabled it, add policies that allow `anon` to `SELECT` from **tools** and **comparisons**. |

Once this is done, the site runs on Supabase in both local and production.
