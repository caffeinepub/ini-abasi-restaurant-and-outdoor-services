import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Page } from '../backend';

export function useAllCustomPages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Page[]>({
    queryKey: ['customPages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getAllPages();
    },
    enabled: !!actor && !actorFetching,
    placeholderData: [],
  });
}

export function useCustomPage(slug: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Page | null>({
    queryKey: ['customPage', slug],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getPage(slug);
    },
    enabled: !!actor && !actorFetching && !!slug,
  });
}
