import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequencesDir = path.join(__dirname, 'public', 'sequences');

async function processDirectory(dir) {
  let filesProcessed = 0;
  let originalSize = 0;
  let newSize = 0;

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const stats = await processDirectory(fullPath);
        filesProcessed += stats.filesProcessed;
        originalSize += stats.originalSize;
        newSize += stats.newSize;
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
          const stats = await fs.stat(fullPath);
          originalSize += stats.size;

          const baseName = path.basename(entry.name, ext);
          const webpPath = path.join(dir, `${baseName}.webp`);

          console.log(`Processing: ${fullPath} -> ${webpPath}`);
          await sharp(fullPath)
            .webp({ quality: 75 })
            .toFile(webpPath);

          const newStats = await fs.stat(webpPath);
          newSize += newStats.size;

          // Delete original
          await fs.unlink(fullPath);
          filesProcessed++;
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }

  return { filesProcessed, originalSize, newSize };
}

async function run() {
  console.log('Starting image compression...');
  const startTime = Date.now();
  
  try {
    await fs.access(sequencesDir);
  } catch {
    console.log(`Directory not found: ${sequencesDir}`);
    return;
  }
  
  const stats = await processDirectory(sequencesDir);
  const endTime = Date.now();

  console.log('--- Compression Summary ---');
  console.log(`Files Processed: ${stats.filesProcessed}`);
  console.log(`Original Size: ${(stats.originalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New Size: ${(stats.newSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Space Saved: ${((stats.originalSize - stats.newSize) / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Time Taken: ${((endTime - startTime) / 1000).toFixed(2)} s`);
}

run();