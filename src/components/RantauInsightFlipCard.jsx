import React, { useState } from 'react';
import { Lightbulb, Sparkles, RotateCw, RotateCcw, Music, Film, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RantauInsightFlipCard({ tips, maknaFilosofis, isSong = false, isMovie = false }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const isMusicContent = isSong || /karya band|lirik|album|lagu|musisi/i.test(tips || "");
  const isMovieContent = isMovie || /dialog|film|quotes/i.test(tips || "");

  const displayTips = tips || "Tips pemakaian santai untuk kata ini dalam percakapan sehari-hari.";
  const displayMakna = maknaFilosofis || "Hmm, buat kata ini belum ada insight mendalam nih — tapi tenang, tips di depan udah cukup kok buat lu paham cara pakainya!";

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col [perspective:1000px]">
      <div
        onClick={handleCardClick}
        className={`grid grid-cols-1 grid-rows-1 relative w-full h-full flex-1 transition-transform duration-500 ease-out cursor-pointer select-none [transform-style:preserve-3d] min-h-[260px] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT FACE: Catatan Anak Rantau */}
        <div
          className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] tip-box p-5 sm:p-6 flex flex-col justify-between space-y-3 rounded-[22px] border theme-border theme-card-shadow overflow-hidden transition-all duration-300 ${
            isFlipped ? 'pointer-events-none' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-2 text-[13px] font-extrabold shrink-0">
            <div className="flex items-center gap-2">
              {isMusicContent ? (
                <>
                  <Music className="w-4 h-4 shrink-0 text-pink-500" />
                  <span className="text-pink-600 dark:text-pink-400">Konteks Musik &amp; Lagu</span>
                </>
              ) : isMovieContent ? (
                <>
                  <Film className="w-4 h-4 shrink-0 text-amber-500" />
                  <span className="text-amber-600 dark:text-amber-400">Konteks Film &amp; Dialog</span>
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
                  <span className="text-amber-600 dark:text-amber-400">Catatan Anak Rantau</span>
                </>
              )}
            </div>
            <div
              className="p-1 rounded-full text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition"
              title="Klik untuk membalik ke Makna Rasa"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 py-1">
            <p className="text-xs sm:text-[13px] leading-[1.8] font-normal theme-text-main whitespace-pre-line">
              {displayTips}
            </p>
          </div>

          <div className="pt-2.5 border-t border-amber-500/15 flex items-center justify-end text-[11px] font-bold shrink-0">
            <span className="text-[#5842f5] dark:text-[#a5b4fc] flex items-center gap-1 hover:underline">
              <span>Klik buat liat makna lebih dalam</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.75] group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* BACK FACE: Makna & Psikologi Rasa */}
        <div
          className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] p-5 sm:p-6 flex flex-col justify-between space-y-3 rounded-[22px] theme-bg-card border border-[#5842f5]/30 theme-card-shadow overflow-hidden transition-all duration-300 ${
            !isFlipped ? 'pointer-events-none' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-2 text-[13px] font-extrabold text-[#5842f5] dark:text-[#c7d2fe] shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-[#5842f5] dark:text-[#a5b4fc]" />
              <span>Makna & Psikologi Rasa</span>
            </div>
            <div
              className="p-1 rounded-full text-[#5842f5] dark:text-[#c7d2fe] hover:bg-[#5842f5]/10 transition"
              title="Klik untuk membalik ke Catatan Anak Rantau"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 py-1">
            <p className="text-xs sm:text-[13px] leading-[1.8] font-normal theme-text-main whitespace-pre-line">
              {displayMakna}
            </p>
          </div>

          <div className="pt-2.5 border-t border-[#5842f5]/15 flex items-center justify-end text-[11px] font-bold shrink-0">
            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.75]" />
              <span>Klik buat balik ke tips</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
