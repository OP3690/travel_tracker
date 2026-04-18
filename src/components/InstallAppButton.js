import React, { useEffect, useState } from 'react';
import { FaDownload, FaTimes, FaMobileAlt, FaShareSquare, FaPlusSquare } from 'react-icons/fa';
import './InstallAppButton.css';

/**
 * Shows an "Install App" button that:
 * - On Chrome/Edge/Android: triggers the native A2HS prompt via `beforeinstallprompt`
 * - On iOS Safari: opens a small instruction sheet (A2HS isn't automatable there)
 * - Hides itself when the app is already running in standalone mode
 *
 * Users who dismiss it once get 7 days before it reappears.
 */
export default function InstallAppButton({ variant = 'floating' }) {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showIosSheet, setShowIosSheet] = useState(false);

  useEffect(() => {
    // Already installed / launched from home screen — don't show anything
    const isStandalone =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (isStandalone) return;

    // Respect recent dismissal (7 days)
    const dismissedAt = Number(localStorage.getItem('sym-install-dismissed') || 0);
    if (dismissedAt && Date.now() - dismissedAt < 7 * 86400 * 1000) return;

    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);

    // iOS Safari never fires `beforeinstallprompt` — detect & show iOS sheet trigger
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isSafari = /safari/.test(ua) && !/crios|fxios|chrome/.test(ua);
    if (isIOS && isSafari) setVisible(true);

    window.addEventListener('appinstalled', () => setVisible(false));

    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (deferred) {
      deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === 'accepted') setVisible(false);
      setDeferred(null);
    } else {
      // iOS fallback
      setShowIosSheet(true);
    }
  };

  const dismiss = () => {
    localStorage.setItem('sym-install-dismissed', String(Date.now()));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className={`install-app ${variant}`}>
        <button className="install-app-btn" onClick={handleInstall}>
          <FaDownload /> <span>Install App</span>
        </button>
        {variant === 'floating' && (
          <button className="install-app-dismiss" onClick={dismiss} aria-label="Dismiss">
            <FaTimes />
          </button>
        )}
      </div>

      {showIosSheet && (
        <div className="ios-sheet-overlay" onClick={() => setShowIosSheet(false)}>
          <div className="ios-sheet" onClick={e => e.stopPropagation()}>
            <div className="ios-sheet-icon"><FaMobileAlt /></div>
            <h3>Install StampYourMap</h3>
            <p className="ios-sheet-sub">Get the full-screen app experience on your iPhone.</p>
            <ol className="ios-sheet-steps">
              <li>
                <FaShareSquare />
                <span>Tap the <strong>Share</strong> button in Safari (square with ↑ arrow)</span>
              </li>
              <li>
                <FaPlusSquare />
                <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
              </li>
              <li>
                <span className="ios-sheet-check">✓</span>
                <span>Tap <strong>Add</strong> — the app appears on your home screen</span>
              </li>
            </ol>
            <button className="ios-sheet-close" onClick={() => setShowIosSheet(false)}>Got it</button>
          </div>
        </div>
      )}
    </>
  );
}
