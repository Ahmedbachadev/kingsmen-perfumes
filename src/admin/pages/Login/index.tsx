import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { useAuth } from '../../auth/useAuth';

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user && !loading) {
      navigate('/admin', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center rounded-xl font-bold text-xl tracking-tighter">
            K
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-neutral-900">
          Kingsmen Admin
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-neutral-200">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
