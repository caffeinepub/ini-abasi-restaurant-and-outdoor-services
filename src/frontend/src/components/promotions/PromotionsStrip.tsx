import { useActivePromotions } from '../../hooks/usePromotions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function PromotionsStrip() {
  const { data: promotions } = useActivePromotions();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  if (!promotions || promotions.length === 0) {
    return null;
  }

  const visiblePromotions = promotions
    .filter(p => !dismissed.has(p.title))
    .sort((a, b) => Number(a.order) - Number(b.order));

  if (visiblePromotions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 border-b bg-primary/5 px-4 py-3">
      {visiblePromotions.map((promo, idx) => (
        <Alert key={idx} className="relative border-primary/20">
          <AlertTitle className="pr-8">{promo.title}</AlertTitle>
          <AlertDescription>{promo.description}</AlertDescription>
          {promo.link && (
            <a
              href={promo.link}
              className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
            >
              Learn more →
            </a>
          )}
          <button
            onClick={() => setDismissed(prev => new Set(prev).add(promo.title))}
            className="absolute right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      ))}
    </div>
  );
}
