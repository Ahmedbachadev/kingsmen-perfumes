import React from 'react';
import { Trash2, Star, GripVertical } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import type { ProductFormData } from '../../types/product-form.types';

interface ProductMediaSectionProps {
  images: ProductFormData['images'];
  onUpload: (files: File[]) => void;
  onRemove: (id: string) => void;
  onSetThumbnail: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function ProductMediaSection({
  images,
  onUpload,
  onRemove,
  onSetThumbnail,
  onReorder
}: ProductMediaSectionProps) {

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (dragIndex !== dropIndex) {
      onReorder(dragIndex, dropIndex);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Media</h2>
          <p className="text-sm text-slate-500 mt-0.5">Upload images of your product.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Upload Zone */}
        <ImageUploader onUpload={onUpload} />

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div 
                key={img.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`group relative aspect-square rounded-xl border ${img.isThumbnail || (index === 0 && !images.some(i => i.isThumbnail)) ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-slate-200/60'} bg-slate-50 overflow-hidden cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-300`}
              >
                <img 
                  src={img.url} 
                  alt="Product preview" 
                  className={`w-full h-full object-cover transition-all duration-500 ${img.isUploading ? 'opacity-50 blur-sm scale-105' : 'group-hover:scale-105'}`}
                />
                
                {/* Uploading Overlay */}
                {img.isUploading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <span className="text-xs font-semibold text-indigo-700">Uploading...</span>
                  </div>
                )}

                {/* Actions Overlay */}
                {!img.isUploading && (
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                    <div className="flex justify-between items-start">
                      <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-lg cursor-grab">
                        <GripVertical className="w-4 h-4 text-white" />
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(img.id)}
                        className="p-1.5 bg-white/10 hover:bg-rose-500 backdrop-blur-md rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => onSetThumbnail(img.id)}
                      className={`w-full py-1.5 text-xs font-medium rounded-lg backdrop-blur-md transition-colors ${img.isThumbnail || (index === 0 && !images.some(i => i.isThumbnail)) ? 'bg-indigo-500/90 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
                    >
                      {img.isThumbnail || (index === 0 && !images.some(i => i.isThumbnail)) ? 'Thumbnail' : 'Make Thumbnail'}
                    </button>
                  </div>
                )}

                {/* Thumbnail Badge (persistent if thumbnail) */}
                {(img.isThumbnail || (index === 0 && !images.some(i => i.isThumbnail))) && !img.isUploading && (
                  <div className="absolute top-2 left-2 p-1 bg-amber-500 rounded-md shadow-sm opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
