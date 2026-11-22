import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Capture } from './pages/Capture';
import { Editor } from './pages/Editor';
import { SubscriptionModal } from './components/SubscriptionModal';
import { Toast } from './components/Toast';

export function App() {
  // Global States sesuai spesifikasi Modul 00
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'capture' | 'editor'
  const [userTier, setUserTier] = useState('free'); // 'free' | 'pro'
  const [selectedLayout, setSelectedLayout] = useState('strip-3'); // 'strip-3' | 'strip-4' | 'grid-2x2'
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [selectedFrameId, setSelectedFrameId] = useState('frame-phoodle-classic-white');

  // Capture mode ('camera' | 'upload')
  const [captureMode, setCaptureMode] = useState('camera');

  // UI Modal & Toast States
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleStartCapture = (mode = 'camera') => {
    setCaptureMode(mode);
    setCurrentView('capture');
  };

  const handleNewSession = () => {
    setCapturedPhotos([]);
    setCurrentView('home');
    showToast('✨ Sesi foto baru dimulai! Silakan pilih format strip dan gaya.', 'info');
  };

  const isEditorView = currentView === 'editor';

  return (
    <div className={`flex flex-col bg-slate-50 text-slate-800 select-none overflow-x-hidden max-w-full w-full ${
      isEditorView ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : 'min-h-[100dvh] overflow-y-auto'
    }`}>
      {/* 1. Global Top Navbar (Selalu Muncul untuk ganti Tier Pro/Free kapan pun) */}
      <Navbar
        userTier={userTier}
        setUserTier={setUserTier}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        showToast={showToast}
        onNavigateHome={() => setCurrentView('home')}
      />

      {/* 2. Main Page View Routing */}
      <main className={`flex-1 flex flex-col ${isEditorView ? 'overflow-hidden min-h-0 relative' : 'w-full'}`}>
        {currentView === 'home' && (
          <Home
            selectedLayout={selectedLayout}
            setSelectedLayout={setSelectedLayout}
            selectedFrameId={selectedFrameId}
            setSelectedFrameId={setSelectedFrameId}
            userTier={userTier}
            onStartCapture={handleStartCapture}
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
            showToast={showToast}
          />
        )}

        {currentView === 'capture' && (
          <Capture
            selectedLayout={selectedLayout}
            capturedPhotos={capturedPhotos}
            setCapturedPhotos={setCapturedPhotos}
            onNavigate={setCurrentView}
            showToast={showToast}
            initialMode={captureMode}
          />
        )}

        {currentView === 'editor' && (
          <Editor
            selectedLayout={selectedLayout}
            capturedPhotos={capturedPhotos}
            selectedFrameId={selectedFrameId}
            setSelectedFrameId={setSelectedFrameId}
            userTier={userTier}
            onNavigate={setCurrentView}
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
            showToast={showToast}
            onNewSession={handleNewSession}
          />
        )}
      </main>

      {/* 3. Subscription Pricing Modal (BMC Freemium Simulation) */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        userTier={userTier}
        setUserTier={setUserTier}
        showToast={showToast}
      />

      {/* 4. Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
