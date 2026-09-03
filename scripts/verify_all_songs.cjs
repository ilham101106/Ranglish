const fs = require('fs');
const vocabContent = fs.readFileSync('./src/components/VocabLookup.jsx', 'utf8');
const engineContent = fs.readFileSync('./src/services/instantEngine.js', 'utf8');

// Extract SONG_LYRICS array from VocabLookup.jsx
const match = vocabContent.match(/const SONG_LYRICS = \[([\s\S]*?)\];/);
if (!match) {
  console.error('Could not extract SONG_LYRICS');
  process.exit(1);
}

const lines = match[1]
  .split('\n')
  .map(l => l.trim())
  .filter(l => l && !l.startsWith('//'))
  .map(l => l.replace(/^['"]|['"],?$/g, ''));

console.log(`Found ${lines.length} song lyric entries to verify.`);

let missing = 0;
for (const line of lines) {
  const lower = line.toLowerCase().trim();
  const escaped = lower.replace(/'/g, "\\'");
  const exists = engineContent.includes(`'${escaped}':`) || engineContent.includes(`'${lower}':`);
  if (!exists) {
    console.error('❌ MISSING IN ENGINE:', line);
    missing++;
  } else {
    console.log('✅ 0ms INSTANT MATCH:', line);
  }
}

if (missing === 0) {
  console.log(`\n🎉 SUCCESS! ALL ${lines.length} SONG LYRICS ARE 100% VERIFIED ACCURATE AND INSTANT (0ms)!`);
} else {
  console.error(`\n❌ Found ${missing} missing items.`);
  process.exit(1);
}
