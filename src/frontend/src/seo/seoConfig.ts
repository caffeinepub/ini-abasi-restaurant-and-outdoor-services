import { siteConfig } from '../config/site';

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export const defaultSEO: PageSEO = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  ogImage: '/assets/generated/ini-abasi-hero.dim_1600x900.png',
};

export const pageSEO: Record<string, PageSEO> = {
  home: {
    title: `${siteConfig.name} - Authentic African & Continental Cuisine`,
    description: 'Experience the rich flavors of African and continental dishes, fresh pastries, natural drinks, and exceptional event catering services.',
    keywords: [...siteConfig.keywords, 'home', 'restaurant'],
    ogImage: '/assets/generated/ini-abasi-hero.dim_1600x900.png',
  },
  menu: {
    title: `Menu - ${siteConfig.name}`,
    description: 'Explore our diverse menu featuring traditional African dishes, continental favorites, artisan pastries, and refreshing natural drinks.',
    keywords: [...siteConfig.keywords, 'menu', 'food menu', 'dishes'],
    ogImage: '/assets/generated/gallery-african-dish.dim_1200x800.png',
  },
  gallery: {
    title: `Gallery - ${siteConfig.name}`,
    description: 'View our collection of beautifully prepared African and continental dishes, pastries, and natural beverages.',
    keywords: [...siteConfig.keywords, 'gallery', 'photos', 'food photography'],
    ogImage: '/assets/generated/gallery-african-dish.dim_1200x800.png',
  },
  about: {
    title: `About Us - ${siteConfig.name}`,
    description: 'Learn about our commitment to authentic cultural cuisine, quality ingredients, and exceptional outdoor and event catering services.',
    keywords: [...siteConfig.keywords, 'about', 'story', 'mission'],
    ogImage: '/assets/generated/ini-abasi-logo.dim_512x512.png',
  },
  contact: {
    title: `Contact Us - ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}. Visit us, call, or send a message for reservations and catering inquiries.`,
    keywords: [...siteConfig.keywords, 'contact', 'location', 'hours'],
    ogImage: '/assets/generated/ini-abasi-logo.dim_512x512.png',
  },
  orderReserve: {
    title: `Reservations & Catering - ${siteConfig.name}`,
    description: 'Reserve a table or request catering services for your special event. We bring authentic flavors to your celebrations.',
    keywords: [...siteConfig.keywords, 'reservation', 'booking', 'catering request'],
    ogImage: '/assets/generated/ini-abasi-hero.dim_1600x900.png',
  },
};
