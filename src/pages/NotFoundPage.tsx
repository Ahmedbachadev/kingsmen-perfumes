import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white">
      <div className="text-center max-w-md">
        <div className="mx-auto w-24 h-24 bg-neutral-200 dark:bg-neutral-900 text-neutral-500 rounded-full flex items-center justify-center mb-8">
          <FileQuestion className="w-12 h-12" />
        </div>
        <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
        <p className="text-xl text-neutral-500 dark:text-neutral-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
