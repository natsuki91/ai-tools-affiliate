"use strict";
const fs = require("fs");
const path = require("path");

try {
  const cwd = process.cwd();
  const outDir = path.join(cwd, "out");
  const srcDir = path.join(outDir, "_next");
  const nextDir = path.join(outDir, "next");
  const targetDir = path.join(nextDir, "_next");

  if (!fs.existsSync(srcDir)) {
    console.warn("postbuild-rename-next: out/_next not found.");
    console.warn("  cwd: " + cwd);
    console.warn("  out exists: " + fs.existsSync(outDir));
    if (fs.existsSync(outDir)) {
      try {
        const entries = fs.readdirSync(outDir);
        console.warn("  contents of out: " + entries.slice(0, 20).join(", "));
      } catch (e) {
        console.warn("  (could not list out)");
      }
    }
    process.exit(0);
  }

  if (!fs.existsSync(nextDir)) {
    fs.mkdirSync(nextDir, { recursive: true });
  }
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true });
  }
  fs.renameSync(srcDir, targetDir);
  console.log("postbuild-rename-next: moved out/_next -> out/next/_next (assetPrefix /next/)");
} catch (err) {
  console.error("postbuild-rename-next failed:", err.message);
  process.exit(1);
}
