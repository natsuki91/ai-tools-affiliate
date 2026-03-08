# Step-by-step: Build and upload Tool Scout (static site) to Hostinger

This guide gets **https://toolscout.tools** live by building the site on your computer and uploading the files to Hostinger. No Node.js app is used — only normal web hosting and File Manager.

---

## Part 1 — Build the site on your computer

### Step 1.1 — Open the project folder

1. On your PC, go to the folder where the project lives (e.g. **Desktop → affiliate website**).
2. You should see folders like **app**, **components**, **lib**, and files like **package.json**, **next.config.mjs**.

### Step 1.2 — Open Terminal / PowerShell in that folder

1. In File Explorer, click the address bar at the top (where it shows the path).
2. Type **powershell** and press **Enter**.  
   A PowerShell window opens with that folder as the current location.  
   *Or:* open **PowerShell** (or **Command Prompt**) yourself, then run:
   ```powershell
   cd "C:\Users\Natsuki\Desktop\affiliate website"
   ```
   (Change the path if your project is somewhere else.)

### Step 1.3 — Install dependencies

In the same terminal, run:

```powershell
npm install
```

Wait until it finishes (no red errors). You only need to do this once, or when dependencies change.

### Step 1.4 — (Optional) Use your real data when building

If you want the built site to use your **Supabase** tools and comparisons:

1. Copy the file **`.env.local.example`** and rename the copy to **`.env.local`** (in the same folder).
2. Open **`.env.local`** in a text editor.
3. Set these two (use your real values from Supabase Dashboard → Project Settings → API):
   - **NEXT_PUBLIC_SUPABASE_URL** = `https://ukprumkkakqjpkymyyxl.supabase.co`
   - **NEXT_PUBLIC_SUPABASE_ANON_KEY** = your anon key (long string starting with `eyJ...`)
4. Save the file.

If you skip this, the site will still build and work, but it will use built-in mock data.

### Step 1.5 — Build the static site

In the same terminal, run:

```powershell
npm run build
```

Wait until you see **“Generating static pages”** and then **“✓ Generating static pages”** and the build finishes (about 1–2 minutes). There should be no red errors.

### Step 1.6 — Find the built site (the `out` folder)

1. In the project folder (e.g. **Desktop → affiliate website**), open the **out** folder.
2. Inside **out** you should see:
   - **index.html** (the homepage)
   - Other **.html** files (about.html, blog.html, compare.html, etc.)
   - Folders: **_next** (CSS/JS assets), **ai-tools**, **blog**, **compare**, **tools**, **category**, etc.
3. You will upload **everything that is inside `out`** (all files and folders), not the **out** folder itself.

**Optional — Zip for easier upload:**  
Right‑click the **out** folder → **Send to** → **Compressed (zipped) folder**. You’ll get **out.zip**. On Hostinger you can upload this zip and then **Extract** it (see Part 2). After extracting, the contents of **out** must be in the **root** of your web folder (so **index.html** is next to **public_html**’s content, not inside another “out” folder).

---

## Part 2 — Upload to Hostinger

### Step 2.1 — Log in to Hostinger

1. Go to **https://www.hostinger.com** and sign in.
2. Open **hPanel** (your hosting control panel).

### Step 2.2 — Open File Manager

1. In hPanel, find **Files** or **File Manager** (or **Advanced** → **File Manager**).
2. Click **File Manager** to open it.

### Step 2.3 — Go to the folder where your domain is served from

1. In File Manager you’ll see a folder tree on the left.
2. Click **public_html** (this is usually the root folder for your main domain).  
   - If **toolscout.tools** is set as the main domain for this hosting account, **public_html** is the right place.  
   - If you have multiple domains, check which folder is assigned to **toolscout.tools** (in **Domains** or **Websites** in hPanel) and open that folder instead.
3. You should now be *inside* that folder (e.g. **public_html**). All uploaded site files will go **here**, so that **index.html** is directly in this folder.

### Step 2.4 — (Optional) Clear old site files

If there are already files from an old site or a Node.js app:

1. Select the files and folders you want to remove (avoid deleting **.htaccess** if you need it for redirects; you can leave it and overwrite with the new site).
2. Use **Delete** or **Remove** in the File Manager.
3. Keep the folder itself (e.g. **public_html**) empty or with only the files you want to keep.

### Step 2.5 — Upload the contents of the `out` folder

**Option A — Upload a zip (often easiest)**

1. In File Manager, click **Upload** (or **Upload files**).
2. Choose the **out.zip** you created (or create it from the **out** folder as in Step 1.6).
3. Wait until the upload finishes.
4. In the file list, find **out.zip**, right‑click it → **Extract** (or use an **Extract** button).
5. Extract **into the current folder** (e.g. **public_html**), so that after extraction you see **index.html**, **_next**, **ai-tools**, **blog**, etc. **directly** in **public_html**, not inside an **out** folder.
6. If extraction created a folder named **out** and put everything inside it: open **out**, select **all** files and folders inside it, **Cut** (or Move), go back to **public_html**, and **Paste**. Then delete the empty **out** folder.
7. Delete **out.zip** if you don’t need it.

**Option B — Upload files and folders directly**

1. On your PC, open the **out** folder so you see **index.html**, **_next**, **ai-tools**, **blog**, **compare**, **tools**, **category**, etc.
2. In File Manager, click **Upload**.
3. Drag and drop **all** of these items from **out** into the upload area (or select them all and upload). You may need to upload folders one by one; some File Managers let you select a folder.
4. Ensure that when you’re done, **index.html** and the **_next**, **ai-tools**, **blog**, **compare**, **tools**, **category** folders are **directly** in **public_html** (or the root folder you chose in Step 2.3), not inside an extra **out** folder.

### Step 2.6 — Check the structure

In File Manager, inside **public_html** (or your domain’s root folder), you should see at least:

- **index.html**
- **_next** (folder — contains CSS and JS; must be deployed)
- **ai-tools** (folder)
- **blog** (folder)
- **compare** (folder)
- **tools** (folder)
- **category** (folder)
- Other **.html** files (about.html, blog.html, compare.html, etc.)

If **index.html** is missing or everything is inside an **out** folder, fix it as in Step 2.5 (move contents to root, delete the extra **out** folder).

---

## Troubleshooting — Site not working

**If https://toolscout.tools shows a blank page, “Index of /”, or 404:**

1. **Check the web root**
   - In Hostinger **File Manager**, open the folder that your domain uses (e.g. **public_html**). You must see **index.html**, **.htaccess**, and the **_next** folder **directly** there. If they’re inside another folder (e.g. **out**), move everything from that folder into **public_html** and delete the empty folder.

2. **If you deploy via GitHub Actions (FTP)**
   - In the repo: **Settings → Secrets and variables → Actions**. Add (or fix) **FTP_SERVER_DIR** and set it to the folder that serves the site, e.g. **`public_html/`** (with a trailing slash). On Hostinger, FTP often starts in your account root; the site is usually served from **public_html**, so the secret must be **public_html/** so files land in the right place. Re-run the workflow after saving the secret.

3. **Try opening the homepage file directly**
   - Visit **https://toolscout.tools/index.html**. If that loads but **https://toolscout.tools** does not, the server may not be set to use **index.html** as the default. Ensure **.htaccess** is in the same folder as **index.html** (it contains `DirectoryIndex index.html`). If your host doesn’t allow .htaccess, set the default document to **index.html** in hPanel (e.g. **Advanced → Default document**).

4. **Blank page but index.html exists**
   - Open the site, press **F12** (Developer Tools) → **Console**. If you see 404 errors for **/_next/static/...** or **/styles.css**, the server isn’t serving those files. Check that the **_next** folder and **styles.css** were uploaded and are in the same folder as **index.html**. Some hosts hide folders whose names start with `_`; if that’s the case, contact Hostinger support or use a subfolder without a leading underscore (would require a custom build step).

5. **404 on pages like /ai-tools or /blog**
   - Clean URLs depend on **.htaccess** rewrite rules. Confirm **.htaccess** is in the web root and that your host allows overrides (Hostinger usually does for **public_html**). If **https://toolscout.tools/ai-tools.html** works but **https://toolscout.tools/ai-tools** does not, the rewrites aren’t applied—fix or restore **.htaccess**.

6. **Domain or SSL**
   - In hPanel, under **Domains** or **Websites**, confirm **toolscout.tools** points to the folder that contains **index.html**. If you use **https**, ensure SSL is active for the domain.

**Still not working after deploy?**

1. **See where the files actually went**
   - In Hostinger **File Manager**, look at the **left-hand folder tree**. Open **public_html**. Do you see **index.html**, **.htaccess**, and **_next** directly there? If yes, the domain must be pointed at **public_html** (see step 6 above). If you see another folder (e.g. **out** or **public_html**) and the files are inside that, either move everything from that folder into **public_html** (so **index.html** is next to **public_html**’s content), or in hPanel change the domain’s document root to that folder.

2. **FTP uploaded to the wrong place**
   - The GitHub workflow uploads to **./** by default (the FTP “current” directory). On some Hostinger accounts that is already **public_html**, so files land in the right place. On others, FTP starts in your account home, so files land *outside* public_html and the site never loads.
   - **Fix:** In the repo go to **Settings → Secrets and variables → Actions**. Add a secret named **FTP_SERVER_DIR** and set its value to **`public_html/`** (with a trailing slash). Re-run the **Deploy to Hostinger** workflow (Actions tab → select the run → Re-run all jobs). Then check File Manager again: **index.html** and **_next** should now be inside **public_html**.
   - If you already had **FTP_SERVER_DIR** set to **public_html/** and the site still doesn’t load, try the opposite: remove the **FTP_SERVER_DIR** secret (or set it to **`./`**). Re-run the workflow. Some Hostinger FTP accounts start inside **public_html**, so **./** is correct and **public_html/** would create a nested **public_html/public_html** folder.

3. **Domain document root**
   - In hPanel → **Domains** or **Websites** → **toolscout.tools** → check **Document root** (or **Website root**). It must be the folder that **contains** **index.html** (e.g. **public_html**). If it points to a Node.js app or another path, change it to **public_html** (or the folder where **index.html** is) and save.

---

## Part 3 — Make sure the domain uses this folder

### Step 3.1 — Check which folder the domain uses

1. In hPanel, go to **Domains** or **Websites**.
2. Find **toolscout.tools**.
3. See which **folder** or **document root** is set for it (e.g. **public_html** or **public_html/toolscout.tools**).  
   - If it says **public_html**, the files you uploaded in Part 2 are in the right place.  
   - If it says something like a **Node.js app** or a different path, you need to change it so **toolscout.tools** uses the folder where you uploaded **index.html** (e.g. **public_html**).

### Step 3.2 — Point the domain to the static files (if it was on Node.js before)

1. In **Websites** or **Domains**, open the settings for **toolscout.tools**.
2. Look for **“Document root”**, **“Website root”**, or **“Point domain to”**.
3. Set it to the folder that contains **index.html** (e.g. **public_html**).
4. Save. Changes can take a few minutes.

If you don’t see these options, Hostinger support or their help articles can confirm how to point a domain to **public_html** (or your chosen folder) instead of a Node.js app.

---

## Part 4 — Check that the site works

### Step 4.1 — Open the homepage

1. In your browser, go to **https://toolscout.tools** (use **https**).
2. You should see the Tool Scout homepage (“Find & Compare the Best Software Tools”, niche grid, featured tools, etc.).
3. If you see a blank page or “Index of /”:  
   - Confirm **index.html** is in the root folder you set for the domain (Step 2.6 and 3.1).  
   - Try **https://toolscout.tools/index.html**; if that works, the domain may be pointing to the wrong folder.

### Step 4.2 — Test a few other pages

Open:

- **https://toolscout.tools/ai-tools**
- **https://toolscout.tools/ai-tools/compare**
- **https://toolscout.tools/ai-tools/tools**
- **https://toolscout.tools/blog**

If these load correctly, the static site is live.

---

## Part 5 — When you want to update the site

1. On your computer, change the code or content in the project.
2. In the project folder, open PowerShell (or terminal) and run:
   ```powershell
   npm run build
   ```
3. Upload the **new** contents of the **out** folder to Hostinger (same folder as before), **replacing** the old files (overwrite **index.html**, **_next**, **ai-tools**, **blog**, **compare**, **tools**, **category**, etc.).  
   You can zip the new **out** contents, upload the zip, extract (into the same root folder), and overwrite when asked.

---

## Part 6 — Fresh start (delete everything and do it again)

Use this when you want to wipe the project or the server and start from zero.

### Option A — Fresh start on your computer only

You keep the project folder but want a clean build (e.g. things are broken or you changed a lot).

1. In the project folder, **delete** these if they exist:
   - **node_modules** (folder)
   - **out** (folder)
   - **.next** (folder, if present)
2. Open PowerShell in the project folder (see Step 1.2).
3. Run:
   ```powershell
   npm install
   npm run build
   ```
4. You now have a new **out** folder. Upload its contents to Hostinger as in **Part 2** (you can overwrite the old files, or do Option B below first to clear the server).

### Option B — Fresh start on Hostinger only

You have a good **out** folder on your PC and want to replace everything on the server.

1. Log in to **hPanel** → **File Manager** (Part 2.1–2.2).
2. Go to **public_html** (or the root folder used by **toolscout.tools**).
3. Select **all** files and folders in that folder (do **not** delete **public_html** itself).
4. Click **Delete** / **Remove** and confirm. The folder should be empty (or only have a default file like index.html from Hostinger — you can delete that too).
5. Upload the **contents** of your **out** folder (or **out.zip** → upload → extract) as in **Part 2.5**.
6. Check **https://toolscout.tools** (Part 4).

### Option C — Full fresh start (computer + server + code from GitHub)

You want to start completely from scratch: new copy of the code, clean build, empty server, then upload.

**On your computer:**

1. Create a **new** folder (e.g. **Desktop → toolscout-fresh**).
2. If you use **Git:** open PowerShell in that folder and run:
   ```powershell
   git clone https://github.com/natsuki91/ai-tools-affiliate.git .
   ```
   (The `.` at the end puts the files in the current folder.)  
   If you don’t use Git, download the project as a **ZIP** from GitHub (Code → Download ZIP), then extract it into the new folder.
3. Open PowerShell **in that folder** and run:
   ```powershell
   npm install
   npm run build
   ```
4. (Optional) Copy **.env.local.example** to **.env.local**, add your Supabase URL and anon key, then run **npm run build** again so the site has your data.
5. You should have an **out** folder with **index.html** and the rest.

**On Hostinger:**

6. Follow **Option B** above: File Manager → **public_html** (or your domain’s root) → delete everything inside it.
7. Upload the **contents** of **out** (or **out.zip** → upload → extract so **index.html** is in the root).
8. Make sure **toolscout.tools** is pointed at that folder (Part 3).
9. Open **https://toolscout.tools** and test (Part 4).

After a full fresh start you have: new code, a clean build, and only the new site files on the server.

---

## Quick checklist

- [ ] **Part 1:** Ran `npm install` and `npm run build`; **out** folder exists and contains **index.html** and the listed folders.
- [ ] **Part 2:** Uploaded the **contents** of **out** (not the **out** folder itself) into **public_html** (or the domain’s root folder); **index.html** is in the root of that folder.
- [ ] **Part 3:** Domain **toolscout.tools** is pointed at the folder that contains **index.html** (e.g. **public_html**), not at a Node.js app.
- [ ] **Part 4:** **https://toolscout.tools** and **https://toolscout.tools/ai-tools** (and a couple of other links) open correctly.

If something doesn’t match (e.g. no **index.html** in **out**, or domain still on Node), go back to the step that fixes that and repeat from there.

---

## If you use GitHub Actions to deploy (SFTP)

The repo workflow **Deploy to Hostinger** builds the site and uploads via **SFTP** (not FTP). Hostinger often allows only SFTP, so FTP would timeout.

**Required repo secrets** (Settings → Secrets and variables → Actions):

| Secret | Example / notes |
|--------|------------------|
| **SFTP_SERVER** | Your Hostinger SFTP host (e.g. from hPanel → FTP accounts or SSH; often same as your server hostname) |
| **SFTP_USERNAME** | FTP/SFTP username (e.g. from Hostinger FTP account) |
| **SFTP_PASSWORD** | FTP/SFTP password for that account |
| **SFTP_REMOTE_PATH** | Optional. Default is `public_html/`. Set if your web root is different (e.g. `domains/toolscout.tools/public_html/`). Must end with `/`. |

After you add these secrets, push to **main** or re-run the **Deploy to Hostinger** workflow. The action uploads the contents of **out/** into the remote path. If the site doesn’t load, check that **index.html** and **_next** are directly inside that folder (e.g. in File Manager under **public_html**).

---

## If you use Hostinger "Deploy from Git"

When you connect GitHub and Hostinger builds the site for you:

1. **Environment variables** (e.g. GA4, Supabase) must be set in **Hostinger's** build/deploy settings, not only in `.env.local` on your PC. See **docs/GA4-SETUP.md** for `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
2. **Deployed folder** must be the **contents of `out`** (including the **_next** folder). If the deploy only copies HTML and not **_next**, the site will load but **styles and scripts will be missing** and the page will look broken or "strange" (plain HTML, no colors, no layout).
3. In hPanel, check where the Git/deploy output goes (e.g. "Build output directory" or "Publish directory"). It should be set so the **web root** contains **index.html** and **_next** at the same level. If you see "out" or "out/" as the publish directory, that's correct; the server must serve from inside **out**, not the repo root.

---

## Site looks strange or unstyled?

If https://toolscout.tools loads but looks wrong (no colors, no layout, or everything in one column):

1. **Open the page, then press F12** (Developer Tools) → **Network** tab → refresh. Look for **red** (failed) requests. If you see **404** for URLs like `/_next/static/css/...` or `/_next/static/chunks/...`, the **_next** folder is missing or not at the right path.
2. **Fix:** Ensure the **full** build output is deployed. That means everything inside **out**, including the **_next** folder. If you use Deploy from Git, check Hostinger's deploy settings so the **publish directory** is the folder that contains **index.html** and **_next** together. If you upload manually, upload the **contents** of **out** (including **_next**) to your web root (e.g. **public_html**).
3. **View Page Source** on the live site and check the first few lines. You should see something like `<link rel="stylesheet" href="/_next/static/css/...">`. Open that `href` in a new tab (e.g. **https://toolscout.tools/_next/static/css/...**). If it returns 404, **_next** is not in the right place.
