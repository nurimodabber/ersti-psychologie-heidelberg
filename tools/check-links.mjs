// tools/check-links.mjs
// Node.js script to extract and verify all external URLs across project data and html files.
// Zero external dependencies.

import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const filesToCheck = [
  'js/data-knowledge.js',
  'js/data.js',
  'js/data-extra.js',
  'js/app.js',
  'index.html'
];

const urlRegex = /https?:\/\/[^\s"'`<>{}|\\^]+[a-zA-Z0-9/]/g;
const urls = new Map(); // url -> Array of sources (file:line)

for (const relFile of filesToCheck) {
  const absPath = path.join(projectRoot, relFile);
  if (!fs.existsSync(absPath)) continue;
  const content = fs.readFileSync(absPath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    let match;
    while ((match = urlRegex.exec(line)) !== null) {
      let rawUrl = match[0];
      // Clean trailing punctuation
      rawUrl = rawUrl.replace(/[.,;:)]+$/, '');
      if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
        // Skip template strings or placeholders if any
        if (rawUrl.includes('${')) continue;
        // Skip pure preconnect origins without path
        if (rawUrl === 'https://fonts.googleapis.com' || rawUrl === 'https://fonts.gstatic.com') continue;
        if (!urls.has(rawUrl)) {
          urls.set(rawUrl, []);
        }
        urls.get(rawUrl).push(`${relFile}:${idx + 1}`);
      }
    }
  });
}

console.log(`\nFound ${urls.size} unique URLs across ${filesToCheck.length} files.\n`);

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(timeout);
    return { status: res.status, ok: res.ok, statusText: res.statusText, finalUrl: res.url };
  } catch (err) {
    return { status: 0, ok: false, error: err.name === 'AbortError' ? 'Timeout (12s)' : err.message };
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

let okCount = 0;
let warnCount = 0;
let errCount = 0;
const results = [];

for (const [url, locations] of urls.entries()) {
  const res = await checkUrl(url);
  const locStr = locations.slice(0, 2).join(', ') + (locations.length > 2 ? ` (+${locations.length - 2})` : '');
  if (res.ok) {
    okCount++;
    console.log(`✅ [${res.status}] ${url}`);
  } else if (res.status === 403) {
    // Uni Heidelberg bot protection sometimes returns 403 on curl/fetch
    warnCount++;
    console.log(`⚠️  [403 Bot-Blocked] ${url} (Used in ${locStr})`);
  } else {
    errCount++;
    console.log(`❌ [${res.status || 'ERR'}] ${url} - ${res.error || res.statusText} (Used in ${locStr})`);
  }
  results.push({ url, locations, res });
  await sleep(150); // Be respectful to uni servers
}

console.log(`\n========================================`);
console.log(`Summary: ${okCount} OK, ${warnCount} Bot-Protected (403), ${errCount} Broken/Failed`);
console.log(`========================================\n`);

if (errCount > 0) {
  process.exitCode = 1;
}
