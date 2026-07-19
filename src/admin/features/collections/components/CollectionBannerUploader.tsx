import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadProductImage } from '../../products/services/productService'; // Reuse the generic uploader

interface Props {
  bannerUrl: string;
  thumbnailUrl: string;
  onChange: (field: 'banner' | 'featured_image', url: string) => void;
}

export const CollectionBannerUploader: React.FC<Props> = ({ bannerUrl, thumbnailUrl, onChange }) => {
  const [loading, setLoading] = useState<{ banner: boolean; thumb: boolean }>({ banner: false, thumb: false });
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'featured_image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(prev => ({ ...prev, [type === 'banner' ? 'banner' : 'thumb']: true }));
      const url = await uploadProductImage(file); // Stores in 'products' bucket
      onChange(type, url);
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, [type === 'banner' ? 'banner' : 'thumb']: false }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Collection Media</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Upload a hero banner and a square thumbnail for this collection.
        </p>
      </div>

      <div className="space-y-6">
        {/* Banner Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Banner Image</label>
          {bannerUrl ? (
            <div className="relative rounded-lg overflow-hidden border border-neutral-200 group">
              <img src={bannerUrl} alt="Banner" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onChange('banner', '')}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => bannerInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-neutral-400 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <input 
                type="file" 
                ref={bannerInputRef} 
                onChange={(e) => handleUpload(e, 'banner')} 
                accept="image/*" 
                className="hidden" 
              />
              <Upload className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
              <p className="text-sm font-medium text-neutral-900">
                {loading.banner ? 'Uploading...' : 'Click to upload banner'}
              </p>
              <p className="text-xs text-neutral-500 mt-1">Recommended size: 1920x600px</p>
            </div>
          )}
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Thumbnail Image</label>
          {thumbnailUrl ? (
            <div className="relative rounded-lg overflow-hidden border border-neutral-200 group w-48 h-48">
              <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onChange('featured_image', '')}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => thumbInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-300 rounded-lg w-48 h-48 flex flex-col items-center justify-center hover:border-neutral-400 hover:bg-neutral-50 cursor-pointer transition-colors text-center p-4"
            >
              <input 
                type="file" 
                ref={thumbInputRef} 
                onChange={(e) => handleUpload(e, 'featured_image')} 
                accept="image/*" 
                className="hidden" 
              />
              <ImageIcon className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
              <p className="text-sm font-medium text-neutral-900">
                {loading.thumb ? 'Uploading...' : 'Upload thumbnail'}
              </p>
              <p className="text-xs text-neutral-500 mt-1">1:1 Square</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
