const SETTINGS_KEY = 'ranglish_settings';
const HISTORY_KEY = 'ranglish_vocab_history';
const VOCAB_BANK_KEY = 'ranglish_ai_vocab_bank';

export const DEFAULT_MODELS = [
  { id: 'google/gemini-3.5-flash', name: 'Google Gemini 3.5 Flash (Tier 1 AI Utama)' },
  { id: 'openrouter/free', name: 'OpenRouter Free Auto-Router (Tier 2 Fallback)' },
  { id: 'google/gemma-2-9b-it:free', name: 'Google Gemma 2 9B (Free)' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Meta Llama 3.3 70B (Free)' },
  { id: 'qwen/qwen-2.5-72b-instruct:free', name: 'Qwen 2.5 72B (Free)' },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B (Free)' },
];

/**
 * Sanitizes text by stripping out legacy robotic template contamination
 */
export const stripTemplateContamination = (text) => {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/\s*—\s*Frasa\s*(?:percakapan\s*luwes|deskriptif|reflektif)[^.]*$/i, '')
    .replace(/\s*Susunan kalimatnya lugas.*$/i, '')
    .replace(/\s*Kejelasan dalam menyampaikan pikiran.*$/i, '')
    .replace(/^(?:Makna santai|Makna emosional|Makna lugas|Makna formal|Makna gaul):\s*/i, '')
    .replace(/\s*(?:bareng|sama|dengan|bersama)\s*(?:orang\s*tersayang|ayang|pacar|gebetan)\b/gi, '')
    .trim();
};

export const getSettings = () => {
  const envModel = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENROUTER_MODEL) || DEFAULT_MODELS[0].id;
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return {
      apiKey: '',
      model: envModel,
      theme: 'light',
      customPrompt: ''
    };
  }

  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      let model = parsed.model || envModel;
      
      // Auto-migrate any broken or outdated model names to Gemini or openrouter/free
      if (
        model.includes('3.2-3b') ||
        model.includes('3.1-8b') ||
        model.includes('gemini-2.0-flash-lite') ||
        model.includes('minimax') ||
        model.includes('nemotron')
      ) {
        model = DEFAULT_MODELS[0].id;
      }

      const theme = parsed.theme || 'standar';

      return {
        // API key kini sepenuhnya dikelola di server melalui serverless proxy /api/lookup
        apiKey: null,
        model: model || DEFAULT_MODELS[0].id,
        theme: theme,
      };
    }
  } catch (err) {
    console.error('Error reading settings from localStorage:', err);
  }
  return {
    apiKey: null,
    model: envModel,
    theme: 'standar',
  };
};

export const saveSettings = (settings) => {
  try {
    const current = getSettings();
    const merged = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    
    if (merged.theme) {
      document.documentElement.setAttribute('data-theme', merged.theme);
      window.dispatchEvent(new CustomEvent('ranglish_theme_changed', { detail: merged.theme }));
    }
  } catch (err) {
    console.error('Error saving settings to localStorage:', err);
  }
};

export const getAppTheme = () => {
  return getSettings().theme || 'standar';
};

export const setAppTheme = (theme) => {
  saveSettings({ theme });
};

// ==========================================
// 📚 AI VOCABULARY BANK PERSISTENCE (AUTO-CLEANING & UPGRADING)
// ==========================================
export const getLearnedVocabBank = () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return {};
  }
  try {
    const data = localStorage.getItem(VOCAB_BANK_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      let hasChanges = false;
      const cleanBank = {};

      Object.keys(parsed).forEach((k) => {
        const item = parsed[k];
        const isEcho =
          item?.arti &&
          (item.arti.toLowerCase().trim() === k.toLowerCase().trim() ||
            (item.word && item.arti.toLowerCase().trim() === item.word.toLowerCase().trim()));
        const isOldRobotNote =
          item?.catatan &&
          (item.catatan.includes('Bikin obrolan dua arah') ||
            item.catatan.includes('luwes banget dipake pas lagi nongkrong') ||
            item.catatan.includes('obrolan dua arah jadi lebih hidup') ||
            item.catatan.includes('Kosakata ringkas yang fungsional banget'));
        const hasCoffeeCatchup =
          item?.penggunaan &&
          Array.isArray(item.penggunaan) &&
          item.penggunaan.some((ex) => /coffee catchup/i.test(ex));
        const hasBadTemplate =
          item?.penggunaan &&
          Array.isArray(item.penggunaan) &&
          item.penggunaan.some((ex) =>
            /Basically,\s+just\s+focus\s+on/i.test(ex) ||
            /Having a clear grasp of/i.test(ex) ||
            /He brought up the word/i.test(ex) ||
            /The conversation shifted when someone mentioned/i.test(ex) ||
            /A simple reminder that .* really matters in the long run/i.test(ex)
          );
        const isLongSentence = k.split(/\s+/).filter(Boolean).length > 3;

        const isCorrupt =
          !item ||
          !item.arti ||
          isEcho ||
          isOldRobotNote ||
          hasCoffeeCatchup ||
          hasBadTemplate ||
          isLongSentence ||
          item.arti.toLowerCase().includes('thinking process') ||
          item.arti.toLowerCase().includes('analyze user input') ||
          item.arti.toLowerCase().includes('makna & pemakaian kata') ||
          (item.catatan && item.catatan.toLowerCase().includes('thinking process'));

        if (!isCorrupt) {
          const cleanedArti = stripTemplateContamination(item.arti);
          if (cleanedArti !== item.arti) {
            hasChanges = true;
          }
          cleanBank[k.toLowerCase()] = {
            ...item,
            arti: cleanedArti
          };
        } else {
          hasChanges = true;
        }
      });

      if (hasChanges) {
        localStorage.setItem(VOCAB_BANK_KEY, JSON.stringify(cleanBank));
      }

      return cleanBank;
    }
  } catch (err) {
    console.error('Error reading learned vocab bank from localStorage:', err);
  }
  return {};
};

export const saveLearnedVocabToBank = (word, vocabData) => {
  try {
    const cleanWord = word.toLowerCase().trim();
    const isEcho =
      vocabData.arti.toLowerCase().trim() === cleanWord ||
      (vocabData.word && vocabData.arti.toLowerCase().trim() === vocabData.word.toLowerCase().trim());
    const isGenericFiller =
      vocabData.catatan &&
      (vocabData.catatan.includes('Kosakata ringkas yang fungsional banget') ||
        vocabData.catatan.includes('Bikin obrolan dua arah') ||
        vocabData.catatan.includes('luwes banget dipake pas lagi nongkrong'));

    const hasBadTemplate =
      vocabData.penggunaan &&
      Array.isArray(vocabData.penggunaan) &&
      vocabData.penggunaan.some((ex) =>
        /Basically,\s+just\s+focus\s+on/i.test(ex) ||
        /Having a clear grasp of/i.test(ex) ||
        /He brought up the word/i.test(ex) ||
        /The conversation shifted when someone mentioned/i.test(ex) ||
        /A simple reminder that .* really matters in the long run/i.test(ex)
      );

    // Strict quality gate: never save corrupt, echoed, or thinking-process data
    const isCorrupt =
      isEcho ||
      isGenericFiller ||
      hasBadTemplate ||
      vocabData.arti.toLowerCase().includes('thinking process') ||
      vocabData.arti.toLowerCase().includes('analyze user input') ||
      vocabData.arti.toLowerCase().includes('makna & pemakaian kata') ||
      (vocabData.catatan && vocabData.catatan.toLowerCase().includes('thinking process'));

    if (isCorrupt) return;

    const currentBank = getLearnedVocabBank();
    const sanitizedArti = stripTemplateContamination(vocabData.arti);

    currentBank[cleanWord] = {
      arti: sanitizedArti,
      cara_baca: vocabData.cara_baca || cleanWord,
      penggunaan: vocabData.penggunaan || [],
      catatan: vocabData.catatan || '',
      isAiLearned: true,
      learnedAt: new Date().toISOString()
    };

    localStorage.setItem(VOCAB_BANK_KEY, JSON.stringify(currentBank));
    return currentBank;
  } catch (err) {
    console.error('Error saving new learned vocab to bank:', err);
  }
};

// ==========================================
// 🕒 USER VOCAB HISTORY (AUTO-PURGE CORRUPT ENTRIES)
// ==========================================
export const getVocabHistory = () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return [];
  }
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      let hasChanges = false;
      const cleanHistory = [];

      for (const h of parsed) {
        if (!h || !h.arti) continue;
        const artiStr = typeof h.arti === 'string' ? h.arti : String(h.arti);
        const hasBadTemplate =
          (h?.penggunaan &&
            Array.isArray(h.penggunaan) &&
            h.penggunaan.some(
              (ex) =>
                /Basically,\s+just\s+focus\s+on/i.test(ex) ||
                /Having a clear grasp of/i.test(ex) ||
                /He brought up the word/i.test(ex) ||
                /The conversation shifted when someone mentioned/i.test(ex) ||
                /A simple reminder that .* really matters in the long run/i.test(ex)
            )) ||
          (h.word && artiStr.toLowerCase().trim() === h.word.toLowerCase().trim()) ||
          (h.teks_asli && artiStr.toLowerCase().trim() === h.teks_asli.toLowerCase().trim());

        const isGenericFiller =
          h.catatan &&
          (h.catatan.includes('Kosakata ringkas yang fungsional banget') ||
            h.catatan.includes('Bikin obrolan dua arah') ||
            h.catatan.includes('luwes banget dipake pas lagi nongkrong'));

        if (
          hasBadTemplate ||
          isGenericFiller ||
          artiStr.toLowerCase().includes('thinking process') ||
          artiStr.toLowerCase().includes('analyze user input')
        ) {
          hasChanges = true;
          continue;
        }

        const cleanedArti = stripTemplateContamination(artiStr);
        if (cleanedArti !== artiStr) {
          hasChanges = true;
        }

        let itemToSave = {
          ...h,
          arti: cleanedArti
        };

        // Auto-sanitize any hallucinated song citations
        if (
          itemToSave.detectedSong &&
          (itemToSave.detectedSong.title === "I Bet on Losing Dogs" ||
           (itemToSave.catatan && itemToSave.catatan.includes("I Bet on Losing Dogs")))
        ) {
          hasChanges = true;
          itemToSave.detectedSong = null;
          if (itemToSave.catatan && /I Bet on Losing Dogs/i.test(itemToSave.catatan)) {
            itemToSave.catatan = "Kalimat ini adalah ungkapan bermakna yang pas buat ngingetin batasan diri (boundaries) dan cara kita menyikapi situasi dengan lebih bijak.";
          }
          if (itemToSave.classification?.type === "song") {
            itemToSave.classification = {
              type: "sentence",
              label: "KALIMAT",
              icon: "✨",
              color: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
              badgeText: "Kalimat Lengkap",
            };
          }
        }

        cleanHistory.push(itemToSave);
      }

      if (hasChanges) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(cleanHistory));
      }

      return cleanHistory;
    }
  } catch (err) {
    console.error('Error reading history from localStorage:', err);
  }
  return [];
};

export const saveVocabItem = (item, fallbackText = '') => {
  try {
    if (!item) return null;
    const rawArti = item.arti || item.focusPhraseMeaning || '';
    if (!rawArti) return null;
    
    const artiStr = typeof rawArti === 'string' ? rawArti : String(rawArti);
    // Quality gate: never save thinking process into history
    if (
      artiStr.toLowerCase().includes('thinking process') ||
      artiStr.toLowerCase().includes('analyze user input')
    ) {
      return null;
    }

    const sanitizedArti = stripTemplateContamination(artiStr);

    // If dual-payload savedContent or wrapper is passed, unwrap to target
    const targetItem = item.savedContent || item;

    // Strict rule: if sourceType === 'song', ensure focusPhrase is used as teks_asli and <= 5 words
    let cleanText = '';
    if (targetItem.sourceType === 'song' && targetItem.focusPhrase) {
      const words = String(targetItem.focusPhrase).trim().split(/\s+/).filter(Boolean);
      cleanText = words.slice(0, 5).join(' ');
    } else {
      const rawText = targetItem.teks_asli || targetItem.word || targetItem.query || targetItem.text || fallbackText || '';
      if (!rawText) return null;
      cleanText = String(rawText).trim();
    }
    if (!cleanText) return null;

    const history = getVocabHistory();
    const cleanLower = cleanText.toLowerCase();
    const existingIndex = history.findIndex((h) => {
      if (!h) return false;
      const hText = String(h.teks_asli || h.word || '').trim().toLowerCase();
      return hText === cleanLower;
    });

    const newItem = {
      id: targetItem.id || `vocab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      teks_asli: cleanText,
      arti: sanitizedArti,
      cara_baca: targetItem.cara_baca || '',
      penggunaan: targetItem.penggunaan || (targetItem.originalExampleSentence ? [targetItem.originalExampleSentence] : []),
      catatan: targetItem.catatan || '',
      sourceType: targetItem.sourceType || 'standard',
      songMetadata: targetItem.songMetadata || (targetItem.sourceType === 'song' ? {
        title: targetItem.songTitle || null,
        artist: targetItem.artist || null,
        listenOn: targetItem.listenOn || ['Spotify', 'YouTube', 'Genius']
      } : null),
      timestamp: targetItem.timestamp || new Date().toISOString(),
      status: 'learning',
      reviewCount: 0,
      nextReviewDate: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      history.splice(existingIndex, 1);
    }

    history.unshift(newItem);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    // Dispatch global event for instant UI synchronization
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ranglish_history_changed', { detail: history }));
    }

    return newItem;
  } catch (err) {
    console.error('Error saving vocab item to localStorage:', err);
    return null;
  }
};

export const deleteVocabItem = (id) => {
  try {
    const history = getVocabHistory();
    const updated = history.filter((h) => h.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting vocab item:', err);
    return [];
  }
};

export const clearVocabHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error('Error clearing history:', err);
  }
};
