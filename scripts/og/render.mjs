// Renders the link-preview thumbnail (app/opengraph-image.jpg + twitter-image.jpg) from og.html.
// Usage: node scripts/og/render.mjs   (needs puppeteer-core + Chrome; CHROME env to override path)
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { pathToFileURL, fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const b = await puppeteer.launch({ executablePath: process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--allow-file-access-from-files"] });
const p = await b.newPage();
await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await p.goto(pathToFileURL(join(here, "og.html")).href, { waitUntil: "networkidle0" });
await p.evaluate(() => document.fonts.ready);
const png = await p.screenshot({ type: "png" });
await b.close();
for (const f of ["opengraph-image.jpg", "twitter-image.jpg"]) await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(join(root, "app", f));
console.log("og ok");
