import { useState } from 'react';
import { useSeo } from '../seo/useSeo';
import { pageSEO } from '../seo/seoConfig';
import { Section, SectionHeader } from '../components/branding/Section';
import MenuFilters from '../components/menu/MenuFilters';
import MenuList from '../components/menu/MenuList';
import { useMenuData } from '../hooks/useMenuData';
import type { MenuCategory } from '../data/menu';

export default function MenuPage() {
  useSeo(pageSEO.menu);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const { data: menuData } = useMenuData();

  const filteredItems = selectedCategory === 'all'
    ? menuData?.items || []
    : menuData?.items.filter((item) => item.category === selectedCategory) || [];

  return (
    <>
      <Section>
        <SectionHeader
          title="Our Menu"
          subtitle="Explore our diverse selection of authentic African and continental dishes"
          centered
        />
        <MenuFilters
          categories={menuData?.categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <MenuList items={filteredItems} />
      </Section>
    </>
  );
}
