import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import SearchPage from '../pages/SearchPage';
import CartPage from '../pages/CartPage';
import NotFoundPage from '../pages/NotFoundPage';
import DebugProductsPage from '../pages/DebugProductsPage';

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
        path: 'debug/products',
        element: <DebugProductsPage />,
      },
    ],
  },
]);
