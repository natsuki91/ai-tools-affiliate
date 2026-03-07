# Build failed on Hostinger (Deploy from Git)

If the build fails when Hostinger runs **Deploy from Git**, use the steps below to fix it.

---

## 1. Get the actual error

1. In hPanel, open your site → **Deploy from Git** (or **Git** / **Deployments**).
2. Open the **latest deployment** or **build log**.
3. Scroll to the **bottom** of the log and copy the **error message** (the red line or “Build failed” section).

Share that error (or a screenshot) so we can fix the right thing. Common cases are below.

---

## 2. Check these settings

In the deploy/build configuration:

| Setting | Should be |
|--------|-----------|
| **Build command** | `npm run build` |
| **Output directory** | `out` (not `.next`) |
| **Node version** | 18.x or 20.x (try 20.x if 22.x fails) |
| **Root directory** | `/` or blank (repo root) |

If **Output directory** was `.next`, change it to **`out`** and redeploy.

---

## 3. Out of memory (JavaScript heap)

If the log says **JavaScript heap out of memory** or **FATAL ERROR: Reached heap limit**:

- In **Environment variables** for the deploy, add:
  - **Name:** `NODE_OPTIONS`  
  - **Value:** `--max-old-space-size=4096`
- Save and **Redeploy**.

---

## 4. “No output directory found after build” or “out/_next not found”

Hostinger looks for the **Output directory** folder after the build. You must use the same path where `next build` writes.

**Do this:**

1. **Root directory:** leave **empty** or set to **`/`** (so the build runs from the repo root).
2. **Output directory:** set to exactly **`out`** (no slash: `out`, not `/out` or `./out`).
3. Redeploy.

If you still see **“No output directory found”**:

- The build may be running from a **subdirectory** (e.g. Hostinger cloned the repo into a folder). Check Hostinger’s deploy log: it often shows the working directory. If it says something like “Building in /home/xxx/source”, then try **Output directory:** **`source/out`** (or whatever that folder name is + `/out`).
- Or in **Root directory** enter the folder that contains `package.json` (e.g. if the repo is in `my-repo`, set Root to `my-repo`). Then **Output directory** stays **`out`** (relative to that root).

**“out/_next not found”** means the postbuild script didn’t find `out/_next` (often because the script ran in a different directory). The next deploy will log the actual path and contents so we can fix it. The **out** folder should still exist for Hostinger; if Hostinger then says “No output directory found”, the problem is Hostinger’s **Output directory** setting not matching where `out` actually is.

---

## 5. Install or dependency errors

If the log shows **npm install** or **dependency** errors:

- Ensure **Package manager** is **npm** (not yarn/pnpm) if you didn’t change the project.
- Redeploy. If it still fails, copy the full error from the log.

---

## Quick checklist

- [ ] **Output directory** = `out`
- [ ] **Build command** = `npm run build`
- [ ] Build log error copied (bottom of the log)
- [ ] If heap error: add **NODE_OPTIONS** = `--max-old-space-size=4096`

Once you have the exact error message from the build log, we can target the fix.
