import { createBrowserRouter, useRouteError } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { MainLayout } from './MainLayout';
import { PageLoader } from '../components/shared/PageLoader';
import NotFoundPage from '../pages/NotFoundPage';
import { ErrorBoundary } from '../components/shared/ErrorPages';

// Lazy load client pages
const HomePage = React.lazy(() => import('../pages/HomePage'));
const ProductsPage = React.lazy(() => import('../pages/ProductsPage'));
const ProductPage = React.lazy(() => import('../pages/ProductPage'));
const SearchPage = React.lazy(() => import('../pages/SearchPage'));
const CartPage = React.lazy(() => import('../pages/CartPage'));
const CheckoutPage = React.lazy(() => import('../pages/Checkout/CheckoutPage'));
const CheckoutSuccessPage = React.lazy(() => import('../pages/CheckoutSuccess/CheckoutSuccessPage'));
const DebugProductsPage = React.lazy(() => import('../pages/DebugProductsPage'));

// Lazy load admin pages (Moved)
const AnalyticsDashboard = React.lazy(() => import('../admin/features/reports/dashboard/pages/AnalyticsDashboard'));
const SalesReportsPage = React.lazy(() => import('../admin/features/reports/sales/pages/SalesReportsPage'));
const ProductAnalyticsPage = React.lazy(() => import('../admin/features/reports/products/pages/ProductAnalyticsPage'));
const CollectionAnalyticsPage = React.lazy(() => import('../admin/features/reports/collections/pages/CollectionAnalyticsPage'));
const FinancialReportsPage = React.lazy(() => import('../admin/features/reports/financial/pages/FinancialReportsPage'));
const ExportCenterPage = React.lazy(() => import('../admin/features/reports/export-center/pages/ExportCenterPage'));
const MarketingDashboard = React.lazy(() => import('../admin/features/marketing/dashboard/pages/MarketingDashboard'));
const SettingsPage = React.lazy(() => import('../admin/features/system/settings/pages/SettingsPage'));
const NotificationsPage = React.lazy(() => import('../admin/features/system/notifications/pages/NotificationsPage'));
const AdminLoginPage = React.lazy(() => import('../admin/features/auth/pages/AdminLoginPage'));

// Lazy load admin pages (New Scaffolding)
// Catalog
const AdminProductsPage = React.lazy(() => import('../admin/features/catalog/products/pages/ProductsPage'));
const AdminProductDetailPage = React.lazy(() => import('../admin/features/catalog/products/pages/ProductDetailPage'));
const AdminCollectionsPage = React.lazy(() => import('../admin/features/collections/pages/CollectionsPage'));
const AdminAddCollectionPage = React.lazy(() => import('../admin/features/collections/pages/AddCollectionPage'));
const AdminEditCollectionPage = React.lazy(() => import('../admin/features/collections/pages/EditCollectionPage'));
const AdminCategoriesPage = React.lazy(() => import('../admin/features/catalog/categories/pages/CategoriesPage'));
const AdminInventoryPage = React.lazy(() => import('../admin/features/catalog/inventory/pages/InventoryPage'));
const AdminMediaLibraryPage = React.lazy(() => import('../admin/features/catalog/media/pages/MediaLibraryPage'));

// Sales
const AdminOrdersPage = React.lazy(() => import('../admin/features/sales/orders/pages/OrdersPage'));
const AdminOrderDetailsPage = React.lazy(() => import('../admin/features/sales/orders/pages/OrderDetailsPage'));
const AdminCustomersPage = React.lazy(() => import('../admin/features/sales/customers/pages/CustomersPage'));
const AdminCheckoutSettingsPage = React.lazy(() => import('../admin/features/sales/checkout/pages/CheckoutSettingsPage'));

// Content
const AdminHomepageCMSPage = React.lazy(() => import('../admin/features/content/homepage/pages/HomepageCMSPage'));
const AdminFAQPage = React.lazy(() => import('../admin/features/content/faq/pages/FAQPage'));
const AdminTestimonialsPage = React.lazy(() => import('../admin/features/content/testimonials/pages/TestimonialsPage'));

// Marketing
const AdminCouponsPage = React.lazy(() => import('../admin/features/marketing/coupons/pages/CouponsPage'));
const AdminBannersPage = React.lazy(() => import('../admin/features/marketing/banners/pages/BannersPage'));
const AdminNewslettersPage = React.lazy(() => import('../admin/features/marketing/newsletters/pages/NewslettersPage'));
const AdminSubscribersPage = React.lazy(() => import('../admin/features/marketing/subscribers/pages/SubscribersPage'));
const AdminFeaturedProductsPage = React.lazy(() => import('../admin/features/marketing/featured-products/pages/FeaturedProductsPage'));
const AdminFeaturedCollectionsPage = React.lazy(() => import('../admin/features/marketing/featured-collections/pages/FeaturedCollectionsPage'));
const AdminHomepagePromotionsPage = React.lazy(() => import('../admin/features/marketing/homepage-promotions/pages/HomepagePromotionsPage'));
const AdminCampaignAnalyticsPage = React.lazy(() => import('../admin/features/marketing/campaign-analytics/pages/CampaignAnalyticsPage'));

// Additional Reports
const CustomerReportsPage = React.lazy(() => import('../admin/features/reports/customers/pages/CustomerReportsPage'));
const InventoryReportsPage = React.lazy(() => import('../admin/features/reports/inventory/pages/InventoryReportsPage'));

const withSuspense = (Component: React.ComponentType) => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

// Admin Components (Lazy Loaded)
const AdminLayout = lazy(() => import('../admin/components/layout/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('../admin/pages/Login'));
const AdminDashboard = lazy(() => import('../admin/pages/Dashboard'));
const AdminInventory = lazy(() => import('../admin/pages/Inventory'));
const AdminCollections = lazy(() => import('../admin/features/collections/pages/CollectionsPage'));
const AdminAddCollection = lazy(() => import('../admin/features/collections/pages/AddCollectionPage'));
const AdminEditCollection = lazy(() => import('../admin/features/collections/pages/EditCollectionPage'));
const AdminOrders = lazy(() => import('../admin/features/orders/pages/OrdersPage'));
const AdminOrderDetails = lazy(() => import('../admin/features/orders/pages/OrderDetailsPage'));
const AdminCustomers = lazy(() => import('../admin/pages/Customers'));
const AdminCustomerProfile = lazy(() => import('../admin/features/customers/pages/CustomerProfilePage'));
const AdminCMS = lazy(() => import('../admin/features/cms/pages/CMSPage'));
const AdminNewsletter = lazy(() => import('../admin/pages/Newsletter'));
const AdminMedia = lazy(() => import('../admin/pages/Media'));
const AdminSettings = lazy(() => import('../admin/features/settings/pages/SettingsPage'));
const AdminProfile = lazy(() => import('../admin/pages/Profile'));
const ProtectedRoute = lazy(() => import('../admin/auth/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })));

// Loading Fallback for Admin Routes
const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
  </div>
);

// Error Element for Admin Routes
const AdminErrorElement = () => {
  const error = useRouteError() as any;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">Something went wrong</h2>
        <p className="text-neutral-500 mb-4">We encountered an error loading this page.</p>
        <div className="text-left bg-neutral-100 p-3 rounded text-sm text-red-600 font-mono overflow-auto mb-6">
          {error?.message || error?.statusText || 'Unknown error'}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'products', element: withSuspense(ProductsPage) },
      { path: 'products/:handle', element: withSuspense(ProductPage) },
      { path: 'search', element: withSuspense(SearchPage) },
      { path: 'cart', element: withSuspense(CartPage) },
      { path: 'checkout', element: withSuspense(CheckoutPage) },
      { path: 'checkout/success', element: withSuspense(CheckoutSuccessPage) },
      { path: 'debug/products', element: withSuspense(DebugProductsPage) },
    ],
  },
  {
    path: '/admin/login',
    element: withSuspense(AdminLoginPage),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/admin',
    element: withSuspense(ProtectedRoute),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { index: true, element: withSuspense(AnalyticsDashboard) },
          { path: 'cms', element: withSuspense(AdminCMS) },
      
      // Catalog
      { path: 'catalog/products', element: withSuspense(AdminProductsPage) },
      { path: 'catalog/products/new', element: withSuspense(AdminProductDetailPage) },
      { path: 'catalog/products/:id', element: withSuspense(AdminProductDetailPage) },
      { path: 'catalog/collections', element: withSuspense(AdminCollectionsPage) },
      { path: 'catalog/collections/new', element: withSuspense(AdminAddCollectionPage) },
      { path: 'catalog/collections/:id', element: withSuspense(AdminEditCollectionPage) },
      { path: 'catalog/categories', element: withSuspense(AdminCategoriesPage) },
      { path: 'catalog/inventory', element: withSuspense(AdminInventoryPage) },
      { path: 'catalog/media-library', element: withSuspense(AdminMediaLibraryPage) },
      
      // Sales
      { path: 'sales/orders', element: withSuspense(AdminOrdersPage) },
      { path: 'sales/orders/:id', element: withSuspense(AdminOrderDetailsPage) },
      { path: 'sales/customers', element: withSuspense(AdminCustomersPage) },
      { path: 'sales/checkout-settings', element: withSuspense(AdminCheckoutSettingsPage) },
      
      // Content
      { path: 'content/homepage-cms', element: withSuspense(AdminHomepageCMSPage) },
      { path: 'content/faq', element: withSuspense(AdminFAQPage) },
      { path: 'content/testimonials', element: withSuspense(AdminTestimonialsPage) },
      
      // Marketing
      { path: 'marketing/dashboard', element: withSuspense(MarketingDashboard) },
      { path: 'marketing/coupons', element: withSuspense(AdminCouponsPage) },
      { path: 'marketing/promotional-banners', element: withSuspense(AdminBannersPage) },
      { path: 'marketing/newsletter-campaigns', element: withSuspense(AdminNewslettersPage) },
      { path: 'marketing/subscribers', element: withSuspense(AdminSubscribersPage) },
      { path: 'marketing/featured-products', element: withSuspense(AdminFeaturedProductsPage) },
      { path: 'marketing/featured-collections', element: withSuspense(AdminFeaturedCollectionsPage) },
      { path: 'marketing/homepage-promotions', element: withSuspense(AdminHomepagePromotionsPage) },
      { path: 'marketing/campaign-analytics', element: withSuspense(AdminCampaignAnalyticsPage) },
      
      // Reports
      { path: 'reports/dashboard', element: withSuspense(AnalyticsDashboard) }, // Or some reports overview
      { path: 'reports/sales', element: withSuspense(SalesReportsPage) },
      { path: 'reports/products', element: withSuspense(ProductAnalyticsPage) },
      { path: 'reports/customers', element: withSuspense(CustomerReportsPage) },
      { path: 'reports/inventory', element: withSuspense(InventoryReportsPage) },
      { path: 'reports/collections', element: withSuspense(CollectionAnalyticsPage) },
      { path: 'reports/financial', element: withSuspense(FinancialReportsPage) },
      { path: 'reports/export-center', element: withSuspense(ExportCenterPage) },
      
      // System
      { path: 'system/notifications', element: withSuspense(NotificationsPage) },
      { path: 'system/settings', element: withSuspense(SettingsPage) },
      { path: 'settings', element: withSuspense(AdminSettings) },
      
      // Restored Legacy Routes for completed modules
      { path: 'inventory', element: withSuspense(AdminInventory) },
      { path: 'collections', element: withSuspense(AdminCollections) },
      { path: 'collections/new', element: withSuspense(AdminAddCollection) },
      { path: 'collections/:id', element: withSuspense(AdminEditCollection) },
      { path: 'orders', element: withSuspense(AdminOrders) },
      { path: 'orders/:id', element: withSuspense(AdminOrderDetails) },
      { path: 'customers', element: withSuspense(AdminCustomers) },
      { path: 'customers/:id', element: withSuspense(AdminCustomerProfile) },
      { path: 'newsletter', element: withSuspense(AdminNewsletter) },
      { path: 'media', element: withSuspense(AdminMedia) },
      { path: 'profile', element: withSuspense(AdminProfile) }
        ]
      }
    ]
  },
]);
