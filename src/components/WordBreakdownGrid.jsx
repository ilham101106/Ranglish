import React, { useState } from "react";
import { Sparkles, Loader2, RefreshCw, BookOpen, RotateCw, ArrowRight, ArrowLeft, Check } from "lucide-react";

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
      className="theme-bg-card border theme-border rounded-[22px] p-5 sm:p-6 space-y-4 theme-card-shadow transition-all duration-300 scroll-mt-6"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#5842f5]" />
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
          <p className="text-xs sm:text-[13px] leading-relaxed theme-text-muted">
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
          <p className="text-[11.5px] font-medium theme-text-muted">
            💡 <em>Klik kartu untuk membalik (flip 3D) dan melihat artinya!</em>
          </p>

          {breakdown.length === 0 ? (
            <p className="text-xs theme-text-muted italic text-center py-4">
              Tidak ada kata yang berhasil dibedah.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {breakdown.map((item, idx) => {
                const isFlipped = !!flippedCards[idx];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleFlip(idx)}
                    className="relative cursor-pointer h-28 select-none"
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
                        className="absolute inset-0 theme-bg-subtle border theme-border hover:border-[#5842f5]/50 rounded-[18px] p-3.5 flex flex-col justify-between shadow-2xs transition"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-[#5842f5] tracking-wider uppercase">
                            Unit {idx + 1}
                          </span>
                          <span className="text-[10px] theme-text-faint font-medium flex items-center gap-1">
                            3D Flip <RotateCw className="w-2.5 h-2.5 stroke-[2.5]" />
                          </span>
                        </div>
                        <p className="font-extrabold text-[14px] sm:text-[15px] theme-text-main leading-snug line-clamp-2">
                          {item.phrase}
                        </p>
                        <span className="text-[10.5px] text-[#5842f5] font-semibold flex items-center gap-1">
                          Lihat arti <ArrowRight className="w-3.5 h-3.5 stroke-[2.75]" />
                        </span>
                      </div>

                      {/* Back Side: Indonesian Translation */}
                      <div
                        className="absolute inset-0 bg-[#5842f5]/10 dark:bg-[#5842f5]/15 border border-[#5842f5]/40 rounded-[18px] p-3.5 flex flex-col justify-between shadow-sm"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-amber-500 tracking-wider uppercase">
                            Arti
                          </span>
                          <Check className="w-3 h-3 text-amber-500 stroke-[3]" />
                        </div>
                        <p className="font-extrabold text-[13px] sm:text-[14px] text-[#4338ca] dark:text-[#c9c2ff] leading-snug line-clamp-2">
                          {item.arti}
                        </p>
                        <span className="text-[10.5px] theme-text-muted font-semibold flex items-center gap-1">
                          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.75]" /> Balik lagi
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
