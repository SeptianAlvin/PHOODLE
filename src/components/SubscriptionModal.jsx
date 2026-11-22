import React from 'react';
import { X, Check, Crown, Sparkles, Zap, Shield, ArrowRight, HeartHandshake } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import confetti from 'canvas-confetti';

export function SubscriptionModal({
  isOpen,
  onClose,
  userTier,
  setUserTier,
  showToast,
}) {
  if (!isOpen) return null;

  const isPro = userTier === 'pro';

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#6366F1', '#EC4899', '#10B981'],
      });
    } catch {
      // fallback safe
    }
  };

  const handleActivatePro = () => {
    setUserTier('pro');
    triggerConfetti();
    onClose();
    showToast('🎉 Selamat datang di Pro Member! Seluruh bingkai eksklusif & fitur studio telah terbuka.', 'success');
  };

  const handleDowngradeFree = () => {
    setUserTier('free');
    onClose();
    showToast('ℹ️ Akun dialihkan ke paket Free Member.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-none bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Banner */}
        <div className="relative bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 p-6 sm:p-8 text-white text-center overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border-2 border-white/30 bg-white/10 p-0.5">
              <img src="/phoodle-logo.png" alt="PHOODLE" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pilihan Paket Eksklusif</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tingkatkan Pengalaman Photobox-mu
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto mt-2 leading-relaxed">
            Dapatkan akses penuh ke seluruh koleksi bingkai premium, stiker eksklusif, serta unduhan jernih beresolusi tinggi tanpa watermark.
          </p>
        </div>

        {/* Modal Content - Plans Grid */}
        <div className="p-4 sm:p-8 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Plan 1: Free Member */}
            <div className={`relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-200 ${
              !isPro 
                ? 'bg-white border-brand-500 shadow-md ring-2 ring-brand-500/20' 
                : 'bg-white border-slate-200 shadow-sm opacity-90'
            }`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {SUBSCRIPTION_PLANS.free.badge}
                  </span>
                  {!isPro && (
                    <span className="text-[11px] font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                      Paket Aktif Saat Ini
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {SUBSCRIPTION_PLANS.free.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">{SUBSCRIPTION_PLANS.free.price}</span>
                  <span className="text-xs font-semibold text-slate-500">{SUBSCRIPTION_PLANS.free.period}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Pilihan pas untuk foto seru sehari-hari dengan fitur photobox standar.
                </p>

                {/* Features list */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
                  {SUBSCRIPTION_PLANS.free.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      {feat.included ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5" />
                        </div>
                      )}
                      <span className={feat.included ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}>
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-4">
                {isPro ? (
                  <button
                    onClick={handleDowngradeFree}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Gunakan Paket Free
                  </button>
                ) : (
                  <div className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-500 bg-slate-100 text-center">
                    ✓ Sedang Digunakan
                  </div>
                )}
              </div>
            </div>

            {/* Plan 2: Pro Member VIP */}
            <div className={`relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-200 ${
              isPro
                ? 'bg-amber-50/50 border-amber-400 shadow-xl ring-2 ring-amber-400/40'
                : 'bg-white border-amber-300 shadow-lg hover:border-amber-400'
            }`}>
              {/* Highlight Ribbon */}
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Crown className="w-3 h-3 fill-slate-950" />
                <span>Paling Diminati</span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {SUBSCRIPTION_PLANS.pro.badge}
                  </span>
                  {isPro && (
                    <span className="text-[11px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      ★ Status Pro Aktif
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-900 mt-2 flex items-center gap-1.5">
                  <span>{SUBSCRIPTION_PLANS.pro.name}</span>
                </h3>
                
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-amber-600">{SUBSCRIPTION_PLANS.pro.price}</span>
                  <span className="text-xs font-semibold text-slate-500">{SUBSCRIPTION_PLANS.pro.period}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Akses tak terbatas ke seluruh fitur studio terbaik untuk konten kreator, mahasiswa, dan momen spesialmu.
                </p>

                {/* Features list */}
                <div className="mt-6 pt-4 border-t border-amber-200/60 space-y-2.5">
                  {SUBSCRIPTION_PLANS.pro.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <div className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-slate-800 font-semibold">
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activation CTA Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={handleActivatePro}
                  className="w-full py-3.5 px-4 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 shadow-md shadow-amber-400/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4 fill-slate-950" />
                  <span>{isPro ? 'Perbarui Akses Pro' : 'Mulai Akses Pro Sekarang'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  ✨ Akses instan langsung aktif dalam satu klik praktis.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-brand-600" />
            <span>Jaminan kepuasan • <strong>Dapat dibatalkan kapan saja tanpa komitmen</strong></span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-semibold px-2 py-1"
          >
            Tutup Jendela
          </button>
        </div>

      </div>
    </div>
  );
}
