import React, { useState } from "react";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";

export default function WordBreakdownGrid({
  breakdown = [],
  isLoading = false,
  onGenerate,
  hasGenerated = false,
}) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      id="word-breakdown-section"
      className="theme-bg-card border theme-border rounded-[22px] p-5 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_6px_20px_-3px_rgba(88,66,245,0.16),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.12),0_10px_28px_-4px_rgba(88,66,245,0.24),inset_0_1px_0_rgba(255,255,255,0.18)] hover:border-[#5842f5]/40 transition-all duration-300 scroll-mt-6 relative overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🔤</span>
          <h3 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider theme-text-main">
            Arti Per Kata / Frasa
          </h3>
        </div>
        {hasGenerated && (
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading}
            className="text-[11px] font-bold text-[#5842f5] hover:underline flex items-center gap-1 disabled:opacity-50 cursor-pointer"
            title="Bedah ulang kalimat ini"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
            <span>Ulang</span>
          </button>
        )}
      </div>

      {!hasGenerated ? (
        <div className="space-y-3">
          <p className="text-xs sm:text-[12.5px] leading-relaxed theme-text-muted">
            Pecah kalimat ini menjadi unit-unit makna yang gampang dipahami secara interaktif.
          </p>
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#5842f5] hover:bg-[#4338ca] text-white font-extrabold text-xs sm:text-[13px] transition flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Membedah Kalimat...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Bedah Arti Per Kata</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[11px] font-medium theme-text-muted">
            💡 <em>Klik kartu untuk membalik (flip 3D) dan melihat artinya!</em>
          </p>

          {breakdown.length === 0 ? (
            <p className="text-xs theme-text-muted italic text-center py-4">
              Tidak ada kata yang berhasil dibedah.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {breakdown.map((item, idx) => {
                const isFlipped = !!flippedCards[idx];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleFlip(idx)}
                    className="relative cursor-pointer h-24 select-none"
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
                        className="absolute inset-0 theme-bg-subtle border theme-border hover:border-[#5842f5]/50 rounded-[16px] p-2.5 flex flex-col justify-between shadow-2xs transition"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-extrabold text-[#5842f5] tracking-wider uppercase">
                            Unit {idx + 1}
                          </span>
                          <span className="text-[9.5px] theme-text-faint font-medium">3D Flip ↻</span>
                        </div>
                        <p className="font-extrabold text-[13px] sm:text-[13.5px] theme-text-main leading-snug line-clamp-2">
                          {item.phrase}
                        </p>
                        <span className="text-[10px] text-[#5842f5] font-semibold flex items-center gap-1">
                          Lihat arti &rarr;
                        </span>
                      </div>

                      {/* Back Side: Indonesian Translation */}
                      <div
                        className="absolute inset-0 bg-[#5842f5]/10 dark:bg-[#5842f5]/15 border border-[#5842f5]/40 rounded-[16px] p-2.5 flex flex-col justify-between shadow-sm"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-extrabold text-amber-500 tracking-wider uppercase">
                            Arti
                          </span>
                          <span className="text-[9.5px] text-amber-500 font-medium">✓</span>
                        </div>
                        <p className="font-extrabold text-[12px] sm:text-[12.5px] text-[#4338ca] dark:text-[#c9c2ff] leading-snug line-clamp-2">
                          {item.arti}
                        </p>
                        <span className="text-[10px] theme-text-muted font-semibold">
                          Balik lagi &larr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
