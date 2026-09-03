import React from 'react';
import { BookOpen, Clock, Edit3, MessageSquare } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, historyCount = 0 }) {
  const navItems = [
    {
      id: 'vocab',
      label: 'Vocab',
      icon: BookOpen,
      enabled: true,
      badge: null,
    },
    {
      id: 'riwayat',
      label: 'Riwayat',
      icon: Clock,
      enabled: true,
      badge: historyCount > 0 ? historyCount : null,
    },
    {
      id: 'writing',
      label: 'Menulis',
      icon: Edit3,
      enabled: true,
      badge: 'Soon',
    },
    {
      id: 'chat',
      label: 'Chat AI',
      icon: MessageSquare,
      enabled: true,
      badge: 'Soon',
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 theme-bg-sidebar border-t theme-border px-2 py-2 shadow-lg transition-colors">
      <nav className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-[#5842f5] font-extrabold bg-[#5842f5]/10'
                  : 'theme-text-muted hover:theme-text-main font-semibold'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#5842f5]' : ''}`} />
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-3 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                      typeof item.badge === 'number'
                        ? 'bg-amber-500 text-white'
                        : 'theme-bg-subtle theme-border theme-text-faint border'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 font-sans">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-5 h-1 bg-[#5842f5] rounded-full shadow-sm"></span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
