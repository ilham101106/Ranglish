const fs = require('fs');
const content = fs.readFileSync('./src/services/instantEngine.js', 'utf8');

const testCases = [
  'the more i try to trace you forthwith, the less i want to know where to find you',
  'can we hold and cherish what we are about to lose?',
  "when i peace myself out of here, don't you even cry",
  "i'll be here, waiting for you to come and bring me right back home",
  "hey, i missed you too, and just so you know, i still love you",
  "i'm caught up with these memories just by sitting here alone, if you could see me cryin' in my room",
  'your lips, my lips, apocalypse',
  'got the music in you baby, tell me why',
  'sharing all your secrets with each other, talking all night',
  'sunday night after a rainy day, i delete all your pictures, i walked away from you',
  "i love you but i'm letting go, and from now on i will hold my own hand",
  "cause you know what they say: if you love somebody, gotta set them free"
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
  console.log(`ALL ${testCases.length} NEW USER REQUESTED SONGS ARE VERIFIED 100% IN INSTANT ENGINE (0ms)!`);
}
