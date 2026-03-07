# Multi-Niche Comparison Website — Cursor System Prompt (Phase 2)

**This is the expansion spec.** The current site is single-niche (AI tools, flat routes). When ready to become a hub for multiple niches, follow this.

---

## Structure

- **Hub & spoke:** one domain, `yoursite.com/[niche]/...`
- **Niches:** AI Tools (`/ai-tools/`), Web Hosting (`/web-hosting/`), VPN (`/vpn/`), eCommerce Tools (`/ecommerce-tools/`), Marketing Tools (`/marketing-tools/`), Online Courses (`/online-courses/`)
- **Per niche:** Niche homepage, Compare, Tools, Blog, Category pages
- **Main homepage:** Niche grid, featured tools across niches, popular comparisons, latest blog

---

## URL pattern

- `/` → Hub homepage
- `/[niche]` → Niche homepage (e.g. `/ai-tools`)
- `/[niche]/compare`, `/[niche]/compare/[slug]`
- `/[niche]/tools`, `/[niche]/tools/[slug]`
- `/[niche]/blog`, `/[niche]/blog/[slug]`
- `/[niche]/category/[slug]`
- `/sponsor`, `/about`, `/contact` (global)

---

## Database (Supabase) additions

- **niches** table (slug, name, tagline, icon, color, etc.)
- **tools** gets `niche_id` (FK to niches)
- **comparisons** gets `niche_id`
- **categories** table (per niche)
- **blog_posts** gets `niche_id` (or stay file-based per niche)

---

## Config

- `/config/niches.config.ts` or `lib/niches.ts` — NICHES constant with slug, name, icon, color, topCategories, affiliatePrograms per niche
- Affiliate config expanded per niche (see spec)
- SEO: per-niche keywords and structured data

---

## Design

- Global dark theme; per-niche **accent color** (AI Tools: indigo, Web Hosting: sky, VPN: emerald, etc.) for hero, CTAs, active nav
- Niche nav on all niche pages: Overview | Tools | Compare | Blog | Categories
- Breadcrumbs: Home > Niche > Section > Page
- Header: logo, niche dropdown, search, “List Your Tool”

---

## Golden rules (from spec)

1. SEO first — every page targets a keyword  
2. Conversion second — every page has a CTA  
3. Honesty always — pros AND cons  
4. Disclose always — affiliate + sponsored  
5. Niche consistency — accent color + config on all niche pages  
6. Mobile first  
7. Speed always  
8. Internal linking — min 3 per page  
9. Update regularly — [Updated: Month Year]  
10. Build one niche fully first (AI Tools), then clone for others  
11. Never hardcode — use config for niches, affiliates, SEO  
12. Simplicity — max 3 clicks to find anything  

---

Full original spec is in the cursorrules (1) file. Use this doc when implementing multi-niche or when the user asks to “expand” or “add another niche.”
