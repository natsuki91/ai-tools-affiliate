"use strict";
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const cwd = process.cwd();
const outDir = path.join(cwd, "out");

if (!fs.existsSync(outDir)) {
  console.error("Run 'npm run build' first. Folder 'out' not found.");
  process.exit(1);
}

try {
  if (process.platform === "win32") {
    execSync('powershell -Command "Compress-Archive -Path out\\* -DestinationPath out.zip -Force"', {
      cwd,
      stdio: "inherit",
    });
  } else {
    execSync("cd out && zip -r ../out.zip .", { cwd, stdio: "inherit" });
  }
  console.log("Created out.zip. Upload it to Hostinger File Manager → public_html, then Extract.");
} catch (err) {
  console.error("Failed to create zip:", err.message);
  process.exit(1);
}
