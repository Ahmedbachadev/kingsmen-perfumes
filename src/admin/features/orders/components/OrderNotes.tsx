import React, { useState, useEffect } from 'react';

interface Props {
  notes?: string | null;
  onSave: (notes: string) => Promise<boolean>;
}

export const OrderNotes: React.FC<Props> = ({ notes, onSave }) => {
  const [value, setValue] = useState(notes || '');
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setValue(notes || '');
    setIsDirty(false);
  }, [notes]);

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(value);
    if (success) {
      setIsDirty(false);
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-neutral-900">Private Notes</h2>
        <span className="text-xs text-neutral-500">Only visible to staff</span>
      </div>

      <textarea
        rows={4}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setIsDirty(true);
        }}
        placeholder="Add a private note about this order..."
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-y text-sm"
      />

      {isDirty && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      )}
    </div>
  );
};
