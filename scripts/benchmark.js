const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

async function selectOptions(page, selector) {
  const options = await page.$$(`${selector} option`);
  return Promise.all(options.map((el) => el.textContent()));
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve(__dirname, "../dist/index.html")}`);

  const libraries = await selectOptions(page, "select#library");
  const benchmarkTypes = await selectOptions(page, "select#benchmark-type");

  let csv = "library,benchmark,mean,p95,p99\n";
  for (const library of libraries) {
    await page.locator("select#library").selectOption(library);
    for (const benchmarkType of benchmarkTypes) {
      await page.locator("select#benchmark-type").selectOption(benchmarkType);

      const startButton = page.locator("text=start");
      await startButton.click();

      // waits for button to be enabled
      await startButton.waitFor();

      const result = page.locator("li").first();
      const meanStr = await result
        .locator("[data-test-id='mean']")
        .textContent();
      const p95Str = await result.locator("[data-test-id='p95']").textContent();
      const p99Str = await result.locator("[data-test-id='p99']").textContent();

      const mean = parseFloat(meanStr.slice(0, -2));
      const p95 = parseFloat(p95Str.slice(0, -2));
      const p99 = parseFloat(p99Str.slice(0, -2));

      csv += `${library},${benchmarkType},${mean},${p95},${p99}\n`;
    }
  }

  fs.writeFileSync(path.resolve(__dirname, "../dist/benchmarks.csv"), csv);
  await browser.close();
}

main();
