import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { mockCredentials, mockUsers } from '../shared/data/mockData';
import { PERMISSIONS, type PermissionKey } from '../shared/data/permissions';
import { authService } from '../services';
import { tokenStorage } from '../lib/api-client';
import type { ApiUser } from '../types/api';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: PermissionKey) => boolean;
}

const STORAGE_KEY = 'tsena_auth_user';

function loadStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
}

/**
 * Convertir un ApiUser (backend) en User (frontend)
 */
function apiUserToUser(apiUser: ApiUser): User {
  const role = apiUser.roles.includes('admin') ? 'admin'
    : apiUser.roles.includes('seller') ? 'seller'
    : 'client';

  return {
    id: apiUser.id,
    name: `${apiUser.firstName} ${apiUser.lastName}`.trim() || apiUser.email,
    email: apiUser.email,
    phone: apiUser.phone,
    role: role as UserRole,
    avatar: apiUser.avatarUrl,
    status: apiUser.status === 'active' ? 'active' : 'inactive',
    createdAt: apiUser.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
  };
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadStoredUser());
  const [status, setStatus] = useState<AuthStatus>(() =>
    loadStoredUser() ? 'authenticated' : 'unauthenticated'
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setStatus('authenticated');
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setStatus('unauthenticated');
    }
  }, [user]);

  // Charger le profil si on a un token mais pas d'utilisateur
  useEffect(() => {
    if (tokenStorage.isAuthenticated() && !user) {
      authService.getProfile()
        .then((apiUser) => {
          setUser(apiUserToUser(apiUser));
        })
        .catch(() => {
          tokenStorage.clearTokens();
          setStatus('unauthenticated');
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Essayer l'API d'abord
      const response = await authService.login({ email, password });
      const mappedUser = apiUserToUser(response.user);
      setUser(mappedUser);
      return { success: true };
    } catch (apiError) {
      // Fallback sur les mocks si l'API n'est pas disponible
      await new Promise((r) => setTimeout(r, 600));

      const cred = mockCredentials[email];
      if (!cred || cred.password !== password) {
        return { success: false, error: 'Email ou mot de passe incorrect.' };
      }

      const foundUser = mockUsers.find((u) => u.id === cred.userId);
      if (!foundUser) {
        return { success: false, error: 'Utilisateur introuvable.' };
      }

      setUser(foundUser);
      return { success: true };
    }
  }, []);

  const register = useCallback(async (email: string, _password: string, name: string, role: UserRole = 'client') => {
    try {
      // Essayer l'API d'abord
      const response = await authService.register({
        email,
        password: _password,
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || '',
      });
      const mappedUser = apiUserToUser(response.user);
      setUser(mappedUser);
      return { success: true };
    } catch (apiError) {
      // Fallback sur les mocks
      await new Promise((r) => setTimeout(r, 600));

      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        return { success: false, error: 'Un compte avec cet email existe déjà.' };
      }

      if (role === 'client') {
        const newUser: User = {
          id: `u${Date.now()}`,
          name,
          email,
          role: 'client',
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setUser(newUser);
      }

      return { success: true };
    }
  }, []);

  const logout = useCallback(() => {
    try {
      authService.logout();
    } catch {
      // Ignorer les erreurs API au logout
    }
    setUser(null);
  }, []);

  const hasPermission = useCallback(
    (permission: PermissionKey) => {
      if (!user) return false;
      const roles = PERMISSIONS[permission];
      return roles ? (roles as readonly string[]).includes(user.role) : false;
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, status, login, register, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
