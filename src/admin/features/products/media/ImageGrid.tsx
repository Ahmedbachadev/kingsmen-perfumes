import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import type { ProductImage } from '../../types/product';
import { ImageCard } from './ImageCard';

interface Props {
  images: ProductImage[];
  onReorder: (newOrder: ProductImage[]) => void;
  onDelete: (id: string) => void;
  onSetFeatured: (id: string) => void;
  onUpdateAlt: (id: string, alt: string) => void;
}

export const ImageGrid: React.FC<Props> = ({
  images,
  onReorder,
  onDelete,
  onSetFeatured,
  onUpdateAlt,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require dragging a bit before activating, helps with click events inside the card
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      
      const newOrder = arrayMove(images, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  if (images.length === 0) return null;

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={images.map(img => img.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onDelete={onDelete}
              onSetFeatured={onSetFeatured}
              onUpdateAlt={onUpdateAlt}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
