import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { pageSEO } from '../seo/seoConfig';
import type { PageSEO } from '../seo/seoConfig';

// For now, return static SEO data as backend doesn't have SEO CRUD yet
// This hook provides the interface for future backend integration
export function usePageSeo(pageKey: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PageSEO>({
    queryKey: ['pageSeo', pageKey],
    queryFn: async () => {
      // TODO: When backend SEO CRUD is implemented, fetch from actor
      // For now, return static data
      return pageSEO[pageKey] || pageSEO.home;
    },
    enabled: !!actor && !actorFetching,
    placeholderData: pageSEO[pageKey] || pageSEO.home,
  });
}
