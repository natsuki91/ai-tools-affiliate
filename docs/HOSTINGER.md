# Deploying to Hostinger

You can host this Next.js site on **Hostinger** if you have one of these plans:

- **Business Web Hosting**
- **Cloud Startup**, **Cloud Professional**, **Cloud Enterprise**, or **Cloud Enterprise Plus**

(Node.js Web Apps are not available on single shared hosting — upgrade from hPanel if needed.)

---

## Option A: Node.js Web App (recommended)

Hostinger’s **Node.js Web Apps** support Next.js with GitHub or file upload.

### 1. Push your project to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-tools-affiliate.git
git push -u origin main
```

### 2. In Hostinger hPanel

1. Go to **Websites** → **Add Website**.
2. Choose **Node.js Apps** (or “Frontend web app”).
3. Select **Import Git Repository** and connect your GitHub account.
4. Pick the repo (e.g. `ai-tools-affiliate`).
5. **Build settings** (Hostinger often auto-detects Next.js):
   - **Install command:** `npm ci` or `npm install`
   - **Build command:** `npm run build`
   - **Start command:** `npm run start -- -p $PORT`  
     (or use `npm run start:hostinger` if you set that script)
6. Add **environment variables** in hPanel (Node.js app → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL` (when you use Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://toolscout.tools`
7. Click **Deploy**.

After the build finishes, the site will be live on the domain you attached to that website.

---

## Option B: Upload as ZIP

If you don’t use GitHub:

1. In your project folder run `npm run build` (so you know it builds).
2. Zip the project (include `node_modules` only if you prefer; otherwise use **Install command** `npm install` and don’t zip `node_modules`).
3. In hPanel: **Websites** → **Add Website** → **Node.js Apps** → **Upload your website files**.
4. Upload the ZIP and set the same **build** and **start** commands as above.
5. Add env vars in the Node.js app settings and deploy.

---

## Environment variables to set in Hostinger

| Variable | Description |
|--------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Full site URL, e.g. `https://toolscout.tools` (for SEO/canonical) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (when you connect Supabase) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

Never put secret keys (e.g. Supabase service role) in `NEXT_PUBLIC_*` — only in server-side env if Hostinger supports private env vars for Node.js apps.

---

## If you’re on shared hosting (no Node.js)

Standard shared hosting (no “Node.js” or “Business” plan) can’t run `next start`. You have two paths:

1. **Upgrade** to Business or Cloud so Node.js Web Apps are available (see above), or  
2. **Static export** — we can change the project to build a static site and you upload the generated files via FTP. That would mean no API routes and all comparison/tool/blog data baked in at build time (or loaded client-side from Supabase).

---

## VPS on Hostinger

If you have a **Hostinger VPS**, you can run Next.js yourself:

- Install Node.js (e.g. 20 LTS) and use **PM2** to run `npm run build` and `next start`.
- Put **Nginx** (or OpenLiteSpeed) in front as a reverse proxy and add SSL (e.g. Let’s Encrypt).

Detailed VPS steps: [Hostinger support – Node.js](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/) and their [Node.js VPS](https://www.hostinger.com/vps/nodejs-hosting) page.

---

## Quick checklist

- [ ] Plan is **Business** or **Cloud** (or you’re on VPS).
- [ ] Repo is on GitHub (or ZIP ready) and **Build** / **Start** commands set.
- [ ] **Start command** uses port: `npm run start -- -p $PORT` or `npm run start:hostinger`.
- [ ] Env vars set in hPanel (at least `NEXT_PUBLIC_SITE_URL`).
- [ ] After deploy, test homepage, `/compare`, `/tools`, `/blog`, and one tool/compare/blog slug.

If you tell me your exact Hostinger plan (e.g. “Business” or “Cloud Startup”), I can narrow this to the exact clicks and, if you want, adapt the app for static export for non-Node plans.
