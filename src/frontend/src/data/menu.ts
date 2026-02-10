export type MenuCategory = 'african' | 'continental' | 'pastries' | 'drinks' | 'catering';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price?: string;
  tags?: string[];
}

export const menuCategories: { value: MenuCategory; label: string }[] = [
  { value: 'african', label: 'African Dishes' },
  { value: 'continental', label: 'Continental' },
  { value: 'pastries', label: 'Pastries' },
  { value: 'drinks', label: 'Natural Drinks' },
  { value: 'catering', label: 'Catering Packages' },
];

export const menuItems: MenuItem[] = [
  // African Dishes
  {
    id: 'af-1',
    name: 'Jollof Rice with Grilled Chicken',
    description: 'Our signature West African jollof rice cooked in rich tomato sauce, served with perfectly grilled chicken',
    category: 'african',
    price: '₦3,500',
    tags: ['popular', 'spicy'],
  },
  {
    id: 'af-2',
    name: 'Egusi Soup with Pounded Yam',
    description: 'Traditional melon seed soup with assorted meat and fish, served with smooth pounded yam',
    category: 'african',
    price: '₦4,200',
    tags: ['traditional'],
  },
  {
    id: 'af-3',
    name: 'Suya Platter',
    description: 'Spicy grilled beef skewers marinated in authentic Nigerian spices, served with onions and tomatoes',
    category: 'african',
    price: '₦2,800',
    tags: ['spicy', 'grilled'],
  },
  {
    id: 'af-4',
    name: 'Afang Soup',
    description: 'Nutritious vegetable soup with waterleaf and afang leaves, served with your choice of swallow',
    category: 'african',
    price: '₦4,500',
    tags: ['healthy', 'traditional'],
  },
  {
    id: 'af-5',
    name: 'Pepper Soup',
    description: 'Aromatic spicy broth with goat meat or catfish, perfect for any occasion',
    category: 'african',
    price: 'From ₦2,500',
    tags: ['spicy', 'soup'],
  },

  // Continental Dishes
  {
    id: 'co-1',
    name: 'Grilled Salmon with Vegetables',
    description: 'Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce',
    category: 'continental',
    price: '₦6,500',
    tags: ['healthy', 'seafood'],
  },
  {
    id: 'co-2',
    name: 'Beef Stroganoff',
    description: 'Tender beef strips in creamy mushroom sauce, served with rice or pasta',
    category: 'continental',
    price: '₦5,200',
  },
  {
    id: 'co-3',
    name: 'Chicken Alfredo Pasta',
    description: 'Creamy fettuccine pasta with grilled chicken breast and parmesan cheese',
    category: 'continental',
    price: '₦4,800',
    tags: ['popular'],
  },
  {
    id: 'co-4',
    name: 'Mixed Grill Platter',
    description: 'Assorted grilled meats including chicken, beef, and sausages with chips and coleslaw',
    category: 'continental',
    price: '₦7,500',
    tags: ['sharing'],
  },

  // Pastries
  {
    id: 'pa-1',
    name: 'Meat Pie',
    description: 'Flaky pastry filled with seasoned minced meat and vegetables',
    category: 'pastries',
    price: '₦800',
    tags: ['popular'],
  },
  {
    id: 'pa-2',
    name: 'Chicken Pie',
    description: 'Golden pastry with tender chicken and vegetable filling',
    category: 'pastries',
    price: '₦900',
  },
  {
    id: 'pa-3',
    name: 'Sausage Roll',
    description: 'Savory sausage wrapped in buttery puff pastry',
    category: 'pastries',
    price: '₦700',
  },
  {
    id: 'pa-4',
    name: 'Assorted Pastries Platter',
    description: 'Selection of our finest pastries perfect for sharing',
    category: 'pastries',
    price: '₦5,000',
    tags: ['sharing'],
  },

  // Natural Drinks
  {
    id: 'dr-1',
    name: 'Zobo (Hibiscus Tea)',
    description: 'Refreshing traditional drink made from hibiscus flowers with natural spices',
    category: 'drinks',
    price: '₦800',
    tags: ['popular', 'traditional'],
  },
  {
    id: 'dr-2',
    name: 'Chapman',
    description: 'Nigerian fruit punch with a blend of citrus and tropical flavors',
    category: 'drinks',
    price: '₦1,200',
    tags: ['popular'],
  },
  {
    id: 'dr-3',
    name: 'Fresh Fruit Smoothie',
    description: 'Blended fresh fruits of your choice - mango, pineapple, or mixed berries',
    category: 'drinks',
    price: '₦1,500',
    tags: ['healthy'],
  },
  {
    id: 'dr-4',
    name: 'Palm Wine (Fresh)',
    description: 'Traditional palm wine tapped fresh daily',
    category: 'drinks',
    price: 'Market Price',
    tags: ['traditional'],
  },

  // Catering Packages
  {
    id: 'ca-1',
    name: 'Small Gathering Package',
    description: 'Perfect for intimate events (20-30 guests). Includes 2 main dishes, 2 sides, drinks, and dessert',
    category: 'catering',
    price: 'From ₦150,000',
    tags: ['events'],
  },
  {
    id: 'ca-2',
    name: 'Medium Event Package',
    description: 'Ideal for parties and celebrations (50-75 guests). Includes 3 main dishes, 3 sides, drinks, pastries, and dessert',
    category: 'catering',
    price: 'From ₦300,000',
    tags: ['events', 'popular'],
  },
  {
    id: 'ca-3',
    name: 'Large Event Package',
    description: 'For weddings and corporate events (100+ guests). Customizable menu with full service',
    category: 'catering',
    price: 'Custom Quote',
    tags: ['events', 'premium'],
  },
  {
    id: 'ca-4',
    name: 'Outdoor BBQ Package',
    description: 'Outdoor grilling experience with assorted meats, sides, and drinks for any group size',
    category: 'catering',
    price: 'From ₦200,000',
    tags: ['outdoor', 'events'],
  },
];
