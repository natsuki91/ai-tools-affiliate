# Where to click in Hostinger (step by step)

Two things: **(1)** make the domain use **public_html**, and **(2)** fix **.htaccess** so it doesn’t run Node. Do them in this order.

---

## Part 1 — Make the domain use public_html (not Node)

### Step 1.1 — Open the Websites section

1. Log in to **Hostinger** and open **hPanel** (your hosting control panel).
2. In the **left sidebar**, click **Websites** (or **Hosting** → **Websites**).
3. You’ll see a list of your sites (e.g. **toolscout.tools**).

### Step 1.2 — Find toolscout.tools

1. Find **toolscout.tools** in the list.
2. Look at how it’s shown:
   - If it says **Node.js** or **Git** or has a **Deploy** or **Build** link → the domain is running the Node app. We need to change that.
   - If it just shows the domain name and maybe **Manage** → it might already be a normal site.

### Step 1.3 — Remove the Node.js app (so the domain uses public_html)

1. On the same row as **toolscout.tools**, find the **three dots (⋯)** or **⋮** (vertical dots) on the right.
2. Click the three dots.
3. In the menu, look for **Delete**, **Remove**, or **Stop application**.
4. If you see **Delete**:
   - Click **Delete**.
   - Hostinger will warn that data will be removed. That’s the Node app data (the **nodejs** folder), not your **public_html** files.
   - Check the box to confirm and click **Delete** again.
   - After that, the domain usually goes back to serving **public_html**. So your static files in **public_html** will be used.

**If you don’t see Delete:**  
Look for **Settings**, **Manage**, or **Document root**. Open it and see if you can set **Document root** or **Website root** to **public_html**. Save if you can.

**If there’s no Websites section or no three dots:**  
Use the **Help (?)** in hPanel or contact **Hostinger support** and say:  
*“I want toolscout.tools to serve static files from **public_html** and stop using the Node.js application. How do I point the domain to public_html or remove the Node.js app?”*

---

## Part 2 — Fix .htaccess (stop Node from running)

### Step 2.1 — Open File Manager

1. In the **left sidebar** of hPanel, click **Files** (or **Advanced** → **File Manager**).
2. **File Manager** opens in a new tab or panel.

### Step 2.2 — Show hidden files (so you can see .htaccess)

1. In File Manager, look at the **top right** for **Settings**, **Options**, or a **gear icon (⚙)**.
2. Click it.
3. Find an option like **“Hide dotfiles”** or **“Show hidden files (dotfiles)”**.
4. If it says **Hide dotfiles**: **uncheck** it.  
   If it says **Show hidden files**: **check** it.
5. Click **Save** or **Update**.
6. Now files whose names start with a dot (like **.htaccess**) will be visible.

### Step 2.3 — Go to public_html

1. In the **left side** of File Manager you see a folder tree.
2. Click **public_html** (or **domains** → **toolscout.tools** → **public_html**).
3. The main area should show the contents of **public_html** (e.g. index.html, next, ai-tools, and maybe **.htaccess**).

### Step 2.4 — Open .htaccess

1. In the list of files, find **.htaccess** (it might be at the top or bottom).
2. **Right‑click** on **.htaccess** → choose **Edit** (or **Code Edit**).  
   Or click **.htaccess** once and then click an **Edit** or **Pencil** button at the top.

### Step 2.5 — Remove the Node/Passenger lines

1. You’ll see the contents of **.htaccess** (several lines of text).
2. **Delete every line** that contains any of these words:
   - **Passenger**
   - **PassengerAppRoot**
   - **PassengerAppType**
   - **PassengerNodejs**
   - **PassengerStartupFile**
   - **PassengerBaseURI**
   - **PassengerRestartDir**
   - **server.js**
   - **RewriteRule** that mentions **.builds** or Node
3. You can leave:
   - The file **empty**, or
   - Lines that only do simple redirects (e.g. **RewriteEngine On** and redirecting **www** to non‑www).
4. Click **Save** or **Update**.

### Step 2.6 — If .htaccess doesn’t exist

- You don’t need to create it. Only edit it if it’s already there and has the lines above.

---

## Quick checklist

- [ ] **Websites** → **toolscout.tools** → **⋯** → **Delete** (Node app) so the domain uses **public_html**.
- [ ] **Files** → **File Manager** → **Settings** → show **hidden files**.
- [ ] Open **public_html** → **.htaccess** → **Edit** → remove all **Passenger/Node** lines → **Save**.

After this, open **https://toolscout.tools** in your browser. It should serve the static site from **public_html**. If it doesn’t, tell support: *“I want toolscout.tools to serve the files in public_html, not Node.js.”*
