import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if iOS Safari (no beforeinstallprompt event)
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const standalone = window.matchMedia('(display-mode: standalone)').matches;

    if (ios && !standalone) {
      setIsIOS(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Don't show if already installed (standalone mode) or dismissed
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (isStandalone || dismissed) return null;

  // Android / Chrome — native install prompt
  if (deferredPrompt) {
    return (
      <div
        className="relative mx-4 mt-3 flex items-center gap-3 p-3 rounded-xl border"
        style={{
          background: 'linear-gradient(135deg, rgba(102,68,255,0.12), rgba(0,255,136,0.08))',
          borderColor: 'rgba(102,68,255,0.4)',
        }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
          style={{ background: 'rgba(102,68,255,0.2)' }}
        >
          📲
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white leading-tight">Install on your phone</p>
          <p className="text-xs text-gray-400 mt-0.5">Works offline once installed</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white flex-shrink-0 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #6644FF, #4422CC)' }}
          onClick={async () => {
            await deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            if (result.outcome === 'accepted') setDismissed(true);
            setDeferredPrompt(null);
          }}
        >
          <Download size={12} />
          Install
        </button>
        <button
          className="p-1.5 text-gray-600 active:text-gray-400 transition-colors flex-shrink-0"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  // iOS — manual instructions
  if (isIOS) {
    return (
      <div
        className="relative mx-4 mt-3 rounded-xl border overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(102,68,255,0.12), rgba(0,255,136,0.08))',
          borderColor: 'rgba(102,68,255,0.4)',
        }}
      >
        <button
          className="w-full flex items-center gap-3 p-3 text-left"
          onClick={() => setShowIOSInstructions(!showIOSInstructions)}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
            style={{ background: 'rgba(102,68,255,0.2)' }}
          >
            📲
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white leading-tight">Add to Home Screen</p>
            <p className="text-xs text-gray-400 mt-0.5">Tap for iOS instructions</p>
          </div>
          <button
            className="p-1.5 text-gray-600 active:text-gray-400 flex-shrink-0"
            onClick={e => { e.stopPropagation(); setDismissed(true); }}
          >
            <X size={14} />
          </button>
        </button>

        {showIOSInstructions && (
          <div className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
            {[
              { icon: '1️⃣', text: 'Tap the Share button (box with arrow) in Safari' },
              { icon: '2️⃣', text: 'Scroll down and tap "Add to Home Screen"' },
              { icon: '3️⃣', text: 'Tap "Add" — the app icon will appear on your home screen' },
            ].map(step => (
              <div key={step.icon} className="flex items-center gap-2 text-sm text-gray-300">
                <span>{step.icon}</span>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}
