import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { siteConfig } from '../config/site';
import type { Location, OpeningHour, ButtonConfig } from '../backend';

export function useLocation() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Location>({
    queryKey: ['location'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const data = await actor.getLocation();
      return data;
    },
    enabled: !!actor && !actorFetching,
    placeholderData: {
      address: `${siteConfig.address.street}, ${siteConfig.address.city}`,
      phone: siteConfig.phone,
      email: siteConfig.email,
      coordinates: '6.5244,3.3792',
    },
  });
}

export function useOpeningHours() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<OpeningHour[]>({
    queryKey: ['openingHours'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getOpeningHours();
    },
    enabled: !!actor && !actorFetching,
    placeholderData: [],
  });
}

export function useButtonConfigs() {
  const { actor, isFetching: actorFetching } = useActor();

  const whatsapp = useQuery<ButtonConfig>({
    queryKey: ['whatsappConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getWhatsappConfig();
    },
    enabled: !!actor && !actorFetching,
  });

  const call = useQuery<ButtonConfig>({
    queryKey: ['callConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getCallConfig();
    },
    enabled: !!actor && !actorFetching,
  });

  const order = useQuery<ButtonConfig>({
    queryKey: ['orderConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getOrderConfig();
    },
    enabled: !!actor && !actorFetching,
  });

  return { whatsapp, call, order };
}
