// Score routing predictions (a CSV of id,route) against the labelled set.
import fs from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('Usage: node score.mjs predictions.csv'); process.exit(2); }
const cases = JSON.parse(fs.readFileSync(new URL('./data/inquiry-routing-dataset.json', import.meta.url), 'utf8'));
const pred = new Map(fs.readFileSync(file, 'utf8').replace(/^﻿/, '').trim().split(/\r?\n/).slice(1)
  .map((l) => l.split(',').map((s) => s.trim().replace(/^"|"$/g, ''))));
const by = {};
const misses = [];
for (const c of cases) {
  const got = pred.get(c.id) ?? '(none)';
  const ok = got === c.expected_route;
  (by[c.case_type] ??= [0, 0])[ok ? 0 : 1]++;
  if (!ok) misses.push(`${c.id} [${c.case_type}] expected ${c.expected_route}, got ${got}: ${c.message}`);
}
const right = cases.length - misses.length;
console.log(`accuracy ${right}/${cases.length} (${Math.round((right / cases.length) * 100)}%)`);
for (const [k, [y, n]] of Object.entries(by)) console.log(`  ${k}: ${y}/${y + n}`);
if (misses.length) console.log('\nmisses:\n' + misses.join('\n'));
