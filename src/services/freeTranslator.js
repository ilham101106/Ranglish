// Free & Robust Translation and Linguistic Analysis Service for Ranglish
// Provides high-accuracy full-sentence Indonesian translation, context analysis,
// idiom breakdown, and Anak Rantau nuance explanations for ANY arbitrary sentence/lyric/dialogue.

import { normalizeToGaulSlang, isSongInput } from '../utils/textClassifier.js';
import { generateSentencePhonetics } from '../utils/sentenceTranslator.js';

/**
 * Fetch high-accuracy sentence translation using open endpoints with dual fallback.
 * Backward compatible: returns clean translated string.
 */
export async function fetchLiveTranslation(text) {
  const details = await fetchDualTranslationDetails(text);
  return details.translation;
}

/**
 * STANDAR 1: Cross-verifies translation from both Google Translate GTX and MyMemory API.
 * Returns { translation, confidence, gtx, myMemory } for deep linguistic validation.
 */
export async function fetchDualTranslationDetails(text) {
  const clean = text.trim();
  if (!clean) return { translation: '', confidence: 'low', gtx: '', myMemory: '' };

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
    } catch {
      clearTimeout(timeoutId);
    }
    return '';
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
    } catch {
      clearTimeout(timeoutId);
    }
    return '';
  };

  const [gtxRes, myMemRes] = await Promise.all([fetchGoogleGTX(), fetchMyMemory()]);
  const gtx = gtxRes || '';
  const myMem = myMemRes || '';

  let translation = gtx || myMem || '';
  let confidence = 'low';

  if (gtx && myMem) {
    const gtxNorm = gtx.toLowerCase().trim();
    const myMemNorm = myMem.toLowerCase().trim();
    if (gtxNorm === myMemNorm) {
      confidence = 'high';
      translation = gtx;
    } else {
      const gtxWords = new Set(gtxNorm.split(/\s+/));
      const hasOverlap = myMemNorm.split(/\s+/).some(w => gtxWords.has(w) && w.length > 2);
      if (hasOverlap) {
        confidence = 'high';
        translation = gtx;
      } else {
        confidence = 'medium';
        translation = gtx;
      }
    }
  } else if (gtx || myMem) {
    confidence = 'medium';
  }

  return {
    translation,
    confidence,
    gtx,
    myMemory: myMem,
  };
}

/**
 * Idiom & Phrasal Verb Dictionary with historical etymology,
 * register notes, and verified 3-situation examples.
 */
const COMMON_IDIOMS = [
  {
    regex: /\bpiece of cake\b/i,
    key: 'piece of cake',
    arti: 'gampang banget / enteng kayak makan kue',
    asalUsul: 'Berasal dari tradisi perlombaan "cakewalk" di abad ke-19, di mana peserta yang menang mendapatkan kue besar dengan usaha yang relatif mudah dan santai.',
    penjelasan: 'Dipakai buat menggambarkan tugas, pekerjaan, atau ujian yang sangat mudah diselesaikan tanpa hambatan.',
    situasi: [
      `"Don't stress over tomorrow's math quiz; as long as you reviewed the formulas, it will be a piece of cake." ("Gak usah cemas mikirin kuis matematika besok; selama lu udah ngulang rumusnya, itu bakal gampang banget.")`,
      `"Fixing this navigation bug turned out to be a piece of cake for the senior developer." ("Benerin bug navigasi ini ternyata enteng banget buat developer senior itu.")`,
      `"A: 'Can we assemble this desk before lunch?' — B: 'Totally, it's a piece of cake!' (A: 'Bisa gak kita rakit meja ini sebelum makan siang?' — B: 'Bisa banget lah, itu mah enteng kayak makan kue!')"`,
    ]
  },
  {
    regex: /\bbreak a leg\b/i,
    key: 'break a leg',
    arti: 'semoga sukses / selamat tampil (ucapan penyemangat)',
    asalUsul: 'Berasal dari takhayul dunia teater zaman dulu: orang percaya kalau mengucapkan "good luck" langsung malah membawa sial, jadi mereka membalikkan ucapannya menjadi "break a leg".',
    penjelasan: 'Ucapan khas sebelum seseorang naik panggung, tampil presentasi, atau ikut audisi penting.',
    situasi: [
      `"I know you've practiced for weeks, so go out there and break a leg!" ("Gw tahu lu udah latihan berminggu-minggu, jadi maju ke panggung dan tampilkan yang terbaik!")`,
      `"Before stepping into the boardroom for his pitch, his team texted: 'Break a leg, mate!' ("Sebelum masuk ruang rapat buat presentasi proyek, timnya nge-chat: 'Semoga sukses besar, bro!')")`,
      `"She took a deep breath behind the curtains as the director whispered: 'Break a leg!' ("Dia narik napas panjang di balik tirai panggung pas sutradaranya berbisik: 'Tampil yang memukau ya!'")"`,
    ]
  },
  {
    regex: /\bcold turkey\b/i,
    key: 'cold turkey',
    arti: 'berhenti total secara mendadak dari kebiasaan buruk',
    asalUsul: 'Berasal dari deskripsi fisik orang yang berhenti kecanduan mendadak: kulitnya merinding dingin dan pucat menyerupai daging kalkun mentah.',
    penjelasan: 'Dipakai saat seseorang menghentikan kebiasaan adiktif (merokok, scrolling medsos berjam-jam, ngopi berlebih) secara langsung 100%, bukan bertahap.',
    situasi: [
      `"He realized social media was draining his focus, so he decided to quit cold turkey." ("Dia sadar medsos bikin fokusnya berantakan, jadi dia mutusin buat berhenti total seketika.")`,
      `"Quitting smoking cold turkey isn't easy, but his determination paid off." ("Berhenti ngerokok secara langsung sekaligus itu emang gak gampang, tapi tekad kuatnya beneran membuahkan hasil.")`,
      `"I used to drink five cups of coffee a day until I went cold turkey last month." ("Dulu gw biasa minum lima cangkir kopi sehari sampe akhirnya gw stop total bulan lalu.")"`,
    ]
  },
  {
    regex: /\bhit the sack\b/i,
    key: 'hit the sack',
    arti: 'pergi tidur / rebahan karena tepar',
    asalUsul: 'Berasal dari zaman dulu ketika kasur tidur rakyat jelata terbuat dari karung goni (sack) yang diisi jerami.',
    penjelasan: 'Slang kasual yang sangat populer saat tubuh sudah kelelahan dan ingin segera tidur.',
    situasi: [
      `"It's already past midnight and my eyes are heavy, I think I'm gonna hit the sack." ("Udah lewat tengah malam dan mata gw udah berat banget, kayaknya gw mau langsung tidur.")`,
      `"After working overtime to finish the sprint, the whole engineering team was ready to hit the sack." ("Abis lembur nyelesaiin sprint kerjaan, seluruh tim engineer udah siap buat langsung tepar di kasur.")`,
      `"A: 'Wanna play one more game?' — B: 'Nah bro, I have an early meeting tomorrow, time to hit the sack.' (A: 'Mau main satu ronde lagi gak?' — B: 'Gak dulu bro, besok gw ada meeting pagi, waktunya tidur.')"`,
    ]
  },
  {
    regex: /\bunder the weather\b/i,
    key: 'under the weather',
    arti: 'lagi gak enak badan / meriang / kurang fit',
    asalUsul: 'Istilah maritim pelaut zaman dulu: ketika badai menerpa, penumpang yang mabuk laut disuruh turun ke bawah geladak agar terlindung dari cuaca buruk (literally under the weather).',
    penjelasan: 'Cara sopan dan natural untuk mengabarkan bahwa kondisi tubuh sedang kurang sehat tanpa harus merinci penyakit.',
    situasi: [
      `"I won't be able to make it to lunch today because I'm feeling a bit under the weather." ("Gw kayaknya gak bisa ikut makan siang hari ini karena badan gw lagi agak kurang fit.")`,
      `"She sent a quick email to her manager saying she was under the weather and needed rest." ("Dia ngirim email singkat ke managernya ngabarin kalo dia lagi meriang dan butuh istirahat.")`,
      `"Take some warm tea and rest up; you look a little under the weather today." ("Minum teh hangat terus istirahat gih; muka lu kelihatan agak pucat dan kurang enak badan hari ini.")"`,
    ]
  },
  {
    regex: /\bclose call\b/i,
    key: 'close call',
    arti: 'nyaris celaka / tipis banget selamatnya',
    asalUsul: 'Berasal dari dunia wasit olahraga abad ke-19, di mana keputusan yang sangat tipis jaraknya disebut "a close call".',
    penjelasan: 'Digunakan saat seseorang baru saja terhindar dari bahaya atau kegagalan dengan selisih yang sangat tipis.',
    situasi: [
      `"The speeding car missed my bike by mere inches—man, that was a close call!" ("Mobil ngebut itu nyaris banget nabrak motor gw selisih beberapa senti—asli, itu tipis banget selamatnya!")`,
      `"We submitted the pitch deck with just two minutes left before deadline, what a close call!" ("Kita submit berkas presentasinya pas sisa dua menit sebelum deadline, beneran deg-degan nyaris telat!")`,
      `"A: 'Did you get caught by the rain?' — B: 'Nope, I made it inside right as it poured, very close call!' (A: 'Lu sempet kehujanan gak?' — B: 'Enggak, pas gw masuk rumah pas hujannya tumpah, tipis banget!')"`,
    ]
  },
  {
    regex: /\blook forward to\b/i,
    key: 'look forward to',
    arti: 'gak sabar nungguin / sangat antusias menanti',
    asalUsul: 'Phrasal verb di mana kata "to" berfungsi sebagai preposisi (sehingga wajib diikuti kata benda atau Verb-ing).',
    penjelasan: 'Frasa ramah dan positif yang lazim dipakai di akhir email resmi maupun obrolan rencana liburan.',
    situasi: [
      `"I'm really looking forward to meeting your family this weekend." ("Gw beneran udah gak sabar pengen ketemu keluarga lu akhir pekan ini.")`,
      `"Thank you for the productive interview; I look forward to hearing from you soon." ("Terima kasih atas wawancara yang produktif ini; saya sangat menantikan kabar baik dari Anda segera.")`,
      `"After three months of intense coding, the team is looking forward to taking a well-deserved vacation." ("Abis tiga bulan ngoding intens, tim udah gak sabar banget buat liburan yang memuaskan.")"`,
    ]
  },
  {
    regex: /\bfigure(?:\s+\w+)?\s+out\b/i,
    key: 'figure out',
    arti: 'mencari jalan keluar / memecahkan atau memahami masalah',
    asalUsul: 'Dari kata "figure" (angka/hitung) di abad ke-19 yang bermakna menghitung kalkulasi matematis sampai menemukan solusinya.',
    penjelasan: 'Sangat sering digunakan saat proses berpikir memecahkan teka-teki, masalah teknis, atau memahami motif seseorang.',
    situasi: [
      `"It took us three hours to figure out why the server kept disconnecting." ("Butuh waktu tiga jam buat kita nemuin kenapa servernya terus-terusan putus koneksi.")`,
      `"Don't worry if things seem confusing right now, we will figure it out together." ("Gak usah panik kalo sekarang kelihatan rumit, kita bakal cari jalan keluarnya bareng-bareng.")`,
      `"A: 'Did you understand his reaction?' — B: 'Honestly, I still can't figure out why he was so upset.' (A: 'Lu ngerti gak kenapa dia bereaksi gitu?' — B: 'Jujur, gw masih belum bisa paham kenapa dia bisa semarah itu.')"`,
    ]
  },
  {
    regex: /\bgive up\b/i,
    key: 'give up',
    arti: 'menyerah / pasrah / berhenti mencoba',
    asalUsul: 'Phrasal verb klasik bahasa Inggris yang melukiskan penyerahan kendali atau penghentian perjuangan.',
    penjelasan: 'Bisa dipakai untuk menyerah dari perjuangan, atau menghentikan kebiasaan.',
    situasi: [
      `"No matter how steep the learning curve is, promise me you won't give up." ("Gimanapun susahnya proses belajarnya, janji sama gw lu gak bakal nyerah.")`,
      `"He worked on that mobile application for a year and refused to give up until it launched." ("Dia ngerjain aplikasi itu selama setahun dan nolak buat nyerah sampe beneran berhasil rilis.")`,
      `"A: 'The gym workout is killing me!' — B: 'Push through the last set, don't give up now!' (A: 'Latihan gym-nya bikin remuk badan gw!' — B: 'Kuatkan diri buat set terakhir, jangan nyerah sekarang!')"`,
    ]
  },
  {
    regex: /\bshake(?:\s+\w+)?\s+up\b/i,
    key: 'shake (someone) up',
    arti: 'bikin kaget, terguncang secara emosional, atau goyah ketenangannya',
    asalUsul: 'Metafora dari benda yang dikocok keras sehingga isi di dalamnya goyah dan tidak stabil.',
    penjelasan: 'Dipakai saat ada kejadian mendadak atau kabar mengejutkan yang mengguncang mental/emosi seseorang.',
    situasi: [
      `"Did you hear the loud thud outside last night? It shook me up a bit." ("Lu denger suara dentuman keras di luar semalem gak? Itu sempet bikin gw kaget dan goyah dikit.")`,
      `"Take a deep breath and stay calm; don't let this sudden news shake you up." ("Tarik napas panjang dan tetep tenang; jangan biarin berita mendadak itu bikin mental lu goyah.")`,
      `"The near-accident really shook him up, but thankfully he walked away uninjured." ("Kejadian nyaris celaka itu beneran bikin dia syok berat, tapi syukurlah dia selamat tanpa luka sedikitpun.")"`,
    ]
  },
  {
    regex: /\bspill the beans\b/i,
    key: 'spill the beans',
    arti: 'bocorin rahasia tanpa sengaja',
    asalUsul: 'Berasal dari proses voting rahasia Yunani Kuno: pemilih menjatuhkan kacang ke dalam toples. Jika toplesnya tumpah ("spill the beans"), rahasia hasil voting langsung ketahuan sebelum waktunya.',
    penjelasan: 'Slang kasual yang sangat umum saat rahasia atau kejutan terlanjur bocor.',
    situasi: [
      `"We planned a surprise party for Sarah, but her brother accidentally spilled the beans." ("Kita udah ngerencanain pesta kejutan buat Sarah, tapi kakaknya malah gak sengaja ngebocorin rahasianya.")`,
      `"Don't tell Kevin about the startup idea yet; he's notorious for spilling the beans." ("Jangan cerita ide startup ini ke Kevin dulu; dia terkenal suka ember dan gampang bocorin rahasia.")`,
      `"A: 'How did she find out about the bonus?' — B: 'Someone in HR must have spilled the beans.' (A: 'Kok dia bisa tahu soal bonus itu?' — B: 'Pasti ada orang HR yang gak sengaja bocorin rahasianya.')"`,
    ]
  }
];

/**
 * Helper to detect if translation is just a letter-by-letter echo/transliteration without meaning.
 */
function isTransliterationEcho(text, translation) {
  const t1 = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  const t2 = translation.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!t2 || t1 === t2) return true;
  if (Math.abs(t1.length - t2.length) <= 2 && t1.length > 5) {
    let diff = 0;
    const minLen = Math.min(t1.length, t2.length);
    for (let i = 0; i < minLen; i++) {
      if (t1[i] !== t2[i]) diff++;
    }
    diff += Math.abs(t1.length - t2.length);
    if (diff <= 2) return true;
  }
  return false;
}

/**
 * Generate rich, informative, educational analysis for ANY arbitrary sentence, lyric, or dialogue.
 * Satisfies 4 strict quality standards:
 * - Standar 1: Cross-verified translation & idiom meaning priority
 * - Standar 2: Grammatically correct examples across 3 distinct situations
 * - Standar 3: Insightful, non-generic notes with cultural/etymological nuance
 * - Standar 4: Confidence level tracking ('high' | 'medium' | 'low')
 */
export async function generateRichSentenceAnalysis(rawText) {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const phonetics = generateSentencePhonetics(text);

  // 1. Check for known idioms FIRST (STANDAR 1.2: Prioritize idiom accuracy over literal machine translation)
  const detectedIdioms = COMMON_IDIOMS.filter(item => item.regex.test(lower));
  const isKnownIdiom = detectedIdioms.length > 0;

  // 2. Fetch dual translation with cross-verification
  const { translation: liveTranslation, confidence: dualConfidence, myMemory: myMemTranslation } = await fetchDualTranslationDetails(text);

  // STANDAR 1.3: Transliteration / Echo check / Unrecognized input
  // If no translation returned, or returned translation is an echo of original text (and not an idiom)
  const isMyMemEcho = myMemTranslation && myMemTranslation.toLowerCase().trim() === lower;
  const isEchoOrEmpty =
    (!liveTranslation ||
      liveTranslation.trim().length === 0 ||
      liveTranslation.toLowerCase().trim() === lower ||
      (isMyMemEcho && isTransliterationEcho(lower, liveTranslation)) ||
      isTransliterationEcho(lower, liveTranslation)) &&
    !isKnownIdiom;

  if (isEchoOrEmpty) {
    return {
      arti: 'Kata/frasa ini belum dikenali di database maupun layanan terjemahan. Coba cek lagi ejaannya, atau ini mungkin singkatan/slang yang sangat spesifik.',
      cara_baca: phonetics || text.toLowerCase(),
      penggunaan: [],
      catatan: 'Kalau ini kata yang beneran ada, coba cari dengan ejaan lain, atau kasih konteks kalimat lengkapnya biar lebih akurat.',
      confidenceLevel: 'low',
      isUnrecognized: true,
      isInstant: false,
      success: true,
    };
  }

  // Determine final meaning and confidence
  let cleanTranslation = liveTranslation;
  let finalConfidence = dualConfidence;

  if (isKnownIdiom) {
    // Override machine translation with rich idiomatic meaning
    cleanTranslation = detectedIdioms[0].arti;
    finalConfidence = 'high';
  }

  const isLyric = isSongInput(text);

  // Grammatical & semantic type detectors
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

  // STANDAR 2 & 3: Contextual examples (3 distinct situations) & insightful note
  if (isKnownIdiom) {
    const mainIdiom = detectedIdioms[0];
    if (mainIdiom.situasi && mainIdiom.situasi.length >= 3) {
      examples = mainIdiom.situasi;
    } else {
      examples = [
        `"Don't worry about this project; as long as we focus, it will be ${mainIdiom.key}." ("Gak usah cemas soal proyek ini; selama kita fokus, itu bakal ${mainIdiom.arti}.")`,
        `"The team managed to solve the crisis quickly, making it look like ${mainIdiom.key}." ("Tim berhasil nyelesaiin krisis itu dengan cepat, bikin kelihatannya jadi ${mainIdiom.arti}.")`,
        `"A: 'How was the interview?' — B: 'Honestly, it went smoothly and felt like ${mainIdiom.key}!' (A: 'Gimana wawancaranya?' — B: 'Jujur, lancar banget dan rasanya ${mainIdiom.arti}!')"`,
      ];
    }
    const etymology = mainIdiom.asalUsul ? ` ${mainIdiom.asalUsul}` : '';
    note = `Ungkapan ini adalah idiom otentik: "${mainIdiom.key}" yang artinya "${mainIdiom.arti}".${etymology} ${mainIdiom.penjelasan}`;
  } else if (isLyric) {
    examples = [
      `"Whenever this part of the track plays, '${text}' always feels so relatable." ("Tiap kali bagian lagu ini keputer, lirik '${cleanTranslation}' selalu kerasa ngena banget di hati.")`,
      `"I wrote down that meaningful line from the verse: '${text}'" ("Gw nyatet bait yang penuh makna dari lirik itu: '${cleanTranslation}'")`,
      `"The acoustic rendition highlights '${text}' beautifully." ("Versi akustiknya bikin penggalan '${cleanTranslation}' kedengeran makin dalam dan menyentuh.")`,
    ];
    note = `Kutipan ini bergaya lirik musik puitis. Penekanannya ada pada ekspresi rasa dan estetika bahasa. Di obrolan santai, lu bisa pakai penggalan frasa intinya buat melukiskan perasaan jujur ke temen dekat.`;
  } else if (isQuestion) {
    // 3 distinct situations for questions
    examples = [
      `"A: '${text}' — B: 'Honestly, I haven't even thought that far yet.'" ("A: '${cleanTranslation}' — B: 'Jujur, gw bahkan belum mikir sejauh itu.'")`,
      `"During the team retrospective, the manager asked: '${text}'" ("Pas sesi evaluasi tim, sang manajer bertanya: '${cleanTranslation}'")`,
      `"Before we sign the final agreement, let's make sure: '${text}'" ("Sebelum kita tanda tangan kesepakatan final, coba kita pastiin dulu: '${cleanTranslation}'")`,
    ];
    note = `Kalimat tanya langsung (direct question) yang santun dan terbuka. Berfungsi mengundang sudut pandang lawan bicara secara inklusif tanpa terkesan menginterogasi, baik dalam obrolan santai maupun meeting kerjaan.`;
  } else if (isActionOrImperative) {
    // 3 distinct situations for imperatives
    examples = [
      `"After receiving the difficult news, she took a deep breath and said: '${text}.'" ("Abis denger kabar berat itu, dia narik napas panjang dan bilang: '${cleanTranslation}.'")`,
      `"Don't hesitate to say '${text}' whenever you feel like you need some comfort." ("Jangan sungkan buat bilang '${cleanTranslation}' tiap kali lu ngerasa butuh ditenangin.")`,
      `"Before leaving the house for a long trip, he turned around and said: '${text}.'" ("Sebelum berangkat perjalanan jauh, dia noleh ke belakang dan bilang: '${cleanTranslation}.'")`,
    ];
    note = `Ungkapan berbentuk kalimat ajakan atau aksi langsung (direct imperative). Sifatnya sangat hangat dan intim, sehingga paling tepat diucapkan dalam lingkaran hubungan yang sudah akrab (teman dekat, keluarga, atau pasangan).`;
  } else if (isNounOrAdjPhrase) {
    // 3 distinct situations for noun phrases
    examples = [
      `"He spoke with a proud smile whenever someone asked about his ${text}." ("Dia selalu cerita dengan senyum bangga tiap kali ada yang nanya soal ${cleanTranslation}-nya.")`,
      `"Having such a ${text} around really brings a warm and positive atmosphere to our home." ("Punya ${cleanTranslation} di sekitar bener-bener bawa suasana yang hangat dan positif ke rumah kita.")`,
      `"At the gathering, everyone warmly congratulated him on his wonderful ${text}." ("Di acara kumpul itu, semua orang dengan hangat ngucapin selamat atas ${cleanTranslation}-nya yang luar biasa.")`,
    ];
    note = `Frasa ini merupakan frasa kata benda deskriptif (descriptive noun phrase) yang menggabungkan kata sifat dan kata benda. Lazim digunakan dalam komunikasi sehari-hari buat mengapresiasi atau mendeskripsikan seseorang/sesuatu secara natural dan positif.`;
  } else if (isEmotional) {
    // 3 distinct situations for emotional expressions
    examples = [
      `"Whenever the workload becomes overwhelming, I honestly ${text}." ("Tiap kali beban kerjaan numpuk parah, jujur gw ${cleanTranslation}.")`,
      `"It takes real maturity to admit that you ${text} instead of keeping it all bottled up." ("Butuh kedewasaan buat ngakuin kalo lu ${cleanTranslation} daripada dipendem sendiri terus-terusan.")`,
      `"Talk to a trusted friend whenever you ${text}; you don't have to navigate life's hurdles alone." ("Cerita ke temen yang lu percaya tiap kali lu ngerasa ${cleanTranslation}; lu gak harus lewatin rintangan hidup sendirian.")`,
    ];
    note = `Ungkapan ini merefleksikan suasana batin atau kerentanan emosional (vulnerability). Biasa dipakai dalam percakapan mendalam (heart-to-heart talk) untuk menyampaikan perasaan jujur apa adanya tanpa gengsi.`;
  } else {
    // 3 distinct situations for general statements
    examples = [
      `"During our coffee break, my mentor pointed out: '${text}.'" ("Pas lagi ngopi santai, mentor gw ngingetin: '${cleanTranslation}.'")`,
      `"Looking at the situation objectively, it is clear that ${text}." ("Melihat situasinya secara objektif, kelihatan jelas kalo ${cleanTranslation}.")`,
      `"Whenever things don't go as planned, always remember that ${text}." ("Tiap kali ada hal yang gak berjalan sesuai rencana, selalu inget kalo ${cleanTranslation}.")`,
    ];
    note = text.split(/\s+/).length >= 5
      ? `Kalimat pernyataan lengkap yang terstruktur. Luwes digunakan dalam komunikasi lisan maupun tulisan buat menyampaikan pemikiran, fakta, atau argumen secara jelas dan percaya diri.`
      : `Frasa percakapan ringkas yang sangat alami dipakai dalam obrolan sehari-hari. Berfungsi sebagai unit makna siap pakai yang mudah digabungkan dengan konteks kalimat lain.`;
  }

  return {
    arti: cleanTranslation,
    cara_baca: phonetics || text.toLowerCase(),
    penggunaan: examples,
    catatan: note,
    confidenceLevel: finalConfidence,
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

