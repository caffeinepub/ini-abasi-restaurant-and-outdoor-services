import { Link, useRouterState } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAllCustomPages } from '../../hooks/useCustomPages';

const baseNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/order-reserve', label: 'Order/Reserve' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { data: customPages } = useAllCustomPages();

  const customNavLinks = customPages?.map(page => ({
    href: `/page/${page.slug}`,
    label: page.title,
  })) || [];

  const navLinks = [...baseNavLinks, ...customNavLinks];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/generated/ini-abasi-logo.dim_512x512.png"
            alt="Ini-Abasi Restaurant Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="font-serif text-lg font-bold text-primary md:text-xl">
            Ini-Abasi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPath === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <div className="flex items-center gap-2 border-b pb-4">
              <img
                src="/assets/generated/ini-abasi-logo.dim_512x512.png"
                alt="Ini-Abasi Restaurant Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="font-serif text-lg font-bold text-primary">
                Ini-Abasi
              </span>
            </div>
            <nav className="mt-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    currentPath === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
