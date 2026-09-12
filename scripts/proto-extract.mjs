#!/usr/bin/env node
/**
 * proto-extract — turn the Claude Design canvas into a portable, reviewable spec.
 *
 * WHY THIS EXISTS
 * ---------------
 * public/redesign/index.html is NOT html. It is a Claude Design canvas artboard:
 *   <sc-for list="{{ megaMenu }}" as="m">   loop directive
 *   <sc-if value="{{ wide }}">              conditional directive
 *   {{ navGap }}  {{ ctaHero }}             template bindings
 *   style-hover="background:var(--bone-100)" canvas-only hover attribute
 * All of it is interpreted at runtime by support.js (the dc-runtime, which mounts
 * React). Copy-pasting that markup into .tsx silently drops a third of the semantics
 * and produces no errors — just wrong output. That is the trap.
 *
 * This script runs the real runtime in headless Chromium, lets it expand everything
 * into ordinary DOM, and emits a spec you can actually port from:
 *
 *   <out>/html/<width>/NN-<tag>.html   flattened markup — loops expanded, no directives
 *   <out>/shots/<width>-NN.png         per-section screenshot — the visual source of truth
 *   <out>/shots/<width>-FULL.png       whole page
 *   <out>/hover.json                   style-hover rules recovered from the source
 *   <out>/report.json                  block inventory + which blocks restructure by width
 *
 * ONE-TIME SETUP
 *   npm i -D playwright react@18.3.1 react-dom@18.3.1 @fontsource/archivo @fontsource/geist-mono
 *   npx playwright install chromium
 *
 * USAGE
 *   node scripts/proto-extract.mjs public/redesign docs/redesign-spec
 *
 * Re-run it whenever the canvas changes. The spec is generated, never hand-edited.
 */
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(process.argv[2] || 'public/redesign');
const OUT  = path.resolve(process.argv[3] || 'docs/redesign-spec');
const PORT = 8899;

// The canvas fetches React from unpkg. Serve the local copies instead so this works
// offline / behind a proxy — and so the version is pinned to what the runtime expects.
const REACT = {
  'react.production.min.js':     require.resolve('react/umd/react.production.min.js'),
  'react-dom.production.min.js': require.resolve('react-dom/umd/react-dom.production.min.js'),
};

// Same reason for fonts: Google Fonts may be unreachable, and a fallback face makes
// every screenshot lie about line-breaks and vertical rhythm.
function fontCss() {
  const faces = [];
  const add = (pkg, family, file, weight) => {
    try {
      const p = require.resolve(`${pkg}/files/${file}`);
      faces.push(`@font-face{font-family:${family};font-weight:${weight};font-display:block;` +
                 `src:url(data:font/woff2;base64,${fs.readFileSync(p).toString('base64')}) format('woff2')}`);
    } catch { /* face not installed — fall back silently */ }
  };
  for (const w of [400,500,600,700,800]) add('@fontsource/archivo','Archivo',`archivo-latin-${w}-normal.woff2`,w);
  for (const w of [400,500]) add('@fontsource/geist-mono',"'Geist Mono'",`geist-mono-latin-${w}-normal.woff2`,w);
  return faces.join('\n');
}

const WIDTHS = [ {w:1440,name:'desktop'}, {w:1000,name:'tablet'}, {w:600,name:'mobile'} ];
const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png',
              '.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json'};

if (!fs.existsSync(path.join(ROOT,'index.html'))) {
  console.error(`No index.html in ${ROOT}`); process.exit(1);
}

const server = http.createServer((req,res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, {'Content-Type': MIME[path.extname(p)] || 'application/octet-stream'});
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(PORT, r));

fs.mkdirSync(OUT, {recursive:true});

// style-hover only exists in the source — the runtime consumes it and leaves no trace
// in the rendered DOM. Recover it here so hover states aren't lost in the port.
const source = fs.readFileSync(path.join(ROOT,'index.html'), 'utf8');
const hovers = [...source.matchAll(/style-hover="([^"]+)"/g)].map((m,i) => ({ i, css: m[1] }));
fs.writeFileSync(path.join(OUT,'hover.json'), JSON.stringify(hovers, null, 2));

const FONT_CSS = fontCss();
const browser = await chromium.launch();
const report = {};

for (const {w, name} of WIDTHS) {
  const page = await browser.newPage({ viewport:{width:w, height:1000}, deviceScaleFactor:2 });

  await page.route('**/*', async route => {
    const url = route.request().url();
    for (const [needle, file] of Object.entries(REACT)) {
      if (url.includes(needle)) {
        return route.fulfill({ status:200, contentType:'text/javascript', body: fs.readFileSync(file,'utf8') });
      }
    }
    if (url.includes('fonts.googleapis.com')) return route.fulfill({ status:200, contentType:'text/css', body: FONT_CSS });
    if (url.includes('fonts.gstatic.com'))    return route.fulfill({ status:200, contentType:'text/css', body: '' });
    return route.continue();
  });

  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil:'networkidle', timeout:60000 });
  await page.waitForTimeout(3500);                       // let the runtime mount + hydrate
  await page.evaluate(() => document.fonts && document.fonts.ready);

  // The canvas hides anything below the fold at opacity:0 until a scroll-reveal fires,
  // and runs typewriter/bar animations on mount. Neutralise both or the spec is blank.
  await page.evaluate(() => document.querySelectorAll('[data-rise]').forEach(n => {
    n.style.opacity = '1'; n.style.transform = 'none'; n.style.transition = 'none';
  }));
  await page.evaluate(() => document.getAnimations().forEach(a => { try { a.finish(); } catch {} }));
  await page.waitForTimeout(600);

  const blocks = await page.evaluate(() => {
    const root = document.querySelector('x-dc') || document.body;
    const top = [...root.querySelectorAll('nav,header,section,footer')]
      .filter(n => !n.parentElement.closest('section,nav,header,footer'));
    top.forEach((el,i) => el.setAttribute('data-blk', i));
    return top.map((n,i) => ({
      i,
      tag:    n.tagName.toLowerCase(),
      label:  (n.querySelector('h1,h2,h3')?.innerText || n.innerText || '').trim().slice(0,60).replace(/\s+/g,' '),
      html:   n.outerHTML,
      len:    n.outerHTML.length,
      height: Math.round(n.getBoundingClientRect().height),
      inlineStyles: n.querySelectorAll('[style]').length,
    }));
  });

  fs.mkdirSync(path.join(OUT,'html',name), {recursive:true});
  fs.mkdirSync(path.join(OUT,'shots'), {recursive:true});

  for (const b of blocks) {
    const stem = `${String(b.i).padStart(2,'0')}-${b.tag}`;
    fs.writeFileSync(path.join(OUT,'html',name,`${stem}.html`), b.html);
    const el = await page.$(`[data-blk="${b.i}"]`);
    if (!el) continue;
    try {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);
      await el.screenshot({ path: path.join(OUT,'shots',`${name}-${String(b.i).padStart(2,'0')}.png`) });
    } catch { /* zero-height block */ }
  }
  await page.screenshot({ path: path.join(OUT,'shots',`${name}-FULL.png`), fullPage:true });

  report[name] = blocks.map(({i,tag,label,height,len,inlineStyles}) => ({i,tag,label,height,len,inlineStyles}));
  await page.close();
  console.log(`${name.padEnd(8)} ${blocks.length} blocks`);
}

// A block whose serialised DOM differs across widths is driven by runtime JS state
// (the canvas branches on wide>=820 / roomy>=1140 via <sc-if>), so porting it needs
// real React state. Every other block has NO responsive behaviour at all — its
// breakpoints have to be written from scratch as CSS.
report.responsive = report.desktop.map((b,i) => ({
  i, tag:b.tag, label:b.label,
  domChangesAtMobile: !(report.mobile[i] && report.mobile[i].len === b.len),
}));
fs.writeFileSync(path.join(OUT,'report.json'), JSON.stringify(report, null, 2));

console.log('\nNeeds React state (DOM restructures by width):');
report.responsive.filter(b => b.domChangesAtMobile).forEach(b => console.log(`  • ${b.tag} — ${b.label}`));
console.log('\nEverything else: pure CSS layout, breakpoints written by hand.');
console.log(`\nSpec written to ${OUT}`);

await browser.close();
server.close();
