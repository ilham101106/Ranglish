import React, { createContext, useContext, useState } from 'react';

const VocabSearchContext = createContext(null);

export function VocabSearchProvider({ children }) {
  const [inputText, setInputText] = useState('hug me');
  const [searchedWord, setSearchedWord] = useState('hug me');
  const [result, setResult] = useState(null);
  const [audioSpeed, setAudioSpeed] = useState('normal'); // 'normal' (1.0x) or 'slow' (0.75x)

  return (
    <VocabSearchContext.Provider
      value={{
        inputText,
        setInputText,
        searchedWord,
        setSearchedWord,
        result,
        setResult,
        audioSpeed,
        setAudioSpeed,
      }}
    >
      {children}
    </VocabSearchContext.Provider>
  );
}

export function useVocabSearch() {
  const context = useContext(VocabSearchContext);
  if (!context) {
    throw new Error('useVocabSearch must be used within a VocabSearchProvider');
  }
  return context;
}
