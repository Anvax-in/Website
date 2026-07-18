// Decodes base64-encoded assets under public/ into their binary siblings at build time.
// Files may be single (`x.webp.b64`) or split into parts (`x.webp.b64.p1`, `.p2`, ...)
// because the publishing pipeline pushes via the GitHub API, which cannot carry raw
// binaries and has per-request payload limits. npm runs this via "prebuild".
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (/\.b64(\.p\d+)?$/.test(name)) out.push(p);
  }
  return out;
}

if (existsSync('public')) {
  const groups = new Map();
  for (const file of walk('public')) {
    const m = file.match(/^(.*\.b64)(?:\.p(\d+))?$/);
    const base = m[1];
    const part = m[2] ? parseInt(m[2], 10) : 0;
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push({ part, file });
  }
  for (const [base, parts] of groups) {
    parts.sort((a, b) => a.part - b.part);
    const b64 = parts.map((p) => readFileSync(p.file, 'utf8').trim()).join('');
    const target = base.slice(0, -4);
    writeFileSync(target, Buffer.from(b64, 'base64'));
    console.log(`decode-assets: ${parts.length} file(s) -> ${target}`);
  }
}
