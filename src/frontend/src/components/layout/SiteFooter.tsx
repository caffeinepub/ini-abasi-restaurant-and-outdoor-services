import { Link } from '@tanstack/react-router';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLocation, useOpeningHours } from '../../hooks/useSiteSettings';
import { useAllCustomPages } from '../../hooks/useCustomPages';
import { siteConfig } from '../../config/site';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'iniabasi-restaurant';

  const { data: location } = useLocation();
  const { data: openingHours } = useOpeningHours();
  const { data: customPages } = useAllCustomPages();

  const displayLocation = location || {
    address: `${siteConfig.address.street}, ${siteConfig.address.city}`,
    phone: siteConfig.phone,
    email: siteConfig.email,
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/ini-abasi-logo.dim_512x512.png"
                alt="Ini-Abasi Restaurant Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="font-serif text-xl font-bold text-primary">
                Ini-Abasi
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Authentic African and continental cuisine with traditional flavors and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/menu" className="text-sm text-muted-foreground hover:text-primary">
                Menu
              </Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary">
                Gallery
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
              {customPages?.slice(0, 2).map(page => (
                <a
                  key={page.slug}
                  href={`/page/${page.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {page.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Contact</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${displayLocation.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {displayLocation.phone}
              </a>
              <a
                href={`mailto:${displayLocation.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {displayLocation.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{displayLocation.address}</span>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Hours</h3>
            <div className="mb-4 space-y-1 text-sm text-muted-foreground">
              {openingHours && openingHours.length > 0 ? (
                openingHours.map((hour, idx) => (
                  <p key={idx}>
                    {hour.day}: {hour.open} - {hour.close}
                  </p>
                ))
              ) : (
                <>
                  <p>{siteConfig.hours.weekday}</p>
                  <p>{siteConfig.hours.weekend}</p>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <SiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <SiInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <SiX className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="mt-2">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
