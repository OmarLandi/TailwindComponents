import { expect, test } from '@playwright/test';

const templates = [
  { id: 'templates-dashboard--default', name: 'Dashboard' },
  { id: 'templates-auth--centered', name: 'Auth centered' },
  { id: 'templates-auth--split', name: 'Auth split' },
  { id: 'templates-auth--split-media-start', name: 'Auth split media start' },
  { id: 'templates-settings--default', name: 'Settings' },
  { id: 'templates-marketing--default', name: 'Marketing' },
  { id: 'templates-docs--default', name: 'Docs' },
  { id: 'templates-ecommerce--default', name: 'Ecommerce' },
  { id: 'templates-listdetail--default', name: 'List detail' },
  { id: 'templates-crud--default', name: 'CRUD' },
  { id: 'templates-states--default', name: 'States' },
] as const;

const viewports = [
  { name: 'Mobile', width: 375, height: 812 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 800 },
] as const;

for (const viewport of viewports) {
  test.describe(`${viewport.name} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const template of templates) {
      test(`${template.name} has no horizontal overflow and matches the snapshot`, async ({
        page,
      }) => {
        await page.goto(`/iframe.html?id=${template.id}&viewMode=story`);

        const main = page.locator('#storybook-root main');
        await main.waitFor();
        await page.evaluate(async () => {
          await document.fonts.ready;
        });
        await expect(main).toBeVisible();
        await expect(page.locator('#storybook-root h1')).toHaveCount(1);

        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));
        expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);

        await expect(page).toHaveScreenshot(`${template.id}-${viewport.width}.png`, {
          fullPage: true,
          animations: 'disabled',
          caret: 'hide',
        });
      });
    }
  });
}
