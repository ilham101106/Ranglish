import React, { useState, useEffect } from 'react';
import { X, Key, Cpu, ExternalLink, Check, AlertCircle, Sparkles, Sun, Moon, Coffee, Palette } from 'lucide-react';
import { getSettings, saveSettings, DEFAULT_MODELS, getAppTheme } from '../services/storage';

export default function SettingsModal({ isOpen, onClose, onSaveSuccess }) {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODELS[0].id);
  const [customModel, setCustomModel] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('standar');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getSettings();
      setApiKey(current.apiKey || '');
      setSelectedTheme(current.theme || getAppTheme());
      
      const isPredefined = DEFAULT_MODELS.some(m => m.id === current.model);
      if (isPredefined) {
        setSelectedModel(current.model);
        setIsCustom(false);
      } else if (current.model) {
        setIsCustom(true);
        setCustomModel(current.model);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const finalModel = isCustom ? customModel.trim() : selectedModel;
    saveSettings({
      apiKey: apiKey.trim(),
      model: finalModel || DEFAULT_MODELS[0].id,
      theme: selectedTheme,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      if (onSaveSuccess) onSaveSuccess();
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg theme-bg-card border theme-border rounded-[24px] p-6 sm:p-7 shadow-2xl overflow-hidden space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b theme-border-subtle">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-[#5842f5]/15 text-[#5842f5] border border-[#5842f5]/30">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg theme-text-main">Pengaturan Ranglish</h2>
              <p className="text-xs theme-text-muted font-medium">Tema Tampilan, API Key &amp; Model AI</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl theme-text-faint hover:theme-text-main hover:theme-bg-subtle transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-sm">
          {/* SECTION 1: MODE TAMPILAN (3-MODE SYSTEM) */}
          <div className="space-y-2.5">
            <label className="block text-xs font-extrabold theme-text-main uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#5842f5]" />
              Mode Tampilan (Theme)
            </label>

            <div className="grid grid-cols-3 gap-3">
              {/* Mode Standar (Light) */}
              <button
                type="button"
                onClick={() => setSelectedTheme('standar')}
                className={`p-3 rounded-2xl border text-left flex flex-col items-center text-center gap-2 transition duration-150 shadow-2xs relative ${
                  selectedTheme === 'standar'
                    ? 'border-[#5842f5] ring-2 ring-[#5842f5]/20 bg-[#f8f9fa]'
                    : 'theme-border theme-bg-subtle hover:theme-border-focus'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#5842f5]">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">Standar</div>
                  <div className="text-[10px] text-slate-500">Terang / Light</div>
                </div>
                {selectedTheme === 'standar' && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#5842f5]"></span>
                )}
              </button>

              {/* Mode Malam (Dark) */}
              <button
                type="button"
                onClick={() => setSelectedTheme('malam')}
                className={`p-3 rounded-2xl border text-left flex flex-col items-center text-center gap-2 transition duration-150 shadow-2xs relative ${
                  selectedTheme === 'malam'
                    ? 'border-[#7c6cf0] ring-2 ring-[#7c6cf0]/20 bg-[#161927]'
                    : 'theme-border theme-bg-subtle hover:theme-border-focus'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#0d0f18] border border-[#2a2f45] shadow-sm flex items-center justify-center text-[#7c6cf0]">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-100">Malam</div>
                  <div className="text-[10px] text-slate-400">Dark Klasik</div>
                </div>
                {selectedTheme === 'malam' && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7c6cf0]"></span>
                )}
              </button>

              {/* Mode Kalem (Sepia) */}
              <button
                type="button"
                onClick={() => setSelectedTheme('kalem')}
                className={`p-3 rounded-2xl border text-left flex flex-col items-center text-center gap-2 transition duration-150 shadow-2xs relative ${
                  selectedTheme === 'kalem'
                    ? 'border-[#5842f5] ring-2 ring-[#5842f5]/20 bg-[#f7f4ec]'
                    : 'theme-border theme-bg-subtle hover:theme-border-focus'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#fffdf8] border border-[#e2dacd] shadow-sm flex items-center justify-center text-[#5842f5]">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#2d261e]">Kalem</div>
                  <div className="text-[10px] text-[#63584c]">Sepia / Warm</div>
                </div>
                {selectedTheme === 'kalem' && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#5842f5]"></span>
                )}
              </button>
            </div>
          </div>

          {/* SECTION 2: API KEY */}
          <div className="space-y-1.5 pt-2 border-t theme-border-subtle">
            <label className="block text-xs font-semibold theme-text-main flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-extrabold">
                <Key className="w-3.5 h-3.5 text-amber-500" />
                OpenRouter API Key
              </span>
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#5842f5] hover:underline flex items-center gap-0.5 font-bold"
              >
                Dapatkan API Key gratis <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="w-full px-3.5 py-2.5 rounded-xl theme-bg-input border theme-border theme-text-main text-xs placeholder:theme-text-faint focus:outline-none focus:border-[#5842f5]"
            />
            {!apiKey ? (
              <p className="mt-1 text-[11px] theme-text-muted flex items-start gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                <span>
                  Opsional jika kamu ingin memakai AI live online. (Bawaan otomatis: <strong>Instan Bank AI Lokal 0ms</strong>).
                </span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>API Key aktif &amp; terhubung ke OpenRouter AI.</span>
              </p>
            )}
          </div>

          {/* SECTION 3: MODEL SELECTION */}
          <div className="space-y-1.5 pt-2 border-t theme-border-subtle">
            <label className="block text-xs font-extrabold theme-text-main flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#5842f5]" />
              Pilih Model LLM
            </label>
            
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {DEFAULT_MODELS.map((model) => (
                <label
                  key={model.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                    !isCustom && selectedModel === model.id
                      ? 'bg-[#5842f5]/15 border-[#5842f5]/50 theme-text-main font-bold'
                      : 'theme-bg-subtle theme-border theme-text-muted hover:theme-text-main'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="modelOption"
                      checked={!isCustom && selectedModel === model.id}
                      onChange={() => {
                        setSelectedModel(model.id);
                        setIsCustom(false);
                      }}
                      className="text-[#5842f5] focus:ring-[#5842f5]"
                    />
                    <span>{model.name}</span>
                  </div>
                  {model.id.includes('free') && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/30">
                      FREE
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Save & Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t theme-border-subtle">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold theme-text-muted hover:theme-text-main transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#5842f5] hover:bg-[#4338ca] text-white transition flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <span>Simpan Pengaturan</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
