// Decodes any *.b64 files under public/ into their binary siblings at build time.
// Why: blog images are committed as base64 text (the publishing pipeline pushes
// via the GitHub API, which cannot carry raw binaries). npm runs this via
// "prebuild" before "next build", so deployed sites always have the real files.
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (name.endsWith('.b64')) out.push(p);
  }
  return out;
}

if (existsSync('public')) {
  for (const file of walk('public')) {
    const target = file.slice(0, -4);
    writeFileSync(target, Buffer.from(readFileSync(file, 'utf8').trim(), 'base64'));
    console.log(`decode-assets: ${file} -> ${target}`);
  }
}
