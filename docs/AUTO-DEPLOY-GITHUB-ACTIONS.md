# Automatic deploy: push to GitHub → site updates

When you **push to the `main` branch**, GitHub runs a workflow that builds the site and uploads it to Hostinger. No manual build or File Manager upload.

---

## One-time setup (about 5 minutes)

### 1. Get your FTP details from Hostinger

1. Log in to **Hostinger** → **hPanel**.
2. Go to **Files** → **FTP Accounts** (or **Advanced** → **FTP Accounts**).
3. You’ll see:
   - **FTP hostname** or **FTP server** (e.g. `ftp.toolscout.tools` or a Hostinger hostname)
   - **FTP IP address** (a number like `123.45.67.89`) ← **use this for FTP_SERVER if the hostname fails**
   - **Username** (e.g. `u595380008` or `u595380008@toolscout.tools`)
   - **Password** (the one you set for this FTP account)

**Important:** If the GitHub Action fails with **“server doesn't seem to exist”** or **ENOTFOUND**, edit your **FTP_SERVER** secret and set it to your **FTP IP address** (the number shown in FTP Accounts). That avoids DNS and works from GitHub’s servers.

### 2. Add secrets to your GitHub repo

1. Open your repo: **https://github.com/natsuki91/ai-tools-affiliate**
2. Click **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret** and add these **three** secrets:

| Name            | Value                          |
|-----------------|---------------------------------|
| `FTP_SERVER`    | FTP hostname **or** FTP IP address (no ftp://, no spaces) |
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

The build includes **`public/.htaccess`**, which is copied to the server so that Apache serves the right pages: links like `/ai-tools`, `/ai-tools/blog`, `/compare/chatgpt-vs-claude` work instead of 403 Forbidden or 404.

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

## "The server doesn't seem to exist" / ENOTFOUND

The workflow can’t resolve your **FTP_SERVER** hostname. Fix it:

1. In **Hostinger** → **Files** → **FTP Accounts**, find the **FTP IP address** (a number like `123.45.67.89`).
2. In **GitHub** → repo **Settings** → **Secrets and variables** → **Actions**, click **FTP_SERVER** → **Update**.
3. Set the value to **that IP address** (nothing else, no `ftp://`, no port).
4. Save, then go to **Actions** → open the failed run → **Re-run all jobs**.

If it still fails, your host may allow only **SFTP** (not FTP). In that case we’d switch the workflow to an SFTP/SSH deploy; say so and we’ll add it.

---

## Check that it ran

1. On GitHub open your repo → **Actions**.
2. You should see **Deploy to Hostinger** (or the workflow name).
3. Click the latest run to see the log. If it’s green, the deploy worked. If it’s red, open the log and fix the step that failed (often FTP_SERVER, FTP_USERNAME, or FTP_PASSWORD).

---

## CSS / styles not loading after deploy

If the site loads but looks unstyled (no CSS):

1. **Confirm the build has the assets**  
   In the same Actions run, open the **“Verify build output (assets + fallback CSS)”** step. You should see `out/styles.css` and `out/_next/static/` with `.css` files. If that step fails, the problem is the build/postbuild.

2. **Confirm the files are on the server**  
   In **Hostinger** → **Files** → **File Manager** → open **public_html**:
   - There should be **styles.css** at the root (fallback so the site always has CSS).
   - There should be a folder **_next** → **static** → **css** (and **chunks**), with `.css` and `.js` files.
   - If both are missing, the FTP upload didn’t put the built files there; we may need to change how we upload or deploy without “clean slate”.

3. **If the files are there but CSS still doesn’t load**  
   Check the browser’s Network tab (F12) for the CSS request (`/styles.css` or `/_next/static/css/...`). If it’s 404, the path may not match. If it’s 200 but the content is wrong, try a hard refresh or another device.

4. **If “nothing changed” after deploy**  
   - The layout now includes **inline critical CSS** (dark background, light text) so the page is never completely blank even if external CSS fails.  
   - The workflow uses **server-dir: public_html** by default (no leading slash). If your Hostinger FTP user’s home is already `public_html`, add a secret **FTP_SERVER_DIR** with value **`.`** (or **`/`**) so files go to the right place.  
   - In **File Manager**, confirm that **public_html** contains **index.html**, **styles.css**, and **_next** after a deploy. If not, the upload path may be wrong (try **FTP_SERVER_DIR** = **`/public_html/`** with a leading slash).

---

## Summary

- **One-time:** Add **FTP_SERVER**, **FTP_USERNAME**, **FTP_PASSWORD** in GitHub repo **Settings** → **Secrets and variables** → **Actions**.
- **Every time:** Push to **main** → site updates automatically in a few minutes.
