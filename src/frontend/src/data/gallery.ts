export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    src: '/assets/generated/gallery-african-dish.dim_1200x800.png',
    alt: 'Traditional African dish beautifully plated with rich colors and authentic presentation',
    caption: 'Authentic African Cuisine',
    category: 'African Dishes',
  },
  {
    id: 'gal-2',
    src: '/assets/generated/gallery-continental-dish.dim_1200x800.png',
    alt: 'Elegant continental dish with fresh ingredients and artistic plating',
    caption: 'Continental Excellence',
    category: 'Continental',
  },
  {
    id: 'gal-3',
    src: '/assets/generated/gallery-pastries.dim_1200x800.png',
    alt: 'Assortment of freshly baked pastries including meat pies and sausage rolls',
    caption: 'Fresh Baked Pastries',
    category: 'Pastries',
  },
  {
    id: 'gal-4',
    src: '/assets/generated/gallery-natural-drinks.dim_1200x800.png',
    alt: 'Colorful natural drinks including zobo and fresh fruit smoothies',
    caption: 'Natural Refreshments',
    category: 'Drinks',
  },
];
