// Offline build (used when Vite isn't available). Normal use: `npm run build`.
// Usage: NODE_PATH=<node_modules with react, react-dom, esbuild, tailwindcss> node scripts/build-offline.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mods = process.env.NODE_PATH || path.join(root, 'node_modules');
const require = createRequire(path.join(mods, 'x.js'));
const esbuild = require('esbuild');
const { compile } = await import(path.join(mods, 'tailwindcss/dist/lib.mjs'));

const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });

// 1. Tailwind: scan source for candidate class names, compile CSS.
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(jsx?|html)$/.test(f)) files.push(p);
  }
})(path.join(root, 'src'));
files.push(path.join(root, 'index.html'));
const candidates = new Set();
for (const f of files) for (const tok of fs.readFileSync(f, 'utf8').split(/[\s"'`{}<>]+/)) if (tok) candidates.add(tok.replace(/^\.+|\.+$/g, ''));
const twBase = path.join(mods, 'tailwindcss');
const cssSrc = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8');
const tw = await compile(cssSrc, {
  base: root,
  loadStylesheet: async (id, base) => {
    const p = id === 'tailwindcss' ? path.join(twBase, 'index.css') : path.join(twBase, id.replace(/^tailwindcss\//, ''));
    return { path: p, base: path.dirname(p), content: fs.readFileSync(p, 'utf8') };
  },
});
const css = tw.build([...candidates]);
const cssMin = (await esbuild.transform(css, { loader: 'css', minify: true })).code;
fs.writeFileSync(path.join(out, 'assets/app.css'), cssMin);

// 2. JS bundle (CSS import stubbed — compiled above).
await esbuild.build({
  entryPoints: [path.join(root, 'src/main.jsx')],
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2020',
  jsx: 'automatic',
  outfile: path.join(out, 'assets/app.js'),
  nodePaths: [mods],
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [{ name: 'css-stub', setup(b) { b.onLoad({ filter: /\.css$/ }, () => ({ contents: '', loader: 'js' })); } }],
  logLevel: 'warning',
});

// 3. HTML + public files.
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace('<script type="module" src="./src/main.jsx"></script>', '<script type="module" src="./assets/app.js"></script>');
html = html.replace('</head>', '    <link rel="stylesheet" href="./assets/app.css" />\n  </head>');
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.cpSync(path.join(root, 'public'), out, { recursive: true });
console.log('built', fs.statSync(path.join(out, 'assets/app.js')).size, 'js bytes,', cssMin.length, 'css bytes');
