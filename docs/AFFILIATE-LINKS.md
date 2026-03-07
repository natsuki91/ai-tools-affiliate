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

## 2. Config file (fallback)

When a tool has no `affiliate_url` in Supabase, the site looks up the URL in **`lib/affiliate.ts`**.

**How to add:**
1. Open **`lib/affiliate.ts`**
2. In the `AFFILIATE_URLS` object, add or edit entries. Use the **tool slug** as the key (e.g. `chatgpt`, `claude`, `copy-ai`).
3. For tools with a hyphen in the slug (e.g. `copy-ai`), add the same URL under the slug; the code maps it correctly.

Example:
```ts
const AFFILIATE_URLS: Record<string, string> = {
  chatgpt: "https://chat.openai.com/?ref=YOUR_ID",
  claude: "https://claude.ai/ref/YOUR_ID",
  jasper: "https://www.jasper.ai/?fp_ref=YOUR_ID",
  "copy-ai": "https://www.copy.ai/your-affiliate-link",
  // ...
};
```

All links get **UTM params** added automatically (`utm_source=ai-tools-affiliate`, `utm_medium=content`, `utm_campaign=slug`).

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
