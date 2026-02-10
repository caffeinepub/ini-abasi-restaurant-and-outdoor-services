import { useSeo } from '../seo/useSeo';
import { pageSEO } from '../seo/seoConfig';
import { Section, SectionHeader } from '../components/branding/Section';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  useSeo(pageSEO.about);

  return (
    <>
      <Section>
        <SectionHeader
          title="About Ini-Abasi Restaurant"
          subtitle="Where tradition meets excellence"
          centered
        />

        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-primary">Our Story</h2>
            <p className="mb-4 text-muted-foreground">
              Ini-Abasi Restaurant and Outdoor Services was founded with a passion for sharing the rich culinary heritage of Africa with the world. Our name, "Ini-Abasi," reflects our commitment to excellence and divine inspiration in everything we do.
            </p>
            <p className="text-muted-foreground">
              From our humble beginnings, we have grown into a beloved destination for authentic African and continental cuisine, serving both intimate dining experiences and grand celebrations.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-primary">Our Mission</h2>
            <p className="text-muted-foreground">
              We are dedicated to preserving and celebrating traditional African cooking methods while embracing continental culinary excellence. Every dish we prepare tells a story of culture, tradition, and the love we pour into our craft.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-primary">Cuisine Focus</h2>
            <p className="mb-4 text-muted-foreground">
              Our menu showcases the diverse flavors of African cuisine, from Nigerian classics to continental favorites. We specialize in:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Traditional African dishes prepared with authentic recipes</li>
              <li>Continental cuisine with a modern twist</li>
              <li>Fresh pastries baked daily</li>
              <li>Natural drinks and traditional beverages</li>
              <li>Custom catering for events of all sizes</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-primary">Quality Ingredients</h2>
            <p className="text-muted-foreground">
              We believe that great food starts with great ingredients. That's why we source the freshest local produce, premium meats, and authentic spices to ensure every dish meets our high standards of quality and taste.
            </p>
          </div>
        </div>
      </Section>

      <Section pattern className="bg-muted/30">
        <SectionHeader
          title="Our Services"
          subtitle="More than just a restaurant"
          centered
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-3 font-serif text-xl font-semibold">Restaurant Dining</h3>
              <p className="text-muted-foreground">
                Experience our warm hospitality and authentic flavors in our comfortable dining space. Perfect for family meals, date nights, and casual gatherings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-3 font-serif text-xl font-semibold">Event Catering</h3>
              <p className="text-muted-foreground">
                From intimate gatherings to large celebrations, we provide professional catering services with customizable menus to suit your event's needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-3 font-serif text-xl font-semibold">Outdoor Services</h3>
              <p className="text-muted-foreground">
                Take your event outdoors with our specialized outdoor catering and BBQ services. We bring the restaurant experience to your location.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-3 font-serif text-xl font-semibold">Corporate Events</h3>
              <p className="text-muted-foreground">
                Impress your clients and colleagues with our professional corporate catering services, perfect for meetings, conferences, and company celebrations.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
