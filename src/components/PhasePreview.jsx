import React from 'react';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';

export default function PhasePreview({ title, phase, description, features = [] }) {
  return (
    <div className="theme-bg-card border theme-border rounded-[24px] p-7 theme-card-shadow space-y-5 animate-fade-in text-center max-w-lg mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-[#5842f5]/15 border border-[#5842f5]/30 mx-auto flex items-center justify-center text-[#5842f5]">
        <Lock className="w-6 h-6 text-amber-500" />
      </div>

      <div className="space-y-1.5">
        <span className="inline-block px-3 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
          {phase} — Fitur Mendatang
        </span>
        <h2 className="font-extrabold text-xl theme-text-main pt-1">{title}</h2>
        <p className="text-xs sm:text-[13px] theme-text-muted max-w-sm mx-auto leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {features.length > 0 && (
        <div className="p-4 rounded-2xl theme-bg-subtle border theme-border text-left space-y-2.5 shadow-2xs">
          <span className="text-[11px] font-extrabold theme-text-main uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#5842f5]" /> Preview Rencana Fitur:
          </span>
          <ul className="space-y-2 text-xs sm:text-[12.5px] theme-text-muted">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#5842f5] font-extrabold">•</span>
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2 text-[11.5px] theme-text-faint font-medium">
        ⚡ Selesai membangun Fase 1 &amp; 2! Konfirmasi ke agen untuk mulai memfasilitasi pengembangan {phase}.
      </div>
    </div>
  );
}
