# Simple deploy (no Git, no Node on Hostinger)

Forget "Deploy from Git" and Node.js on Hostinger. Do this instead: **build on your PC, then upload the result.** Your site will work.

---

## One-time setup (do once)

### 1. Make sure the domain uses public_html

- In **hPanel** → **Websites** (or **Domains**) → **toolscout.tools**
- Set **Document root** / **Website root** to **public_html** (not nodejs)
- If the site is set as a "Node.js" or "Git" app, remove that so it’s just a normal website using **public_html**

### 2. Clean public_html

- In **File Manager** go to **public_html**
- Delete everything inside it (or move it to a backup folder) so **public_html** is empty

### 3. Remove Node from .htaccess

- In **public_html**, if there’s a file named **.htaccess**, open it
- Delete **every line** that mentions **Passenger**, **Node**, or **server.js**
- Save (or leave the file empty)

---

## Every time you want to update the site

### Step 1 — Build on your PC

1. Open your project folder (e.g. **Desktop → affiliate website**)
2. Open **PowerShell** or **Terminal** in that folder
3. Run:
   ```powershell
   npm run build
   ```
4. Wait until it finishes (you’ll see “Generating static pages” and then “postbuild-rename-next…”)

### Step 2 — Open the `out` folder

1. In your project folder, open the **out** folder
2. You should see: **index.html**, and folders **next**, **ai-tools**, **blog**, **compare**, **tools**, **category**, etc.
3. Select **everything inside `out`** (all files and folders) — do **not** select the `out` folder itself

### Step 3 — Upload to public_html

1. In **Hostinger** → **File Manager** → open **public_html**
2. **Upload** the files and folders you selected (or drag them in)
3. When asked, choose **Overwrite** so the old files are replaced
4. When it’s done, **public_html** should contain **index.html**, **next**, **ai-tools**, **blog**, etc. directly

### Step 4 — Check the site

- Open **https://toolscout.tools** in your browser
- You should see your site with the correct design and all pages working

---

## That’s it

- **No** “Deploy from Git” on Hostinger  
- **No** Node.js app  
- **No** build running on the server  

You build on your PC and upload the **contents of `out`** to **public_html**. When you change the site, run **npm run build** again and upload again.

Your GitHub repo can stay as-is for backup and version history; you just don’t use it for Hostinger deploy anymore.
