import { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onKeyDown }, ref) => {
    return (
      <div className="relative flex items-center px-6 py-5">
        <Search className="w-5 h-5 text-white/40 mr-4" />
        <motion.input
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search collections, notes, products..."
          className="w-full bg-transparent border-none outline-none text-white text-lg font-light placeholder:text-white/30"
          spellCheck={false}
        />
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';
