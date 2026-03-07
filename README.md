# AI Tools — Comparison & Affiliate Site

Next.js 14 site for comparing AI tools, publishing reviews, and monetizing via affiliate links and sponsored listings.

**Live:** [https://toolscout.tools](https://toolscout.tools)

## Stack

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Supabase** — tools, comparisons, sponsored listings
- **Resend** — sponsor inquiry emails (optional)
- **Hostinger** — Node.js Web Apps deployment

## Quick start

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local: add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Env vars

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (for DB) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (for DB) | Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL (SEO, sitemap) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4 ID (e.g. G-XXXXXXXXXX) |
| `RESEND_API_KEY` | No | Resend API key (sponsor form emails) |
| `SPONSOR_INQUIRY_EMAIL` | No | Where to send sponsor inquiries |
| `SPONSOR_FROM_EMAIL` | No | From address (default: onboarding@resend.dev) |

Without Supabase vars, the site uses mock data. Without Resend vars, the sponsor form still returns success but does not send email.

## Deploy (Hostinger)

1. Push to GitHub.
2. Hostinger → Websites → Add Website → Node.js Apps → Import Git Repository.
3. Build: `npm run build`, Start: `npm run start -- -p $PORT`.
4. Add env vars in the Node.js app settings, then Deploy.

See [docs/HOSTINGER.md](docs/HOSTINGER.md) and [docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md).

## Static export (no Node.js)

If Node.js hosting isn’t working, you can build a **static site** and upload it to any web host (including Hostinger’s regular file hosting):

```bash
npm run build
```

Then upload the contents of the **`out`** folder to your web root (e.g. Hostinger File Manager → public_html). See [docs/STATIC-EXPORT.md](docs/STATIC-EXPORT.md).

## Project layout

- `app/` — routes (home, compare, tools, blog, sponsor, disclosure, etc.)
- `components/` — UI, layout, homepage, compare, tools, blog, shared
- `content/blog/` — markdown blog posts
- `lib/` — data layer, Supabase, affiliate config, utils
- `types/` — TypeScript types
- `supabase/migrations/` — SQL schema and seed

## Adding content

- **Blog:** Add a `.md` file in `content/blog/` with frontmatter, then add an entry to `mockBlogPosts` in `lib/mock-data.ts`.
- **Tools / comparisons:** Supabase Table Editor, or run SQL from `supabase/migrations/`.
- **Affiliate URLs:** Supabase `tools.affiliate_url` or `lib/affiliate.ts`. See [docs/AFFILIATE-LINKS.md](docs/AFFILIATE-LINKS.md).

## Scripts

- `npm run dev` — local dev
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — ESLint
