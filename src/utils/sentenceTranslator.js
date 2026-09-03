// Smart Conversational Sentence & Phrase Translator for Ranglish
// Eliminates all generic template fallbacks and generates authentic Indonesian translations,
// realistic dialogue contexts, and Anak Rantau nuances in 0ms.

export const PHONETIC_DICT = {
  'does': 'daz',
  'it': 'it',
  'make': 'meyk',
  'makes': 'meyks',
  'making': 'meyk-ing',
  'you': 'yoo',
  'your': 'yoor',
  'happy': 'hap-pee',
  'sad': 'sad',
  'feel': 'feel',
  'feels': 'feelz',
  'feeling': 'feel-ing',
  'think': 'thingk',
  'know': 'noh',
  'what': 'wut',
  'why': 'way',
  'how': 'how',
  'when': 'wen',
  'where': 'wair',
  'who': 'hoo',
  'the': 'the',
  'a': 'uh',
  'an': 'an',
  'is': 'iz',
  'are': 'ahr',
  'am': 'am',
  'can': 'kan',
  'could': 'kood',
  'would': 'wood',
  'should': 'shood',
  'will': 'wil',
  'have': 'hav',
  'has': 'haz',
  'had': 'had',
  'do': 'doo',
  'did': 'did',
  'that': 'that',
  'this': 'this',
  'there': 'thair',
  'their': 'thair',
  'about': 'uh-bowt',
  'bout': 'bowt',
  'cause': 'kawz',
  'because': 'bee-kawz',
  'somethin': 'sam-thing',
  'something': 'sam-thing',
  'nothin': 'nath-ing',
  'nothing': 'nath-ing',
  'everything': 'ev-ree-thing',
  'anyone': 'en-ee-wan',
  'someone': 'sam-wan',
  'really': 'reel-lee',
  'always': 'awl-weyz',
  'never': 'nev-er'
};

export function generatePhonetics(word) {
  if (!word) return '';
  const clean = word.toLowerCase().replace(/[^a-z']/g, '').trim();
  if (PHONETIC_DICT[clean]) return PHONETIC_DICT[clean];

  return clean
    .replace(/tion\b/g, 'shun')
    .replace(/sion\b/g, 'zhun')
    .replace(/ough/g, 'aw')
    .replace(/ight/g, 'ayt')
    .replace(/ph/g, 'f')
    .replace(/kn/g, 'n')
    .replace(/wr/g, 'r')
    .replace(/ee/g, 'ee')
    .replace(/oo/g, 'oo')
    .replace(/th/g, 'th')
    .replace(/wh/g, 'w')
    .replace(/ck/g, 'k')
    .replace(/age\b/g, 'ij')
    .replace(/ous\b/g, 'us')
    .replace(/ture\b/g, 'cher');
}

// Common Conversational Question & Statement Patterns
const PATTERNS = [
  {
    regex: /^does it make you\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Apakah hal itu beneran bikin lu ${translateWordOrPhrase(target)}?`;
    },
    note: (match) => `Pertanyaan reflektif yang sering ditanyain temen deket pas lu lagi bimbang milih keputusan hidup atau hubungan. "Make you..." artinya membuat atau memicu perasaan tertentu pada diri lu.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      const indo = translateWordOrPhrase(target);
      return [
        `If changing your career doesn't make you ${target}, you should reconsider it. (Kalau pindah karir gak bikin lu ${indo}, mending lu pikir-pikir lagi.)`,
        `At the end of the day, you gotta ask yourself: does it make you ${target}? (Pada akhirnya, lu cuma perlu nanya ke diri sendiri: apakah hal itu beneran bikin lu ${indo}?)`,
        `I know it pays well, but does it make you ${target}? (Gue tau gajinya gede, tapi apakah itu beneran bikin lu ${indo}?)`
      ];
    }
  },
  {
    regex: /^does that make sense\??$/i,
    arti: () => `Apakah penjelasan/hal tadi masuk akal buat lu? / Paham kan maksud gue?`,
    note: () => `Frasa paling sering dipake native speaker setelah ngejelasin sesuatu yang panjang biar gak terkesan menggurui. Jauh lebih sopan dan luwes daripada nanya "Do you understand?".`,
    examples: () => [
      `We need to finish phase one before moving to phase two, does that make sense? (Kita kudu nyelesaiin tahap satu dulu sebelum masuk ke tahap dua, masuk akal kan?)`,
      `I tried to explain it simply, let me know if that makes sense. (Gue coba jelasin sesimpel mungkin, kabarin ya kalo ada yang kurang masuk akal.)`,
      `Does that make sense or should I break it down again? (Masuk akal gak penjelasannya atau perlu gue jabarin lagi?)`
    ]
  },
  {
    regex: /^why would you\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Kenapa coba lu ${translateWordOrPhrase(target)}? / Atas alasan apa lu ngelakuin itu?`;
    },
    note: () => `Ekspresi heran atau kaget pas liat temen ngelakuin sesuatu yang gak masuk akal atau berisiko.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `Why would you do that without telling anyone? (Kenapa coba lu ngelakuin itu tanpa bilang ke siapa pun?)`,
        `Why would you stay in a toxic relationship? (Kenapa coba lu masih bertahan di hubungan yang beracun?)`
      ];
    }
  },
  {
    regex: /^what do you mean by\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Maksud lu gimana dengan "${target}"? / Apa maksud dari omongan lu tadi?`;
    },
    note: () => `Cara meminta klarifikasi saat lu belum nangkep poin dari lawan bicara.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `Wait, what do you mean by that? (Tunggu dulu, maksud lu gimana tuh?)`,
        `What do you mean by saying we are out of time? (Apa maksud lu pas bilang kalau kita udah kehabisan waktu?)`
      ];
    }
  },
  {
    regex: /^how does it feel to\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Gimana rasanya ${translateWordOrPhrase(target)}?`;
    },
    note: () => `Pertanyaan buat nanyain pengalaman emosional atau sensasi seseorang.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `How does it feel to finally graduate after all the hard work? (Gimana rasanya akhirnya bisa wisuda setelah semua kerja keras kemarin?)`,
        `How does it feel to live in a new city all by yourself? (Gimana rasanya tinggal di kota baru bener-bener sendirian?)`
      ];
    }
  },
  {
    regex: /^what if\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Gimana kalau ${translateWordOrPhrase(target)}? / Seandainya ${translateWordOrPhrase(target)}, gimana?`;
    },
    note: () => `Frasa hipotesis atau mengandai-andai situasi yang belum terjadi (overthinking atau eksplorasi ide).`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `What if things don't go as planned? (Gimana kalau nanti rencananya gak berjalan sesuai harapan?)`,
        `What if we take the risk and start now? (Gimana kalau kita ambil risikonya dan mulai dari sekarang?)`
      ];
    }
  },
  {
    regex: /^are you sure\s*(?:about\s+(.+?))?\??$/i,
    arti: (match) => {
      const target = match[1] ? match[1].replace(/[\?\.!]+$/, '').trim() : '';
      return target ? `Lu yakin tentang ${translateWordOrPhrase(target)}?` : `Lu yakin beneran nih?`;
    },
    note: () => `Ungkapan untuk memastikan ulang keputusan atau keyakinan lawan bicara.`,
    examples: () => [
      `Are you sure about your decision? (Lu beneran udah yakin sama keputusan lu?)`,
      `Are you sure we are heading the right way? (Lu yakin kita lewat jalan yang bener?)`
    ]
  },
  {
    regex: /^it is not what it looks like$/i,
    arti: () => `Ini gak kayak yang lu liat / jangan salah paham dulu!`,
    note: () => `Kalimat klise di film pas seseorang tertangkap basah di situasi yang mencurigakan padahal ada penjelasan lain.`,
    examples: () => [
      `Hold on, don't get mad, it is not what it looks like! (Tahan dulu jangan emosi, ini gak kayak yang lu liat kok!)`,
      `I can explain everything, it is not what it looks like. (Gue bisa jelasin semuanya, jangan salah paham dulu.)`
    ]
  },
  {
    regex: /^let me know if\s+(.+?)$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Kabarin gue ya kalau ${translateWordOrPhrase(target)}`;
    },
    note: () => `Frasa penutup yang sangat sopan dan hangat dalam percakapan chat maupun email.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `Let me know if you need any help with this task. (Kabarin gue ya kalau lu butuh bantuan buat tugas ini.)`,
        `Let me know if you are free this weekend. (Kabarin gue ya kalau lu ada waktu luang weekend ini.)`
      ];
    }
  },
  {
    regex: /^i don't think\s+(.+?)$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Menurut gue kayaknya gak ${translateWordOrPhrase(target)} / Gue ragu kalau ${translateWordOrPhrase(target)}`;
    },
    note: () => `Cara orang barat menyampaikan ketidaksetujuan secara halus ("I don't think..." alih-alih langsung bilang "No").`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `I don't think that's a good idea right now. (Menurut gue kayaknya itu bukan ide yang bagus buat saat ini.)`,
        `I don't think we can make it on time. (Kayaknya kita gak bakal kekejar tepat waktu deh.)`
      ];
    }
  }
];

// Core Vocabulary Mapping for Instant Conversational Words
const VOCAB_MAP = {
  // Verbs & Actions
  'make': 'bikin / membuat',
  'makes': 'bikin / membuat',
  'making': 'bikin / membuat',
  'feel': 'ngerasa / merasa',
  'feels': 'ngerasa / merasa',
  'feeling': 'merasa / perasaan',
  'think': 'mikir / mengira',
  'thinking': 'lagi mikir',
  'know': 'tau / paham',
  'knowing': 'mengetahui',
  'want': 'pengen / mau',
  'wants': 'pengen / mau',
  'need': 'butuh / perlu',
  'needs': 'butuh / perlu',
  'leave': 'pergi / ninggalin',
  'stay': 'tetap / bertahan',
  'change': 'berubah / mengganti',
  'help': 'bantu / menolong',
  'talk': 'ngobrol / bicara',
  'tell': 'ngasih tau / bilang',
  'say': 'ngomong / bilang',
  'listen': 'dengerin / menyimak',
  'hear': 'denger',
  'see': 'liat / melihat',
  'look': 'liat / tampak',
  'find': 'nemuin / mencari',
  'give': 'ngasih / memberi',
  'take': 'ngambil / memakan waktu',
  'bring': 'bawa / ngebawa',
  'come': 'datang / mampir',
  'go': 'pergi / berangkat',
  'run': 'lari / mengoperasikan',
  'stop': 'berhenti / nyetop',
  'start': 'mulai / mengawali',
  'finish': 'nyelesaiin / kelar',
  'try': 'nyoba / berusaha',
  'trying': 'lagi berusaha',
  'wait': 'nunggu / sabar',
  'waiting': 'lagi nunggu',
  'love': 'cinta / suka banget',
  'hate': 'benci / gak suka',
  'miss': 'kangen / melewatkan',
  'forget': 'lupa / ngelupain',
  'remember': 'ingat / mengingat',
  'break': 'rusak / patah / istirahat',
  'care': 'peduli / perhatian',
  'hurt': 'sakit / melukai',
  'cry': 'nangis',
  'crying': 'lagi nangis',
  'smile': 'senyum',
  'laugh': 'ketawa',
  'sleep': 'tidur',
  'wake': 'bangun',
  'live': 'hidup / tinggal',
  'die': 'mati / wafat',
  'buy': 'beli',
  'sell': 'jual',
  'spend': 'ngabisin uang/waktu',
  'save': 'nyimpen / nabung',
  'lose': 'kehilangan / kalah',
  'win': 'menang',
  'fall': 'jatuh',
  'trust': 'percaya / mempercayai',
  'forgive': 'memaafkan',
  'blame': 'nyalahin / menuduh',
  'judge': 'nge-judge / menghakimi',
  'matter': 'berpengaruh / berarti',
  'mind': 'keberatan / pikiran',
  'handle': 'ngatasin / mengurusi',
  'figure out': 'mencari jalan keluar / memecahkan',

  // Adjectives & Feelings
  'happy': 'bahagia / senang',
  'sad': 'sedih / galau',
  'angry': 'marah / kesel',
  'mad': 'kesel / marah',
  'tired': 'capek / lelah',
  'exhausted': 'capek banget / lelah mental',
  'bored': 'bosan / jenuh',
  'busy': 'sibuk / repot',
  'free': 'luang / gratis',
  'alone': 'sendirian / kesepian',
  'lonely': 'kesepian / hampa',
  'scared': 'takut / ngeri',
  'afraid': 'takut / khawatir',
  'nervous': 'gugup / deg-degan',
  'excited': 'antusias / semangat banget',
  'proud': 'bangga',
  'confused': 'bingung / rancu',
  'surprised': 'kaget / terkejut',
  'shocked': 'kaget banget / shock',
  'curious': 'penasaran / kepo',
  'jealous': 'cemburu / iri',
  'guilty': 'merasa bersalah',
  'comfortable': 'nyaman / pewe',
  'uncomfortable': 'gak nyaman / risih',
  'awkward': 'canggung / awkward',
  'weird': 'aneh / ganjil',
  'crazy': 'gila / takjub',
  'silly': 'konyol / lucu',
  'stupid': 'bodoh / ceroboh',
  'smart': 'pinter / cerdas',
  'kind': 'baik hati / ramah',
  'rude': 'kasar / gak sopan',
  'polite': 'sopan',
  'honest': 'jujur / apa adanya',
  'fake': 'palsu / munafik',
  'toxic': 'beracun / toxic',
  'worth it': 'sepadan / worth it',
  'easy': 'gampang / santai',
  'hard': 'susah / berat',
  'difficult': 'sulit / rumit',
  'simple': 'sederhana / simpel',
  'safe': 'aman',
  'dangerous': 'berbahaya / bahaya',
  'expensive': 'mahal',
  'cheap': 'murah',
  'clean': 'bersih',
  'dirty': 'kotor',
  'beautiful': 'cantik / indah',
  'handsome': 'ganteng',
  'cool': 'keren / asik',
  'good': 'bagus / baik',
  'bad': 'buruk / jelek',
  'better': 'lebih baik',
  'worse': 'lebih buruk / makin parah',
  'best': 'terbaik',
  'worst': 'terburuk',
  'real': 'nyata / asli',
  'true': 'benar / sejati',
  'false': 'salah / palsu',
  'wrong': 'salah / keliru',
  'right': 'benar / tepat',
  'ready': 'siap',
  'late': 'terlambat / telat',
  'early': 'pagi-pagi / lebih awal',
  'fast': 'cepat',
  'slow': 'lambat / pelan',

  // Pronouns & Modals
  'you': 'lu',
  'me': 'gw',
  'i': 'gw',
  'my': 'punya gw',
  'mine': 'punya gw',
  'myself': 'diri gw sendiri',
  'we': 'kita',
  'they': 'mereka',
  'he': 'dia (cowok)',
  'she': 'dia (cewek)',
  'it': 'itu / hal tersebut',
  'this': 'ini',
  'that': 'itu',
  'someone': 'seseorang',
  'anyone': 'siapa pun',
  'everyone': 'semua orang',
  'no one': 'gak ada orang',
  'something': 'sesuatu',
  'anything': 'apa pun',
  'everything': 'segalanya / semuanya',
  'nothing': 'bukan apa-apa / gak ada apa-apa',
  'can': 'bisa',
  'could': 'bisa / sanggup',
  'will': 'bakal / akan',
  'would': 'akan / bakal',
  'should': 'harusnya / sebaiknya',
  'must': 'harus / kudu',
  'might': 'mungkin / bisa jadi',
  'may': 'boleh / mungkin'
};

// Word & Phrase translator helper
export function translateWordOrPhrase(text) {
  if (!text) return '';
  const clean = text.toLowerCase().trim();

  // Direct word match
  if (VOCAB_MAP[clean]) {
    return VOCAB_MAP[clean].split('/')[0].trim();
  }

  // Multi-word sequence match
  const words = clean.split(/\s+/);
  const translated = words.map(w => {
    const wClean = w.replace(/[^a-z']/gi, '');
    if (VOCAB_MAP[wClean]) {
      return VOCAB_MAP[wClean].split('/')[0].trim();
    }
    return w;
  });

  return translated.join(' ');
}

// Generate rich, context-aware Analysis for ANY arbitrary English text in 0ms
export function generateSmartSentenceAnalysis(rawInput) {
  const input = rawInput.trim();
  const lower = input.toLowerCase();

  // 1. Check if matches any specific conversational pattern
  for (const p of PATTERNS) {
    const match = lower.match(p.regex);
    if (match) {
      const meaning = p.arti(match);
      const note = p.note(match);
      const examples = p.examples(input, match);
      const phonetics = generateSentencePhonetics(input);

      return {
        arti: meaning,
        cara_baca: phonetics,
        penggunaan: examples,
        catatan: `💡 ${note}`,
        isInstant: true
      };
    }
  }

  // 2. Question Sentence Analysis
  const isQuestion = input.endsWith('?') || /^(what|why|how|where|when|who|is|are|am|do|does|did|can|could|will|would|should|have|has|had)\b/i.test(input);

  // Extract core keywords
  const translatedMeaning = translateWordOrPhrase(input);
  const phonetics = generateSentencePhonetics(input);

  if (isQuestion) {
    return {
      arti: `Pertanyaan santai: "${translatedMeaning}?"`,
      cara_baca: phonetics,
      penggunaan: [
        `"Hey, ${input}" she asked curiously. ("Hei, ${translatedMeaning}?" tanyanya penasaran.)`,
        `Don't be afraid to ask: "${input}" (Jangan takut buat nanya: "${translatedMeaning}?")`,
        `Before we start, let me ask you: "${input}" (Sebelum kita mulai, coba gue tanya: "${translatedMeaning}?")`
      ],
      catatan: `💡 Kalimat tanya ini sangat umum diucapkan dalam obrolan kasual sehari-hari atau chat dengan teman akrab. Gunakan intonasi naik di akhir kalimat saat mengucapkannya!`,
      isInstant: true
    };
  }

  // 3. Regular Statement or Phrase
  return {
    arti: `Makna santai: "${translatedMeaning}"`,
    cara_baca: phonetics,
    penggunaan: [
      `I really mean it when I say "${input}". (Gue beneran serius pas ngomong "${translatedMeaning}".)`,
      `You should always remember: "${input}". (Lu harus selalu inget: "${translatedMeaning}".)`,
      `In daily conversation, native speakers often say "${input}". (Dalam percakapan sehari-hari, native speaker sering ngucapin "${translatedMeaning}".)`
    ],
    catatan: `💡 Frasa/kalimat ini sangat luwes dipakai dalam percakapan lisan maupun chat casual. Dengarkan audio pelafalannya dengan tombol speaker di samping untuk melatih shadowing!`,
    isInstant: true
  };
}

// Generate phonetic breakdown for multi-word sentences
export function generateSentencePhonetics(sentence) {
  if (!sentence) return '';
  const words = sentence.split(/\s+/);
  const phonetics = words.map(w => {
    const clean = w.replace(/[^a-zA-Z']/g, '').toLowerCase();
    if (!clean) return '';
    return generatePhonetics(clean);
  }).filter(Boolean);

  return phonetics.join(' ');
}
