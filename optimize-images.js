const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const images = [
    { input: 'agni.png', output: 'agni-optimized.webp', width: 400, height: 300 },
    { input: 'monsterFPS.png', output: 'monsterfps-optimized.webp', width: 400, height: 300 },
    { input: 'terminal.png', output: 'terminal-optimized.webp', width: 400, height: 300 },
    { input: 'fin-read.png', output: 'fin-read-optimized.webp', width: 400, height: 300 },
    { input: 'gitfool.png', output: 'gitfool-optimized.webp', width: 400, height: 300 },
];

async function optimizeImages() {
    for (const img of images) {
        const inputPath = path.join(publicDir, img.input);
        const outputPath = path.join(publicDir, img.output);

        if (!fs.existsSync(inputPath)) {
            console.log(`Skipping ${img.input} - file not found`);
            continue;
        }

        try {
            const inputStats = fs.statSync(inputPath);
            console.log(`Processing ${img.input} (${(inputStats.size / 1024 / 1024).toFixed(2)}MB)...`);

            await sharp(inputPath)
                .resize(img.width, img.height, { fit: 'cover' })
                .webp({ quality: 85 })
                .toFile(outputPath);

            const outputStats = fs.statSync(outputPath);
            console.log(`Created ${img.output} (${(outputStats.size / 1024).toFixed(2)}KB) - ${((1 - outputStats.size / inputStats.size) * 100).toFixed(1)}% reduction`);
        } catch (err) {
            console.error(`Error processing ${img.input}:`, err.message);
        }
    }
    console.log('Done!');
}

optimizeImages();
