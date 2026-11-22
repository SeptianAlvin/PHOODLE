import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import {
  ArrowLeft,
  Undo2,
  Trash2,
  RotateCcw,
  Download,
  Palette,
  Sparkles,
  Layers,
  Crown,
  Lock,
  Brush,
  Smile,
  X,
  ChevronDown,
  Check,
  Loader2,
} from 'lucide-react';
import { FRAME_TEMPLATES, PHOTO_LAYOUTS } from '../data/mockData';
import { STICKER_ITEMS, DOODLE_PALETTE } from '../components/Editor/StickersData';
import { ExportModal } from '../components/ExportModal';
import {
  createTransparentFrameCanvas,
  renderFinalPhotoStrip,
  getLayoutSlots,
} from '../utils/photoCompositor';

export function Editor({
  selectedLayout,
  capturedPhotos,
  selectedFrameId,
  setSelectedFrameId,
  userTier,
  onNavigate,
  onOpenSubscription,
  showToast,
  onNewSession,
}) {
  const isPro = userTier === 'pro';

  // Active Tool Tab: 'frame' | 'doodle' | 'sticker'
  const [activeTab, setActiveTab] = useState('doodle');
  // For mobile bottom drawer toggle
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(true);

  // Doodle Drawing Controls
  const [isDrawing, setIsDrawing] = useState(true);
  const [brushColor, setBrushColor] = useState('#0F172A');
  const [brushWidth, setBrushWidth] = useState(6);

  // Active selection state
  const [hasActiveSelection, setHasActiveSelection] = useState(false);

  // Undo history stack
  const historyStackRef = useRef([]);

  // Export Modal states
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportImageUrl, setExportImageUrl] = useState(null);
  const [finalExportCanvas, setFinalExportCanvas] = useState(null);
  const [isCompositing, setIsCompositing] = useState(false);

  // Canvas DOM refs & Fabric Canvas instance
  const canvasElRef = useRef(null);
  const containerRef = useRef(null);
  const fabricRef = useRef(null);
  const [zoomScale, setZoomScale] = useState(0.4);

  // Dimensions based on layout
  const layoutConfig = PHOTO_LAYOUTS.find((l) => l.id === selectedLayout) || PHOTO_LAYOUTS[0];
  const isGrid = selectedLayout === 'grid-2x2';
  const isStrip4 = selectedLayout === 'strip-4';

  const baseWidth = isGrid ? 1000 : 600;
  const baseHeight = isGrid ? 1200 : isStrip4 ? 2000 : 1800;

  // Active frame template (default to classic white if not found)
  const currentFrame = FRAME_TEMPLATES.find((f) => f.id === selectedFrameId) || FRAME_TEMPLATES[0];

  // Configure Canva-like control handle styling
  useEffect(() => {
    fabric.Object.prototype.set({
      cornerColor: '#6366F1',
      cornerStyle: 'circle',
      borderColor: '#6366F1',
      cornerSize: 14,
      transparentCorners: false,
      borderScaleFactor: 2,
      borderDashArray: [4, 4],
      padding: 6,
    });
  }, []);

  // Compute Slot Coordinates based on selectedLayout
  const getSlotsConfig = useCallback(() => {
    return getLayoutSlots(selectedLayout);
  }, [selectedLayout]);

  // Adjust zoom to fit the workspace container
  const updateCanvasZoom = useCallback(() => {
    if (!containerRef.current || !fabricRef.current) return;
    const container = containerRef.current;
    const availableWidth = container.clientWidth - (window.innerWidth >= 768 ? 48 : 24);
    const availableHeight = container.clientHeight - (window.innerWidth >= 768 ? 48 : 24);

    const scaleW = availableWidth / baseWidth;
    const scaleH = availableHeight / baseHeight;
    const scale = Math.min(scaleW, scaleH, 1);

    setZoomScale(scale);
    fabricRef.current.setDimensions({
      width: baseWidth * scale,
      height: baseHeight * scale,
    });
    fabricRef.current.setZoom(scale);
  }, [baseWidth, baseHeight]);

  // Render Frame & Photos (Layers 1 & 2)
  const renderFrameAndPhotos = useCallback(async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // 1. Simpan dekorasi (Layer 3: Doodle & Stiker) sebelum render ulang
    const existingDecorations = [];
    const allObjects = [...canvas.getObjects()];

    allObjects.forEach((obj) => {
      if (obj.customType === 'doodle' || obj.customType === 'sticker') {
        existingDecorations.push(obj);
      }
      canvas.remove(obj);
    });

    const slots = getSlotsConfig();

    // 2. LAYER 1: Muat & Tempatkan Foto Pengguna (Paling Bawah)
    const photoPromises = slots.map((slot, index) => {
      const photoSrc = capturedPhotos[index];
      if (!photoSrc) return Promise.resolve(null);

      return new Promise((resolve) => {
        fabric.Image.fromURL(photoSrc, (img) => {
          if (!img) return resolve(null);

          const scaleX = slot.width / img.width;
          const scaleY = slot.height / img.height;
          const scale = Math.max(scaleX, scaleY);
          img.scale(scale);

          const clipRect = new fabric.Rect({
            left: slot.x,
            top: slot.y,
            width: slot.width,
            height: slot.height,
            rx: 16,
            ry: 16,
            absolutePositioned: true,
          });

          img.set({
            left: slot.x + (slot.width - img.width * scale) / 2,
            top: slot.y + (slot.height - img.height * scale) / 2,
            clipPath: clipRect,
            selectable: false,
            evented: false,
            customType: 'photo',
          });

          canvas.add(img);
          canvas.sendToBack(img);
          resolve(img);
        });
      });
    });

    await Promise.all(photoPromises);

    // 3. LAYER 2: Overlay Frame PHOODLE dengan lubang transparan
    // Watermark "Made with PHOODLE" dirender menyatu dalam lapisan bingkai (bukan objek Fabric terpisah)
    const showWatermarkInEditor = userTier !== 'pro';
    const frameCanvas = createTransparentFrameCanvas(
      currentFrame,
      slots,
      baseWidth,
      baseHeight,
      userTier,
      showWatermarkInEditor,
      ''
    );

    const frameImg = new fabric.Image(frameCanvas, {
      left: 0,
      top: 0,
      selectable: false,
      evented: false,
      customType: 'frame',
    });

    canvas.add(frameImg);

    // 4. LAYER 3: Kembalikan Coretan Doodle & Stiker ke posisi paling atas
    existingDecorations.forEach((dec) => {
      canvas.add(dec);
      canvas.bringToFront(dec);
    });

    canvas.renderAll();
  }, [baseWidth, baseHeight, currentFrame, capturedPhotos, getSlotsConfig, userTier]);

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasElRef.current) return;

    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: baseWidth,
      height: baseHeight,
      backgroundColor: '#FFFFFF',
      selection: true,
      preserveObjectStacking: true,
    });

    fabricRef.current = canvas;

    // Freehand drawing brush settings
    canvas.isDrawingMode = isDrawing;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushWidth;

    // Track path creation for undo history and Layer 3 tagging
    canvas.on('path:created', (opt) => {
      if (opt.path) {
        opt.path.customType = 'doodle';
        historyStackRef.current.push(opt.path);
      }
    });

    // Selection events
    canvas.on('selection:created', () => setHasActiveSelection(true));
    canvas.on('selection:updated', () => setHasActiveSelection(true));
    canvas.on('selection:cleared', () => setHasActiveSelection(false));

    // Keyboard Delete / Backspace support for active sticker
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && canvas.getActiveObject()) {
        const active = canvas.getActiveObject();
        if (active.customType === 'sticker' || active.customType === 'doodle') {
          canvas.remove(active);
          canvas.discardActiveObject();
          canvas.renderAll();
          setHasActiveSelection(false);
          showToast('🗑️ Hiasan berhasil dihapus.', 'info');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initial render
    renderFrameAndPhotos();
    updateCanvasZoom();

    // Resize listener
    window.addEventListener('resize', updateCanvasZoom);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateCanvasZoom);
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []); // Run on mount

  // Sync Frame & Layout Changes
  useEffect(() => {
    renderFrameAndPhotos();
    updateCanvasZoom();
  }, [selectedFrameId, userTier, renderFrameAndPhotos, updateCanvasZoom]);

  // Update Drawing Brush State
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !canvas.freeDrawingBrush) return;

    canvas.isDrawingMode = isDrawing;
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushWidth;
  }, [isDrawing, brushColor, brushWidth]);

  // Handle Tab Change
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    setIsMobileDrawerOpen(true);
    const canvas = fabricRef.current;
    if (!canvas) return;

    if (tab === 'doodle') {
      setIsDrawing(true);
      canvas.isDrawingMode = true;
    } else {
      setIsDrawing(false);
      canvas.isDrawingMode = false;
    }
  };

  // Add Sticker to Canvas (Layer 3)
  const handleAddSticker = (stickerItem) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    setIsDrawing(false);
    canvas.isDrawingMode = false;

    fabric.loadSVGFromString(stickerItem.svg, (objects, options) => {
      const stickerGroup = fabric.util.groupSVGElements(objects, options);

      const jitterX = (Math.random() - 0.5) * 80;
      const jitterY = (Math.random() - 0.5) * 80;

      stickerGroup.set({
        left: baseWidth / 2 - (stickerGroup.width || 100) / 2 + jitterX,
        top: baseHeight / 2 - (stickerGroup.height || 100) / 2 + jitterY,
        customType: 'sticker',
      });

      if (stickerItem.isText) {
        stickerGroup.scaleToWidth(260);
      } else {
        stickerGroup.scaleToWidth(140);
      }

      canvas.add(stickerGroup);
      canvas.bringToFront(stickerGroup);
      canvas.setActiveObject(stickerGroup);
      canvas.renderAll();

      historyStackRef.current.push(stickerGroup);
      showToast(`✨ Stiker "${stickerItem.name}" berhasil ditempel!`, 'success');
    });
  };

  // Handle Undo
  const handleUndo = () => {
    const canvas = fabricRef.current;
    if (!canvas || historyStackRef.current.length === 0) {
      showToast('ℹ️ Tidak ada hiasan untuk di-undo.', 'info');
      return;
    }

    const lastObj = historyStackRef.current.pop();
    canvas.remove(lastObj);
    canvas.discardActiveObject();
    canvas.renderAll();
    setHasActiveSelection(false);
    showToast('↩️ Goresan terakhir dibatalkan.', 'info');
  };

  // Handle Delete Active Object
  const handleDeleteSelected = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) {
      showToast('⚠️ Ketuk stiker yang ingin dihapus terlebih dahulu.', 'info');
      return;
    }

    if (active.customType === 'sticker' || active.customType === 'doodle') {
      canvas.remove(active);
      canvas.discardActiveObject();
      canvas.renderAll();
      setHasActiveSelection(false);
      showToast('🗑️ Hiasan berhasil dihapus.', 'info');
    }
  };

  // Handle Reset All Decorations
  const handleResetDecorations = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const decorations = canvas
      .getObjects()
      .filter((obj) => obj.customType === 'doodle' || obj.customType === 'sticker');

    if (decorations.length === 0) {
      showToast('ℹ️ Kanvas masih bersih.', 'info');
      return;
    }

    decorations.forEach((d) => canvas.remove(d));
    historyStackRef.current = [];
    canvas.discardActiveObject();
    canvas.renderAll();
    setHasActiveSelection(false);
    showToast('✨ Semua hiasan telah dibersihkan kembali.', 'success');
  };

  // Handle Frame Selection (Freemium Gate)
  const handleSelectFrame = (frame) => {
    if (frame.tier === 'pro' && !isPro) {
      onOpenSubscription();
      showToast('👑 Fitur Eksklusif Pro Member! Buka akses untuk menikmati bingkai ini.', 'info');
      return;
    }
    setSelectedFrameId(frame.id);
    showToast(`🎨 Bingkai berganti ke gaya "${frame.name}".`, 'success');
  };

  // Finish & Export action
  const handleFinishAndDownload = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    setIsCompositing(true);
    showToast('⏳ Sedang menyiapkan foto estetikmu dalam resolusi terbaik...', 'info');

    try {
      const isProUser = userTier === 'pro';
      const initialShowWatermark = !isProUser; // Free: tampilkan watermark ("Made with PHOODLE"), Pro: default hapus watermark

      const result = await renderFinalPhotoStrip({
        selectedLayout,
        capturedPhotos,
        currentFrame,
        fabricCanvas: canvas,
        userTier,
        multiplier: 2,
        showWatermark: initialShowWatermark,
        customFooterText: '',
      });

      setExportImageUrl(result.dataUrl);
      setFinalExportCanvas(result.canvas);
      setIsExportModalOpen(true);
    } catch (err) {
      console.error('Compositor error:', err);
      showToast('⚠️ Gagal memproses gambar final.', 'error');
    } finally {
      setIsCompositing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-100 min-h-[100dvh] overscroll-none select-none text-slate-800">
      
      {/* 1. TOP BAR (Kembali, Undo, Hapus, Reset, Selesai & Unduh) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Kembali ke Capture & Brand Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('capture')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Foto Ulang</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <img src="/phoodle-logo.png" alt="PHOODLE" className="w-6 h-6 rounded-lg object-cover" />
              <span className="font-black text-xs tracking-tight text-slate-800">PHOODLE</span>
            </div>
          </div>

          {/* Center: Action Tools (Undo, Delete, Reset) */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Undo */}
            <button
              onClick={handleUndo}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Batalkan Aksi Terakhir"
            >
              <Undo2 className="w-4 h-4" />
              <span className="hidden sm:inline">Undo</span>
            </button>

            {/* Delete Active Object */}
            <button
              onClick={handleDeleteSelected}
              disabled={!hasActiveSelection}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                hasActiveSelection
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                  : 'bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed'
              }`}
              title="Hapus Stiker Terpilih"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Hapus</span>
            </button>

            {/* Reset All */}
            <button
              onClick={handleResetDecorations}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Hapus Semua Hiasan"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>

          </div>

          {/* Right: Selesai & Unduh Button */}
          <button
            onClick={handleFinishAndDownload}
            disabled={isCompositing}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 active:scale-95 transition-all disabled:opacity-50"
          >
            {isCompositing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isCompositing ? 'Menyiapkan...' : 'Selesai & Simpan'}</span>
          </button>

        </div>
      </header>

      {/* 2. MAIN WORKSPACE AREA */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* DESKTOP LEFT SIDEBAR ALA CANVA */}
        <aside className="hidden md:flex flex-row bg-white border-r border-slate-200 z-20 shrink-0">
          
          {/* Primary Tool Icons Strip */}
          <div className="w-20 bg-slate-900 text-white flex flex-col items-center py-4 gap-4">
            <button
              onClick={() => handleTabSelect('frame')}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
                activeTab === 'frame'
                  ? 'bg-brand-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Palette className="w-6 h-6 mb-1" />
              <span className="text-[11px] font-bold">Bingkai</span>
            </button>

            <button
              onClick={() => handleTabSelect('doodle')}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
                activeTab === 'doodle'
                  ? 'bg-brand-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Brush className="w-6 h-6 mb-1" />
              <span className="text-[11px] font-bold">Coretan</span>
            </button>

            <button
              onClick={() => handleTabSelect('sticker')}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
                activeTab === 'sticker'
                  ? 'bg-brand-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Smile className="w-6 h-6 mb-1" />
              <span className="text-[11px] font-bold">Stiker</span>
            </button>
          </div>

          {/* Secondary Options Drawer (Laptop) */}
          <div className="w-80 p-5 overflow-y-auto max-h-[calc(100dvh-64px)]">
            
            {/* FRAME TAB PANEL */}
            {activeTab === 'frame' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-base text-slate-900">Pilihan Bingkai</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                    Koleksi Pilihan
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Pilih gaya bingkai yang paling pas dengan mood fotomu</p>

                <div className="grid grid-cols-2 gap-3">
                  {FRAME_TEMPLATES.map((frame) => {
                    const isSelected = selectedFrameId === frame.id;
                    const isLocked = frame.tier === 'pro' && !isPro;

                    return (
                      <div
                        key={frame.id}
                        onClick={() => handleSelectFrame(frame)}
                        className={`relative rounded-2xl p-2.5 border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-brand-50/60 border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Frame SVG Preview Thumbnail */}
                        <div className="w-full h-36 rounded-xl border border-slate-200/80 mb-2 relative overflow-hidden bg-slate-50 flex items-center justify-center p-1">
                          <img
                            src={frame.svgDataUrl}
                            alt={frame.name}
                            className="w-full h-full object-contain"
                          />

                          {/* Lock badge if Free user */}
                          {isLocked && (
                            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                              <Crown className="w-5 h-5 text-amber-400 fill-amber-400 mb-0.5" />
                              <span className="text-[9px] font-black tracking-wider">PRO VIP</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 truncate">
                            {frame.name}
                          </span>
                          {frame.tier === 'pro' ? (
                            <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                          ) : (
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                              GRATIS
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DOODLE TAB PANEL */}
            {activeTab === 'doodle' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-base text-slate-900">Coretan & Doodle</h3>
                  <button
                    onClick={() => setIsDrawing(!isDrawing)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      isDrawing
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDrawing ? 'Kuas Aktif' : 'Mode Geser'}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-5">
                  Bebas berkreasi dengan sentuhan tangan artistikmu langsung di atas foto.
                </p>

                {/* Color Palette */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-slate-700 block mb-2.5">
                    Pilihan Warna:
                  </label>
                  <div className="grid grid-cols-5 gap-2.5">
                    {DOODLE_PALETTE.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setBrushColor(item.color);
                          setIsDrawing(true);
                        }}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                          brushColor === item.color
                            ? 'border-brand-600 scale-110 shadow-md'
                            : 'border-slate-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: item.color }}
                        title={item.label}
                      >
                        {brushColor === item.color && (
                          <Check
                            className={`w-4 h-4 stroke-[3] ${
                              item.color === '#FFFFFF' || item.color === '#FDE047'
                                ? 'text-slate-900'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brush Size Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Ukuran Goresan:</label>
                    <span className="text-xs font-black text-brand-600 bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-200">
                      {brushWidth}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    value={brushWidth}
                    onChange={(e) => setBrushWidth(Number(e.target.value))}
                    className="w-full accent-brand-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Halus (2px)</span>
                    <span>Tebal (24px)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200 text-xs text-brand-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Tips: Kreasikan tanda tangan, coretan lucu, atau pesan manis bareng sahabat!
                  </span>
                </div>
              </div>
            )}

            {/* STICKER TAB PANEL */}
            {activeTab === 'sticker' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-base text-slate-900">Stiker & Aksesoris</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                    Trending
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Pilih stiker favoritmu, lalu atur posisi dan ukurannya dengan mudah.
                </p>

                <div className="grid grid-cols-2 gap-2.5 max-h-[calc(100dvh-220px)] overflow-y-auto pr-1">
                  {STICKER_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddSticker(item)}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50/60 border border-slate-200 hover:border-brand-400 transition-all flex flex-col items-center justify-center gap-1.5 group text-center"
                    >
                      {item.isText ? (
                        <div className={`px-2 py-1 rounded-full text-[10px] font-black shadow-xs ${item.bg}`}>
                          {item.preview}
                        </div>
                      ) : (
                        <span className="text-3xl group-hover:scale-110 transition-transform">
                          {item.preview}
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-slate-700 truncate max-w-full">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </aside>

        {/* CENTER WORKSPACE: Background #F3F4F6 */}
        <div
          ref={containerRef}
          className="flex-1 bg-[#F3F4F6] flex items-center justify-center p-3 sm:p-6 overflow-hidden relative"
        >
          <div
            className="relative shadow-2xl rounded-2xl overflow-hidden border border-slate-300 bg-white"
            style={{
              touchAction: 'none',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
          >
            <canvas ref={canvasElRef} />
          </div>

          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-300 shadow-sm text-[11px] font-bold text-slate-600 hidden sm:flex items-center gap-2">
            <span>Tampilan: {Math.round(zoomScale * 100)}%</span>
            <span>•</span>
            <span className={isDrawing ? 'text-brand-600' : 'text-slate-500'}>
              {isDrawing ? 'Mode Kuas Aktif' : 'Mode Geser Objek'}
            </span>
          </div>
        </div>

        {/* MOBILE BOTTOM TOOLBAR & DRAWER */}
        <div className="md:hidden flex flex-col bg-white border-t border-slate-200 z-20 shrink-0">
          
          {isMobileDrawerOpen && (
            <div className="p-3 border-b border-slate-200 bg-slate-50 max-h-48 overflow-y-auto">
              
              {activeTab === 'frame' && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                  {FRAME_TEMPLATES.map((frame) => {
                    const isSelected = selectedFrameId === frame.id;
                    const isLocked = frame.tier === 'pro' && !isPro;

                    return (
                      <div
                        key={frame.id}
                        onClick={() => handleSelectFrame(frame)}
                        className={`shrink-0 w-28 rounded-xl p-2 border cursor-pointer ${
                          isSelected ? 'border-brand-600 bg-brand-50' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="w-full h-16 rounded-lg border border-slate-200 mb-1 flex items-center justify-center relative overflow-hidden bg-slate-50">
                          <img
                            src={frame.svgDataUrl}
                            alt={frame.name}
                            className="w-full h-full object-contain"
                          />
                          {isLocked && (
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                              <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 block truncate">
                          {frame.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'doodle' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">Pilihan Warna:</span>
                    <button
                      onClick={() => setIsDrawing(!isDrawing)}
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-600 text-white"
                    >
                      {isDrawing ? 'Kuas Aktif' : 'Mode Geser'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {DOODLE_PALETTE.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setBrushColor(item.color);
                          setIsDrawing(true);
                        }}
                        className={`w-8 h-8 rounded-full border-2 shrink-0 transition-transform ${
                          brushColor === item.color ? 'border-brand-600 scale-110 shadow-sm' : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: item.color }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs font-bold text-slate-600 shrink-0">Ukuran: {brushWidth}px</span>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={brushWidth}
                      onChange={(e) => setBrushWidth(Number(e.target.value))}
                      className="w-full accent-brand-600"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'sticker' && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {STICKER_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddSticker(item)}
                      className="shrink-0 p-2 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center min-w-[70px]"
                    >
                      {item.isText ? (
                        <div className={`px-1.5 py-0.5 rounded text-[8px] font-black ${item.bg}`}>
                          {item.preview}
                        </div>
                      ) : (
                        <span className="text-2xl">{item.preview}</span>
                      )}
                      <span className="text-[9px] font-bold text-slate-700 truncate max-w-[65px] mt-1">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* Primary Mobile Bottom Tabs Strip */}
          <div className="flex items-center justify-around py-2 px-3 bg-white">
            <button
              onClick={() => handleTabSelect('frame')}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                activeTab === 'frame' ? 'text-brand-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Palette className="w-5 h-5" />
              <span className="text-[11px]">Bingkai</span>
            </button>

            <button
              onClick={() => handleTabSelect('doodle')}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                activeTab === 'doodle' ? 'text-brand-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Brush className="w-5 h-5" />
              <span className="text-[11px]">Coretan</span>
            </button>

            <button
              onClick={() => handleTabSelect('sticker')}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                activeTab === 'sticker' ? 'text-brand-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Smile className="w-5 h-5" />
              <span className="text-[11px]">Stiker</span>
            </button>

            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              title="Sembunyikan / Tampilkan Menu"
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${isMobileDrawerOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>

      </div>

      {/* Export & Download Preview Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        imageUrl={exportImageUrl}
        userTier={userTier}
        onNewSession={() => {
          setIsExportModalOpen(false);
          if (onNewSession) {
            onNewSession();
          } else {
            onNavigate('home');
          }
        }}
        showToast={showToast}
        canvasInstance={finalExportCanvas}
        selectedLayout={selectedLayout}
        capturedPhotos={capturedPhotos}
        currentFrame={currentFrame}
        fabricCanvas={fabricRef.current}
        onOpenSubscription={onOpenSubscription}
      />

    </div>
  );
}
