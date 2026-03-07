# Connect Your Custom Domain (Hostinger)

This project uses **toolscout.tools**. When you connect your own domain (or if you've already connected it):

## 1. In Hostinger

1. **Websites** → your Node.js site → **Connect domain** (or **Domains** in the sidebar).
2. Choose **Use an existing domain** or **Buy a new domain**.
3. Follow the steps to point the domain to this hosting (DNS may take a few minutes to 48 hours).

## 2. Set the site URL

So the site knows its real address (for SEO, sitemap, Open Graph):

**Hostinger:** Node.js app → **Environment variables** → add or edit:
- `NEXT_PUBLIC_SITE_URL` = `https://toolscout.tools` (no trailing slash)

**Local:** In `.env.local`:
- `NEXT_PUBLIC_SITE_URL` = `https://toolscout.tools`

## 3. Redeploy

Trigger a **Redeploy** so the new URL is used in sitemap, canonical tags, and OG tags.

## 4. Optional: HTTPS

Hostinger usually provisions SSL (HTTPS) for the connected domain. If not, enable it in hPanel (SSL section) or contact support.

## Checklist

- [x] Domain connected in Hostinger (toolscout.tools)
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://toolscout.tools` in Hostinger env vars
- [ ] Redeploy completed
- [ ] Visit https://toolscout.tools and check homepage, /blog, /compare
- [ ] Check https://toolscout.tools/sitemap.xml — URLs should use toolscout.tools
