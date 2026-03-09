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

## 4. Second niche (multi-niche) ✓

**Web Hosting** is live: `/web-hosting`, hosting tools (Hostinger, Bluehost, SiteGround, A2), and comparison (Hostinger vs Bluehost). To add more niches (VPN, eCommerce, etc.) later:

- Set that niche to `active: true` in **`lib/niches.ts`**.
- Add content (tools, comparisons, blog) for that niche in **`lib/mock-data.ts`** (or DB).
- Rebuild and re-upload.

---

## Quick checklist

- [x] Site live at toolscout.tools (static files in public_html; simple deploy — [SIMPLE-DEPLOY-NO-GIT.md](SIMPLE-DEPLOY-NO-GIT.md))
- [x] Hostinger + Shopify affiliate links (footer)
- [x] GA4 set up — [GA4-SETUP.md](GA4-SETUP.md)
- [ ] Add AI tool affiliate URLs when approved — [AFFILIATE-LINKS.md](AFFILIATE-LINKS.md) (leave until programs accept)
- [x] Add more blog posts or tools — 3 more AI tools (Canva, Descript, Loom), 2 more blog posts; 10 comparisons total
- [x] Activate a second niche — Web Hosting live (Hostinger, Bluehost, SiteGround, A2 + 3 comparisons)

---

## Optional improvements (from site audit)

- **Search bar** on homepage — search tools, comparisons, blog (e.g. Algolia or client-side over static data).
- **“Recently Added” tools** — section on AI Tools homepage showing 3–4 newest tools with a “NEW” badge.
- **More tools** — expand further in mock data or Supabase. _(24+ AI tools + 6 hosting + VPN tools now; e.g. Canva, Descript, Loom, NordVPN, NordPass)_
- **“Alternatives to X” pages** — e.g. `/ai-tools/alternatives/chatgpt` for SEO. ✓ (in place)
- **Exit-intent popup** — newsletter signup when user moves to close tab (once per session).
- **Cookie “Manage preferences”** — optional third button for granular consent. ✓ (Analytics On/Off + Save)
- **SEO** — JSON-LD on tool/compare pages, `og:image` per page. ✓ Default **public/og-default.png** (1200×630) added; layout and buildSEOMeta use it.
- **Newsletter on static host** — ✓ Form supports **NEXT_PUBLIC_NEWSLETTER_FORM_ACTION** (Mailchimp/ConvertKit signup URL); when set, form posts there instead of `/api/newsletter`.
- **VPN & password manager affiliates** — ✓ NordVPN + NordPass wired via `lib/affiliate.ts`; tools added for future VPN niche.
