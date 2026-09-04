const SETTINGS_KEY = 'ranglish_settings';
const HISTORY_KEY = 'ranglish_vocab_history';
const VOCAB_BANK_KEY = 'ranglish_ai_vocab_bank';

export const DEFAULT_MODELS = [
  { id: 'openrouter/free', name: 'OpenRouter Free Auto-Router (Rekomendasi Utama)' },
  { id: 'google/gemma-2-9b-it:free', name: 'Google Gemma 2 9B (Free)' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Meta Llama 3.3 70B (Free)' },
  { id: 'qwen/qwen-2.5-72b-instruct:free', name: 'Qwen 2.5 72B (Free)' },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B (Free)' },
];

export const getSettings = () => {
  const envModel = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENROUTER_MODEL) || DEFAULT_MODELS[0].id;

  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      let model = parsed.model || envModel;
      
      // Auto-migrate any broken or outdated model names to openrouter/free
      if (
        model.includes('3.2-3b') ||
        model.includes('3.1-8b') ||
        model.includes('gemini-2.0-flash-lite') ||
        model.includes('minimax') ||
        model.includes('nemotron')
      ) {
        model = 'openrouter/free';
      }

      const theme = parsed.theme || 'standar';

      return {
        // API key kini sepenuhnya dikelola di server melalui serverless proxy /api/lookup
        apiKey: null,
        model: model || 'openrouter/free',
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
  try {
    const data = localStorage.getItem(VOCAB_BANK_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      let hasChanges = false;
      const cleanBank = {};

      Object.keys(parsed).forEach((k) => {
        const item = parsed[k];
        const isCorrupt =
          !item ||
          !item.arti ||
          item.arti.toLowerCase().includes('thinking process') ||
          item.arti.toLowerCase().includes('analyze user input') ||
          item.arti.toLowerCase().includes('makna & pemakaian kata') ||
          (item.catatan && item.catatan.toLowerCase().includes('thinking process'));

        if (!isCorrupt) {
          cleanBank[k.toLowerCase()] = item;
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
    if (!word || !vocabData || !vocabData.arti) return;
    
    // Strict quality gate: never save corrupt or thinking-process data
    const isCorrupt =
      vocabData.arti.toLowerCase().includes('thinking process') ||
      vocabData.arti.toLowerCase().includes('analyze user input') ||
      vocabData.arti.toLowerCase().includes('makna & pemakaian kata') ||
      (vocabData.catatan && vocabData.catatan.toLowerCase().includes('thinking process'));

    if (isCorrupt) return;

    const cleanWord = word.toLowerCase().trim();
    const currentBank = getLearnedVocabBank();

    currentBank[cleanWord] = {
      arti: vocabData.arti,
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
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Filter out any corrupt past items
      const cleanHistory = parsed.filter(
        (h) =>
          h &&
          h.arti &&
          !h.arti.toLowerCase().includes('thinking process') &&
          !h.arti.toLowerCase().includes('analyze user input')
      );
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
      arti: targetItem.arti || targetItem.focusPhraseMeaning || '',
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
