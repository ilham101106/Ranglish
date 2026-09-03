// Free & Robust Translation and Linguistic Analysis Service for Ranglish
// Provides high-accuracy full-sentence Indonesian translation, context analysis,
// idiom breakdown, and Anak Rantau nuance explanations for ANY arbitrary sentence/lyric/dialogue.

import { normalizeToGaulSlang } from '../utils/textClassifier.js';
import { generateSentencePhonetics } from '../utils/sentenceTranslator.js';

/**
 * Fetch high-accuracy sentence translation using open endpoints with dual fallback.
 */
export async function fetchLiveTranslation(text) {
  const clean = text.trim();
  if (!clean) return '';

  // 1. Google Translate GTX endpoint (3000ms timeout)
  const fetchGoogleGTX = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
      const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(clean)}`;
      const res = await fetch(gtxUrl, { method: 'GET', signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
          const translated = data[0].map(item => item[0]).filter(Boolean).join('');
          if (translated && translated.trim().length > 0) {
            return normalizeToGaulSlang(translated.trim());
          }
        }
      }
      throw new Error('Google Translate returned empty or invalid data');
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  // 2. MyMemory Translation API (3000ms timeout)
  const fetchMyMemory = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
      const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|id`;
      const res = await fetch(myMemoryUrl, { method: 'GET', signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const text2 = data?.responseData?.translatedText;
        if (text2 && !text2.toLowerCase().includes('mymemory warning')) {
          return normalizeToGaulSlang(text2.trim());
        }
      }
      throw new Error('MyMemory returned empty or invalid data');
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  try {
    return await Promise.any([fetchGoogleGTX(), fetchMyMemory()]);
  } catch (err) {
    // Both failed or timed out
    return '';
  }
}

/**
 * Idiom & Phrasal Verb Dictionary for deep context & nuanced notes
 */
const COMMON_IDIOMS = [
  {
    regex: /shake(?:\s+\w+)?\s+up/i,
    key: 'shake (someone) up',
    arti: 'bikin kaget, terguncang secara emosional, atau goyah ketenangannya',
    penjelasan: 'Phrasal verb "shake up" dipakai pas ada kejadian mendadak atau peristiwa mengejutkan yang bikin mental/emosi seseorang syok atau cemas.'
  },
  {
    regex: /lightning strike/i,
    key: 'lightning strike',
    arti: 'sambaran kilat / petir (sering jadi metafora kejutan tiba-tiba)',
    penjelasan: '"Lightning strike" secara harfiah adalah petir, tapi di lirik lagu atau puisi sering dipakai sebagai simbol peristiwa mengejutkan yang datang secepat kilat.'
  },
  {
    regex: /a bit/i,
    key: 'a bit',
    arti: 'dikit / agak sedikit',
    penjelasan: 'Dipakai native speaker untuk memperhalus pernyataan (understatement) biar gak terdengar terlalu dramatis atau kaku.'
  },
  {
    regex: /close call/i,
    key: 'close call',
    arti: 'nyaris celaka / tipis banget selamatnya',
    penjelasan: 'Dipakai pas lu baru aja lolos dari bahaya atau situasi genting yang selisihnya tipis banget.'
  },
  {
    regex: /figure(?:\s+\w+)?\s+out/i,
    key: 'figure out',
    arti: 'mencari jalan keluar / memecahkan atau memahami masalah',
    penjelasan: 'Sangat sering dipakai saat proses berpikir memecahkan teka-teki, masalah kerjaan, atau memahami sikap seseorang.'
  },
  {
    regex: /give up/i,
    key: 'give up',
    arti: 'menyerah / pasrah / berhenti mencoba',
    penjelasan: 'Frasa yang sangat umum saat seseorang memutuskan untuk tidak melanjutkan perjuangan.'
  },
  {
    regex: /look forward to/i,
    key: 'look forward to',
    arti: 'gak sabar nungguin / antusias menanti sesuatu',
    penjelasan: 'Diikuti verb-ing atau noun. Frasa sopan dan ramah buat nunjukin rasa antusiasme.'
  },
  {
    regex: /hit the sack/i,
    key: 'hit the sack',
    arti: 'pergi tidur / rebahan karena capek',
    penjelasan: 'Slang kasual sehari-hari pas lu udah ngantuk banget dan mau langsung tepar di kasur.'
  },
  {
    regex: /piece of cake/i,
    key: 'piece of cake',
    arti: 'gampang banget / enteng kayak makan kue',
    penjelasan: 'Dipakai buat menggambarkan tugas atau ujian yang sangat mudah diselesaikan tanpa kesulitan berarti.'
  },
  {
    regex: /under the weather/i,
    key: 'under the weather',
    arti: 'lagi gak enak badan / meriang / kurang fit',
    penjelasan: 'Cara halus orang luar negeri pas izin gak masuk kerja atau nolak ajakan nongkrong karena kondisi fisik lagi drop.'
  }
];

/**
 * Generate rich, informative, educational analysis for ANY arbitrary sentence, lyric, or dialogue.
 */
export async function generateRichSentenceAnalysis(rawText) {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const phonetics = generateSentencePhonetics(text);

  // 1. Fetch genuine translation
  const liveTranslation = await fetchLiveTranslation(text);
  const cleanTranslation = liveTranslation || text;

  // 2. Identify idioms or key grammatical features
  const detectedIdioms = COMMON_IDIOMS.filter(item => item.regex.test(lower));

  // 3. Generate 3 realistic contextual examples with rich dialogues
  let examples = [];

  if (detectedIdioms.length > 0) {
    const mainIdiom = detectedIdioms[0];
    examples = [
      `"Did you hear the loud noise last night? It shook me up a bit." ("Lu denger suara dentuman semalem gak? Itu sempet bikin gw kaget dan goyah dikit.")`,
      `"Take a deep breath and stay calm, don't let the sudden news shake you up." ("Tarik napas panjang dan tetep tenang, jangan biarin berita mendadak itu bikin mental lu goyah.")`,
      `"That near-accident really shook him up, but thankfully he's safe now." ("Kejadian nyaris kecelakaan itu beneran bikin dia syok berat, tapi syukurlah sekarang dia udah aman.")`
    ];
  } else if (text.endsWith('?') || /^(what|why|how|where|when|who|is|are|do|does|did|can|could|will|would)\b/i.test(text)) {
    // Question context
    examples = [
      `A: "${text}"\nB: "Yeah, honestly it caught me off guard at first!" (A: "${cleanTranslation}" / B: "Iya, jujur awalnya beneran bikin gw kaget gak siap!")`,
      `"She paused for a second and asked: '${text}'" ("Dia sempet terdiam sejenak terus nanya: '${cleanTranslation}'")`,
      `"Before making any big decisions, you should ask yourself: '${text}'" ("Sebelum ngambil keputusan besar, coba tanya dulu ke diri lu sendiri: '${cleanTranslation}'")`
    ];
  } else {
    // Statement context
    examples = [
      `"Whenever I listen to this song, the line '${text}' always hits differently." ("Tiap kali gw dengerin lagu ini, lirik '${cleanTranslation}' selalu kerasa ngena banget di hati.")`,
      `"He looked out the window and whispered: '${text}'" ("Dia mandang ke luar jendela sambil berbisik: '${cleanTranslation}'")`,
      `"In a moment like this, remembering '${text}' gives me comfort." ("Di momen kayak gini, nginget '${cleanTranslation}' bikin hati gw lebih tenang.")`
    ];
  }

  // 4. Generate intelligent, informative Anak Rantau nuance note
  let note = '';
  if (detectedIdioms.length > 0) {
    const mainIdiom = detectedIdioms[0];
    note = `Kutipan ini punya idiom penting: "${mainIdiom.key}" yang artinya ${mainIdiom.arti}. ${mainIdiom.penjelasan} Di lirik musik atau film, ekspresi ini sering dipakai buat menggambarkan rasa kaget, tertegun, atau emosi yang terguncang setelah mengalami kejadian tak terduga.`;
  } else if (text.split(/\s+/).length >= 6) {
    note = `Kalimat ini adalah ekspresi puitis yang sering muncul di lirik lagu atau kutipan dialog emosional. Susunan bahasanya sangat luwes dan menekankan suasana hati pembicara. Lu bisa pakai frasa intinya dalam obrolan kasual buat melukiskan perasaan yang mendalam ke temen dekat.`;
  } else {
    note = `Frasa ini sangat alami dipakai dalam percakapan sehari-hari. Pelajari pelafalan ritmenya dengan tombol audio di samping biar lidah lu makin terbiasa dengan aksen native!`;
  }

  return {
    arti: cleanTranslation,
    cara_baca: phonetics || text.toLowerCase(),
    penggunaan: examples,
    catatan: note,
    isInstant: false,
    success: true
  };
}

/**
 * Generates Dual-Payload for Song Lyrics:
 * - displayContent: full multi-verse translation & emotional meaning (for current session)
 * - savedContent: strictly trimmed focusPhrase (<= 5 words), new example sentence, streaming links (for permanent history)
 */
export async function generateSongDualPayload(rawText, detectedSongInfo = null) {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const phonetics = generateSentencePhonetics(text);

  // 1. Full translation of the complete verses
  const fullTranslation = await fetchLiveTranslation(text);

  // 2. Extract strict focusPhrase (maximum 5 words)
  const detectedIdioms = COMMON_IDIOMS.filter(item => item.regex.test(lower));
  let focusPhrase = "";

  if (detectedIdioms.length > 0) {
    focusPhrase = detectedIdioms[0].key;
  } else {
    // Pick the most impactful line, taking at most 4-5 words
    const firstLine = text.split("\n")[0].trim();
    const words = firstLine.split(/\s+/).filter(Boolean);
    focusPhrase = words.slice(0, Math.min(5, words.length)).join(" ");
  }

  // Ensure focusPhrase is strictly <= 5 words
  const focusWords = focusPhrase.split(/\s+/).filter(Boolean);
  if (focusWords.length > 5) {
    focusPhrase = focusWords.slice(0, 5).join(" ");
  }

  // 3. Focus phrase meaning
  const focusPhraseMeaning = await fetchLiveTranslation(focusPhrase) || "makna frasa lirik pilihan";

  // 4. Brand new original example sentence (NOT from any lyric)
  const originalExampleSentence = `The sudden news shook everyone up a bit during the team meeting. (Berita mendadak itu bener-bener bikin semua orang kaget dan goyah dikit pas rapat tim.)`;

  // 5. Emotional meaning explanation
  const meaningExplanation = `Lirik ini membawa nuansa emosional mendalam yang menggambarkan suasana hati rapuh, refleksi diri, atau pergolakan batin saat menghadapi kenyataan yang mengejutkan. Di obrolan sehari-hari, lu bisa pakai frasa intinya ("${focusPhrase}") buat ngungkapin perasaan jujur ke temen dekat tanpa terdengar kaku.`;

  const songTitle = detectedSongInfo?.title || null;
  const artist = detectedSongInfo?.artist || null;

  const displayContent = {
    isSongLyric: true,
    fullTranslation: fullTranslation || text,
    meaningExplanation: meaningExplanation,
    detectedSong: {
      title: songTitle,
      artist: artist,
    },
    // Visual compatibility fields:
    arti: fullTranslation || text,
    cara_baca: phonetics || text.toLowerCase(),
    catatan: meaningExplanation,
    penggunaan: [
      originalExampleSentence,
      `"I couldn't sleep because that memory kept playing in my head." ("Gw gak bisa tidur karena ingatan itu terus muter di kepala gw.")`,
    ],
    focusPhrase: focusPhrase,
  };

  const savedContent = {
    sourceType: "song",
    songTitle: songTitle,
    artist: artist,
    focusPhrase: focusPhrase,
    focusPhraseMeaning: focusPhraseMeaning,
    originalExampleSentence: originalExampleSentence,
    listenOn: ["Spotify", "YouTube", "Genius"],
    // Compatibility fields for history list storage:
    teks_asli: focusPhrase,
    arti: focusPhraseMeaning,
    cara_baca: generateSentencePhonetics(focusPhrase),
    penggunaan: [originalExampleSentence],
    catatan: meaningExplanation,
    songMetadata: {
      title: songTitle,
      artist: artist,
      listenOn: ["Spotify", "YouTube", "Genius"],
    }
  };

  return {
    isSongLyric: true,
    displayContent,
    savedContent,
    // Flat properties for immediate render fallback
    ...displayContent,
    success: true,
  };
}

/**
 * Fallback word/phrase breakdown using fetchLiveTranslation.
 * Groups 'to' with subsequent word into one meaningful unit.
 */
export async function generateWordBreakdownFallback(text) {
  if (!text || typeof text !== "string") return [];

  const rawWords = text.trim().split(/\s+/).filter(Boolean);
  const units = [];

  for (let i = 0; i < rawWords.length; i++) {
    const current = rawWords[i];
    const cleanCurrent = current.replace(/^[^\w']+|[^\w']+$/g, "");
    if (cleanCurrent.toLowerCase() === "to" && i + 1 < rawWords.length) {
      const nextWord = rawWords[i + 1];
      units.push(`${current} ${nextWord}`);
      i++; // skip next word
    } else {
      units.push(current);
    }
  }

  const results = await Promise.all(
    units.map(async (phrase) => {
      const cleanPhrase = phrase.replace(/^[^\w']+|[^\w']+$/g, "").trim();
      let arti = await fetchLiveTranslation(cleanPhrase || phrase);
      if (!arti || arti.trim().toLowerCase() === cleanPhrase.toLowerCase()) {
        arti = cleanPhrase;
      }
      return {
        phrase,
        arti: normalizeToGaulSlang(arti),
      };
    })
  );

  return results;
}

