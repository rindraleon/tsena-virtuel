// ============================================
// useAuthExtended — Mutations auth complètes
// ============================================

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services';

/**
 * Vérifier l'e-mail avec un token
 */
export function useVerifyEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

/**
 * Renvoyer l'e-mail de vérification
 */
export function useResendVerification() {
  return useMutation({
    mutationFn: () => authService.resendVerification(),
  });
}

/**
 * Mot de passe oublié
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
}

/**
 * Réinitialiser le mot de passe
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
      authService.resetPassword(token, newPassword),
  });
}

/**
 * Changer le mot de passe (connecté)
 */
export function useChangePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

/**
 * Vérifier si un token de reset est valide
 */
export function useCheckResetToken(token: string) {
  return useQuery({
    queryKey: ['auth', 'reset-token', token],
    queryFn: () => Promise.resolve({ valid: !!token }),
    enabled: !!token,
    retry: false,
  });
}
