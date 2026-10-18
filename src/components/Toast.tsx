import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="absolute top-14 left-4 right-4 z-50 pointer-events-auto"
        >
          <div className="bg-[#121820]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-2xl flex items-start gap-3 text-white">
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 size={18} className="text-accent-green" />}
              {toast.type === 'error' && <AlertCircle size={18} className="text-accent-red" />}
              {toast.type === 'info' && <Info size={18} className="text-accent-blue" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold leading-tight">{toast.title}</p>
              {toast.description && (
                <p className="text-[11px] text-text-dim mt-0.5 leading-normal">{toast.description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-text-dim hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
