import React from 'react';
import { Hero } from '../components/Hero';
import { FrameCatalog } from '../components/FrameCatalog';
import { Camera, Palette, Download, Sparkles, Smile, ShieldCheck, Heart } from 'lucide-react';
import phoodleLogo from '../assets/phoodle-logo.png';

export function Home({
  selectedLayout,
  setSelectedLayout,
  selectedFrameId,
  setSelectedFrameId,
  userTier,
  onStartCapture,
  onOpenSubscription,
  showToast,
}) {
  const handleSelectFrame = (id) => {
    setSelectedFrameId(id);
    showToast('✨ Pilihan bingkai berhasil diterapkan! Siap untuk sesi fotomu.', 'success');
  };

  return (
    <div className="flex-1 flex flex-col overscroll-none">
      {/* 1. Hero Section + Layout Selector */}
      <Hero
        selectedLayout={selectedLayout}
        onSelectLayout={setSelectedLayout}
        onStartCapture={onStartCapture}
        onOpenSubscription={onOpenSubscription}
        userTier={userTier}
      />

      {/* 2. Cara Kerja: 3 Langkah Mudah */}
      <section className="py-14 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-3 border border-brand-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Praktis & Instan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              3 Langkah Mudah Menuju Foto Estetik
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Nikmati keseruan studio photobox langsung dari genggamanmu tanpa perlu mengantre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform shadow-xs">
                <Camera className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-extrabold text-brand-600 uppercase tracking-widest mb-1">Langkah 1</span>
              <h4 className="font-extrabold text-base text-slate-900 mb-2">Pilih Format & Pose</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pilih format 3 pose, 4 pose, atau kolase 2x2. Ambil foto langsung dengan hitung mundur otomatis atau unggah momen manis dari galerimu.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform shadow-xs">
                <Palette className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-extrabold text-purple-600 uppercase tracking-widest mb-1">Langkah 2</span>
              <h4 className="font-extrabold text-base text-slate-900 mb-2">Hias Sesuka Hatimu</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ekspresikan kepribadianmu lewat puluhan stiker gemas, coretan kuas warna pastel, dan pilihan bingkai bertema vintage hingga modern.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform shadow-xs">
                <Download className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest mb-1">Langkah 3</span>
              <h4 className="font-extrabold text-base text-slate-900 mb-2">Simpan & Bagikan</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Unduh strip fotomu dalam resolusi jernih maksimal. Siap diposting ke Instagram Story, TikTok, atau dicetak sebagai kenang-kenangan!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Catalog Preview Section */}
      <FrameCatalog
        selectedFrameId={selectedFrameId}
        onSelectFrame={handleSelectFrame}
        userTier={userTier}
        onOpenSubscription={onOpenSubscription}
      />

      {/* 4. Elegant Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl overflow-hidden shadow-md shadow-brand-500/30">
                <img src={phoodleLogo} alt="PHOODLE" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-white font-black tracking-tight text-lg">PHOODLE</span>
                <span className="text-xs text-slate-400 block -mt-0.5">Studio Photobox Digital Estetik</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Privasi 100% Aman & Terjaga
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-300">
                Bebas Pakai Langsung dari Browser
              </span>
            </div>

            <p className="text-xs text-slate-400 text-center md:text-right leading-relaxed">
              © 2026 PHOODLE. Abadikan setiap senyum dan momen terbaikmu.
            </p>

          </div>
        </div>
      </footer>
    </div>
  );
}
