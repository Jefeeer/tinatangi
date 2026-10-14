// Scroll-through check for the reveal/parallax layer. Needs the dev or prod server on :3000 (URL env to override).
import puppeteer from "puppeteer-core";

const url = process.env.URL ?? "http://localhost:3000";
const VPS = [[320,568],[360,740],[375,667],[390,844],[414,896],[430,932],[667,375],[844,390],[768,1024],[820,1180],[1024,768],[1024,1366],[1280,800],[1440,900],[1920,1080],[2560,1440]];
const SHOT = new Set(["1440x900", "390x844"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
let bad = 0;
for (const [w, h] of VPS) {
  const key = `${w}x${h}`;
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w <= 844 && h <= 932, hasTouch: w <= 844 && h <= 932 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(url, { waitUntil: "networkidle0" });
  await sleep(1200);
  const armed0 = await page.evaluate(() => document.querySelectorAll('[data-rv="armed"]').length);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  let n = 0;
  for (let y = 0; y < total; y += h * 0.55) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await sleep(SHOT.has(key) ? 700 : 260);
    if (SHOT.has(key) && n % 2 === 0) await page.screenshot({ path: `.screens/motion/${key}-${String(n).padStart(2, "0")}.png` });
    n++;
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await sleep(2600);
  const r = await page.evaluate(() => {
    const leftover = [...document.querySelectorAll("[data-rv]")].map((e) => e.className.toString().slice(0, 40));
    const hidden = [...document.querySelectorAll("[data-reveal]")].filter((e) => getComputedStyle(e).opacity !== "1" || getComputedStyle(e).clipPath !== "none").length;
    return { leftover: leftover.length, hidden, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, bsw: document.body.scrollWidth };
  });
  const ok = r.leftover === 0 && r.hidden === 0 && r.sw <= r.cw && !errors.length;
  if (!ok) bad++;
  console.log(ok ? "PASS" : "FAIL", key, "armed@load", armed0, JSON.stringify(r), errors.length ? errors : "");
  await page.close();
}
await browser.close();
console.log(bad ? `${bad} viewport(s) failed` : "all viewports ok");
process.exit(bad ? 1 : 0);
