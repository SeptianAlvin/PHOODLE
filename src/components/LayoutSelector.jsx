import React from 'react';
import { Check, Sparkles, LayoutGrid } from 'lucide-react';
import { PHOTO_LAYOUTS } from '../data/mockData';

export function LayoutSelector({ selectedLayout, onSelectLayout }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-brand-600" />
            Pilih Format Strip Foto
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Tentukan jumlah pose sebelum memulai sesi jepretan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {PHOTO_LAYOUTS.map((layout) => {
          const isSelected = selectedLayout === layout.id;

          return (
            <button
              key={layout.id}
              onClick={() => onSelectLayout(layout.id)}
              className={`group relative text-left p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 border flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-brand-50/80 border-brand-500 shadow-md shadow-brand-500/10 ring-2 ring-brand-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 shadow-xs'
              }`}
            >
              {/* Top Badge & Check Indicator */}
              <div className="flex items-center justify-between w-full mb-1 sm:mb-2.5">
                <span
                  className={`text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isSelected
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {layout.shortName}
                </span>

                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'border border-slate-300 text-transparent'
                  }`}
                >
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                </div>
              </div>

              {/* Visual Strip Diagram */}
              <div className="my-1 sm:my-2 py-1 flex justify-center items-center">
                {layout.id === 'strip-3' && (
                  <div className="w-8 sm:w-12 h-14 sm:h-20 bg-slate-100 rounded-md sm:rounded-lg p-0.5 sm:p-1 border border-slate-200/80 shadow-inner flex flex-col justify-between gap-0.5 sm:gap-1 group-hover:scale-105 transition-transform">
                    <div className="flex-1 bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                    <div className="flex-1 bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                    <div className="flex-1 bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                  </div>
                )}

                {layout.id === 'strip-4' && (
                  <div className="w-8 sm:w-12 h-16 sm:h-24 bg-slate-100 rounded-md sm:rounded-lg p-0.5 sm:p-1 border border-slate-200/80 shadow-inner flex flex-col justify-between gap-0.5 group-hover:scale-105 transition-transform">
                    <div className="flex-1 bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                    <div className="flex-1 bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                    <div className="flex-1 bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                    <div className="flex-1 bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                  </div>
                )}

                {layout.id === 'grid-2x2' && (
                  <div className="w-11 sm:w-16 h-11 sm:h-16 bg-slate-100 rounded-md sm:rounded-lg p-0.5 sm:p-1 border border-slate-200/80 shadow-inner grid grid-cols-2 gap-0.5 sm:gap-1 group-hover:scale-105 transition-transform">
                    <div className="bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                    <div className="bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                    <div className="bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                    <div className="bg-white rounded-xs sm:rounded border border-slate-200 shadow-xs"></div>
                  </div>
                )}
              </div>

              {/* Title & Desc */}
              <div className="mt-1 w-full text-center sm:text-left">
                <div className="font-extrabold text-[11px] sm:text-sm text-slate-800 group-hover:text-brand-600 transition-colors truncate">
                  <span className="sm:hidden">{layout.shortName}</span>
                  <span className="hidden sm:inline">{layout.name}</span>
                </div>
                <div className="hidden sm:block text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                  {layout.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
