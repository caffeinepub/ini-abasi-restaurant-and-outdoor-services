import { useState } from 'react';
import GalleryLightbox from './GalleryLightbox';
import type { GalleryItem } from '../../data/gallery';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[3/2] overflow-hidden rounded-lg bg-muted transition-transform hover:scale-[1.02]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <p className="font-serif text-lg font-semibold text-white">{item.caption}</p>
                <p className="text-sm text-white/80">{item.category}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <GalleryLightbox
        items={items}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
