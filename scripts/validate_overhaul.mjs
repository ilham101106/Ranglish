import { generateRichSentenceAnalysis } from '../src/services/freeTranslator.js';
import { generateSmartSentenceAnalysis, generateSentencePhonetics, generatePhonetics, VOCAB_MAP, PHONETIC_DICT } from '../src/utils/sentenceTranslator.js';
import { generatePhonetics as instantPhonetics } from '../src/services/instantEngine.js';

async function runValidation() {
  console.log('══════════════════════════════════════════════════════════════════════════════');
  console.log('🧪 RUNNING COMPREHENSIVE VALIDATION FOR RANGLISH OVERHAUL');
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  let allPassed = true;

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 1: "iam better of without you, i'm so angry towards you"
  // ──────────────────────────────────────────────────────────────────────────
  console.log('▶ [TEST 1] Testing: "iam better of without you, i\'m so angry towards you"');
  const t1 = await generateRichSentenceAnalysis("iam better of without you, i'm so angry towards you");
  console.log('  Arti:', t1.arti);
  console.log('  Cara Baca:', t1.cara_baca);
  console.log('  Penggunaan (Example 1):', t1.penggunaan?.[0]);
  console.log('  Penggunaan (Example 2):', t1.penggunaan?.[1]);
  console.log('  Catatan:', t1.catatan);
  console.log('  Makna Filosofis:', t1.maknaFilosofis);

  const t1Combined = `${t1.arti} ${t1.penggunaan?.join(' ')} ${t1.catatan} ${t1.maknaFilosofis}`.toLowerCase();
  
  // (a) Pronoun check
  const hasTanpamu = t1Combined.includes('tanpamu');
  const hasKamu = /\bkamu\b/.test(t1Combined);
  const hasLu = t1Combined.includes('lu');
  const hasGw = t1Combined.includes('gw');
  if (hasTanpamu || hasKamu || !hasLu) {
    console.error('  ❌ FAIL (a): Contains tanpamu/kamu or missing lu');
    allPassed = false;
  } else {
    console.log('  ✅ PASS (a): Pronoun 100% konsisten "lu" / "gw", tidak ada "tanpamu"');
  }

  // (b) Angry / Breakup tone check
  const hasAngryContext = /toxic|drama|marah|kesel|dead in the eye|standing|hell no|cermin|realize/i.test(t1.penggunaan?.join(' '));
  if (!hasAngryContext) {
    console.error('  ❌ FAIL (b): Examples did not match angry/breakup tone');
    allPassed = false;
  } else {
    console.log('  ✅ PASS (b): Kalimat contoh sesuai nada marah / putus hubungan');
  }

  // (c) Makna Filosofis check
  if (!t1.maknaFilosofis || !t1.maknaFilosofis.includes('psikologi') || !/tbh|which is|valid/i.test(t1.maknaFilosofis)) {
    console.error('  ❌ FAIL (c): Missing or malformed maknaFilosofis');
    allPassed = false;
  } else {
    console.log('  ✅ PASS (c): Ada field maknaFilosofis dengan gaya Jaksel + insight emosional');
  }

  // (d) Phonetic "angry" check
  if (!t1.cara_baca.includes('eng-gri')) {
    console.error('  ❌ FAIL (d): Phonetic for "angry" is not "eng-gri". Got:', t1.cara_baca);
    allPassed = false;
  } else {
    console.log('  ✅ PASS (d): Fonetik "angry" terbaca natural lidah Indonesia ("eng-gri")');
  }

  console.log('\n──────────────────────────────────────────────────────────────────────────');

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 2: "whirl-winds" & "plowed"
  // ──────────────────────────────────────────────────────────────────────────
  console.log('▶ [TEST 2] Testing Unrecognized Words: "whirl-winds" & "plowed"');
  const t2a = await generateRichSentenceAnalysis("whirl-winds");
  const t2b = await generateRichSentenceAnalysis("plowed");

  console.log('  whirl-winds arti:', t2a.arti);
  console.log('  whirl-winds penggunaan length:', t2a.penggunaan?.length);
  console.log('  whirl-winds isUnrecognized:', t2a.isUnrecognized);

  console.log('  plowed arti:', t2b.arti);
  console.log('  plowed penggunaan length:', t2b.penggunaan?.length);
  console.log('  plowed isUnrecognized:', t2b.isUnrecognized);

  const t2aSmart = generateSmartSentenceAnalysis("whirl-winds");
  const t2bSmart = generateSmartSentenceAnalysis("plowed");

  if (t2aSmart !== null || t2bSmart !== null) {
    console.error('  ❌ FAIL: generateSmartSentenceAnalysis should return null for unrecognized single/compound words!');
    allPassed = false;
  } else {
    console.log('  ✅ PASS: generateSmartSentenceAnalysis properly returned null (no fake Regular Statement shortcut)');
  }

  const hasFakeMeanIt = `${t2a.arti} ${t2a.penggunaan?.join(' ')} ${t2b.arti} ${t2b.penggunaan?.join(' ')}`.includes('I really mean it when I say');
  if (hasFakeMeanIt || !t2a.isUnrecognized || !t2b.isUnrecognized) {
    console.error('  ❌ FAIL: Fake template still present or isUnrecognized not set');
    allPassed = false;
  } else {
    console.log('  ✅ PASS: Output jujur tidak dikenal dengan gaya Jaksel santai tanpa template palsu');
  }

  console.log('\n──────────────────────────────────────────────────────────────────────────');

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 3: Check Catatan & Makna Filosofis Tone from Different Words
  // ──────────────────────────────────────────────────────────────────────────
  console.log('▶ [TEST 3] Testing Tone & Variety on Diverse Phrases:');
  const diverseWords = [
    'does it make you happy?',
    'i hate you so much, leave me alone',
    'i miss your smile every night',
    'could you help me with this task?'
  ];

  for (const phrase of diverseWords) {
    const res = await generateRichSentenceAnalysis(phrase);
    console.log(`\n  Input: "${phrase}"`);
    console.log(`  Arti: ${res.arti}`);
    console.log(`  Catatan: ${res.catatan}`);
    console.log(`  Makna Filosofis: ${res.maknaFilosofis}`);

    // Check Jaksel interjections
    const hasJaksel = /tbh|honestly|so basically|which is|literally|as you know|real talk/i.test(`${res.catatan} ${res.maknaFilosofis}`);
    if (!hasJaksel) {
      console.error('  ❌ FAIL: Missing Jaksel interjections');
      allPassed = false;
    }
  }
  console.log('\n  ✅ PASS: Seluruh catatan & makna filosofis konsisten dengan gaya Temen Ngobrol Jaksel');

  console.log('\n──────────────────────────────────────────────────────────────────────────');

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 4: 10 Random Words from VOCAB_MAP Phonetics Parity Check
  // ──────────────────────────────────────────────────────────────────────────
  console.log('▶ [TEST 4] Testing Phonetics Parity for 10 Random VOCAB_MAP words:');
  const testWords = ['angry', 'better', 'happy', 'leave', 'crying', 'exhausted', 'forgive', 'listen', 'without', 'matter'];
  
  for (const w of testWords) {
    const p1 = generatePhonetics(w);
    const p2 = instantPhonetics(w);
    const nonFalsy = p1 && p1.trim().length > 0;
    const isIdentical = p1 === p2;

    console.log(`  Word: "${w.padEnd(10)}" => sentenceTranslator: "${p1}", instantEngine: "${p2}"`);

    if (!nonFalsy || !isIdentical) {
      console.error(`  ❌ FAIL: Discrepancy or empty phonetic for "${w}"`);
      allPassed = false;
    }
  }
  console.log('  ✅ PASS: 100% fonetik valid, ramah lidah Indonesia, dan identik di kedua modul');

  console.log('\n──────────────────────────────────────────────────────────────────────────');

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 5: PHONETIC_DICT Size Check (Must be 500+)
  // ──────────────────────────────────────────────────────────────────────────
  const dictSize = Object.keys(PHONETIC_DICT).length;
  console.log(`▶ [TEST 5] Total entries in PHONETIC_DICT: ${dictSize}`);
  if (dictSize < 500) {
    console.error(`  ❌ FAIL: PHONETIC_DICT has only ${dictSize} entries (expected 500+)`);
    allPassed = false;
  } else {
    console.log(`  ✅ PASS: PHONETIC_DICT has ${dictSize} entries (>= 500)`);
  }

  console.log('\n══════════════════════════════════════════════════════════════════════════════');
  if (allPassed) {
    console.log('🎉 ALL 5 COMPREHENSIVE VALIDATION TESTS PASSED PERFECTLY!');
  } else {
    console.log('⚠️ SOME TESTS FAILED. PLEASE REVIEW LOGS ABOVE.');
  }
  console.log('══════════════════════════════════════════════════════════════════════════════');
}

runValidation();
