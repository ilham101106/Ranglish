// Generator script for 1,000+ massive curated authentic vocabulary items
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const existingKeys = new Set();
try {
  const instantContent = fs.readFileSync(path.join(__dirname, '../services/instantEngine.js'), 'utf8');
  [...instantContent.matchAll(/'([^']+)':\s*\{/g)].forEach(m => existingKeys.add(m[1].toLowerCase()));
} catch (e) {}

console.log('Existing base keys to avoid duplicating:', existingKeys.size);

// Extensive vocabulary bank definitions categorized by roots and semantics
// 1000 curated words with phonetic guides, authentic sentences, and contextual Indonesian notes
import { VOCAB_SOURCE_ENTRIES } from './vocabSource.js';

const vocab1000 = {};
let count = 0;

for (const item of VOCAB_SOURCE_ENTRIES) {
  const [word, arti, cara_baca, engSentence, indoSentence, catatan] = item;
  const cleanWord = word.toLowerCase().trim();

  // Ensure strict uniqueness (never duplicate existing built-in words)
  if (existingKeys.has(cleanWord) || vocab1000[cleanWord]) {
    continue;
  }

  vocab1000[cleanWord] = {
    arti: arti,
    cara_baca: cara_baca,
    penggunaan: [
      `${engSentence} (${indoSentence})`
    ],
    catatan: catatan || `💡 Kata "${cleanWord}" sangat sering dipakai dalam percakapan sehari-hari dan percakapan formal.`
  };
  count++;
}

console.log(`Generated ${count} brand new unique vocabulary entries!`);

const outPath = path.join(__dirname, 'vocab1000.json');
fs.writeFileSync(outPath, JSON.stringify(vocab1000, null, 2), 'utf8');
console.log(`Saved to ${outPath}`);
