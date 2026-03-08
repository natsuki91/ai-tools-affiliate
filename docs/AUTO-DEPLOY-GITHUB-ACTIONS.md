# Automatic deploy: push to GitHub → site updates

When you **push to the `main` branch**, GitHub runs a workflow that builds the site and uploads it to Hostinger. No manual build or File Manager upload.

---

## One-time setup (about 5 minutes)

### 1. Get your FTP details from Hostinger

1. Log in to **Hostinger** → **hPanel**.
2. Go to **Files** → **FTP Accounts** (or **Advanced** → **FTP Accounts**).
3. You’ll see:
   - **FTP hostname** (e.g. `ftp.toolscout.tools` or `something.hostingersite.com`)
   - **Username** (e.g. `u595380008` or `u595380008@toolscout.tools`)
   - **Password** (the one you set for this FTP account; if you forgot it, create a new FTP user and use that password)

Write these down (or keep the tab open). You’ll add them as **GitHub secrets** in the next step.

### 2. Add secrets to your GitHub repo

1. Open your repo: **https://github.com/natsuki91/ai-tools-affiliate**
2. Click **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret** and add these **three** secrets:

| Name            | Value                          |
|-----------------|---------------------------------|
| `FTP_SERVER`    | Your FTP hostname (no ftp://)   |
| `FTP_USERNAME`  | Your FTP username               |
| `FTP_PASSWORD`  | Your FTP password               |

4. Save each one. Do **not** share these or commit them to the repo.

### 3. Push the workflow to GitHub

The workflow file is already in the repo (`.github/workflows/deploy-hostinger.yml`). If you just pulled or we pushed it, you’re done. If not, push your latest code so that the workflow file is on GitHub.

---

## How it works from now on

1. You (or we) change the site and **push to `main`** (e.g. `git push origin main`).
2. GitHub **runs the workflow**: installs dependencies → `npm run build` → uploads the **out** folder to Hostinger **public_html** (and clears old files there).
3. In 2–5 minutes, **https://toolscout.tools** is updated.

No need to run `npm run build` on your PC or use File Manager to upload.

---

## If your Hostinger path is not `public_html`

By default the workflow uploads to **/public_html/**. If your site is in a different folder (e.g. a subdomain path):

1. In the repo go to **Settings** → **Secrets and variables** → **Actions**.
2. Add a secret **`FTP_SERVER_DIR`** with value like **/domains/toolscout.tools/public_html/** (must end with `/`).
3. In **.github/workflows/deploy-hostinger.yml**, change the line:
   - from: `server-dir: /public_html/`
   - to: `server-dir: ${{ secrets.FTP_SERVER_DIR }}`

Then push. Most Hostinger accounts use **/public_html/** so you usually don’t need this.

---

## Check that it ran

1. On GitHub open your repo → **Actions**.
2. You should see **Deploy to Hostinger** (or the workflow name).
3. Click the latest run to see the log. If it’s green, the deploy worked. If it’s red, open the log and fix the step that failed (often FTP_SERVER, FTP_USERNAME, or FTP_PASSWORD).

---

## Summary

- **One-time:** Add **FTP_SERVER**, **FTP_USERNAME**, **FTP_PASSWORD** in GitHub repo **Settings** → **Secrets and variables** → **Actions**.
- **Every time:** Push to **main** → site updates automatically in a few minutes.
