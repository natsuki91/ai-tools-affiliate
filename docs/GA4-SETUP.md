# Google Analytics 4 (GA4) setup

Add GA4 to your static site so you can see traffic and behavior on https://toolscout.tools (and www).

---

## 1. Create a GA4 property

1. Go to [Google Analytics](https://analytics.google.com/) and sign in.
2. **Admin** (gear icon) → **Create property** (or use an existing one).
3. Name it (e.g. **Tool Scout**), set time zone and currency, then **Next**.
4. Create a **Web** data stream: enter **https://toolscout.tools** as the website URL (canonical).
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
2. Visit **https://toolscout.tools** in another tab (or on your phone).
3. You should see your visit in Realtime within a few seconds.

---

**Note:** `.env.local` is not committed to Git. If you build on another machine or in CI, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` there too before building.

---

## No data in GA4? Checklist

1. **Script in the page**  
   On the live site, open **View Page Source** (right‑click → View Page Source). Search for **`gtag`** or your Measurement ID (**`G-`**). You should see `googletagmanager.com/gtag/js` and `gtag('config', 'G-...')`. If they’re missing, you didn’t have `NEXT_PUBLIC_GA_MEASUREMENT_ID` set when you ran `npm run build` — add it to `.env.local`, rebuild, and re-upload **out**.

2. **Use Realtime, not standard reports**  
   In GA4 go to **Reports → Realtime**. Standard reports can take 24–48 hours. Realtime should show your visit within a few seconds.

3. **Right property and stream**  
   In GA4 (Admin) confirm you’re in the correct **Property** and that the **Web data stream** URL is **https://toolscout.tools** (or your live URL).

4. **Ad blockers and privacy**  
   Try from an **incognito/private** window with **extensions disabled**. Ad blockers or privacy tools can block gtag.

5. **Rebuild and re-upload**  
   After adding the ID or changing it, run **`npm run build`** and upload the new **out** folder again so the live site includes the GA4 script.
