// Centralized permission definitions
// Each role maps to a set of permission keys

export type UserRole = 'client' | 'seller' | 'admin';

export const PERMISSIONS = {
  // User permissions
  'profile.read': ['client', 'seller', 'admin'],
  'profile.update': ['client', 'seller', 'admin'],

  // Client permissions
  'orders.read': ['client', 'seller', 'admin'],
  'orders.create': ['client'],
  'wishlist.manage': ['client'],
  'addresses.manage': ['client'],

  // Seller permissions
  'products.create': ['seller', 'admin'],
  'products.update': ['seller', 'admin'],
  'products.delete': ['seller', 'admin'],
  'products.read': ['client', 'seller', 'admin'],
  'seller.orders.read': ['seller', 'admin'],
  'seller.orders.update': ['seller', 'admin'],
  'store.manage': ['seller'],
  'earnings.read': ['seller'],

  // Admin permissions
  'users.read': ['admin'],
  'users.update': ['admin'],
  'users.manage': ['admin'],
  'sellers.read': ['admin'],
  'sellers.approve': ['admin'],
  'sellers.manage': ['admin'],
  'categories.manage': ['admin'],
  'orders.manage': ['admin'],
  'reports.read': ['admin'],
  'settings.manage': ['admin'],
  'promotions.manage': ['admin'],
} as const satisfies Record<string, readonly UserRole[]>;

export type PermissionKey = keyof typeof PERMISSIONS;

export function hasPermission(role: UserRole, permission: PermissionKey): boolean {
  const roles = PERMISSIONS[permission];
  return roles ? (roles as readonly string[]).includes(role) : false;
}

export function canAccessRole(currentRole: UserRole, targetRoute: string): boolean {
  if (targetRoute.startsWith('/dashboard/admin')) return currentRole === 'admin';
  if (targetRoute.startsWith('/dashboard/vendeur')) return currentRole === 'seller';
  if (targetRoute.startsWith('/dashboard/client')) return currentRole === 'client';
  return true;
}

export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case 'admin': return '/dashboard/admin';
    case 'seller': return '/dashboard/vendeur';
    case 'client': return '/dashboard/client';
  }
}
