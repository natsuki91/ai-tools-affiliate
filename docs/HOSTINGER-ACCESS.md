# Hostinger — Website access details (Tool Scout)

Reference for your Hostinger setup. Keep this for yourself; don’t commit real passwords or keys.

---

## URLs

| Purpose | URL |
|--------|-----|
| **Canonical (sitemap, SEO)** | https://toolscout.tools |
| **With www** | https://www.toolscout.tools (both work) |
| **Preview / staging** | https://yellow-dog-499662.hostingersite.com |

## Server

| Detail | Value |
|--------|--------|
| **Website IP** | 147.93.92.210 |

---

## What to use where

- **Canonical / SEO:** The project uses **https://toolscout.tools** (no www) in sitemap, Open Graph, and `NEXT_PUBLIC_SITE_URL`. Both **https://toolscout.tools** and **https://www.toolscout.tools** work; the app defaults to non-www for canonical.
- **Testing:** You can upload the **out** folder to the preview host (**yellow-dog-499662.hostingersite.com**) first to check the static site, then use **toolscout.tools** when ready.
- **Optional:** In Hostinger, set a redirect (e.g. www → non-www) so search engines see one canonical URL.

---

## Preview works, but toolscout.tools doesn’t — what to do

If **https://yellow-dog-499662.hostingersite.com** shows your site but **https://toolscout.tools** is blank or different, **toolscout.tools** is likely attached to a different website (e.g. a Node.js app). You need to **connect toolscout.tools to the same website as the preview**.

**→ Full step-by-step: [POINT-DOMAIN-TO-PREVIEW-FOLDER.md](POINT-DOMAIN-TO-PREVIEW-FOLDER.md)**

Short version:

1. In hPanel go to **Websites**.
2. Find the website that shows **yellow-dog-499662.hostingersite.com** (the one where your site works).
3. Click **Connect** (or **Connect domain**) and choose **toolscout.tools**.
4. If toolscout.tools is already used by another website (e.g. Node.js), remove it from that website first, then connect it to the preview website.
5. Wait a few minutes and open **https://toolscout.tools**.

---

## After uploading the static site

1. Open **https://toolscout.tools** — you should see the homepage.
2. If you see a blank page or “Index of /”, the domain may still be pointing at the wrong place; ensure it uses the folder where you uploaded **index.html** (e.g. **public_html**). See [DEPLOY-STATIC-STEP-BY-STEP.md](DEPLOY-STATIC-STEP-BY-STEP.md) Part 3 and 4.
