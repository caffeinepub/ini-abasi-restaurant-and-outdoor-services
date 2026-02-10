import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MenuItem } from '../../data/menu';

interface MenuListProps {
  items: MenuItem[];
}

export default function MenuList({ items }: MenuListProps) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No items found in this category.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="font-serif text-lg leading-tight">{item.name}</CardTitle>
              {item.price && (
                <span className="flex-shrink-0 font-semibold text-primary">
                  {item.price}
                </span>
              )}
            </div>
            <CardDescription className="mt-2">{item.description}</CardDescription>
          </CardHeader>
          {item.tags && item.tags.length > 0 && (
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
