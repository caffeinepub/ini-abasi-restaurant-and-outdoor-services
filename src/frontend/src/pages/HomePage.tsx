import { Link } from '@tanstack/react-router';
import { useSeo } from '../seo/useSeo';
import { pageSEO } from '../seo/seoConfig';
import { Section, SectionHeader } from '../components/branding/Section';
import FeaturedCategoryGrid from '../components/home/FeaturedCategoryGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../config/site';

export default function HomePage() {
  useSeo(pageSEO.home);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-br from-primary/10 to-accent/10 md:min-h-[700px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/assets/generated/ini-abasi-hero.dim_1600x900.png"
            alt="Delicious African and continental cuisine at Ini-Abasi Restaurant"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10 flex min-h-[600px] flex-col items-center justify-center px-4 text-center md:min-h-[700px] md:px-6">
          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
            Experience Authentic
            <br />
            African & Continental Cuisine
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Savor traditional flavors, fresh ingredients, and exceptional service at Ini-Abasi Restaurant. From intimate dining to grand celebrations, we bring culture to your table.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/menu">
                View Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/order-reserve">Reserve a Table</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <Section>
        <SectionHeader
          title="What We Offer"
          subtitle="Discover our diverse selection of authentic dishes and services"
          centered
        />
        <FeaturedCategoryGrid />
      </Section>

      {/* Why Choose Us */}
      <Section pattern className="bg-muted/30">
        <SectionHeader
          title="Why Choose Ini-Abasi"
          subtitle="Quality, tradition, and excellence in every dish"
          centered
        />
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">🍲</span>
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold">Authentic Recipes</h3>
            <p className="text-muted-foreground">
              Traditional cooking methods passed down through generations
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold">Fresh Ingredients</h3>
            <p className="text-muted-foreground">
              Locally sourced, quality ingredients for the best flavors
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold">Event Catering</h3>
            <p className="text-muted-foreground">
              Professional catering services for all your special occasions
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="rounded-lg bg-primary/5 p-8 text-center md:p-12">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary md:text-4xl">
            Ready to Experience Our Cuisine?
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Visit us today or make a reservation for your next celebration
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link to="/order-reserve">
                Make a Reservation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-center">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-primary">
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {siteConfig.address.city}, {siteConfig.address.state}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
