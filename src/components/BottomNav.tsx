import React from 'react';
import {Home, ShieldAlert, StickyNote, Table2} from 'lucide-react';
import {translations} from '../data/epiData';
import type {Language, TabId} from '../types';

interface BottomNavProps {
  lang: Language;
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onOpenVaccines: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  lang,
  activeTab,
  onSelectTab,
  onOpenVaccines,
}) => {
  const t = translations[lang];

  const items: {
    id: string;
    label: string;
    active: boolean;
    icon: React.ReactNode;
    onClick: () => void;
  }[] = [
    {
      id: 'home',
      label: t.navDashboard,
      active: activeTab === 'epi' || activeTab === 'anc' || activeTab === 'adolescent' || activeTab === 'age',
      icon: <Home className="w-5 h-5" />,
      onClick: () => onSelectTab('epi'),
    },
    {
      id: 'vaccines',
      label: t.navVaccines,
      active: false,
      icon: <ShieldAlert className="w-5 h-5" />,
      onClick: onOpenVaccines,
    },
    {
      id: 'notes',
      label: t.navNotes,
      active: activeTab === 'notes',
      icon: <StickyNote className="w-5 h-5" />,
      onClick: () => onSelectTab('notes'),
    },
    {
      id: 'microplan',
      label: t.navMicroplan,
      active: activeTab === 'microplan',
      icon: <Table2 className="w-5 h-5" />,
      onClick: () => onSelectTab('microplan'),
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-4 h-16">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
              item.active ? 'text-teal-700 font-bold' : 'text-slate-500 font-medium hover:text-slate-800'
            }`}
          >
            <span
              className={`px-3 py-1 rounded-xl transition-colors ${
                item.active ? 'bg-teal-100 text-teal-800' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[11px] leading-none whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
