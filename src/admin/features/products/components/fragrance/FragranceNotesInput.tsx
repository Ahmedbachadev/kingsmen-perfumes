import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface Props {
  label: string;
  notes: string[];
  onChange: (notes: string[]) => void;
  suggestions?: string[];
}

export const FragranceNotesInput: React.FC<Props> = ({ label, notes = [], onChange, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleAdd = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !notes.find(n => n.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...notes, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && notes.length > 0) {
      onChange(notes.slice(0, -1));
    }
  };

  const handleRemove = (noteToRemove: string) => {
    onChange(notes.filter(note => note !== noteToRemove));
  };

  const filteredSuggestions = suggestions.filter(
    s => s.toLowerCase().includes(inputValue.toLowerCase()) && !notes.find(n => n.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="space-y-2 relative">
      <label className="block text-sm font-medium text-neutral-700">{label}</label>
      <div 
        className={`flex flex-wrap items-center gap-2 p-2 border rounded-lg transition-colors ${
          isFocused ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-300'
        }`}
      >
        {notes.map((note) => (
          <span 
            key={note} 
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 text-sm font-medium text-neutral-800"
          >
            {note}
            <button
              type="button"
              onClick={() => handleRemove(note)}
              className="p-0.5 text-neutral-400 hover:text-neutral-600 rounded-sm hover:bg-neutral-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay hide to allow click on suggestions
            setTimeout(() => setIsFocused(false), 200);
            if (inputValue.trim()) handleAdd(inputValue);
          }}
          className="flex-1 min-w-[120px] outline-none text-sm text-neutral-900 bg-transparent placeholder:text-neutral-400"
          placeholder={notes.length === 0 ? "Type and press Enter..." : ""}
        />
      </div>

      {/* Suggestions dropdown */}
      {isFocused && inputValue && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleAdd(suggestion)}
              className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center justify-between group"
            >
              {suggestion}
              <Plus className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
