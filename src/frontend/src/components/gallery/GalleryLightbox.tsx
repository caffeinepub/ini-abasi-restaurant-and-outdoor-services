import { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '../../data/gallery';

interface GalleryLightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
}

export default function GalleryLightbox({ items, selectedIndex, onClose }: GalleryLightboxProps) {
  const isOpen = selectedIndex !== null;
  const currentItem = selectedIndex !== null ? items[selectedIndex] : null;

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      // Update URL or state if needed
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < items.length - 1) {
      const newIndex = selectedIndex + 1;
      // Update URL or state if needed
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex]);

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-0">
        <DialogTitle className="sr-only">{currentItem.caption}</DialogTitle>
        <DialogDescription className="sr-only">{currentItem.alt}</DialogDescription>
        
        <div className="relative">
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            className="h-auto w-full rounded-lg"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h3 className="font-serif text-xl font-semibold">{currentItem.caption}</h3>
            <p className="mt-1 text-sm text-white/80">{currentItem.category}</p>
          </div>

          {selectedIndex !== null && selectedIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
          )}

          {selectedIndex !== null && selectedIndex < items.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
