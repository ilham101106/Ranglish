// Web Speech API Wrapper for Audio Pronunciation (TTS)

export const isSpeechSupported = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

let currentUtterance = null;

export const speakText = (text, options = {}) => {
  if (!isSpeechSupported()) {
    console.warn('Web Speech API is not supported in this browser.');
    if (options.onError) options.onError('Speech API not supported');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang || 'en-US';
  utterance.rate = options.rate || 0.9; // Slightly slower for clarity
  utterance.pitch = options.pitch || 1.0;

  // Try to find natural sounding English voice
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const preferredVoice = voices.find(
      (v) => (v.lang.includes('en-US') || v.lang.includes('en-GB')) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  }

  if (options.onStart) {
    utterance.onstart = options.onStart;
  }

  if (options.onEnd) {
    utterance.onend = options.onEnd;
  }

  if (options.onError) {
    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      options.onError(e);
    };
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeech = () => {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};
