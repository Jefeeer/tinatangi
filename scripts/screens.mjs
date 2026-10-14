// Screenshots for visual QA into .screens/ (gitignored). Needs the dev server on :3000.
import puppeteer from "puppeteer-core";

const url = process.env.URL ?? "http://localhost:3000";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });

async function run(name, w, h, mobile) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(url, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1500));
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  // viewport shots through the hero wipe
  for (const f of [0, 0.35, 0.7, 1]) {
    await page.evaluate((y) => window.scrollTo(0, y), f * (h * 1.2));
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: `.screens/${name}-hero-${Math.round(f * 100)}.png` });
  }
  // scroll through to trigger reveals / lazy images
  for (let y = 0; y < total; y += h * 0.6) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 120));
  }
  await new Promise((r) => setTimeout(r, 800));
  for (const [id,off] of [["hardin",0.7],["gabi",0],["gabi",1.4],["bisita",0]]) {
    await page.evaluate(([i,o,hh]) => { const e=document.getElementById(i); window.scrollTo(0, e.getBoundingClientRect().top+scrollY+o*hh-60); }, [id,off,h]);
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: `.screens/${name}-${id}-${off}.png` });
  }
  const sw = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  console.log(name, "height", total, "scrollWidth", sw.sw, "clientWidth", sw.cw, errors.length ? errors : "no console errors");
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `.screens/${name}-full.png`, fullPage: true });
  await page.close();
}
await run("desktop", 1440, 900, false);
await run("mobile", 390, 844, true);
await browser.close();
