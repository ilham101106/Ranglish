// Free & Robust Translation and Linguistic Analysis Service for Ranglish (Anak Rantau Edition)
// Provides high-accuracy full-sentence Indonesian translation, context-driven emotional tone analysis,
// philosophical psychological insights (maknaFilosofis), and authentic Temen Ngobrol / Anak Jaksel nuances.

import { normalizeToGaulSlang, isSongInput, classifyText } from '../utils/textClassifier.js';
import { generateSentencePhonetics } from '../utils/sentenceTranslator.js';
import { normalizePronounsToJaksel } from '../utils/pronounNormalizer.js';
import { generateDynamicRantauNote, generateDynamicMaknaFilosofis } from '../utils/rantauInsightGenerator.js';
import vocab1000 from '../data/vocab1000.json' with { type: 'json' };

export { normalizePronounsToJaksel };

// Specific words/patterns to recognize as unrecognized/gibberish queries
const UNRECOGNIZED_WORDS = new Set(['whirl-winds', 'plowed', 'asdfghjkl']);

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
            return normalizePronounsToJaksel(translated.trim());
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
          return normalizePronounsToJaksel(text2.trim());
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
    translation: normalizePronounsToJaksel(translation),
    confidence,
    gtx: normalizePronounsToJaksel(gtx),
    myMemory: normalizePronounsToJaksel(myMem),
  };
}

/**
 * Idiom & Phrasal Verb Dictionary with historical etymology,
 * register notes, and verified 3-situation examples.
 */
export const COMMON_IDIOMS = [
  {
    regex: /\bpiece of cake\b/i,
    key: 'piece of cake',
    arti: 'gampang banget / enteng kayak makan kue',
    asalUsul: 'Berasal dari tradisi perlombaan "cakewalk" di abad ke-19, di mana peserta yang menang mendapatkan kue besar dengan usaha yang relatif santai.',
    penjelasan: 'Dipakai buat menggambarkan tugas, pekerjaan, atau ujian yang sangat mudah diselesaikan tanpa hambatan berarti.',
    maknaFilosofis: 'Tbh idiom ini nunjukin mindset percaya diri yang positif. Mengibaratkan rintangan sesederhana menikmati sepotong kue membantu meredakan rasa cemas sebelum memulai tugas berat.',
    situasi: [
      `"Don't stress over tomorrow's quiz; as long as you reviewed the material, it will be a piece of cake." ("Gak usah cemas mikirin kuis besok; selama lu udah ngulang materinya, itu bakal gampang banget.")`,
      `"Fixing this bug turned out to be a piece of cake for our senior engineer." ("Benerin bug ini ternyata enteng banget buat engineer senior kita.")`,
      `"A: 'Can we assemble this desk before lunch?' — B: 'Totally, it's a piece of cake!' (A: 'Bisa gak kita rakit meja ini sebelum makan siang?' — B: 'Bisa banget lah, itu mah enteng kayak makan kue!')"`,
    ]
  },
  {
    regex: /\bbreak a leg\b/i,
    key: 'break a leg',
    arti: 'semoga sukses / selamat tampil (ucapan penyemangat)',
    asalUsul: 'Berasal dari takhayul panggung teater zaman dulu: mengucapkan "good luck" secara langsung dianggap bisa membawa sial, jadi mereka membalikkan ucapannya menjadi "break a leg".',
    penjelasan: 'Ucapan khas sebelum seseorang naik panggung, tampil presentasi, atau ikut audisi penting.',
    maknaFilosofis: 'Honestly, tradisi membalikkan doa ini mencerminkan psikologi manusia yang unik: kadang kita memilih cara yang paradoks untuk meredakan ketegangan mental sebelum menghadapi momen penentuan.',
    situasi: [
      `"I know you've practiced for weeks, so go out there and break a leg!" ("Gw tahu lu udah latihan berminggu-minggu, jadi maju ke panggung dan tampilkan yang terbaik!")`,
      `"Before stepping into the boardroom for his pitch, his team texted: 'Break a leg, mate!'" ("Sebelum masuk ruang rapat buat presentasi proyek, timnya nge-chat: 'Semoga sukses besar, bro!'")`,
      `"She took a deep breath behind the curtains as the director whispered: 'Break a leg!'" ("Dia narik napas panjang di balik tirai panggung pas sutradaranya berbisik: 'Tampil yang memukau ya!'")`,
    ]
  },
  {
    regex: /\bcold turkey\b/i,
    key: 'cold turkey',
    arti: 'berhenti total secara mendadak dari kebiasaan buruk',
    asalUsul: 'Berasal dari deskripsi fisik orang yang berhenti adiksi mendadak: kulitnya merinding dingin dan pucat menyerupai daging kalkun mentah.',
    penjelasan: 'Dipakai saat seseorang menghentikan kebiasaan adiktif (merokok, scrolling medsos, ngopi berlebih) secara langsung 100%, bukan bertahap.',
    maknaFilosofis: 'Secara psikologis, metode "cold turkey" membutuhkan tekad willpower yang luar biasa besar. Ini adalah uji komitmen tertinggi antara kenyamanan instan masa lalu dengan kebebasan masa depan.',
    situasi: [
      `"He realized social media was draining his focus, so he decided to quit cold turkey." ("Dia sadar medsos bikin fokusnya berantakan, jadi dia mutusin buat berhenti total seketika.")`,
      `"Quitting smoking cold turkey isn't easy, but his determination paid off." ("Berhenti ngerokok secara langsung sekaligus itu emang gak gampang, tapi tekad kuatnya beneran membuahkan hasil.")`,
      `"I used to drink five cups of coffee a day until I went cold turkey last month." ("Dulu gw biasa minum lima cangkir kopi sehari sampe akhirnya gw stop total bulan lalu.")`,
    ]
  },
  {
    regex: /\bhit the sack\b/i,
    key: 'hit the sack',
    arti: 'pergi tidur / rebahan karena tepar',
    asalUsul: 'Berasal dari zaman dulu ketika kasur tidur rakyat jelata terbuat dari karung goni (sack) yang diisi jerami.',
    penjelasan: 'Slang kasual yang sangat populer saat tubuh sudah kelelahan dan ingin segera tidur.',
    maknaFilosofis: 'Real talk, mengakui bahwa tubuh sudah kelelahan dan butuh istirahat adalah bentuk respek tertinggi pada diri sendiri. Tidur bukan tanda kemalasan, tapi proses recharge energi agar bisa melangkah lebih jauh besok.',
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
    asalUsul: 'Istilah maritim pelaut zaman dulu: ketika badai menerpa, penumpang yang mabuk laut disuruh turun ke bawah geladak agar terlindung dari cuaca buruk.',
    penjelasan: 'Cara sopan dan natural untuk mengabarkan bahwa kondisi tubuh sedang kurang sehat tanpa harus merinci penyakit.',
    maknaFilosofis: 'Secara sosial, frasa ini mencerminkan kesopanan dalam menjaga batasan privasi medis sembari tetap mengomunikasikan kebutuhan untuk memulihkan diri dengan elegan.',
    situasi: [
      `"I won't be able to make it to lunch today because I'm feeling a bit under the weather." ("Gw kayaknya gak bisa ikut makan siang hari ini karena badan gw lagi agak kurang fit.")`,
      `"She sent a quick email to her manager saying she was under the weather and needed rest." ("Dia ngirim email singkat ke managernya ngabarin kalo dia lagi meriang dan butuh istirahat.")`,
      `"Take some warm tea and rest up; you look a little under the weather today." ("Minum teh hangat terus istirahat gih; muka lu kelihatan agak pucat dan kurang enak badan hari ini.")`,
    ]
  },
  {
    regex: /\bclose call\b/i,
    key: 'close call',
    arti: 'nyaris celaka / tipis banget selamatnya',
    asalUsul: 'Berasal dari dunia wasit olahraga abad ke-19, di mana keputusan yang sangat tipis jaraknya disebut "a close call".',
    penjelasan: 'Digunakan saat seseorang baru saja terhindar dari bahaya atau kegagalan dengan selisih yang sangat tipis.',
    maknaFilosofis: 'Momen "close call" sering kali menjadi wake-up call spiritual: mengingatkan kita betapa rapuhnya garis batas antara keberuntungan dan musibah, dan membuat kita lebih menghargai keselamatan hari ini.',
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
    penjelasan: 'Frasa ramah dan positif yang lazim dipakai di akhir email maupun obrolan rencana liburan.',
    maknaFilosofis: 'Antisipasi positif terhadap masa depan adalah salah satu pilar kebahagiaan manusia. Memiliki sesuatu yang dinanti-nanti memberikan energi dan harapan untuk melewati hari-hari yang melelahkan.',
    situasi: [
      `"I'm really looking forward to meeting your family this weekend." ("Gw beneran udah gak sabar pengen ketemu keluarga lu akhir pekan ini.")`,
      `"Thank you for the productive interview; I look forward to hearing from you soon." ("Terima kasih atas wawancaranya; gw sangat menantikan kabar baik dari lu segera.")`,
      `"After three months of intense work, the team is looking forward to taking a vacation." ("Abis tiga bulan kerja intens, tim udah gak sabar banget buat liburan yang memuaskan.")`,
    ]
  },
  {
    regex: /\bfigure(?:\s+\w+)?\s+out\b/i,
    key: 'figure out',
    arti: 'mencari jalan keluar / memecahkan atau memahami masalah',
    asalUsul: 'Dari kata "figure" (angka/hitung) di abad ke-19 yang bermakna menghitung kalkulasi matematis sampai menemukan solusinya.',
    penjelasan: 'Sangat sering digunakan saat proses berpikir memecahkan teka-teki, masalah teknis, atau memahami motif seseorang.',
    maknaFilosofis: 'Hidup ini pada dasarnya adalah rangkaian misteri yang perlahan kita pecahkan. Menyadari bahwa kita tidak harus tahu semua jawaban sekarang, tapi percaya bahwa kita akan "figure it out", adalah bentuk kedamaian batin.',
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
    maknaFilosofis: 'Terkadang ada garis tipis antara keteguhan hati yang heroik dan kepasrahan yang bijaksana. Mengetahui kapan harus terus berjuang dan kapan harus melepaskan adalah puncak kedewasaan emosional.',
    situasi: [
      `"No matter how steep the learning curve is, promise me you won't give up." ("Gimanapun susahnya proses belajarnya, janji sama gw lu gak bakal nyerah.")`,
      `"He worked on that application for a year and refused to give up until it launched." ("Dia ngerjain aplikasi itu selama setahun dan nolak buat nyerah sampe beneran berhasil rilis.")`,
      `"A: 'The gym workout is killing me!' — B: 'Push through the last set, don't give up now!' (A: 'Latihan gym-nya bikin remuk badan gw!' — B: 'Kuatkan diri buat set terakhir, jangan nyerah sekarang!')"`,
    ]
  },
  {
    regex: /\bshake(?:\s+\w+)?\s+up\b/i,
    key: 'shake (someone) up',
    arti: 'bikin kaget, terguncang secara emosional, atau goyah ketenangannya',
    asalUsul: 'Metafora dari benda yang dikocok keras sehingga isi di dalamnya goyah dan tidak stabil.',
    penjelasan: 'Dipakai saat ada kejadian mendadak atau kabar mengejutkan yang mengguncang mental/emosi seseorang.',
    maknaFilosofis: 'Guncangan hidup sering kali membongkar ilusi stabilitas yang kita bangun. Walau terasa menakutkan, momen terguncang ini membuka kesempatan untuk menata ulang prioritas hidup yang lebih kokoh.',
    situasi: [
      `"Did you hear the loud thud outside last night? It shook me up a bit." ("Lu denger suara dentuman keras di luar semalem gak? Itu sempet bikin gw kaget dan goyah dikit.")`,
      `"Take a deep breath and stay calm; don't let this sudden news shake you up." ("Tarik napas panjang dan tetep tenang; jangan biarin berita mendadak itu bikin mental lu goyah.")`,
      `"The near-accident really shook him up, but thankfully he walked away uninjured." ("Kejadian nyaris celaka itu beneran bikin dia syok berat, tapi syukurlah dia selamat tanpa luka sedikitpun.")`,
    ]
  },
  {
    regex: /\bspill the beans\b/i,
    key: 'spill the beans',
    arti: 'bocorin rahasia tanpa sengaja',
    asalUsul: 'Berasal dari proses voting rahasia Yunani Kuno: pemilih menjatuhkan kacang ke dalam toples. Jika toplesnya tumpah, hasil rahasia langsung ketahuan sebelum waktunya.',
    penjelasan: 'Slang kasual yang sangat umum saat rahasia atau kejutan terlanjur bocor.',
    maknaFilosofis: 'Menjaga kepercayaan dan rahasia orang lain adalah pondasi integritas dalam persahabatan. Sekali "kacang tertumpah", dibutuhkan waktu lama untuk mengumpulkan kembali rasa percaya yang tercecer.',
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

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
  'to', 'of', 'and', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'as',
  'into', 'like', 'through', 'after', 'over', 'between', 'out', 'against',
  'during', 'without', 'before', 'under', 'around', 'among', 'that', 'this',
  'these', 'those', 'it', 'its', 'you', 'your', 'i', 'my', 'me', 'we', 'our',
  'us', 'they', 'their', 'them', 'he', 'his', 'him', 'she', 'her', 'hers',
  'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'shall',
  'should', 'can', 'could', 'may', 'might', 'must', 'just', 'so', 'too', 'very'
]);

/**
 * ATURAN MUTLAK MASALAH 3:
 * Validasi apakah kalimat contoh mengandung teks asli user (atau focusPhrase)
 * baik secara verbatim, frasa kontigu 3+ kata, atau minimal 1 kata signifikan unik.
 */
export function validateExampleContainsOriginal(exampleStr, originalText, focusPhrase = null) {
  if (!exampleStr || typeof exampleStr !== 'string') return false;

  // Extract English portion before Indonesian translation in parentheses
  const parenIdx = exampleStr.indexOf('(');
  const englishPart = (parenIdx !== -1 ? exampleStr.slice(0, parenIdx) : exampleStr).toLowerCase();

  // 1. Verbatim check: focusPhrase or originalText directly in English part
  if (focusPhrase && focusPhrase.trim().length > 0) {
    if (englishPart.includes(focusPhrase.toLowerCase().trim())) {
      return true;
    }
  }

  const cleanOriginal = (originalText || '').toLowerCase().trim();
  if (cleanOriginal && englishPart.includes(cleanOriginal)) {
    return true;
  }

  // 2. 3+ word contiguous phrase matching
  const origWords = cleanOriginal.replace(/[^\w\s']/g, '').split(/\s+/).filter(Boolean);
  if (origWords.length >= 3) {
    for (let i = 0; i <= origWords.length - 3; i++) {
      const sub = origWords.slice(i, i + 3).join(' ');
      if (englishPart.includes(sub)) return true;
    }
  }

  // 3. Check for at least ONE significant (longest, non-stopword) word
  const significantWords = origWords
    .map(w => w.replace(/[^\w']/g, ''))
    .filter(w => w.length >= 3 && !STOPWORDS.has(w))
    .sort((a, b) => b.length - a.length);

  if (significantWords.length > 0) {
    const topKeywords = significantWords.slice(0, 3);
    const hasMatch = topKeywords.some(kw => {
      const reg = new RegExp(`\\b${kw}\\b`, 'i');
      return reg.test(englishPart);
    });
    if (hasMatch) return true;
  } else if (origWords.length > 0) {
    // If all words are stopwords (e.g. "when i was your man"), check if any word >= 3 chars appears
    const anyWord = origWords.filter(w => w.length >= 3);
    if (anyWord.some(w => new RegExp(`\\b${w}\\b`, 'i').test(englishPart))) {
      return true;
    }
  }

  return false;
}

/**
 * Helper to detect if an example invents artificial settings (coffee, meeting, etc.)
 * not present in the original input, or fails to include original text keywords.
 * If mismatched, returns clean direct framing.
 */
export function validateAndSanitizeExample(exampleStr, originalText, translation, focusPhrase = null) {
  if (!exampleStr) {
    return `"${originalText}" ("${translation}")`;
  }
  const lowerOrig = (originalText || "").toLowerCase();

  const artificialSettings = [
    { regex: /\b(coffee|kopi|ngopi|cafe|kafe|catchup)\b/i, required: /\b(coffee|kopi|cafe|kafe|catchup)\b/i },
    { regex: /\b(meeting|rapat|colleague|kolega|kantor|office|boss|atasan)\b/i, required: /\b(meeting|rapat|colleague|kolega|kantor|office|boss|atasan|work|kerja)\b/i },
    { regex: /\b(party|pesta)\b/i, required: /\b(party|pesta)\b/i }
  ];

  for (const setting of artificialSettings) {
    if (setting.regex.test(exampleStr) && !setting.required.test(lowerOrig)) {
      return `"${originalText}" ("${translation}")`;
    }
  }

  // ATURAN MUTLAK MASALAH 3: Wajib nempel ke teks asli!
  const isGrounded = validateExampleContainsOriginal(exampleStr, originalText, focusPhrase);
  if (!isGrounded) {
    return `"${originalText}" ("${translation}")`;
  }

  return exampleStr;
}

/**
 * In-memory buffer to prevent repetitive template selection across consecutive searches.
 */
const recentTemplateIndices = new Map();

export function pickVariedTemplate(categoryKey, templates, lastUsedIndex = -1) {
  if (!templates || templates.length === 0) return "";
  if (templates.length === 1) return templates[0];

  const lastIndex = recentTemplateIndices.has(categoryKey)
    ? recentTemplateIndices.get(categoryKey)
    : lastUsedIndex;

  const availableIndices = [];
  for (let i = 0; i < templates.length; i++) {
    if (i !== lastIndex) {
      availableIndices.push(i);
    }
  }

  const chosenIndex =
    availableIndices.length > 0
      ? availableIndices[Math.floor(Math.random() * availableIndices.length)]
      : 0;

  recentTemplateIndices.set(categoryKey, chosenIndex);
  return templates[chosenIndex];
}

/**
 * Detect emotional tone of the input sentence.
 * Returns: 'angry_breakup' | 'reflective_philosophical' | 'sad_heartbroken' | 'romantic_love' | 'casual_chill'
 */
export function detectSentenceTone(text, translation) {
  const combined = `${text} ${translation}`.toLowerCase();

  // 1. Angry / Breakup / Betrayal
  if (
    /\b(better\s+off\s+without|better\s+of\s+without|angry\s+towards|angry\s+at|hate\s+you|hate\s+u|liar|cheated|cheat|fight|break\s+up|broke\s+up|toxic|shitty|annoying|leave\s+me\s+alone|fuck|damn|hell|disgusted|marah|kesel|benci|muak|kecewa|putus|jijik|gak\s+butuh|emosi|nyebelin)\b/i.test(
      combined
    )
  ) {
    return 'angry_breakup';
  }

  // 2. Reflective / Philosophical / Deep Monologue / Fate & Destiny
  if (
    /\b(fate|destiny|future|behind|cross(\s+the)?\s+line|hides|unknown|horizon|abyss|purpose|meaning|journey|path|choices?|fear|courage|hesitate|wonder|reflection|whisper|silent|silence|darkness|universe|takdir|nasib|masa\s+depan|melewati\s+batas|merenung|filosofis|makna\s+hidup|arah\s+hidup|batin|perenungan)\b/i.test(
      combined
    )
  ) {
    return 'reflective_philosophical';
  }

  // 3. Sad / Heartbroken / Grief / Longing
  if (
    /\b(cry|crying|tears|broken\s+heart|miss\s+you|miss\s+u|alone|lonely|sad|grief|sorrow|depressed|heartbreak|empty|hurts|pain|sedih|nangis|kehilangan|hampa|patah\s+hati|rindu|sepi|rapuh|kangen|merana)\b/i.test(
      combined
    )
  ) {
    return 'sad_heartbroken';
  }

  // 4. Romantic / Love / Affection / Tender Soul & Light Metaphors
  if (
    /\b(love|sweetheart|darling|forever|crush|kiss|hug|lips|beloved|fall\s+in\s+love|soul|souls|cherish|adore|precious|my\s+world|mean\s+the\s+world|means\s+the\s+world|you\s+mean|in\s+my\s+soul|of\s+my\s+soul|beautiful|sweetest|cinta|sayang|cantik|manis|romantis|baper|naksir|peluk|kekasih|pujaan|jiwaku|hatiku|kesayangan|belahan\s+jiwa)\b/i.test(
      combined
    )
  ) {
    return 'romantic_love';
  }

  return 'casual_chill';
}

/**
 * Regenerate alternative example sentence on-demand for "Kurang Pas? Coba Lagi" button.
 */
export function regenerateAlternativeExample(rawText, cleanTranslation, tone, classifiedType = 'sentence', currentExample = "") {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const isQuestion =
    text.endsWith('?') ||
    /^(what|why|how|where|when|who|which|whose|whom|is|are|am|was|were|do|does|did|can|could|will|would|should|may|might|have|has|had)\b/i.test(text);

  let pool = [];

  if (classifiedType === 'song') {
    pool = [
      `In everyday conversation, you can naturally use "${text}" when expressing how you feel. (Di obrolan sehari-hari, lu bisa wajar memakai "${text}" pas lagi ngungkapin perasaan lu.)`,
      `Reflecting on that moment, he admitted: "${text}." (Merenungkan momen itu, dia mengakui: "${cleanTranslation}."`,
      `When speaking from the heart, she whispered: "${text}." (Pas lagi ngomong dari lubuk hati terdalam, dia berbisik: "${cleanTranslation}."`,
      `You can borrow this line directly: "${text}" to describe what you are going through. (Lu bisa langsung pinjam kalimat "${text}" buat melukiskan apa yang lagi lu alamin.)`,
      `It captures that vulnerable feeling so well: "${text}." (Kalimat ini nangkep perasaan rapuh itu dengan pas: "${cleanTranslation}."`,
      `Whenever you need words for that exact sentiment, just say: "${text}." (Tiap kali lu butuh kata-kata buat rasa itu, tinggal bilang: "${cleanTranslation}.")`,
    ];
  } else if (classifiedType === 'movie') {
    pool = [
      `In a memorable confrontation, the line hits hard: "${text}." (Di adegan konfrontasi yang membekas, dialog ini kena banget: "${cleanTranslation}."`,
      `Delivering this line with calm intensity: "${text}." (Nyampein kalimat ini dengan ketegasan yang tenang: "${cleanTranslation}."`,
      `Just like an iconic scene, you can declare: "${text}." (Persis adegan film legendaris, lu bisa tegasin: "${cleanTranslation}."`,
      `When words need weight, this line says it all: "${text}." (Pas perkataan butuh bobot mendalam, kalimat ini udah cukup: "${cleanTranslation}."`,
      `Spoken with quiet confidence: "${text}." (Diucapkan dengan rasa percaya diri yang tenang: "${cleanTranslation}."`,
      `A classic, impactful line to remember: "${text}." (Kalimat klasik dan berbobot buat diinget: "${cleanTranslation}.")`,
    ];
  } else if (classifiedType === 'word' || wordCount === 1) {
    const isVerbLike = /^(me|meng|ber)/i.test(cleanTranslation);
    pool = isVerbLike
      ? [
          `"Let's make sure to ${lower} every single detail carefully before moving forward." ("Yuk pastiin kita ${cleanTranslation} setiap detailnya secara teliti sebelum lanjut.")`,
          `"She tried her best to ${lower} the situation so everyone stayed calm." ("Dia berusaha sebaik mungkin buat ${cleanTranslation} situasinya biar semua orang tetep tenang.")`,
          `"Can you help me ${lower} this properly?" ("Bisa bantu gw ${cleanTranslation} ini dengan bener gak?")`,
          `"Take your time to ${lower} everything step by step." ("Santai aja, luangkan waktu buat ${cleanTranslation} semuanya tahap demi tahap.")`,
          `"Knowing when to ${lower} makes a huge difference in the outcome." ("Tahu kapan harus ${cleanTranslation} bawa pengaruh gede ke hasil akhirnya.")`,
          `"We need someone who can ${lower} this with confidence." ("Kita butuh orang yang bisa ${cleanTranslation} hal ini dengan percaya diri.")`,
        ]
      : [
          `"Having a clear grasp of ${lower} makes everyday communication a lot smoother." ("Punya pemahaman jelas soal ${cleanTranslation} bikin komunikasi sehari-hari jauh lebih lancar.")`,
          `"He brought up the word '${lower}' during our discussion today." ("Dia ngebahas kata '${cleanTranslation}' pas obrolan kita tadi.")`,
          `"Basically, just focus on ${lower} when dealing with this." ("Basically ya, tinggal fokus ke ${cleanTranslation} aja pas ngadepin ini.")`,
          `"A simple reminder that ${lower} really matters in the long run." ("Pengingat sederhana kalo ${cleanTranslation} bener-bener penting untuk jangka panjang.")`,
          `"Understanding the real meaning of ${lower} helps avoid misunderstandings." ("Paham makna asli ${cleanTranslation} ngebantu banget biar gak salah paham.")`,
          `"You can see the influence of ${lower} in everyday situations." ("Lu bisa liat pengaruh ${cleanTranslation} di situasi sehari-hari.")`,
        ];
  } else if (classifiedType === 'phrase') {
    pool = [
      `"Using '${text}' in your conversation sounds very natural." ("Pake frasa '${text}' di obrolan lu kedengeran alami banget.")`,
      `"Finding the right ${text} can make a huge difference in your journey." ("Nemu ${cleanTranslation} yang pas bisa ngebawa perubahan gede di perjalanan lu.")`,
      `"They spent the whole afternoon talking about their ${text}." ("Mereka ngabisin sepanjang sore ngebahas ${cleanTranslation} mereka.")`,
      `"Just trying to manage ${text} better every single day." ("Lagi nyoba nata ${cleanTranslation} biar lebih beres tiap harinya.")`,
      `"In daily communication, you can naturally say: '${text}'" ("Di percakapan sehari-hari, lu bisa dengan alami ngomong: '${cleanTranslation}'")`,
      `"A clear and handy phrase to express ${cleanTranslation}: '${text}'" ("Frasa praktis dan jelas buat nyampein ${cleanTranslation}: '${text}'")`,
    ];
  } else if (isQuestion) {
    pool = [
      `"Pausing for a second, she asked genuinely: '${text}'" ("Sempat terdiam sejenak, dia bertanya dengan tulus: '${cleanTranslation}'")`,
      `"Curious about what was happening, he asked: '${text}'" ("Penasaran sama apa yang lagi terjadi, dia nanya: '${cleanTranslation}'")`,
      `"A straightforward question you can naturally ask: '${text}'" ("Pertanyaan lugas yang bisa lu lontarkan secara alami: '${cleanTranslation}'")`,
      `"To clarify the situation without awkwardness, just ask: '${text}'" ("Biar situasinya jelas tanpa canggung, tinggal tanya: '${cleanTranslation}'")`,
      `"She turned around and wondered aloud: '${text}'" ("Dia noleh dan bertanya-tanya penasaran: '${cleanTranslation}'")`,
      `"In honest conversation, you might ask: '${text}'" ("Di obrolan yang jujur, lu bisa nanya: '${cleanTranslation}'")`,
    ];
  } else if (tone === 'reflective_philosophical') {
    pool = [
      `"Reflecting quietly on what lies ahead, she whispered: '${text}'" ("Merenung tenang soal apa yang menanti di depan, dia berbisik: '${cleanTranslation}'")`,
      `"Standing before an unknown journey, you can say: '${text}'" ("Berdiri di hadapan perjalanan yang belum pasti, lu bisa bilang: '${cleanTranslation}'")`,
      `"In moments of deep personal reflection: '${text}'" ("Di momen perenungan diri yang mendalam: '${cleanTranslation}'")`,
      `"Contemplating the upcoming turn of events, I murmured: '${text}'" ("Merenungkan arah masa depan yang bakal terjadi, gw bergumam: '${cleanTranslation}'")`,
      `"When pondering the path ahead, she said: '${text}'" ("Pas lagi mikirin jalan di depan, dia bilang: '${cleanTranslation}'")`,
      `"Looking into the distance with a quiet heart: '${text}'" ("Menatap ke kejauhan dengan hati yang tenang: '${cleanTranslation}'")`,
    ];
  } else if (tone === 'sad_heartbroken') {
    pool = [
      `"Late at night when everything goes quiet, you might feel: '${text}'" ("Pas larut malam saat suasana hening, lu mungkin ngerasa: '${cleanTranslation}'")`,
      `"Holding back a heavy sigh, she admitted: '${text}'" ("Nahan napas berat, dia ngaku: '${cleanTranslation}'")`,
      `"Whenever old memories resurface, all I can say is: '${text}'" ("Tiap kali memori lama muncul lagi, yang bisa gw bilang cuma: '${cleanTranslation}'")`,
      `"Sitting alone with overwhelming thoughts: '${text}'" ("Duduk sendirian dengan pikiran berkecamuk: '${cleanTranslation}'")`,
      `"It hurts to admit it, but honestly: '${text}'" ("Sakit emang buat ngakuinnya, tapi sejujurnya: '${cleanTranslation}'")`,
      `"In a moment of vulnerability, he confessed: '${text}'" ("Di momen batin lagi rapuh, dia ngaku: '${cleanTranslation}'")`,
    ];
  } else if (tone === 'angry_breakup') {
    pool = [
      `"After thinking it through, I stood my ground and said: '${text}'" ("Abis mikir panjang, gw pasang batasan tegas dan bilang: '${cleanTranslation}'")`,
      `"Looking him right in the eye, she declared: '${text}'" ("Natap langsung ke matanya, dia tegas bilang: '${cleanTranslation}'")`,
      `"Setting a clear boundary once and for all: '${text}'" ("Masang batasan jelas biar beres: '${cleanTranslation}'")`,
      `"Tired of being taken for granted, he blurted out: '${text}'" ("Udah capek disepelein terus, dia langsung ngomong: '${cleanTranslation}'")`,
      `"I refuse to tolerate this any longer: '${text}'" ("Gw nolak buat mentoleransi ini lebih lama lagi: '${cleanTranslation}'")`,
      `"Enough is enough, so I made it clear: '${text}'" ("Cukup ya cukup, jadi gw pertegas: '${cleanTranslation}'")`,
    ];
  } else if (tone === 'romantic_love') {
    pool = [
      `"I don't say sweet things often, but honestly: '${text}'" ("Gw gak sering ngomong manis, tapi beneran deh: '${cleanTranslation}'")`,
      `"Every time I look into your eyes, I think: '${text}'" ("Tiap kali gw natap mata lu, gw mikir: '${cleanTranslation}'")`,
      `"Holding hands quietly under the evening sky: '${text}'" ("Genggaman tangan tenang di bawah langit sore: '${cleanTranslation}'")`,
      `"A genuine reminder of how much you mean to me: '${text}'" ("Pengingat tulus soal betapa berartinya lu buat gw: '${cleanTranslation}'")`,
      `"Softly sharing what has been on my heart: '${text}'" ("Dengan lembut ngungkapin apa yang ada di hati gw: '${cleanTranslation}'")`,
      `"No grand gestures needed, just simple honesty: '${text}'" ("Gak butuh gaya-gayaan berlebihan, cukup kejujuran sederhana: '${cleanTranslation}'")`,
    ];
  } else {
    // 💬 Neutral sentence default: Realistic situational dialogues, never meta-tutorials
    const isCorrelative = /^the\s+(more|less|sooner|harder|longer|better|greater)\b/i.test(text);
    const isFirstPerson = /^(i|we|my|our)\b/i.test(text) || /\b(i'm|i've|i'd|i\s+feel|i\s+think)\b/i.test(text);
    const isSecondPerson = /^(you|your)\b/i.test(text) || /\b(you're|you've|you'd)\b/i.test(text);

    if (isCorrelative) {
      pool = [
        `"The truth is, ${text}, the more complicated things get." ("Kenyataannya, ${cleanTranslation}, situasinya malah makin rumit.")`,
        `"I realized that ${text}, the harder it becomes to find any real clue." ("Gw sadar kalau ${cleanTranslation}, makin susah buat nemu petunjuk jelas.")`,
        `"It felt like chasing shadows; ${text}, the less sense any of this makes." ("Rasanya kayak ngejar bayangan; ${cleanTranslation}, makin gak masuk akal semua ini.")`,
        `"She told me that ${text}, the further away the truth seems." ("Dia bilang ke gw kalau ${cleanTranslation}, kebenarannya malah kelihatan makin jauh.")`,
        `"No matter how fast we move, ${text}, the more exhausted we feel." ("Secepet apapun kita jalan, ${cleanTranslation}, rasanya malah makin capek.")`,
        `"It became obvious that ${text}, the more tension grew between them." ("Makin jelas kalau ${cleanTranslation}, tensi di antara mereka malah makin kerasa.")`,
      ];
    } else if (isFirstPerson) {
      pool = [
        `"Honestly, ${text}, and that's why I need to take a step back." ("Jujur aja, ${cleanTranslation}, dan itu alasannya gw perlu ambil jeda sejenak.")`,
        `"I had to admit that ${text}, even though it wasn't easy to say out loud." ("Gw harus ngakuin kalau ${cleanTranslation}, meskipun gak gampang buat diucapin.")`,
        `"During our discussion, she paused when I said: '${text}.'" ("Pas obrolan kita, dia sempat terdiam waktu gw bilang: '${cleanTranslation}.'")`,
        `"To be completely real with you, ${text}." ("Biar bener-bener jujur sama lu ya, ${cleanTranslation}.")`,
        `"Sitting there in silence, all I could think was: '${text}.'" ("Duduk diam di sana, yang ada di pikiran gw cuma: '${cleanTranslation}.'")`,
        `"I wanted to make sure everyone understood that ${text}." ("Gw pengen pastiin semua orang paham kalau ${cleanTranslation}.")`,
      ];
    } else if (isSecondPerson) {
      pool = [
        `"You can't just expect everything to be fine when ${text}." ("Lu gak bisa cuma ngarepin semuanya baik-baik aja pas ${cleanTranslation}.")`,
        `"I noticed that ${text}, so I wanted to check in on you." ("Gw ngeh kalau ${cleanTranslation}, makanya gw pengen nanyain kabar lu.")`,
        `"Before making any hasty decisions, remember that ${text}." ("Sebelum ambil keputusan gegabah, inget kalau ${cleanTranslation}.")`,
        `"She looked at you and said: '${text},' which changed the whole mood." ("Dia natap lu dan bilang: '${cleanTranslation},' yang langsung ngubah suasana.")`,
        `"It's important to realize that ${text} before it's too late." ("Penting buat sadar kalau ${cleanTranslation} sebelum semuanya terlambat.")`,
        `"They all agreed that ${text} was the main issue here." ("Mereka semua sepakat kalau ${cleanTranslation} emang jadi isu utamanya.")`,
      ];
    } else {
      pool = [
        `"In situations like this, remember that ${text}." ("Di situasi kayak gini, inget kalau ${cleanTranslation}.")`,
        `"The conversation shifted when someone mentioned: '${text}.'" ("Arah obrolan langsung berubah pas ada yang nyeletuk: '${cleanTranslation}.'")`,
        `"It's pretty clear that ${text} under these circumstances." ("Cukup jelas kalau ${cleanTranslation} di kondisi kayak gini.")`,
        `"She smiled gently and said: '${text}.'" ("Dia senyum tipis terus bilang: '${cleanTranslation}.'")`,
        `"Everyone in the room agreed that ${text}." ("Semua orang di ruangan itu setuju kalau ${cleanTranslation}.")`,
        `"Looking back at what happened, ${text} makes total sense now." ("Kalo diinget lagi apa yang kejadian, ${cleanTranslation} sekarang masuk akal banget.")`,
      ];
    }
  }

  // Filter out current example if present
  const available = pool.filter(ex => ex.trim() !== currentExample.trim());
  const selected = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : pool[0];

  return validateAndSanitizeExample(selected, text, cleanTranslation);
}

/**
 * Generate rich, informative, educational analysis for ANY arbitrary sentence, lyric, or dialogue.
 * Satisfies all quality standards:
 * - Standar 1: Cross-verified translation, idiom priority & strict pronoun normalization (gw/lu)
 * - Standar 2: Grammatically correct examples across contextual emotional tones (default 1 example)
 * - Standar 3: Insightful, Temen Ngobrol notes with authentic Jaksel interjections
 * - Standar 4: maknaFilosofis field with emotional/psychological insight
 * - Standar 5: Confidence level tracking ('high' | 'medium' | 'low')
 */
export async function generateRichSentenceAnalysis(rawText, exampleCount = 1, options = {}) {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const phonetics = generateSentencePhonetics(text);

  // 1. Check for known idioms FIRST
  const detectedIdioms = COMMON_IDIOMS.filter(item => item.regex.test(lower));
  const isKnownIdiom = detectedIdioms.length > 0;

  // 2. Fetch dual translation with cross-verification
  const { translation: rawLiveTranslation, confidence: dualConfidence, myMemory: rawMyMem } = await fetchDualTranslationDetails(text);

  const cleanTranslationRaw = normalizePronounsToJaksel(rawLiveTranslation);
  const myMemTranslation = normalizePronounsToJaksel(rawMyMem);

  // VALIDASI B2: Unrecognized words / Echo check / Gibberish
  const isMyMemEcho = myMemTranslation && myMemTranslation.toLowerCase().trim() === lower;
  const isEchoOrEmpty =
    (!cleanTranslationRaw ||
      cleanTranslationRaw.trim().length === 0 ||
      cleanTranslationRaw.toLowerCase().trim() === lower ||
      (isMyMemEcho && isTransliterationEcho(lower, cleanTranslationRaw)) ||
      isTransliterationEcho(lower, cleanTranslationRaw) ||
      UNRECOGNIZED_WORDS.has(lower)) &&
    !isKnownIdiom;

  if (isEchoOrEmpty) {
    return {
      arti: 'Waduh, tbh kata/frasa ini belum ke-detect di database gw maupun hasil translate. Coba double check ejaannya ya, atau who knows ini slang yang emang super niche.',
      cara_baca: phonetics || text.toLowerCase(),
      penggunaan: [],
      catatan: 'Kalau ini kata yang beneran valid, coba search lagi dengan ejaan lain, atau kasih kalimat lengkapnya biar AI-nya lebih gampang nangkep konteksnya.',
      confidenceLevel: 'low',
      isUnrecognized: true,
      isInstant: false,
      success: true,
    };
  }

  let cleanTranslation = cleanTranslationRaw;
  let finalConfidence = dualConfidence;

  if (isKnownIdiom) {
    cleanTranslation = detectedIdioms[0].arti;
    finalConfidence = 'high';
  }

  // Determine classifiedType (MASALAH 2 POIN 1: gunakan classifiedType dari caller jika tersedia)
  const classification = classifyText(text, options);
  const classifiedType = options?.classifiedType || classification.type;

  let tone = detectSentenceTone(text, cleanTranslation);

  // 3. Grammatical structure & input shape classification
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const isQuestion =
    text.endsWith('?') ||
    /^(what|why|how|where|when|who|which|whose|whom|is|are|am|was|were|do|does|did|can|could|will|would|should|may|might|have|has|had)\b/i.test(text);

  const isActionOrImperative =
    /^(please\s+)?(hug|help|tell|let|make|give|take|call|listen|look|wait|stop|try|come|go|bring|show|ask|remember|forget|keep|hold|send|check|find|leave|stand|wake|run)\b/i.test(text);

  // Self-check safeguard: Ensure romantic/intimate words trigger romantic_love
  const hasRomanticWords =
    /\b(soul|souls|light|lights|heart|hearts|love|darling|sweet|cinta|sayang|jiwa|hatiku|belahan\s+jiwa|mean\s+the\s+world|my\s+world|shine|glow)\b/i.test(
      text
    ) ||
    /\b(cinta|sayang|jiwa|hati|terang|belahan\s+jiwa)\b/i.test(cleanTranslation);

  if (
    tone !== 'angry_breakup' &&
    tone !== 'reflective_philosophical' &&
    tone !== 'sad_heartbroken' &&
    hasRomanticWords
  ) {
    tone = 'romantic_love';
  }

  let examples = [];
  let note = '';
  let maknaFilosofis = '';
  let finalArti = cleanTranslation;

  // ══════════════════════════════════════════════════════════════════════════════
  // GENERATE CONTEXTUAL EXAMPLES, CATATAN & MAKNA FILOSOFIS BY CATEGORY & TONE
  // ATURAN MASALAH 4: MINIMAL 6 VARIASI TEMPLATE DENGAN PEMILIHAN ACAK BER-BUFFER
  // ══════════════════════════════════════════════════════════════════════════════

  if (isKnownIdiom) {
    const mainIdiom = detectedIdioms[0];
    examples = mainIdiom.situasi;
    const etymology = mainIdiom.asalUsul ? ` ${mainIdiom.asalUsul}` : '';
    note = `Tbh ini idiom otentik yang hits banget: "${mainIdiom.key}" yang artinya "${mainIdiom.arti}".${etymology} ${mainIdiom.penjelasan} Luwes banget dipake pas lagi chat atau ngobrol kasual!`;
    maknaFilosofis = mainIdiom.maknaFilosofis || `Secara filosofis, idiom seperti ini memperkaya cara pandang kita terhadap dinamika hidup dengan analogi yang cerdas dan menyegarkan.`;
  } else if (classifiedType === 'word' || wordCount === 1) {
    // 🔍 SINGLE WORD CONTEXT (VERB / NOUN / ADJECTIVE)
    if (lower === 'trace') {
      finalArti = 'Melacak / Menelusuri / Jejak';
      const tracePool = [
        `"Police are working day and night to trace the origin of the phone call." ("Polisi kerja siang malam buat melacak asal-usul panggilan telepon itu.")`,
        `"The suspect vanished into the crowded subway without leaving a trace." ("Tersangka ngilang di kereta bawah tanah yang padat tanpa ninggalin jejak sedikitpun.")`,
        `"Can you help me trace where this bug came from?" ("Bisa bantu gw telusuri bug kodingan ini dari mana?")`,
        `"She could trace every happy memory back to their first meeting." ("Dia bisa menelusuri tiap memori bahagia kembali ke pertemuan pertama mereka.")`,
        `"Without leaving a trace, the mysterious car drove away." ("Tanpa ninggalin jejak sedikitpun, mobil misterius itu melaju pergi.")`,
        `"Let's trace the server logs together to solve this." ("Yuk kita telusuri log servernya bareng biar cepet kelar.")`,
      ];
      examples = [pickVariedTemplate('trace_examples', tracePool)];
      note = `Tbh kata 'trace' ini tuh fleksibel dan sering banget kepake di film detektif atau dunia teknologi. Sebagai kata kerja (verb), artinya melacak atau menelusuri alur data/kejadian; sedangkan sebagai kata benda (noun), artinya jejak. Dijamin asik banget dipake pas lu lagi ngomongin investigasi atau nyari akar masalah!`;
      maknaFilosofis = `Real talk, keinginan manusia buat menelusuri (to trace) akar masalah adalah bentuk kesadaran diri yang tinggi. Kita gak bisa bener-bener paham kondisi hari ini tanpa tahu jejak langkah yang nuntun kita sampe ke titik ini. Which is kenapa memahami asal-usul selalu jadi kunci utama penyelesaian krisis apapun.`;
    } else if (lower === 'angry') {
      finalArti = 'Marah / Kesal / Murka';
      const angryPool = [
        `"She was so angry when she found out they had been lying to her all along." ("Dia kesel banget pas tahu mereka udah bohongin dia dari awal.")`,
        `"Take a deep breath; there's no point in making big decisions when you're angry." ("Tarik napas panjang; gak ada gunanya ambil keputusan penting pas lu lagi emosi/marah.")`,
        `"Is he still angry at me after what happened yesterday?" ("Dia masih marah sama gw ya setelah apa yang terjadi kemarin?")`,
        `"It's okay to feel angry, but make sure you express it constructively." ("Wajar kok ngerasa marah, tapi pastiin lu luapkan dengan cara yang membangun.")`,
        `"Walking away when angry prevents saying things you might regret." ("Menjauh sejenak pas lagi marah nyegah lu ngomong hal-hal yang bakal disesali.")`,
        `"He looked visibly angry but chose to stay quiet." ("Kelihatan jelas dia lagi marah banget, tapi dia milih buat tetep diam.")`,
      ];
      examples = [pickVariedTemplate('angry_word_examples', angryPool)];
      note = `Nah ini nih kata dasar emosi yang literally paling sering kepake. Tbh bedanya sama 'mad' atau 'furious', 'angry' ini adalah istilah paling universal dan netral buat ngungkapin rasa kesel lu.`;
      maknaFilosofis = `Tbh dari kacamata psikologi emosi, marah adalah sinyal alami bahwa batas personal (boundary) lu sedang dilanggar. Menolak merasa marah justru tidak sehat; kuncinya adalah menyalurkannya secara asertif tanpa destruktif.`;
    } else {
      // General single word (6 variations)
      finalArti = cleanTranslation;
      const isVerbLike = /^(me|meng|ber)/i.test(cleanTranslation);
      const wordPool = isVerbLike
        ? [
            `"Let's make sure to ${lower} every single detail carefully before moving forward." ("Yuk pastiin kita ${cleanTranslation} setiap detailnya secara teliti sebelum lanjut.")`,
            `"She tried her best to ${lower} the situation so everyone stayed calm." ("Dia berusaha sebaik mungkin buat ${cleanTranslation} situasinya biar semua orang tetep tenang.")`,
            `"Can you help me ${lower} this properly?" ("Bisa bantu gw ${cleanTranslation} ini dengan bener gak?")`,
            `"Take your time to ${lower} everything step by step." ("Santai aja, luangkan waktu buat ${cleanTranslation} semuanya tahap demi tahap.")`,
            `"Knowing when to ${lower} makes a huge difference in the outcome." ("Tahu kapan harus ${cleanTranslation} bawa pengaruh gede ke hasil akhirnya.")`,
            `"We need someone who can ${lower} this with confidence." ("Kita butuh orang yang bisa ${cleanTranslation} hal ini dengan percaya diri.")`,
          ]
        : [
            `"Having a clear grasp of ${lower} makes everyday communication a lot smoother." ("Punya pemahaman jelas soal ${cleanTranslation} bikin komunikasi sehari-hari jauh lebih lancar.")`,
            `"He brought up the word '${lower}' during our discussion today." ("Dia ngebahas kata '${cleanTranslation}' pas obrolan kita tadi.")`,
            `"Basically, just focus on ${lower} when dealing with this." ("Basically ya, tinggal fokus ke ${cleanTranslation} aja pas ngadepin ini.")`,
            `"A simple reminder that ${lower} really matters in the long run." ("Pengingat sederhana kalo ${cleanTranslation} bener-bener penting untuk jangka panjang.")`,
            `"Understanding the real meaning of ${lower} helps avoid misunderstandings." ("Paham makna asli ${cleanTranslation} ngebantu banget biar gak salah paham.")`,
            `"You can see the influence of ${lower} in everyday situations." ("Lu bisa liat pengaruh ${cleanTranslation} di situasi sehari-hari.")`,
          ];
      examples = [pickVariedTemplate(`word_pool_${isVerbLike ? 'verb' : 'noun'}`, wordPool)];
      note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
      maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
    }
  } else if (classifiedType === 'phrase') {
    // 🌸 NOUN PHRASE / IDIOM PHRASE (6 variations, no artificial claims)
    finalArti = cleanTranslation;

    const phrasePool = isNegativeNP
      ? [
          `"Getting involved with the ${text} can ruin your future plans." ("Terjebak sama ${cleanTranslation} bisa ngerusak rencana masa depan lu.")`,
          `"He realized he was in the ${text} business and decided to walk away." ("Dia sadar kalau dia ada di bisnis ${cleanTranslation} dan milih buat pergi.")`,
          `"Honestly, it all started from the ${text} environment." ("Jujur ya, semuanya berawal dari lingkungan ${cleanTranslation}.")`,
          `"Steering clear of ${text} is the best decision you can make." ("Menjauh dari ${cleanTranslation} adalah keputusan terbaik yang bisa lu ambil.")`,
          `"Nobody wants to deal with a ${text} situation." ("Gak ada orang yang mau berurusan sama situasi ${cleanTranslation}.")`,
          `"Recognizing a ${text} early saves a lot of heartache." ("Menyadari ${cleanTranslation} sejak awal nyelametin lu dari banyak sakit hati.")`,
        ]
      : [
          `"Finding the right ${text} can make a huge difference in your journey." ("Nemu ${cleanTranslation} yang pas bisa ngebawa perubahan gede di perjalanan lu.")`,
          `"They spent the whole afternoon talking about their ${text}." ("Mereka ngabisin sepanjang sore ngebahas ${cleanTranslation} mereka.")`,
          `"Just trying to manage ${text} better every single day." ("Lagi nyoba nata ${cleanTranslation} biar lebih beres tiap harinya.")`,
          `"Having ${text} ready makes the entire process seamless." ("Nyiapin ${cleanTranslation} bikin seluruh prosesnya berjalan mulus.")`,
          `"She shared a thoughtful perspective on ${text}." ("Dia ngebagiin sudut pandang yang berbobot soal ${cleanTranslation}.")`,
          `"Focusing on the right ${text} helps keep things on track." ("Fokus ke ${cleanTranslation} yang tepat ngebantu semuanya tetep teratur.")`,
        ];
    examples = [pickVariedTemplate(`phrase_pool_${isNegativeNP ? 'neg' : 'pos'}`, phrasePool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else if (classifiedType === 'song') {
    // 🎵 PURE SONG LYRIC CONTEXT (6 variations weaving the text)
    const songPool = [
      `In everyday conversation, you can naturally use "${text}" when expressing how you feel. (Di obrolan sehari-hari, lu bisa wajar memakai "${text}" pas lagi ngungkapin perasaan lu.)`,
      `Reflecting on that moment, he admitted: "${text}." (Merenungkan momen itu, dia mengakui: "${cleanTranslation}.")`,
      `When speaking from the heart, she whispered: "${text}." (Pas lagi ngomong dari lubuk hati terdalam, dia berbisik: "${cleanTranslation}.")`,
      `You can borrow this line directly: "${text}" to describe what you are going through. (Lu bisa langsung pinjam kalimat "${text}" buat melukiskan apa yang lagi lu alamin.)`,
      `It captures that vulnerable feeling so well: "${text}." (Kalimat ini nangkep perasaan rapuh itu dengan pas: "${cleanTranslation}.")`,
      `Whenever you need words for that exact sentiment, just say: "${text}." (Tiap kali lu butuh kata-kata buat rasa itu, tinggal bilang: "${cleanTranslation}.")`,
    ];
    examples = [pickVariedTemplate('song_pool', songPool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else if (classifiedType === 'movie') {
    // 🎬 PURE MOVIE CONTEXT (6 variations weaving the text)
    const moviePool = [
      `In a memorable confrontation, the line hits hard: "${text}." (Di adegan konfrontasi yang membekas, dialog ini kena banget: "${cleanTranslation}.")`,
      `Delivering this line with calm intensity: "${text}." (Nyampein kalimat ini dengan ketegasan yang tenang: "${cleanTranslation}.")`,
      `Just like an iconic scene, you can declare: "${text}." (Persis adegan film legendaris, lu bisa tegasin: "${cleanTranslation}.")`,
      `When words need weight, this line says it all: "${text}." (Pas perkataan butuh bobot mendalam, kalimat ini udah cukup: "${cleanTranslation}.")`,
      `Spoken with quiet confidence: "${text}." (Diucapkan dengan rasa percaya diri yang tenang: "${cleanTranslation}.")`,
      `A classic, impactful line to remember: "${text}." (Kalimat klasik dan berbobot buat diinget: "${cleanTranslation}.")`,
    ];
    examples = [pickVariedTemplate('movie_pool', moviePool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else if (isQuestion) {
    // ❓ QUESTION CONTEXT (6 variations, clean & direct)
    const questionPool = [
      `"Pausing for a second, she asked genuinely: '${text}'" ("Sempat terdiam sejenak, dia bertanya dengan tulus: '${cleanTranslation}'")`,
      `"Curious about what was happening, he asked: '${text}'" ("Penasaran sama apa yang lagi terjadi, dia nanya: '${cleanTranslation}'")`,
      `"A straightforward question you can naturally ask: '${text}'" ("Pertanyaan lugas yang bisa lu lontarkan secara alami: '${cleanTranslation}'")`,
      `"To clarify the situation without awkwardness, just ask: '${text}'" ("Biar situasinya jelas tanpa canggung, tinggal tanya: '${cleanTranslation}'")`,
      `"She turned around and wondered aloud: '${text}'" ("Dia noleh dan bertanya-tanya penasaran: '${cleanTranslation}'")`,
      `"In honest conversation, you might ask: '${text}'" ("Di obrolan yang jujur, lu bisa nanya: '${cleanTranslation}'")`,
    ];
    examples = [pickVariedTemplate('question_pool', questionPool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else if (tone === 'reflective_philosophical') {
    // 🌌 REFLECTIVE / PHILOSOPHICAL CONTEXT (6 variations, grounded & non-whisper cliché)
    const reflectivePool = [
      `"Reflecting quietly on what lies ahead, she whispered: '${text}'" ("Merenung tenang soal apa yang menanti di depan, dia berbisik: '${cleanTranslation}'")`,
      `"Standing before an unknown journey, you can say: '${text}'" ("Berdiri di hadapan perjalanan yang belum pasti, lu bisa bilang: '${cleanTranslation}'")`,
      `"In moments of deep personal reflection: '${text}'" ("Di momen perenungan diri yang mendalam: '${cleanTranslation}'")`,
      `"Contemplating the upcoming turn of events, I murmured: '${text}'" ("Merenungkan arah masa depan yang bakal terjadi, gw bergumam: '${cleanTranslation}'")`,
      `"When pondering the path ahead, she said: '${text}'" ("Pas lagi mikirin jalan di depan, dia bilang: '${cleanTranslation}'")`,
      `"Looking into the distance with a quiet heart: '${text}'" ("Menatap ke kejauhan dengan hati yang tenang: '${cleanTranslation}'")`,
    ];
    examples = [pickVariedTemplate('reflective_pool', reflectivePool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else if (tone === 'sad_heartbroken') {
    // 🌧️ SAD / HEARTBROKEN CONTEXT (6 variations)
    const sadPool = [
      `"Late at night when everything goes quiet, you might feel: '${text}'" ("Pas larut malam saat suasana hening, lu mungkin ngerasa: '${cleanTranslation}'")`,
      `"Holding back a heavy sigh, she admitted: '${text}'" ("Nahan napas berat, dia ngaku: '${cleanTranslation}'")`,
      `"Whenever old memories resurface, all I can say is: '${text}'" ("Tiap kali memori lama muncul lagi, yang bisa gw bilang cuma: '${cleanTranslation}'")`,
      `"Sitting alone with overwhelming thoughts: '${text}'" ("Duduk sendirian dengan pikiran berkecamuk: '${cleanTranslation}'")`,
      `"It hurts to admit it, but honestly: '${text}'" ("Sakit emang buat ngakuinnya, tapi sejujurnya: '${cleanTranslation}'")`,
      `"In a moment of vulnerability, he confessed: '${text}'" ("Di momen batin lagi rapuh, dia ngaku: '${cleanTranslation}'")`,
    ];
    examples = [pickVariedTemplate('sad_pool', sadPool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else if (tone === 'angry_breakup') {
    // 💔 ANGRY / BREAKUP CONTEXT (6 variations)
    const angryPool = [
      `"After thinking it through, I stood my ground and said: '${text}'" ("Abis mikir panjang, gw pasang batasan tegas dan bilang: '${cleanTranslation}'")`,
      `"Looking him right in the eye, she declared: '${text}'" ("Natap langsung ke matanya, dia tegas bilang: '${cleanTranslation}'")`,
      `"Setting a clear boundary once and for all: '${text}'" ("Masang batasan jelas biar beres: '${cleanTranslation}'")`,
      `"Tired of being taken for granted, he blurted out: '${text}'" ("Udah capek disepelein terus, dia langsung ngomong: '${cleanTranslation}'")`,
      `"I refuse to tolerate this any longer: '${text}'" ("Gw nolak buat mentoleransi ini lebih lama lagi: '${cleanTranslation}'")`,
      `"Enough is enough, so I made it clear: '${text}'" ("Cukup ya cukup, jadi gw pertegas: '${cleanTranslation}'")`,
    ];
    examples = [pickVariedTemplate('angry_pool', angryPool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else if (tone === 'romantic_love') {
    // 💖 ROMANTIC / LOVE CONTEXT (6 variations)
    const romanticPool = [
      `"I don't say sweet things often, but honestly: '${text}'" ("Gw gak sering ngomong manis, tapi beneran deh: '${cleanTranslation}'")`,
      `"Every time I look into your eyes, I think: '${text}'" ("Tiap kali gw natap mata lu, gw mikir: '${cleanTranslation}'")`,
      `"Holding hands quietly under the evening sky: '${text}'" ("Genggaman tangan tenang di bawah langit sore: '${cleanTranslation}'")`,
      `"A genuine reminder of how much you mean to me: '${text}'" ("Pengingat tulus soal betapa berartinya lu buat gw: '${cleanTranslation}'")`,
      `"Softly sharing what has been on my heart: '${text}'" ("Dengan lembut ngungkapin apa yang ada di hati gw: '${cleanTranslation}'")`,
      `"No grand gestures needed, just simple honesty: '${text}'" ("Gak butuh gaya-gayaan berlebihan, cukup kejujuran sederhana: '${cleanTranslation}'")`,
    ];
    examples = [pickVariedTemplate('romantic_pool', romanticPool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else if (isActionOrImperative) {
    // ⚡ ACTION / IMPERATIVE CONTEXT (6 variations)
    const actionPool = [
      `"Take a deep breath and remember to ${text}." ("Tarik napas panjang dan jangan lupa buat ${cleanTranslation}.")`,
      `"Whenever things get overwhelming, don't hesitate to ${text}." ("Tiap kali situasi mulai berasa berat, jangan sungkan buat ${cleanTranslation}.")`,
      `"Before moving to the next step, make sure to ${text}." ("Sebelum lanjut ke tahap berikutnya, pastiin lu ${cleanTranslation}.")`,
      `"If you ever feel stuck, the best thing to do is ${text}." ("Kalo lu sempet ngerasa buntu, hal terbaik yang bisa dilakuin adalah ${cleanTranslation}.")`,
      `"A simple yet powerful rule to live by: always ${text}." ("Aturan simpel tapi berbobot buat dipegang: selalu ${cleanTranslation}.")`,
      `"No matter what happens around you, promise to ${text}." ("Gimanapun situasi sekitar lu, janji buat selalu ${cleanTranslation}.")`,
    ];
    examples = [pickVariedTemplate('action_pool', actionPool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  } else {
    // 💬 NEUTRAL SENTENCE DEFAULT: Real situational dialogues, never meta-tutorials
    const isCorrelative = /^the\s+(more|less|sooner|harder|longer|better|greater)\b/i.test(text);
    const isFirstPerson = /^(i|we|my|our)\b/i.test(text) || /\b(i'm|i've|i'd|i\s+feel|i\s+think)\b/i.test(text);
    const isSecondPerson = /^(you|your)\b/i.test(text) || /\b(you're|you've|you'd)\b/i.test(text);

    let situationalPool = [];

    if (isCorrelative) {
      situationalPool = [
        `"The truth is, ${text}, the more complicated things get." ("Kenyataannya, ${cleanTranslation}, situasinya malah makin rumit.")`,
        `"I realized that ${text}, the harder it becomes to find any real clue." ("Gw sadar kalau ${cleanTranslation}, makin susah buat nemu petunjuk jelas.")`,
        `"It felt like chasing shadows; ${text}, the less sense any of this makes." ("Rasanya kayak ngejar bayangan; ${cleanTranslation}, makin gak masuk akal semua ini.")`,
        `"She told me that ${text}, the further away the truth seems." ("Dia bilang ke gw kalau ${cleanTranslation}, kebenarannya malah kelihatan makin jauh.")`,
        `"No matter how fast we move, ${text}, the more exhausted we feel." ("Secepet apapun kita jalan, ${cleanTranslation}, rasanya malah makin capek.")`,
        `"It became obvious that ${text}, the more tension grew between them." ("Makin jelas kalau ${cleanTranslation}, tensi di antara mereka malah makin kerasa.")`,
      ];
    } else if (isFirstPerson) {
      situationalPool = [
        `"Honestly, ${text}, and that's why I need to take a step back." ("Jujur aja, ${cleanTranslation}, dan itu alasannya gw perlu ambil jeda sejenak.")`,
        `"I had to admit that ${text}, even though it wasn't easy to say out loud." ("Gw harus ngakuin kalau ${cleanTranslation}, meskipun gak gampang buat diucapin.")`,
        `"During our discussion, she paused when I said: '${text}.'" ("Pas obrolan kita, dia sempat terdiam waktu gw bilang: '${cleanTranslation}.'")`,
        `"To be completely real with you, ${text}." ("Biar bener-bener jujur sama lu ya, ${cleanTranslation}.")`,
        `"Sitting there in silence, all I could think was: '${text}.'" ("Duduk diam di sana, yang ada di pikiran gw cuma: '${cleanTranslation}.'")`,
        `"I wanted to make sure everyone understood that ${text}." ("Gw pengen pastiin semua orang paham kalau ${cleanTranslation}.")`,
      ];
    } else if (isSecondPerson) {
      situationalPool = [
        `"You can't just expect everything to be fine when ${text}." ("Lu gak bisa cuma ngarepin semuanya baik-baik aja pas ${cleanTranslation}.")`,
        `"I noticed that ${text}, so I wanted to check in on you." ("Gw ngeh kalau ${cleanTranslation}, makanya gw pengen nanyain kabar lu.")`,
        `"Before making any hasty decisions, remember that ${text}." ("Sebelum ambil keputusan gegabah, inget kalau ${cleanTranslation}.")`,
        `"She looked at you and said: '${text},' which changed the whole mood." ("Dia natap lu dan bilang: '${cleanTranslation},' yang langsung ngubah suasana.")`,
        `"It's important to realize that ${text} before it's too late." ("Penting buat sadar kalau ${cleanTranslation} sebelum semuanya terlambat.")`,
        `"They all agreed that ${text} was the main issue here." ("Mereka semua sepakat kalau ${cleanTranslation} emang jadi isu utamanya.")`,
      ];
    } else {
      situationalPool = [
        `"In situations like this, remember that ${text}." ("Di situasi kayak gini, inget kalau ${cleanTranslation}.")`,
        `"The conversation shifted when someone mentioned: '${text}.'" ("Arah obrolan langsung berubah pas ada yang nyeletuk: '${cleanTranslation}.'")`,
        `"It's pretty clear that ${text} under these circumstances." ("Cukup jelas kalau ${cleanTranslation} di kondisi kayak gini.")`,
        `"She smiled gently and said: '${text}.'" ("Dia senyum tipis terus bilang: '${cleanTranslation}.'")`,
        `"Everyone in the room agreed that ${text}." ("Semua orang di ruangan itu setuju kalau ${cleanTranslation}.")`,
        `"Looking back at what happened, ${text} makes total sense now." ("Kalo diinget lagi apa yang kejadian, ${cleanTranslation} sekarang masuk akal banget.")`,
      ];
    }

    examples = [pickVariedTemplate('situational_pool', situationalPool)];
    note = generateDynamicRantauNote(text, cleanTranslation, tone, wordCount);
    maknaFilosofis = generateDynamicMaknaFilosofis(text, cleanTranslation, tone, wordCount);
  }

  const sanitizedExamples = (examples || [])
    .map((ex) => validateAndSanitizeExample(ex, text, cleanTranslation))
    .filter(Boolean)
    .slice(0, Math.max(1, exampleCount));

  return {
    arti: finalArti,
    cara_baca: phonetics || text.toLowerCase(),
    penggunaan: sanitizedExamples,
    catatan: note,
    maknaFilosofis: maknaFilosofis,
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
  const rawFull = await fetchLiveTranslation(text);
  const fullTranslation = normalizePronounsToJaksel(rawFull || text);

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
  const rawFocusMeaning = await fetchLiveTranslation(focusPhrase) || "makna frasa lirik pilihan";
  const focusPhraseMeaning = normalizePronounsToJaksel(rawFocusMeaning);

  // 4. Generate contextual original example sentence with focusPhrase (MASALAH 3 POIN 2: focusPhrase WAJIB muncul verbatim)
  const songExampleTemplates = [
    `In everyday conversation, you can naturally use "${focusPhrase}" when expressing your feelings. (Di percakapan sehari-hari, lu bisa wajar memakai "${focusPhrase}" pas lagi ngungkapin perasaan lu.)`,
    `Reflecting on that moment, he admitted: "${focusPhrase}." (Merenungkan momen itu, dia mengakui: "${focusPhraseMeaning}.")`,
    `When speaking from the heart, she whispered: "${focusPhrase}." (Pas lagi ngomong dari lubuk hati terdalam, dia berbisik: "${focusPhraseMeaning}.")`,
    `You can borrow this line directly: "${focusPhrase}" to describe what you're going through. (Lu bisa langsung pinjam kalimat "${focusPhrase}" buat melukiskan apa yang lagi lu alamin.)`,
    `It captures that vulnerable feeling so well: "${focusPhrase}." (Kalimat ini nangkep perasaan rapuh itu dengan pas: "${focusPhraseMeaning}.")`,
    `Whenever you need words for that exact sentiment, just say: "${focusPhrase}." (Tiap kali lu butuh kata-kata buat rasa itu, tinggal bilang: "${focusPhraseMeaning}.")`
  ];

  const rawOriginalExample = pickVariedTemplate('song_dual_example', songExampleTemplates);
  const originalExampleSentence = validateAndSanitizeExample(
    rawOriginalExample,
    text,
    focusPhraseMeaning,
    focusPhrase
  );

  // 5. Emotional meaning explanation
  const meaningExplanation = `Tbh lirik ini membawa nuansa emosional mendalam yang melukiskan suasana hati atau refleksi batin — which is relate banget pas lu lagi dengerin lagu jam 2 pagi. Di obrolan sehari-hari, lu bisa pakai frasa intinya ("${focusPhrase}") buat ngungkapin perasaan jujur ke temen dekat tanpa terdengar kaku!`;

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
    maknaFilosofis: `Musik adalah bahasa emosi universal. Melalui bait lirik ini, penyanyi melukiskan kerapuhan rasa yang sering kali kita rasakan tapi sulit diungkapkan secara gamblang dalam obrolan sehari-hari.`,
    confidenceLevel: 'high',
    penggunaan: [originalExampleSentence],
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
    maknaFilosofis: displayContent.maknaFilosofis,
    confidenceLevel: 'high',
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

// ══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE LOCAL BREAKDOWN DICTIONARIES (GUARANTEED OFFLINE / INSTANT 0ms)
// ══════════════════════════════════════════════════════════════════════════════
const BREAKDOWN_KNOWN_PHRASES = {
  "pretty wife": "istri yang cantik",
  "the lights in my soul": "cahaya dalam jiwa gw",
  "lights in my soul": "cahaya dalam jiwa gw",
  "in my soul": "dalam jiwa gw",
  "have no idea": "sama sekali gak paham / gak tau",
  "no idea": "gak ada ide / sama sekali gak tau",
  "i've been through": "udah pernah gw lewatin / alamin",
  "been through": "pernah ngelewatin masa-masa sulit",
  "you have": "lu punya",
  "you got": "lu dapet / lu punya",
  "piece of cake": "gampang banget / sepele",
  "break a leg": "semoga sukses / beruntung!",
  "better off": "lebih bahagia / lebih baik",
  "better off without you": "lebih bahagia tanpa lu",
  "without you": "tanpa lu",
  "with you": "bareng lu",
  "call it a day": "udahan dulu hari ini",
  "couch potato": "orang yang mageran / rebahan melulu",
  "fall in love": "jatuh cinta",
  "figure out": "mencari tahu / memahami",
  "give up": "menyerah",
  "giving up": "menyerah",
  "look forward to": "gak sabar nungguin",
  "make sure": "memastikan",
  "lost myself": "sempat lepas kendali / lupa diri",
  "lose myself": "kehilangan kendali atas diri sendiri",
  "no surprises": "tanpa kejutan buruk atau kepanikan",
  "cut the crap": "stop omong kosong, langsung jujur aja",
  "close call": "nyaris celaka / tipis banget selamatnya",
  "thru these tears": "di balik derasnya air mata ini",
  "through these tears": "di balik derasnya air mata ini",
  "karma police": "polisi karma / hukum sebab-akibat",
  "hang in there": "tetap bertahan dan semangat ya",
  "bite the bullet": "terpaksa jalanin hal yang berat",
  "so far so good": "sejauh ini masih aman terkendali",
  "under the weather": "lagi kurang enak badan",
  "on cloud nine": "senang dan bahagia luar biasa",
  "spill the beans": "bocorin rahasia",
  "once in a blue moon": "jarang banget terjadi",
  "see eye to eye": "sependapat dan sefrekuensi",
  "cost an arm and a leg": "mahal banget gila",
  "hit the sack": "tidur atau istirahat",
  "run out of": "kehabisan",
  "put up with": "mentoleransi / sabar ngadepin",
  "take care of": "merawat / ngurusin",
  "calm down": "tenang dulu ya",
  "cheer up": "semangat dong, jangan sedih",
  "find out": "mencari tahu / menemukan",
  "grow up": "tumbuh dewasa",
  "hold on": "tunggu sebentar",
  "wake up": "bangun tidur",
  "come on": "ayolah",
  "right now": "sekarang juga / saat ini",
  "at all": "sama sekali",
  "as well": "juga",
  "in love": "jatuh cinta",
  "in the end": "pada akhirnya",
  "by the way": "ngomong-ngomong",
  "of course": "tentu saja",
  "each other": "satu sama lain",
  "one another": "satu sama lain",
  "a lot of": "banyak banget",
  "lots of": "banyak banget",
  "so much": "banyak banget",
  "too much": "kebanyakan / berlebihan",
  "kind of": "agak-agak / semacam",
  "sort of": "semacam / rada-rada",
};

const BREAKDOWN_KNOWN_WORDS = {
  i: "gw",
  "i'm": "gw lagi / gw",
  "i've": "gw udah",
  "i'd": "gw bakal",
  "i'll": "gw bakal",
  you: "lu",
  "you're": "lu",
  "you've": "lu udah",
  "you'll": "lu bakal",
  we: "kita",
  "we're": "kita",
  "we've": "kita udah",
  they: "mereka",
  "they're": "mereka",
  "they've": "mereka udah",
  he: "dia (cowo)",
  "he's": "dia",
  she: "dia (cewe)",
  "she's": "dia",
  it: "itu",
  "it's": "itu",
  my: "punya gw",
  your: "punya lu",
  our: "punya kita",
  their: "punya mereka",
  his: "punya dia",
  her: "punya dia",
  me: "gw",
  us: "kita",
  them: "mereka",
  a: "sebuah / suatu",
  an: "sebuah / suatu",
  the: "itu / sang",
  all: "semua",
  some: "beberapa",
  any: "apa pun / ada",
  every: "setiap",
  each: "setiap / masing-masing",
  more: "lebih banyak",
  most: "paling banyak",
  much: "banyak",
  many: "banyak",
  few: "sedikit",
  little: "sedikit",
  what: "apa / apa yang",
  who: "siapa",
  where: "di mana",
  when: "kapan / pas",
  why: "kenapa",
  how: "gimana",
  which: "yang mana",
  that: "itu / bahwa",
  this: "ini",
  these: "ini semua",
  those: "itu semua",
  and: "dan",
  but: "tapi",
  or: "atau",
  so: "jadi / banget",
  if: "kalo / jika",
  because: "karena",
  although: "meskipun",
  though: "padahal / tapi",
  as: "sebagai / seperti",
  than: "daripada",
  have: "punya / memiliki",
  has: "punya",
  had: "punya / sempat",
  having: "lagi punya",
  do: "ngelakuin",
  does: "ngelakuin",
  did: "ngelakuin",
  done: "udah selesai",
  been: "udah pernah / jadi",
  be: "menjadi",
  is: "adalah / lagi",
  are: "adalah / lagi",
  am: "adalah / lagi",
  was: "tadi / waktu itu",
  were: "waktu itu",
  can: "bisa",
  could: "bisa",
  will: "bakal",
  would: "bakal",
  should: "harusnya",
  must: "harus",
  might: "mungkin",
  may: "boleh / mungkin",
  know: "tahu / paham",
  knew: "tahu (dulu)",
  known: "diketahui",
  think: "mikir / ngerasa",
  thought: "pikiran / ngira",
  feel: "ngerasa",
  felt: "ngerasa (tadi)",
  feeling: "perasaan",
  see: "melihat / paham",
  saw: "ngeliat",
  seen: "dilihat",
  look: "ngeliat / keliatan",
  say: "ngomong / bilang",
  said: "bilang",
  tell: "ngasih tau",
  told: "ngasih tau",
  go: "pergi",
  went: "pergi",
  gone: "udah pergi",
  come: "datang",
  came: "datang",
  take: "ngambil / butuh",
  took: "ngambil",
  make: "bikin",
  made: "bikin / dibuat",
  give: "ngasih",
  gave: "ngasih",
  get: "dapat / jadi",
  got: "dapat / paham",
  want: "pengen / mau",
  wanted: "pengen",
  need: "butuh",
  needed: "butuh",
  try: "nyoba",
  tried: "udah nyoba",
  help: "bantu",
  love: "cinta / sayang",
  loved: "disayang",
  like: "suka / kayak",
  liked: "suka",
  hate: "benci",
  hope: "berharap",
  wish: "berharap / andai",
  leave: "pergi / ninggalin",
  left: "kiri / ninggalin",
  keep: "menjaga / tetap",
  stay: "tinggal / bertahan",
  find: "menemukan",
  found: "menemukan",
  lose: "kehilangan / kalah",
  lost: "hilang / lupa diri",
  break: "rusak / istirahat",
  broke: "patah / bokek",
  broken: "hancur / rusak",
  cry: "nangis",
  smile: "senyum",
  talk: "ngobrol",
  speak: "bicara",
  listen: "dengerin",
  hear: "dengar",
  heard: "dengar",
  remember: "ingat",
  forget: "lupa",
  forgot: "lupa",
  understand: "paham",
  no: "tidak / gak ada",
  not: "bukan / gak",
  never: "gak pernah",
  always: "selalu",
  sometimes: "kadang-kadang",
  often: "sering",
  usually: "biasanya",
  idea: "ide / bayangan",
  through: "melalui / ngelewatin",
  about: "tentang / kira-kira",
  after: "setelah",
  before: "sebelum",
  with: "bersama / sama",
  without: "tanpa",
  from: "dari",
  to: "ke / untuk",
  for: "buat / untuk",
  of: "dari",
  in: "di dalam",
  on: "di atas / nyala",
  at: "di",
  by: "oleh / lewat",
  up: "ke atas / naik",
  down: "ke bawah / turun",
  out: "keluar",
  over: "selesai / lewat",
  under: "di bawah",
  again: "lagi",
  now: "sekarang",
  then: "lalu / waktu itu",
  here: "di sini",
  there: "di sana",
  too: "terlalu / juga",
  very: "banget / sangat",
  just: "cuma / baru aja",
  only: "hanya / cuma",
  even: "bahkan",
  still: "masih",
  already: "udah",
  time: "waktu",
  day: "hari",
  night: "malam",
  life: "hidup",
  world: "dunia",
  heart: "hati",
  mind: "pikiran",
  soul: "jiwa",
  friend: "teman",
  people: "orang-orang",
  person: "orang",
  thing: "hal / barang",
  things: "hal-hal",
  way: "cara / jalan",
  good: "bagus / baik",
  better: "lebih baik",
  best: "terbaik",
  bad: "buruk",
  worse: "lebih buruk",
  worst: "paling buruk",
  hard: "susah / keras",
  easy: "gampang",
  real: "nyata",
  true: "bener / jujur",
  right: "bener / tepat",
  wrong: "salah",
  happy: "senang / bahagia",
  sad: "sedih / galau",
  cake: "kue",
  piece: "potongan / bagian",
  leg: "kaki",
  trace: "melacak / menelusuri / jejak",
  wife: "istri",
  husband: "suami",
  pretty: "cantik",
  lights: "cahaya / penerang",
  pointed: "mengingatkan / menunjukkan",
  colleague: "rekan kerja / temen kantor",
  situation: "situasi / keadaan",
};

/**
 * Fallback word/phrase breakdown using smart semantic chunker & local dictionaries.
 * Groups idioms, prepositional units, and phrasal verbs together.
 * Guarantees NEVER returning an empty array for any multi-word sentence!
 */
export async function generateWordBreakdownFallback(text) {
  if (!text || typeof text !== "string") return [];
  const clean = text.trim();
  if (!clean) return [];

  const rawWords = clean.split(/\s+/).filter(Boolean);
  if (rawWords.length === 0) return [];

  // Special case: single word
  if (rawWords.length === 1) {
    const rawWord = rawWords[0];
    const cleanWord = rawWord.replace(/^[^\w']+|[^\w']+$/g, "").toLowerCase();
    let arti =
      BREAKDOWN_KNOWN_WORDS[cleanWord] ||
      vocab1000[cleanWord]?.arti ||
      cleanWord;
    return [{ phrase: rawWord, arti: normalizePronounsToJaksel(arti) }];
  }

  // Multi-word semantic chunking
  const units = [];
  let i = 0;

  while (i < rawWords.length) {
    let matched = false;

    // Try multi-word phrases (longest match from 4 words down to 2)
    for (let len = Math.min(4, rawWords.length - i); len >= 2; len--) {
      const slice = rawWords.slice(i, i + len);
      const joinedClean = slice
        .map((w) => w.replace(/^[^\w']+|[^\w']+$/g, "").toLowerCase())
        .join(" ");

      if (BREAKDOWN_KNOWN_PHRASES[joinedClean]) {
        units.push({
          phrase: slice.join(" "),
          arti: BREAKDOWN_KNOWN_PHRASES[joinedClean],
        });
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const current = rawWords[i];
      const cleanCurrent = current.replace(/^[^\w']+|[^\w']+$/g, "");

      // Group 'to' or 'with' with subsequent word if available
      if (
        (cleanCurrent.toLowerCase() === "to" || cleanCurrent.toLowerCase() === "with") &&
        i + 1 < rawWords.length
      ) {
        const nextWord = rawWords[i + 1];
        const cleanNext = nextWord.replace(/^[^\w']+|[^\w']+$/g, "").toLowerCase();
        const nextArti =
          BREAKDOWN_KNOWN_WORDS[cleanNext] ||
          vocab1000[cleanNext]?.arti ||
          cleanNext;
        const prefix = cleanCurrent.toLowerCase() === "to" ? "untuk / ke" : "sama / bareng";
        units.push({
          phrase: `${current} ${nextWord}`,
          arti: `${prefix} ${nextArti}`,
        });
        i += 2;
      } else {
        const cleanWord = cleanCurrent.toLowerCase();
        let arti =
          BREAKDOWN_KNOWN_WORDS[cleanWord] ||
          vocab1000[cleanWord]?.arti ||
          "";

        units.push({
          phrase: current,
          arti: arti,
        });
        i++;
      }
    }
  }

  // If an entire multi-word idiom was matched as a single unit (e.g. "piece of cake"),
  // also add its component words so the user gets multiple rich 3D cards to flip
  if (units.length === 1 && rawWords.length >= 2) {
    const mainIdiom = units[0];
    mainIdiom.arti = `${mainIdiom.arti} (Idiom / Ungkapan)`;
    for (const w of rawWords) {
      const cleanW = w.replace(/^[^\w']+|[^\w']+$/g, "").toLowerCase();
      if (cleanW && cleanW !== mainIdiom.phrase.toLowerCase()) {
        const wArti =
          BREAKDOWN_KNOWN_WORDS[cleanW] ||
          vocab1000[cleanW]?.arti ||
          "";
        units.push({
          phrase: w,
          arti: wArti,
        });
      }
    }
  }

  // If any units are missing an Indonesian translation, try quick fetchLiveTranslation
  const results = await Promise.all(
    units.map(async (unit) => {
      let arti = unit.arti;
      if (!arti || arti.trim().length === 0) {
        try {
          const cleanP = unit.phrase.replace(/^[^\w']+|[^\w']+$/g, "").trim();
          const live = await fetchLiveTranslation(cleanP || unit.phrase);
          if (live && live.trim().toLowerCase() !== cleanP.toLowerCase()) {
            arti = live;
          }
        } catch {
          // ignore error
        }
      }
      if (!arti || arti.trim().length === 0) {
        arti = unit.phrase;
      }
      return {
        phrase: unit.phrase,
        arti: normalizePronounsToJaksel(arti),
      };
    })
  );

  return results.length > 0
    ? results
    : rawWords.map((w) => ({ phrase: w, arti: w }));
}
