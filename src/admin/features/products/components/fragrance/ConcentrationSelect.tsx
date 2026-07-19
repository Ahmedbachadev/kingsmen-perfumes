import React from 'react';

const CONCENTRATIONS = [
  'Eau de Cologne (EDC)',
  'Eau de Toilette (EDT)',
  'Eau de Parfum (EDP)',
  'Parfum',
  'Extrait de Parfum'
];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const ConcentrationSelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-1 text-left">
      <label className="block text-sm font-medium text-neutral-700">Concentration</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
      >
        <option value="">Select concentration</option>
        {CONCENTRATIONS.map(conc => (
          <option key={conc} value={conc}>{conc}</option>
        ))}
      </select>
    </div>
  );
};
