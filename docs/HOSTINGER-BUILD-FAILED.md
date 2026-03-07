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

## 4. Postbuild script failed (“out/_next not found” or ENOENT)

If the error mentions **postbuild-rename-next** or **out/_next**:

- The build might be running from a different directory. Ensure **Root directory** is `/` or empty.
- Redeploy. If it still fails, we can switch to a build that doesn’t rely on the rename (and adjust the config).

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
