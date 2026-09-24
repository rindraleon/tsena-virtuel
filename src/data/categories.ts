import type { Category } from '../types/category';
import {
  ShoppingCart, Coffee, Cookie, Home, Droplets, Baby,
  Plug, Laptop, Shirt, Sparkles, BookOpen, LayoutGrid,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CategoryWithIcon extends Category {
  lucideIcon: LucideIcon;
}

export const sidebarCategories: CategoryWithIcon[] = [
  { id: '1', name: 'Épicerie & produits de base', icon: '', lucideIcon: ShoppingCart },
  { id: '2', name: 'Boissons', icon: '', lucideIcon: Coffee },
  { id: '3', name: 'Snacks & biscuits', icon: '', lucideIcon: Cookie },
  { id: '4', name: 'Entretien maison', icon: '', lucideIcon: Home },
  { id: '5', name: 'Soins personnels', icon: '', lucideIcon: Droplets },
  { id: '6', name: 'Bébé', icon: '', lucideIcon: Baby },
  { id: '7', name: 'Électroménager', icon: '', lucideIcon: Plug },
  { id: '8', name: 'Électronique', icon: '', lucideIcon: Laptop },
  { id: '9', name: 'Mode', icon: '', lucideIcon: Shirt },
  { id: '10', name: 'Beauté & santé', icon: '', lucideIcon: Sparkles },
  { id: '11', name: 'Jeux & jouets', icon: '', lucideIcon: BookOpen },
  { id: '12', name: 'Papeterie & livres', icon: '', lucideIcon: BookOpen },
];

export const popularCategories: (Category & { lucideIcon: LucideIcon })[] = [
  { id: '1', name: 'Épicerie', icon: '', lucideIcon: ShoppingCart, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop' },
  { id: '2', name: 'Boissons', icon: '', lucideIcon: Coffee, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop' },
  { id: '3', name: 'Snacks', icon: '', lucideIcon: Cookie, image: 'https://images.unsplash.com/photo-1621939514649-280e2eee0926?w=200&h=200&fit=crop' },
  { id: '4', name: 'Soins personnels', icon: '', lucideIcon: Droplets, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop' },
  { id: '5', name: 'Maison', icon: '', lucideIcon: Home, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
  { id: '6', name: 'Électronique', icon: '', lucideIcon: Laptop, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop' },
  { id: '7', name: 'Mode', icon: '', lucideIcon: Shirt, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop' },
  { id: '8', name: 'Bébé', icon: '', lucideIcon: Baby, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop' },
  { id: '9', name: 'Jeux & jouets', icon: '', lucideIcon: BookOpen, image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop' },
  { id: '10', name: 'Toutes les catégories', icon: '', lucideIcon: LayoutGrid, image: undefined },
];
