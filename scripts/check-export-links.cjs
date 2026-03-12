const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "out");

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.isFile() && ent.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function shouldSkip(href) {
  return (
    !href ||
    href.startsWith("http") ||
    href.startsWith("https") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("/_next/") ||
    href.startsWith("/styles.css")
  );
}

function existsForHref(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || !clean.startsWith("/")) return true;
  if (clean === "/") return fs.existsSync(path.join(root, "index.html"));
  const rel = clean.replace(/^\//, "");
  return (
    fs.existsSync(path.join(root, rel, "index.html")) ||
    fs.existsSync(path.join(root, `${rel}.html`)) ||
    fs.existsSync(path.join(root, rel))
  );
}

function main() {
  if (!fs.existsSync(root)) {
    console.error(`Missing export folder: ${root}`);
    process.exit(2);
  }

  const htmlFiles = walk(root);
  const hrefRe = /href="([^"]+)"/g;
  const bad = new Map();

  for (const file of htmlFiles) {
    const s = fs.readFileSync(file, "utf8");
    let m;
    while ((m = hrefRe.exec(s))) {
      const href = m[1];
      if (shouldSkip(href)) continue;
      if (!existsForHref(href)) {
        const relFile = path.relative(root, file).replace(/\\/g, "/");
        bad.set(href, (bad.get(href) || []).concat(relFile));
      }
    }
  }

  if (bad.size) {
    console.log(`BROKEN_INTERNAL_LINKS ${bad.size}`);
    let i = 0;
    for (const [href, where] of bad) {
      const preview = where.slice(0, 5).join(", ");
      const more = where.length > 5 ? ` (+${where.length - 5} more)` : "";
      console.log(`- ${href} -> ${preview}${more}`);
      if (++i >= 50) break;
    }
    process.exit(1);
  }

  console.log(`OK: no broken internal links found across ${htmlFiles.length} HTML files`);
}

main();

