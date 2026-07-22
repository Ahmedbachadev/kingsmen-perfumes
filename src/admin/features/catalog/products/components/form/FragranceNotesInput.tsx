import React, { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

interface FragranceNotesInputProps {
  label: string;
  notes: string[];
  suggestions: readonly string[];
  onChange: (notes: string[]) => void;
  placeholder?: string;
}

export function FragranceNotesInput({
  label,
  notes,
  suggestions,
  onChange,
  placeholder = 'Type to add note...',
}: FragranceNotesInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter out already selected notes from suggestions
  const availableSuggestions = suggestions.filter(
    (s) => !notes.includes(s) && s.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddNote = (note: string) => {
    const trimmed = note.trim();
    if (trimmed && !notes.includes(trimmed)) {
      onChange([...notes, trimmed]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNote(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && notes.length > 0) {
      onChange(notes.slice(0, -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const removeNote = (noteToRemove: string) => {
    onChange(notes.filter((n) => n !== noteToRemove));
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div
        className="min-h-[44px] flex flex-wrap gap-2 px-3 py-2 bg-slate-50 border border-slate-200/60 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out cursor-text"
        onClick={() => {
          inputRef.current?.focus();
          setShowSuggestions(true);
        }}
      >
        {notes.map((note) => (
          <span
            key={note}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100/60 text-xs font-medium text-indigo-700"
          >
            {note}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeNote(note);
              }}
              className="text-indigo-400 hover:text-indigo-600 focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={notes.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none border-none p-0 focus:ring-0"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && availableSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200/60 rounded-xl shadow-lg max-h-60 overflow-auto custom-scrollbar">
          {availableSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleAddNote(suggestion)}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
