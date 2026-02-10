import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { MenuCategory } from '../../data/menu';

interface MenuFiltersProps {
  categories: { value: MenuCategory; label: string }[];
  selectedCategory: MenuCategory | 'all';
  onCategoryChange: (category: MenuCategory | 'all') => void;
}

export default function MenuFilters({ categories, selectedCategory, onCategoryChange }: MenuFiltersProps) {
  return (
    <div className="mb-8">
      <Tabs value={selectedCategory} onValueChange={(value) => onCategoryChange(value as MenuCategory | 'all')}>
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Items
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
