import {useCallback, useEffect, useRef, useState} from 'react';
import {onAuthStateChanged, type User} from 'firebase/auth';
import {WifiOff} from 'lucide-react';
import {AdolescentCareView} from './components/AdolescentCareView';
import {AgeCalculatorView} from './components/AgeCalculatorView';
import {AncCalculatorView} from './components/AncCalculatorView';
import {BottomNav} from './components/BottomNav';
import {DashboardHome} from './components/DashboardHome';
import {MicroplanView} from './components/MicroplanView';
import {
  CloudSyncModal,
  DiseaseModals,
  HistoryDrawer,
} from './components/ModalsAndDrawers';
import {NotesView} from './components/NotesView';
import {TopAppBar} from './components/TopAppBar';
import {translations} from './data/epiData';
import {
  auth,
  saveUserBackup,
  signInWithGoogle,
  signOutGoogle,
  subscribeUserBackup,
} from './firebase';
import {useOnlineStatus} from './hooks/useOnlineStatus';
import type {
  CenterNamesMap,
  HistoryEntry,
  KeepNote,
  Language,
  OverridesMap,
  SyncStatus,
  TabId,
  ToastState,
} from './types';

function readJsonStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function readAllOverrides(): Record<string, OverridesMap> {
  const result: Record<string, OverridesMap> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('epi_overrides_')) {
      const parsed = readJsonStorage<OverridesMap>(k, {});
      result[k] = parsed;
    }
  }
  return result;
}

export default function App() {
  const isOnline = useOnlineStatus();

  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('appLang');
    return saved === 'en' ? 'en' : 'bn';
  });

  const [tabHistory, setTabHistory] = useState<TabId[]>(['epi']);
  const activeTab = tabHistory[tabHistory.length - 1];

  const [selectedDob, setSelectedDob] = useState<string>('');
  const [notes, setNotes] = useState<KeepNote[]>(() =>
    readJsonStorage<KeepNote[]>('epiKeepNotes', [])
  );
  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    readJsonStorage<HistoryEntry[]>('epiHistory', [])
  );
  const [centerNames, setCenterNames] = useState<CenterNamesMap>(() =>
    readJsonStorage<CenterNamesMap>('epi_center_names', {})
  );
  const [allOverrides, setAllOverrides] = useState<Record<string, OverridesMap>>(() =>
    readAllOverrides()
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('offline');

  const [diseaseListOpen, setDiseaseListOpen] = useState(false);
  const [selectedDiseaseKey, setSelectedDiseaseKey] = useState<string | null>(null);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const latestStateRef = useRef({notes, history, centerNames, allOverrides});
  latestStateRef.current = {notes, history, centerNames, allOverrides};

  const notify = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      const id = Date.now();
      setToast({id, message, type});
      window.setTimeout(() => {
        setToast((curr) => (curr?.id === id ? null : curr));
      }, 3200);
    },
    []
  );

  const pushToCloud = useCallback(
    async (
      uid: string,
      payload?: {
        notes: KeepNote[];
        history: HistoryEntry[];
        centerNames: CenterNamesMap;
        overrides: Record<string, OverridesMap>;
      }
    ) => {
      setSyncStatus('syncing');
      const source = payload ?? {
        notes: latestStateRef.current.notes,
        history: latestStateRef.current.history,
        centerNames: latestStateRef.current.centerNames,
        overrides: latestStateRef.current.allOverrides,
      };
      try {
        await saveUserBackup(uid, source);
        setSyncStatus('synced');
      } catch {
        setSyncStatus('offline');
        notify(
          lang === 'bn'
            ? 'ক্লাউড সিংক করা যায়নি (অফলাইন/অনুমতি ত্রুটি)।'
            : 'Cloud sync failed.',
          'error'
        );
      }
    },
    [lang, notify]
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
      if (!user) {
        setSyncStatus('offline');
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authReady || !currentUser) return;
    setSyncStatus('syncing');

    const unsub = subscribeUserBackup(
      currentUser.uid,
      (cloudData) => {
        if (!cloudData) {
          void pushToCloud(currentUser.uid);
          return;
        }
        if (Array.isArray(cloudData.notes)) {
          setNotes(cloudData.notes);
          localStorage.setItem('epiKeepNotes', JSON.stringify(cloudData.notes));
        }
        if (Array.isArray(cloudData.history)) {
          setHistory(cloudData.history);
          localStorage.setItem('epiHistory', JSON.stringify(cloudData.history));
        }
        if (cloudData.centerNames && typeof cloudData.centerNames === 'object') {
          setCenterNames(cloudData.centerNames);
          localStorage.setItem(
            'epi_center_names',
            JSON.stringify(cloudData.centerNames)
          );
        }
        if (cloudData.overrides && typeof cloudData.overrides === 'object') {
          Object.entries(cloudData.overrides).forEach(([k, v]) => {
            localStorage.setItem(k, JSON.stringify(v));
          });
          setAllOverrides(cloudData.overrides);
        }
        setSyncStatus('synced');
      },
      () => {
        setSyncStatus('offline');
      }
    );

    return () => unsub();
  }, [authReady, currentUser, pushToCloud]);

  const switchTab = useCallback((tab: TabId) => {
    setTabHistory((prev) =>
      prev[prev.length - 1] === tab ? prev : [...prev, tab]
    );
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const handleBack = useCallback(() => {
    setTabHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : ['epi']));
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const handleToggleLanguage = () => {
    const next: Language = lang === 'bn' ? 'en' : 'bn';
    setLang(next);
    localStorage.setItem('appLang', next);
  };

  const handleCalculateEpi = (dob: string) => {
    const filtered = history.filter((item) => item.dob !== dob);
    const nextHistory: HistoryEntry[] = [
      {dob, time: new Date().toLocaleDateString()},
      ...filtered,
    ].slice(0, 100);
    setHistory(nextHistory);
    localStorage.setItem('epiHistory', JSON.stringify(nextHistory));
    if (currentUser) {
      void pushToCloud(currentUser.uid, {
        notes,
        history: nextHistory,
        centerNames,
        overrides: allOverrides,
      });
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('epiHistory');
    if (currentUser) {
      void pushToCloud(currentUser.uid, {
        notes,
        history: [],
        centerNames,
        overrides: allOverrides,
      });
    }
  };

  const handleSaveNotes = (nextNotes: KeepNote[]) => {
    setNotes(nextNotes);
    localStorage.setItem('epiKeepNotes', JSON.stringify(nextNotes));
    if (currentUser) {
      void pushToCloud(currentUser.uid, {
        notes: nextNotes,
        history,
        centerNames,
        overrides: allOverrides,
      });
    }
  };

  const handleSaveMicroplan = (
    year: number,
    yearOverrides: OverridesMap,
    updatedCenters: CenterNamesMap
  ) => {
    const key = `epi_overrides_${year}`;
    const nextOverrides = {...allOverrides, [key]: yearOverrides};
    setAllOverrides(nextOverrides);
    setCenterNames(updatedCenters);
    localStorage.setItem(key, JSON.stringify(yearOverrides));
    localStorage.setItem('epi_center_names', JSON.stringify(updatedCenters));

    if (currentUser) {
      void pushToCloud(currentUser.uid, {
        notes,
        history,
        centerNames: updatedCenters,
        overrides: nextOverrides,
      });
    }
  };

  const handleResetMicroplanYear = (year: number) => {
    const key = `epi_overrides_${year}`;
    const nextOverrides = {...allOverrides};
    delete nextOverrides[key];
    setAllOverrides(nextOverrides);
    localStorage.removeItem(key);

    if (currentUser) {
      void pushToCloud(currentUser.uid, {
        notes,
        history,
        centerNames,
        overrides: nextOverrides,
      });
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      notify(
        lang === 'bn' ? 'Google সাইন-ইন সফল হয়েছে।' : 'Signed in with Google.',
        'success'
      );
    } catch {
      notify(
        lang === 'bn' ? 'সাইন-ইন সম্পন্ন হয়নি।' : 'Google Sign-In was cancelled or failed.',
        'error'
      );
    }
  };

  const handleSignOut = async () => {
    await signOutGoogle();
    setSyncStatus('offline');
    notify(lang === 'bn' ? 'সাইন-আউট সম্পন্ন হয়েছে।' : 'Signed out.', 'info');
  };

  const t = translations[lang];
  const userFirstName = currentUser?.displayName
    ? currentUser.displayName.split(' ')[0]
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 flex flex-col">
      <TopAppBar
        lang={lang}
        activeTab={activeTab}
        syncStatus={syncStatus}
        userFirstName={userFirstName}
        onBack={handleBack}
        onToggleLanguage={handleToggleLanguage}
        onOpenSyncModal={() => setSyncModalOpen(true)}
        onOpenHistory={() => setHistoryDrawerOpen(true)}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        {activeTab === 'epi' && (
          <DashboardHome
            lang={lang}
            selectedDob={selectedDob}
            onSelectDob={setSelectedDob}
            onCalculateEpi={handleCalculateEpi}
            onNavigateTab={switchTab}
            onNotify={notify}
          />
        )}

        {activeTab === 'microplan' && (
          <MicroplanView
            lang={lang}
            centerNames={centerNames}
            allOverrides={allOverrides}
            onSaveMicroplan={handleSaveMicroplan}
            onResetYear={handleResetMicroplanYear}
            onNotify={notify}
          />
        )}

        {activeTab === 'anc' && <AncCalculatorView lang={lang} onNotify={notify} />}

        {activeTab === 'adolescent' && (
          <AdolescentCareView lang={lang} onNotify={notify} />
        )}

        {activeTab === 'age' && <AgeCalculatorView lang={lang} onNotify={notify} />}

        {activeTab === 'notes' && (
          <NotesView
            lang={lang}
            notes={notes}
            onSaveNotes={handleSaveNotes}
            onNotify={notify}
          />
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 pt-6 pb-2 text-center text-xs text-slate-500">
        {t.copyright}
      </footer>

      {!isOnline && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold shadow-lg flex items-center gap-2 whitespace-nowrap">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t.offlineBanner}</span>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className={`fixed top-16 right-4 z-50 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-lg text-white ${
            toast.type === 'error'
              ? 'bg-rose-600'
              : toast.type === 'success'
              ? 'bg-emerald-700'
              : 'bg-slate-800'
          }`}
        >
          {toast.message}
        </div>
      )}

      <BottomNav
        lang={lang}
        activeTab={activeTab}
        onSelectTab={switchTab}
        onOpenVaccines={() => setDiseaseListOpen(true)}
      />

      <DiseaseModals
        lang={lang}
        listOpen={diseaseListOpen}
        selectedDiseaseKey={selectedDiseaseKey}
        onCloseList={() => setDiseaseListOpen(false)}
        onSelectDisease={(key) => setSelectedDiseaseKey(key)}
        onCloseDetail={() => setSelectedDiseaseKey(null)}
      />

      <HistoryDrawer
        lang={lang}
        open={historyDrawerOpen}
        history={history}
        onClose={() => setHistoryDrawerOpen(false)}
        onSelectDob={(dob) => {
          setSelectedDob(dob);
          switchTab('epi');
        }}
        onClearAll={handleClearHistory}
      />

      <CloudSyncModal
        lang={lang}
        open={syncModalOpen}
        user={currentUser}
        syncStatus={syncStatus}
        onClose={() => setSyncModalOpen(false)}
        onSignIn={() => void handleSignIn()}
        onSignOut={() => void handleSignOut()}
        onSyncNow={() => currentUser && void pushToCloud(currentUser.uid)}
      />
    </div>
  );
}
