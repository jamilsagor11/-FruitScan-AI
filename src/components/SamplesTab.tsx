import React from 'react';
import { SAMPLE_FRUITS, SampleFruit } from '../data/samples';
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

interface SamplesTabProps {
  lang: 'en' | 'bn';
  onSelectSample: (sample: SampleFruit) => void;
  isScanning: boolean;
}

export const SamplesTab: React.FC<SamplesTabProps> = ({ lang, onSelectSample, isScanning }) => {
  const labels = {
    en: {
      title: "Interactive Sample Fruits",
      subtitle: "Tap any real fruit sample to test the AI scanner instantly without needing a physical fruit.",
      analyzeBtn: "Scan This Fruit",
      scanning: "Analyzing..."
    },
    bn: {
      title: "ইন্টারেক্টিভ নমুনা ফল",
      subtitle: "ক্যামেরা বা আসল ফল ছাড়া তাৎক্ষণিক এআই স্ক্যান পরীক্ষা করতে যেকোনো ফলে ট্যাপ করুন।",
      analyzeBtn: "এই ফল স্ক্যান করুন",
      scanning: "বিশ্লেষণ করা হচ্ছে..."
    }
  };

  const t = labels[lang];

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-none text-white space-y-4">
      <div>
        <h2 className="text-base font-black tracking-tight flex items-center gap-1.5">
          <Sparkles size={17} className="text-accent-blue" />
          {t.title}
        </h2>
        <p className="text-[11px] text-text-dim mt-0.5 leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SAMPLE_FRUITS.map((fruit) => {
          const name = lang === 'en' ? fruit.nameEn : fruit.nameBn;
          const desc = lang === 'en' ? fruit.descriptionEn : fruit.descriptionBn;

          return (
            <div
              key={fruit.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div className="space-y-2.5">
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-black/40">
                  <img
                    src={fruit.imageUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${fruit.badgeColor}`}>
                      {fruit.chemicalTag}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold leading-snug">{name}</h3>
                  <span className="text-[9px] text-text-dim italic font-mono">{fruit.variety}</span>
                  <p className="text-[10px] text-text-dim mt-1 line-clamp-2 leading-relaxed">{desc}</p>
                </div>
              </div>

              <button
                disabled={isScanning}
                onClick={() => onSelectSample(fruit)}
                className="mt-3 w-full py-2 px-3 bg-white/5 hover:bg-accent-green hover:text-black border border-white/10 hover:border-accent-green rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
              >
                <span>{isScanning ? t.scanning : t.analyzeBtn}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
