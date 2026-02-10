import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Promotion } from '../backend';

export function useActivePromotions() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Promotion[]>({
    queryKey: ['activePromotions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getActivePromotions();
    },
    enabled: !!actor && !actorFetching,
    placeholderData: [],
  });
}
