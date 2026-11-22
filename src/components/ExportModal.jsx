import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  Crown,
  Lock,
  Loader2,
  Type,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { renderFinalPhotoStrip } from '../utils/photoCompositor';

export function ExportModal({
  isOpen,
  onClose,
  imageUrl,
  userTier,
  onNewSession,
  showToast,
  canvasInstance,
  selectedLayout,
  capturedPhotos,
  currentFrame,
  fabricCanvas,
  onOpenSubscription,
}) {
  const [selectedFormat, setSelectedFormat] = useState('png'); // 'png' | 'jpeg'
  const [isDownloading, setIsDownloading] = useState(false);

  const isPro = userTier === 'pro';
  // State Hapus Watermark: default true jika status akun Pro, dan false jika status akun Free
  const [removeWatermark, setRemoveWatermark] = useState(isPro);
  const [customFooterText, setCustomFooterText] = useState('');
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState(imageUrl);
  const [currentCanvas, setCurrentCanvas] = useState(canvasInstance);
  const [isReRendering, setIsReRendering] = useState(false);

  // Sinkronkan imageUrl & canvasInstance saat modal pertama kali dibuka atau URL berubah
  useEffect(() => {
    if (imageUrl) {
      setCurrentPreviewUrl(imageUrl);
    }
    if (canvasInstance) {
      setCurrentCanvas(canvasInstance);
    }
  }, [imageUrl, canvasInstance]);

  // Re-render strip helper function
  const executeReRender = async (isWatermarkRemoved, customText) => {
    if (!currentFrame || !capturedPhotos || !isOpen) return;

    setIsReRendering(true);
    try {
      const result = await renderFinalPhotoStrip({
        selectedLayout,
        capturedPhotos,
        currentFrame,
        fabricCanvas,
        userTier,
        multiplier: 2,
        showWatermark: !isWatermarkRemoved,
        customFooterText: isWatermarkRemoved ? customText : '',
      });

      setCurrentPreviewUrl(result.dataUrl);
      setCurrentCanvas(result.canvas);
    } catch (err) {
      console.error('Gagal memperbarui pratinjau:', err);
    } finally {
      setIsReRendering(false);
    }
  };

  // Sinkronkan otomatis setiap kali user mengganti status Free/Pro melalui tombol Demo Mode
  useEffect(() => {
    const isNowPro = userTier === 'pro';
    setRemoveWatermark(isNowPro);
    if (isOpen) {
      executeReRender(isNowPro, isNowPro ? customFooterText : '');
    }
  }, [userTier]);

  // Debounced re-render saat user Pro mengetik Teks Bawah Frame kustom
  useEffect(() => {
    if (!isPro || !removeWatermark || !isOpen) return;
    const timer = setTimeout(() => {
      executeReRender(removeWatermark, customFooterText);
    }, 350);
    return () => clearTimeout(timer);
  }, [customFooterText]);

  if (!isOpen || (!imageUrl && !currentPreviewUrl)) return null;

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#F59E0B', '#EC4899', '#10B981'],
      });
    } catch {
      // Audio or canvas fallback safe
    }
  };

  // Handle klik sakelar "Hapus Watermark"
  const handleToggleRemoveWatermark = () => {
    if (!isPro) {
      // Jika status akun masih FREE: sakelar tidak boleh aktif, dan saat diklik langsung buka Modal Paket Langganan Pro
      if (onOpenSubscription) {
        onOpenSubscription();
      }
      showToast('👑 Fitur Hapus Watermark khusus untuk Pro Member! Upgrade untuk membuka akses.', 'info');
      return;
    }

    // Jika status akun PRO: user bebas mengaktifkan/menonaktifkan sakelar ini
    const nextState = !removeWatermark;
    setRemoveWatermark(nextState);
    executeReRender(nextState, customFooterText);

    if (nextState) {
      showToast('✨ Watermark berhasil dihapus dari bingkai foto.', 'success');
    } else {
      showToast('ℹ️ Watermark "Made with PHOODLE" ditampilkan kembali.', 'info');
    }
  };

  // Generate appropriate format data URL from composite canvas
  const getDownloadUrl = () => {
    if (selectedFormat === 'png') {
      return currentPreviewUrl || imageUrl;
    }
    const canvasToExport = currentCanvas || canvasInstance;
    if (canvasToExport && canvasToExport.toDataURL) {
      return canvasToExport.toDataURL('image/jpeg', 0.95);
    }
    return currentPreviewUrl || imageUrl;
  };

  // Trigger file download to device
  const handleDownload = () => {
    setIsDownloading(true);
    try {
      const finalUrl = getDownloadUrl();
      const extension = selectedFormat === 'jpeg' ? 'jpg' : 'png';
      const fileName = `phoodle-strip.${extension}`;

      const link = document.createElement('a');
      link.download = fileName;
      link.href = finalUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      triggerConfetti();
      showToast('🎉 Foto strip estetik berhasil tersimpan di perangkatmu!', 'success');
    } catch (err) {
      console.warn('Download fallback needed:', err);
      showToast('ℹ️ Pengguna iPhone: Tekan & tahan gambar untuk menyimpan ke galeri.', 'info');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-none bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col md:flex-row max-h-[92dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Tutup Pratinjau"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT / TOP: Final Photo Strip Preview Viewport */}
        <div className="w-full md:w-1/2 bg-slate-100/90 p-4 sm:p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto">
          
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Pratinjau Gambar Final
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Ultra-HD (2x)
            </span>
          </div>

          {/* Rendered Merged Photo Strip Image with Re-render Loader */}
          <div className="relative max-h-[46dvh] md:max-h-[58dvh] flex items-center justify-center my-auto p-1 w-full">
            <img
              src={currentPreviewUrl || imageUrl}
              alt="Hasil Akhir PHOODLE Photobooth"
              className="max-h-[44dvh] md:max-h-[56dvh] w-auto rounded-2xl shadow-xl border border-slate-300 object-contain drop-shadow-md select-auto transition-opacity duration-200"
            />

            {/* Spinner saat re-rendering strip */}
            {isReRendering && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center rounded-2xl z-10 transition-all">
                <Loader2 className="w-8 h-8 text-brand-600 animate-spin mb-1.5" />
                <span className="text-xs font-bold text-slate-700">Memperbarui Pratinjau...</span>
              </div>
            )}
          </div>

          {/* iOS Safari Fallback Note */}
          <div className="w-full mt-3 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2 shadow-xs">
            <Smartphone className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <p>
              <strong>Pengguna iOS/iPhone:</strong> bisa juga <em>tekan & tahan gambar di atas</em>, lalu pilih <strong>"Simpan ke Foto"</strong> untuk menyimpan langsung ke galeri.
            </p>
          </div>

        </div>

        {/* RIGHT / BOTTOM: Export Options & Actions */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto bg-white">
          
          <div>
            {/* Header info */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-200">
                <img src="/phoodle-logo.png" alt="PHOODLE" className="w-full h-full object-cover" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Karya Estetikmu Siap Dipamerkan!</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Momen Manismu Selesai Dibuat
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Strip foto resolusi tinggi telah siap untuk disimpan ke perangkatmu. Bagikan keseruan ini ke Instagram Story atau cetak sebagai kenang-kenangan!
            </p>

            {/* Quality Specs Pill */}
            <div className="my-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-700">
                <span>Tema Bingkai:</span>
                <span className="font-extrabold text-slate-900 flex items-center gap-1">
                  {isPro ? (
                    <>
                      <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      Koleksi Eksklusif Pro
                    </>
                  ) : (
                    'Koleksi PHOODLE Studio'
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between font-semibold text-slate-700">
                <span>Status Watermark:</span>
                <span className="font-bold flex items-center gap-1">
                  {removeWatermark && isPro ? (
                    <span className="text-emerald-600 font-extrabold">Bersih (Tanpa Watermark)</span>
                  ) : (
                    <span className="text-slate-600 font-medium">"Made with PHOODLE"</span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between font-semibold text-slate-700">
                <span>Kualitas Gambar:</span>
                <span className="font-bold text-emerald-600">Ultra-HD Tajam & Jernih</span>
              </div>
            </div>

            {/* Format Selector: PNG vs JPG */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Pilih Format File:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFormat('png')}
                  className={`p-2.5 rounded-2xl border text-left transition-all ${
                    selectedFormat === 'png'
                      ? 'bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">PNG</span>
                    <span className="text-[9px] font-extrabold bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded">
                      Rekomendasi
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Kualitas jernih maksimal</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('jpeg')}
                  className={`p-2.5 rounded-2xl border text-left transition-all ${
                    selectedFormat === 'jpeg'
                      ? 'bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">JPG</span>
                    <span className="text-[9px] font-extrabold text-slate-400">Standar</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Ukuran file hemat</p>
                </button>
              </div>
            </div>

            {/* KONTROL "HAPUS WATERMARK" KHUSUS PRO (Tepat di atas tombol Download Foto) */}
            <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200/90 shadow-xs transition-all">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                      Hapus Watermark
                    </span>
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-xs">
                      <Crown className="w-3 h-3 fill-slate-950" />
                      PRO
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {removeWatermark && isPro
                      ? 'Watermark "Made with PHOODLE" dihilangkan dari bingkai.'
                      : 'Hilangkan watermark "Made with PHOODLE" dari bingkai.'}
                  </p>
                </div>

                {/* Sakelar / Toggle Switch */}
                <button
                  type="button"
                  onClick={handleToggleRemoveWatermark}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    removeWatermark && isPro
                      ? 'bg-amber-500 shadow-sm shadow-amber-500/40'
                      : 'bg-slate-300'
                  }`}
                  role="switch"
                  aria-checked={removeWatermark && isPro}
                  title={
                    isPro
                      ? removeWatermark
                        ? 'Klik untuk tampilkan watermark'
                        : 'Klik untuk hapus watermark'
                      : 'Upgrade ke Pro untuk menghapus watermark'
                  }
                >
                  <span className="sr-only">Hapus Watermark</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                      removeWatermark && isPro ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    {!isPro ? (
                      <Lock className="w-3 h-3 text-slate-400" />
                    ) : removeWatermark ? (
                      <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
                    ) : null}
                  </span>
                </button>
              </div>

              {/* Kolom input kecil "Teks Bawah Frame (Opsional)" - Hanya aktif ketika removeWatermark === true (khusus Pro) */}
              {removeWatermark && isPro && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/80 animate-fade-in">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                      <Type className="w-3 h-3 text-amber-600" />
                      <span>Teks Bawah Frame (Opsional):</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {customFooterText.length}/32
                    </span>
                  </div>
                  <input
                    type="text"
                    value={customFooterText}
                    onChange={(e) => setCustomFooterText(e.target.value)}
                    placeholder="Contoh: Besties Forever • 2026"
                    maxLength={32}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs text-slate-800 placeholder-slate-400 transition-all bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    💡 Teks kustom ini akan menggantikan posisi watermark di bawah bingkai.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            
            {/* Primary Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading || isReRendering}
              className="w-full py-3.5 px-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-lg shadow-brand-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              <span>Download Foto ({selectedFormat.toUpperCase()})</span>
            </button>

            {/* Secondary Buttons Row: Kembali Edit & Buat Foto Baru */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali Edit</span>
              </button>

              <button
                type="button"
                onClick={onNewSession}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-transparent hover:border-rose-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                title="Hapus foto saat ini dan mulai sesi foto baru dari awal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Buat Foto Baru</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
