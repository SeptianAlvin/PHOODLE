import React from 'react';
import { Sparkles, Crown, Zap, ShieldCheck } from 'lucide-react';
import phoodleLogo from '../assets/phoodle-logo.png';

export function Navbar({ userTier, setUserTier, onOpenSubscription, showToast, onNavigateHome }) {
  const isPro = userTier === 'pro';

  const toggleTier = () => {
    const nextTier = isPro ? 'free' : 'pro';
    setUserTier(nextTier);
    if (nextTier === 'pro') {
      showToast('🎉 Mode PRO VIP Berhasil Diaktifkan! Semua bingkai & fitur eksklusif terbuka.', 'success');
    } else {
      showToast('ℹ️ Beralih ke paket Free Member.', 'info');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden bg-brand-100 shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
              <img src={phoodleLogo} alt="PHOODLE" className="w-full h-full object-cover" />
              {isPro && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-slate-900 ring-2 ring-white text-[9px] font-bold">
                  ★
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  PHOODLE
                </span>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider transition-colors ${
                  isPro 
                    ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {isPro ? 'PRO VIP' : 'FREE'}
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 font-medium -mt-0.5">
                Aesthetic Web Photobox Studio
              </p>
            </div>
          </div>

          {/* Actions & Demo Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Presentation Quick-Toggle: Demo Mode Free / Pro */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 shadow-inner">
              <span className="hidden md:inline-flex items-center gap-1 px-2 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                <Zap className="w-3 h-3 text-amber-500" /> Akun:
              </span>
              <button
                onClick={toggleTier}
                className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
                  !isPro
                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Ganti ke Akun Free"
              >
                <span>Free</span>
              </button>
              <button
                onClick={toggleTier}
                className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
                  isPro
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm shadow-amber-500/30'
                    : 'text-slate-500 hover:text-amber-700'
                }`}
                title="Ganti ke Akun Pro"
              >
                <Crown className={`w-3.5 h-3.5 ${isPro ? 'text-white fill-white' : 'text-amber-500'}`} />
                <span>Pro</span>
              </button>
            </div>

            {/* Upgrade Pro / Status Button */}
            {!isPro ? (
              <button
                onClick={onOpenSubscription}
                className="relative group overflow-hidden flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 shadow-md shadow-amber-400/25 active:scale-95 transition-all duration-200 border border-amber-300"
              >
                <Crown className="w-4 h-4 text-amber-900 fill-amber-900/40 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-extrabold text-amber-950">Upgrade Pro</span>
                <span className="hidden lg:inline text-[10px] bg-amber-500/30 text-amber-950 px-1.5 py-0.5 rounded font-semibold">
                  Rp29rb
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenSubscription}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 shadow-sm transition-all duration-200"
                title="Lihat status langganan Pro Anda"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-amber-900">Member Pro Aktif</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
