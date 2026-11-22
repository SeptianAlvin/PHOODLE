import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-5 right-4 left-4 sm:left-auto sm:right-6 z-50 flex items-center justify-center pointer-events-none">
      <div className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 max-w-md w-full animate-slide-up ${
        isSuccess
          ? 'bg-slate-900/95 text-white border-slate-700'
          : isInfo
          ? 'bg-brand-900/95 text-white border-brand-700'
          : 'bg-slate-900/95 text-white border-slate-700'
      }`}>
        <div className="shrink-0">
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <Info className="w-5 h-5 text-brand-300" />
          )}
        </div>

        <p className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
          {toast.message}
        </p>

        <button
          onClick={onClose}
          className="text-white/60 hover:text-white p-1 rounded-lg transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
