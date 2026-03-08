"use strict";
const fs = require("fs");
const path = require("path");

// After static export: copy main CSS to root so /styles.css works even if /_next/ fails on server.
try {
  const cwd = process.cwd();
  const outDir = path.join(cwd, "out");
  const nextStatic = path.join(outDir, "_next", "static", "css");

  if (!fs.existsSync(nextStatic)) {
    console.warn("postbuild: _next/static/css not found, skipping styles.css copy");
    process.exit(0);
  }

  const files = fs.readdirSync(nextStatic).filter((f) => f.endsWith(".css"));
  if (files.length > 0) {
    const mainCss = path.join(nextStatic, files[0]);
    const outCss = path.join(outDir, "styles.css");
    fs.copyFileSync(mainCss, outCss);
    console.log("postbuild: copied main CSS to out/styles.css");
  }
} catch (err) {
  console.error("postbuild failed:", err.message);
  process.exit(1);
}
