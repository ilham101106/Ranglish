import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import VocabLookup from "./components/VocabLookup";
import HistoryList from "./components/HistoryList";
import SettingsModal from "./components/SettingsModal";
import PhasePreview from "./components/PhasePreview";
import { getVocabHistory } from "./services/storage";
import { VocabSearchProvider } from "./context/VocabSearchContext";

export default function App() {
  const [activeTab, setActiveTab] = useState("vocab");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  const refreshHistoryCount = () => {
    const history = getVocabHistory();
    setHistoryCount(history.length);
  };

  useEffect(() => {
    refreshHistoryCount();

    const handleUpdate = () => {
      refreshHistoryCount();
    };

    window.addEventListener("ranglish_history_changed", handleUpdate);
    return () =>
      window.removeEventListener("ranglish_history_changed", handleUpdate);
  }, []);

  const handleSelectVocabFromHistory = (item) => {
    if (!item) return;
    const targetWord = item.teks_asli || item.word || "";
    try {
      localStorage.setItem(
        "ranglish_last_search",
        JSON.stringify({
          inputText: targetWord,
          searchedWord: targetWord,
          result: item,
        })
      );
    } catch (e) {
      console.error("Error saving selected vocab to last search:", e);
    }
    setActiveTab("vocab");
  };

  return (
    <VocabSearchProvider>
      <div className="min-h-screen theme-bg-app theme-text-main flex flex-col lg:grid lg:grid-cols-[240px_1fr] antialiased transition-colors">
        {/* Desktop Sidebar (visible on lg+ screens) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          historyCount={historyCount}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Mobile Top Header (visible only on mobile) */}
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 max-w-[1140px] w-full mx-auto px-4 py-6 sm:px-8 lg:px-12 lg:py-8 pb-28 lg:pb-16 overflow-y-auto">
          {activeTab === "vocab" && (
            <VocabLookup onHistoryUpdated={refreshHistoryCount} />
          )}

          {activeTab === "riwayat" && (
            <HistoryList
              onHistoryChanged={refreshHistoryCount}
              onSelectVocab={handleSelectVocabFromHistory}
            />
          )}

          {activeTab === "writing" && (
            <PhasePreview
              title="Writing Checker (Anak Rantau Persona)"
              phase="Fase 3"
              description="Koreksi grammar & gaya penulisan bahasa Inggris dari tulisan/paragraf kamu dengan penjelasan santai & blak-blakan ala teman dekat."
              features={[
                "AI mengecek grammar, pilihan kata (word choice), dan naturalness.",
                'Penjelasan menggunakan bahasa santai + filler words ("sih", "gitu", "anjir", "wkwk").',
                "Koreksi tulisan tetap dalam Bahasa Inggris, penjelasan dalam Bahasa Indonesia santai.",
              ]}
            />
          )}

          {activeTab === "chat" && (
            <PhasePreview
              title="Chat AI Practice (Anak Rantau)"
              phase="Fase 4"
              description="Ngobrol santai langsung dengan AI native speaker yang paham kultur Indonesia untuk melatih percakapan sehari-hari."
              features={[
                "Simulasi percakapan real-time dengan feedback instan.",
                "Topik obrolan seputar kehidupan kuliah/kerja di luar negeri.",
                "Tips pelafalan dan pilihan kata yang lebih natural.",
              ]}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation (visible only on mobile) */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          historyCount={historyCount}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onSaveSuccess={() => {
            refreshHistoryCount();
          }}
        />
      </div>
    </VocabSearchProvider>
  );
}
