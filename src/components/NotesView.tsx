import React, {useMemo, useState} from 'react';
import {Pencil, Pin, Search, StickyNote, Trash2} from 'lucide-react';
import {NOTE_COLORS, translations} from '../data/epiData';
import type {KeepNote, Language} from '../types';

interface NotesViewProps {
  lang: Language;
  notes: KeepNote[];
  onSaveNotes: (nextNotes: KeepNote[]) => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  lang,
  notes,
  onSaveNotes,
  onNotify,
}) => {
  const t = translations[lang];
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<string>('#ffffff');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const resetComposer = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setColor('#ffffff');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle && !trimmedContent) {
      onNotify(
        lang === 'bn'
          ? 'অনুগ্রহ করে নোটের শিরোনাম বা বিবরণ লিখুন।'
          : 'Please enter a note title or content.',
        'error'
      );
      return;
    }

    const dateStr = new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US');

    if (editingId !== null) {
      const next = notes.map((n) =>
        n.id === editingId
          ? {...n, title: trimmedTitle, content: trimmedContent, color, date: dateStr}
          : n
      );
      onSaveNotes(next);
    } else {
      const newNote: KeepNote = {
        id: Date.now(),
        title: trimmedTitle,
        content: trimmedContent,
        color,
        pinned: false,
        date: dateStr,
      };
      onSaveNotes([newNote, ...notes]);
    }
    resetComposer();
  };

  const startEdit = (note: KeepNote) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setColor(note.color || '#ffffff');
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const togglePin = (id: number) => {
    onSaveNotes(notes.map((n) => (n.id === id ? {...n, pinned: !n.pinned} : n)));
  };

  const changeColor = (id: number, nextColor: string) => {
    onSaveNotes(notes.map((n) => (n.id === id ? {...n, color: nextColor} : n)));
  };

  const confirmDelete = () => {
    if (confirmDeleteId === null) return;
    if (editingId === confirmDeleteId) resetComposer();
    onSaveNotes(notes.filter((n) => n.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return [...notes]
      .filter(
        (n) =>
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      )
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [notes, searchQuery]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <StickyNote className="w-5 h-5" />
        </div>
        <h1 className="text-base sm:text-lg font-bold text-slate-900">{t.notesHeading}</h1>
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSave}
        style={{backgroundColor: color}}
        className={`rounded-2xl p-4 transition-colors ${
          editingId !== null ? 'border-2 border-teal-700' : 'border border-slate-200'
        }`}
      >
        {editingId !== null && (
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80 text-xs font-bold text-teal-800">
            <span>{t.editModeLabel}</span>
            <button
              type="button"
              onClick={resetComposer}
              className="text-rose-600 hover:underline font-bold"
            >
              {t.cancelBtn}
            </button>
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.noteTitlePlaceholder}
          className="w-full bg-transparent font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none mb-2 text-sm sm:text-base"
        />

        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t.noteContentPlaceholder}
          className="w-full bg-transparent text-slate-700 placeholder:text-slate-400 focus:outline-none text-sm resize-y"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-slate-200/70">
          <div className="flex items-center gap-2">
            {NOTE_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Select color ${c}`}
                onClick={() => setColor(c)}
                style={{backgroundColor: c}}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  color === c ? 'border-teal-700 scale-115 ring-2 ring-teal-500/30' : 'border-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {editingId !== null && (
              <button
                type="button"
                onClick={resetComposer}
                className="min-h-[40px] px-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-xs"
              >
                {t.cancelBtn}
              </button>
            )}
            <button
              type="submit"
              className="min-h-[40px] px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm transition"
            >
              {editingId !== null ? t.btnUpdateNote : t.btnSaveNote}
            </button>
          </div>
        </div>
      </form>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.noteSearchPlaceholder}
          className="w-full min-h-[44px] pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
        />
      </div>

      {/* Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-8 text-sm text-slate-500">{t.noNotes}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredNotes.map((note) => (
            <article
              key={note.id}
              style={{backgroundColor: note.color || '#ffffff'}}
              className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <button
                    type="button"
                    onClick={() => startEdit(note)}
                    className="text-left font-bold text-slate-900 text-sm sm:text-base hover:text-teal-800"
                  >
                    {note.title || (lang === 'bn' ? 'শিরোনামহীন' : 'Untitled')}
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePin(note.id)}
                    aria-label="Pin note"
                    className={`min-h-[36px] min-w-[36px] -mt-1 -mr-1 rounded-lg flex items-center justify-center transition ${
                      note.pinned ? 'text-teal-700 bg-teal-50' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                </div>

                {note.content && (
                  <p
                    onClick={() => startEdit(note)}
                    className="text-sm text-slate-700 whitespace-pre-wrap cursor-pointer leading-relaxed"
                  >
                    {note.content}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/70">
                <span className="text-[11px] text-slate-500 tabular-nums">{note.date}</span>

                <div className="flex items-center gap-1.5">
                  {NOTE_COLORS.slice(0, 4).map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Color ${c}`}
                      onClick={() => changeColor(note.id, c)}
                      style={{backgroundColor: c}}
                      className="w-4 h-4 rounded-full border border-slate-300"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => startEdit(note)}
                    aria-label="Edit note"
                    className="min-h-[36px] min-w-[36px] rounded-lg flex items-center justify-center text-sky-700 hover:bg-sky-50 ml-1"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(note.id)}
                    aria-label="Delete note"
                    className="min-h-[36px] min-w-[36px] rounded-lg flex items-center justify-center text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              {lang === 'bn' ? 'নোটটি মুছে ফেলবেন?' : 'Delete this note?'}
            </h3>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="min-h-[42px] px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm"
              >
                {t.cancelBtn}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="min-h-[42px] px-4 rounded-xl bg-rose-600 text-white font-semibold text-sm"
              >
                {lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
