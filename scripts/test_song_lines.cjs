const fs = require('fs');
const content = fs.readFileSync('./src/services/instantEngine.js', 'utf8');

const SONG_LYRICS = [
  // Taylor Swift
  'You kept me like a secret, but I kept you like an oath',
  "It's me, hi, I'm the problem, it's me",
  "Please don't be in love with someone else",
  "Band-Aids don't fix bullet holes",
  'You drew stars around my scars',
  'I knew you were trouble when you walked in',
  
  // LANY
  'I love you so bad, do you remember?',
  "I guess I'm getting used to being without you",
  'Nobody will ever love you like I do',
  "You are the reason why I can't sleep",
  'I miss you, but I hate you at the same time',
  
  // Radiohead
  "I'm a creep, I'm a weirdo, what the hell am I doing here?",
  'No surprises and no alarms, please',
  'Karma police, arrest this man',
  'For a minute there, I lost myself',
  "You do it to yourself, you do, and that's what really hurts",
  
  // One Direction
  "You don't know you're beautiful, that's what makes you beautiful",
  "If you ever feel alone, don't, I'll be by your side",
  'Story of my life, I take her home',
  'We could be the greatest team that the world has ever seen',
  'Night changes into something new',
  
  // Arash Buana
  'If you ever feel like crying, remember I will be right here',
  "I'll be there whenever you need me the most",
  "I'm just a boy who fell in love too fast",
  "Say you won't leave me all alone in the dark",
  "We're strangers again, but with all the memories"
];

let allOk = true;
for (const line of SONG_LYRICS) {
  const lower = line.toLowerCase();
  const escaped = lower.replace(/'/g, "\\'");
  const exists = content.includes(`'${escaped}':`) || content.includes(`'${lower}':`);
  if (!exists) {
    console.error('MISSING:', line);
    allOk = false;
  }
}

if (allOk) {
  console.log(`ALL ${SONG_LYRICS.length} ARTIST SONG LYRICS ARE VERIFIED 100% IN INSTANT ENGINE (0ms)!`);
}
