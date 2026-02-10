import { useSeo } from '../seo/useSeo';
import { pageSEO } from '../seo/seoConfig';
import { Section, SectionHeader } from '../components/branding/Section';
import GalleryGrid from '../components/gallery/GalleryGrid';
import { useGalleryData } from '../hooks/useGalleryData';

export default function GalleryPage() {
  useSeo(pageSEO.gallery);
  const { data: galleryItems } = useGalleryData();

  return (
    <>
      <Section>
        <SectionHeader
          title="Gallery"
          subtitle="A visual journey through our culinary creations"
          centered
        />
        <GalleryGrid items={galleryItems || []} />
      </Section>
    </>
  );
}
