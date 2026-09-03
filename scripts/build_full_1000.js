import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read existing keys from instantEngine.js
const instantPath = path.join(__dirname, '../src/services/instantEngine.js');
const instantContent = fs.readFileSync(instantPath, 'utf8');
const existingKeys = new Set([...instantContent.matchAll(/'([^']+)':\s*\{/g)].map(m => m[1].toLowerCase()));
console.log('Existing base keys to prevent duplicates:', existingKeys.size);

function buildPhonetic(w) {
  return w.toLowerCase()
    .replace(/tion/g, 'shun')
    .replace(/sion/g, 'zhun')
    .replace(/ough/g, 'aw')
    .replace(/ight/g, 'ayt')
    .replace(/ph/g, 'f')
    .replace(/kn/g, 'n')
    .replace(/wr/g, 'r')
    .replace(/ee/g, 'ee')
    .replace(/oo/g, 'oo')
    .replace(/th/g, 'th')
    .replace(/wh/g, 'w')
    .replace(/ck/g, 'k')
    .replace(/age\b/g, 'ij')
    .replace(/ous\b/g, 'us')
    .replace(/ture\b/g, 'cher');
}

// 2. Load FreeDictionary or word list if available, or generate from curated wordbase
import { WORD_DATABASE } from './wordbase.js';

const vocab1000 = {};
let count = 0;

for (const entry of WORD_DATABASE) {
  const [word, arti, engSentence, idSentence, tip] = entry;
  const clean = word.toLowerCase().trim();
  if (existingKeys.has(clean) || vocab1000[clean]) continue;

  vocab1000[clean] = {
    arti: arti,
    cara_baca: buildPhonetic(clean),
    penggunaan: [
      `${engSentence} (${idSentence})`
    ],
    catatan: tip || `💡 Kata "${clean}" sangat umum digunakan oleh penutur asli dalam percakapan sehari-hari maupun tulisan profesional.`
  };
  count++;
}

console.log(`Successfully generated ${count} unique vocabulary entries!`);

const targetDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetPath = path.join(targetDir, 'vocab1000.json');
fs.writeFileSync(targetPath, JSON.stringify(vocab1000, null, 2), 'utf8');
console.log(`Wrote vocab1000.json successfully with ${Object.keys(vocab1000).length} keys!`);
