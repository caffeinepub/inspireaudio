import { useQuery } from "@tanstack/react-query";
import type { Story } from "../backend.d";
import { useActor } from "./useActor";

export function useAllStories() {
  const { actor, isFetching } = useActor();
  return useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStoriesByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Story[]>({
    queryKey: ["stories", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllStories();
      return actor.getStoriesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedStory() {
  const { actor, isFetching } = useActor();
  return useQuery<Story | null>({
    queryKey: ["featuredStory"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFeaturedStory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMotivationalQuote() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["motivationalQuote"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getMotivationalQuote();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategories();
    },
    enabled: !!actor && !isFetching,
  });
}
