import React from 'react';
import type { ProductFormData, ValidationErrors } from '../../validation/productSchema';

import { FragranceFamilySelect } from './FragranceFamilySelect';
import { ConcentrationSelect } from './ConcentrationSelect';
import { GenderSelect } from './GenderSelect';
import { FragranceNotesInput } from './FragranceNotesInput';
import { LongevityProjectionSelects } from './LongevityProjectionSelects';
import { SeasonOccasionSelectors } from './SeasonOccasionSelectors';
import { BottleSizeManager } from './BottleSizeManager';

interface Props {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
  errors?: ValidationErrors;
}

export const ProductFragranceSection: React.FC<Props> = ({ data, onChange, errors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-8">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Fragrance Information</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Specify perfume details to help customers find the right scent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FragranceFamilySelect 
          value={data.fragrance_family} 
          onChange={(val) => onChange('fragrance_family', val)} 
        />
        <ConcentrationSelect 
          value={data.concentration} 
          onChange={(val) => onChange('concentration', val)} 
        />
        <GenderSelect 
          value={data.gender} 
          onChange={(val) => onChange('gender', val)} 
        />
      </div>

      <hr className="border-neutral-200" />

      <div className="space-y-6">
        <h3 className="text-sm font-medium text-neutral-900">Scent Profile</h3>
        <FragranceNotesInput 
          label="Top Notes" 
          notes={data.top_notes} 
          onChange={(val) => onChange('top_notes', val)} 
        />
        {errors?.top_notes && <p className="text-sm text-red-600 mt-1">{errors.top_notes}</p>}
        
        <FragranceNotesInput 
          label="Heart (Middle) Notes" 
          notes={data.heart_notes} 
          onChange={(val) => onChange('heart_notes', val)} 
        />
        {errors?.heart_notes && <p className="text-sm text-red-600 mt-1">{errors.heart_notes}</p>}
        
        <FragranceNotesInput 
          label="Base Notes" 
          notes={data.base_notes} 
          onChange={(val) => onChange('base_notes', val)} 
        />
        {errors?.base_notes && <p className="text-sm text-red-600 mt-1">{errors.base_notes}</p>}
      </div>

      <hr className="border-neutral-200" />

      <LongevityProjectionSelects 
        longevity={data.longevity}
        projection={data.projection}
        onLongevityChange={(val) => onChange('longevity', val)}
        onProjectionChange={(val) => onChange('projection', val)}
      />

      <hr className="border-neutral-200" />

      <SeasonOccasionSelectors 
        seasons={data.recommended_seasons}
        occasions={data.recommended_occasions}
        onSeasonsChange={(val) => onChange('recommended_seasons', val)}
        onOccasionsChange={(val) => onChange('recommended_occasions', val)}
      />

      <hr className="border-neutral-200" />

      <BottleSizeManager 
        sizes={data.bottle_sizes}
        onChange={(val) => onChange('bottle_sizes', val)}
      />
    </div>
  );
};
