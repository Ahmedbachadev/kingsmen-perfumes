import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ToastProvider } from '../components/shared/ToastProvider';
import '../styles/index.css';
import { AuthProvider } from '../admin/auth/AuthProvider';
import { CMSProvider } from '../contexts/CMSContext';

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </CMSProvider>
    </AuthProvider>
  );
}