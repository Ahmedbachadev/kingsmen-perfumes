import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors">
        Return Home
      </Link>
    </div>
  );
}
