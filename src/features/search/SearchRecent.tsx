import { Clock, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchRecentProps {
  searches: string[];
  selectedIndex: number;
  onSelect: (query: string) => void;
  onClear: () => void;
}

export const SearchRecent = ({ searches, selectedIndex, onSelect, onClear }: SearchRecentProps) => {
  if (searches.length === 0) return null;

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between px-2 mb-2">
        <span className="text-white/30 text-[10px] uppercase tracking-widest block">Recent Searches</span>
        <button onClick={onClear} className="text-white/30 hover:text-white/70 text-[10px] uppercase tracking-widest transition-colors flex items-center">
          <Trash2 className="w-3 h-3 mr-1" /> Clear
        </button>
      </div>
      {searches.map((search, idx) => (
        <motion.div
          key={search}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => onSelect(search)}
          className={`flex items-center px-4 py-3 rounded-xl cursor-pointer transition-colors duration-300 ${
            idx === selectedIndex ? 'bg-white/10' : 'hover:bg-white/[0.05]'
          }`}
        >
          <Clock className="w-4 h-4 text-white/40 mr-4" />
          <span className="text-white text-sm font-light tracking-wide">{search}</span>
        </motion.div>
      ))}
    </div>
  );
};
