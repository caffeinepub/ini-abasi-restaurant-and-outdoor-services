import { useState } from 'react';
import { useSeo } from '../seo/useSeo';
import { pageSEO } from '../seo/seoConfig';
import { Section, SectionHeader } from '../components/branding/Section';
import ReservationForm from '../components/forms/ReservationForm';
import CateringEventForm from '../components/forms/CateringEventForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderReservePage() {
  useSeo(pageSEO.orderReserve);
  const [activeTab, setActiveTab] = useState('reservation');

  return (
    <>
      <Section>
        <SectionHeader
          title="Reservations & Catering"
          subtitle="Reserve a table or request catering services for your event"
          centered
        />

        <div className="mx-auto max-w-3xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reservation">Table Reservation</TabsTrigger>
              <TabsTrigger value="catering">Catering Request</TabsTrigger>
            </TabsList>

            <TabsContent value="reservation" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Reserve a Table</CardTitle>
                  <CardDescription>
                    Book your table in advance to ensure availability. We'll confirm your reservation shortly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReservationForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="catering" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Request Catering Services</CardTitle>
                  <CardDescription>
                    Planning an event? Let us handle the food! Tell us about your event and we'll create a custom menu.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CateringEventForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Section>
    </>
  );
}
