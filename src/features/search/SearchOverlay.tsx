import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useSearchContext } from '../../contexts/SearchContext';
import { useSearch } from '../../hooks/useSearch';
import { useRecentSearches } from '../../hooks/useRecentSearches';

import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { SearchRecent } from './SearchRecent';
import { SearchEmpty } from './SearchEmpty';

export const SearchOverlay = () => {
  const { isOpen, closeSearch } = useSearchContext();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const { results, loading } = useSearch(query);
  const { recentSearches, addSearch, clearSearches } = useRecentSearches();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (query && results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (!query && recentSearches.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % recentSearches.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (query && results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (!query && recentSearches.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + recentSearches.length) % recentSearches.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (query && results.length > 0) {
        handleSelect(results[selectedIndex].handle);
      } else if (!query && recentSearches.length > 0 && selectedIndex < recentSearches.length) {
        setQuery(recentSearches[selectedIndex]);
      }
    }
  };

  const handleSelect = (handle: string) => {
    if (query) addSearch(query);
    closeSearch();
    navigate(`/products/${handle}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black/60"
            onClick={closeSearch}
          />

          {/* Panel */}
          <motion.div
            layoutId="search-glass"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[700px] bg-[rgba(20,20,20,0.6)] border border-[rgba(235,213,179,0.15)] rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col mx-4"
            style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}
          >
            <SearchInput
              ref={inputRef}
              value={query}
              onChange={(v) => setQuery(v)}
              onKeyDown={handleKeyDown}
            />

            <div className="border-t border-white/[0.05] max-h-[50vh] overflow-y-auto no-scrollbar">
              {query.length > 0 ? (
                results.length > 0 ? (
                  <SearchResults results={results} selectedIndex={selectedIndex} onSelect={handleSelect} />
                ) : (
                  <SearchEmpty query={query} loading={loading} />
                )
              ) : (
                <SearchRecent
                  searches={recentSearches}
                  selectedIndex={selectedIndex}
                  onSelect={(q) => setQuery(q)}
                  onClear={clearSearches}
                />
              )}
            </div>
            
            {/* Footer commands */}
            <div className="border-t border-white/[0.05] px-6 py-3 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest bg-black/20">
              <div className="flex gap-4">
                <span><kbd className="font-sans px-1.5 py-0.5 rounded bg-white/10 mr-1">↑</kbd><kbd className="font-sans px-1.5 py-0.5 rounded bg-white/10 mr-1">↓</kbd> Navigate</span>
                <span><kbd className="font-sans px-1.5 py-0.5 rounded bg-white/10 mr-1">↵</kbd> Select</span>
              </div>
              <span><kbd className="font-sans px-1.5 py-0.5 rounded bg-white/10 mr-1">ESC</kbd> Close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
