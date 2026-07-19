import React from 'react';

const LONGEVITY_OPTIONS = ['2–4 Hours', '4–6 Hours', '6–8 Hours', '8–12 Hours', '12+ Hours'];
const PROJECTION_OPTIONS = ['Soft', 'Moderate', 'Strong', 'Beast Mode'];

interface Props {
  longevity: string;
  projection: string;
  onLongevityChange: (val: string) => void;
  onProjectionChange: (val: string) => void;
}

export const LongevityProjectionSelects: React.FC<Props> = ({ 
  longevity, projection, onLongevityChange, onProjectionChange 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1 text-left">
        <label className="block text-sm font-medium text-neutral-700">Longevity</label>
        <select 
          value={longevity}
          onChange={(e) => onLongevityChange(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
        >
          <option value="">Select longevity</option>
          {LONGEVITY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1 text-left">
        <label className="block text-sm font-medium text-neutral-700">Projection</label>
        <select 
          value={projection}
          onChange={(e) => onProjectionChange(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
        >
          <option value="">Select projection</option>
          {PROJECTION_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
