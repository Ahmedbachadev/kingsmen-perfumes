import React, { useCallback } from 'react';
import { UploadCloud } from 'lucide-react';

interface Props {
  onUpload: (files: File[]) => void;
  isCompact?: boolean;
}

export const UploadZone: React.FC<Props> = ({ onUpload, isCompact = false }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onUpload(files);
      }
    },
    [onUpload]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(Array.from(e.target.files));
      // Reset the input so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  if (isCompact) {
    return (
      <div 
        className="w-full flex items-center justify-between p-4 border border-dashed border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <UploadCloud className="w-5 h-5 text-neutral-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">Add more images</p>
            <p className="text-xs text-neutral-500">Drag and drop or click to browse</p>
          </div>
        </div>
        <label className="cursor-pointer px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm">
          Browse Files
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileInput}
          />
        </label>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-full relative border-2 border-dashed border-neutral-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-neutral-50 hover:bg-neutral-100 transition-colors group"
    >
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-105 transition-transform">
        <UploadCloud className="w-8 h-8 text-neutral-700" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-1">Upload images</h3>
      <p className="text-sm text-neutral-500 text-center max-w-sm mb-6">
        Drag and drop your images here, or click to browse files. Supports JPG, PNG, and WEBP up to 10MB.
      </p>
      <div className="px-6 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 shadow-sm pointer-events-none">
        Select Files
      </div>
    </div>
  );
};
