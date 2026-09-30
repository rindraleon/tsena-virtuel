// ============================================
// Query Client Configuration
// ============================================

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry 1 fois en cas d'erreur
      retry: 1,
      // Refetch quand la fenêtre reprend le focus
      refetchOnWindowFocus: false,
      // Refetch quand la connexion revient
      refetchOnReconnect: true,
      // GC après 5 minutes d'inactivité
      gcTime: 5 * 60 * 1000,
      // Message d'erreur par défaut
      staleTime: 0,
    },
    mutations: {
      retry: 0,
    },
  },
});
