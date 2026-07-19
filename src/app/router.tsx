import { createBrowserRouter, useRouteError } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { MainLayout } from './MainLayout';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import SearchPage from '../pages/SearchPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutSuccessPage from '../pages/CheckoutSuccessPage';
import NotFoundPage from '../pages/NotFoundPage';
import DebugProductsPage from '../pages/DebugProductsPage';

// Admin Components (Lazy Loaded)
const AdminLayout = lazy(() => import('../admin/components/layout/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('../admin/pages/Login'));
const AdminDashboard = lazy(() => import('../admin/pages/Dashboard'));
const AdminProducts = lazy(() => import('../admin/pages/Products'));
const AdminAddProduct = lazy(() => import('../admin/pages/Products/AddProduct'));
const AdminEditProduct = lazy(() => import('../admin/pages/Products/EditProduct'));
const AdminInventory = lazy(() => import('../admin/pages/Inventory'));
const AdminCollections = lazy(() => import('../admin/features/collections/pages/CollectionsPage').then(m => ({ default: m.CollectionsPage })));
const AdminAddCollection = lazy(() => import('../admin/features/collections/pages/AddCollectionPage').then(m => ({ default: m.AddCollectionPage })));
const AdminEditCollection = lazy(() => import('../admin/features/collections/pages/EditCollectionPage').then(m => ({ default: m.EditCollectionPage })));
const AdminOrders = lazy(() => import('../admin/features/orders/pages/OrdersPage').then(m => ({ default: m.OrdersPage })));
const AdminOrderDetails = lazy(() => import('../admin/features/orders/pages/OrderDetailsPage').then(m => ({ default: m.OrderDetailsPage })));
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
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:handle',
        element: <ProductPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'checkout/success',
        element: <CheckoutSuccessPage />,
      },
      {
        path: 'debug/products',
        element: <DebugProductsPage />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: (
      <Suspense fallback={<AdminLoader />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<AdminLoader />}>
        <ProtectedRoute />
      </Suspense>
    ),
    errorElement: <AdminErrorElement />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: 'products',
            element: <AdminProducts />,
          },
          {
            path: 'products/new',
            element: <AdminAddProduct />,
          },
          {
            path: 'products/:id',
            element: <AdminEditProduct />,
          },
          {
            path: 'inventory',
            element: <AdminInventory />,
          },
          {
            path: 'collections',
            element: <AdminCollections />,
          },
          {
            path: 'collections/new',
            element: <AdminAddCollection />,
          },
          {
            path: 'collections/:id',
            element: <AdminEditCollection />,
          },
          {
            path: 'orders',
            element: <AdminOrders />,
          },
          {
            path: 'orders/:id',
            element: <AdminOrderDetails />,
          },
          {
            path: 'customers',
            element: <AdminCustomers />,
          },
          {
            path: 'customers/:id',
            element: <AdminCustomerProfile />,
          },
          {
            path: 'cms',
            element: <AdminCMS />,
          },
          {
            path: 'newsletter',
            element: <AdminNewsletter />,
          },
          {
            path: 'media',
            element: <AdminMedia />,
          },
          {
            path: 'settings',
            element: <AdminSettings />,
          },
          {
            path: 'profile',
            element: <AdminProfile />,
          },
        ],
      },
    ],
  },
]);
