# Static export — host without Node.js

The site is **currently configured for static export** (`output: "export"` in `next.config.mjs`). Each `npm run build` produces an **`out`** folder you can upload to any static host. No Node.js or server required. To use Node.js (e.g. `next start`) again later, remove the `output: "export"` line from `next.config.mjs` and rebuild.

---

## Build the static site

On your computer (with Node.js installed):

```bash
npm install
npm run build
```

This creates an **`out`** folder with the full site. The build uses mock data if Supabase env vars aren’t set; if you set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` before building, the exported HTML will use your Supabase data.

---

## Upload to Hostinger (or any static host)

1. Open the **`out`** folder after `npm run build`.
2. Upload **everything inside `out`** (all files and folders) to your web root:
   - **Hostinger:** Use **File Manager** in hPanel. Go to **public_html** (or the folder your domain uses). If your domain is currently pointed at a Node.js app, you may need to point it to “standard” or “public” hosting instead so the domain serves files from public_html. Then upload the contents of `out` so that `index.html` is at the root.
   - **Other hosts:** Upload to the document root (e.g. `public`, `www`, or the path your domain uses).

3. Make sure **index.html** (and the other `.html` files) are in the root of that folder, not inside an extra `out` folder.

4. Visit **https://toolscout.tools** — the site should load.

---

## What works / doesn’t with static export

| Works | Doesn’t work |
|-------|----------------|
| Homepage, /ai-tools, /ai-tools/compare, /tools, /blog, all tool and comparison pages | `/api/health`, `/api/sponsor` (no server) |
| Links, forms (submit goes to mailto or external URL) | Server-side sponsor form email (use a third-party form or mailto) |
| Supabase data baked in at **build time** | Live Supabase updates (you need to rebuild and re-upload to change content) |

---

## Updating the site

1. Change content or code locally.
2. Run `npm run build` again.
3. Re-upload the contents of **`out`** (replace the old files).

To pull in new data from Supabase, set the Supabase env vars, run `npm run build`, then upload again.
