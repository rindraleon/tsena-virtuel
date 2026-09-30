import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollManager from './components/common/ScrollManager';

// Pages
import HomePage from './pages/HomePage';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import ClientDashboardLayout from './layouts/ClientDashboardLayout';
import SellerDashboardLayout from './layouts/SellerDashboardLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';

// Guards
import ProtectedRoute from './guards/ProtectedRoute';
import GuestRoute from './guards/GuestRoute';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import SellerRegisterPage from './pages/auth/SellerRegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Public pages
import CartPage from './pages/public/CartPage';
import FavoritesPage from './pages/public/FavoritesPage';
import ProductsPage from './pages/public/ProductsPage';
import PromoPage from './pages/public/PromoPage';
import ContactPage from './pages/public/ContactPage';
import AboutPage from './pages/public/AboutPage';
import CheckoutPage from './pages/public/CheckoutPage';
import OrderSuccessPage from './pages/public/OrderSuccessPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Client pages
import ClientDashboardPage from './pages/client/ClientDashboardPage';
import ClientProfilePage from './pages/client/ClientProfilePage';
import ClientOrdersPage from './pages/client/ClientOrdersPage';

// Seller pages
import SellerDashboardPage from './pages/seller/SellerDashboardPage';
import SellerProductsPage from './pages/seller/SellerProductsPage';
import SellerProductFormPage from './pages/seller/SellerProductFormPage';
import SellerOrdersPage from './pages/seller/SellerOrdersPage';

// Admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminUserFormPage from './pages/admin/AdminUserFormPage';
import AdminSellersPage from './pages/admin/AdminSellersPage';
import AdminSellerDetailPage from './pages/admin/AdminSellerDetailPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminCategoryFormPage from './pages/admin/AdminCategoryFormPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';

// Product detail
import ProductDetailPage from './pages/ProductDetailPage';

// Stub
import StubPage from './pages/StubPage';
import { Heart, MapPin, CreditCard, Wallet, Store, FileText, Megaphone, Settings } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
    <ErrorBoundary>
    <AuthProvider>
      <CartProvider>
      <HashRouter>
        <ScrollManager />
        <AnimatePresence mode="wait">
        <Routes>
          {/* ── PUBLIC ROUTES ── */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="produits" element={<ProductsPage />} />
            <Route path="produits/:id" element={<ProductDetailPage />} />
            <Route path="panier" element={<CartPage />} />
            <Route path="favoris" element={<FavoritesPage />} />
            <Route path="promotions" element={<PromoPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="a-propos" element={<AboutPage />} />
          </Route>

          {/* ── AUTH ROUTES (guest only) ── */}
          <Route path="/connexion" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/inscription" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route path="/inscription/vendeur" element={<GuestRoute><SellerRegisterPage /></GuestRoute>} />
          <Route path="/mot-de-passe-oublie" element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />
          <Route path="/verification-email" element={<GuestRoute><VerifyEmailPage /></GuestRoute>} />
          <Route path="/reinitialiser-mot-de-passe" element={<GuestRoute><ResetPasswordPage /></GuestRoute>} />

          {/* Legacy aliases */}
          <Route path="/login" element={<Navigate to="/connexion" replace />} />
          <Route path="/register" element={<Navigate to="/inscription" replace />} />

          {/* ── CHECKOUT (authenticated) ── */}
          <Route path="/commande" element={<ProtectedRoute requiredRole="client"><PublicLayout /></ProtectedRoute>}>
            <Route path="validation" element={<CheckoutPage />} />
            <Route path="succes" element={<OrderSuccessPage />} />
          </Route>

          {/* ── CLIENT DASHBOARD ── */}
          <Route path="/dashboard/client" element={<ProtectedRoute requiredRole="client"><ClientDashboardLayout /></ProtectedRoute>}>
            <Route index element={<ClientDashboardPage />} />
            <Route path="profil" element={<ClientProfilePage />} />
            <Route path="mes-commandes" element={<ClientOrdersPage />} />
            <Route path="mes-favoris" element={<StubPage title="Mes Favoris" icon={<Heart size={32} />} />} />
            <Route path="mes-adresses" element={<StubPage title="Mes Adresses" icon={<MapPin size={32} />} />} />
            <Route path="mes-avis" element={<StubPage title="Mes Avis" icon={<FileText size={32} />} />} />
            {/* Legacy aliases */}
            <Route path="profile" element={<Navigate to="profil" replace />} />
            <Route path="orders" element={<Navigate to="mes-commandes" replace />} />
            <Route path="wishlist" element={<Navigate to="mes-favoris" replace />} />
            <Route path="addresses" element={<Navigate to="mes-adresses" replace />} />
          </Route>

          {/* ── SELLER DASHBOARD ── */}
          <Route path="/dashboard/vendeur" element={<ProtectedRoute requiredRole="seller"><SellerDashboardLayout /></ProtectedRoute>}>
            <Route index element={<SellerDashboardPage />} />
            <Route path="produits" element={<SellerProductsPage />} />
            <Route path="produits/nouveau" element={<SellerProductFormPage />} />
            <Route path="produits/:id/modifier" element={<SellerProductFormPage />} />
            <Route path="commandes" element={<SellerOrdersPage />} />
            <Route path="boutique" element={<StubPage title="Ma Boutique" icon={<Store size={32} />} />} />
            <Route path="revenus" element={<StubPage title="Revenus" icon={<Wallet size={32} />} />} />
            <Route path="avis" element={<StubPage title="Avis Clients" icon={<FileText size={32} />} />} />
            {/* Legacy aliases */}
            <Route path="products" element={<Navigate to="produits" replace />} />
            <Route path="orders" element={<Navigate to="commandes" replace />} />
          </Route>

          {/* ── ADMIN DASHBOARD ── */}
          <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboardLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="utilisateurs" element={<AdminUsersPage />} />
            <Route path="utilisateurs/nouveau" element={<AdminUserFormPage />} />
            <Route path="utilisateurs/:id/modifier" element={<AdminUserFormPage />} />
            <Route path="vendeurs" element={<AdminSellersPage />} />
            <Route path="vendeurs/:id" element={<AdminSellerDetailPage />} />
            <Route path="produits" element={<AdminProductsPage />} />
            <Route path="produits/nouveau" element={<AdminProductFormPage />} />
            <Route path="produits/:id/modifier" element={<AdminProductFormPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="categories/nouveau" element={<AdminCategoryFormPage />} />
            <Route path="categories/:id/modifier" element={<AdminCategoryFormPage />} />
            <Route path="commandes" element={<AdminOrdersPage />} />
            <Route path="paiements" element={<StubPage title="Paiements" icon={<CreditCard size={32} />} />} />
            <Route path="rapports" element={<StubPage title="Rapports" icon={<FileText size={32} />} />} />
            <Route path="promotions" element={<StubPage title="Promotions" icon={<Megaphone size={32} />} />} />
            <Route path="parametres" element={<StubPage title="Paramètres" icon={<Settings size={32} />} />} />
            {/* Legacy aliases */}
            <Route path="users" element={<Navigate to="utilisateurs" replace />} />
            <Route path="sellers" element={<Navigate to="vendeurs" replace />} />
            <Route path="products" element={<Navigate to="produits" replace />} />
            <Route path="orders" element={<Navigate to="commandes" replace />} />
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </AnimatePresence>
      </HashRouter>
      </CartProvider>
    </AuthProvider>
    </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
