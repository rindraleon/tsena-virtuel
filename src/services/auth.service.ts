// ============================================
// Auth Service — Authentification complète
// ============================================

import { apiClient, tokenStorage } from '../lib/api-client';
import type { AuthResponse, LoginDto, RegisterDto, ApiUser } from '../types/api';

export const authService = {
  // ─── Inscription ───────────────────────────────────────
  async register(dto: RegisterDto): Promise<AuthResponse> {
    const { data } = await apiClient.post<{ success: boolean; message: string; data: AuthResponse }>(
      '/auth/register',
      dto,
    );
    tokenStorage.setTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
    return data.data;
  },

  // ─── Connexion ─────────────────────────────────────────
  async login(dto: LoginDto): Promise<AuthResponse> {
    const { data } = await apiClient.post<{ success: boolean; message: string; data: AuthResponse }>(
      '/auth/login',
      dto,
    );
    tokenStorage.setTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
    return data.data;
  },

  // ─── Déconnexion ───────────────────────────────────────
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      tokenStorage.clearTokens();
    }
  },

  // ─── Profil ────────────────────────────────────────────
  async getProfile(): Promise<ApiUser> {
    const { data } = await apiClient.get<{ success: boolean; message: string; data: ApiUser }>(
      '/auth/me',
    );
    return data.data;
  },

  // ─── Refresh Token ─────────────────────────────────────
  async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    const currentRefresh = tokenStorage.getRefreshToken();
    if (!currentRefresh) throw new Error('No refresh token');

    const { data } = await apiClient.post('/auth/refresh', { refreshToken: currentRefresh });
    const tokens = data.data.tokens;
    tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
    return tokens;
  },

  // ─── Vérification e-mail ───────────────────────────────
  async verifyEmail(token: string): Promise<{ message: string }> {
    const { data } = await apiClient.post('/auth/verify-email', { token });
    return data.data;
  },

  async resendVerification(): Promise<{ message: string }> {
    const { data } = await apiClient.post('/auth/email-verification/resend');
    return data.data;
  },

  // ─── Mot de passe oublié ───────────────────────────────
  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await apiClient.post('/auth/forgot-password', { email });
    return data.data;
  },

  // ─── Réinitialisation mot de passe ─────────────────────
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const { data } = await apiClient.post('/auth/reset-password', { token, newPassword });
    return data.data;
  },

  // ─── Changement mot de passe ───────────────────────────
  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const { data } = await apiClient.post('/auth/change-password', { currentPassword, newPassword });
    return data.data;
  },
};
