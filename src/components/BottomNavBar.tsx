import React from 'react';
import { Camera, Sparkles, History, ShieldAlert } from 'lucide-react';

export type AppTab = 'scan' | 'samples' | 'history' | 'guide';

interface BottomNavBarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  lang: 'en' | 'bn';
  historyCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  lang,
  historyCount
}) => {
  const tabs = [
    {
      id: 'scan' as AppTab,
      labelEn: 'Scanner',
      labelBn: 'স্ক্যানার',
      icon: Camera
    },
    {
      id: 'samples' as AppTab,
      labelEn: 'Samples',
      labelBn: 'নমুনা ফল',
      icon: Sparkles
    },
    {
      id: 'history' as AppTab,
      labelEn: 'Dataset',
      labelBn: 'ইতিহাস',
      icon: History,
      badge: historyCount > 0 ? historyCount : undefined
    },
    {
      id: 'guide' as AppTab,
      labelEn: 'Safety Guide',
      labelBn: 'নিরাপত্তা গাইড',
      icon: ShieldAlert
    }
  ];

  return (
    <div className="bg-[#0B0F15]/95 backdrop-blur-xl border-t border-white/10 z-30 select-none pb-1">
      {/* Tab Buttons */}
      <div className="grid grid-cols-4 px-2 pt-2 pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const label = lang === 'en' ? tab.labelEn : tab.labelBn;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 relative rounded-xl transition-all ${
                isActive ? 'text-accent-green' : 'text-text-dim hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon size={19} className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 bg-accent-blue text-black font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium transition-colors ${isActive ? 'font-bold text-accent-green' : ''}`}>
                {label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-accent-green mt-0.5 shadow-[0_0_6px_#00FF95]" />
              )}
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="pt-1 pb-1 flex justify-center">
        <div className="w-28 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};
