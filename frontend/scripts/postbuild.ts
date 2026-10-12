/// <reference types="node" />
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist:', distDir);
  process.exit(1);
}

const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('index.html not found in dist:', indexPath);
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf-8');

// 1. Create 404.html for Vercel SPA routing fallback
fs.writeFileSync(path.join(distDir, '404.html'), indexContent, 'utf-8');
console.log('✓ Created dist/404.html (Vercel SPA fallback)');

// 2. Pre-generate physical folders with index.html for instant 200 OK static delivery
const routes = [
  'admin',
  'about',
  'services',
  'projects',
  'team',
  'courses',
  'contact',
  'blog',
  'offline',
  'privacy-policy',
  'terms-and-conditions',
  'cookie-policy',
  'refund-policy',
  'cancellation-policy',
  'copyright-policy',
  'acceptable-use-policy',
  'disclaimer',
];

routes.forEach((route) => {
  const routeDir = path.join(distDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent, 'utf-8');
});

console.log(`✓ Pre-generated static index.html entrypoints for ${routes.length} SPA routes:`);
console.log(routes.map(r => `  - /${r}`).join('\n'));
