# Fix Hostinger so toolscout.tools serves your static site

Your static site (index.html, next folder, ai-tools folder) is in **public_html**, but the domain is still set to run a **Node.js app** from the **nodejs** folder. That’s why the wrong thing loads. Follow these steps so the domain serves the files in **public_html** instead.

---

## Step 1: Open Hostinger hPanel

1. Go to [https://www.hostinger.com](https://www.hostinger.com) and log in.
2. Open **hPanel** (your hosting control panel).

---

## Step 2: Find where the domain is set

1. In hPanel, look for **Websites** or **Domains** (in the sidebar or main area).
2. Click **Websites** (or **Domains**).
3. Find **toolscout.tools** in the list.
4. Note what it says:
   - If it says **Node.js** or **Git** or shows a path like **nodejs** → the domain is pointing at the Node app. You need to change this.
   - If it says **public_html** or a path ending in **public_html** → the domain might already be pointed at the right folder; then the issue is often the `.htaccess` file (see Step 4).

---

## Step 3: Point the domain to public_html (not Node.js)

You want the domain to use the folder where your static files are: **public_html**.

**Option A — “Manage” or “Settings” for the domain**

1. Click **toolscout.tools** (or **Manage** / the pencil icon next to it).
2. Look for one of these:
   - **Document root**
   - **Website root**
   - **Point domain to**
   - **Root directory**
3. Change it to **public_html** (or the full path that ends with **public_html**).
4. Save. Wait a few minutes.

**Option B — Domain is a “Node.js” or “Git” website**

1. In **Websites**, if toolscout.tools is listed as a **Node.js** or **Git** app, you may need to:
   - **Remove** that Node.js/Git app for this domain (e.g. **⋯** → **Delete** or **Remove**), **then**
   - **Add** a normal website for toolscout.tools and set its root to **public_html**.

   Or, if Hostinger lets you “switch” the same domain from Node to static:
   - Use that option and set the root to **public_html**.

**If you don’t see these options**

- Use hPanel’s **Help** or **?** next to the setting.
- Or contact **Hostinger support** and say: “I want toolscout.tools to serve static files from **public_html**, not run the Node.js app. Please point the domain to **public_html** or help me disable the Node.js app for this domain.”

---

## Step 4: Make sure .htaccess in public_html does NOT run Node

Sometimes the **public_html/.htaccess** file tells the server to use Passenger/Node. For a static site, we don’t want that.

1. In hPanel, open **File Manager**.
2. Go to **public_html**.
3. Find the file **.htaccess** (you may need to show hidden files).
4. Open **.htaccess** (Edit).
5. If you see lines like:
   - `PassengerAppRoot`
   - `PassengerAppType node`
   - `PassengerNodejs`
   - `PassengerStartupFile server.js`
   - `PassengerBaseURI`
   - `RewriteRule` pointing to a Node app  
   **Remove those lines** (or the whole block that runs Node/Passenger). Leave only things you need (e.g. redirects from www to non-www, or leave the file empty).
6. Save.

After this, the server should serve **index.html**, **next/**, **ai-tools/** from public_html as normal files.

---

## Step 5: Check the site

1. Open **https://toolscout.tools** in your browser (use a private/incognito window if you can).
2. You should see your Tool Scout homepage and the correct styling (purple/blue, layout).
3. Open **https://toolscout.tools/ai-tools/blog** — you should see the blog list.

If it still loads the wrong page or no CSS:

- Wait 5–10 minutes and try again (cache).
- Double-check that **public_html** contains **index.html**, the **next** folder, and the **ai-tools** folder.
- If you had to delete the Node.js app, make sure the domain is now attached to **public_html** and not to an empty or wrong folder.

---

## Short checklist

- [ ] In hPanel → **Websites** / **Domains**, toolscout.tools is set to use **public_html** (not **nodejs**).
- [ ] **public_html/.htaccess** does not contain Passenger/Node.js lines (or they are removed).
- [ ] **public_html** contains **index.html**, **next** (folder), **ai-tools** (folder).
- [ ] https://toolscout.tools and https://toolscout.tools/ai-tools/blog load correctly with styling.

If you get stuck, tell Hostinger support: “I have a static site (HTML/CSS/JS) in **public_html**. I need the domain **toolscout.tools** to serve that folder and not run the Node.js application.”
