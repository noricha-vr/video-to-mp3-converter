import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const testFiles = [
    'sample.avi',
    'sample.flv',
    'sample.mkv',
    'sample.mov',
    'sample.webm',
    'sample.wmv',
];

test.describe('Video to MP3 Conversion', () => {
    for (const fileName of testFiles) {
        test(`should convert ${fileName} to MP3`, async ({ page }) => {
            page.on('console', msg => console.log(`BROWSER [${fileName}]: ${msg.text()}`));
            const filePath = path.join(process.cwd(), 'test_dataset', fileName);

            // Check if file exists
            if (!fs.existsSync(filePath)) {
                throw new Error(`Test file not found: ${filePath}`);
            }

            await page.goto('/');

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
            await expect(page.getByText('Step 3: Download MP3')).toBeVisible({ timeout: 120000 });

            // Verify no error message
            const errorDisplay = page.locator('.bg-red-50');
            await expect(errorDisplay).not.toBeVisible();

            try {
                // Download button check - the button has an aria-label containing the filename
                const downloadButton = page.getByRole('button', { name: new RegExp(`MP3ファイル ${baseName}\\.mp3 をダウンロード`, 'i') });
                await expect(downloadButton).toBeEnabled();

                // Capture screenshot of the final state
                await page.screenshot({ path: path.join(process.cwd(), `test-results/${fileName}-success.png`), fullPage: true });
            } catch (error) {
                await page.screenshot({ path: path.join(process.cwd(), `test-results/${fileName}-failure.png`), fullPage: true });
                throw error;
            }
        });
    }
});
