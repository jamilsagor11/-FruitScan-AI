import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Sparkles, Maximize2, Minimize2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { InstallPWA } from './InstallPWA';

interface PhoneHeaderProps {
  lang: 'en' | 'bn';
  onToggleLang: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isScanning: boolean;
  cameraActive: boolean;
  chemicalAlert: boolean;
}

export const PhoneHeader: React.FC<PhoneHeaderProps> = ({
  lang,
  onToggleLang,
  isFullscreen,
  onToggleFullscreen,
  isScanning,
  cameraActive,
  chemicalAlert
}) => {
  const [timeStr, setTimeStr] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col z-30 select-none bg-gradient-to-b from-black/80 via-black/40 to-transparent">
      {/* Hardware Status Bar */}
      <div className="status-bar">
        {/* Time */}
        <span className="font-semibold text-xs tracking-tight text-white/90 w-14">
          {timeStr}
        </span>

        {/* Dynamic Island */}
        <div className="dynamic-island">
          {isScanning ? (
            <>
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
              <span className="font-semibold tracking-wide text-[10px] text-accent-blue">AI Neural Scan...</span>
            </>
          ) : chemicalAlert ? (
            <>
              <ShieldAlert size={12} className="text-accent-red animate-pulse" />
              <span className="font-semibold tracking-wide text-[10px] text-accent-red">Chemical Risk</span>
            </>
          ) : cameraActive ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              <span className="font-medium tracking-wide text-[10px] text-white/80">Neural Eye Active</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              <span className="font-medium tracking-wide text-[10px] text-text-dim">FruitScan v2.0</span>
            </>
          )}
        </div>

        {/* Signal & Battery */}
        <div className="flex items-center gap-1.5 text-white/80 w-14 justify-end">
          <span className="text-[10px] font-bold tracking-tighter">5G</span>
          <Wifi size={13} className="stroke-[2.2]" />
          <BatteryMedium size={14} className="stroke-[2.2]" />
        </div>
      </div>

      {/* App Toolbar / Action Bar */}
      <div className="px-4 py-2 flex items-center justify-between">
        {/* Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-accent-green to-accent-blue p-0.5 flex items-center justify-center shadow-md shadow-accent-green/10">
            <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center">
              <span className="text-xs font-black text-accent-green tracking-tight">FS</span>
            </div>
          </div>
          <div>
            <h1 className="text-xs font-black tracking-tight text-white leading-none flex items-center gap-1">
              FruitScan <span className="text-accent-green text-[9px] font-extrabold uppercase bg-accent-green/10 px-1 py-0.2 rounded border border-accent-green/20">AI</span>
            </h1>
            <span className="text-[9px] text-text-dim block leading-tight">Freshness & Chemical Sensor</span>
          </div>
        </div>

        {/* Controls: PWA, Lang, Fullscreen */}
        <div className="flex items-center gap-2">
          <InstallPWA lang={lang} />

          {/* Language Switch */}
          <button
            onClick={onToggleLang}
            className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-bold text-text-dim hover:text-white transition-all flex items-center gap-1"
            title="Toggle English / Bangla"
          >
            <span>{lang === 'en' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Fullscreen desktop toggle */}
          <button
            onClick={onToggleFullscreen}
            className="hidden sm:flex p-1.5 text-text-dim hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
};
