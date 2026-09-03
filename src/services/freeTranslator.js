// Free & Robust Translation and Linguistic Analysis Service for Ranglish
// Provides high-accuracy full-sentence Indonesian translation, context analysis,
// idiom breakdown, and Anak Rantau nuance explanations for ANY arbitrary sentence/lyric/dialogue.

import { normalizeToGaulSlang, isSongInput } from '../utils/textClassifier.js';
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

  // LANGKAH 1 — Validasi kelayakan input SEBELUM generate contoh:
  // Jika hasil terjemahan KOSONG atau SAMA PERSIS dengan teks aslinya
  // (menandakan Google Translate / MyMemory tidak mengenali kata/frasa tersebut atau input acak/typo)
  const isUnrecognized =
    !liveTranslation ||
    liveTranslation.trim().length === 0 ||
    liveTranslation.toLowerCase().trim() === lower;

  if (isUnrecognized) {
    return {
      arti: 'Kata/frasa ini belum dikenali di database maupun layanan terjemahan. Coba cek lagi ejaannya, atau ini mungkin singkatan/slang yang sangat spesifik.',
      cara_baca: phonetics || text.toLowerCase(),
      penggunaan: [], // JANGAN isi dengan kalimat karangan
      catatan: 'Kalau ini kata yang beneran ada, coba cari dengan ejaan lain, atau kasih konteks kalimat lengkapnya biar lebih akurat.',
      isUnrecognized: true,
      isInstant: false,
      success: true,
    };
  }

  const cleanTranslation = liveTranslation;

  // 2. Identify idioms or key grammatical features
  const detectedIdioms = COMMON_IDIOMS.filter(item => item.regex.test(lower));
  const isLyric = isSongInput(text);

  // Grammatical and contextual classification
  const isQuestion =
    text.endsWith('?') ||
    /^(what|why|how|where|when|who|which|whose|whom|is|are|am|was|were|do|does|did|can|could|will|would|should|may|might|have|has|had)\b/i.test(text);

  const isActionOrImperative =
    /^(please\s+)?(hug|help|tell|let|make|give|take|call|listen|look|wait|stop|try|come|go|bring|show|ask|remember|forget|keep|hold|send|check|find|leave|stand|wake|run)\b/i.test(text);

  const isNounOrAdjPhrase =
    /^(a|an|the|my|your|his|her|our|their|this|that|these|those|pretty|beautiful|handsome|good|bad|sweet|cute|little|big|small|old|new|hot|cold|warm|fresh|best|great)\b/i.test(text) &&
    !isQuestion &&
    !isActionOrImperative;

  const isEmotional =
    /feel|love|hate|heart|cry|pain|hurt|miss|sad|happy|afraid|scared|worried|anxious|lonely|tired|broken|tears/i.test(lower) ||
    /cinta|sayang|sedih|rindu|takut|minder|kecewa|sakit|nangis|rapuh/i.test(cleanTranslation.toLowerCase());

  let examples = [];
  let note = '';

  // LANGKAH 2 & 3: Generator kalimat contoh kontekstual & catatan spesifik
  if (detectedIdioms.length > 0) {
    const mainIdiom = detectedIdioms[0];
    examples = [
      `"Did you hear the news earlier? It really ${mainIdiom.key} a bit." ("Lu udah denger beritanya tadi? Itu beneran ${mainIdiom.arti} dikit.")`,
      `"Take a deep breath and stay calm; don't let this situation ${mainIdiom.key}." ("Tarik napas panjang dan tetep tenang; jangan biarin situasi ini ${mainIdiom.arti}.")`,
      `"Everyone was caught off guard, but they managed to handle it without letting it ${mainIdiom.key} too much." ("Semua orang sempet kaget, tapi mereka bisa ngatasinnya tanpa bikin situasi ${mainIdiom.arti} kejauhan.")`,
    ];
    note = `Frasa ini mengandung idiom populer: "${mainIdiom.key}" yang bermakna "${mainIdiom.arti}". ${mainIdiom.penjelasan} Sangat sering dipakai dalam percakapan kasual maupun profesional santai.`;
  } else if (isLyric) {
    examples = [
      `"Whenever this part of the track plays, '${text}' always feels so relatable." ("Tiap kali bagian lagu ini keputer, lirik '${cleanTranslation}' selalu kerasa 'ngena' banget.")`,
      `"I wrote down that meaningful line from the verse: '${text}'" ("Gw nyatet bait yang penuh makna dari lirik itu: '${cleanTranslation}'")`,
      `"The acoustic rendition highlights '${text}' beautifully." ("Versi akustiknya bikin penggalan '${cleanTranslation}' kedengeran makin dalam di hati.")`,
    ];
    note = `Kutipan ini terdeteksi sebagai penggalan lirik lagu puitis. Struktur bahasanya berfokus pada estetika emosi dan suasana hati pembicara. Di obrolan santai, lu bisa pakai frasa intinya buat melukiskan perasaan jujur ke temen dekat.`;
  } else if (isQuestion) {
    examples = [
      `A: "${text}"\nB: "Honestly, I haven't even thought that far yet." (A: "${cleanTranslation}" / B: "Jujur, gw bahkan belum mikir sejauh itu.")`,
      `"If you're still in doubt, just ask them directly: '${text}'" ("Kalo lu masih ragu, tanya langsung aja ke mereka: '${cleanTranslation}'")`,
      `"Before we finalize the plan, let's clarify: '${text}'" ("Sebelum kita finalin rencananya, coba kita pastiin dulu: '${cleanTranslation}'")`,
    ];
    note = `Bentuk kalimat tanya langsung yang kasual dan lugas. Cocok dipakai dalam percakapan sehari-hari saat lu butuh konfirmasi cepat atau membuka obrolan akrab tanpa terkesan kaku.`;
  } else if (isActionOrImperative) {
    examples = [
      `"When she was feeling overwhelmed after a long day, she just asked: '${text}.'" ("Pas dia lagi ngerasa capek banget abis seharian beraktivitas, dia cuma bilang: '${cleanTranslation}.'")`,
      `"Don't hesitate to say '${text}' whenever you feel like you need some support." ("Jangan sungkan buat bilang '${cleanTranslation}' tiap kali lu ngerasa butuh dukungan.")`,
      `"Sometimes a simple expression like '${text}' is all that someone needs to hear." ("Kadang ungkapan sederhana kayak '${cleanTranslation}' udah lebih dari cukup buat bikin tenang.")`,
    ];
    note = `Ungkapan ekspresif berbentuk kalimat aksi atau ajakan langsung. Dalam pergaulan santai atau hubungan akrab, gaya bahasa seperti ini terasa hangat, tulus, dan tidak berbelit-belit.`;
  } else if (isNounOrAdjPhrase) {
    examples = [
      `"He spoke with a proud smile whenever someone mentioned his ${text}." ("Dia selalu senyum bangga tiap kali ada yang ngebahas soal ${cleanTranslation}-nya.")`,
      `"Having a ${text} around really brings a warm and positive atmosphere." ("Punya ${cleanTranslation} di sekitar bener-bener bawa suasana yang hangat dan positif.")`,
      `"They took a picture together, and everyone complimented his ${text}." ("Mereka foto bareng, dan semua orang takjub ngeliat ${cleanTranslation}-nya.")`,
    ];
    note = `Frasa ini merupakan frasa kata benda atau deskriptif (noun/adjective phrase). Umum dipakai dalam obrolan sehari-hari buat memuji, mendeskripsikan seseorang/sesuatu, atau menonjolkan kualitas positif secara natural.`;
  } else if (isEmotional) {
    examples = [
      `"Whenever the pressure gets intense at work, I honestly ${text}." ("Tiap kali tekanan lagi tinggi-tingginya di tempat kerja, jujur gw ${cleanTranslation}.")`,
      `"It takes real maturity to admit that you ${text} instead of pretending everything is fine." ("Butuh kedewasaan buat ngakuin kalo lu ${cleanTranslation} daripada pura-pura semua baik-baik aja.")`,
      `"Talk to someone you trust if you ever ${text}; you don't have to carry it all alone." ("Cerita ke temen yang lu percaya kalo lu ngerasa ${cleanTranslation}; lu gak harus nanggung sendirian.")`,
    ];
    note = `Kalimat ini melukiskan suasana batin atau emosi personal. Native speaker sering memakainya pas lagi curhat santai (*heart-to-heart talk*) buat mengomunikasikan perasaan secara jujur tanpa gengsi.`;
  } else {
    // General Statement / Dialogue (Diverse variants)
    const variants = [
      [
        `"We sat down and talked it through, and we realized that ${text}." ("Kita duduk bareng dan ngobrolin masalahnya, terus kita sadar kalo ${cleanTranslation}.)"`,
        `"To be completely honest with you, I think ${text}." ("Biar jujur apa adanya sama lu, menurut gw ${cleanTranslation}.)"`,
        `"Take your time and keep in mind: ${text}." ("Pelan-pelan aja dan inget baik-baik: ${cleanTranslation}.)"`,
      ],
      [
        `"In situations like this, it is very common that ${text}." ("Di situasi kayak gini, wajar banget kalo ${cleanTranslation}.)"`,
        `"My friend reminded me yesterday: '${text}.'" ("Temen gw kemarin ngingetin: '${cleanTranslation}.'")`,
        `"Once you understand the context, you see why ${text}." ("Begitu lu paham konteksnya, lu bakal ngerti kenapa ${cleanTranslation}.)"`,
      ],
    ];
    const pickIndex = (text.length + text.charCodeAt(0)) % variants.length;
    examples = variants[pickIndex];
    note = text.split(/\s+/).length >= 5
      ? `Kalimat pernyataan lengkap yang luwes dipakai dalam diskusi santai maupun tulisan personal buat menyampaikan gagasan atau fakta secara jelas dan terstruktur.`
      : `Frasa percakapan ringkas yang sangat alami dipakai dalam obrolan sehari-hari. Struktur kalimatnya to the point dan mudah dipadukan dengan kata lain.`;
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

  // LANGKAH 4: Generate contextual original example sentence (NOT static shook up)
  const focusLower = focusPhrase.toLowerCase();
  let originalExampleSentence = "";
  if (detectedIdioms.length > 0) {
    const idm = detectedIdioms[0];
    originalExampleSentence = `Take a deep breath; don't let this unexpected situation ${idm.key} too much. (Tarik napas panjang; jangan biarin situasi tak terduga ini bikin ${idm.arti} kejauhan.)`;
  } else if (/feel|small|down|sad|alone|cry|hurt|numb/i.test(focusLower)) {
    originalExampleSentence = `Whenever work gets exhausting, it's completely normal to ${focusPhrase} for a while. (Tiap kali kerjaan lagi capek banget, wajar kok kalo lu sempet ${focusPhraseMeaning} sebentar.)`;
  } else if (/love|heart|care|miss|kiss|lips|stay|hold/i.test(focusLower)) {
    originalExampleSentence = `She smiled warmly and proved that she would always ${focusPhrase}. (Dia senyum tulus dan ngebuktiin kalo dia bakal selalu ${focusPhraseMeaning}.)`;
  } else if (/run|walk|away|leave|go|time|night/i.test(focusLower)) {
    originalExampleSentence = `Before making a rushed decision, don't just ${focusPhrase} without talking it through. (Sebelum buru-buru ambil keputusan, jangan langsung ${focusPhraseMeaning} tanpa diobrolin dulu.)`;
  } else {
    originalExampleSentence = `In everyday conversations, you can naturally use "${focusPhrase}" when expressing how you feel. (Di percakapan sehari-hari, lu bisa wajar memakai "${focusPhrase}" pas lagi ngungkapin perasaan lu.)`;
  }

  // 5. Emotional meaning explanation
  const meaningExplanation = `Lirik ini membawa nuansa emosional mendalam yang melukiskan suasana hati atau refleksi batin. Di obrolan sehari-hari, lu bisa pakai frasa intinya ("${focusPhrase}") buat ngungkapin perasaan jujur ke temen dekat tanpa terdengar kaku.`;

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
      `"Whenever you feel that way, remember you don't have to face it all by yourself." ("Tiap kali lu ngerasa kayak gitu, inget kalo lu gak harus ngadepin semuanya sendirian.")`,
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

