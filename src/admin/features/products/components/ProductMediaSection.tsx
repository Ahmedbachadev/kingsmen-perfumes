import React from 'react';
import type { ProductFormData, ValidationErrors } from '../validation/productSchema';
import { ImageUploader } from '../media/ImageUploader';

interface Props {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
  errors: ValidationErrors;
}

export const ProductMediaSection: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Media</h2>
        <p className="text-sm text-neutral-500 mt-1">Manage product images and featured status.</p>
      </div>

      <ImageUploader 
        initialImages={data.images} 
        onImagesChange={(images) => onChange('images', images)}
      />
    </div>
  );
};
