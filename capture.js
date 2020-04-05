const puppeteer = require("puppeteer");

const captureScreenshot = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 576, height: 1024 });
  await page.goto("http://localhost:3000");
  await page.screenshot({ path: "./docs/screenshot.png", fullPage: true });

  await page.goto("http://localhost:3000/timer?duration=3600&remaining=400");
  await page.waitForSelector("#skip");
  await page.click("#skip");
  await page.screenshot({ path: "./docs/screenshot2.png", fullPage: true });

  await browser.close();
};

captureScreenshot();
