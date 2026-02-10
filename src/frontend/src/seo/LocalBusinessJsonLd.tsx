import { useLocation, useOpeningHours } from '../hooks/useSiteSettings';
import { siteConfig } from '../config/site';

export function LocalBusinessJsonLd() {
  const { data: location } = useLocation();
  const { data: openingHours } = useOpeningHours();

  const displayLocation = location || {
    address: `${siteConfig.address.street}, ${siteConfig.address.city}`,
    phone: siteConfig.phone,
    email: siteConfig.email,
    coordinates: '6.5244,3.3792',
  };

  const [lat, lng] = displayLocation.coordinates.split(',').map(s => s.trim());

  const openingHoursSpec = openingHours && openingHours.length > 0
    ? openingHours.map(hour => `${hour.day} ${hour.open}-${hour.close}`)
    : ['Mo-Fr 11:00-22:00', 'Sa-Su 10:00-23:00'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: siteConfig.description,
    image: `${siteConfig.baseUrl}/assets/generated/ini-abasi-hero.dim_1600x900.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: displayLocation.address,
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
    telephone: displayLocation.phone,
    email: displayLocation.email,
    openingHoursSpecification: openingHoursSpec,
    servesCuisine: ['African', 'Continental', 'Nigerian'],
    priceRange: '$$',
    url: siteConfig.baseUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
