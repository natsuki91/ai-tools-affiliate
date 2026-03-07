# Google Analytics 4 (GA4) setup

Add GA4 to your static site so you can see traffic and behavior on https://www.toolscout.tools.

---

## 1. Create a GA4 property

1. Go to [Google Analytics](https://analytics.google.com/) and sign in.
2. **Admin** (gear icon) → **Create property** (or use an existing one).
3. Name it (e.g. **Tool Scout**), set time zone and currency, then **Next**.
4. Create a **Web** data stream: enter **https://www.toolscout.tools** as the URL.
5. Copy the **Measurement ID** (e.g. `G-XXXXXXXXXX`).

---

## 2. Add the ID to your project

1. In your project folder, open **`.env.local`** (create it from `.env.local.example` if needed).
2. Add or edit:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   (Use your real Measurement ID.)
3. Save the file.

---

## 3. Rebuild and re-upload

1. Run **`npm run build`**.
2. Upload the new **out** folder to Hostinger (replace the existing files).

The GA4 script is already in the app; it only runs when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. After this build, your static pages will include the gtag script and start sending data to GA4.

---

## 4. Check that it works

1. In GA4, open **Reports** → **Realtime**.
2. Visit **https://www.toolscout.tools** in another tab (or on your phone).
3. You should see your visit in Realtime within a few seconds.

---

**Note:** `.env.local` is not committed to Git. If you build on another machine or in CI, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` there too before building.
