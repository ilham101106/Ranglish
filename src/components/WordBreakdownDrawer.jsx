import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, Loader2, RefreshCw, Volume2, VolumeX, Eye, EyeOff, BookOpen, RotateCw, ArrowRight } from "lucide-react";
import { speakText, stopSpeech } from "../services/speech";

export default function WordBreakdownDrawer({
  isOpen = false,
  onClose,
  sentence = "",
  breakdown = [],
  isLoading = false,
  onRegenerate,
}) {
  const [flippedCards, setFlippedCards] = useState({});
  const [playingIndex, setPlayingIndex] = useState(null);
  const [allFlipped, setAllFlipped] = useState(false);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
      setPlayingIndex(null);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      stopSpeech();
    };
  }, [isOpen, onClose]);

  // Reset flip states when breakdown changes
  useEffect(() => {
    setFlippedCards({});
    setAllFlipped(false);
  }, [breakdown]);

  if (!isOpen || typeof document === "undefined") return null;

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleFlipAll = () => {
    const nextState = !allFlipped;
    setAllFlipped(nextState);
    const newFlipped = {};
    breakdown.forEach((_, idx) => {
      newFlipped[idx] = nextState;
    });
    setFlippedCards(newFlipped);
  };

  const handleSpeak = (e, phraseText, idx) => {
    e.stopPropagation();
    if (playingIndex === idx) {
      stopSpeech();
      setPlayingIndex(null);
      return;
    }

    stopSpeech();
    setPlayingIndex(idx);
    speakText(phraseText, {
      rate: 0.88,
      onEnd: () => setPlayingIndex(null),
      onError: () => setPlayingIndex(null),
    });
  };

  const drawerContent = (
    <div className="fixed inset-0 z-[9999] overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel: Flush right, zero gaps */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[560px] theme-bg-card border-l theme-border shadow-2xl flex flex-col animate-slide-in-right h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b theme-border-subtle flex items-start justify-between gap-3 bg-[#5842f5]/5">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#5842f5]/15 text-[#5842f5] border border-[#5842f5]/30 flex items-center justify-center font-bold text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-[#5842f5]" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold theme-text-main flex items-center gap-2">
                    Arti Per Kata / Frasa
                    {breakdown.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-[#5842f5]/15 text-[#5842f5] border border-[#5842f5]/30">
                        {breakdown.length} Unit
                      </span>
                    )}
                  </h2>
                </div>
              </div>

              {sentence && (
                <p className="text-[11px] theme-text-muted italic line-clamp-1 pt-0.5">
                  "{sentence}"
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {breakdown.length > 0 && !isLoading && (
                <>
                  <button
                    type="button"
                    onClick={toggleFlipAll}
                    className="px-2.5 py-1.5 rounded-xl border theme-border theme-bg-subtle text-xs font-bold theme-text-muted hover:theme-text-main flex items-center gap-1.5 transition cursor-pointer"
                    title={allFlipped ? "Tutup Semua Kartu" : "Buka Semua Arti"}
                  >
                    {allFlipped ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Tutup Semua</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#5842f5]" />
                        <span className="hidden sm:inline">Balik Semua</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onRegenerate}
                    disabled={isLoading}
                    className="px-2.5 py-1.5 rounded-xl border border-[#5842f5]/30 bg-[#5842f5]/10 text-xs font-bold text-[#5842f5] hover:bg-[#5842f5]/20 flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                    title="Bedah ulang kalimat ini"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                    <span className="hidden sm:inline">Ulang</span>
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-theme-muted hover:theme-text-main hover:bg-[#5842f5]/10 transition cursor-pointer"
                aria-label="Tutup panel bedah kata"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader / Tip */}
          <div className="px-4 py-2 bg-[#5842f5]/5 border-b theme-border-subtle flex items-center justify-between text-[11px] font-medium theme-text-muted">
            <span>💡 <em>Klik kartu untuk membalik (flip 3D) dan melihat artinya!</em></span>
            <span className="text-[10px] theme-text-faint hidden sm:inline">Tekan Esc untuk tutup</span>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {isLoading ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-3 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#5842f5]/15 text-[#5842f5] flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm theme-text-main">
                    Membedah Kalimat Menjadi Unit Makna...
                  </h3>
                  <p className="text-xs theme-text-muted">
                    Menghubungkan frasa, idiom, dan makna kontekstual...
                  </p>
                </div>
              </div>
            ) : breakdown.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-3 text-center">
                <p className="text-sm theme-text-muted">
                  Belum ada unit kata yang dibedah.
                </p>
                <button
                  type="button"
                  onClick={onRegenerate}
                  className="px-4 py-2 rounded-xl bg-[#5842f5] text-white font-extrabold text-xs shadow-md"
                >
                  Bedah Sekarang
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {breakdown.map((item, idx) => {
                  const isFlipped = !!flippedCards[idx];
                  const isSpeaking = playingIndex === idx;

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleFlip(idx)}
                      className="relative cursor-pointer h-[112px] select-none"
                      style={{ perspective: "1000px" }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleFlip(idx);
                        }
                      }}
                      aria-label={`Kartu ${item.phrase}, klik untuk melihat arti`}
                    >
                      <div
                        className="w-full h-full relative"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        {/* Front Side: English Phrase */}
                        <div
                          className="absolute inset-0 theme-bg-subtle border theme-border hover:border-[#5842f5]/50 rounded-[16px] p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-200"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9.5px] font-extrabold text-[#5842f5] tracking-wider uppercase">
                              Unit {idx + 1}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={(e) => handleSpeak(e, item.phrase, idx)}
                                className="p-1 rounded-lg hover:bg-[#5842f5]/15 text-theme-muted hover:text-[#5842f5] transition"
                                title="Dengarkan pelafalan unit kata ini"
                              >
                                {isSpeaking ? (
                                  <VolumeX className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <span className="text-[9.5px] theme-text-faint font-medium flex items-center gap-1">
                                3D Flip <RotateCw className="w-2.5 h-2.5 stroke-[2.5]" />
                              </span>
                            </div>
                          </div>

                          <p className="font-extrabold text-[14px] sm:text-[15px] theme-text-main leading-snug line-clamp-2">
                            {item.phrase}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#5842f5] font-bold flex items-center gap-1">
                              Lihat arti <ArrowRight className="w-3.5 h-3.5 stroke-[2.75] group-hover:translate-x-0.5 transition-transform" />
                            </span>
                            <span className="text-[9px] theme-text-faint">Klik kartu</span>
                          </div>
                        </div>

                        {/* Back Side: Indonesian Translation */}
                        <div
                          className="absolute inset-0 bg-[#5842f5]/10 dark:bg-[#5842f5]/20 border border-[#5842f5]/50 rounded-[16px] p-3 sm:p-3.5 flex flex-col justify-between shadow-md"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9.5px] font-extrabold text-amber-500 tracking-wider uppercase">
                              Arti Unit {idx + 1}
                            </span>
                            <span className="text-[9.5px] text-amber-500 font-bold">✓</span>
                          </div>

                          <p className="font-extrabold text-[13px] sm:text-[13.5px] text-[#4338ca] dark:text-[#c9c2ff] leading-snug line-clamp-2">
                            {item.arti}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-[10px] theme-text-muted font-bold flex items-center gap-1">
                              &larr; Balik lagi
                            </span>
                            <span className="text-[9px] text-[#5842f5]/70">English</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 sm:p-4 border-t theme-border-subtle bg-theme-subtle flex items-center justify-between">
            <span className="text-[11px] theme-text-muted">
              {breakdown.length > 0
                ? `Total ${breakdown.length} unit makna terbedah.`
                : "Klik bedah untuk memproses."}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-extrabold bg-[#5842f5] hover:bg-[#4338ca] text-white transition shadow-md shadow-indigo-500/20 active:scale-[0.98] cursor-pointer"
            >
              Selesai / Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
