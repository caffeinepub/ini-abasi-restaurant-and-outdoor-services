import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitContact(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useSubmitReservation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      date: string;
      guests: number;
      specialRequests?: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitReservation(
        data.name,
        data.email,
        data.date,
        BigInt(data.guests),
        data.specialRequests || null
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}

export function useSubmitCateringEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      eventName: string;
      organizer: string;
      email: string;
      date: string;
      guests: number;
      details: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitCateringEvent(
        data.eventName,
        data.organizer,
        data.email,
        data.date,
        BigInt(data.guests),
        data.details
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catering-events'] });
    },
  });
}
