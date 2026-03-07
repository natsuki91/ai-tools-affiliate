# Affiliate Links Setup

Your site uses affiliate links in two places. You can use either or both.

---

## 1. Supabase (recommended)

Each tool has an **`affiliate_url`** column. When you set it, all “Try [Tool] Free” buttons for that tool use your link (with UTM params added automatically).

**How to add:**
1. Supabase Dashboard → **Table Editor** → **tools**
2. Open a row (e.g. ChatGPT)
3. Paste your affiliate URL into **affiliate_url**
4. Save

The site will use this URL on tool cards, tool review pages, and comparison pages. Leave it empty to fall back to the config file below.

---

## 2. Config file and env (AI tools)

When a tool has no `affiliate_url` in Supabase, the site looks up the URL in **`lib/affiliate.ts`**.

**Preferred: use .env.local (keeps links out of the repo)**  
Add optional vars to **`.env.local`** (see `.env.local.example`). At build time these override the defaults:

- `AFFILIATE_URL_CHATGPT`
- `AFFILIATE_URL_CLAUDE`
- `AFFILIATE_URL_JASPER`
- `AFFILIATE_URL_COPY_AI`
- `AFFILIATE_URL_WRITESONIC`
- `AFFILIATE_URL_GRAMMARLY`
- `AFFILIATE_URL_NOTION`

Example:
```bash
AFFILIATE_URL_JASPER=https://www.jasper.ai/?fp_ref=YOUR_ID
AFFILIATE_URL_COPY_AI=https://www.copy.ai/your-affiliate-link
```

**Alternatively:** edit **`lib/affiliate.ts`** and change the defaults in `DEFAULT_AFFILIATE_URLS` for each tool. Rebuild and re-upload after changes.

All links get **UTM params** added automatically (`utm_source=toolscout`, `utm_medium=content`, `utm_campaign=slug`).

---

## Where to get affiliate links

| Tool       | Typical program / where to get a link |
|-----------|----------------------------------------|
| ChatGPT   | OpenAI doesn’t have a public affiliate program; use the standard signup URL or any partner link you have. |
| Claude    | [Anthropic Partners](https://www.anthropic.com/partners) (apply for partner/affiliate). |
| Jasper    | [Jasper Affiliate](https://www.jasper.ai/affiliate) or partner dashboard. |
| Copy.ai   | [Copy.ai Affiliate](https://www.copy.ai/affiliate) or partner program. |
| Writesonic| [Writesonic Affiliate](https://writesonic.com/affiliate). |
| Grammarly | [Grammarly Partner](https://www.grammarly.com/partners) / affiliate program. |
| Notion    | [Notion Affiliates](https://www.notion.so/affiliates). |

Replace placeholder URLs in `lib/affiliate.ts` with your actual affiliate links when you’re approved. Use **Supabase** for tools you manage in the database so you can change links without redeploying.

---

## 3. Partner affiliates (Hostinger, Shopify)

Hostinger and Shopify are in **`lib/affiliate.ts`** under the keys **`hostinger`** and **`shopify`**. They appear in the footer under **Recommended** (Web hosting, E‑commerce).

**How to add your links:**
1. Open **`lib/affiliate.ts`**.
2. Replace the placeholder URLs for `hostinger` and `shopify` with your **actual affiliate links** from the Hostinger and Shopify partner dashboards.
3. Rebuild (`npm run build`) and re-upload the **out** folder so the live site uses your links.

| Partner   | Where to get your link |
|-----------|-------------------------|
| Hostinger | [Hostinger Affiliate](https://www.hostinger.com/affiliate-program) or your partner dashboard. |
| Shopify   | [Shopify Partners](https://www.shopify.com/partners) — get your referral link from the dashboard. |
