import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Location, ButtonConfig } from '../backend';

export function useUpdateLocation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (location: Location) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateLocation(location);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['location'] });
    },
  });
}

export function useAddOpeningHour() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { day: string; open: string; close: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addOpeningHour(data.day, data.open, data.close);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openingHours'] });
    },
  });
}

export function useRemoveOpeningHour() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (day: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.removeOpeningHour(day);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openingHours'] });
    },
  });
}

export function useUpdateButtonConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { type: 'whatsapp' | 'call' | 'order'; config: ButtonConfig }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      if (data.type === 'whatsapp') {
        await actor.updateWhatsappConfig(data.config);
      } else if (data.type === 'call') {
        await actor.updateCallConfig(data.config);
      } else {
        await actor.updateOrderConfig(data.config);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`${variables.type}Config`] });
    },
  });
}
