import type { Promotion } from '../types/promotion';

export const promotions: Promotion[] = [
  {
    id: '1',
    title: 'WEEKEND\nMEGA SALE',
    subtitle: 'Up to 50% OFF',
    discount: 'On Selected Items',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop',
    backgroundColor: 'bg-primary',
    textColor: 'text-white',
  },
  {
    id: '2',
    title: 'GROCERY\nEssentials',
    subtitle: 'Up to 30% OFF',
    discount: '',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
    backgroundColor: 'bg-green-50',
    textColor: 'text-primary',
  },
  {
    id: '3',
    title: 'ELECTRONICS\nBest Deals',
    subtitle: 'Up to 40% OFF',
    discount: '',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    backgroundColor: 'bg-blue-50',
    textColor: 'text-primary',
  },
  {
    id: '4',
    title: 'FASHION\nNew Collection',
    subtitle: 'Up to 50% OFF',
    discount: '',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    backgroundColor: 'bg-pink-50',
    textColor: 'text-primary',
  },
];
