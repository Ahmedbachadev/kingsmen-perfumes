import React from 'react';

const FAMILIES = [
  'Woody', 'Floral', 'Oriental', 'Fresh', 'Citrus', 'Fruity', 
  'Aquatic', 'Aromatic', 'Spicy', 'Leather', 'Gourmand', 'Amber', 'Musky'
];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const FragranceFamilySelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-1 text-left">
      <label className="block text-sm font-medium text-neutral-700">Fragrance Family</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
      >
        <option value="">Select a family</option>
        {FAMILIES.map(family => (
          <option key={family} value={family}>{family}</option>
        ))}
      </select>
    </div>
  );
};
