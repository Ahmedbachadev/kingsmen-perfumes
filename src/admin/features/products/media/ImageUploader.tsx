import React from 'react';
import { UploadZone } from './UploadZone';
import { ImageGrid } from './ImageGrid';
import { useProductImages } from './hooks/useProductImages';

interface Props {
  productId?: string;
  // Fallbacks for when using this in a form that hasn't saved the product yet
  initialImages?: any[];
  onImagesChange?: (images: any[]) => void;
}

export const ImageUploader: React.FC<Props> = ({ 
  productId,
  initialImages,
  onImagesChange 
}) => {
  const {
    images,
    isLoading,
    isUploading,
    error,
    uploadImages,
    removeImage,
    reorderImages,
    setFeatured,
    updateAltText,
    setImages
  } = useProductImages(productId);

  // Sync initial images if provided (useful for Edit Product or Add Product form state)
  React.useEffect(() => {
    if (initialImages && !productId && images.length === 0) {
      setImages(initialImages);
    }
  }, [initialImages, productId]);

  // Sync back to parent form if needed
  React.useEffect(() => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  }, [images, onImagesChange]);

  const hasImages = images.length > 0;

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="h-32 flex items-center justify-center border border-neutral-200 rounded-xl bg-neutral-50">
          <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <UploadZone 
            onUpload={uploadImages} 
            isCompact={hasImages} 
          />

          {isUploading && (
            <div className="flex items-center gap-2 text-sm text-neutral-600 py-2">
              <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
              Uploading...
            </div>
          )}

          <ImageGrid 
            images={images}
            onReorder={reorderImages}
            onDelete={removeImage}
            onSetFeatured={setFeatured}
            onUpdateAlt={updateAltText}
          />
        </>
      )}
    </div>
  );
};
