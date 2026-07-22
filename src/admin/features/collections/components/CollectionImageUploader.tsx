import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface CollectionImageUploaderProps {
  label: string;
  description: string;
  imageUrl: string | null;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => void;
  aspectRatio?: 'square' | 'banner';
}

export function CollectionImageUploader({
  label,
  description,
  imageUrl,
  onUpload,
  onRemove,
  aspectRatio = 'square'
}: CollectionImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      setIsUploading(true);
      await onUpload(file);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <p className="text-xs text-slate-500 mb-3">{description}</p>
      
      {imageUrl ? (
        <div className={cn(
          "relative rounded-xl border border-slate-200/60 overflow-hidden bg-slate-100 group",
          aspectRatio === 'banner' ? 'aspect-[3/1]' : 'aspect-square max-w-sm'
        )}>
          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer transition-colors bg-slate-50/50",
            aspectRatio === 'banner' ? 'aspect-[4/1] md:aspect-[5/1]' : 'aspect-square max-w-sm',
            isDragging 
              ? 'border-indigo-500 bg-indigo-50/50' 
              : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30'
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-medium text-indigo-600">Uploading...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Upload className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1">
                Click or drag image here
              </p>
              <p className="text-xs text-slate-500 text-center max-w-xs">
                {aspectRatio === 'banner' ? 'Recommended: 2400x800px' : 'Recommended: 1080x1080px'}
              </p>
            </>
          )}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          // reset so same file can be picked again if needed
          e.target.value = '';
        }}
        className="hidden"
      />
    </div>
  );
}
