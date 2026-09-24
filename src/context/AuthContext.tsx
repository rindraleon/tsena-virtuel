import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { mockCredentials, mockUsers } from '../shared/data/mockData';
import { PERMISSIONS, type PermissionKey } from '../shared/data/permissions';

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

  const login = useCallback(async (email: string, password: string) => {
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
  }, []);

  const register = useCallback(async (email: string, _password: string, name: string, role: UserRole = 'client') => {
    await new Promise((r) => setTimeout(r, 600));

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, error: 'Un compte avec cet email existe déjà.' };
    }

    // For seller role, don't auto-login (requires admin approval)
    // For client role, create and auto-login
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
  }, []);

  const logout = useCallback(() => {
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
