import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  disabled?: boolean;
}

export function ImageUploader({ onUpload, disabled }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onUpload(files);
    }
  }, [disabled, onUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files) return;
    
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onUpload(files);
    }
    
    // Reset input
    e.target.value = '';
  }, [disabled, onUpload]);

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ease-out text-center flex flex-col items-center justify-center min-h-[160px] group",
        disabled ? "opacity-50 cursor-not-allowed border-slate-200 bg-slate-50" : 
        isDragging 
          ? "border-indigo-500 bg-indigo-50/50 scale-[0.99]" 
          : "border-slate-200/80 bg-slate-50/50 hover:border-indigo-400 hover:bg-slate-50 cursor-pointer"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-300",
        isDragging ? "bg-indigo-100 text-indigo-600" : "bg-white border border-slate-200/60 text-slate-400 group-hover:text-indigo-500 shadow-sm"
      )}>
        <UploadCloud className="w-5 h-5" />
      </div>
      <p className="text-sm font-medium text-slate-900 mb-1">
        {isDragging ? 'Drop images here' : 'Click or drag images to upload'}
      </p>
      <p className="text-xs text-slate-500">
        SVG, PNG, JPG or GIF (max. 5MB)
      </p>
      
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
    </div>
  );
}
