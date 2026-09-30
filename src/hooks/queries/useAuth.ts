// ============================================
// useAuth — Hooks TanStack Query pour Auth
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services';
import type { LoginDto, RegisterDto } from '../../types/api';

export function useProfile() {
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => authService.getProfile(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: RegisterDto) => authService.register(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
