import React, { useState, useEffect } from 'react';
import { Download, Share2, Smartphone, Check, X, QrCode, ExternalLink, Sparkles, PlusSquare, Apple } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstallPWAProps {
  lang: 'en' | 'bn';
}

export const InstallPWA: React.FC<InstallPWAProps> = ({ lang }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    // Listen for Chrome / Android / Edge PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Show guide modal if no direct prompt (e.g., iOS or manual)
      setShowModal(true);
    }
  };

  const appUrl = typeof window !== 'undefined' ? window.location.href : '';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}&bgcolor=050505&color=00FF95`;

  const labels = {
    en: {
      installApp: "Install App",
      installed: "App Installed",
      installTitle: "Install FruitScan AI",
      installSubtitle: "Get instant access from your Home Screen with camera scanner & offline support.",
      iosStep1: "1. Tap the Share button in Safari navigation bar below",
      iosStep2: "2. Scroll down and select 'Add to Home Screen'",
      iosStep3: "3. Tap 'Add' to launch full-screen FruitScan AI app",
      androidNote: "Tap Install below or open browser menu & select 'Install app' or 'Add to Home screen'.",
      scanQR: "Scan QR Code on Mobile Phone",
      scanQRDesc: "Open your mobile camera to scan this QR code and install directly on your phone:",
      close: "Close",
      directInstall: "Install Now",
      openNewTab: "Open Fullscreen in New Tab"
    },
    bn: {
      installApp: "অ্যাপ ইনস্টল করুন",
      installed: "ইনস্টল করা হয়েছে",
      installTitle: "FruitScan AI ইনস্টল করুন",
      installSubtitle: "হোম স্ক্রিন থেকে সরাসরি ক্যামেরা স্ক্যান ও অফলাইন সাপোর্ট পেতে অ্যাপটি ইনস্টল করুন।",
      iosStep1: "১. সাফারি ব্রাউজারের নিচে শেয়ার (Share) বোতামে ট্যাপ করুন",
      iosStep2: "২. নিচে স্ক্রোল করে 'Add to Home Screen' নির্বাচন করুন",
      iosStep3: "৩. অ্যাপটি চালু করতে 'Add' বোতামে চাপুন",
      androidNote: "ইনস্টল চাপুন অথবা ব্রাউজার মেনু থেকে 'Add to Home screen' বা 'Install app' নির্বাচন করুন।",
      scanQR: "মোবাইলে QR কোড স্ক্যান করুন",
      scanQRDesc: "মোবাইল ক্যামেরা দিয়ে QR কোড স্ক্যান করে সরাসরি ফোনে অ্যাপ ইনস্টল করুন:",
      close: "বন্ধ করুন",
      directInstall: "এখনই ইনস্টল করুন",
      openNewTab: "নতুন ট্যাবে ফুলস্ক্রিন খুলুন"
    }
  };

  const t = labels[lang];

  return (
    <>
      {/* Quick Install Banner / Button in App */}
      <div className="flex items-center gap-1.5">
        {!isInstalled ? (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-accent-green text-black rounded-full text-[10px] font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all animate-pulse"
            title={t.installApp}
          >
            <Download size={12} className="stroke-[2.5]" />
            <span>{t.installApp}</span>
          </button>
        ) : (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-accent-green/20 text-accent-green border border-accent-green/30 rounded-full text-[9px] font-bold">
            <Check size={10} /> {t.installed}
          </span>
        )}
      </div>

      {/* Installation Guide & QR Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative text-white space-y-5"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-text-dim hover:text-white p-1 rounded-full bg-white/5"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-green to-accent-blue p-0.5 shrink-0 shadow-lg shadow-accent-green/20">
                  <img src="/icon-192.png" alt="App Icon" className="w-full h-full rounded-[14px] object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">{t.installTitle}</h3>
                  <span className="text-[10px] text-accent-green font-semibold tracking-wider uppercase">Mobile Progressive Web App</span>
                </div>
              </div>

              <p className="text-xs text-text-dim leading-relaxed">
                {t.installSubtitle}
              </p>

              {/* Direct Install Button if Browser Supports beforeinstallprompt */}
              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 bg-accent-green text-black rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-accent-green/25 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Download size={16} /> {t.directInstall}
                </button>
              )}

              {/* iOS Safari Instructions */}
              {isIOS && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-accent-blue font-bold text-[11px] uppercase tracking-wider">
                    <Apple size={14} /> Safari on iOS Instructions
                  </div>
                  <div className="space-y-1.5 text-text-dim text-[11px] leading-relaxed">
                    <p className="flex items-center gap-1.5"><Share2 size={13} className="text-white shrink-0" /> {t.iosStep1}</p>
                    <p className="flex items-center gap-1.5"><PlusSquare size={13} className="text-white shrink-0" /> {t.iosStep2}</p>
                    <p className="flex items-center gap-1.5"><Check size={13} className="text-accent-green shrink-0" /> {t.iosStep3}</p>
                  </div>
                </div>
              )}

              {/* Mobile QR Code Section for Desktop Users */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <button
                  onClick={() => setShowQRCode(!showQRCode)}
                  className="w-full py-2.5 px-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold flex items-center justify-between text-text-dim hover:text-white transition-all"
                >
                  <span className="flex items-center gap-2">
                    <QrCode size={16} className="text-accent-blue" />
                    {t.scanQR}
                  </span>
                  <span className="text-[10px]">{showQRCode ? 'Hide' : 'Show QR'}</span>
                </button>

                {showQRCode && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="flex flex-col items-center bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2"
                  >
                    <p className="text-[10px] text-text-dim text-center">{t.scanQRDesc}</p>
                    <div className="p-2 bg-black border border-accent-green/40 rounded-xl shadow-md">
                      <img src={qrCodeUrl} alt="Scan QR Code" className="w-36 h-36 rounded-lg" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Open in New Tab Button */}
              <div className="flex gap-2">
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white transition-all"
                >
                  <ExternalLink size={14} /> {t.openNewTab}
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-text-dim hover:text-white transition-all"
                >
                  {t.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
