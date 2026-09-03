import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Volume2,
  VolumeX,
  BookOpen,
  FileText,
  Lightbulb,
  Check,
  Copy,
  ExternalLink,
  Music,
} from "lucide-react";
import { speakText, stopSpeech } from "../services/speech";
import { classifyText } from "../utils/textClassifier";

export default function VocabDetailModal({ isOpen, vocab, onClose, onOpenInVocab }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingExampleIndex, setPlayingExampleIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedFull, setCopiedFull] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    stopSpeech();
    setIsAudioPlaying(false);
    setPlayingExampleIndex(null);
    onClose();
  };

  if (!isOpen || !vocab) return null;

  const classification = classifyText(vocab.teks_asli || "");

  const handleSpeech = () => {
    if (isAudioPlaying) {
      stopSpeech();
      setIsAudioPlaying(false);
      return;
    }
    stopSpeech();
    setIsAudioPlaying(true);
    speakText(vocab.teks_asli, {
      rate: 0.95,
      onEnd: () => setIsAudioPlaying(false),
      onError: () => setIsAudioPlaying(false),
    });
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
    speakText(sentenceText, {
      rate: 0.95,
      onEnd: () => setPlayingExampleIndex(null),
      onError: () => setPlayingExampleIndex(null),
    });
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyFull = () => {
    const textToCopy = `📖 *${vocab.teks_asli}* ${vocab.cara_baca ? `(${vocab.cara_baca})` : ""}\n\n*Arti:* ${vocab.arti}\n\n*Catatan:* ${vocab.catatan || "-"}\n\n— Dipelajari di Ranglish`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  // Helper to parse English and Indonesian lines in examples (safe for objects or strings)
  const parseExample = (exampleStr) => {
    if (!exampleStr) return { en: "", id: "" };
    if (typeof exampleStr === "object") {
      return {
        en: String(exampleStr.en || exampleStr.sentence || exampleStr.text || "").trim(),
        id: String(exampleStr.id || exampleStr.arti || exampleStr.translation || "").trim(),
      };
    }
    if (typeof exampleStr !== "string") return { en: String(exampleStr), id: "" };
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

    const indoWordRegex = /\b(bro|tadi|kita|nonton|konser|kembang|apinya|gede|banget|nggak|ngga|beneran|kalo|kalau|udah|sudah|bisa|ini|itu|ada|yang|dari|pada|sama|dan|atau|cuma|hanya|aja|saja|lu|gw|gue|kamu|aku)\b/i;
    if (en.includes("—") || en.includes(" - ")) {
      const segments = en.split(/—|\s-\s/);
      if (indoWordRegex.test(segments[0]) && segments.length >= 2) {
        en = segments.slice(1).join(" — ").trim();
      }
    }

    if (en.length > 0) {
      en = en.charAt(0).toUpperCase() + en.slice(1);
    }

    return { en, id };
  };

  const modalNode = (
    <div
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-vocab-title"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] theme-bg-card border theme-border p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b theme-border-subtle">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${classification.color} flex items-center gap-1.5 shadow-2xs`}
            >
              <span>{classification.icon}</span>
              <span>{classification.label}</span>
            </span>
            <span className="text-xs theme-text-muted font-bold">
              Detail Kosakata Riwayat
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenInVocab && (
              <button
                type="button"
                onClick={() => onOpenInVocab(vocab)}
                className="p-2 px-3 rounded-xl bg-[#5842f5]/15 hover:bg-[#5842f5]/25 border border-[#5842f5]/30 text-xs font-bold text-[#5842f5] flex items-center gap-1.5 transition shadow-2xs"
                title="Buka dan pelajari di tab Vocab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Buka di Vocab</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyFull}
              className="p-2 rounded-xl border theme-border hover:theme-border-main text-xs font-semibold theme-text-muted hover:theme-text-main flex items-center gap-1.5 transition"
              title="Salin Rangkuman Kosakata"
            >
              {copiedFull ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-9 h-9 rounded-xl border theme-border hover:theme-border-main flex items-center justify-center theme-text-muted hover:theme-text-main transition bg-transparent"
              aria-label="Tutup Detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Word Title & Audio Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h2
              id="modal-vocab-title"
              className="text-2xl sm:text-3xl font-extrabold theme-text-main tracking-tight leading-tight"
            >
              {vocab.teks_asli}
            </h2>

            {vocab.cara_baca && (
              <div className="inline-block">
                <span className="text-xs sm:text-[13px] text-[#4338ca] dark:text-[#c9c2ff] bg-[#5842f5]/10 border border-[#5842f5]/25 px-3 py-1 rounded-full font-medium">
                  🗣️ {vocab.cara_baca}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSpeech}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-extrabold transition duration-150 shrink-0 shadow-sm ${
              isAudioPlaying
                ? "bg-amber-500 text-white shadow-amber-500/25"
                : "bg-[#5842f5] hover:bg-[#4338ca] text-white shadow-indigo-500/20 active:scale-[0.98]"
            }`}
          >
            {isAudioPlaying ? (
              <>
                <VolumeX className="w-4 h-4 animate-bounce" />
                <span>Memutar...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Dengar Audio</span>
              </>
            )}
          </button>
        </div>

        {/* Song Metadata Banner (if song) */}
        {vocab.songMetadata && (
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#5842f5]">
              <Music className="w-4 h-4" />
              <span>
                Lagu: {vocab.songMetadata.title || "Lagu Favorit"}{" "}
                {vocab.songMetadata.artist ? `— ${vocab.songMetadata.artist}` : ""}
              </span>
            </div>
            {vocab.songMetadata.listenOn && vocab.songMetadata.listenOn.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] font-semibold theme-text-muted">
                  Dengarkan di:
                </span>
                {vocab.songMetadata.listenOn.map((platform, pIdx) => (
                  <a
                    key={pIdx}
                    href={
                      platform === "Spotify"
                        ? `https://open.spotify.com/search/${encodeURIComponent(
                            (vocab.songMetadata.title || vocab.teks_asli) +
                              " " +
                              (vocab.songMetadata.artist || "")
                          )}`
                        : platform === "YouTube"
                        ? `https://www.youtube.com/results?search_query=${encodeURIComponent(
                            (vocab.songMetadata.title || vocab.teks_asli) +
                              " " +
                              (vocab.songMetadata.artist || "")
                          )}`
                        : `https://genius.com/search?q=${encodeURIComponent(
                            (vocab.songMetadata.title || vocab.teks_asli) +
                              " " +
                              (vocab.songMetadata.artist || "")
                          )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border theme-border theme-bg-card hover:border-[#5842f5] theme-text-main transition shadow-2xs"
                  >
                    <span>{platform}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 1: ARTI BAHASA INDONESIA */}
        <div className="space-y-2 pt-2 border-t theme-border-subtle">
          <div className="text-[11px] font-extrabold tracking-wider theme-text-muted uppercase flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#5842f5]" />
            <span>📖 ARTI BAHASA INDONESIA</span>
          </div>
          <p className="text-sm sm:text-base leading-[1.7] theme-text-main font-medium">
            {vocab.arti}
          </p>
        </div>

        {/* SECTION 2: CONTOH PENGGUNAAN (CONTEXT) */}
        {vocab.penggunaan && vocab.penggunaan.length > 0 && (
          <div className="space-y-3 pt-2 border-t theme-border-subtle">
            <div className="text-[11px] font-extrabold tracking-wider theme-text-muted uppercase flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>📄 CONTOH PENGGUNAAN (CONTEXT)</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {vocab.penggunaan.map((ex, i) => {
                const parsed = parseExample(ex);
                const isCopied = copiedIndex === i;
                const isSpeakingThis = playingExampleIndex === i;

                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 theme-bg-subtle border theme-border rounded-[16px] p-3.5 transition shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#5842f5]/15 text-[#5842f5] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 border border-[#5842f5]/25">
                      {i + 1}
                    </div>

                    <div className="flex-1 text-[13.5px] leading-relaxed">
                      <div className="theme-text-main font-bold">
                        {parsed.en}
                      </div>
                      {parsed.id && (
                        <div className="theme-text-muted text-xs sm:text-[13px] mt-0.5 font-normal">
                          {parsed.id}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSpeakExample(parsed.en, i)}
                        className={`w-9 h-9 rounded-xl border transition flex items-center justify-center shadow-2xs ${
                          isSpeakingThis
                            ? "bg-amber-500 text-white border-amber-500 font-bold shadow-md"
                            : "border theme-border theme-bg-card theme-text-muted hover:theme-text-main hover:border-[#5842f5]"
                        }`}
                        title="Dengarkan pelafalan kalimat ini"
                      >
                        {isSpeakingThis ? (
                          <VolumeX className="w-3.5 h-3.5 animate-bounce" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-[#5842f5]" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(parsed.en, i)}
                        className="w-9 h-9 rounded-xl border theme-border theme-bg-card theme-text-muted hover:theme-text-main hover:border-[#5842f5] flex items-center justify-center transition shadow-2xs"
                        title="Salin kalimat bahasa Inggris"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: CATATAN ANAK RANTAU */}
        {vocab.catatan && (
          <div className="tip-box p-5 space-y-2 rounded-2xl border theme-border relative overflow-hidden">
            <div className="flex items-center gap-2 text-[13px] font-extrabold">
              <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Catatan Anak Rantau</span>
            </div>
            <p className="text-xs sm:text-[13px] leading-[1.65] font-normal">
              {vocab.catatan}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalNode, document.body)
    : modalNode;
}
