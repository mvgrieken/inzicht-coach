import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const indexFile = path.join(dist, 'index.html');
const fallbackFile = path.join(dist, '404.html');

if (!fs.existsSync(dist)) {
  console.error('dist/ folder not found. Did build run?');
  process.exit(1);
}

if (!fs.existsSync(indexFile)) {
  console.error('index.html not found in dist/.');
  process.exit(1);
}

const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
const inferredBase = repo && !repo.endsWith('.github.io') ? `/${repo}/` : '/';
const basePath = process.env.PAGES_BASE_PATH || inferredBase;

// Add cache-busting timestamp
const timestamp = Date.now();

function patchHtml(content) {
  // Inject <base> tag if missing
  if (!content.includes('<base ')) {
    content = content.replace(
      /<head(\s*)>/i,
      (m) => `${m}\n    <base href="${basePath}" />`,
    );
  }
  
  // Add cache-busting meta tag
  if (!content.includes('cache-bust')) {
    content = content.replace(
      /<head(\s*)>/i,
      (m) => `${m}\n    <meta name="cache-bust" content="${timestamp}" />`,
    );
  }
  
  // Rewrite leading absolute asset refs to respect base path
  content = content.replace(/(href|src)=("|')\//g, `$1=$2${basePath}`);
  
  // Add cache-busting to JavaScript files
  content = content.replace(
    /(src="[^"]*\.js)(")/g,
    `$1?v=${timestamp}$2`
  );
  
  return content;
}

const html = fs.readFileSync(indexFile, 'utf8');
const patched = patchHtml(html);
fs.writeFileSync(indexFile, patched, 'utf8');
fs.writeFileSync(fallbackFile, patched, 'utf8');
console.log(`Patched base path to '${basePath}' and wrote 404.html with cache-busting (${timestamp})`);
