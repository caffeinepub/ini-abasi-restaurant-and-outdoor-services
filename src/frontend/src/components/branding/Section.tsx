import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  pattern?: boolean;
  id?: string;
}

export function Section({ children, className, pattern = false, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-12 md:py-16 lg:py-20',
        pattern && 'bg-pattern',
        className
      )}
    >
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 md:mb-12', centered && 'text-center', className)}>
      <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
