# What’s next — plan after launch

Site is live at **https://www.toolscout.tools**. Here’s the suggested order for what to do next.

---

## 1. Affiliate links (monetization)

Turn “Try X Free” buttons into earning links.

- **Option A — Supabase:**  
  Supabase Dashboard → **Table Editor** → **tools** → edit each row → set **affiliate_url** to your partner link.  
  Best for tools you already have in the DB; you can change links without redeploying.

- **Option B — Config:**  
  Edit **`lib/affiliate.ts`** → in `AFFILIATE_URLS`, replace placeholder URLs with your real affiliate links (use tool slug as key, e.g. `chatgpt`, `claude`, `jasper`).  
  Then run `npm run build` and re-upload the **out** folder.

Details and program links: [AFFILIATE-LINKS.md](AFFILIATE-LINKS.md).

---

## 2. Google Analytics (GA4)

See traffic and behavior.

1. Create a GA4 property and get your **Measurement ID** (e.g. `G-XXXXXXXXXX`).
2. For **static export:** you’d need to add the gtag script to the built HTML or switch to a host that runs Node so the existing `GoogleAnalytics` component works.  
   For now the component is in the app; when you have a Measurement ID, set **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** in `.env.local` before building (or in Hostinger env if you ever use Node again).

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

- [ ] Add real affiliate URLs (Supabase and/or `lib/affiliate.ts`)
- [ ] Add GA4 when ready (or when you have a way to inject the script in static build)
- [ ] Add more blog posts or tools as you go
- [ ] (Later) Activate a second niche if you want to expand
