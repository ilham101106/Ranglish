const fs = require('fs');
const content = fs.readFileSync('./src/services/instantEngine.js', 'utf8');

const testCases = [
  'you are the only exception',
  'the only exception',
  "somebody's pleasure",
  "it's so hard when you're caught in the middle of being somebody's pleasure",
  'turn the pages over, looking for a closure',
  "i'm still stuck on these pages with you",
  "i'm nothing without you, oh babe",
  'you!',
  'do you think i have forgotten about you?',
  'about you',
  'you are my shining star in the darkest night',
  "location unknown, tryin' to get home to you",
  'location unknown',
  "hey, i'm tired of pretending that i'm fine",
  "hey i'm tired",
  "i've always loved you, even when the world told me not to",
  "i've always loved you"
];

let allOk = true;
for (const tc of testCases) {
  const lower = tc.toLowerCase();
  const escaped = lower.replace(/'/g, "\\'");
  const exists = content.includes(`'${escaped}':`) || content.includes(`'${lower}':`);
  if (!exists) {
    console.error('MISSING:', tc);
    allOk = false;
  } else {
    console.log('[MATCH OK]', tc);
  }
}

if (allOk) {
  console.log(`ALL ${testCases.length} REQUESTED SONGS & LYRICS ARE VERIFIED 100% IN INSTANT ENGINE (0ms)!`);
}
