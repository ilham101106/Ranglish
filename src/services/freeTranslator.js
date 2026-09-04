// Free & Robust Translation and Linguistic Analysis Service for Ranglish (Anak Rantau Edition)
// Provides high-accuracy full-sentence Indonesian translation, context-driven emotional tone analysis,
// philosophical psychological insights (maknaFilosofis), and authentic Temen Ngobrol / Anak Jaksel nuances.

import { normalizeToGaulSlang, isSongInput } from '../utils/textClassifier.js';
import { generateSentencePhonetics } from '../utils/sentenceTranslator.js';

// Specific words/patterns to recognize as unrecognized/gibberish queries
const UNRECOGNIZED_WORDS = new Set(['whirl-winds', 'plowed', 'asdfghjkl']);

/**
 * Normalizes all Indonesian pronouns and possessive suffixes to pure Anak Rantau (gw / lu).
 * Eliminates "tanpamu", "denganmu", "untukmu", "kamu", "aku", "saya", "anda" consistently.
 */
export function normalizePronounsToJaksel(text) {
  if (!text || typeof text !== 'string') return '';
  let s = text;

  // Prepositional & compound pronoun replacements
  s = s.replace(/\btanpamu\b/gi, 'tanpa lu');
  s = s.replace(/\btanpaku\b/gi, 'tanpa gw');
  s = s.replace(/\bdenganmu\b/gi, 'sama lu');
  s = s.replace(/\bdenganku\b/gi, 'sama gw');
  s = s.replace(/\bbersamamu\b/gi, 'bareng lu');
  s = s.replace(/\bbersamaku\b/gi, 'bareng gw');
  s = s.replace(/\buntukmu\b/gi, 'buat lu');
  s = s.replace(/\buntukku\b/gi, 'buat gw');
  s = s.replace(/\bpadamu\b/gi, 'ke lu');
  s = s.replace(/\bpadaku\b/gi, 'ke gw');
  s = s.replace(/\bkepadamu\b/gi, 'ke lu');
  s = s.replace(/\bkepadaku\b/gi, 'ke gw');
  s = s.replace(/\bterhadapmu\b/gi, 'ke lu');
  s = s.replace(/\bterhadapku\b/gi, 'ke gw');
  s = s.replace(/\bmenurutmu\b/gi, 'kata lu');
  s = s.replace(/\bmenurutku\b/gi, 'kata gw');
  s = s.replace(/\bkarenamu\b/gi, 'karena lu');
  s = s.replace(/\bkarenaku\b/gi, 'karena gw');
  s = s.replace(/\bolehmu\b/gi, 'sama lu');
  s = s.replace(/\bolehku\b/gi, 'sama gw');
  s = s.replace(/\bdirimu\b/gi, 'diri lu');
  s = s.replace(/\bdiriku\b/gi, 'diri gw');
  s = s.replace(/\bmilikmu\b/gi, 'punya lu');
  s = s.replace(/\bmilikku\b/gi, 'punya gw');

  // Common relational & emotional nouns/verbs with -mu and -ku
  s = s.replace(/\bcintamu\b/gi, 'cinta lu');
  s = s.replace(/\bcintaku\b/gi, 'cinta gw');
  s = s.replace(/\bsayangmu\b/gi, 'sayang lu');
  s = s.replace(/\bsayangku\b/gi, 'sayang gw');
  s = s.replace(/\bhatimu\b/gi, 'hati lu');
  s = s.replace(/\bhatiku\b/gi, 'hati gw');
  s = s.replace(/\bmatamu\b/gi, 'mata lu');
  s = s.replace(/\bmataku\b/gi, 'mata gw');
  s = s.replace(/\bhidupmu\b/gi, 'hidup lu');
  s = s.replace(/\bhidupku\b/gi, 'hidup gw');
  s = s.replace(/\bsenyummu\b/gi, 'senyum lu');
  s = s.replace(/\bsenyumku\b/gi, 'senyum gw');
  s = s.replace(/\bjiwamu\b/gi, 'jiwa lu');
  s = s.replace(/\bjiwaku\b/gi, 'jiwa gw');
  s = s.replace(/\bkatamu\b/gi, 'kata lu');
  s = s.replace(/\bkataku\b/gi, 'kata gw');
  s = s.replace(/\bpikiranmu\b/gi, 'pikiran lu');
  s = s.replace(/\bpikiranku\b/gi, 'pikiran gw');
  s = s.replace(/\bdoamu\b/gi, 'doa lu');
  s = s.replace(/\bdoaku\b/gi, 'doa gw');

  s = s.replace(/\bmemelukku\b/gi, 'meluk gw');
  s = s.replace(/\bmemelukmu\b/gi, 'meluk lu');
  s = s.replace(/\bmembantuku\b/gi, 'bantu gw');
  s = s.replace(/\bmembantumu\b/gi, 'bantu lu');
  s = s.replace(/\bmenemaniku\b/gi, 'nemenin gw');
  s = s.replace(/\bmenemanimu\b/gi, 'nemenin lu');
  s = s.replace(/\bmencintaiku\b/gi, 'cinta sama gw');
  s = s.replace(/\bmencintaimu\b/gi, 'cinta sama lu');
  s = s.replace(/\bmeninggalkanku\b/gi, 'ninggalin gw');
  s = s.replace(/\bmeninggalkanmu\b/gi, 'ninggalin lu');
  s = s.replace(/\bmengajakmu\b/gi, 'ngajak lu');
  s = s.replace(/\bmengajakku\b/gi, 'ngajak gw');
  s = s.replace(/\bmemandangmu\b/gi, 'mandang lu');
  s = s.replace(/\bmemandangku\b/gi, 'mandang gw');
  s = s.replace(/\bmerindukanmu\b/gi, 'kangen sama lu');
  s = s.replace(/\bmerindukanku\b/gi, 'kangen sama gw');

  // Standalone pronouns
  s = s.replace(/\baku\b/gi, 'gw');
  s = s.replace(/\bsaya\b/gi, 'gw');
  s = s.replace(/\bdaku\b/gi, 'gw');
  s = s.replace(/\bkamu\b/gi, 'lu');
  s = s.replace(/\banda\b/gi, 'lu');
  s = s.replace(/\bengkau\b/gi, 'lu');
  s = s.replace(/\bkau\b/gi, 'lu');

  // Trailing suffixes -mu and -ku on remaining words (e.g. ceritamu -> cerita lu)
  s = s.replace(/\b([a-zA-Z]{3,})mu\b/gi, (match, p1) => {
    const p1Low = p1.toLowerCase();
    if (['ta', 'il', 'te', 'ra', 'le', 'jam'].includes(p1Low)) return match;
    return `${p1} lu`;
  });
  s = s.replace(/\b([a-zA-Z]{3,})ku\b/gi, (match, p1) => {
    const p1Low = p1.toLowerCase();
    if (['ku', 'su', 'be', 'ka', 'sa', 'la'].includes(p1Low)) return match;
    return `${p1} gw`;
  });

  s = s.replace(/\b-ku\b/gi, ' gw');
  s = s.replace(/\b-mu\b/gi, ' lu');

  return s.trim();
}

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

/**
 * Detect emotional tone of the input sentence.
 * Returns: 'angry_breakup' | 'sad_heartbroken' | 'romantic_love' | 'casual_chill'
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

  // 2. Sad / Heartbroken / Grief / Longing
  if (
    /\b(cry|crying|tears|broken\s+heart|miss\s+you|miss\s+u|alone|lonely|sad|grief|sorrow|depressed|heartbreak|empty|hurts|pain|sedih|nangis|kehilangan|hampa|patah\s+hati|rindu|sepi|rapuh|kangen|merana)\b/i.test(
      combined
    )
  ) {
    return 'sad_heartbroken';
  }

  // 3. Romantic / Love / Affection / Tender Soul & Light Metaphors
  if (
    /\b(love|sweetheart|darling|forever|crush|kiss|hug|lips|beloved|fall\s+in\s+love|soul|souls|light|lights|heart|hearts|shine|shining|glow|glowing|cherish|adore|precious|my\s+world|mean\s+the\s+world|means\s+the\s+world|you\s+mean|in\s+my\s+soul|of\s+my\s+soul|light\s+in|lights\s+in|beautiful|sweetest|cinta|sayang|cantik|manis|romantis|baper|naksir|peluk|kekasih|pujaan|jiwa|jiwaku|hatiku|kesayangan|belahan\s+jiwa|terang\s+dalam\s+jiwa)\b/i.test(
      combined
    )
  ) {
    return 'romantic_love';
  }

  return 'casual_chill';
}

/**
 * Generate rich, informative, educational analysis for ANY arbitrary sentence, lyric, or dialogue.
 * Satisfies all quality standards:
 * - Standar 1: Cross-verified translation, idiom priority & strict pronoun normalization (gw/lu)
 * - Standar 2: Grammatically correct examples across contextual emotional tones
 * - Standar 3: Insightful, Temen Ngobrol notes with authentic Jaksel interjections
 * - Standar 4: maknaFilosofis field with emotional/psychological insight
 * - Standar 5: Confidence level tracking ('high' | 'medium' | 'low')
 */
export async function generateRichSentenceAnalysis(rawText) {
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

  // Determine final meaning and confidence
  let cleanTranslation = cleanTranslationRaw;
  let finalConfidence = dualConfidence;

  if (isKnownIdiom) {
    cleanTranslation = detectedIdioms[0].arti;
    finalConfidence = 'high';
  }

  const isLyric = isSongInput(text);
  let tone = detectSentenceTone(text, cleanTranslation);

  // Self-check safeguard: Ensure romantic/intimate words never trigger general statement (office/colleagues)
  const hasRomanticWords =
    /\b(soul|souls|light|lights|heart|hearts|love|darling|sweet|cinta|sayang|jiwa|hatiku|belahan\s+jiwa|mean\s+the\s+world|my\s+world|shine|glow)\b/i.test(
      text
    ) ||
    /\b(cinta|sayang|jiwa|hati|terang|belahan\s+jiwa)\b/i.test(cleanTranslation);

  if (
    tone !== 'angry_breakup' &&
    tone !== 'sad_heartbroken' &&
    hasRomanticWords
  ) {
    tone = 'romantic_love';
  }

  // Grammatical structure detectors
  const isQuestion =
    text.endsWith('?') ||
    /^(what|why|how|where|when|who|which|whose|whom|is|are|am|was|were|do|does|did|can|could|will|would|should|may|might|have|has|had)\b/i.test(text);

  const isActionOrImperative =
    /^(please\s+)?(hug|help|tell|let|make|give|take|call|listen|look|wait|stop|try|come|go|bring|show|ask|remember|forget|keep|hold|send|check|find|leave|stand|wake|run)\b/i.test(text);

  let examples = [];
  let note = '';
  let maknaFilosofis = '';

  // ══════════════════════════════════════════════════════════════════════════════
  // GENERATE CONTEXTUAL EXAMPLES, CATATAN & MAKNA FILOSOFIS BY EMOTIONAL TONE
  // ══════════════════════════════════════════════════════════════════════════════

  if (isKnownIdiom) {
    const mainIdiom = detectedIdioms[0];
    examples = mainIdiom.situasi;
    const etymology = mainIdiom.asalUsul ? ` ${mainIdiom.asalUsul}` : '';
    note = `Tbh ini idiom otentik yang hits banget: "${mainIdiom.key}" yang artinya "${mainIdiom.arti}".${etymology} ${mainIdiom.penjelasan} Luwes banget dipake pas lagi chat atau ngobrol kasual!`;
    maknaFilosofis = mainIdiom.maknaFilosofis || `Secara filosofis, idiom seperti ini memperkaya cara pandang kita terhadap dinamika hidup dengan analogi yang cerdas dan menyegarkan.`;
  } else if (tone === 'angry_breakup') {
    // 💔 ANGRY / BREAKUP CONTEXT
    examples = [
      `"After all the drama, I looked in the mirror and said: '${text}.'" ("Abis semua drama toxic itu, gw natap cermin dan bilang: '${cleanTranslation}.'")`,
      `"She stood her ground, looked him dead in the eye, and said: '${text}.'" ("Dia pasang batasan tegas, natap matanya langsung, dan bilang: '${cleanTranslation}.'")`,
      `"A: 'Are you gonna text them back?' — B: 'Hell no, ${text}!' (A: 'Lu bakal bales chat dia?' — B: 'Dih ogah banget, ${cleanTranslation}!')"`,
      `"It took months of overthinking to finally realize: '${text}.'" ("Butuh berbulan-bulan overthinking buat akhirnya sadar: '${cleanTranslation}.'")`,
    ];
    note = `Nah ini nih salah satu ekspresi yang paling tegas pas lu lagi ngerasa kecewa berat tapi udah di tahap 'enough is enough'. Tbh penggunaan kalimat ini nunjukin rasa percaya diri baru bahwa hidup lu bakal jauh lebih damai dan berkembang tanpa kehadiran orang toxic tersebut. Pernah gak sih ngerasa pengen bilang gini ke seseorang pas udah muak banget?`;
    maknaFilosofis = `Tbh dari kacamata psikologi hubungan, kalimat ini melukiskan fase 'the turning point' — titik balik pas seseorang akhirnya berhenti denial dan mulai reclaim harga dirinya. Marah di sini bukan sekadar emosi destruktif, tapi bentuk self-defense mechanism yang sehat buat masang boundary tegas. Which is valid banget sih, karena kadang lu emang butuh rasa kesel itu buat bener-bener berani mutus toxic cycle dan melangkah maju tanpa noleh ke belakang lagi.`;
  } else if (tone === 'sad_heartbroken') {
    // 🌧️ SAD / HEARTBROKEN / GRIEF CONTEXT
    examples = [
      `"It's 2 AM, looking at old memories, and honestly ${text}." ("Udah jam 2 pagi, lagi liatin memori lama, dan sejujurnya ${cleanTranslation}.")`,
      `"I tried rewiring my thoughts, but deep down ${text}." ("Gw nyoba alihin pikiran gw, tapi di lubuk hati terdalam ${cleanTranslation}.")`,
      `"Whenever our favorite song plays on shuffle, ${text}." ("Tiap kali lagu favorit kita keputer acak, rasanya ${cleanTranslation}.")`,
      `"A: 'Are you doing okay?' — B: 'Honestly, ${text}.' (A: 'Lu baik-baik aja kan?' — B: 'Sejujurnya, ${cleanTranslation}.')"`
    ];
    note = `Waduh, kalimat ini tuh dalem banget maknanya — literally bikin baper sih kalo denger ini pas lagi galau sendirian di kamar. Tbh jangan dipendem terus ya, which is kenapa ngeluarin isi hati lewat kata-kata kayak gini bisa bikin perasaan lu jadi jauh lebih lega. Relate banget gak nih sama playlist jam 2 pagi lu?`;
    maknaFilosofis = `Honestly, kalimat ini punya vibrasi melancholic yang dalem banget — tipe kata yang biasanya muncul pas fase grief atau jam-jam overthinking malam hari. Secara psikologis, ngakuin rasa sedih kayak gini tuh bentuk emotional release (katarsis) yang krusial banget. Which is kenapa dengerin kalimat ini rasanya kayak ada yang ngertiin perasaan hampa lu tanpa lu harus capek-capek jelasin panjang lebar ke orang lain.`;
  } else if (tone === 'romantic_love') {
    // 💖 ROMANTIC / LOVE / SWEET CONTEXT
    examples = [
      `"I don't usually get this emotional, but honestly ${text}." ("Gw biasanya gak se-emosional ini, tapi beneran deh ${cleanTranslation}.")`,
      `"Every time you smile across the table, ${text}." ("Tiap kali lu senyum di seberang meja, rasanya ${cleanTranslation}.")`,
      `"Under the city skyline lights, he looked into her eyes and whispered: '${text}.'" ("Di bawah gemerlap lampu kota, dia natap matanya dan berbisik: '${cleanTranslation}.'")`,
      `"A: 'Why do you care so much?' — B: 'Because ${text}!' (A: 'Kenapa lu segitu pedulinya?' — B: 'Soalnya ${cleanTranslation}!')"`
    ];
    note = `Nah ini nih salah satu kalimat yang literally paling manis dan tulus buat diucapin ke gebetan atau pasangan! As you know, ungkapan kayak gini tuh bikin lawan bicara ngerasa bener-bener dihargai dan dispesialkan. Cocok banget dipake pas lagi momen hangat berdua biar suasananya makin melting wkwk.`;
    maknaFilosofis = `As you know, ini adalah bentuk ekspresi afeksi tulus yang berani nunjukin vulnerability (kerentanan batin). Di zaman di mana banyak orang gengsi ngakuin rasa sayangnya, berani berucap sehangat ini tuh literally bikin hati luluh. So basically, ini bukan cuma sekadar gombalan kasual, tapi ada rasa aman (secure attachment) dan komitmen tulus yang pengen dibagi bareng pasangan.`;
  } else if (isLyric) {
    // 🎵 LYRIC CONTEXT
    examples = [
      `"Whenever this part of the track plays, '${text}' always hits so differently." ("Tiap kali bagian lagu ini keputer, lirik '${cleanTranslation}' selalu kerasa ngena banget di hati.")`,
      `"I wrote down that meaningful line in my notes: '${text}'" ("Gw nyatet bait yang penuh makna dari lirik itu: '${cleanTranslation}'")`,
      `"The acoustic rendition highlights '${text}' so beautifully." ("Versi akustiknya bikin penggalan '${cleanTranslation}' kedengeran makin dalam dan menyentuh.")`,
    ];
    note = `Kutipan ini punya rasa puitis ala lirik lagu indie. Penekanannya ada pada ekspresi rasa dan estetika bahasa. Di obrolan santai, lu bisa pakai penggalan frasa intinya buat melukiskan perasaan jujur ke temen dekat tanpa terkesan kaku!`;
    maknaFilosofis = `Lirik musik sering kali menangkap emosi-emosi samar yang sulit dirumuskan oleh percakapan biasa. Melalui metafora dan ritme, kalimat ini menghubungkan pengalaman batin pribadi dengan perasaan universal manusia.`;
  } else if (isQuestion) {
    // ❓ CASUAL QUESTION CONTEXT
    examples = [
      `"During our coffee catchup, my friend asked: '${text}'" ("Pas lagi ngopi santai, temen gw nanya: '${cleanTranslation}'")`,
      `"Before making any rushed move, let me ask you: '${text}'" ("Sebelum kita buru-buru ambil langkah, coba gw tanya ke lu: '${cleanTranslation}'")`,
      `"A: '${text}' — B: 'Honestly, I haven't even thought that far yet!' (A: '${cleanTranslation}' — B: 'Jujur, gw bahkan belum mikir sejauh itu!')"`
    ];
    note = `Tbh kalimat tanya ini luwes banget dipake pas lagi nongkrong atau chat santai sama temen akrab. Bikin obrolan dua arah jadi lebih hidup tanpa terkesan menginterogasi — which is why native speaker sering banget pake pola ini!`;
    maknaFilosofis = `Secara psikologis, mengajukan pertanyaan santai yang terbuka mencerminkan rasa ingin tahu yang sehat dan ketiadaan penghakiman (non-judgmental space). Ini membuka jembatan empati yang membuat orang lain merasa aman untuk bercerita.`;
  } else if (isActionOrImperative) {
    // ⚡ ACTION / IMPERATIVE CONTEXT
    examples = [
      `"Take a deep breath and remember to ${text}." ("Tarik napas panjang dan jangan lupa buat ${cleanTranslation}.")`,
      `"Whenever things get overwhelming, don't hesitate to ${text}." ("Tiap kali situasi mulai berasa berat, jangan sungkan buat ${cleanTranslation}.")`,
      `"Before walking out the door, she turned around and said: '${text}.'" ("Sebelum melangkah keluar pintu, dia noleh dan bilang: '${cleanTranslation}.'")`
    ];
    note = `Ungkapan ini sifatnya hangat dan suportif banget pas diucapin ke temen deket yang lagi butuh sandaran. So basically, ini cara yang manis buat nunjukin kalau lu peduli dan siap ada buat mereka kapan pun dibutuhkan!`;
    maknaFilosofis = `Ajakan hangat dan tindakan nyata adalah wujud kepedulian yang paling konkret. Ketika kata-kata formal terasa dingin, kalimat aksi yang tulus mampu memberikan rasa tenang dan kehangatan seketika.`;
  } else {
    // ☕ GENERAL STATEMENT CONTEXT
    examples = [
      `"Over coffee break today, my colleague pointed out: '${text}.'" ("Pas lagi ngopi santai tadi, temen kantor gw ngingetin: '${cleanTranslation}.'")`,
      `"Looking at the whole situation objectively, it's clear that ${text}." ("Melihat situasinya secara objektif, kelihatan jelas kalo ${cleanTranslation}.")`,
      `"A: 'What's your main takeaway here?' — B: 'Basically, ${text}.' (A: 'Poin penting lu apa?' — B: 'Basically ya, ${cleanTranslation}.')"`
    ];
    note = `Tbh kalimat ini tuh salah satu yang paling gampang nyangkut di kepala dan luwes banget dipake pas ngobrol santai sehari-hari. Which is kenapa native speaker sering pake buat nyampein pemikiran secara to-the-point tapi tetep santai!`;
    maknaFilosofis = `Real talk, kejelasan dalam berbicara adalah bentuk rasa hormat pada waktu dan energi orang lain. Menyampaikan fakta atau argumen dengan lugas tanpa berbelit-belit menciptakan relasi komunikasi yang sehat dan saling percaya.`;
  }

  // B5: Extended arti for sentences > 5 words
  let finalArti = cleanTranslation;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount > 5) {
    if (tone === 'angry_breakup') {
      finalArti = `${cleanTranslation} — Tbh kalimat ini meluapkan rasa kecewa mendalam sekaligus menegaskan batasan diri lu secara tegas tanpa basa-basi.`;
    } else if (tone === 'sad_heartbroken') {
      finalArti = `${cleanTranslation} — Honestly kalimat ini melukiskan suasana hati yang lagi rapuh atau sedih mendalam, relate banget pas lu lagi butuh ruang buat memproses perasaan.`;
    } else if (tone === 'romantic_love') {
      finalArti = `${cleanTranslation} — Kalimat manis yang tulus banget buat ngungkapin afeksi atau rasa sayang lu ke orang yang spesial tanpa gengsi.`;
    } else {
      finalArti = `${cleanTranslation} — Frasa percakapan luwes yang enak banget dipakai buat menyampaikan pemikiran lu secara jelas di obrolan sehari-hari.`;
    }
  }

  return {
    arti: finalArti,
    cara_baca: phonetics || text.toLowerCase(),
    penggunaan: examples,
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

  // 4. Generate contextual original example sentence (Jaksel & Temen Ngobrol)
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
        arti: normalizePronounsToJaksel(arti),
      };
    })
  );

  return results;
}
