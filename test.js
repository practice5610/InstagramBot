const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://example.com");

  // Using page.$x to find elements by XPath
  const [element] = await page.$x('//*[@id="exampleElement"]');

  if (element) {
    console.log("Element found!");
  } else {
    console.log("Element not found.");
  }

  await browser.close();
})();
