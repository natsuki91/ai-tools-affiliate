# I put everything in public_html but the site still doesn’t work

Use this checklist. Usually the problem is **1** or **2**.

---

## 1. Is the domain actually using public_html?

Even with files in **public_html**, the server might still be running the **Node.js app** for toolscout.tools. So you see the wrong page or a blank/error.

**Fix:**

1. In **hPanel** go to **Websites** (or **Domains**).
2. Click **toolscout.tools** (or **Manage**).
3. Find **Document root** / **Website root** / **Point domain to**.
4. Set it to **public_html** (not **nodejs**). Save.
5. If toolscout.tools is set up as a **Node.js** or **Git** app, **remove** that app or **change** the domain so it uses **public_html** as a normal static site.

Until the domain points at **public_html**, your static files won’t be used.

---

## 2. Does .htaccess in public_html run Node?

If **public_html** has an **.htaccess** file that starts **Passenger** or **Node**, the server will run that instead of serving your HTML/CSS/JS.

**Fix:**

1. In **File Manager** open **public_html**.
2. Find **.htaccess** (enable “Show hidden files” if needed).
3. **Edit** the file.
4. **Delete** every line that contains:
   - `Passenger`
   - `PassengerAppRoot`
   - `PassengerAppType`
   - `PassengerNodejs`
   - `PassengerStartupFile`
   - `PassengerBaseURI`
   - `server.js`
5. Save. You can leave the file **empty** or keep only simple redirect rules (e.g. www → non-www).

Then reload https://toolscout.tools (try incognito).

---

## 3. Is the folder structure correct?

Inside **public_html** you should see **directly** (not inside a folder named “out”):

- **index.html** (file)
- **next** (folder) ← contains **\_next** inside it, with **static**, **chunks**, etc.
- **ai-tools** (folder)
- **blog**, **compare**, **tools**, **category** (folders or .html files)

**Wrong:** public_html → **out** → index.html (site would be at toolscout.tools/out/).  
**Right:** public_html → **index.html** and public_html → **next**, **ai-tools**, etc.

If you uploaded the **out** folder as a folder, move **everything that’s inside out** into **public_html** and delete the empty **out** folder.

---

## 4. Do CSS/JS load? (site loads but no styling)

If the page loads but looks plain (no colors/layout):

1. Open **https://toolscout.tools**, press **F12** → **Network** tab, refresh.
2. See if any request is **red** (failed). Often the URL will be like **/next/_next/static/css/...** or **/next/_next/static/chunks/...**
3. If that URL is **404**: the **next** folder is missing or in the wrong place. It must be **public_html/next/_next/static/...** (so the **next** folder must contain **_next** inside it).

Re-upload the **next** folder from your **out** folder (the one from `npm run build` on your PC) so that **public_html/next/** looks like: **public_html/next/_next/static/...**

---

## Quick checklist

- [ ] **Domain** toolscout.tools is set to **public_html** (not nodejs) in hPanel → Websites/Domains.
- [ ] **public_html/.htaccess** has **no** Passenger/Node lines (remove them or leave file empty).
- [ ] **public_html** has **index.html** and **next**, **ai-tools** (etc.) **directly** inside it, not inside an “out” folder.
- [ ] **public_html/next/** contains **\_next** (and inside that, **static**, **chunks**).

If all are done and it still doesn’t work, say what you see: blank page, wrong page, or “works but no CSS”, and we’ll fix the next step.
