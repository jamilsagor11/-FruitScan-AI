import React, { useState } from 'react';
import { ScanResult } from '../types';
import { BrainCircuit, Trash2, Search, Filter, ShieldAlert, ShieldCheck, Download, AlertTriangle, Calendar, Flame } from 'lucide-react';

interface HistoryTabProps {
  history: ScanResult[];
  lang: 'en' | 'bn';
  onDeleteScan: (id: string) => void;
  onClearHistory: () => void;
  onSelectScan: (scan: ScanResult) => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  history,
  lang,
  onDeleteScan,
  onClearHistory,
  onSelectScan
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'natural' | 'treated'>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  const labels = {
    en: {
      title: "Local Dataset & History",
      subtitle: "Bypassed local database storing scans and model feedback entirely on device.",
      searchPlaceholder: "Search fruit variety...",
      all: "All Scans",
      natural: "Natural",
      treated: "Treated",
      clearAll: "Clear All",
      confirmClearTitle: "Clear All History?",
      confirmClearDesc: "This will remove all stored scans from local storage. This action cannot be undone.",
      cancel: "Cancel",
      confirm: "Clear",
      noHistory: "No scans recorded yet.",
      noMatch: "No fruit found matching your search.",
      kcal: "kcal",
      delete: "Delete"
    },
    bn: {
      title: "লোকাল ডেটাসেট ও ইতিহাস",
      subtitle: "বাহ্যিক ডাটাবেস ছাড়া ডিভাইসের লোকাল স্টোরেজে সংরক্ষিত স্ক্যান ও ফিডব্যাক তথ্য।",
      searchPlaceholder: "ফলের নাম খুঁজুন...",
      all: "সবগুলো",
      natural: "প্রাকৃতিক",
      treated: "রাসায়নিক মিশ্রিত",
      clearAll: "সব মুছুন",
      confirmClearTitle: "সব ইতিহাস মুছে ফেলতে চান?",
      confirmClearDesc: "ডিভাইস থেকে সংরক্ষিত সকল স্ক্যান মুছে ফেলা হবে। এটি পুনরায় ফিরিয়ে আনা যাবে না।",
      cancel: "বাতিল",
      confirm: "মুছে ফেলুন",
      noHistory: "এখনো কোনো স্ক্যান সংরক্ষিত হয়নি।",
      noMatch: "অনুসন্ধানের সাথে কোনো ফল মেলেনি।",
      kcal: "কি.ক্যালরি",
      delete: "মুছুন"
    }
  };

  const t = labels[lang];

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.fruitType.toLowerCase().includes(search.toLowerCase()) ||
      (item.chemicalType && item.chemicalType.toLowerCase().includes(search.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (filter === 'natural') return item.label === 'natural';
    if (filter === 'treated') return item.label === 'treated';
    return true;
  });

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `fruitscan_dataset_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-none text-white space-y-4">
      {/* Title & Actions */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-black tracking-tight flex items-center gap-1.5">
            <BrainCircuit size={17} className="text-accent-blue" />
            {t.title}
          </h2>
          <p className="text-[11px] text-text-dim mt-0.5 leading-relaxed">{t.subtitle}</p>
        </div>

        {history.length > 0 && (
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={exportJSON}
              className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-text-dim hover:text-white transition-all"
              title="Export Dataset JSON"
            >
              <Download size={14} />
            </button>
            <button
              onClick={() => setConfirmClear(true)}
              className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-rose-400 hover:text-rose-300 transition-all"
              title={t.clearAll}
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Search & Filter */}
      {history.length > 0 && (
        <div className="space-y-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-accent-green"
            />
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                filter === 'all'
                  ? 'bg-white/15 text-white border-white/20'
                  : 'bg-white/5 text-text-dim border-transparent hover:text-white'
              }`}
            >
              {t.all} ({history.length})
            </button>
            <button
              onClick={() => setFilter('natural')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                filter === 'natural'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-white/5 text-text-dim border-transparent hover:text-white'
              }`}
            >
              {t.natural}
            </button>
            <button
              onClick={() => setFilter('treated')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                filter === 'treated'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-white/5 text-text-dim border-transparent hover:text-white'
              }`}
            >
              {t.treated}
            </button>
          </div>
        </div>
      )}

      {/* History List */}
      <div className="space-y-2.5">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/5 border border-white/5 rounded-2xl">
            <BrainCircuit size={32} className="mx-auto text-zinc-600 mb-2" />
            <p className="text-xs text-text-dim">{history.length === 0 ? t.noHistory : t.noMatch}</p>
          </div>
        ) : (
          filteredHistory.map((item) => {
            const isTreated = item.label === 'treated';
            return (
              <div
                key={item.id}
                onClick={() => onSelectScan(item)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 flex gap-3 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/50 shrink-0 border border-white/5 relative">
                  <img src={item.imageUrl} alt={item.fruitType} className="w-full h-full object-cover" />
                  {isTreated ? (
                    <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-accent-red border border-black" />
                  ) : (
                    <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-accent-green border border-black" />
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-bold text-xs truncate text-white">{item.fruitType}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteScan(item.id);
                        }}
                        className="text-text-dim hover:text-rose-400 p-1 rounded transition-colors"
                        title={t.delete}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                        isTreated 
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' 
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {isTreated ? (item.chemicalType === 'calcium_carbide' ? 'Carbide' : 'Formalin') : 'Natural'}
                      </span>
                      <span className="text-[10px] text-text-dim">·</span>
                      <span className="text-[10px] text-text-dim">{item.ripeness}</span>
                      <span className="text-[10px] text-text-dim">·</span>
                      <span className="text-[10px] text-text-dim">{item.calories} {t.kcal}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-text-dim line-clamp-1 mt-1 leading-normal">
                    {item.reasoning}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Confirmation Modal for Clearing History */}
      {confirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121720] border border-white/10 rounded-2xl p-5 max-w-xs w-full text-white space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle size={20} />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm">{t.confirmClearTitle}</h3>
              <p className="text-[11px] text-text-dim mt-1">{t.confirmClearDesc}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-text-dim hover:text-white"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  onClearHistory();
                  setConfirmClear(false);
                }}
                className="flex-1 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-colors"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
