import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Promotion } from '../backend';
import { Principal } from '@dfinity/principal';

export function useAllPromotions() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Promotion[]>({
    queryKey: ['allPromotions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getAllPromotions();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddPromotion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      imageUrl: string;
      link?: string;
      start?: bigint;
      end?: bigint;
      order: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.addPromotion(
        data.title,
        data.description,
        data.imageUrl,
        data.link || null,
        data.start || null,
        data.end || null,
        data.order
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPromotions'] });
      queryClient.invalidateQueries({ queryKey: ['activePromotions'] });
    },
  });
}

export function useUpdatePromotion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: Principal;
      title: string;
      description: string;
      imageUrl: string;
      link?: string;
      start?: bigint;
      end?: bigint;
      active: boolean;
      order: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updatePromotion(
        data.id,
        data.title,
        data.description,
        data.imageUrl,
        data.link || null,
        data.start || null,
        data.end || null,
        data.active,
        data.order
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPromotions'] });
      queryClient.invalidateQueries({ queryKey: ['activePromotions'] });
    },
  });
}

export function useDeletePromotion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: Principal) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deletePromotion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPromotions'] });
      queryClient.invalidateQueries({ queryKey: ['activePromotions'] });
    },
  });
}
