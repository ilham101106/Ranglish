import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Check,
  Copy,
  Bookmark,
  Lightbulb,
  RefreshCw,
  X,
  FileText,
  Zap,
  Hourglass,
  Database,
  Shuffle,
  Gauge,
  ArrowRight,
  ArrowDown,
  Share2,
} from "lucide-react";
import { lookupVocabulary, lookupWordBreakdown } from "../services/openrouter";
import { generateWordBreakdownFallback } from "../services/freeTranslator";
import { speakText, stopSpeech } from "../services/speech";
import { saveVocabItem } from "../services/storage";
import WordBreakdownGrid from "./WordBreakdownGrid";
import {
  DICTIONARY,
  registerNewLearnedWord,
  getVocabBankStats,
  syncLearnedVocabBank,
} from "../services/instantEngine";
import { classifyText, sanitizeResultPayload } from "../utils/textClassifier";

const MOVIE_DIALOGUES = [
  "Damn, that was a close call!",
  "You have no idea what I've been through",
  "Cut the crap and tell me the truth",
  "We are running out of time, make up your mind!",
  "I knew it was too good to be true",
  "Don't you dare walk away from me right now!",
  "It is what it is, we gotta move on",
  "I've got your back, no matter what happens",
  "Why are you always giving me mixed signals?",
  "Let's get straight to the point",
  "I didn't sign up for this mess!",
  "Are you out of your mind?!",
  "I think we got off on the wrong foot",
  "You can't just sweep this under the rug",
  "I'm at my wit's end with this situation",
  "I'm taking a leap of faith here",
  "May the Force be with you, always",
  "Why so serious? Let's put a smile on that face!",
  "I'll be back",
  "To infinity and beyond!",
  "Houston, we have a problem",
];

const STORAGE_KEY = "ranglish_last_search";

const SONG_LYRICS = [
  "The midnight train leaves the station, but my mind is still wandering back to you",
  "We painted constellations on the ceiling just to pretend we weren't falling apart",
  "Raindrops tap against the glass, whispering all the promises we couldn't keep",
  "I keep your letters tucked inside my coat, keeping me warm when winter strikes",
  "Maybe in another skyline, our shadows wouldn't get lost in the sunset",
  "Standing under flickering streetlamps, hoping the dawn would never come",
  "You became my favorite melody in a city full of overwhelming noise",
  "Tangled in quiet thoughts while the coffee cup in my hands turns cold",
  "We built a fortress out of whispers and hopes, now watching the wind tear it down",
  "I smiled at the sunset today, wondering if you're looking at the same horizon",
  "Footsteps echoing through empty halls, chasing the phantom of your laughter",
  "Halfway across the ocean, yet your voice feels closer than my own heartbeat",
  "Holding onto faded Polaroid pictures that forgot how to feel the warmth",
  "The clock strikes two in the morning, and the silence is playing our story on repeat",
  "We were two drifting paper boats in a storm that was way too big for us",
  "If memories had a scent, you'd smell like autumn rain and bittersweet goodbyes",
  "I tried rewiring my thoughts, but every quiet corner still points back to you",
  "Leftover traces of your perfume on the passenger seat of my rusty car",
  "Someday we'll cross paths in a crowded café and pretend we were just strangers",
  "I wrote a thousand unsent notes, then let the night breeze carry them away",
  "Even beneath the darkest clouds, your smile remains my little pocket of sunshine",
  "Drifting between yesterday's regret and tomorrow's longing for your return",
  "We traded eternity for a fleeting moment, and I'd still do it all over again",
  "The city sleeps in shades of neon blue, but my sleepless eyes only look for you",
];

const SLANG_FYP = [
  "rizz",
  "delulu",
  "no cap",
  "slay",
  "gatekeep",
  "clout",
  "underrated",
  "overrated",
  "vulnerable",
  "pet peeve",
  "people pleaser",
  "trauma dumping",
];

const DAILY_PHRASES = [
  "in case",
  "just in case",
  "sleepwalk",
  "sleep in",
  "sleep on it",
  "call it a day",
  "break a leg",
  "piece of cake",
  "under the weather",
  "spill the beans",
  "touch base",
  "blessing in disguise",
  "couch potato",
  "cheat day",
  "binge watch",
  "workaholic",
  "foodie",
  "burnout",
];

export default function VocabLookup({ onHistoryUpdated }) {
  const [inputText, setInputText] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.inputText === "string") return parsed.inputText;
      }
    } catch (e) {
      console.warn("Error reading inputText from localStorage:", e);
    }
    return "hug me";
  });

  const [searchedWord, setSearchedWord] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.searchedWord === "string") return parsed.searchedWord;
      }
    } catch (e) {
      console.warn("Error reading searchedWord from localStorage:", e);
    }
    return "";
  });

  const [result, setResult] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.result) return parsed.result;
      }
    } catch (e) {
      console.warn("Error reading result from localStorage:", e);
    }
    return null;
  });

  const [audioSpeed, setAudioSpeed] = useState("normal");
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingExampleIndex, setPlayingExampleIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedFullCard, setCopiedFullCard] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [justLearned, setJustLearned] = useState(false);
  const [bankStats, setBankStats] = useState({ totalCount: 1250 });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wordBreakdown, setWordBreakdown] = useState([]);
  const [isLoadingBreakdown, setIsLoadingBreakdown] = useState(false);
  const [hasGeneratedBreakdown, setHasGeneratedBreakdown] = useState(false);
  const searchContainerRef = useRef(null);
  const wordBreakdownRef = useRef(null);
  const [loadingProgressMessage, setLoadingProgressMessage] = useState(
    "Lagi menghubungkan ke AI tutor...",
  );

  useEffect(() => {
    if (!isLoading) return;
    setLoadingProgressMessage("Lagi menghubungkan ke AI tutor...");
    const timer1 = setTimeout(() => {
      setLoadingProgressMessage(
        "Lagi mikir jawaban terbaik & konteks gaulnya buat lu...",
      );
    }, 1800);
    const timer2 = setTimeout(() => {
      setLoadingProgressMessage(
        "Hampir selesai, lagi merapikan nuansa obrolannya...",
      );
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLoading]);

  useEffect(() => {
    setBankStats(getVocabBankStats());
    if (!result && inputText) {
      handleLookup(inputText);
    }
  }, []);

  // Langkah 2c: Persist last search to localStorage
  useEffect(() => {
    if (!result) return;
    try {
      let resultToSave = result;
      if (result.isSongLyric === true) {
        resultToSave = {
          isSongLyric: true,
          focusPhrase: result.focusPhrase,
        };
      }
      const dataToStore = {
        inputText,
        searchedWord,
        result: resultToSave,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (err) {
      console.warn("Failed to save search to localStorage:", err);
    }
  }, [result]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (val) => {
    setInputText(val);
    const clean = val.trim().toLowerCase();
    if (clean.length >= 2) {
      const allKeys = Object.keys(DICTIONARY);
      const startsWith = [];
      const includes = [];
      for (const k of allKeys) {
        if (k.toLowerCase() === clean) continue;
        const entry = DICTIONARY[k];
        if (!entry || !entry.arti || entry.arti.startsWith("Makna &")) continue;

        if (k.toLowerCase().startsWith(clean)) {
          startsWith.push({
            word: k,
            arti: entry.arti,
            cara_baca: entry.cara_baca,
            classification: classifyText(k),
          });
        } else if (k.toLowerCase().includes(clean)) {
          includes.push({
            word: k,
            arti: entry.arti,
            cara_baca: entry.cara_baca,
            classification: classifyText(k),
          });
        }
        if (startsWith.length >= 6) break;
      }
      const combined = [...startsWith, ...includes].slice(0, 6);
      setSuggestions(combined);
      setShowSuggestions(combined.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLookup = async (overrideWord = null) => {
    const target = overrideWord || inputText;
    if (!target.trim()) return;

    setShowSuggestions(false);
    setIsLoading(true);
    setSearchedWord(target.trim());
    setSavedSuccess(false);
    setJustLearned(false);
    setWordBreakdown([]);
    setHasGeneratedBreakdown(false);
    stopSpeech();
    setIsAudioPlaying(false);
    setPlayingExampleIndex(null);

    try {
      const raw = await lookupVocabulary(target.trim());
      const unwrap = raw?.data || raw;
      const data = sanitizeResultPayload(unwrap);

      const cleanTarget = target.trim();

      if (data && data.displayContent && data.savedContent) {
        // 🎵 Dual-payload for song lyrics:
        saveVocabItem(data.savedContent, cleanTarget);
        setResult(data.displayContent);
      } else if (!data || !data.arti) {
        const fallback = sanitizeResultPayload(getInstantAnalysis(cleanTarget));
        const itemToSave = { ...fallback, teks_asli: fallback.teks_asli || cleanTarget };
        saveVocabItem(itemToSave, cleanTarget);
        setResult(itemToSave);
      } else {
        const itemToSave = { ...data, teks_asli: data.teks_asli || cleanTarget };
        saveVocabItem(itemToSave, cleanTarget);
        if (data.isNewlyLearned) {
          registerNewLearnedWord(itemToSave.teks_asli, itemToSave);
          setJustLearned(true);
          setBankStats(getVocabBankStats());
        }
        setResult(itemToSave);
      }

      if (onHistoryUpdated) onHistoryUpdated();
      setSavedSuccess(true);
    } catch (err) {
      console.error("Lookup error:", err);
      const cleanTarget = target.trim();
      const fallback = sanitizeResultPayload(getInstantAnalysis(cleanTarget));
      const itemToSave = { ...fallback, teks_asli: fallback.teks_asli || cleanTarget };
      saveVocabItem(itemToSave, cleanTarget);
      setResult(itemToSave);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = () => {
    if (isAudioPlaying) {
      stopSpeech();
      setIsAudioPlaying(false);
      return;
    }

    const activeText =
      result?.correctedWord ||
      result?.kata_terkoreksi ||
      searchedWord ||
      inputText.trim();

    if (!activeText) return;

    const rate = audioSpeed === "slow" ? 0.72 : 0.95;

    speakText(activeText, {
      rate,
      onEnd: () => setIsAudioPlaying(false),
      onError: () => setIsAudioPlaying(false),
    });
    setIsAudioPlaying(true);
  };

  const handleSpeedChange = (newSpeed) => {
    setAudioSpeed(newSpeed);
    if (isAudioPlaying) {
      const activeText =
        result?.correctedWord ||
        result?.kata_terkoreksi ||
        searchedWord ||
        inputText.trim();
      if (activeText) {
        stopSpeech();
        const rate = newSpeed === "slow" ? 0.72 : 0.95;
        speakText(activeText, {
          rate,
          onEnd: () => setIsAudioPlaying(false),
          onError: () => setIsAudioPlaying(false),
        });
        setIsAudioPlaying(true);
      }
    }
  };

  const handleSpeakExample = (sentenceText, idx) => {
    if (playingExampleIndex === idx) {
      stopSpeech();
      setPlayingExampleIndex(null);
      return;
    }

    stopSpeech();
    setIsAudioPlaying(false);
    setPlayingExampleIndex(idx);

    const rate = audioSpeed === "slow" ? 0.72 : 0.95;

    speakText(sentenceText, {
      rate,
      onEnd: () => setPlayingExampleIndex(null),
      onError: () => setPlayingExampleIndex(null),
    });
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyFullCard = () => {
    if (!result) return;
    const word =
      result.correctedWord ||
      result.kata_terkoreksi ||
      searchedWord ||
      result.teks_asli;
    const textToCopy = `📖 *${word}* ${result.cara_baca ? `(${result.cara_baca})` : ""}\n\n*Arti:* ${result.arti}\n\n*Contoh Penggunaan:*\n${
      result.penggunaan
        ? result.penggunaan
            .map((ex, i) => {
              const p = parseExample(ex);
              return `${i + 1}. ${p.en}\n   ${p.id || ""}`;
            })
            .join("\n")
        : ""
    }\n\n*Catatan Nuansa:* ${result.catatan || "-"}\n\n— Dipelajari di Ranglish (Anak Rantau Edition)`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedFullCard(true);
    setTimeout(() => setCopiedFullCard(false), 2000);
  };

  const handleGenerateBreakdown = async () => {
    const activeText =
      result?.correctedWord ||
      result?.kata_terkoreksi ||
      searchedWord ||
      inputText.trim();

    if (!activeText) return;

    setIsLoadingBreakdown(true);
    try {
      let breakdownData = await lookupWordBreakdown(activeText);
      if (!breakdownData || breakdownData.length === 0) {
        breakdownData = await generateWordBreakdownFallback(activeText);
      }
      setWordBreakdown(breakdownData && breakdownData.length > 0 ? breakdownData : []);
      setHasGeneratedBreakdown(true);
    } catch (err) {
      console.error("Error generating breakdown, trying fallback:", err);
      try {
        const fallback = await generateWordBreakdownFallback(activeText);
        setWordBreakdown(fallback && fallback.length > 0 ? fallback : []);
      } catch (fbErr) {
        console.error("Fallback breakdown error:", fbErr);
        setWordBreakdown([]);
      }
      setHasGeneratedBreakdown(true);
    } finally {
      setIsLoadingBreakdown(false);
    }
  };

  const handleScrollToBreakdown = () => {
    const triggerScroll = () => {
      if (wordBreakdownRef.current) {
        wordBreakdownRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        wordBreakdownRef.current.classList.add(
          "ring-2",
          "ring-[#5842f5]",
          "ring-offset-2",
          "rounded-[22px]"
        );
        setTimeout(() => {
          wordBreakdownRef.current?.classList.remove(
            "ring-2",
            "ring-[#5842f5]",
            "ring-offset-2",
            "rounded-[22px]"
          );
        }, 1500);
      }
    };

    if (!hasGeneratedBreakdown && !isLoadingBreakdown) {
      handleGenerateBreakdown();
      setTimeout(triggerScroll, 150);
    } else {
      triggerScroll();
    }
  };

  const handleRandomExplore = () => {
    const allOptions = [
      ...MOVIE_DIALOGUES,
      ...SONG_LYRICS,
      ...SLANG_FYP,
      ...DAILY_PHRASES,
    ];
    const pick = allOptions[Math.floor(Math.random() * allOptions.length)];
    setInputText(pick);
    handleLookup(pick);
  };

  const handleRandomCategory = (categoryArray) => {
    const pick =
      categoryArray[Math.floor(Math.random() * categoryArray.length)];
    setInputText(pick);
    handleLookup(pick);
  };

  // Helper to parse English and Indonesian lines in examples
  const parseExample = (exampleStr) => {
    if (typeof exampleStr !== "string") return { en: exampleStr, id: "" };
    let en = "";
    let id = "";

    const parts = exampleStr.split(/\((.*?)\)/);
    if (parts.length >= 2) {
      en = parts[0].trim();
      id = parts[1] ? `(${parts[1].trim()})` : "";
    } else {
      const dashParts = exampleStr.split(" - ");
      if (dashParts.length >= 2) {
        en = dashParts[0].trim();
        id = dashParts.slice(1).join(" - ").trim();
      } else {
        en = exampleStr.trim();
      }
    }

    // Clean English line if Indonesian prefix or code-switching is detected
    const indoWordRegex = /\b(bro|tadi|kita|nonton|konser|kembang|apinya|gede|banget|nggak|ngga|beneran|kalo|kalau|udah|sudah|bisa|ini|itu|ada|yang|dari|pada|sama|dan|atau|cuma|hanya|aja|saja|lu|gw|gue|kamu|aku)\b/i;
    if (en.includes("—") || en.includes(" - ")) {
      const segments = en.split(/—|\s-\s/);
      if (indoWordRegex.test(segments[0]) && segments.length >= 2) {
        en = segments.slice(1).join(" — ").trim();
      }
    }

    // Capitalize first character of English sentence
    if (en.length > 0) {
      en = en.charAt(0).toUpperCase() + en.slice(1);
    }

    return { en, id };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-extrabold theme-text-main tracking-tight font-sans">
            Cari Kata, Frasa, atau Lirik
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-2xs">
              <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" />
              <span>Instan 0ms ⚡</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#5842f5]/10 text-[#5842f5] border border-[#5842f5]/25 shadow-2xs">
              <Database className="w-3 h-3 text-[#5842f5]" />
              <span>{bankStats.totalCount > 100 ? `${bankStats.totalCount.toLocaleString('id-ID')}+` : '1.250+'} Bank Kosakata AI</span>
            </span>
          </div>
        </div>
        <p className="text-xs sm:text-[13.5px] theme-text-muted leading-relaxed max-w-2xl font-medium">
          Setiap kata baru otomatis dipelajari &amp; disimpan permanen ke Bank AI lokal — makin sering dipakai, makin cerdas &amp; instan!
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative" ref={searchContainerRef}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowSuggestions(false);
            handleLookup();
          }}
          className="w-full theme-bg-card border-2 theme-border rounded-[22px] p-2.5 sm:p-2.5 sm:pl-6 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 theme-card-shadow focus-within:border-[#5842f5] focus-within:ring-4 focus-within:ring-[#5842f5]/15 transition-all shadow-md hover:shadow-lg"
        >
          {/* Input & Icons Group */}
          <div className="flex items-center gap-3 flex-1 w-full pl-2 sm:pl-0">
            <Search className="w-5 h-5 text-[#5842f5] shrink-0" />

            <input
              type="text"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => {
                if (inputText.trim().length >= 2 && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Paste kata, frasa, atau lirik yang mau dipelajari..."
              className="flex-1 bg-transparent border-none outline-none theme-text-main text-sm sm:text-base placeholder:theme-text-faint font-semibold py-1.5 min-w-0"
            />

            {inputText && (
              <button
                type="button"
                onClick={() => {
                  setInputText("");
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="theme-text-faint hover:theme-text-main p-2 rounded-xl transition shrink-0"
                title="Hapus teks"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className={`w-full sm:w-auto sm:shrink-0 px-5 sm:px-8 py-3 sm:py-3.5 rounded-[16px] text-xs sm:text-[14px] font-extrabold text-white transition-all duration-150 flex items-center justify-center gap-2 shadow-md whitespace-nowrap ${
              isLoading || !inputText.trim()
                ? "opacity-60 cursor-not-allowed bg-gradient-to-r from-[#5842f5] to-[#f59e0b]"
                : "bg-gradient-to-r from-[#5842f5] to-[#f59e0b] hover:opacity-95 active:scale-[0.98] hover:shadow-lg hover:shadow-indigo-500/25"
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Menganalisis...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>
                  {inputText.trim().split(/\s+/).filter(Boolean).length > 1
                    ? "Pelajari Kalimat Ini"
                    : "Pelajari Kata Ini"}
                </span>
              </>
            )}
          </button>
        </form>

        <p className="text-[12px] theme-text-muted mt-2 ml-2 font-medium">
          Setiap kata baru otomatis dipelajari &amp; disimpan ke riwayat lu.
        </p>

        {/* Autocomplete Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 theme-bg-card border theme-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-up divide-y theme-border-subtle">
            <div className="px-4 py-2 theme-bg-subtle flex items-center justify-between text-[11px] font-bold theme-text-muted">
              <span className="flex items-center gap-1.5 text-[#5842f5]">
                <Zap className="w-3 h-3 text-amber-500" /> SARAN INSTAN DARI BANK KOSAKATA (0ms)
              </span>
              <span className="text-[10px] theme-text-faint">
                Klik untuk pilih
              </span>
            </div>
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(item.word);
                  setShowSuggestions(false);
                  handleLookup(item.word);
                }}
                className="w-full text-left px-4 py-3 hover:theme-bg-subtle flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-3">
                  <span
                    className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md border ${item.classification.color} shrink-0`}
                  >
                    {item.classification.icon} {item.classification.label}
                  </span>
                  <span className="font-bold text-sm theme-text-main group-hover:text-[#5842f5] transition truncate">
                    {item.word}
                  </span>
                  {item.cara_baca && (
                    <span className="text-[11px] theme-text-faint hidden sm:inline truncate">
                      🗣️ {item.cara_baca}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs theme-text-muted max-w-[200px] sm:max-w-[300px] truncate">
                    {item.arti}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 theme-text-faint group-hover:text-[#5842f5] group-hover:translate-x-0.5 transition" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 5 Preset Chips */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold tracking-wider text-[#5842f5] uppercase flex items-center gap-1.5">
            <span>💡</span> LAGI BINGUNG MAU CARI APA? KLIK CONTOH SIAP PAKE NIH:
          </span>
          <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-md bg-[#5842f5]/15 text-[#5842f5] border border-[#5842f5]/30">
            Contoh Cepat
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Chip 1 */}
          <button
            type="button"
            onClick={handleRandomExplore}
            className="text-xs sm:text-[12.5px] font-extrabold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-violet-500/15 hover:from-amber-500/25 hover:to-violet-500/25 border border-amber-500/40 text-amber-700 dark:text-amber-300 transition-all duration-150 flex items-center gap-1.5 shadow-2xs hover:scale-[1.03] active:scale-[0.97]"
            title="Pilih kata / dialog acak dari Bank Kosakata"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>🎲 Acak Kata Keren</span>
          </button>

          {/* Chip 2 */}
          <button
            type="button"
            onClick={() => handleRandomCategory(MOVIE_DIALOGUES)}
            title="Pilih kutipan dialog film / serial keren secara acak"
            className="text-xs sm:text-[12.5px] font-bold px-3.5 py-1.5 rounded-full theme-bg-card hover:theme-bg-subtle border theme-border hover:border-[#5842f5] theme-text-muted hover:theme-text-main transition-all duration-150 flex items-center gap-1.5 shadow-2xs hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>🎬 Dialog Film Keren</span>
            <span className="text-[10px] theme-text-faint group-hover:text-[#5842f5] transition-colors">
              ↗
            </span>
          </button>

          {/* Chip 3 */}
          <button
            type="button"
            onClick={() => handleRandomCategory(SONG_LYRICS)}
            title="Pilih kutipan lirik lagu favorit, romantis, & bermakna secara acak"
            className="text-xs sm:text-[12.5px] font-bold px-3.5 py-1.5 rounded-full theme-bg-card hover:theme-bg-subtle border theme-border hover:border-[#5842f5] theme-text-muted hover:theme-text-main transition-all duration-150 flex items-center gap-1.5 shadow-2xs hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>🎵 Lirik Lagu Favorit</span>
            <span className="text-[10px] theme-text-faint group-hover:text-[#5842f5] transition-colors">
              ↗
            </span>
          </button>

          {/* Chip 4 */}
          <button
            type="button"
            onClick={() => handleRandomCategory(SLANG_FYP)}
            title="Pilih slang gaul viral medsos & TikTok"
            className="text-xs sm:text-[12.5px] font-bold px-3.5 py-1.5 rounded-full theme-bg-card hover:theme-bg-subtle border theme-border hover:border-[#5842f5] theme-text-muted hover:theme-text-main transition-all duration-150 flex items-center gap-1.5 shadow-2xs hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>📱 Slang Sosmed FYP</span>
            <span className="text-[10px] theme-text-faint group-hover:text-[#5842f5] transition-colors">
              ↗
            </span>
          </button>

          {/* Chip 5 */}
          <button
            type="button"
            onClick={() => handleRandomCategory(DAILY_PHRASES)}
            title="Pilih frasa percakapan & idiom harian"
            className="text-xs sm:text-[12.5px] font-bold px-3.5 py-1.5 rounded-full theme-bg-card hover:theme-bg-subtle border theme-border hover:border-[#5842f5] theme-text-muted hover:theme-text-main transition-all duration-150 flex items-center gap-1.5 shadow-2xs hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>💬 Frasa Sehari-hari</span>
            <span className="text-[10px] theme-text-faint group-hover:text-[#5842f5] transition-colors">
              ↗
            </span>
          </button>
        </div>
      </div>

      {/* Skeleton Loading State with Progressive Status */}
      {isLoading && (
        <div className="p-6 sm:p-8 rounded-[22px] theme-bg-card border theme-border space-y-5 theme-card-shadow">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl theme-bg-subtle border theme-border w-fit">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-[#5842f5] border-t-transparent animate-spin shrink-0"></div>
            <span className="text-xs sm:text-[13px] font-bold text-[#5842f5] dark:text-[#c7d2fe]">
              {loadingProgressMessage}
            </span>
          </div>
          <div className="animate-pulse space-y-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-36 theme-bg-subtle rounded-lg"></div>
              <div className="h-6 w-20 theme-bg-subtle rounded-full"></div>
            </div>
            <div className="h-5 w-32 theme-bg-subtle rounded"></div>
            <div className="h-14 w-full theme-bg-subtle rounded-xl"></div>
            <div className="space-y-3 pt-2">
              <div className="h-16 w-full theme-bg-subtle rounded-xl"></div>
              <div className="h-16 w-full theme-bg-subtle rounded-xl"></div>
            </div>
          </div>
        </div>
      )}

      {/* Result Grid — 2 Columns on Desktop */}
      {!isLoading &&
        result &&
        (() => {
          const activeText =
            result.correctedWord ||
            result.kata_terkoreksi ||
            searchedWord ||
            inputText.trim() ||
            "Kosakata";
          const classification = classifyText(activeText);

          return (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-7 items-start animate-slide-up">
              {/* Main Column (Left) */}
              <div className="col-main space-y-6">
                <div className="theme-bg-card border theme-border rounded-[22px] p-6 sm:p-8 space-y-6 theme-card-shadow relative">
                  {/* Header Row: Classification Type Badge & Status */}
                  <div className="flex items-center justify-between gap-2.5 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${classification.color} flex items-center gap-1.5 shadow-2xs`}
                      >
                        <span>{classification.icon}</span>
                        <span>{classification.label}</span>
                      </span>
                      <span className="text-xs theme-text-muted font-bold">
                        {classification.badgeText}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {activeText.trim().split(/\s+/).filter(Boolean).length > 1 && (
                        <button
                          type="button"
                          onClick={handleScrollToBreakdown}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#5842f5]/15 hover:bg-[#5842f5]/25 border border-[#5842f5]/30 text-[#5842f5] dark:text-[#c7d2fe] transition flex items-center gap-1.5 shadow-2xs hover:scale-[1.02] active:scale-95 group"
                          title="Lompat & bedah arti kata per kata di bawah"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#5842f5] group-hover:rotate-12 transition-transform" />
                          <span>Bedah Kata</span>
                          <ArrowDown className="w-3.5 h-3.5 text-[#5842f5] group-hover:translate-y-0.5 transition-transform" />
                        </button>
                      )}

                      <button
                        onClick={handleCopyFullCard}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl theme-bg-subtle hover:theme-bg-card border theme-border hover:border-[#5842f5] text-[#5842f5] transition flex items-center gap-1.5 shadow-2xs active:scale-95"
                        title="Salin seluruh info kata, cara baca, arti, dan contoh ke clipboard"
                      >
                        {copiedFullCard ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-extrabold">
                              Tersalin Lengkap!
                            </span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5 text-[#5842f5]" />
                            <span>Salin Rangkuman</span>
                          </>
                        )}
                      </button>

                      {justLearned && (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-extrabold text-[#5842f5] bg-[#5842f5]/15 border border-[#5842f5]/30 px-2.5 py-0.5 rounded-full animate-bounce">
                          ✨ Baru Masuk Bank AI!
                        </span>
                      )}

                      {savedSuccess && !justLearned && (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          <Bookmark className="w-3 h-3" /> Tersimpan ke Riwayat
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Typo Correction Banner if applicable */}
                  {(result.isTypoCorrected || result.kata_terkoreksi) && (
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-[12px] bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs sm:text-[13px] font-bold">
                      <span>💡</span>
                      <span>
                        Typo dikit nih pas ngetik "
                        {result.originalQuery || searchedWord}"! Maksud lu:{" "}
                        <strong className="theme-text-main font-extrabold underline">
                          {result.correctedWord || result.kata_terkoreksi}
                        </strong>
                      </span>
                    </div>
                  )}

                  {/* Word & Pronunciation */}
                  <div className="space-y-2">
                    {result.detectedSong && (result.detectedSong.title || result.detectedSong.artist) && (
                      <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#5842f5] bg-[#5842f5]/10 border border-[#5842f5]/25 px-3 py-1 rounded-full">
                        <span>🎵 Lagu:</span>
                        <span>
                          {result.detectedSong.title || "Lirik Lagu"}{" "}
                          {result.detectedSong.artist ? `— ${result.detectedSong.artist}` : ""}
                        </span>
                      </div>
                    )}

                    <h2 className="text-2xl sm:text-[32px] font-extrabold theme-text-main tracking-tight leading-tight whitespace-pre-line">
                      {activeText}
                    </h2>

                    {result.cara_baca && (
                      <div className="inline-block">
                        <span className="text-xs sm:text-[13px] text-[#4338ca] dark:text-[#c9c2ff] bg-[#5842f5]/10 border border-[#5842f5]/25 px-3 py-1 rounded-full font-medium">
                          🗣️ {result.cara_baca}
                        </span>
                      </div>
                    )}

                    {result.focusPhrase && (
                      <div className="text-xs bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 px-3.5 py-2 rounded-xl flex items-center gap-2 font-medium">
                        <span>💾</span>
                        <span>
                          <strong>Disimpan ke Riwayat:</strong> Frasa kunci{" "}
                          <span className="font-bold underline">"{result.focusPhrase}"</span> (maks. 5 kata) agar mudah dihafal.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* STRICT SECTION 1: ARTI BAHASA INDONESIA */}
                  <div className="space-y-2 pt-1 border-t theme-border-subtle">
                    <div className="text-[11px] font-extrabold tracking-wider theme-text-muted uppercase flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#5842f5]" />
                      <span>📖 ARTI BAHASA INDONESIA</span>
                    </div>
                    <p className="text-sm sm:text-base leading-[1.7] theme-text-main font-medium whitespace-pre-line">
                      {result.fullTranslation || result.arti}
                    </p>
                  </div>

                  {/* STRICT SECTION 2: CONTOH PENGGUNAAN (CONTEXT) */}
                  {result.penggunaan && result.penggunaan.length > 0 && (
                    <div className="space-y-3 pt-2 border-t theme-border-subtle">
                      <div className="text-[11px] font-extrabold tracking-wider theme-text-muted uppercase flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-amber-500" />
                        <span>📄 CONTOH PENGGUNAAN (CONTEXT)</span>
                      </div>

                      <div className="flex flex-col gap-3">
                        {result.penggunaan.map((ex, i) => {
                          const parsed = parseExample(ex);
                          const isCopied = copiedIndex === i;
                          const isSpeakingThis = playingExampleIndex === i;

                          return (
                            <div
                              key={i}
                              className="flex items-start gap-3.5 theme-bg-subtle border theme-border hover:border-[#5842f5]/40 rounded-[16px] p-4 group transition duration-150 shadow-2xs"
                            >
                              <div className="w-6 h-6 rounded-lg bg-[#5842f5]/15 text-[#5842f5] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 border border-[#5842f5]/25">
                                {i + 1}
                              </div>

                              <div className="flex-1 text-[14px] leading-relaxed">
                                <div className="theme-text-main font-bold">
                                  {parsed.en}
                                </div>
                                {parsed.id && (
                                  <div className="theme-text-muted text-xs sm:text-[13px] mt-1 font-normal">
                                    {parsed.id}
                                  </div>
                                )}
                              </div>

                              {/* Action Buttons: 44px touch target */}
                              <div className="flex items-center gap-1.5 shrink-0">
                                {/* Speak Sentence Button */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSpeakExample(parsed.en, i)
                                  }
                                  className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl border transition flex items-center justify-center shadow-2xs ${
                                    isSpeakingThis
                                      ? "bg-amber-500 text-white border-amber-500 font-bold shadow-md"
                                      : "border theme-border theme-bg-card theme-text-muted hover:theme-text-main hover:border-[#5842f5]"
                                  }`}
                                  title="Dengarkan pelafalan kalimat ini (Shadowing)"
                                  aria-label="Dengarkan pelafalan contoh kalimat"
                                >
                                  {isSpeakingThis ? (
                                    <VolumeX className="w-4 h-4 animate-bounce" />
                                  ) : (
                                    <Volume2 className="w-4 h-4 text-[#5842f5]" />
                                  )}
                                </button>

                                {/* Copy Sentence Button */}
                                <button
                                  type="button"
                                  onClick={() => handleCopy(parsed.en, i)}
                                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl border theme-border theme-bg-card theme-text-muted hover:theme-text-main hover:border-[#5842f5] flex items-center justify-center transition shadow-2xs"
                                  title="Salin kalimat bahasa Inggris"
                                  aria-label="Salin kalimat bahasa Inggris"
                                >
                                  {isCopied ? (
                                    <Check className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Column (Right) */}
              <div className="col-side flex flex-col gap-4 lg:sticky lg:top-8">
                {/* Audio Pronunciation Card */}
                <div className="theme-bg-card border theme-border rounded-[22px] p-5 theme-card-shadow space-y-4">
                  <div>
                    <h3 className="text-sm font-extrabold theme-text-main">
                      Dengarkan Pelafalan
                    </h3>
                    <p className="text-[11.5px] theme-text-muted font-medium mt-0.5">
                      Audio pelafalan aksen native US
                    </p>
                  </div>

                  {/* Hero Play Button */}
                  <button
                    type="button"
                    onClick={handleSpeech}
                    className={`w-full flex items-center justify-center gap-2.5 p-3.5 rounded-xl text-[13.5px] font-extrabold transition duration-150 shadow-md ${
                      isAudioPlaying
                        ? "bg-amber-500 text-white shadow-amber-500/25"
                        : "bg-[#5842f5] hover:bg-[#4338ca] text-white shadow-indigo-500/20 active:scale-[0.98]"
                    }`}
                    title="Dengarkan pengucapan kata/lirik utama"
                  >
                    {isAudioPlaying ? (
                      <>
                        <VolumeX className="w-4 h-4 animate-bounce" />
                        <span>Sedang Memutar...</span>
                        <div className="flex items-end gap-0.5 h-3.5 ml-1">
                          <span
                            className="w-0.5 bg-white rounded-full animate-sound-wave"
                            style={{ animationDelay: "0ms" }}
                          ></span>
                          <span
                            className="w-0.5 bg-white rounded-full animate-sound-wave"
                            style={{ animationDelay: "150ms" }}
                          ></span>
                          <span
                            className="w-0.5 bg-white rounded-full animate-sound-wave"
                            style={{ animationDelay: "300ms" }}
                          ></span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Dengarkan Pelafalan</span>
                      </>
                    )}
                  </button>

                  {/* Side-by-Side Speed Selector in One Pill */}
                  <div className="pt-2 border-t theme-border-subtle flex items-center justify-between">
                    <span className="text-[11px] font-bold theme-text-muted uppercase">
                      Kecepatan:
                    </span>
                    <div className="flex items-center p-0.5 rounded-full border theme-border theme-bg-subtle shadow-2xs">
                      {/* Normal Speed Button */}
                      <button
                        type="button"
                        onClick={() => handleSpeedChange("normal")}
                        aria-label="Kecepatan 1.0x Normal"
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                          audioSpeed === "normal"
                            ? "bg-[#5842f5] text-white shadow-sm font-extrabold"
                            : "theme-text-muted hover:theme-text-main"
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>1.0x Normal</span>
                      </button>

                      {/* Slow Speed Button */}
                      <button
                        type="button"
                        onClick={() => handleSpeedChange("slow")}
                        aria-label="Kecepatan 0.75x Slow"
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                          audioSpeed === "slow"
                            ? "bg-amber-500 text-white shadow-sm font-extrabold"
                            : "theme-text-muted hover:theme-text-main"
                        }`}
                      >
                        <Hourglass className="w-3.5 h-3.5" />
                        <span>0.75x Slow</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tips & Nuances (Ala Anak Rantau) */}
                {result.catatan && (
                  <div className="tip-box p-5 sm:p-6 space-y-2.5 relative overflow-hidden">
                    <div className="flex items-center gap-2 text-[13px] font-extrabold">
                      <span>Catatan Anak Rantau</span>
                    </div>
                    <p className="text-xs sm:text-[13px] leading-[1.65] font-normal">
                      {result.catatan}
                    </p>
                  </div>
                )}

                {/* WordBreakdownGrid - Posisi di Sidebar */}
                {activeText.trim().split(/\s+/).filter(Boolean).length > 1 && (
                  <div
                    ref={wordBreakdownRef}
                    id="word-breakdown-wrapper"
                    className="w-full transition-all duration-300"
                  >
                    <WordBreakdownGrid
                      breakdown={wordBreakdown}
                      isLoading={isLoadingBreakdown}
                      onGenerate={handleGenerateBreakdown}
                      hasGenerated={hasGeneratedBreakdown}
                    />
                  </div>
                )}

                {/* Makna & Psikologi Rasa (maknaFilosofis) */}
                {result.maknaFilosofis && (
                  <div className="p-5 sm:p-6 rounded-[22px] theme-bg-card border theme-border theme-card-shadow space-y-2.5 relative overflow-hidden">
                    <div className="flex items-center gap-2 text-[13px] font-extrabold text-[#5842f5] dark:text-[#c7d2fe]">
                      <span>Makna & Psikologi Rasa</span>
                    </div>
                    <p className="text-xs sm:text-[13px] leading-[1.65] font-normal theme-text-main">
                      {result.maknaFilosofis}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
    </div>
  );
}
