import React, { useState, useEffect } from 'react';
import { StickyNote, Save, Loader2 } from 'lucide-react';

interface Props {
  notes?: string | null;
  onSave: (notes: string) => Promise<void>;
  saving: boolean;
}

export const CustomerNotes: React.FC<Props> = ({ notes = '', onSave, saving }) => {
  const [localNotes, setLocalNotes] = useState(notes || '');

  useEffect(() => {
    setLocalNotes(notes || '');
  }, [notes]);

  const handleSave = () => {
    if (localNotes !== notes) {
      onSave(localNotes);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-neutral-400" />
          Private Notes
        </h3>
        {localNotes !== notes && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs bg-neutral-900 text-white px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            Save Notes
          </button>
        )}
      </div>
      
      <p className="text-xs text-neutral-500 mb-3">
        These notes are only visible to staff and will not be seen by the customer.
      </p>

      <textarea
        value={localNotes}
        onChange={(e) => setLocalNotes(e.target.value)}
        placeholder="Add notes about this customer (e.g. preferences, past interactions...)"
        className="flex-1 w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 custom-scrollbar min-h-[150px]"
      />
    </div>
  );
};
