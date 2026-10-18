import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Flame, Droplets, Info, Sparkles, Check, ChevronRight } from 'lucide-react';

interface SafetyGuideProps {
  lang: 'en' | 'bn';
  onScanFruit: () => void;
}

export const SafetyGuide: React.FC<SafetyGuideProps> = ({ lang, onScanFruit }) => {
  const [activeSection, setActiveSection] = useState<'carbide' | 'formalin' | 'washing'>('carbide');

  const content = {
    en: {
      title: "Chemical Adulteration Guide",
      subtitle: "Learn how to spot Calcium Carbide & Formalin before eating.",
      carbideTab: "Calcium Carbide (CaC₂)",
      formalinTab: "Formalin (Formaldehyde)",
      washingTab: "Safe Washing Protocol",
      carbideIntro: "Calcium Carbide is illegally used to artificially accelerate fruit ripening. When it contacts moisture, it generates acetylene gas, containing toxic traces of arsenic and phosphorus hydrides.",
      carbideSigns: [
        { label: "Uniform Skin Color", desc: "Peel is unnaturally vibrant yellow or orange, but fruit lacks fragrance." },
        { label: "Green Stem / Pedicel", desc: "The fruit skin appears fully ripe, while the stem remains completely green and raw." },
        { label: "White Alkaline Powder", desc: "Traces of chalky white residue near the stem junction or skin folds." },
        { label: "Acidic or Tasteless Pulp", desc: "Flesh is pale, tough, or unusually watery with little natural sweetness." }
      ],
      formalinIntro: "Formalin (37-40% formaldehyde solution) is an embalming agent used illegally to delay decay in mangoes, apples, lychees, and berries.",
      formalinSigns: [
        { label: "Zero Fruit Flies", desc: "Fruit flies and insects avoid formalin-dipped fruits even when placed openly." },
        { label: "Unnaturally Stiff Skin", desc: "Peel remains tight and shiny for weeks without undergoing natural wrinkling." },
        { label: "Pungent or Chemical Smell", desc: "Sniff near the stem; a faint medicinal or stinging odor can be detected." },
        { label: "Rubbery Flesh Texture", desc: "Inner pulp loses succulent softness and becomes fibrous or rubbery." }
      ],
      washingSteps: [
        { step: "1", title: "15-Minute Soak", desc: "Submerge fruits in lukewarm water with 1 tbsp baking soda or 10% apple cider vinegar." },
        { step: "2", title: "Gentle Brushing", desc: "Use a clean soft vegetable brush to scrub wax and surface residues under running water." },
        { step: "3", title: "Peel Outer Skin", desc: "Always peel thick peels (mangoes, bananas, citrus) before consuming." },
        { step: "4", title: "Cut Stem Cavity", desc: "Discard the stem recess and 5mm around the pedicel where chemicals concentrate." }
      ],
      scanButton: "Open Scanner to Verify a Fruit"
    },
    bn: {
      title: "রাসায়নিক ভেজাল শনাক্তকরণ গাইড",
      subtitle: "ক্যালসিয়াম কার্বাইড ও ফরমালিন চেনার উপায় এবং স্বাস্থ্য সুরক্ষা নিয়ম।",
      carbideTab: "ক্যালসিয়াম কার্বাইড (CaC₂)",
      formalinTab: "ফরমালিন (ফরমালডিহাইড)",
      washingTab: "ফল ধোয়ার সঠিক নিয়ম",
      carbideIntro: "ক্যালসিয়াম কার্বাইড মূলত লোহা কাটার কাজে ব্যবহৃত হয়। এটি জলীয় বাষ্পের সংস্পর্শে এসে অ্যাসিটিলিন গ্যাস উৎপন্ন করে যা ফল কৃত্রিমভাবে পাকায়। এতে ক্ষতিকর আর্সেনিক ও ফসফরাস থাকে।",
      carbideSigns: [
        { label: "অস্বাভাবিক উজ্জ্বল হলুদ রং", desc: "চামড়া উজ্জ্বল হলুদ দেখালেও ফলের ভেতর স্বাভাবিক মিষ্টি বা সুবাস থাকে না।" },
        { label: "বোঁটা কাঁচা ও শক্ত", desc: "পুরো ফল পাকা দেখালেও বোঁটা বা ডাল কাঁচা ও গাঢ় সবুজ থাকে।" },
        { label: "সাদা চূর্ণ বা পাউডার", desc: "বোঁটার চারপাশে বা গায়ে চকের মতো সাদা পাউডারের দাগ দেখা যায়।" },
        { label: "ভেতরের অংশ পানসে", desc: "কাটার পর ভেতরের শাঁস ফ্যাকাশে ও অম্লযুক্ত বা পানসে মনে হয়।" }
      ],
      formalinSigns: [
        { label: "মাছি বসে না", desc: "খোলা জায়গায় রাখলেও ফল ও মাছি কোনো পোকা বসে না।" },
        { label: "দীর্ঘদিন শক্ত চামড়া", desc: "স্বাভাবিকভাবে না পচে কয়েক সপ্তাহ পর্যন্ত চকচকে টানটান থাকে।" },
        { label: "ঔষধের মতো গন্ধ", desc: "বোঁটা শুঁকলে মিষ্টি গন্ধের বদলে তীব্র রাসায়নিক গন্ধ পাওয়া যায়।" },
        { label: "শাঁসের রাবার ভাব", desc: "রসালো ভাব কমে গিয়ে শাঁস শক্ত বা চামড়ার মতো হয়ে যায়।" }
      ],
      formalinIntro: "ফরমালিন মূলত মৃতদেহ সংরক্ষণে ব্যবহৃত হয়। এটি অসাধু ব্যবসায়ীরা ফল পচন রোধে পানিতে মিশিয়ে স্প্রে করে বা ডুবিয়ে রাখে।",
      washingSteps: [
        { step: "১", title: "১৫ মিনিট ভিজিয়ে রাখুন", desc: "কুসুম গরম পানিতে ১ চামচ বেকিং সোডা বা লবণ দিয়ে ১৫-২০ মিনিট ভিজিয়ে রাখুন।" },
        { step: "২", title: "বহমান পানিতে ধোয়া", desc: "চলন্ত ট্যাপের পানির নিচে নরম ব্রাশ দিয়ে আলতো ঘষে চামড়া ধুয়ে নিন।" },
        { step: "৩", title: "খোসা ছাড়িয়ে খান", desc: "আম, কলা, আপেলের খোসা অবশ্যই ভালো করে ছাড়িয়ে নেবেন।" },
        { step: "৪", title: "বোঁটার অংশ কেটে ফেলা", desc: "বোঁটার চারপাশে রাসায়নিক বেশি জমে, তাই ৫ মিমি অতিরিক্ত কেটে ফেলুন।" }
      ],
      scanButton: "ফল যাচাই করতে ক্যামেরা খুলুন"
    }
  };

  const t = content[lang];

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-none text-white space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-black tracking-tight">{t.title}</h2>
        <p className="text-[11px] text-text-dim mt-0.5 leading-relaxed">{t.subtitle}</p>
      </div>

      {/* Segmented Controls */}
      <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
        <button
          onClick={() => setActiveSection('carbide')}
          className={`py-2 px-1 text-[10px] font-bold rounded-xl transition-all ${
            activeSection === 'carbide'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
              : 'text-text-dim hover:text-white'
          }`}
        >
          Carbide
        </button>
        <button
          onClick={() => setActiveSection('formalin')}
          className={`py-2 px-1 text-[10px] font-bold rounded-xl transition-all ${
            activeSection === 'formalin'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
              : 'text-text-dim hover:text-white'
          }`}
        >
          Formalin
        </button>
        <button
          onClick={() => setActiveSection('washing')}
          className={`py-2 px-1 text-[10px] font-bold rounded-xl transition-all ${
            activeSection === 'washing'
              ? 'bg-accent-green/20 text-accent-green border border-accent-green/30 shadow-sm'
              : 'text-text-dim hover:text-white'
          }`}
        >
          Washing Tips
        </button>
      </div>

      {/* Section Content */}
      {activeSection === 'carbide' && (
        <div className="space-y-3">
          <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
              <Flame size={15} />
              <span>{t.carbideTab}</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              {t.carbideIntro}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-dim">Identification Signatures</span>
            {t.carbideSigns.map((sign, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">{sign.label}</h4>
                  <p className="text-[11px] text-text-dim mt-0.5 leading-relaxed">{sign.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'formalin' && (
        <div className="space-y-3">
          <div className="bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
              <AlertTriangle size={15} />
              <span>{t.formalinTab}</span>
            </div>
            <p className="text-[11px] text-rose-200/80 leading-relaxed">
              {t.formalinIntro}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-dim">Detection Traits</span>
            {t.formalinSigns.map((sign, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">{sign.label}</h4>
                  <p className="text-[11px] text-text-dim mt-0.5 leading-relaxed">{sign.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'washing' && (
        <div className="space-y-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
              <Droplets size={15} />
              <span>{t.washingTab}</span>
            </div>
            <p className="text-[11px] text-emerald-200/80 leading-relaxed">
              Scientific washing reduces up to 85% of superficial pesticide and carbide residues.
            </p>
          </div>

          <div className="space-y-2">
            {t.washingSteps.map((step, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-xl bg-accent-green/20 text-accent-green text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {step.step}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">{step.title}</h4>
                  <p className="text-[11px] text-text-dim mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={onScanFruit}
        className="w-full py-3 px-4 bg-accent-green text-black rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent-green/20 hover:opacity-90 active:scale-95 transition-all mt-4"
      >
        <Sparkles size={15} />
        {t.scanButton}
      </button>
    </div>
  );
};
