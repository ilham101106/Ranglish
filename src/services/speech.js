// Robust Dual-Engine Audio Pronunciation Service for Ranglish
// 1. Tier 1 (Primary): Native Cloud Audio Stream (Google TTS MP3) - Crystal-clear studio native US English, 100% reliable on all OS
// 2. Tier 2 (Fallback): Web Speech API (speechSynthesis) with Chromium Windows GC & cancel bug workarounds

let currentAudio = null;
let currentUtterance = null;

/**
 * Check if audio speech or synthesis is supported in the current browser
 */
export const isSpeechSupported = () => {
  return typeof window !== 'undefined' && (typeof Audio !== 'undefined' || 'speechSynthesis' in window);
};

/**
 * Stop any ongoing audio playback or speech synthesis
 */
export const stopSpeech = () => {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
    currentUtterance = null;
    if (window._activeUtterance) {
      window._activeUtterance = null;
    }
  }
};

/**
 * Fallback Web Speech API with Chrome/Edge bug workarounds
 */
function speakWithWebSpeech(cleanText, options = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[Ranglish Speech] Web Speech API is not supported in this browser.');
    if (options.onError) options.onError('Speech API not supported');
    if (options.onEnd) options.onEnd();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice =
          voices.find(
            (v) =>
              (v.lang.includes('en-US') || v.lang.includes('en-GB')) &&
              (v.name.includes('Natural') ||
                v.name.includes('Google') ||
                v.name.includes('Samantha') ||
                v.name.includes('Karen') ||
                v.name.includes('Jenny') ||
                v.name.includes('David'))
          ) || voices.find((v) => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onstart = () => {
        if (options.onStart) options.onStart();
      };

      utterance.onend = () => {
        currentUtterance = null;
        if (window._activeUtterance) window._activeUtterance = null;
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        console.error('[Ranglish Speech] SpeechSynthesis error:', e);
        currentUtterance = null;
        if (window._activeUtterance) window._activeUtterance = null;
        if (options.onError) options.onError(e);
        if (options.onEnd) options.onEnd();
      };

      // Guard against Chrome garbage-collection bug
      currentUtterance = utterance;
      if (typeof window !== 'undefined') {
        window._activeUtterance = utterance;
      }

      window.speechSynthesis.speak(utterance);
    }, 15);

    return true;
  } catch (err) {
    console.error('[Ranglish Speech] Failed to speak with Web Speech API:', err);
    if (options.onError) options.onError(err);
    if (options.onEnd) options.onEnd();
    return false;
  }
}

/**
 * Play text pronunciation using Dual-Engine approach
 */
export const speakText = (text, options = {}) => {
  if (!text || typeof text !== 'string') {
    if (options.onEnd) options.onEnd();
    return false;
  }

  // Strip non-pronounceable brackets or noise
  const cleanText = text
    .replace(/[\[\]\(\)\{\}\/\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    if (options.onEnd) options.onEnd();
    return false;
  }

  // Always cancel previous speech/audio before starting a new one
  stopSpeech();

  const rate = options.rate || 1.0;

  // Tier 1: If text is reasonably short (<= 180 chars), use high-fidelity Cloud Native Audio
  if (cleanText.length <= 180) {
    try {
      const audioUrl = `/api/tts?q=${encodeURIComponent(cleanText)}`;

      const audio = new Audio(audioUrl);
      currentAudio = audio;
      audio.playbackRate = rate;

      let hasStarted = false;

      audio.onplay = () => {
        hasStarted = true;
        if (options.onStart) options.onStart();
      };

      audio.onended = () => {
        currentAudio = null;
        if (options.onEnd) options.onEnd();
      };

      audio.onerror = (err) => {
        console.warn('[Ranglish Speech] Cloud audio stream error, falling back to Web Speech API...', err);
        currentAudio = null;
        speakWithWebSpeech(cleanText, options);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!hasStarted && options.onStart) {
              options.onStart();
            }
          })
          .catch((playErr) => {
            console.warn('[Ranglish Speech] audio.play() blocked or failed, falling back to Web Speech API...', playErr);
            currentAudio = null;
            speakWithWebSpeech(cleanText, options);
          });
      }

      return true;
    } catch (err) {
      console.warn('[Ranglish Speech] Error initializing HTML5 Audio, falling back to Web Speech API...', err);
      return speakWithWebSpeech(cleanText, options);
    }
  }

  // Tier 2: For very long sentences, use Web Speech API directly
  return speakWithWebSpeech(cleanText, options);
};
