"use strict";
const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");
const srcDir = path.join(outDir, "_next");
const nextDir = path.join(outDir, "next");
const targetDir = path.join(nextDir, "_next");

if (!fs.existsSync(srcDir)) {
  console.warn("postbuild-rename-next: out/_next not found, skipping");
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
