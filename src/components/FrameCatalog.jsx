import React, { useState } from 'react';
import { Crown, Check, Sparkles, Lock, ArrowUpRight, Palette } from 'lucide-react';
import { FRAME_TEMPLATES } from '../data/mockData';

export function FrameCatalog({
  selectedFrameId,
  onSelectFrame,
  userTier,
  onOpenSubscription,
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const isPro = userTier === 'pro';

  const filterTabs = [
    { id: 'All', label: 'Semua Koleksi' },
    { id: 'free', label: 'Koleksi Gratis' },
    { id: 'pro', label: 'Koleksi Premium Pro' },
  ];

  const filteredFrames = activeFilter === 'All'
    ? FRAME_TEMPLATES
    : FRAME_TEMPLATES.filter((f) => f.tier === activeFilter);

  const handleFrameClick = (frame) => {
    if (frame.tier === 'pro' && !isPro) {
      onOpenSubscription();
    } else {
      onSelectFrame(frame.id);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-100/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Inspirasi Gaya Foto</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pilihan Desain Bingkai Estetik
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Temukan berbagai tema bingkai pilihan untuk melengkapi setiap momen manismu, mulai dari gaya minimalis modern hingga retro vintage.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/90'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Frames Grid: 1 col on mobile, 2 on sm, 3 on md, 5 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {filteredFrames.map((frame) => {
            const isSelected = selectedFrameId === frame.id;
            const isLocked = frame.tier === 'pro' && !isPro;

            return (
              <div
                key={frame.id}
                onClick={() => handleFrameClick(frame)}
                className={`group relative flex flex-col justify-between rounded-3xl p-3.5 transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-brand-500 shadow-xl shadow-brand-500/15 ring-2 ring-brand-500/30 -translate-y-1'
                    : isLocked
                    ? 'bg-white/90 border-slate-200/90 hover:border-amber-300 hover:shadow-lg'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Top Badges */}
                <div className="flex items-center justify-between mb-2.5 z-10">
                  {frame.tier === 'pro' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-xs">
                      <Crown className="w-3 h-3 fill-slate-950" />
                      PRO VIP
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      GRATIS
                    </span>
                  )}

                  {isSelected ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                      <Check className="w-3 h-3 stroke-[3]" /> Sedang Dipakai
                    </span>
                  ) : isLocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Lock className="w-3 h-3" /> Eksklusif Pro
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">
                      {frame.category}
                    </span>
                  )}
                </div>

                {/* Frame Preview Card */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner flex items-center justify-center p-2 bg-slate-50 group-hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={frame.svgDataUrl}
                    alt={frame.name}
                    className="w-full h-full object-contain drop-shadow-sm select-none"
                  />

                  {/* Lock Overlay for Pro Template when user is Free */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-3 text-center">
                      <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg mb-1.5">
                        <Crown className="w-4 h-4 fill-slate-950" />
                      </div>
                      <span className="text-[11px] font-black tracking-wide">Koleksi Eksklusif Pro</span>
                      <span className="text-[9px] text-amber-200 mt-0.5">Klik untuk Buka Akses</span>
                    </div>
                  )}
                </div>

                {/* Frame Info & Action Button */}
                <div className="mt-3 pt-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                    {frame.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {frame.description}
                  </p>

                  <div className="mt-2.5">
                    {isLocked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenSubscription();
                        }}
                        className="w-full py-1.5 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
                        <span>Buka Akses Pro</span>
                        <ArrowUpRight className="w-3 h-3 text-amber-600" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFrame(frame.id);
                        }}
                        className={`w-full py-1.5 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors ${
                          isSelected
                            ? 'bg-brand-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Gaya Aktif</span>
                          </>
                        ) : (
                          <span>Gunakan Bingkai Ini</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
