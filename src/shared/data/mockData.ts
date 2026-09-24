import type { User, Order, Product, Category, SellerApplication } from '../types';

// ─── USERS ────────────────────────────────────────────
export const mockUsers: User[] = [
  { id: 'u1', name: 'Ahmed Khan', email: 'ahmed@example.com', phone: '+92 314 1111111', role: 'client', status: 'active', createdAt: '2024-06-15' },
  { id: 'u2', name: 'Sara Malik', email: 'sara@example.com', phone: '+92 314 2222222', role: 'client', status: 'active', createdAt: '2024-07-01' },
  { id: 'u3', name: 'Usman Ali', email: 'usman@example.com', phone: '+92 314 3333333', role: 'client', status: 'active', createdAt: '2024-08-10' },
  { id: 'u4', name: 'Fatima Noor', email: 'fatima@example.com', phone: '+92 314 1212121', role: 'client', status: 'active', createdAt: '2024-09-05' },
  { id: 'u5', name: 'Hassan Raza', email: 'hassan@example.com', phone: '+92 314 1313131', role: 'client', status: 'inactive', createdAt: '2024-10-20' },
  { id: 's1', name: 'Bilal Ahmed', email: 'bilal@seller.com', phone: '+92 314 4444444', role: 'seller', status: 'active', createdAt: '2024-03-20' },
  { id: 's2', name: 'Ayesha Siddiqui', email: 'fashion@seller.com', phone: '+92 314 5555555', role: 'seller', status: 'active', createdAt: '2024-04-12' },
  { id: 's3', name: 'Tariq Mahmood', email: 'tech@seller.com', phone: '+92 314 6666666', role: 'seller', status: 'active', createdAt: '2024-05-05' },
  { id: 'a1', name: 'Admin', email: 'admin@tsena.com', phone: '+92 314 436 7610', role: 'admin', status: 'active', createdAt: '2024-01-01' },
];

// ─── LOGIN CREDENTIALS (mock) ─────────────────────────
export const mockCredentials: Record<string, { password: string; userId: string }> = {
  'ahmed@example.com': { password: 'client123', userId: 'u1' },
  'sara@example.com': { password: 'client123', userId: 'u2' },
  'usman@example.com': { password: 'client123', userId: 'u3' },
  'fatima@example.com': { password: 'client123', userId: 'u4' },
  'bilal@seller.com': { password: 'seller123', userId: 's1' },
  'fashion@seller.com': { password: 'seller123', userId: 's2' },
  'tech@seller.com': { password: 'seller123', userId: 's3' },
  'admin@tsena.com': { password: 'admin123', userId: 'a1' },
};

// ─── ORDERS ───────────────────────────────────────────
export const mockOrders: Order[] = [
  { id: 'ORD-001', userId: 'u1', userName: 'Ahmed Khan', sellerId: 's1', sellerName: 'Bilal Store', products: [{ id: 'p1', name: 'Riz Basmati Dalda', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&h=80&fit=crop', quantity: 2, price: 1299 }], total: 2598, status: 'delivered', date: '2025-01-10', address: 'Lahore, Pakistan' },
  { id: 'ORD-002', userId: 'u1', userName: 'Ahmed Khan', sellerId: 's2', sellerName: 'Fashion Hub', products: [{ id: 'p2', name: 'Chemise en coton', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop', quantity: 1, price: 2499 }], total: 2499, status: 'shipped', date: '2025-01-12', address: 'Lahore, Pakistan' },
  { id: 'ORD-003', userId: 'u2', userName: 'Sara Malik', sellerId: 's1', sellerName: 'Bilal Store', products: [{ id: 'p3', name: 'Huile de canola Shan', image: 'https://images.unsplash.com/photo-1474979266404-7cadd259c308?w=80&h=80&fit=crop', quantity: 1, price: 1399 }], total: 1399, status: 'pending', date: '2025-01-14', address: 'Karachi, Pakistan' },
  { id: 'ORD-004', userId: 'u2', userName: 'Sara Malik', sellerId: 's3', sellerName: 'Tech World', products: [{ id: 'p4', name: 'Casque sans fil', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop', quantity: 1, price: 4999 }], total: 4999, status: 'confirmed', date: '2025-01-13', address: 'Karachi, Pakistan' },
  { id: 'ORD-005', userId: 'u1', userName: 'Ahmed Khan', sellerId: 's3', sellerName: 'Tech World', products: [{ id: 'p5', name: 'Hub USB-C', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=80&h=80&fit=crop', quantity: 1, price: 3499 }], total: 3499, status: 'processing', date: '2025-01-14', address: 'Lahore, Pakistan' },
  { id: 'ORD-006', userId: 'u3', userName: 'Usman Ali', sellerId: 's2', sellerName: 'Fashion Hub', products: [{ id: 'p6', name: 'Jean denim', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&h=80&fit=crop', quantity: 1, price: 3299 }], total: 3299, status: 'cancelled', date: '2025-01-11', address: 'Islamabad, Pakistan' },
  { id: 'ORD-007', userId: 'u4', userName: 'Fatima Noor', sellerId: 's1', sellerName: 'Bilal Store', products: [{ id: 'p7', name: 'Lessive Surf Excel', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=80&h=80&fit=crop', quantity: 3, price: 649 }], total: 1947, status: 'delivered', date: '2025-01-08', address: 'Rawalpindi, Pakistan' },
  { id: 'ORD-008', userId: 'u4', userName: 'Fatima Noor', sellerId: 's3', sellerName: 'Tech World', products: [{ id: 'p8', name: 'Montre connectée', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop', quantity: 1, price: 8999 }], total: 8999, status: 'shipped', date: '2025-01-09', address: 'Rawalpindi, Pakistan' },
];

// ─── PRODUCTS ─────────────────────────────────────────
export const mockProducts: Product[] = [
  // ── Épicerie ──
  { id: 'p1', name: 'Riz Basmati Dalda', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop', price: 1299, oldPrice: 1750, discount: 26, rating: 4.8, reviews: 128, variant: '5kg', category: 'Épicerie', stock: 150, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p2', name: 'Huile de canola Shan', image: 'https://images.unsplash.com/photo-1474979266404-7cadd259c308?w=300&h=300&fit=crop', price: 1399, oldPrice: 1750, discount: 20, rating: 4.5, reviews: 96, variant: '5L', category: 'Épicerie', stock: 80, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p3', name: 'Lessive Surf Excel', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=300&fit=crop', price: 649, oldPrice: 925, discount: 30, rating: 4.6, reviews: 72, variant: '2,5kg', category: 'Maison', stock: 200, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p4', name: 'Biscuits Peek Freans', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop', price: 349, oldPrice: 410, discount: 15, rating: 4.4, reviews: 55, variant: 'Pack familial', category: 'Épicerie', stock: 300, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p5', name: 'Thé Tapal Danedar', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop', price: 899, oldPrice: 1125, discount: 20, rating: 4.7, reviews: 66, variant: '950g', category: 'Boissons', stock: 120, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p19', name: 'Pâtes spaghetti', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&h=300&fit=crop', price: 449, oldPrice: 599, discount: 25, rating: 4.3, reviews: 44, variant: '500g', category: 'Épicerie', stock: 200, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p20', name: 'Sauce tomate Nationale', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=300&h=300&fit=crop', price: 299, rating: 4.2, reviews: 33, variant: '400g', category: 'Épicerie', stock: 250, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p21', name: 'Sucre en poudre', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop', price: 199, oldPrice: 250, discount: 20, rating: 4.5, reviews: 87, variant: '1kg', category: 'Épicerie', stock: 400, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p22', name: 'Farine de blé', image: 'https://images.unsplash.com/photo-1574323347407-f0d0a3a4e8c4?w=300&h=300&fit=crop', price: 549, rating: 4.4, reviews: 62, variant: '2kg', category: 'Épicerie', stock: 180, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },

  // ── Mode ──
  { id: 'p6', name: 'Chemise en coton', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop', price: 2499, oldPrice: 3500, discount: 29, rating: 4.3, reviews: 45, variant: 'M', category: 'Mode', stock: 30, sellerId: 's2', sellerName: 'Fashion Hub', status: 'active' },
  { id: 'p7', name: 'Jean denim', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', price: 3299, rating: 4.1, reviews: 38, variant: '32', category: 'Mode', stock: 0, sellerId: 's2', sellerName: 'Fashion Hub', status: 'active' },
  { id: 'p8', name: 'Robe d\'été florale', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop', price: 3999, oldPrice: 5500, discount: 27, rating: 4.6, reviews: 52, variant: 'S', category: 'Mode', stock: 25, sellerId: 's2', sellerName: 'Fashion Hub', status: 'active' },
  { id: 'p9', name: 'Sac à main cuir', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop', price: 4599, rating: 4.8, reviews: 67, variant: 'Marron', category: 'Mode', stock: 15, sellerId: 's2', sellerName: 'Fashion Hub', status: 'active' },
  { id: 'p23', name: 'Veste en jean', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&h=300&fit=crop', price: 5999, oldPrice: 8000, discount: 25, rating: 4.5, reviews: 41, variant: 'L', category: 'Mode', stock: 18, sellerId: 's2', sellerName: 'Fashion Hub', status: 'active' },
  { id: 'p24', name: 'Lunettes de soleil', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop', price: 1899, oldPrice: 2500, discount: 24, rating: 4.4, reviews: 58, variant: 'Noir', category: 'Mode', stock: 45, sellerId: 's2', sellerName: 'Fashion Hub', status: 'active' },
  { id: 'p25', name: 'Sneakers sport', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', price: 6999, oldPrice: 9500, discount: 26, rating: 4.7, reviews: 93, variant: '42', category: 'Mode', stock: 22, sellerId: 's2', sellerName: 'Fashion Hub', status: 'active' },

  // ── Électronique ──
  { id: 'p10', name: 'Casque sans fil', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', price: 4999, oldPrice: 7500, discount: 33, rating: 4.7, reviews: 89, variant: 'Noir', category: 'Électronique', stock: 25, sellerId: 's3', sellerName: 'Tech World', status: 'active' },
  { id: 'p11', name: 'Hub USB-C', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop', price: 3499, rating: 4.4, reviews: 32, category: 'Électronique', stock: 50, sellerId: 's3', sellerName: 'Tech World', status: 'active' },
  { id: 'p12', name: 'Montre connectée', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', price: 8999, oldPrice: 12000, discount: 25, rating: 4.9, reviews: 156, category: 'Électronique', stock: 15, sellerId: 's3', sellerName: 'Tech World', status: 'active' },
  { id: 'p13', name: 'Enceinte Bluetooth', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop', price: 2999, oldPrice: 4200, discount: 29, rating: 4.5, reviews: 73, category: 'Électronique', stock: 40, sellerId: 's3', sellerName: 'Tech World', status: 'active' },
  { id: 'p14', name: 'Chargeur sans fil', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop', price: 1499, rating: 4.2, reviews: 41, category: 'Électronique', stock: 100, sellerId: 's3', sellerName: 'Tech World', status: 'active' },
  { id: 'p26', name: 'Clavier mécanique', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop', price: 7499, oldPrice: 9999, discount: 25, rating: 4.8, reviews: 112, variant: 'RGB', category: 'Électronique', stock: 12, sellerId: 's3', sellerName: 'Tech World', status: 'active' },
  { id: 'p27', name: 'Souris ergonomique', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop', price: 2499, oldPrice: 3200, discount: 22, rating: 4.3, reviews: 48, variant: 'Gris', category: 'Électronique', stock: 60, sellerId: 's3', sellerName: 'Tech World', status: 'active' },
  { id: 'p28', name: 'Webcam HD 1080p', image: 'https://images.unsplash.com/photo-1587826582991-c2d7a2109f7a?w=300&h=300&fit=crop', price: 3999, rating: 4.5, reviews: 37, variant: 'Noir', category: 'Électronique', stock: 35, sellerId: 's3', sellerName: 'Tech World', status: 'active' },

  // ── Beauté & Soins ──
  { id: 'p15', name: 'Shampoing Head & Shoulders', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop', price: 599, oldPrice: 800, discount: 25, rating: 4.3, reviews: 38, variant: '400ml', category: 'Beauté', stock: 180, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p16', name: 'Crème hydratante', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop', price: 1299, rating: 4.6, reviews: 54, variant: '200ml', category: 'Beauté', stock: 90, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p29', name: 'Parfum floral', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop', price: 3499, oldPrice: 4500, discount: 22, rating: 4.7, reviews: 71, variant: '50ml', category: 'Beauté', stock: 40, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p30', name: 'Kit maquillage premium', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop', price: 5999, oldPrice: 8000, discount: 25, rating: 4.8, reviews: 85, variant: 'Complet', category: 'Beauté', stock: 20, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },

  // ── Maison ──
  { id: 'p17', name: 'Set de casseroles', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop', price: 5999, oldPrice: 8500, discount: 29, rating: 4.7, reviews: 42, category: 'Maison', stock: 20, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p18', name: 'Coussin décoratif', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&h=300&fit=crop', price: 899, rating: 4.1, reviews: 28, category: 'Maison', stock: 60, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p31', name: 'Lampe de bureau LED', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=300&h=300&fit=crop', price: 2499, oldPrice: 3500, discount: 29, rating: 4.5, reviews: 55, variant: 'Blanc', category: 'Maison', stock: 35, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
  { id: 'p32', name: 'Tapis de salon moderne', image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=300&h=300&fit=crop', price: 4999, oldPrice: 7000, discount: 29, rating: 4.6, reviews: 38, variant: '200x300cm', category: 'Maison', stock: 12, sellerId: 's1', sellerName: 'Bilal Store', status: 'active' },
];

// ─── CATEGORIES ───────────────────────────────────────
export const mockCategories: Category[] = [
  { id: 'c1', name: 'Épicerie', icon: '', slug: 'epicerie', productCount: 45, status: 'active' },
  { id: 'c2', name: 'Boissons', icon: '', slug: 'boissons', productCount: 22, status: 'active' },
  { id: 'c3', name: 'Snacks', icon: '', slug: 'snacks', productCount: 34, status: 'active' },
  { id: 'c4', name: 'Maison', icon: '', slug: 'maison', productCount: 56, status: 'active' },
  { id: 'c5', name: 'Beauté', icon: '', slug: 'beaute', productCount: 41, status: 'active' },
  { id: 'c6', name: 'Bébé', icon: '', slug: 'bebe', productCount: 18, status: 'active' },
  { id: 'c7', name: 'Électroménager', icon: '', slug: 'electromenager', productCount: 29, status: 'active' },
  { id: 'c8', name: 'Électronique', icon: '', slug: 'electronique', productCount: 67, status: 'active' },
  { id: 'c9', name: 'Mode', icon: '', slug: 'mode', productCount: 89, status: 'active' },
  { id: 'c10', name: 'Beauté & santé', icon: '', slug: 'beaute-sante', productCount: 37, status: 'active' },
  { id: 'c11', name: 'Jeux & jouets', icon: '', slug: 'jeux', productCount: 23, status: 'active' },
  { id: 'c12', name: 'Papeterie', icon: '', slug: 'papeterie', productCount: 15, status: 'active' },
];

// ─── SELLER APPLICATIONS ─────────────────────────────
export const mockSellerApplications: SellerApplication[] = [
  { id: 'sa1', name: 'Bilal Ahmed', email: 'bilal@seller.com', phone: '+92 314 4444444', storeName: 'Bilal Store', status: 'approved', appliedAt: '2024-03-15' },
  { id: 'sa2', name: 'Ayesha Siddiqui', email: 'fashion@seller.com', phone: '+92 314 5555555', storeName: 'Fashion Hub', status: 'approved', appliedAt: '2024-04-01' },
  { id: 'sa3', name: 'Tariq Mahmood', email: 'tech@seller.com', phone: '+92 314 6666666', storeName: 'Tech World', status: 'approved', appliedAt: '2024-05-01' },
  { id: 'sa4', name: 'Nadia Karim', email: 'fresh@seller.com', phone: '+92 314 7777777', storeName: 'Marché Frais', status: 'pending', appliedAt: '2025-01-10' },
  { id: 'sa5', name: 'Imran Shah', email: 'gadget@seller.com', phone: '+92 314 8888888', storeName: 'Gadget Zone', status: 'pending', appliedAt: '2025-01-12' },
  { id: 'sa6', name: 'Old Shop', email: 'old@seller.com', phone: '+92 314 9999999', storeName: 'Ancienne Boutique', status: 'rejected', appliedAt: '2025-01-05' },
];

// ─── FAVORITES (mock) ─────────────────────────────────
export const mockFavorites: { userId: string; productId: string }[] = [
  { userId: 'u1', productId: 'p1' },
  { userId: 'u1', productId: 'p10' },
  { userId: 'u1', productId: 'p12' },
  { userId: 'u1', productId: 'p25' },
  { userId: 'u1', productId: 'p26' },
  { userId: 'u2', productId: 'p6' },
  { userId: 'u2', productId: 'p8' },
  { userId: 'u2', productId: 'p16' },
  { userId: 'u2', productId: 'p24' },
  { userId: 'u2', productId: 'p30' },
  { userId: 'u4', productId: 'p3' },
  { userId: 'u4', productId: 'p17' },
  { userId: 'u4', productId: 'p29' },
  { userId: 'u4', productId: 'p31' },
  { userId: 'u3', productId: 'p10' },
  { userId: 'u3', productId: 'p13' },
  { userId: 'u3', productId: 'p25' },
];

// ─── REVIEWS (mock) ──────────────────────────────────
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'published' | 'pending' | 'hidden';
}

export const mockReviews: Review[] = [
  { id: 'r1', productId: 'p1', userId: 'u2', userName: 'Sara Malik', rating: 5, comment: 'Excellent riz, très bon goût !', date: '2025-01-10', status: 'published' },
  { id: 'r2', productId: 'p1', userId: 'u4', userName: 'Fatima Noor', rating: 4, comment: 'Bonne qualité, livraison rapide.', date: '2025-01-08', status: 'published' },
  { id: 'r3', productId: 'p10', userId: 'u1', userName: 'Ahmed Khan', rating: 5, comment: 'Son incroyable, très confortable.', date: '2025-01-12', status: 'published' },
  { id: 'r4', productId: 'p10', userId: 'u3', userName: 'Usman Ali', rating: 4, comment: 'Bon rapport qualité-prix.', date: '2025-01-09', status: 'published' },
  { id: 'r5', productId: 'p12', userId: 'u4', userName: 'Fatima Noor', rating: 5, comment: 'Montre élégante et fonctionnelle.', date: '2025-01-11', status: 'published' },
  { id: 'r6', productId: 'p6', userId: 'u1', userName: 'Ahmed Khan', rating: 4, comment: 'Tissu de qualité, taille bien.', date: '2025-01-07', status: 'published' },
  { id: 'r7', productId: 'p3', userId: 'u3', userName: 'Usman Ali', rating: 3, comment: 'Correct mais parfum un peu fort.', date: '2025-01-06', status: 'published' },
  { id: 'r8', productId: 'p13', userId: 'u2', userName: 'Sara Malik', rating: 5, comment: 'Son puissant, batterie longue durée.', date: '2025-01-13', status: 'published' },
];
