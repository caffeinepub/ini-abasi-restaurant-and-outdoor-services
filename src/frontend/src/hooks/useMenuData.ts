import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { menuItems, menuCategories } from '../data/menu';

// For now, return static data as backend doesn't have menu CRUD yet
// This hook provides the interface for future backend integration
export function useMenuData() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['menuData'],
    queryFn: async () => {
      // TODO: When backend menu CRUD is implemented, fetch from actor
      // For now, return static data
      return {
        categories: menuCategories,
        items: menuItems,
      };
    },
    enabled: !!actor && !actorFetching,
    placeholderData: {
      categories: menuCategories,
      items: menuItems,
    },
  });
}
