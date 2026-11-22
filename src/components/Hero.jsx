import React from 'react';
import { Camera, Upload, Sparkles, Heart, Star, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { LayoutSelector } from './LayoutSelector';
import phoodleLogo from '../assets/phoodle-logo.png';

export function Hero({
  selectedLayout,
  onSelectLayout,
  onStartCapture,
  onOpenSubscription,
  userTier,
}) {
  const isPro = userTier === 'pro';

  return (
    <section className="relative overflow-hidden pt-4 pb-10 sm:py-12 lg:py-16">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 -z-10 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, CTA Buttons, Layout Selector */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-ping"></span>
              <span className="text-xs font-extrabold text-brand-700 tracking-wide uppercase">
                Studio Photobox Digital Terfavorit
              </span>
              <span className="text-xs text-brand-300">•</span>
              <span className="text-xs font-semibold text-brand-600">Langsung dari Browser</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Photobox Estetik{' '}
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Langsung dari Browsermu
                </span>
              </h1>
              
              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Bikin foto strip estetik bareng sahabat atau pasangan kapan saja tanpa perlu antre di mall. Bebas foto ulang sampai puas, hias dengan stiker gemas dan coretan tangan, lalu unduh hasilnya secara instan.
              </p>
            </div>

            {/* Value Proposition Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Bebas Foto Ulang Sepuasnya</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Privasi 100% Aman & Terjaga</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span>Kreativitas Desain Bebas</span>
              </div>
            </div>

            {/* Layout Selector */}
            <div className="pt-2">
              <LayoutSelector
                selectedLayout={selectedLayout}
                onSelectLayout={onSelectLayout}
              />
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onStartCapture('camera')}
                className="group relative flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 active:scale-[0.98] transition-all duration-200 text-base"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span>Mulai Foto Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onStartCapture('upload')}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm hover:border-slate-400 active:scale-[0.98] transition-all duration-200 text-base"
              >
                <Upload className="w-5 h-5 text-slate-500" />
                <span>Upload dari Galeri</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Studio Mockup (Photo Strip Live Preview) */}
          <div className="lg:col-span-5 flex justify-center items-center py-4 lg:py-0">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Floating Aesthetic Stickers */}
              <div className="absolute -top-4 -left-4 z-20 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-lg rotate-[-8deg] flex items-center gap-1 animate-float">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>BESTIE VIBES</span>
              </div>

              <div className="absolute -bottom-3 -right-3 z-20 bg-rose-500 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg rotate-[6deg] flex items-center gap-1.5 animate-float" style={{ animationDelay: '1.5s' }}>
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>SURABAYA VIBES</span>
              </div>

              {/* Tape Effect on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-100/80 backdrop-blur-xs border border-amber-300/60 rotate-1 shadow-xs z-20"></div>

              {/* Main Photo Strip Card Container */}
              <div className="relative bg-white rounded-3xl p-5 shadow-2xl shadow-indigo-500/10 border-4 border-slate-100 transform rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300">
                
                {/* Header branding on strip */}
                <div className="text-center pb-3 border-b border-dashed border-slate-200">
                  <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
                    PHOODLE PHOTOBOOTH • SEOUL STYLE
                  </span>
                </div>

                {/* Simulated 3 Photos */}
                <div className="space-y-3 pt-3">
                  {/* Photo Slot 1 */}
                  <div className="relative h-28 sm:h-32 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 rounded-xl overflow-hidden border border-slate-200/80 flex items-center justify-center group">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                      alt="Sample Pose 1" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                      #01
                    </div>
                  </div>

                  {/* Photo Slot 2 */}
                  <div className="relative h-28 sm:h-32 bg-gradient-to-tr from-amber-100 via-orange-100 to-rose-100 rounded-xl overflow-hidden border border-slate-200/80 flex items-center justify-center group">
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" 
                      alt="Sample Pose 2" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                      #02
                    </div>
                  </div>

                  {/* Photo Slot 3 */}
                  <div className="relative h-28 sm:h-32 bg-gradient-to-tr from-blue-100 via-teal-100 to-emerald-100 rounded-xl overflow-hidden border border-slate-200/80 flex items-center justify-center group">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" 
                      alt="Sample Pose 3" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                      #03
                    </div>
                  </div>
                </div>

                {/* Strip Footer / Date */}
                <div className="pt-3.5 pb-1 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="font-mono tracking-wider">NOV 2026</span>
                  <span className="text-brand-600 font-extrabold flex items-center gap-1">
                    <img src={phoodleLogo} alt="PHOODLE" className="w-4 h-4 rounded-sm object-cover" /> PHOODLE.ID
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
