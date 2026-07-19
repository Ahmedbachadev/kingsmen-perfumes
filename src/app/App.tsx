import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '../styles/index.css';
import { AuthProvider } from '../admin/auth/AuthProvider';
import { CMSProvider } from '../contexts/CMSContext';

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <RouterProvider router={router} />
      </CMSProvider>
    </AuthProvider>
  );
}