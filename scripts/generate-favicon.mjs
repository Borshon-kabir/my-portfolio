/**
 * generate-favicon.mjs
 * Generates public/favicon.ico (a valid ICO containing a 32x32 PNG image)
 * using sharp (already a devDependency).
 *
 * Run: node scripts/generate-favicon.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ICO  = path.resolve(__dirname, '../public/favicon.ico');
const OUT_PNG  = path.resolve(__dirname, '../public/favicon-32.png');

const SIZE = 32;
const R    = SIZE / 2;

// Build an SVG circle with a bold white "B" in the centre
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <circle cx="${R}" cy="${R}" r="${R}" fill="#111827"/>
  <text
    x="${R}" y="${R}"
    text-anchor="middle"
    dominant-baseline="central"
    font-family="Georgia, serif"
    font-weight="900"
    font-size="21"
    fill="#ffffff"
    dy="-0.5"
  >B</text>
</svg>`.trim();

// 1. Render SVG → 32×32 PNG buffer
const pngBuffer = await sharp(Buffer.from(svg))
  .resize(SIZE, SIZE)
  .png({ compressionLevel: 9 })
  .toBuffer();

// Save intermediate PNG (also used as public/favicon-32.png if needed)
fs.writeFileSync(OUT_PNG, pngBuffer);
console.log(`✔  Written: ${OUT_PNG}`);

// 2. Wrap the PNG into a minimal ICO container
//    ICO format: 6-byte header + 16-byte dir entry + PNG data
//    (Windows Vista+ supports PNG-in-ICO)
function buildIco(pngBuf) {
  const HEADER_SIZE = 6;
  const DIR_ENTRY   = 16;
  const dataOffset  = HEADER_SIZE + DIR_ENTRY;

  const ico = Buffer.alloc(dataOffset + pngBuf.length);

  // ICONDIR header
  ico.writeUInt16LE(0,    0); // reserved
  ico.writeUInt16LE(1,    2); // type = 1 (ICO)
  ico.writeUInt16LE(1,    4); // count = 1 image

  // ICONDIRENTRY
  ico.writeUInt8(SIZE,    6); // width  (0 = 256)
  ico.writeUInt8(SIZE,    7); // height (0 = 256)
  ico.writeUInt8(0,       8); // color count
  ico.writeUInt8(0,       9); // reserved
  ico.writeUInt16LE(1,   10); // color planes
  ico.writeUInt16LE(32,  12); // bits per pixel
  ico.writeUInt32LE(pngBuf.length, 14); // size of image data
  ico.writeUInt32LE(dataOffset,    18); // offset of image data

  pngBuf.copy(ico, dataOffset);
  return ico;
}

const icoBuffer = buildIco(pngBuffer);
fs.writeFileSync(OUT_ICO, icoBuffer);
console.log(`✔  Written: ${OUT_ICO}`);
console.log('Done! Favicon generated successfully.');
