import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Upload,
  RotateCcw,
  FlipHorizontal,
  Clock,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Sparkles,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Play,
  RefreshCw,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import { PHOTO_LAYOUTS } from '../data/mockData';

export function Capture({
  selectedLayout,
  capturedPhotos,
  setCapturedPhotos,
  onNavigate,
  showToast,
  initialMode = 'camera',
}) {
  // Mode Tab: 'camera' | 'upload'
  const [activeTab, setActiveTab] = useState(initialMode);

  // Layout config
  const layoutConfig = PHOTO_LAYOUTS.find((l) => l.id === selectedLayout) || PHOTO_LAYOUTS[0];
  const totalSlots = layoutConfig.slots;

  // Active slot index targeted for capture/replace (0 to totalSlots - 1)
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);

  // Camera states
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);

  // Timer states (0 = instant, 3, 5, 10)
  const [timerSeconds, setTimerSeconds] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const countdownIntervalRef = useRef(null);

  // Visual flash effect on shutter
  const [isFlashing, setIsFlashing] = useState(false);

  // Auto burst sequence mode
  const [isAutoSequenceRunning, setIsAutoSequenceRunning] = useState(false);

  // Audio synthesize for sound effects
  const playSound = (type = 'beep') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'beep-high') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1040, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'shutter') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      }
    } catch {
      // AudioContext might be restricted until user gesture
    }
  };

  // Ensure capturedPhotos array has correct length matching totalSlots
  useEffect(() => {
    setCapturedPhotos((prev) => {
      const next = [...prev];
      if (next.length !== totalSlots) {
        return Array(totalSlots).fill(null).map((_, i) => next[i] || null);
      }
      return next;
    });
  }, [totalSlots, setCapturedPhotos]);

  // Find next empty slot automatically
  useEffect(() => {
    const firstEmptyIndex = capturedPhotos.findIndex((photo) => !photo);
    if (firstEmptyIndex !== -1) {
      setActiveSlotIndex(firstEmptyIndex);
    }
  }, [capturedPhotos]);

  // Initialize or Stop Camera Stream
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraReady(false);
  };

  const startCameraStream = async () => {
    stopCameraStream();
    setCameraError(null);
    setIsCameraReady(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser ini tidak mendukung akses kamera perangkat.');
      }

      // Constraints optimized for front camera & mobile/laptop
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // iOS Safari requires explicit play() call
        try {
          await videoRef.current.play();
        } catch {
          // Play was interrupted or auto-play restriction
        }
        setIsCameraReady(true);
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      let errMsg = 'Tidak dapat mengakses kamera perangkat.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errMsg = 'Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan browser.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errMsg = 'Kamera tidak terdeteksi pada perangkat ini.';
      }
      setCameraError(errMsg);
      setIsCameraReady(false);
    }
  };

  // Manage camera lifecycle depending on activeTab
  useEffect(() => {
    if (activeTab === 'camera') {
      startCameraStream();
    } else {
      stopCameraStream();
    }

    return () => {
      stopCameraStream();
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [activeTab]);

  // Capture frame from <video> to base64
  const grabVideoFrame = () => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Handle mirror effect when capturing
    if (isMirrored) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.95);
  };

  // Perform the actual capture and store in slot
  const triggerCapture = (targetSlot) => {
    // 1. Shutter sound
    playSound('shutter');

    // 2. White screen flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    // 3. Grab image
    const photoDataUrl = grabVideoFrame();
    if (!photoDataUrl) return;

    // 4. Update photos array
    setCapturedPhotos((prev) => {
      const next = [...prev];
      const slot = targetSlot !== undefined ? targetSlot : activeSlotIndex;
      next[slot] = photoDataUrl;
      return next;
    });

    showToast(`📸 Foto Pose #${(targetSlot ?? activeSlotIndex) + 1} berhasil diambil!`, 'success');
  };

  // Trigger capture sequence with countdown
  const startSingleCapture = (targetSlot) => {
    if (!isCameraReady || countdown !== null) return;

    const slotToFill = targetSlot !== undefined ? targetSlot : activeSlotIndex;

    if (timerSeconds === 0) {
      triggerCapture(slotToFill);
      return;
    }

    let current = timerSeconds;
    setCountdown(current);
    playSound('beep');

    countdownIntervalRef.current = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
        playSound('beep');
      } else {
        clearInterval(countdownIntervalRef.current);
        setCountdown(null);
        playSound('beep-high');
        triggerCapture(slotToFill);
      }
    }, 1000);
  };

  // Automated burst sequence for all empty slots
  const startAutoSequence = async () => {
    if (!isCameraReady || countdown !== null || isAutoSequenceRunning) return;
    setIsAutoSequenceRunning(true);

    const emptySlots = [];
    for (let i = 0; i < totalSlots; i++) {
      if (!capturedPhotos[i]) emptySlots.push(i);
    }

    const slotsToTake = emptySlots.length > 0 ? emptySlots : Array.from({ length: totalSlots }, (_, i) => i);

    for (let i = 0; i < slotsToTake.length; i++) {
      const slotIndex = slotsToTake[i];
      setActiveSlotIndex(slotIndex);

      // Countdown per shot
      const delayTime = timerSeconds > 0 ? timerSeconds : 3;
      for (let sec = delayTime; sec > 0; sec--) {
        setCountdown(sec);
        playSound('beep');
        await new Promise((r) => setTimeout(r, 1000));
      }

      setCountdown(null);
      playSound('beep-high');
      triggerCapture(slotIndex);

      // Brief pause between shots if more remain
      if (i < slotsToTake.length - 1) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    setIsAutoSequenceRunning(false);
    showToast('🎉 Seluruh pose sesi foto selesai diambil!', 'success');
  };

  // Retake single slot
  const handleRetakeSlot = (index) => {
    setCapturedPhotos((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setActiveSlotIndex(index);
    showToast(`🔄 Slot Pose #${index + 1} dikosongkan untuk foto ulang.`, 'info');
  };

  // Retake all slots
  const handleRetakeAll = () => {
    setCapturedPhotos(Array(totalSlots).fill(null));
    setActiveSlotIndex(0);
    showToast('🗑️ Semua slot foto berhasil direset. Silakan pose kembali!', 'info');
  };

  // Gallery file upload handler (single or multiple)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validImages = files.filter((f) => f.type.startsWith('image/')).slice(0, totalSlots);

    if (validImages.length === 0) {
      showToast('⚠️ Mohon pilih file gambar yang valid (JPG/PNG).', 'error');
      return;
    }

    const readers = validImages.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((dataUrls) => {
      setCapturedPhotos((prev) => {
        const next = [...prev];
        let urlIdx = 0;

        // If target slot was selected and only 1 file picked, put it in activeSlotIndex
        if (dataUrls.length === 1 && next[activeSlotIndex] === null) {
          next[activeSlotIndex] = dataUrls[0];
        } else {
          // Otherwise fill slots in order
          for (let i = 0; i < totalSlots && urlIdx < dataUrls.length; i++) {
            if (!next[i] || dataUrls.length > 1) {
              next[i] = dataUrls[urlIdx];
              urlIdx++;
            }
          }
        }
        return next;
      });

      showToast(`📁 Berhasil mengunggah ${dataUrls.length} foto ke slot pose!`, 'success');
    });

    // Reset input
    e.target.value = '';
  };

  // Completion check
  const filledCount = capturedPhotos.filter(Boolean).length;
  const isComplete = filledCount === totalSlots;

  return (
    <div className="flex-1 flex flex-col bg-slate-900 text-white h-[100dvh] max-h-[100dvh] overflow-hidden overscroll-none select-none">
      
      {/* 1. Header Bar: Navigation & Mode Tabs */}
      <header className="flex-none bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
          
          {/* Back button & Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-700">
              <img src="/phoodle-logo.png" alt="PHOODLE" className="w-5 h-5 rounded-md object-cover" />
              <span className="font-extrabold text-xs tracking-tight text-white">PHOODLE</span>
            </div>
          </div>

          {/* Top Switcher Tabs: Kamera Langsung vs Upload Galeri */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-2xl border border-slate-700/80 shadow-inner">
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'camera'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Kamera</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'upload'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Galeri</span>
            </button>
          </div>

          {/* Format Badge */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-slate-400 hidden md:inline">
              Format:
            </span>
            <span className="text-xs font-black px-2 sm:px-2.5 py-1 rounded-lg bg-slate-800 text-brand-400 border border-slate-700">
              {filledCount}/{totalSlots}
            </span>
          </div>

        </div>
      </header>

      {/* 2. Main Content Area: Responsive Mobile-First Grid/Flex */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-1.5 sm:p-4 lg:p-6 gap-1.5 sm:gap-4 lg:gap-6 overflow-hidden">
        
        {/* Left / Main Section: Live Viewport (Camera or Upload Zone) */}
        <div className="flex-1 min-h-0 max-h-[54dvh] sm:max-h-none flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden relative shadow-2xl">
          
          {/* CAMERA TAB */}
          {activeTab === 'camera' && (
            <div className="relative flex-1 min-h-0 max-h-[54dvh] sm:max-h-none flex items-center justify-center bg-black sm:min-h-[420px] overflow-hidden">
              
              {/* Shutter Screen Flash Overlay */}
              <div
                className={`absolute inset-0 bg-white z-30 pointer-events-none transition-opacity duration-200 ${
                  isFlashing ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Live Video Element (Optimized for iOS Safari, Android, Laptop) */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover select-none transition-transform duration-200 ${
                  isMirrored ? '-scale-x-100' : 'scale-x-100'
                }`}
              />

              {/* Countdown Number Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                  <div className="relative flex items-center justify-center">
                    <span className="text-7xl sm:text-9xl font-black text-amber-400 drop-shadow-[0_10px_25px_rgba(245,158,11,0.7)] animate-ping">
                      {countdown}
                    </span>
                    <span className="absolute text-7xl sm:text-9xl font-black text-white drop-shadow-2xl">
                      {countdown}
                    </span>
                  </div>
                </div>
              )}

              {/* Camera Error / Permission Fallback View */}
              {cameraError && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Akses Kamera Terkendala</h3>
                  <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                    {cameraError}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={startCameraStream}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors border border-slate-700"
                    >
                      <RefreshCw className="w-4 h-4" /> Coba Lagi
                    </button>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md shadow-brand-600/30"
                    >
                      <Upload className="w-4 h-4" /> Gunakan Upload Galeri
                    </button>
                  </div>
                </div>
              )}

              {/* Viewport Top Floating Indicators */}
              <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span>Pose Target: #{activeSlotIndex + 1}</span>
                </div>

                {/* Mirror toggle button */}
                <button
                  onClick={() => setIsMirrored(!isMirrored)}
                  className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors pointer-events-auto shadow-sm"
                  title={isMirrored ? 'Mode Cermin Aktif (Klik untuk nonaktifkan)' : 'Mode Normal (Klik untuk cermin)'}
                >
                  <FlipHorizontal className={`w-4 h-4 ${isMirrored ? 'text-brand-400' : 'text-slate-400'}`} />
                </button>
              </div>

              {/* Viewport Bottom Floating Control Bar */}
              <div className="absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center gap-3 px-4 pointer-events-none">
                
                {/* Timer Selection Pills */}
                <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 pointer-events-auto shadow-lg">
                  <span className="hidden sm:inline-flex items-center gap-1 pl-2 pr-1 text-xs font-bold text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Timer:
                  </span>
                  {[0, 3, 5, 10].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setTimerSeconds(sec)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                        timerSeconds === sec
                          ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {sec === 0 ? 'Tanpa Timer' : `${sec}s`}
                    </button>
                  ))}
                </div>

                {/* Main Shutter Action Controls */}
                <div className="flex items-center gap-4 pointer-events-auto">
                  
                  {/* Single Shot Button */}
                  <button
                    onClick={() => startSingleCapture(activeSlotIndex)}
                    disabled={!isCameraReady || countdown !== null}
                    className="group relative flex items-center justify-center w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white text-slate-900 p-1.5 shadow-2xl shadow-brand-500/30 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Ambil Foto"
                  >
                    <div className="w-full h-full rounded-full border-4 border-slate-900 flex items-center justify-center bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-600 text-white">
                      <Camera className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
                    </div>
                  </button>

                  {/* Auto Sequence Burst Button */}
                  <button
                    onClick={startAutoSequence}
                    disabled={!isCameraReady || countdown !== null || isAutoSequenceRunning}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-400/30 text-xs font-bold backdrop-blur-md shadow-lg active:scale-95 transition-all disabled:opacity-40"
                    title="Jepret otomatis berurutan dengan jeda timer"
                  >
                    <Play className="w-3.5 h-3.5 fill-amber-300" />
                    <span className="hidden sm:inline">Jepret Otomatis Semua Slot</span>
                    <span className="sm:hidden">Auto Seri</span>
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* UPLOAD GALERI TAB */}
          {activeTab === 'upload' && (
            <div className="relative flex-1 min-h-0 flex flex-col items-center justify-center bg-slate-950 p-4 sm:p-10 text-center overflow-y-auto">
              <div className="max-w-md w-full border-2 border-dashed border-slate-700 hover:border-brand-500 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center transition-all bg-slate-900/40 hover:bg-slate-900/80 group">
                
                <div className="w-16 h-16 rounded-3xl bg-brand-600/20 text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  Pilih Foto dari Perangkat
                </h3>
                <p className="text-xs text-slate-400 mb-6 max-w-xs leading-relaxed">
                  Unggah hingga {totalSlots} foto dari galeri HP atau laptopmu. Format JPG, PNG, atau WEBP didukung.
                </p>

                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 active:scale-95 transition-all">
                    <ImageIcon className="w-4 h-4" />
                    Pilih File Foto
                  </span>
                </label>

                <p className="text-[11px] text-slate-500 mt-4">
                  💡 Tips: Foto otomatis dimasukkan ke slot pose yang masih kosong.
                </p>

              </div>
            </div>
          )}

        </div>

        {/* DESKTOP ONLY (md:flex): Right Pose Thumbnail Slots Panel */}
        <div className="hidden md:flex md:w-80 lg:w-96 flex-col justify-between rounded-3xl bg-slate-950 border border-slate-800 p-4 sm:p-5 shadow-xl shrink-0">
          
          <div>
            {/* Panel Title & Status */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>Slot Hasil Foto</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {filledCount}/{totalSlots}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Klik thumbnail untuk foto ulang (retake)
                </p>
              </div>

              {filledCount > 0 && (
                <button
                  type="button"
                  onClick={handleRetakeAll}
                  className="flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 p-1 rounded-lg transition-colors"
                  title="Hapus semua foto dan mulai ulang"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Semua</span>
                </button>
              )}
            </div>

            {/* Thumbnail Slots Stack (Laptop view) */}
            <div className="flex flex-col gap-2.5 max-h-[calc(100dvh-280px)] overflow-y-auto pr-1">
              {Array.from({ length: totalSlots }).map((_, index) => {
                const photo = capturedPhotos[index];
                const isActive = activeSlotIndex === index;

                return (
                  <div
                    key={index}
                    onClick={() => setActiveSlotIndex(index)}
                    className={`group relative flex items-center gap-3 p-2 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 border-brand-500 ring-2 ring-brand-500/30 shadow-md'
                        : photo
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-900/30 border-dashed border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Thumbnail Image Box */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-700/60 flex items-center justify-center">
                      {photo ? (
                        <img
                          src={photo}
                          alt={`Pose #${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-black text-slate-500 font-mono">
                          #{index + 1}
                        </span>
                      )}

                      {/* Number Badge */}
                      <span className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-mono">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Metadata & Retake Button (Laptop view) */}
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-200">
                          {photo ? `Pose #${index + 1} Siap` : `Slot #${index + 1} Kosong`}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {photo ? 'Klik untuk ganti foto' : 'Target foto berikutnya'}
                        </div>
                      </div>

                      {photo ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRetakeSlot(index);
                          }}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors"
                          title="Foto Ulang Slot Ini (Unlimited Retake)"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-brand-400 bg-brand-500/10 px-2 py-1 rounded-lg border border-brand-500/20">
                          Siap
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action: Proceed to Canvas Editor (Desktop) */}
          <div className="pt-4 mt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => onNavigate('editor')}
              disabled={!isComplete}
              className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                isComplete
                  ? 'bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-lg shadow-brand-500/30 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
              }`}
            >
              <span>Lanjut ke Editor Kanvas</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!isComplete && (
              <p className="text-[11px] text-center text-slate-500 mt-2">
                Isi {totalSlots - filledCount} slot foto lagi untuk membuka ruang kerja kanvas.
              </p>
            )}
          </div>

        </div>

      </div>

      {/* MOBILE ONLY (< md): Bottom Floating Dock - Slots Thumbnails & Quick Proceed */}
      <div className="flex md:hidden flex-none bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 pt-1.5 pb-6 items-center justify-between gap-2 z-20">
        
        {/* Horizontal Mini Slots */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {Array.from({ length: totalSlots }).map((_, index) => {
            const photo = capturedPhotos[index];
            const isActive = activeSlotIndex === index;

            return (
              <div
                key={index}
                onClick={() => setActiveSlotIndex(index)}
                className={`relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'border-brand-500 ring-2 ring-brand-500/40 bg-slate-800'
                    : photo
                    ? 'border-slate-700 bg-slate-800'
                    : 'border-dashed border-slate-800 bg-slate-900/50'
                }`}
              >
                {photo ? (
                  <>
                    <img src={photo} alt={`#${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRetakeSlot(index);
                      }}
                      className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center text-rose-300 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <span className="text-[10px] font-black text-slate-500">#{index + 1}</span>
                )}
                <span className="absolute bottom-0 right-0 bg-black/70 text-[8px] font-mono px-1 rounded-tl text-slate-300">
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Proceed Button */}
        <button
          type="button"
          onClick={() => onNavigate('editor')}
          disabled={!isComplete}
          className={`shrink-0 flex items-center gap-1 px-3.5 py-2.5 rounded-xl font-black text-xs transition-all ${
            isComplete
              ? 'bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-brand-500/30 active:scale-95'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
          }`}
        >
          <span>{isComplete ? 'Lanjut Edit' : `${filledCount}/${totalSlots} Pose`}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
}
