# What’s next — plan after launch

Site is live at **https://toolscout.tools** (and **https://www.toolscout.tools**). Sitemap and canonical URLs use **https://toolscout.tools**. Here’s the suggested order for what to do next.

---

## 1. Affiliate links (monetization)

Turn “Try X Free” buttons into earning links.

- **Option A — Supabase:**  
  Supabase Dashboard → **Table Editor** → **tools** → edit each row → set **affiliate_url** to your partner link.  
  Best for tools you already have in the DB; you can change links without redeploying.

- **Option B — Config:**  
  Edit **`lib/affiliate.ts`** → in `AFFILIATE_URLS`, replace placeholder URLs with your real affiliate links (use tool slug as key, e.g. `chatgpt`, `claude`, `jasper`).  
  Then run `npm run build` and upload the **contents of out** to **public_html** (see [SIMPLE-DEPLOY-NO-GIT.md](SIMPLE-DEPLOY-NO-GIT.md)).

Details and program links: [AFFILIATE-LINKS.md](AFFILIATE-LINKS.md).

---

## 2. Google Analytics (GA4) ✓

See traffic and behavior.

- Create a GA4 property and get your **Measurement ID** (e.g. `G-XXXXXXXXXX`).
- For **Deploy from Git:** set **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** in Hostinger’s build/deploy environment variables, then redeploy.
- **Step-by-step:** [GA4-SETUP.md](GA4-SETUP.md).

---

## 3. Optional: more content

- **Blog:** Add `.md` files in **`content/blog/`** and entries in **`mockBlogPosts`** in `lib/mock-data.ts`, then rebuild and re-upload.
- **Tools / comparisons:** Add or edit rows in Supabase (tools, comparisons tables), then rebuild so the static export includes the new data.

---

## 4. Optional: second niche (multi-niche)

The hub already has placeholders for Web Hosting, VPN, eCommerce, etc. To activate another niche later:

- Set that niche to `active: true` in **`lib/niches.ts`**.
- Add content (tools, comparisons, blog) for that niche (DB or mock data).
- Rebuild and re-upload.

---

## Quick checklist

- [x] Site live at toolscout.tools (static files in public_html; simple deploy — [SIMPLE-DEPLOY-NO-GIT.md](SIMPLE-DEPLOY-NO-GIT.md))
- [x] Hostinger + Shopify affiliate links (footer)
- [x] GA4 set up — [GA4-SETUP.md](GA4-SETUP.md)
- [ ] Add AI tool affiliate URLs when approved: set as **GitHub repo secrets** (e.g. `AFFILIATE_URL_JASPER`, `AFFILIATE_URL_COPY_AI`) for auto-deploy, or use `.env.local` for local build / Supabase for DB tools — [AFFILIATE-LINKS.md](AFFILIATE-LINKS.md)
- [ ] Add more blog posts or tools as you go _(16 posts, 5 comparisons; e.g. How to Choose AI Tool 2026, ChatGPT vs Perplexity)_
- [ ] (Later) Activate a second niche if you want to expand

---

## Optional improvements (from site audit)

- **Search bar** on homepage — search tools, comparisons, blog (e.g. Algolia or client-side over static data).
- **“Recently Added” tools** — section on AI Tools homepage showing 3–4 newest tools with a “NEW” badge.
- **More tools** — expand from 6 to 30+ (writing, image, coding, productivity, video) in mock data or Supabase. _(15 tools now: e.g. Cursor, Otter.ai, Perplexity)_
- **“Alternatives to X” pages** — e.g. `/ai-tools/alternatives/chatgpt` for SEO.
- **Exit-intent popup** — newsletter signup when user moves to close tab (once per session).
- **Cookie “Manage preferences”** — optional third button for granular consent. ✓ (Analytics On/Off + Save)
- **SEO** — JSON-LD on tool/compare pages, `og:image` per page, ensure sitemap has all URLs. For default social previews, add **public/og-default.png** (1200×630).
- **Newsletter on static host** — `/api/newsletter` doesn’t run on static Hostinger; use a form service (Mailchimp, ConvertKit) or host API elsewhere and point the form there.
