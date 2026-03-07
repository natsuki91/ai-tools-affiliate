# How to point toolscout.tools to the same folder as the preview

Your site works at **https://yellow-dog-499662.hostingersite.com** because that’s the website where you uploaded the static files. To make **https://toolscout.tools** show the same site, you need to **connect toolscout.tools to that same website** in Hostinger.

---

## Step 1 — Open the Websites list

1. Log in to **Hostinger** and open **hPanel**.
2. Go to **Websites** (or **Hosting** → your plan).
3. You’ll see a list of your websites. One of them will show the **temporary domain**: **yellow-dog-499662.hostingersite.com** — that’s the one where your static site is working.

---

## Step 2 — Connect your domain to that website

1. Find the row/card for the website that has **yellow-dog-499662.hostingersite.com**.
2. Under or next to that temporary domain, look for a **“Connect”** (or **“Connect domain”**) link or button and click it.
3. When asked for the domain to use:
   - If **toolscout.tools** appears in the list, select it.
   - If it doesn’t, choose **“Enter domain manually”** (or similar) and type **toolscout.tools**.
4. Click **Next** and follow any remaining steps (e.g. confirm, SSL). Finish the process.

After this, **toolscout.tools** is linked to the **same** website (and same folder) as the preview, so it will show the same site.

---

## Step 3 — If toolscout.tools is already used by another website

If you get a message like **“Your domain can’t have active subdomains”** or **“Domain is already in use”**, it means **toolscout.tools** is already attached to **another** website (for example a Node.js app).

Then you have to **move** the domain from that website to the one with the preview:

1. Go to the **other** website that currently uses **toolscout.tools** (e.g. the Node.js app).
2. Open its **Domain** or **Settings**.
3. **Remove** or **disconnect** **toolscout.tools** from that website (Hostinger may offer to keep the site on the temporary domain only).
4. Then go back to the website with **yellow-dog-499662.hostingersite.com** and use **Connect** (Step 2 above) to attach **toolscout.tools** to this website.

If you’re not sure which website is using toolscout.tools, in **Websites** check each one; the one that lists **toolscout.tools** as its domain is the one to disconnect it from.

---

## Step 4 — Wait and test

1. Wait **a few minutes** (up to 24 hours for DNS in rare cases).
2. Open **https://toolscout.tools** in your browser (try a private/incognito window if it was open before).
3. You should see the same site as **https://yellow-dog-499662.hostingersite.com**.

---

## Summary

| What you do | Why |
|-------------|-----|
| Find the website with **yellow-dog-499662.hostingersite.com** | That’s where your static files are. |
| Click **Connect** and choose **toolscout.tools** | Makes the domain use that website’s folder. |
| If the domain is already on another website | Disconnect it from that website first, then connect it to the preview website. |

You are **not** changing folders or “document root” by hand — you are telling Hostinger: “Use **toolscout.tools** for this website,” and that website already uses the folder where you uploaded **index.html** and the rest.
