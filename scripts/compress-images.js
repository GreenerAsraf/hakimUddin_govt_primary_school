const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Files to compress and their max widths
const tasks = [
  { file: 'assembly.jpg',     maxWidth: 1200, quality: 72 },
  { file: 'classroom.jpg',    maxWidth: 1200, quality: 72 },
  { file: 'sports.jpg',       maxWidth: 1200, quality: 72 },
  { file: 'school_banner.jpg',maxWidth: 1400, quality: 75 },
  { file: 'logo.png',         maxWidth: 400,  quality: 85, png: true },
  { file: 'back-voban-1.jpeg',maxWidth: 900,  quality: 75 },
  { file: 'back-voban-2.jpeg',maxWidth: 900,  quality: 75 },
  { file: 'front-voban-1.jpeg',maxWidth: 900, quality: 75 },
  { file: 'front-voban-2.jpeg',maxWidth: 900, quality: 75 },
  { file: 'fullview.jpeg',    maxWidth: 900,  quality: 75 },
  { file: 'cover.jpeg',       maxWidth: 900,  quality: 75 },
];

// Teacher placeholder images
const teachersDir = path.join(IMAGES_DIR, 'teachers');
const teacherFiles = fs.readdirSync(teachersDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

async function compress(src, dest, maxWidth, quality, isPng) {
  const sizeBefore = fs.statSync(src).size;
  const inst = sharp(src).resize({ width: maxWidth, withoutEnlargement: true });
  if (isPng) {
    await inst.png({ quality, compressionLevel: 9 }).toFile(dest + '.tmp');
  } else {
    await inst.jpeg({ quality, progressive: true, mozjpeg: true }).toFile(dest + '.tmp');
  }
  const sizeAfter = fs.statSync(dest + '.tmp').size;
  fs.renameSync(dest + '.tmp', dest);
  const saved = Math.round((1 - sizeAfter / sizeBefore) * 100);
  console.log(`✓ ${path.basename(src)}: ${Math.round(sizeBefore/1024)}KB → ${Math.round(sizeAfter/1024)}KB (saved ${saved}%)`);
}

(async () => {
  console.log('=== Compressing main images ===');
  for (const t of tasks) {
    const src = path.join(IMAGES_DIR, t.file);
    if (!fs.existsSync(src)) { console.log(`  skip (not found): ${t.file}`); continue; }
    await compress(src, src, t.maxWidth, t.quality, t.png);
  }

  console.log('\n=== Compressing teacher images ===');
  for (const f of teacherFiles) {
    const src = path.join(teachersDir, f);
    await compress(src, src, 300, 78, false);
  }

  console.log('\nDone! All images compressed.');
})();
