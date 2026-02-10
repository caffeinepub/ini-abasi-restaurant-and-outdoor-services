import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MetaData } from '../backend';

export function useCreatePage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      slug: string;
      meta: MetaData;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createPage(data.title, data.content, data.slug, data.meta);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customPages'] });
    },
  });
}

export function useUpdatePage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      slug: string;
      title: string;
      content: string;
      meta: MetaData;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updatePage(data.slug, data.title, data.content, data.meta);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customPages'] });
      queryClient.invalidateQueries({ queryKey: ['customPage', variables.slug] });
    },
  });
}

export function useDeletePage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deletePage(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customPages'] });
    },
  });
}
