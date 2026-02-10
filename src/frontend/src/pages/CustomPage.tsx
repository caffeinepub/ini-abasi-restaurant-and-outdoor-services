import { useParams } from '@tanstack/react-router';
import { useCustomPage } from '../hooks/useCustomPages';
import { useSeo } from '../seo/useSeo';
import { Section, SectionHeader } from '../components/branding/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function CustomPage() {
  const { slug } = useParams({ from: '/page/$slug' });
  const { data: page, isLoading } = useCustomPage(slug);

  useSeo(page?.meta ? {
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.meta.keywords.split(',').map(k => k.trim()),
  } : {
    title: 'Page Not Found',
    description: '',
  });

  if (isLoading) {
    return (
      <Section>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Section>
    );
  }

  if (!page) {
    return (
      <Section>
        <SectionHeader
          title="Page Not Found"
          subtitle="The page you're looking for doesn't exist"
          centered
        />
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        title={page.title}
        centered
      />
      <Card className="mx-auto max-w-4xl">
        <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-6 md:p-8">
          <div className="whitespace-pre-wrap">{page.content}</div>
        </CardContent>
      </Card>
    </Section>
  );
}
