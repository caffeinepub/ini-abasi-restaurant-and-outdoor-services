import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { galleryItems } from '../data/gallery';

// For now, return static data as backend doesn't have gallery CRUD yet
// This hook provides the interface for future backend integration
export function useGalleryData() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['galleryData'],
    queryFn: async () => {
      // TODO: When backend gallery CRUD is implemented, fetch from actor
      // For now, return static data
      return galleryItems;
    },
    enabled: !!actor && !actorFetching,
    placeholderData: galleryItems,
  });
}
