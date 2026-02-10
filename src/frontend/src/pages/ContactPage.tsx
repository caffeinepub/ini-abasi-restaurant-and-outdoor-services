import { useSeo } from '../seo/useSeo';
import { pageSEO } from '../seo/seoConfig';
import { LocalBusinessJsonLd } from '../seo/LocalBusinessJsonLd';
import { Section, SectionHeader } from '../components/branding/Section';
import ContactForm from '../components/forms/ContactForm';
import GoogleMapEmbed from '../components/FindUs/GoogleMapEmbed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { useLocation, useOpeningHours } from '../hooks/useSiteSettings';
import { siteConfig } from '../config/site';

export default function ContactPage() {
  useSeo(pageSEO.contact);
  const { data: location } = useLocation();
  const { data: openingHours } = useOpeningHours();

  const displayLocation = location || {
    address: `${siteConfig.address.street}, ${siteConfig.address.city}`,
    phone: siteConfig.phone,
    email: siteConfig.email,
  };

  return (
    <>
      <LocalBusinessJsonLd />
      
      <Section>
        <SectionHeader
          title="Contact Us"
          subtitle="Get in touch with us for reservations, inquiries, or catering requests"
          centered
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href={`tel:${displayLocation.phone}`}
                  className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p>{displayLocation.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${displayLocation.email}`}
                  className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p>{displayLocation.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p>{displayLocation.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Opening Hours</p>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Find Us"
          subtitle="Visit us at our location"
          centered
        />
        <div className="mx-auto max-w-4xl">
          <GoogleMapEmbed />
        </div>
      </Section>
    </>
  );
}
