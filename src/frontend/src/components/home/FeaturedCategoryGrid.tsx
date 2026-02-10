import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Utensils, Coffee, Cake, Wine, PartyPopper } from 'lucide-react';

const categories = [
  {
    title: 'African Dishes',
    description: 'Experience authentic traditional flavors from across Africa',
    icon: Utensils,
    color: 'text-chart-1',
  },
  {
    title: 'Continental Cuisine',
    description: 'Classic international dishes prepared with excellence',
    icon: Coffee,
    color: 'text-chart-2',
  },
  {
    title: 'Fresh Pastries',
    description: 'Delicious baked goods made fresh daily',
    icon: Cake,
    color: 'text-chart-3',
  },
  {
    title: 'Natural Drinks',
    description: 'Refreshing traditional and modern beverages',
    icon: Wine,
    color: 'text-chart-4',
  },
  {
    title: 'Event Catering',
    description: 'Professional catering for all your special occasions',
    icon: PartyPopper,
    color: 'text-chart-5',
  },
];

export default function FeaturedCategoryGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => {
        const Icon = category.icon;
        return (
          <Card key={index} className="group transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className={`mb-2 ${category.color}`}>
                <Icon className="h-8 w-8" />
              </div>
              <CardTitle className="font-serif text-xl">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="group-hover:text-primary" asChild>
                <Link to="/menu">
                  Explore Menu
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
