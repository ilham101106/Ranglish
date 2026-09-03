import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Edit3, 
  MessageSquare, 
  Settings, 
  Sun, 
  Moon, 
  Coffee 
} from 'lucide-react';
import { getAppTheme, setAppTheme } from '../services/storage';

export default function Sidebar({ activeTab, setActiveTab, historyCount, onOpenSettings }) {
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

  const handleSelectTheme = (theme) => {
    setCurrentTheme(theme);
    setAppTheme(theme);
  };

  const navItems = [
    {
      id: 'vocab',
      label: 'Vocab',
      icon: BookOpen,
      count: null,
      disabled: false,
      badge: null
    },
    {
      id: 'riwayat',
      label: 'Riwayat',
      icon: Clock,
      count: historyCount > 0 ? historyCount : null,
      disabled: false,
      badge: null
    },
    {
      id: 'writing',
      label: 'Menulis',
      icon: Edit3,
      count: null,
      disabled: false,
      badge: 'Soon'
    },
    {
      id: 'chat',
      label: 'Chat AI',
      icon: MessageSquare,
      count: null,
      disabled: false,
      badge: 'Soon'
    }
  ];

  // Sliding indicator offset: 0 for standar, 100% for malam, 200% for kalem
  const indicatorIndex = currentTheme === 'malam' ? 1 : currentTheme === 'kalem' ? 2 : 0;

  return (
    <aside className="hidden lg:flex flex-col w-[240px] h-screen sticky top-0 theme-bg-sidebar border-r theme-border p-5 shrink-0 select-none z-30 transition-colors">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-1 pb-5 mb-2 border-b theme-border-subtle">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5842f5] to-[#f59e0b] flex items-center justify-center font-extrabold text-lg text-white shrink-0 shadow-md shadow-indigo-500/20">
          R
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base theme-text-main tracking-tight">Ranglish</span>
            <span className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#5842f5]/15 text-[#5842f5] border border-[#5842f5]/30">
              MVP
            </span>
          </div>
          <p className="text-[11px] theme-text-muted mt-0.5 font-medium">
            Anak Rantau Edition
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="text-[10.5px] font-bold tracking-wider theme-text-faint px-2.5 mb-2 uppercase">
        Menu Utama
      </div>
      
      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-[13.5px] transition-all relative text-left group ${
                isActive
                  ? 'bg-[#5842f5] text-white shadow-sm'
                  : 'theme-text-muted hover:theme-text-main hover:bg-[var(--border-subtle)]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-white' : 'theme-text-muted group-hover:theme-text-main'
              }`} />

              <span className="flex-1">{item.label}</span>

              {/* History Count Badge */}
              {item.count !== null && (
                <span className={`text-[10.5px] font-extrabold min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-white text-[#5842f5]'
                    : 'bg-amber-500 text-white'
                }`}>
                  {item.count}
                </span>
              )}

              {/* Soon Tag */}
              {item.badge && (
                <span className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md border ${
                  isActive
                    ? 'bg-white/20 border-white/30 text-white'
                    : 'theme-bg-subtle theme-border theme-text-faint'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Theme Quick Toggle & Settings */}
      <div className="mt-auto pt-4 border-t theme-border-subtle space-y-3">
        {/* Quick Theme Toggle with Smooth Sliding Indicator */}
        <div className="relative flex items-center p-1 rounded-full border theme-border theme-bg-subtle">
          {/* Sliding Pill Indicator */}
          <div 
            className="absolute top-1 bottom-1 w-[calc(33.333%-2.66px)] rounded-full theme-bg-card theme-card-shadow transition-transform duration-300 ease-out border theme-border"
            style={{ 
              left: '4px',
              transform: `translateX(${indicatorIndex * 100}%) translateX(${indicatorIndex * 4}px)` 
            }}
          />

          {/* Mode Standar Button */}
          <button
            type="button"
            onClick={() => handleSelectTheme('standar')}
            aria-label="Mode standar"
            title="Mode Standar (Terang)"
            className={`relative z-10 flex-1 min-h-[32px] flex items-center justify-center rounded-full transition-colors ${
              currentTheme === 'standar' ? 'text-[#5842f5]' : 'theme-text-faint hover:theme-text-main'
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Mode Malam Button */}
          <button
            type="button"
            onClick={() => handleSelectTheme('malam')}
            aria-label="Mode malam"
            title="Mode Malam (Dark)"
            className={`relative z-10 flex-1 min-h-[32px] flex items-center justify-center rounded-full transition-colors ${
              currentTheme === 'malam' ? 'text-[#7c6cf0]' : 'theme-text-faint hover:theme-text-main'
            }`}
          >
            <Moon className="w-4 h-4" />
          </button>

          {/* Mode Kalem Button */}
          <button
            type="button"
            onClick={() => handleSelectTheme('kalem')}
            aria-label="Mode kalem"
            title="Mode Kalem (Sepia / Reading)"
            className={`relative z-10 flex-1 min-h-[32px] flex items-center justify-center rounded-full transition-colors ${
              currentTheme === 'kalem' ? 'text-[#5842f5]' : 'theme-text-faint hover:theme-text-main'
            }`}
          >
            <Coffee className="w-4 h-4" />
          </button>
        </div>

        {/* Single Settings Button */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl border theme-border theme-bg-card hover:border-[#5842f5] theme-text-muted hover:theme-text-main transition text-[13px] font-bold relative group shadow-2xs"
        >
          <Settings className="w-4 h-4 theme-text-muted group-hover:text-[#5842f5] transition-colors" />
          <span>Pengaturan</span>
        </button>
      </div>
    </aside>
  );
}
