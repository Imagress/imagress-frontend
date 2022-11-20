const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.snapshotSuffix = "";
  await page.goto("/", { waitUntil: "networkidle" });
});

test.describe("Upload image and flip x and y", () => {
  test("should allow to upload and download image", async ({ page }) => {
    const logo = page.locator("#root > div > div.cursor-pointer > div > img");
    await expect(logo).toHaveAttribute("src", "/images/imagress-logo.png");
    await expect(page).toHaveScreenshot("1home.png", { maxDiffPixels: 1500 });

    await page
      .locator('input[type="file"]')
      .setInputFiles("./tests/fixtures/arrow.jpg");

    await page.locator("div:nth-child(3) > div > button").click();

    const editButton = await page.waitForSelector(
      "div:nth-child(3) > div > button"
    );
    await expect(page).toHaveScreenshot("2clickEdit.png", {
      maxDiffPixels: 1500,
    });
    await editButton.click();

    await page.waitForSelector("div.whitespace-pre-line > div > span.truncate");

    const fileType = await page.locator(
      "div.flex.flex-row.justify-center.items-center.gap-2 > select"
    );
    await fileType.selectOption("PNG");
    await expect(page).toHaveScreenshot("selectFileType.png", {
      maxDiffPixels: 1500,
    });

    const editFile = await page.locator("div > div.relative > button");
    await expect(page).toHaveScreenshot("3clickEditFile.png", {
      maxDiffPixels: 1500,
    });
    await editFile.click();

    await page.waitForFunction(() => {
      return (
        Array(12)
          .fill(0)
          .map(
            (_, index) =>
              document.querySelector(
                `div.relative > div > div > img:nth-child(${index + 1})`
              )?.complete
          )
          .every(Boolean) === true
      );
    });

    const img = page.locator("div.relative > div > div > img:nth-child(1)");
    await expect(page).toHaveScreenshot("4clickFlipHorizontal.png", {
      maxDiffPixels: 1500,
    });
    await img.click();

    const done = page.locator(
      "div.w-full.rounded-3xl.px-10.py-5.gap-3.flex.flex-col.overflow-y-scroll > div > button"
    );

    await expect(page).toHaveScreenshot("5clickDone.png", {
      maxDiffPixels: 1500,
    });
    const [request] = await Promise.all([
      // Waits for the next request with the specified url
      page.waitForRequest("https://api.imagress.com/convert"),
      // Triggers the request
      done.click(),
    ]);
    const download = await page.waitForSelector(
      "#root > div > div.w-full.rounded-3xl.px-10.py-5.gap-3.flex.flex-col.overflow-y-scroll > div > button"
    );

    const responseBody = await (await request.response()).body();
    expect(responseBody).toMatchSnapshot();

    const [downloadEvent] = await Promise.all([
      page.waitForEvent("download"),
      download.click(),
    ]);
    await expect(page).toHaveScreenshot("6Downloaded.png", {
      maxDiffPixels: 1500,
    });
  });
});
