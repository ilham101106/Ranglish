import React, { useState, useEffect } from 'react';
import { Settings, Sun, Moon, Coffee } from 'lucide-react';
import { getSettings, getAppTheme, setAppTheme } from '../services/storage';

export default function Header({ onOpenSettings }) {
  const { apiKey } = getSettings();
  const [currentTheme, setCurrentTheme] = useState('standar');

  useEffect(() => {
    setCurrentTheme(getAppTheme());

    const handleThemeChange = (e) => {
      if (e.detail) {
        setCurrentTheme(e.detail);
      }
    };

    window.addEventListener('ranglish_theme_changed', handleThemeChange);
    return () => window.removeEventListener('ranglish_theme_changed', handleThemeChange);
  }, []);

  const cycleTheme = () => {
    const next = currentTheme === 'standar' ? 'malam' : currentTheme === 'malam' ? 'kalem' : 'standar';
    setCurrentTheme(next);
    setAppTheme(next);
  };

  return (
    <header className="lg:hidden sticky top-0 z-40 w-full theme-bg-sidebar px-4 py-3 border-b theme-border shadow-sm transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5842f5] to-[#f59e0b] flex items-center justify-center font-extrabold text-white text-base shadow-sm">
            R
          </div>
          
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-extrabold text-lg tracking-tight theme-text-main font-sans">
                Ranglish
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#5842f5]/15 text-[#5842f5] border border-[#5842f5]/30">
                MVP
              </span>
            </div>
            <p className="text-[11px] theme-text-muted font-medium">
              Anak Rantau Edition
            </p>
          </div>
        </div>

        {/* Action Controls: Quick Theme Toggle & Settings */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={cycleTheme}
            aria-label="Ganti mode tampilan"
            title={`Mode saat ini: ${currentTheme}. Klik untuk ganti.`}
            className="p-2 rounded-xl theme-bg-subtle hover:theme-bg-card theme-text-main border theme-border transition flex items-center justify-center"
          >
            {currentTheme === 'standar' && <Sun className="w-4 h-4 text-[#5842f5]" />}
            {currentTheme === 'malam' && <Moon className="w-4 h-4 text-[#7c6cf0]" />}
            {currentTheme === 'kalem' && <Coffee className="w-4 h-4 text-[#5842f5]" />}
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="relative p-2 rounded-xl theme-bg-subtle hover:theme-bg-card theme-text-main border theme-border transition flex items-center justify-center shadow-2xs"
            title="Pengaturan OpenRouter API & Model"
          >
            <Settings className="w-4 h-4 theme-text-muted" />
            {!apiKey && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
