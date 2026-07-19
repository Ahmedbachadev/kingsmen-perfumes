import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit2, MoreVertical } from 'lucide-react';
import type { ProductImage } from '../../types/product';
import { ImagePreview } from './ImagePreview';
import { FeaturedBadge } from './FeaturedBadge';

interface Props {
  image: ProductImage;
  onDelete: (id: string) => void;
  onSetFeatured: (id: string) => void;
  onUpdateAlt: (id: string, alt: string) => void;
}

export const ImageCard: React.FC<Props> = ({
  image,
  onDelete,
  onSetFeatured,
  onUpdateAlt
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isEditingAlt, setIsEditingAlt] = useState(false);
  const [altText, setAltText] = useState(image.alt_text || '');
  const [showMenu, setShowMenu] = useState(false);

  const handleAltSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAlt(image.id, altText);
    setIsEditingAlt(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white rounded-xl border ${
        image.is_featured ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-200'
      } overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-20 hover:bg-neutral-100"
      >
        <GripVertical className="w-4 h-4 text-neutral-700" />
      </div>

      {image.is_featured && <FeaturedBadge />}

      {/* Image Area */}
      <div className="aspect-square relative group/img">
        <ImagePreview src={image.image_url} alt={image.alt_text || 'Product image'} className="w-full h-full" />
        
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
          {!image.is_featured && (
            <button
              type="button"
              onClick={() => onSetFeatured(image.id)}
              className="px-3 py-1.5 bg-white text-neutral-900 text-xs font-medium rounded-lg shadow-sm hover:bg-neutral-50 transition-colors"
            >
              Make Featured
            </button>
          )}
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="p-3 bg-white border-t border-neutral-100 relative">
        <div className="flex items-center justify-between gap-2">
          {isEditingAlt ? (
            <form onSubmit={handleAltSubmit} className="flex-1 flex gap-1">
              <input
                autoFocus
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                onBlur={() => {
                  onUpdateAlt(image.id, altText);
                  setIsEditingAlt(false);
                }}
                className="flex-1 text-xs px-2 py-1 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
                placeholder="Alt text..."
              />
            </form>
          ) : (
            <p 
              className="text-xs text-neutral-600 truncate flex-1 cursor-pointer hover:text-neutral-900"
              onClick={() => setIsEditingAlt(true)}
              title="Click to edit alt text"
            >
              {image.alt_text || 'Add alt text...'}
            </p>
          )}
          
          <div className="relative">
            <button 
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-100"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute bottom-full right-0 mb-1 w-36 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden z-40 py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingAlt(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit alt text
                  </button>
                  <div className="h-px bg-neutral-100 my-1" />
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(image.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete image
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
