import React from 'react';

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
const OCCASIONS = ['Office', 'Daily Wear', 'Formal', 'Wedding', 'Date Night', 'Party', 'Casual', 'Travel', 'Special Occasion'];

interface Props {
  seasons: string[];
  occasions: string[];
  onSeasonsChange: (val: string[]) => void;
  onOccasionsChange: (val: string[]) => void;
}

export const SeasonOccasionSelectors: React.FC<Props> = ({ 
  seasons, occasions, onSeasonsChange, onOccasionsChange 
}) => {

  const toggleSeason = (season: string) => {
    if (seasons.includes(season)) {
      onSeasonsChange(seasons.filter(s => s !== season));
    } else {
      onSeasonsChange([...seasons, season]);
    }
  };

  const toggleOccasion = (occasion: string) => {
    if (occasions.includes(occasion)) {
      onOccasionsChange(occasions.filter(o => o !== occasion));
    } else {
      onOccasionsChange([...occasions, occasion]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">Recommended Seasons</label>
        <div className="flex flex-wrap gap-2">
          {SEASONS.map(season => {
            const isSelected = seasons.includes(season);
            return (
              <button
                key={season}
                type="button"
                onClick={() => toggleSeason(season)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors border ${
                  isSelected 
                    ? 'bg-neutral-900 text-white border-neutral-900' 
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {season}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">Recommended Occasions</label>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map(occasion => {
            const isSelected = occasions.includes(occasion);
            return (
              <button
                key={occasion}
                type="button"
                onClick={() => toggleOccasion(occasion)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors border ${
                  isSelected 
                    ? 'bg-neutral-900 text-white border-neutral-900' 
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {occasion}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
