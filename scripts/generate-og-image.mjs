import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, '..', 'public', 'og-image.svg');
const pngPath = join(__dirname, '..', 'public', 'og-image.png');

const svg = readFileSync(svgPath, 'utf-8');

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

writeFileSync(pngPath, pngBuffer);
console.log('✅ og-image.png generated successfully');
