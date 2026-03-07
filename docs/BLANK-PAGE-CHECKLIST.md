# Blank page — what to try

If https://toolscout.tools shows nothing, work through this in order.

---

## 1. Confirm where the domain points

**Open these URLs and note what happens:**

| URL | If it works | If it fails |
|-----|-------------|-------------|
| **https://toolscout.tools/test.html** | Server is serving files. Go to step 2. | Domain may not be pointing at your Node.js app. In Hostinger: connect toolscout.tools to the **Node.js Web App**, not a different website. |
| **https://toolscout.tools/api/health** | Node app is running. Go to step 2. | Node app may not be starting. Check deploy logs and Start command: `npm run start -- -p $PORT` |

- If **test.html** works but **/** (homepage) does not → the Next.js app is crashing or returning empty. Redeploy from GitHub and check deploy logs for build or runtime errors.
- If **api/health** works but **/** does not → same as above; focus on build/runtime logs.
- If **neither** works → the domain is likely not hitting your Node app. In hPanel, attach toolscout.tools to the correct Node.js app and ensure the app is deployed and running.

---

## 2. Hostinger checks

- **Start command:** `npm run start -- -p $PORT` (no typo, include `$PORT`).
- **Build:** Must finish without errors. If build fails, the app won’t run.
- **Env vars:** Not required for the site to load; missing Supabase vars only switch to mock data.
- **Force HTTPS:** Turn on for toolscout.tools so you always use https://.

---

## 3. Still nothing?

- Try another browser or an incognito/private window.
- In Hostinger, open the **Node.js app → Deploy / Logs** and check for errors during build or after start.
- If your plan doesn’t support Node.js (e.g. shared hosting only), the site can be built as **static HTML** and uploaded via FTP; ask for “static export” and we can add the config.
