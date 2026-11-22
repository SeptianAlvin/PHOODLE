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
    <header className="sticky top-0 z-40 w-full flex-none bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-18 gap-1 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden bg-brand-100 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img src={phoodleLogo} alt="PHOODLE" className="w-full h-full object-cover" />
              {isPro && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-amber-400 text-slate-900 ring-2 ring-white text-[8px] sm:text-[9px] font-bold">
                  ★
                </span>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-base sm:text-2xl font-black tracking-tight bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  PHOODLE
                </span>
                <span className={`text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider transition-colors ${
                  isPro 
                    ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {isPro ? 'PRO' : 'FREE'}
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400 font-medium -mt-0.5">
                Aesthetic Web Photobox Studio
              </p>
            </div>
          </div>

          {/* Actions & Switcher: Compact Single Pill on Mobile (< sm), Spacious on Desktop */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            
            {/* MOBILE ONLY (< sm): Single compact pill for Free/Pro status & toggle */}
            <div className="flex sm:hidden items-center bg-slate-100/90 p-0.5 rounded-full border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={toggleTier}
                className={`px-2 py-1 rounded-full text-[10px] font-extrabold transition-all active:scale-95 ${
                  !isPro
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-400'
                }`}
                title="Beralih ke Free"
              >
                Free
              </button>
              <button
                type="button"
                onClick={toggleTier}
                className={`flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-black transition-all active:scale-95 ${
                  isPro
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-xs'
                    : 'text-amber-700 font-bold'
                }`}
                title="Beralih ke Pro"
              >
                <Crown className="w-2.5 h-2.5 fill-current" />
                <span>Pro</span>
              </button>
            </div>

            {/* DESKTOP ONLY (sm:flex): Standard Full Demo Switcher & Button */}
            <div className="hidden sm:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 shadow-inner">
              <span className="hidden md:inline-flex items-center gap-1 px-2 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                <Zap className="w-3 h-3 text-amber-500" /> Akun:
              </span>
              <button
                type="button"
                onClick={toggleTier}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
                  !isPro
                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Ganti ke Akun Free"
              >
                <span>Free</span>
              </button>
              <button
                type="button"
                onClick={toggleTier}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
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

            {/* DESKTOP ONLY (sm:flex): Upgrade Pro / Status Button */}
            {!isPro ? (
              <button
                type="button"
                onClick={onOpenSubscription}
                className="hidden sm:flex relative group overflow-hidden items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 shadow-md shadow-amber-400/25 active:scale-95 transition-all duration-200 border border-amber-300"
              >
                <Crown className="w-4 h-4 text-amber-900 fill-amber-900/40 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-extrabold text-amber-950">Upgrade Pro</span>
                <span className="hidden lg:inline text-[10px] bg-amber-500/30 text-amber-950 px-1.5 py-0.5 rounded font-semibold">
                  Rp29rb
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenSubscription}
                className="hidden sm:flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 shadow-sm transition-all duration-200"
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
