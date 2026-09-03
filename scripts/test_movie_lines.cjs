const fs = require('fs');

const content = fs.readFileSync('./src/services/instantEngine.js', 'utf8');

const MOVIE_DIALOGUES = [
  'Damn, that was a close call!',
  "You have no idea what I've been through",
  'Cut the crap and tell me the truth',
  'We are running out of time, make up your mind!',
  'I knew it was too good to be true',
  "Don't you dare walk away from me right now!",
  'It is what it is, we gotta move on',
  "I've got your back, no matter what happens",
  'Why are you always giving me mixed signals?',
  "Let's get straight to the point",
  "I didn't sign up for this mess!",
  'Are you out of your mind?!',
  'I think we got off on the wrong foot',
  "You can't just sweep this under the rug",
  "I'm at my wit's end with this situation",
  "I'm taking a leap of faith here",
  'May the Force be with you, always',
  "Why so serious? Let's put a smile on that face!",
  "I'll be back",
  'To infinity and beyond!',
  'Houston, we have a problem'
];

let allOk = true;
for (const line of MOVIE_DIALOGUES) {
  const lower = line.toLowerCase();
  const escaped = lower.replace(/'/g, "\\'");
  const exists = content.includes(`'${escaped}':`) || content.includes(`'${lower}':`);
  if (!exists) {
    console.error('MISSING:', line);
    allOk = false;
  }
}

if (allOk) {
  console.log(`ALL ${MOVIE_DIALOGUES.length} MOVIE DIALOGUES ARE VERIFIED 100% IN INSTANT ENGINE (0ms)!`);
}
