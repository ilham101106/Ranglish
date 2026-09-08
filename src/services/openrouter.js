import { getSettings } from "./storage";
import { getInstantAnalysis } from "./instantEngine";
import { fetchFreeDictionaryData } from "./freeDictionary";
import {
  generateRichSentenceAnalysis,
  generateSongDualPayload,
  validateAndSanitizeExample,
  detectSentenceTone,
  regenerateAlternativeExample,
} from "./freeTranslator";
import { generateSmartSentenceAnalysis } from "../utils/sentenceTranslator";
import { sanitizeResultPayload, isSongInput, classifyText } from "../utils/textClassifier";
import {
  isSupabaseConfigured,
  searchCloudVocab,
  saveWordToCloud,
} from "./supabase.js";

const SYSTEM_PROMPT_VOCAB = `Kamu adalah AI tutor bahasa Inggris di aplikasi "Ranglish".
PERSONA: Teman akrab yang baru pulang dari kuliah/tinggal di luar negeri (anak rantau). Ngajarin bahasa Inggris ke temen sendiri di Indonesia dengan gaya anak Gen Z / anak nongkrong: santai, seru, luwes, pake kata "lu", "gw" / "gue", "asli", "nih", "tuh" — BUKAN seperti guru grammar formal yang kaku.

ATURAN PENTING:
1. GAYA BAHASA GAUL: Wajib gunakan kata ganti orang pertama gaul "gw" atau "gue", dan orang kedua "lu" atau "elo". JANGAN GUNAKAN kata formal/kaku seperti "aku", "saya", "kamu", atau "anda" di dalam terjemahan "arti", "penggunaan", maupun "catatan"!
2. JANGAN TAMPILKAN PROSES PIKIR / REASONING. Langsung berikan output JSON murni!
3. DILARANG KERAS MENGGUNAKAN TEMPLATE FORMULA KAKU / POP-UP GENERIK di contoh "penggunaan" (misal: "Whenever I listen to this song...", "During our coffee catchup...", dll).
4. KONTEN "PENGGUNAAN" WAJIB 100% KALIMAT NATIVE ALAMI BERDASARKAN MAKNA REALISTIS KATA/FRASA INPUT.
5. DILARANG KERAS MENGULANG FRASA INI DI FIELD "catatan":
   ❌ "Tbh kalimat tanya ini luwes banget dipake pas lagi nongkrong..."
   ❌ "Bikin obrolan dua arah jadi lebih hidup..."
   ❌ "which is why native speaker sering banget pake pola ini..."

=======================================================
🎯 ATURAN KRUSIAL UNTUK FIELD "arti" (DEFINISI / TERJEMAHAN INTI):
=======================================================
1. DEFINISI WAJIB BERSIFAT GENERAL, OBJEKTIF, DAN UNIVERSAL:
   - Berikan definisi atau terjemahan inti (core meaning) yang luas, akurat, dan netral terlebih dahulu.
   - JANGAN membatasi "arti" hanya pada satu skenario sempit tertentu.
2. DILARANG KERAS BIAS KE ROMANSA / PERCINTAAN DI FIELD "arti":
   - JANGAN menyelipkan kata "orang tersayang", "pacar", "gebetan", "si dia", "kekasih", atau "pasangan" ke dalam field "arti", KECUALI teks aslinya memang eksplisit tentang romansa/pasangan (seperti "my lover", "my babe", "significant other", "soulmate").
   - Contoh salah: "against the world" diartikan "menghadapi dunia bareng orang tersayang" ❌ (SALAH! Ini bias sempit).
   - Contoh benar: "against the world" diartikan "menghadapi atau melawan seluruh dunia sendirian" ✅ (GENERAL & UNIVERSAL).
   - Contoh salah: "on my own" diartikan "sendirian tanpa ayang" ❌.
   - Contoh benar: "on my own" diartikan "sendirian / mandiri atas usaha sendiri" ✅.
3. DISTRIBUSI KONTEKS YANG FLEKSIBEL:
   - Field "arti": Khusus untuk makna inti yang general dan objektif.
   - Konteks spesifik (kerjaan/karier, perjuangan hidup/mentalitas, persahabatan/squad, maupun asmara): Paparkan secara kaya dan bervariasi di contoh kalimat ("penggunaan") dan tips nuansa ("catatan"), sehingga user paham kata/frasa tersebut bisa dipakai di berbagai situasi!


=======================================================
🎵 DETEKSI OTOMATIS MUSIK & KARYA POPULER (SANGAT PENTING):
=======================================================
Setiap kali menerima input kata/kalimat/lirik, WAJIB periksa apakah teks ini merupakan bagian dari judul lagu, lirik musik (pop, indie rock, emo, hip hop, R&B, rock, baik musisi internasional maupun musisi lokal/indie Indonesia seperti eleventwelfth, Reality Club, NIKI, Hindia, Pamungkas, Bruno Mars, Taylor Swift, dll), atau dialog film terkenal.

JIKA TERDETEKSI SEBAGAI LIRIK / JUDUL LAGU:
- Di field "catatan", WAJIB sebutkan Konteks Musik secara spesifik ala anak rantau:
  "Frasa/kalimat ini merupakan bagian dari judul lagu sekaligus lirik karya band/musisi [Nama Artis/Band], dari album [Nama Album] ([Tahun]). Lirik lengkapnya berbunyi: '[Lirik lanjutan / bait lengkap]'."
- Di field "detectedSong", isi: { "title": "...", "artist": "...", "album": "..." }
- Di field "maknaFilosofis", kupas emosi dan pesan yang ingin disampaikan dari lagu tersebut.

JIKA TERDETEKSI SEBAGAI DIALOG FILM / KUTIPAN FILM:
- Di field "catatan", sebutkan film & karakternya:
  "Dialog ikonik [Karakter] di film [Judul Film] ([Tahun])..."
- Di field "detectedMovie", isi: { "title": "...", "character": "..." }

JIKA BUKAN LAGU / FILM:
- Set "detectedSong": null dan "detectedMovie": null
- Di field "catatan", berikan tips nuansa pemakaian sehari-hari ala anak rantau yang spesifik.

=======================================================
FORMAT OUTPUT JSON:
=======================================================
Kembalikan satu blok JSON valid:
{
  "arti": "terjemahan santai dan akurat dari kata/kalimat yang dimaksud",
  "cara_baca": "ejaan fonetik sederhana lidah Indonesia",
  "kata_terkoreksi": null,
  "penggunaan": [
    "Natural English sentence strictly relevant to context. (Arti terjemahan santai gw/lu)"
  ],
  "catatan": "penjelasan nuansa/tips konteks pemakaian sehari-hari ala anak rantau (wajib sertakan konteks musik/film jika terdeteksi)",
  "maknaFilosofis": "refleksi psikologi emosional / perspektif mendalam tentang kata/kalimat ini ala anak rantau",
  "detectedSong": null,
  "detectedMovie": null
}`;

const makeFetchCall = async (_apiKey, model, text, timeoutMs = 7000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      "/api/lookup",
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT_VOCAB },
            {
              role: "user",
              content: `Tolong analisis dan terjemahkan teks/kalimat ini buat temen lu secara natural: "${text}"`,
            },
          ],
          temperature: 0.2,
          max_tokens: 1200,
        }),
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || errData?.error || `HTTP ${response.status}`);
    }

    const resData = await response.json();
    return resData.choices?.[0]?.message?.content;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
};

const VALID_SLANG_CONTRACTIONS = new Set([
  "somethin",
  "somethin'",
  "nothin",
  "nothin'",
  "bout",
  "'bout",
  "cause",
  "'cause",
  "cuz",
  "tryin",
  "tryin'",
  "cryin",
  "cryin'",
  "bleedin",
  "bleedin'",
  "escapin",
  "escapin'",
  "lookin",
  "lookin'",
  "feelin",
  "feelin'",
  "talkin",
  "talkin'",
  "walkin",
  "walkin'",
  "wanna",
  "gonna",
  "gotta",
  "kinda",
  "sorta",
  "aint",
  "ain't",
  "yall",
  "y'all",
  "imma",
  "dunno",
]);

// Validation for typo correction: must be concise (max 3 words more than original, or max 5 words total)
function isValidTypoCorrection(candidate, originalText) {
  if (!candidate || typeof candidate !== "string") return false;
  const cleanCandidate = candidate.trim();
  if (!cleanCandidate) return false;

  const candidateWords = cleanCandidate.split(/\s+/).filter(Boolean);
  const originalWords = originalText.trim().split(/\s+/).filter(Boolean);

  // Maximum 3 words more than original text, OR maximum 5 words total (whichever is stricter)
  const maxAllowedWords = Math.min(originalWords.length + 3, 5);

  if (candidateWords.length > maxAllowedWords) {
    return false;
  }

  // Reject conversational Indonesian phrases returned erroneously as typos
  const lower = cleanCandidate.toLowerCase();
  if (
    lower.includes("nggak ada") ||
    lower.includes("tidak ada") ||
    lower.includes("bisa pake") ||
    lower.includes("bisa pakai") ||
    lower.includes("kalo lu") ||
    lower.includes("kalau lu") ||
    lower.includes("versi")
  ) {
    return false;
  }

  return true;
}

// Helper: Auto-detect typo correction from notes or JSON
function detectTypoCorrection(catatan, originalText) {
  if (!catatan || typeof catatan !== "string") return null;
  const words = originalText.trim().split(/\s+/);
  if (words.length > 2) return null; // Don't flag single-word typo on full sentences/lyrics

  const cleanOriginal = originalText.toLowerCase().replace(/['’]/g, "").trim();
  if (
    VALID_SLANG_CONTRACTIONS.has(cleanOriginal) ||
    VALID_SLANG_CONTRACTIONS.has(originalText.toLowerCase().trim())
  ) {
    return null; // Valid contraction, not a typo
  }

  const match =
    catatan.match(/maksud lu (?:pasti )?['"“]([a-zA-Z\s\-]+)['"”]/i) ||
    catatan.match(
      /typo.*?(?:kata|adalah|maksudnya)\s+['"“]([a-zA-Z\s\-]+)['"”]/i,
    ) ||
    catatan.match(/koreksi.*?:?\s*['"“]([a-zA-Z\s\-]+)['"”]/i);
  if (match && match[1]) {
    const candidate = match[1].trim();
    const cleanCandidate = candidate.toLowerCase().replace(/['’]/g, "");
    if (
      cleanCandidate !== cleanOriginal &&
      !VALID_SLANG_CONTRACTIONS.has(cleanOriginal) &&
      isValidTypoCorrection(candidate, originalText)
    ) {
      return candidate;
    }
  }
  return null;
}

// Rock-solid JSON extractor that strictly rejects reasoning thoughts
function extractCleanResponse(rawContent, text) {
  if (!rawContent) return null;

  // 1. Strip reasoning tags (<think>...</think>) and raw thinking process preambles
  let cleaned = rawContent
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(
      /(?:Here's a thinking process|Thinking Process|Let's think|Let me analyze|Analysis of the prompt)[\s\S]*?(?=(?:\{|"arti"|Kata\s+["“]|###|\*\*1|\n\n[A-Z]))/i,
      "",
    )
    .replace(/```(?:json)?/gi, "")
    .replace(/```/g, "")
    .trim();

  // 2. Try standard JSON.parse on isolated block
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);

      // 🎵 Check if dual payload for song lyrics is returned
      if (parsed && (parsed.displayContent || parsed.savedContent)) {
        const display = parsed.displayContent || {};
        const saved = parsed.savedContent || {};

        // Enforce strict <= 5 words for focusPhrase
        let focusPhrase = saved.focusPhrase || text;
        const words = focusPhrase.split(/\s+/).filter(Boolean);
        if (words.length > 5) {
          focusPhrase = words.slice(0, 5).join(" ");
        }

        const fullTranslation = sanitizeText(
          display.fullTranslation || parsed.arti || text,
        );
        const meaningExplanation = sanitizeText(
          display.meaningExplanation || parsed.catatan || "",
        );
        const originalExample = sanitizeText(
          saved.originalExampleSentence || "",
        );

        const displayPayload = {
          isSongLyric: true,
          fullTranslation,
          meaningExplanation,
          detectedSong: {
            title: saved.songTitle || display.detectedSong?.title || null,
            artist: saved.artist || display.detectedSong?.artist || null,
          },
          arti: fullTranslation,
          catatan: meaningExplanation,
          penggunaan: originalExample ? [originalExample] : [],
          focusPhrase,
          teks_asli: text,
        };

        const savedPayload = {
          sourceType: "song",
          songTitle: saved.songTitle || display.detectedSong?.title || null,
          artist: saved.artist || display.detectedSong?.artist || null,
          focusPhrase,
          focusPhraseMeaning: sanitizeText(
            saved.focusPhraseMeaning || fullTranslation,
          ),
          originalExampleSentence: originalExample,
          listenOn: saved.listenOn || ["Spotify", "YouTube", "Genius"],
          teks_asli: focusPhrase,
          arti:
            sanitizeText(saved.focusPhraseMeaning) ||
            `Arti dari frasa "${focusPhrase}"`,
          penggunaan: originalExample ? [originalExample] : [],
          catatan: meaningExplanation,
          songMetadata: {
            title: saved.songTitle || display.detectedSong?.title || null,
            artist: saved.artist || display.detectedSong?.artist || null,
            listenOn: saved.listenOn || ["Spotify", "YouTube", "Genius"],
          },
        };

        return {
          isSongLyric: true,
          displayContent: displayPayload,
          savedContent: savedPayload,
          ...displayPayload,
        };
      }

      if (
        parsed &&
        parsed.arti &&
        !parsed.arti.toLowerCase().includes("thinking process")
      ) {
        const rawArti = sanitizeText(parsed.arti);

        // Strict Validation: Reject if arti is just echoing the English text
        const isEcho =
          rawArti.toLowerCase().trim() === text.toLowerCase().trim() ||
          rawArti
            .toLowerCase()
            .replace(/\s*\(bahasa indonesia\)\s*/gi, "")
            .trim() === text.toLowerCase().trim();

        if (isEcho && text.split(/\s+/).length > 1) {
          // If multi-word query is echoed verbatim without translation, trigger fallback
          return null;
        }

        const rawCatatan = sanitizeText(parsed.catatan);
        const rawMaknaFilosofis = sanitizeText(parsed.maknaFilosofis);
        const parsedTypo =
          parsed.kata_terkoreksi &&
          !VALID_SLANG_CONTRACTIONS.has(text.toLowerCase().trim()) &&
          text.split(/\s+/).length <= 2
            ? sanitizeText(parsed.kata_terkoreksi)
            : null;

        const candidateTypo =
          detectTypoCorrection(rawCatatan, text) || parsedTypo;

        const inferredTypo =
          candidateTypo && isValidTypoCorrection(candidateTypo, text)
            ? candidateTypo
            : null;

        let classificationOverride = null;
        if (parsed.detectedSong && (parsed.detectedSong.title || parsed.detectedSong.artist)) {
          classificationOverride = {
            type: "song",
            label: "LIRIK LAGU",
            icon: "🎵",
            color: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
            badgeText: `Lirik Lagu: ${parsed.detectedSong.artist || parsed.detectedSong.title}`,
          };
        } else if (parsed.detectedMovie && (parsed.detectedMovie.title || parsed.detectedMovie.character)) {
          classificationOverride = {
            type: "movie",
            label: "DIALOG FILM",
            icon: "🎬",
            color: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
            badgeText: `Dialog Film: ${parsed.detectedMovie.title || 'Film Ikonik'}`,
          };
        }

        return {
          arti: rawArti,
          cara_baca: sanitizeText(parsed.cara_baca) || text.toLowerCase(),
          kata_terkoreksi: inferredTypo,
          penggunaan:
            Array.isArray(parsed.penggunaan) && parsed.penggunaan.length > 0
              ? parsed.penggunaan
                  .map((ex) => validateAndSanitizeExample(sanitizeText(ex), text, rawArti))
                  .filter(Boolean)
                  .slice(0, 1)
              : [
                  `"${text}" ("${rawArti}")`,
                ],
          catatan:
            rawCatatan ||
            `Tips pemakaian kata "${text}" dalam obrolan sehari-hari.`,
          maknaFilosofis: rawMaknaFilosofis || null,
          detectedSong: parsed.detectedSong || null,
          detectedMovie: parsed.detectedMovie || null,
          classification: classificationOverride,
        };
      }
    } catch (e) {
      // JSON parse failed, proceed to Regex Extraction
    }
  }

  // 3. Regex Key-Value Extraction
  const artiMatch = cleaned.match(/"arti"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/i);
  const caraBacaMatch = cleaned.match(
    /"cara_baca"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/i,
  );
  const catatanMatch = cleaned.match(
    /"catatan"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/i,
  );
  const kataTerkoreksiMatch = cleaned.match(
    /"kata_terkoreksi"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/i,
  );

  const rawArti = sanitizeText(artiMatch?.[1] || "");
  if (rawArti && !rawArti.toLowerCase().includes("thinking process")) {
    const rawKataTerkoreksi = sanitizeText(kataTerkoreksiMatch?.[1] || "");
    const candidateTypo =
      (rawKataTerkoreksi && isValidTypoCorrection(rawKataTerkoreksi, text)
        ? rawKataTerkoreksi
        : null) || detectTypoCorrection(rawCatatan, text);
    const inferredTypo =
      candidateTypo && isValidTypoCorrection(candidateTypo, text)
        ? candidateTypo
        : null;

    const examples = [];
    const exampleRegex = /"([^"\\]*(?:\\.[^"\\]*)*\([^"\\]*\)[^"\\]*)"/g;
    let exMatch;
    while ((exMatch = exampleRegex.exec(cleaned)) !== null) {
      if (
        exMatch[1] &&
        !exMatch[1].includes('"arti"') &&
        !exMatch[1].includes('"catatan"')
      ) {
        examples.push(sanitizeText(exMatch[1]));
      }
    }

    return {
      arti: rawArti,
      cara_baca: sanitizeText(caraBacaMatch?.[1]) || text.toLowerCase(),
      kata_terkoreksi: inferredTypo,
      penggunaan:
        examples.length > 0
          ? examples
              .map((ex) => validateAndSanitizeExample(ex, text, rawArti))
              .filter(Boolean)
              .slice(0, 1)
          : [
              `"${text}" ("${rawArti}")`,
            ],
      catatan:
        rawCatatan ||
        `Kata "${text}" sangat asik dipakai dalam percakapan santai.`,
    };
  }

  // 4. Markdown Content Extractor (Only if it's NOT thinking process noise)
  if (
    cleaned.length > 20 &&
    !cleaned.toLowerCase().startsWith("here's a thinking process") &&
    !cleaned.toLowerCase().startsWith("thinking process")
  ) {
    let extractedArti = "";
    const meaningMatch = cleaned.match(
      /(?:berarti|artinya|makna|yaitu|adalah)\s+[:\-*]*\s*([^\n\.\(]+)/i,
    );
    if (meaningMatch) {
      extractedArti = meaningMatch[1].replace(/[*_#]/g, "").trim();
    } else {
      const validLine = cleaned.split("\n").find((l) => {
        const t = l.trim().toLowerCase();
        return (
          t.length > 10 &&
          !t.startsWith("#") &&
          !t.includes("thinking process") &&
          !t.includes("analyze user input")
        );
      });
      if (validLine) {
        extractedArti = validLine.replace(/[*_#]/g, "").trim();
      }
    }

    if (extractedArti) {
      const mdExamples = [];
      const quoteMatches = cleaned.match(
        /(?:>|\*|-)\s*["“]([^"”\n]+)["”]\s*(?:\n>\s*)?\(?([^\n\)]+)?\)?/g,
      );
      if (quoteMatches) {
        quoteMatches.slice(0, 3).forEach((q) => {
          const cleanQ = q
            .replace(/^[>\*\-\s"“]+/, "")
            .replace(/["”]+$/, "")
            .trim();
          if (cleanQ && !cleanQ.includes("thinking")) mdExamples.push(cleanQ);
        });
      }

      const markdownTypo = detectTypoCorrection(cleaned, text);

      return {
        arti: extractedArti.substring(0, 150),
        cara_baca: text.toLowerCase(),
        kata_terkoreksi: markdownTypo,
        penggunaan:
          mdExamples.length > 0
            ? mdExamples
            : [
                `The word "${text}" is commonly used in English daily dialogue. (Kata "${text}" sangat umum dipakai dalam dialog bahasa Inggris.)`,
              ],
        catatan:
          cleaned.length > 300 ? cleaned.substring(0, 250) + "..." : cleaned,
      };
    }
  }

  return null;
}

function sanitizeText(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/^[`"'{}\[\]]+/, "")
    .replace(/[`"'{}\[\]]+$/, "")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, " ")
    .trim();
}

export const lookupVocabulary = async (text, options = {}) => {
  const { model } = getSettings();
  const clean = text.trim();
  const wordCount = clean.split(/\s+/).length;

  // Determine classification and type (MASALAH 1 & 2)
  const classification = classifyText(clean, options);
  const classifiedType = options?.classifiedType || classification.type;
  const isSong = classifiedType === "song";

  // 1. Check if it's already in the built-in dictionary
  const instantData = getInstantAnalysis(clean);
  const isOldRobotNote =
    instantData?.catatan &&
    (instantData.catatan.includes("Bikin obrolan dua arah") ||
      instantData.catatan.includes("luwes banget dipake pas lagi nongkrong") ||
      instantData.catatan.includes("during our coffee catchup"));
  const hasCoffeeCatchup =
    instantData?.penggunaan &&
    Array.isArray(instantData.penggunaan) &&
    instantData.penggunaan.some((ex) => /coffee catchup/i.test(ex));

  // Only exact built-in matches (never typo-corrected guesses or robot templates) qualify for instant 0ms
  const isBuiltIn =
    instantData &&
    !instantData.isTypoCorrected &&
    !instantData.isGenerated &&
    !instantData.isAiLearned &&
    wordCount <= 3 &&
    !isOldRobotNote &&
    !hasCoffeeCatchup;

  // If already in built-in dictionary, return immediately (0ms latency)
  if (isBuiltIn) {
    console.log(`[Ranglish Engine] Found in built-in dictionary: "${clean}" (0ms)`);
    return sanitizeResultPayload({
      ...instantData,
      classification,
      success: true,
      isMock: false,
    });
  }

  // 1.5. Check Supabase Cloud Database (Otak Kedua Kolektif)
  if (isSupabaseConfigured() && wordCount <= 12) {
    try {
      const cloudData = await searchCloudVocab(clean);
      if (cloudData && cloudData.arti) {
        console.log(`[Ranglish Engine] Found in Supabase Cloud: "${clean}" (0ms latency, saved AI tokens)`);
        return sanitizeResultPayload({
          ...cloudData,
          classification,
          success: true,
          isMock: false,
          isCloud: true,
        });
      }
    } catch (errCloud) {
      console.warn('[Ranglish Engine] Supabase cloud lookup skipped:', errCloud.message);
    }
  }

  // Not in built-in dictionary: Follow STRICT sequential priority:
  // STEP 1: Always try AI first via /api/lookup with 7000ms timeout
  const activeModel = model || "openrouter/free";
  let rawContent = null;
  let aiErrorReason = null;

  console.log(
    `[Ranglish Engine] [AI-First] Calling AI model (${activeModel}) for: "${clean}" (Timeout 7000ms)...`,
  );

  try {
    rawContent = await makeFetchCall(null, activeModel, clean, 7000);
    console.log(
      `[Ranglish Engine] [AI-Success] AI successfully responded for: "${clean}"`,
    );
  } catch (err1) {
    aiErrorReason = err1.message || String(err1);
    console.warn(
      `[Ranglish Engine] [AI-Failed] AI lookup failed for "${clean}". Reason: ${aiErrorReason}`,
    );
  }

  let cleanedData = rawContent ? extractCleanResponse(rawContent, clean) : null;

  // Grounding check on AI output (MASALAH 3: AI results must also contain original input text!)
  if (cleanedData && Array.isArray(cleanedData.penggunaan)) {
    const focusPhrase = cleanedData.focusPhrase || (isSong ? cleanedData.savedContent?.focusPhrase : null);
    cleanedData.penggunaan = cleanedData.penggunaan
      .map((ex) => validateAndSanitizeExample(ex, clean, cleanedData.arti, focusPhrase))
      .filter(Boolean);
  }

  // STEP 2: Only if AI failed or returned invalid response -> Fallback 1 to live translation
  if (!cleanedData) {
    console.log(
      `[Ranglish Engine] [Fallback-1] Triggering live translation fallback for: "${clean}" (AI Reason: ${aiErrorReason || "invalid JSON"})...`,
    );
    try {
      if (isSong) {
        cleanedData = await generateSongDualPayload(clean);
      } else if (wordCount === 1) {
        const dictData = await fetchFreeDictionaryData(clean);
        cleanedData =
          dictData || (await generateRichSentenceAnalysis(clean, 1, { ...options, classifiedType }));
      } else {
        cleanedData = await generateRichSentenceAnalysis(clean, 1, { ...options, classifiedType });
      }
    } catch (err2) {
      console.warn(
        `[Ranglish Engine] [Fallback-1 Failed] Live translation failed for "${clean}":`,
        err2.message,
      );
    }
  }

  // STEP 3: Only if live translation ALSO failed or returned no arti -> Fallback 2 to pure local template
  if (!cleanedData || !cleanedData.arti) {
    console.log(
      `[Ranglish Engine] [Fallback-2] Falling back to pure local smart sentence generator for: "${clean}"...`,
    );
    cleanedData = generateSmartSentenceAnalysis(clean, 1, { ...options, classifiedType });
  }

  const finalClassification = cleanedData?.classification || classification;

  // Asynchronously save to Supabase Cloud for cross-device collective learning!
  if (isSupabaseConfigured() && cleanedData && cleanedData.arti && wordCount <= 12) {
    saveWordToCloud({
      word: clean,
      arti: cleanedData.arti,
      cara_baca: cleanedData.cara_baca || clean,
      penggunaan: cleanedData.penggunaan || [],
      catatan: cleanedData.catatan || '',
      category_type: classifiedType || classification.type,
    }).catch((err) => {
      console.warn('[Ranglish Engine] Failed to save to Supabase Cloud:', err.message);
    });
  }

  return sanitizeResultPayload({
    ...cleanedData,
    classification: finalClassification,
    success: true,
    isMock: false,
  });
};

/**
 * Helper to regenerate a single example sentence on-demand (for "Kurang Pas? Coba Lagi" button).
 */
export const regenerateSingleExample = (text, currentResult, classifiedType = null) => {
  if (!text || !currentResult) return null;
  const clean = text.trim();
  const type = classifiedType || currentResult.classification?.type || classifyText(clean).type;
  const currentEx = Array.isArray(currentResult.penggunaan) && currentResult.penggunaan.length > 0
    ? currentResult.penggunaan[0]
    : "";
  const tone = detectSentenceTone(clean, currentResult.arti || "");
  return regenerateAlternativeExample(clean, currentResult.arti || clean, tone, type, currentEx);
};

export const SYSTEM_PROMPT_BREAKDOWN = `Kamu adalah AI tutor bahasa Inggris di aplikasi "Ranglish".
TUGAS: Pecah kalimat bahasa Inggris yang diberikan menjadi unit-unit makna (BUKAN kata per kata mentah).

ATURAN:
1. Kata yang maknanya menyatu seperti "to see", "look for", "shake up", "give up" harus tetap jadi SATU unit, bukan dipisah.
2. Kontraksi seperti "I'd", "we're", "don't", "can't", "it's" harus tetap jadi SATU unit, bukan dipisah.
3. Terjemahkan tiap unit makna ke Bahasa Indonesia gaul/santai (gunakan "gw", "lu").
4. Kembalikan HANYA array JSON murni tanpa pembuka/penutup teks lain:
[
  { "phrase": "I'd", "arti": "gw akan/gw mau" },
  { "phrase": "like", "arti": "suka/ingin" },
  { "phrase": "to see", "arti": "untuk melihat" }
]`;

export const lookupWordBreakdown = async (text) => {
  if (!text || typeof text !== "string") return [];
  const clean = text.trim();
  if (!clean) return [];

  const { model } = getSettings();
  const activeModel = model || "openrouter/free";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch("/api/lookup", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: activeModel,
        messages: [
          { role: "system", content: SYSTEM_PROMPT_BREAKDOWN },
          { role: "user", content: `Breakdown into meaning units: "${clean}"` },
        ],
        temperature: 0.2,
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return await generateWordBreakdownFallback(clean);
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content || "";

    const cleaned = content
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/```(?:json)?/gi, "")
      .replace(/```/g, "")
      .trim();

    const match = cleaned.match(/\[[\s\S]*\]/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mapped = parsed
            .map((item) => {
              if (typeof item === "string") {
                return { phrase: item.trim(), arti: "" };
              }
              const phrase = String(
                item.phrase || item.word || item.chunk || item.unit || item.kata || item.text || item.en || item.english || ""
              ).trim();
              const arti = String(
                item.arti || item.meaning || item.terjemahan || item.translation || item.makna || item.artinya || item.id || ""
              ).trim();
              return { phrase, arti: normalizePronounsToJaksel(arti) };
            })
            .filter((item) => item.phrase && item.arti);

          if (mapped.length > 0) {
            return mapped;
          }
        }
      } catch (parseErr) {
        console.warn("JSON parse error in breakdown, falling back:", parseErr.message);
      }
    }

    return await generateWordBreakdownFallback(clean);
  } catch (err) {
    console.warn("lookupWordBreakdown error, using fallback:", err.message);
    return await generateWordBreakdownFallback(clean);
  }
};

