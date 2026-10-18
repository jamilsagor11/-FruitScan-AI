import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, BrainCircuit, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ScanResult } from '../types';

interface CorrectionModalProps {
  isOpen: boolean;
  result: ScanResult | null;
  lang: 'en' | 'bn';
  onClose: () => void;
  onSubmit: (updated: Partial<ScanResult>) => void;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  result,
  lang,
  onClose,
  onSubmit
}) => {
  const [fruitName, setFruitName] = useState(result?.fruitType || '');
  const [ripeness, setRipeness] = useState<'Raw' | 'Ripe' | 'Overripe' | 'Unknown'>(result?.ripeness || 'Ripe');
  const [status, setStatus] = useState<'Good' | 'Suspicious' | 'Bad' | 'Spoiled'>(result?.status || 'Good');
  const [label, setLabel] = useState<'natural' | 'treated'>(result?.label || 'natural');
  const [chemicalType, setChemicalType] = useState<string>(result?.chemicalType || 'none');
  const [notes, setNotes] = useState('');

  if (!isOpen || !result) return null;

  const labels = {
    en: {
      title: "Model Feedback & Correction",
      subtitle: "Help refine the botanical neural weights by providing verified ground truth.",
      fruitName: "True Fruit Variety Name",
      placeholder: "e.g., Harumanis Mango, Fuji Apple, Cavendish Banana",
      ripeness: "Actual Ripeness Level",
      status: "Condition Assessment",
      chemicalTitle: "Chemical Treatment",
      natural: "Natural (Untreated)",
      carbide: "Calcium Carbide Ripened",
      formalin: "Formalin Preserved",
      notes: "Additional Observations (Optional)",
      notesPlaceholder: "e.g., Bought from local market, skin had white powder residue",
      cancel: "Cancel",
      save: "Save & Train Dataset"
    },
    bn: {
      title: "মডেল সংশোধন ও মতামত",
      subtitle: "সঠিক তথ্য প্রদান করে ফলের এআই নিউরাল নেটওয়ার্ককে আরও নির্ভুল হতে সহায়তা করুন।",
      fruitName: "ফলের সঠিক নাম ও জাত",
      placeholder: "যেমন, ল্যাংড়া আম, হিমসাগর, সাগর কলা, গালা আপেল",
      ripeness: "প্রকৃত পরিপক্কতা",
      status: "ফলের অবস্থা",
      chemicalTitle: "রাসায়নিক প্রয়োগ",
      natural: "প্রাকৃতিক (রাসায়নিকমুক্ত)",
      carbide: "কার্বাইডে পাকানো",
      formalin: "ফরমালিন যুক্ত",
      notes: "অতিরিক্ত মন্তব্য (ঐচ্ছিক)",
      notesPlaceholder: "যেমন, বোঁটা কাঁচা ছিল, কৃত্রিম গন্ধ ছিল",
      cancel: "বাতিল",
      save: "সংরক্ষণ ও আপডেট করুন"
    }
  };

  const t = labels[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fruitType: fruitName.trim() || result.fruitType,
      ripeness,
      status,
      label,
      chemicalType,
      reasoning: notes ? `[User Correction]: ${notes} (Originally predicted ${result.fruitType})` : result.reasoning
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="w-full max-w-sm sm:max-w-md bg-[#0F141C] border border-white/10 rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl text-white max-h-[85vh] overflow-y-auto scrollbar-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue">
                <BrainCircuit size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">{t.title}</h3>
                <p className="text-[10px] text-text-dim">{t.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-text-dim hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
            {/* Fruit Name Field */}
            <div>
              <label className="block text-[11px] font-semibold text-text-dim uppercase tracking-wider mb-1.5">
                {t.fruitName}
              </label>
              <input
                type="text"
                value={fruitName}
                onChange={(e) => setFruitName(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-accent-green text-xs"
                required
              />
            </div>

            {/* Ripeness Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-text-dim uppercase tracking-wider mb-1.5">
                {t.ripeness}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Raw', 'Ripe', 'Overripe'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setRipeness(lvl)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                      ripeness === lvl
                        ? 'bg-accent-green/20 border-accent-green text-accent-green shadow-sm'
                        : 'bg-white/5 border-white/10 text-text-dim hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Chemical Treatment Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-text-dim uppercase tracking-wider mb-1.5">
                {t.chemicalTitle}
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setLabel('natural');
                    setChemicalType('none');
                    setStatus('Good');
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                    label === 'natural'
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-text-dim hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className={label === 'natural' ? 'text-emerald-400' : 'text-zinc-500'} />
                    <span className="font-bold text-[11px]">{t.natural}</span>
                  </div>
                  {label === 'natural' && <Check size={14} className="text-emerald-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLabel('treated');
                    setChemicalType('calcium_carbide');
                    setStatus('Suspicious');
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                    chemicalType === 'calcium_carbide'
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-text-dim hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className={chemicalType === 'calcium_carbide' ? 'text-amber-400' : 'text-zinc-500'} />
                    <span className="font-bold text-[11px]">{t.carbide}</span>
                  </div>
                  {chemicalType === 'calcium_carbide' && <Check size={14} className="text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLabel('treated');
                    setChemicalType('formalin');
                    setStatus('Suspicious');
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                    chemicalType === 'formalin'
                      ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                      : 'bg-white/5 border-white/10 text-text-dim hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className={chemicalType === 'formalin' ? 'text-rose-400' : 'text-zinc-500'} />
                    <span className="font-bold text-[11px]">{t.formalin}</span>
                  </div>
                  {chemicalType === 'formalin' && <Check size={14} className="text-rose-400" />}
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-text-dim uppercase tracking-wider mb-1.5">
                {t.notes}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-accent-green text-xs resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-xs text-text-dim hover:text-white transition-all"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-accent-green text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-accent-green/20 hover:opacity-90 active:scale-95 transition-all"
              >
                <Check size={16} />
                {t.save}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
