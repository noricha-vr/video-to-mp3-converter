import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const PRODUCTION_URL = 'https://video-to-mp3-converter.kojin.works/';

const testFiles = [
    'sample.avi',
    'sample.flv',
    'sample.mkv',
    'sample.mov',
    'sample.webm',
    'sample.wmv',
];

test.describe('Production Video to MP3 Conversion', () => {
    for (const fileName of testFiles) {
        test(`should convert ${fileName} to MP3 on production`, async ({ page }) => {
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    console.error(`BROWSER ERROR [${fileName}]: ${msg.text()}`);
                }
            });

            const filePath = path.join(process.cwd(), 'test_dataset', fileName);

            // Check if file exists
            if (!fs.existsSync(filePath)) {
                throw new Error(`Test file not found: ${filePath}`);
            }

            await page.goto(PRODUCTION_URL);

            // Upload file
            const fileInput = page.locator('input[type="file"]');
            await fileInput.setInputFiles(filePath);

            // Wait for file info to appear
            await expect(page.getByText('File Information')).toBeVisible({ timeout: 15000 });
            const baseName = fileName.replace(/\.[^/.]+$/, "");
            await expect(page.getByText(baseName)).toBeVisible();

            // Start conversion
            const convertButton = page.getByRole('button', { name: /Start MP3 Conversion/i });
            await convertButton.click();

            // Wait for completion (Step 3: Download MP3 header appears)
            // Production might be slightly different timing, using 150s
            await expect(page.getByText('Step 3: Download MP3')).toBeVisible({ timeout: 150000 });

            // Verify no error message
            const errorDisplay = page.locator('.bg-red-50');
            await expect(errorDisplay).not.toBeVisible();

            // Download button check - the button has an aria-label containing the filename
            const downloadButton = page.getByRole('button', { name: new RegExp(`MP3ファイル ${baseName}\\.mp3 をダウンロード`, 'i') });
            await expect(downloadButton).toBeEnabled();

            // Take a screenshot for the walkthrough
            await page.screenshot({
                path: path.join(process.cwd(), `test-results/prod-${fileName}-success.png`),
                fullPage: true
            });
        });
    }
});
