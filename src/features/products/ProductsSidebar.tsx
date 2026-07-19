import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type FilterState = {
  gender: string[];
  occasion: string[];
  season: string[];
};

interface ProductsSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FILTER_GROUPS = [
  {
    id: 'gender',
    label: 'Gender',
    options: ['Gentlemen', 'Ladies', 'Unisex'],
  },
  {
    id: 'occasion',
    label: 'Occasion',
    options: ['Daily Wear', 'Evening', 'Date Night', 'Formal'],
  },
  {
    id: 'season',
    label: 'Season',
    options: ['Spring', 'Summer', 'Autumn', 'Winter'],
  },
];

export function ProductsSidebar({ filters, setFilters }: ProductsSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['gender', 'occasion']);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleFilter = (groupId: keyof FilterState, option: string) => {
    setFilters(prev => {
      const current = prev[groupId];
      const updated = current.includes(option) 
        ? current.filter(o => o !== option)
        : [...current, option];
      return { ...prev, [groupId]: updated };
    });
  };

  return (
    <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <h3 className="text-white tracking-[0.2em] uppercase text-xs font-light">Filters</h3>
        <button 
          onClick={() => setFilters({ gender: [], occasion: [], season: [] })}
          className="text-[#E8D3A2] text-[10px] tracking-widest uppercase hover:text-white transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {FILTER_GROUPS.map((group) => {
          const isExpanded = expandedGroups.includes(group.id);
          return (
            <div key={group.id} className="border-b border-white/5 pb-2">
              <button 
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between py-3 text-white/80 hover:text-white transition-colors"
              >
                <span className="text-xs uppercase tracking-[0.1em] font-light">{group.label}</span>
                <motion.svg 
                  animate={{ rotate: isExpanded ? 180 : 0 }} 
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="py-2 flex flex-col gap-3">
                      {group.options.map((option) => {
                        const isChecked = filters[group.id as keyof FilterState].includes(option);
                        return (
                          <label 
                            key={option} 
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFilter(group.id as keyof FilterState, option);
                            }}
                          >
                            <div className="relative w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center bg-white/[0.02] group-hover:border-[#E8D3A2]/50 transition-colors">
                              <motion.div 
                                initial={false}
                                animate={{ scale: isChecked ? 1 : 0 }}
                                className="w-2 h-2 bg-[#E8D3A2] rounded-[1px]"
                              />
                            </div>
                            <span className={`text-sm font-light transition-colors ${isChecked ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
