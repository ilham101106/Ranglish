/**
 * Helper utility to accurately classify English inputs into:
 * - 'word': Kata Tunggal (Single Word)
 * - 'phrase': Frasa / Ungkapan Idiom (Phrase / Idiom)
 * - 'sentence': Kalimat Lengkap (Sentence / Statement)
 * - 'movie': Kutipan Dialog Film (Movie Dialogue)
 * - 'song': Kutipan Lirik Lagu (Song Lyrics)
 */

export function classifyText(text) {
  if (!text) {
    return {
      type: "word",
      label: "KATA",
      icon: "📖",
      color: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
      badgeText: "Kata Tunggal",
    };
  }

  const clean = text.trim();
  const lower = clean.toLowerCase();
  const words = clean.split(/\s+/).filter(Boolean);

  // Movie dialogues check
  const movieKeywords = [
    "close call",
    "i've been through",
    "cut the crap",
    "make up your mind",
    "too good to be true",
    "walk away from me",
    "it is what it is, we gotta move on",
    "it is what it is",
    "got your back",
    "mixed signals",
    "straight to the point",
    "sign up for this",
    "out of your mind",
    "wrong foot",
    "under the rug",
    "wit's end",
    "leap of faith",
    "may the force",
    "why so serious",
    "i'll be back",
    "to infinity and beyond",
    "houston, we have a problem",
  ];

  // Song lyrics check
  const songKeywords = [
    "the more i try to trace you",
    "if u could see me cry",
    "apocalypse",
    "your lips, my lips",
    "got the music in you",
    "i love you but",
    "only exception",
    "somebody's pleasure",
    "soul try to figure it out",
    "flip through the pages",
    "i love you so bad",
    "i'm nothing without you",
    "about you",
    "do you think i have forgotten",
    "just like a star",
    "location unknown",
    "one day you'll know",
    "i have always loved you",
    "i've always loved you",
    "hey, i'm tired",
    "hey i'm tired",
    "you kept me like a secret",
    "it's me, hi",
    "band-aids don't fix",
    "stars around my scars",
    "i knew you were trouble",
    "i'm a creep",
    "no surprises",
    "karma police",
    "you do it to yourself",
    "what makes you beautiful",
    "story of my life",
    "night changes",
  ];

  if (movieKeywords.some((m) => lower === m || lower.includes(m))) {
    return {
      type: "movie",
      label: "DIALOG FILM",
      icon: "🎬",
      color: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
      badgeText: "Kutipan Dialog Film",
    };
  }

  if (songKeywords.some((s) => lower === s || lower.includes(s))) {
    return {
      type: "song",
      label: "LIRIK LAGU",
      icon: "🎵",
      color: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
      badgeText: "Kutipan Lirik Lagu",
    };
  }

  // Single word
  if (words.length === 1) {
    return {
      type: "word",
      label: "KATA",
      icon: "📖",
      color: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
      badgeText: "Kata Tunggal",
    };
  }

  // Short phrase / idiom (2-4 words without clause punctuation)
  if (
    words.length <= 4 &&
    !clean.includes("?") &&
    !clean.includes("!") &&
    !clean.includes(",")
  ) {
    return {
      type: "phrase",
      label: "FRASA & IDIOM",
      icon: "💬",
      color: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
      badgeText: "Frasa / Idiom",
    };
  }

  // Full sentence / expression
  return {
    type: "sentence",
    label: "KALIMAT",
    icon: "✨",
    color: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
    badgeText: "Kalimat Lengkap",
  };
}

/**
 * Normalizes formal Indonesian text to authentic Gen Z / Anak Rantau slang:
 * Replaces 'aku' -> 'gw', 'kamu' -> 'lu', 'saya' -> 'gw', etc.
 */
export function normalizeToGaulSlang(text) {
  if (!text || typeof text !== 'string') return text;

  let s = text;

  // Compound pronoun replacements
  s = s.replace(/\bdiriku\b/gi, 'diri gw');
  s = s.replace(/\bdirimu\b/gi, 'diri lu');
  s = s.replace(/\bpadaku\b/gi, 'ke gw');
  s = s.replace(/\bpadamu\b/gi, 'ke lu');
  s = s.replace(/\bkepadaku\b/gi, 'ke gw');
  s = s.replace(/\bkepadamu\b/gi, 'ke lu');
  s = s.replace(/\buntukku\b/gi, 'buat gw');
  s = s.replace(/\buntukmu\b/gi, 'buat lu');
  s = s.replace(/\bbersamaku\b/gi, 'bareng gw');
  s = s.replace(/\bbersamamu\b/gi, 'bareng lu');
  s = s.replace(/\bmemelukku\b/gi, 'meluk gw');
  s = s.replace(/\bmembantuku\b/gi, 'bantu gw');
  s = s.replace(/\bmenemaniku\b/gi, 'nemenin gw');
  s = s.replace(/\bmencintaiku\b/gi, 'cinta sama gw');
  s = s.replace(/\bmencintaimu\b/gi, 'cinta sama lu');
  s = s.replace(/\bmeninggalkanku\b/gi, 'ninggalin gw');
  s = s.replace(/\bmeninggalkanmu\b/gi, 'ninggalin lu');
  s = s.replace(/\bmengajakmu\b/gi, 'ngajak lu');
  s = s.replace(/\bmemandangmu\b/gi, 'mandang lu');
  s = s.replace(/\bmerindukanmu\b/gi, 'kangen sama lu');
  s = s.replace(/\bmerindukanku\b/gi, 'kangen sama gw');

  // Standalone pronoun replacements
  s = s.replace(/\baku\b/gi, 'gw');
  s = s.replace(/\bsaya\b/gi, 'gw');
  s = s.replace(/\bkamu\b/gi, 'lu');
  s = s.replace(/\banda\b/gi, 'lu');
  s = s.replace(/\bengkau\b/gi, 'lu');
  s = s.replace(/\bkau\b/gi, 'lu');
  s = s.replace(/\b-ku\b/gi, ' gw');
  s = s.replace(/\b-mu\b/gi, ' lu');

  return s;
}

/**
 * Ensures example sentences do not mix Indonesian words into the English sentence line.
 * English part (before parentheses) must be 100% pure native English.
 * Indonesian translation must be inside parentheses (...).
 */
export function cleanExampleSentence(str) {
  if (!str || typeof str !== 'string') return str;

  // Split English and Indonesian parts
  const parenMatch = str.match(/^(.*?)\((.*?)\)$/s);
  if (!parenMatch) return normalizeToGaulSlang(str);

  let en = parenMatch[1].trim();
  let id = normalizeToGaulSlang(parenMatch[2].trim());

  const indoWordRegex = /\b(bro|tadi|kita|nonton|konser|kembang|apinya|gede|banget|nggak|ngga|beneran|kalo|kalau|udah|sudah|bisa|ini|itu|ada|yang|dari|pada|sama|dan|atau|cuma|hanya|aja|saja|lu|gw|gue|kamu|aku)\b/i;

  // If English sentence has a separator with Indonesian text (e.g. "Indonesian text — English sentence")
  if (en.includes('—') || en.includes(' - ') || en.includes(':')) {
    const segments = en.split(/—|\s-\s|:\s*/);
    const pureEn = segments.find(s => !indoWordRegex.test(s) && s.trim().length > 6) || segments[segments.length - 1];
    if (pureEn && pureEn.trim().length > 3) {
      en = pureEn.trim();
    }
  }

  // Capitalize first letter of English sentence
  if (en.length > 0) {
    en = en.charAt(0).toUpperCase() + en.slice(1);
  }

  return `${en} (${id})`;
}

export function isSongInput(text) {
  if (!text || typeof text !== "string") return false;
  const clean = text.trim();
  const lower = clean.toLowerCase();

  // Multi-line verse check (user pasted 2+ lines)
  const lines = clean.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length >= 2) {
    return true;
  }

  const songKeywords = [
    "the more i try to trace you",
    "if u could see me cry",
    "apocalypse",
    "your lips, my lips",
    "got the music in you",
    "i love you but",
    "only exception",
    "somebody's pleasure",
    "soul try to figure it out",
    "flip through the pages",
    "i love you so bad",
    "i'm nothing without you",
    "about you",
    "do you think i have forgotten",
    "just like a star",
    "location unknown",
    "one day you'll know",
    "i have always loved you",
    "i've always loved you",
    "hey, i'm tired",
    "hey i'm tired",
    "you kept me like a secret",
    "it's me, hi",
    "band-aids don't fix",
    "stars around my scars",
    "i knew you were trouble",
    "i'm a creep",
    "no surprises",
    "karma police",
    "you do it to yourself",
    "what makes you beautiful",
    "story of my life",
    "night changes",
  ];

  return songKeywords.some((s) => lower === s || lower.includes(s));
}

export function sanitizeResultPayload(data) {
  if (!data || typeof data !== "object") return data;

  const sanitized = { ...data };

  // Dual payload for song lyrics
  if (sanitized.displayContent) {
    sanitized.displayContent = { ...sanitized.displayContent };
    if (sanitized.displayContent.fullTranslation) {
      sanitized.displayContent.fullTranslation = normalizeToGaulSlang(
        sanitized.displayContent.fullTranslation
      );
    }
    if (sanitized.displayContent.meaningExplanation) {
      sanitized.displayContent.meaningExplanation = normalizeToGaulSlang(
        sanitized.displayContent.meaningExplanation
      );
    }
  }

  if (sanitized.savedContent) {
    sanitized.savedContent = { ...sanitized.savedContent };
    if (sanitized.savedContent.focusPhraseMeaning) {
      sanitized.savedContent.focusPhraseMeaning = normalizeToGaulSlang(
        sanitized.savedContent.focusPhraseMeaning
      );
    }
    if (sanitized.savedContent.originalExampleSentence) {
      sanitized.savedContent.originalExampleSentence = cleanExampleSentence(
        sanitized.savedContent.originalExampleSentence
      );
    }
  }

  if (sanitized.arti) {
    sanitized.arti = normalizeToGaulSlang(sanitized.arti);
  }

  if (Array.isArray(sanitized.penggunaan)) {
    sanitized.penggunaan = sanitized.penggunaan.map((ex) =>
      cleanExampleSentence(ex)
    );
  }

  if (sanitized.catatan) {
    sanitized.catatan = normalizeToGaulSlang(sanitized.catatan);
  }

  return sanitized;
}


