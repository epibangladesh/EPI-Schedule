import React, {useState} from 'react';
import {
  ArrowLeft,
  Check,
  Cloud,
  CloudOff,
  Copy,
  Download,
  History,
  RefreshCw,
  Smartphone,
  Syringe,
  X,
} from 'lucide-react';
import {translations} from '../data/epiData';
import {usePWAInstall} from '../hooks/usePWAInstall';
import type {Language, SyncStatus, TabId} from '../types';

interface TopAppBarProps {
  lang: Language;
  activeTab: TabId;
  syncStatus: SyncStatus;
  userFirstName: string | null;
  onBack: () => void;
  onToggleLanguage: () => void;
  onOpenSyncModal: () => void;
  onOpenHistory: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  lang,
  activeTab,
  syncStatus,
  userFirstName,
  onBack,
  onToggleLanguage,
  onOpenSyncModal,
  onOpenHistory,
}) => {
  const t = translations[lang];
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) return;
    }
    setShowInstallGuide(true);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // Ignore clipboard error
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-gradient-to-r from-teal-950 via-teal-800 to-teal-700 text-white shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
          {/* Left: Back (on sub-views) + Brand Title */}
          <div className="flex items-center gap-2 min-w-0">
            {activeTab !== 'epi' ? (
              <button
                type="button"
                onClick={onBack}
                aria-label={t.backLabel}
                className="min-h-[44px] min-w-[44px] -ml-1 rounded-xl flex items-center justify-center hover:bg-white/15 active:scale-95 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-white text-teal-800 flex items-center justify-center shrink-0 shadow-sm">
                <Syringe className="w-5 h-5" />
              </div>
            )}
            <span className="font-bold text-base sm:text-lg tracking-tight truncate">
              {t.appTitle}
            </span>
          </div>

          {/* Right: Compact Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {!isInstalled && (
              <button
                type="button"
                onClick={() => void handleInstallClick()}
                className="min-h-[40px] px-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 hover:bg-amber-300 transition whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.installBtn}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenSyncModal}
              aria-label={t.syncBtn}
              className="min-h-[40px] px-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold inline-flex items-center gap-1.5 transition whitespace-nowrap shrink-0"
            >
              {syncStatus === 'syncing' ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-200" />
              ) : syncStatus === 'synced' ? (
                <Cloud className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <CloudOff className="w-3.5 h-3.5 text-teal-100" />
              )}
              <span className="max-w-[76px] truncate">
                {userFirstName || t.syncBtn}
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleLanguage}
              className="min-h-[40px] min-w-[44px] px-2.5 rounded-xl bg-white text-teal-900 font-bold text-xs hover:bg-teal-50 transition whitespace-nowrap shrink-0"
            >
              {t.langBtn}
            </button>

            <button
              type="button"
              onClick={onOpenHistory}
              aria-label={t.sidebarTitle}
              className="min-h-[44px] min-w-[44px] rounded-xl hover:bg-white/15 flex items-center justify-center transition shrink-0"
            >
              <History className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {showInstallGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === 'bn' ? 'অ্যান্ড্রয়েড অ্যাপ ইনস্টল ও APK গাইড' : 'Install Android App'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                aria-label="Close"
                className="min-h-[44px] min-w-[44px] -mr-2 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isIOS ? (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 space-y-1.5">
                <p className="font-bold text-slate-900">
                  {lang === 'bn' ? 'iPhone / iPad-এ ইনস্টল:' : 'Install on iPhone / iPad:'}
                </p>
                <p>
                  {lang === 'bn'
                    ? '১. Safari টুলবারের Share বোতামে ট্যাপ করুন।\n২. নিচে স্ক্রল করে Add to Home Screen চাপুন।'
                    : '1. Tap Share in Safari toolbar.\n2. Scroll down and tap Add to Home Screen.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-slate-700">
                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1.5">
                  <p className="font-bold text-teal-950">
                    {lang === 'bn'
                      ? '১. সরাসরি ফোনে ইনস্টল (Chrome PWA):'
                      : '1. Install directly on Android Chrome:'}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {lang === 'bn'
                      ? 'AI Studio প্রিভিউ ফ্রেমের ভেতর থেকে ব্রাউজার ইনস্টল পপআপ দেয় না। নিচের লিংক কপি করে নতুন Chrome ট্যাবে খুলুন এবং মেনু (⋮) থেকে "Install app" বা "Add to Home screen" চাপুন।'
                      : 'Browser install prompts do not appear inside an iframe. Copy the link below, open it in a standalone Chrome tab, and tap ⋮ → Install app.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900 text-xs sm:text-sm">
                    {lang === 'bn' ? '২. APK ফাইল তৈরি করতে চাইলে:' : '2. Building an .APK file:'}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {lang === 'bn'
                      ? 'প্রিভিউ লিংকে Google লগইন থাকায় PWABuilder সরাসরি স্ক্যান করতে পারে না। APK বানাতে AI Studio থেকে কোড ডাউনলোড করে Firebase Hosting-এ ডিপ্লয় করুন (অথবা Capacitor / Android Studio দিয়ে বিল্ড করুন)।'
                      : 'Preview URLs require Google auth, so PWABuilder cannot scan them directly. Export the code and deploy to Firebase Hosting or wrap with Capacitor/Android Studio to generate a signed .apk.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void handleCopyUrl()}
                  className="w-full min-h-[44px] rounded-xl border border-teal-600 bg-teal-50 text-teal-900 font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-teal-100 transition"
                >
                  {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>
                    {copiedUrl
                      ? lang === 'bn'
                        ? 'লিংক কপি হয়েছে!'
                        : 'URL Copied!'
                      : lang === 'bn'
                      ? 'অ্যাপের লিংক কপি করুন'
                      : 'Copy App URL'}
                  </span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowInstallGuide(false)}
              className="w-full min-h-[44px] rounded-xl bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 transition"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
