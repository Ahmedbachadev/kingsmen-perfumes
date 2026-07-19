import React from 'react';

const GENDERS = ['Gentlemen', 'Ladies', 'Unisex'];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const GenderSelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-1 text-left">
      <label className="block text-sm font-medium text-neutral-700">Gender</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
      >
        <option value="">Select gender</option>
        {GENDERS.map(gender => (
          <option key={gender} value={gender}>{gender}</option>
        ))}
      </select>
    </div>
  );
};
