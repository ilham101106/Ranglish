import React, { useState, useEffect } from "react";
import {
  History,
  Trash2,
  Volume2,
  VolumeX,
  Search,
  Calendar,
  BookOpen,
  Sparkles,
  AlertCircle,
  Check,
  Copy,
  Share2,
  Filter,
} from "lucide-react";
import {
  getVocabHistory,
  deleteVocabItem,
  clearVocabHistory,
} from "../services/storage";
import { speakText, stopSpeech } from "../services/speech";
import { classifyText } from "../utils/textClassifier";
import VocabDetailModal from "./VocabDetailModal";

export default function HistoryList({ onSelectVocab, onHistoryChanged }) {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playingId, setPlayingId] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState(null);

  const loadHistory = () => {
    setHistory(getVocabHistory());
  };

  useEffect(() => {
    loadHistory();

    const handleUpdate = () => {
      loadHistory();
    };

    window.addEventListener("ranglish_history_changed", handleUpdate);
    return () =>
      window.removeEventListener("ranglish_history_changed", handleUpdate);
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const updated = deleteVocabItem(id);
    setHistory(updated);
    if (onHistoryChanged) onHistoryChanged();
  };

  const handleClearAll = () => {
    if (window.confirm("Yakin mau menghapus semua riwayat kosakata?")) {
      clearVocabHistory();
      setHistory([]);
      if (onHistoryChanged) onHistoryChanged();
    }
  };

  const handleCopyAll = () => {
    if (history.length === 0) return;
    const formatted = history
      .map((item, idx) => {
        const cls = classifyText(item.teks_asli);
        return `${idx + 1}. [${cls.label}] ${item.teks_asli} ${item.cara_baca ? `(${item.cara_baca})` : ""} - ${item.arti}`;
      })
      .join("\n");

    navigator.clipboard.writeText(
      `📚 RIWAYAT BELAJAR RANGLISH (${history.length} Kosakata):\n\n${formatted}\n\n— Dipelajari via Ranglish (Anak Rantau Edition)`,
    );
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleSpeech = (e, item) => {
    e.stopPropagation();
    if (playingId === item.id) {
      stopSpeech();
      setPlayingId(null);
      return;
    }

    speakText(item.teks_asli, {
      lang: "en-US",
      onStart: () => setPlayingId(item.id),
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  // Compute category statistics
  const categoryCounts = {
    all: history.length,
    word: 0,
    phrase: 0,
    movie: 0,
    song: 0,
    sentence: 0,
  };

  history.forEach((item) => {
    const cls = classifyText(item.teks_asli);
    if (categoryCounts[cls.type] !== undefined) {
      categoryCounts[cls.type]++;
    }
  });

  const filteredHistory = history.filter((item) => {
    const cls = classifyText(item.teks_asli);
    const matchesCategory =
      selectedCategory === "all" || cls.type === selectedCategory;

    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.teks_asli.toLowerCase().includes(query) ||
      (item.arti && item.arti.toLowerCase().includes(query)) ||
      (item.catatan && item.catatan.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header & Controls */}
      <div className="theme-bg-card border theme-border rounded-[22px] p-6 theme-card-shadow space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#5842f5]/15 text-[#5842f5] border border-[#5842f5]/30">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg theme-text-main">Riwayat Pencarian Kosakata</h2>
              <p className="text-xs theme-text-muted">
                Tersimpan lokal di browser kamu ({history.length} entri dipelajari)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="text-xs font-bold text-[#5842f5] px-3 py-1.5 rounded-xl theme-bg-subtle hover:theme-bg-card border theme-border transition flex items-center gap-1.5 shadow-2xs"
                  title="Salin seluruh daftar riwayat"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-extrabold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#5842f5]" />
                      <span>Salin Semua</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-bold text-rose-600 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition flex items-center gap-1 shadow-2xs"
                  title="Hapus semua riwayat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hapus Semua</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search Bar inside History */}
        {history.length > 0 && (
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 theme-text-faint" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari dalam riwayat kata..."
              className="w-full pl-10 pr-4 py-2 rounded-xl theme-bg-input border theme-border theme-text-main text-xs sm:text-[13px] placeholder:theme-text-faint focus:outline-none focus:border-[#5842f5] transition"
            />
          </div>
        )}

        {/* Category Filter Pills */}
        {history.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t theme-border-subtle">
            <span className="text-[10.5px] font-bold theme-text-faint uppercase mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#5842f5]" /> Filter:
            </span>

            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`text-xs px-3 py-1 rounded-full transition font-extrabold flex items-center gap-1.5 shadow-2xs ${
                selectedCategory === 'all'
                  ? 'bg-[#5842f5] text-white shadow-sm'
                  : 'theme-bg-subtle theme-text-muted hover:theme-text-main'
              }`}
            >
              <span>Semua</span>
              <span className="text-[10px] opacity-80">({categoryCounts.all})</span>
            </button>

            {categoryCounts.word > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategory('word')}
                className={`text-xs px-3 py-1 rounded-full transition font-extrabold flex items-center gap-1.5 shadow-2xs ${
                  selectedCategory === 'word'
                    ? 'bg-[#5842f5] text-white shadow-sm'
                    : 'theme-bg-subtle theme-text-muted hover:theme-text-main'
                }`}
              >
                <span>📖 Kata</span>
                <span className="text-[10px] opacity-80">({categoryCounts.word})</span>
              </button>
            )}

            {categoryCounts.phrase > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategory('phrase')}
                className={`text-xs px-3 py-1 rounded-full transition font-extrabold flex items-center gap-1.5 shadow-2xs ${
                  selectedCategory === 'phrase'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'theme-bg-subtle theme-text-muted hover:theme-text-main'
                }`}
              >
                <span>💬 Frasa</span>
                <span className="text-[10px] opacity-80">({categoryCounts.phrase})</span>
              </button>
            )}

            {categoryCounts.movie > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategory('movie')}
                className={`text-xs px-3 py-1 rounded-full transition font-extrabold flex items-center gap-1.5 shadow-2xs ${
                  selectedCategory === 'movie'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'theme-bg-subtle theme-text-muted hover:theme-text-main'
                }`}
              >
                <span>🎬 Film</span>
                <span className="text-[10px] opacity-80">({categoryCounts.movie})</span>
              </button>
            )}

            {categoryCounts.song > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategory('song')}
                className={`text-xs px-3 py-1 rounded-full transition font-extrabold flex items-center gap-1.5 shadow-2xs ${
                  selectedCategory === 'song'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'theme-bg-subtle theme-text-muted hover:theme-text-main'
                }`}
              >
                <span>🎵 Lagu</span>
                <span className="text-[10px] opacity-80">({categoryCounts.song})</span>
              </button>
            )}

            {categoryCounts.sentence > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategory('sentence')}
                className={`text-xs px-3 py-1 rounded-full transition font-extrabold flex items-center gap-1.5 shadow-2xs ${
                  selectedCategory === 'sentence'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'theme-bg-subtle theme-text-muted hover:theme-text-main'
                }`}
              >
                <span>✨ Kalimat</span>
                <span className="text-[10px] opacity-80">({categoryCounts.sentence})</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="theme-bg-card border theme-border rounded-[22px] p-10 text-center space-y-3 theme-card-shadow">
          <div className="w-12 h-12 rounded-2xl theme-bg-subtle theme-text-faint mx-auto flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-[#5842f5]" />
          </div>
          <h3 className="font-extrabold text-base theme-text-main">
            {searchTerm ? 'Tidak ada kata yang cocok' : 'Belum Ada Riwayat Kosakata'}
          </h3>
          <p className="text-xs sm:text-[13px] theme-text-muted max-w-xs mx-auto font-medium">
            {searchTerm
              ? 'Coba gunakan kata kunci pencarian yang lain.'
              : 'Kosakata yang kamu cari di tab Vocab akan otomatis tersimpan di sini.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const classification = classifyText(item.teks_asli);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedVocab(item)}
                className="group theme-bg-card border theme-border hover:border-[#5842f5] hover:shadow-md rounded-[20px] p-5 transition duration-200 cursor-pointer relative theme-card-shadow active:scale-[0.99]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedVocab(item);
                  }
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${classification.color} flex items-center gap-1 shadow-2xs`}>
                        <span>{classification.icon}</span>
                        <span>{classification.label}</span>
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h4 className="font-extrabold text-base sm:text-lg theme-text-main group-hover:text-[#5842f5] transition">
                        {item.teks_asli}
                      </h4>
                      {item.cara_baca && (
                        <span className="text-[11px] font-medium text-[#5842f5] bg-[#5842f5]/10 px-2 py-0.5 rounded-md border border-[#5842f5]/25">
                          🗣️ {item.cara_baca}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-[13.5px] theme-text-main font-medium">
                      {item.arti}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleSpeech(e, item)}
                      className={`min-w-[40px] min-h-[40px] w-10 h-10 rounded-xl border transition shadow-2xs flex items-center justify-center ${
                        playingId === item.id
                          ? 'bg-amber-500 text-white border-amber-500 font-bold'
                          : 'theme-bg-subtle theme-border theme-text-muted hover:theme-text-main hover:border-[#5842f5]'
                      }`}
                      title="Dengarkan pengucapan"
                    >
                      {playingId === item.id ? (
                        <VolumeX className="w-4 h-4 animate-bounce" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#5842f5]" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, item.id)}
                      className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-xl theme-text-faint hover:text-rose-600 hover:bg-rose-500/10 transition flex items-center justify-center"
                      title="Hapus kata ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Timestamp & Catatan snippet */}
                <div className="mt-3 pt-2.5 border-t theme-border-subtle flex items-center justify-between text-[11px] theme-text-faint">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 theme-text-faint" />
                    {new Date(item.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {item.catatan ? (
                    <span className="truncate max-w-[240px] theme-text-muted italic">
                      "{item.catatan.substring(0, 45)}..."
                    </span>
                  ) : (
                    <span className="theme-text-faint opacity-80 group-hover:text-[#5842f5] font-semibold transition">
                      Klik untuk detail lengkap &rarr;
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Vocab Detail Modal */}
      <VocabDetailModal
        isOpen={!!selectedVocab}
        vocab={selectedVocab}
        onClose={() => setSelectedVocab(null)}
        onOpenInVocab={(item) => {
          setSelectedVocab(null);
          if (onSelectVocab) onSelectVocab(item);
        }}
      />
    </div>
  );
}
