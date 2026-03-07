# Step-by-Step: Push This Project to GitHub

Follow these steps in order. You need a [GitHub account](https://github.com/join) (free is fine).

---

## Step 1 — Create a new repository on GitHub

1. Go to **https://github.com** and log in.
2. Click the **+** (top right) → **New repository**.
3. Fill in:
   - **Repository name:** e.g. `ai-tools-affiliate` or `affiliate-website`
   - **Description:** optional (e.g. "AI tools comparison & affiliate site")
   - **Public** (recommended for free).
   - **Do not** check "Add a README", "Add .gitignore", or "Choose a license" — your project already has files.
4. Click **Create repository**.

You’ll see a page with "Quick setup" and a URL like  
`https://github.com/YOUR_USERNAME/ai-tools-affiliate.git`  
Keep this page open or copy that URL — you’ll use it in Step 5.

---

## Step 2 — Open a terminal in your project folder

- **Windows:** Open File Explorer, go to your project folder (`affiliate website`), type `cmd` in the address bar and press Enter, or right‑click in the folder → "Open in Terminal" / "Open in Command Prompt".
- **Or in Cursor/VS Code:** Terminal → New Terminal (make sure the folder is your project root).

Check you’re in the right place:

```bash
dir
```

You should see `package.json`, `app`, `components`, etc.

---

## Step 3 — Initialize Git (only if this folder isn’t a git repo yet)

Run:

```bash
git init
```

If you see "Reinitialized existing Git repository", that’s fine — you already had git. If you see "Initialized empty Git repository", you’re good.

---

## Step 4 — Add all files and make the first commit

Run these two commands one after the other:

```bash
git add .
```

```bash
git commit -m "Initial commit - AI tools affiliate site"
```

- If Git asks you to set your name/email first, run (use your real name and GitHub email):

```bash
git config user.name "Your Name"
git config user.email "your-email@example.com"
```

Then run `git add .` and `git commit -m "Initial commit - AI tools affiliate site"` again.

---

## Step 5 — Connect to GitHub and push

1. **Add the remote**  
   Replace `YOUR_USERNAME` and `REPO_NAME` with your GitHub username and the repo name you chose in Step 1:

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

Example:

```bash
git remote add origin https://github.com/johndoe/ai-tools-affiliate.git
```

2. **Name the main branch** (GitHub expects `main` by default):

```bash
git branch -M main
```

3. **Push to GitHub:**

```bash
git push -u origin main
```

- If a browser or window opens asking you to **log in to GitHub**, sign in or authorize (e.g. "Authorize Git Credential Manager").
- If it asks for a **password**, use a **Personal Access Token** (GitHub no longer accepts account passwords here):
  - GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**. Give it a name, check **repo**, generate, then copy the token and paste it when Git asks for a password.

When the command finishes without errors, you’re done.

---

## Step 6 — Confirm on GitHub

1. Open your repo in the browser:  
   `https://github.com/YOUR_USERNAME/REPO_NAME`
2. You should see your project files (`app`, `components`, `package.json`, etc.).

You can now use this repo in Hostinger: **Websites** → **Add Website** → **Node.js Apps** → **Import Git Repository** → select this repo.

---

## Quick reference — copy/paste block

Replace `YOUR_USERNAME` and `REPO_NAME`, then run in order:

```bash
git init
git add .
git commit -m "Initial commit - AI tools affiliate site"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Troubleshooting

| Problem | What to do |
|--------|------------|
| `git: command not found` | Install [Git for Windows](https://git-scm.com/download/win) and open a new terminal. |
| `remote origin already exists` | You already added the remote. Use `git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git` then `git push -u origin main`. |
| `failed to push` / `403` / `Authentication failed` | Use a Personal Access Token as the password (see Step 5). |
| `support for password authentication was removed` | Same: create and use a Personal Access Token with **repo** scope. |

If you hit another error, copy the exact message and we can fix it step by step.
