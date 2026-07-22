import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <GenericErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}

export const GenericErrorPage = ({ error, message }: { error?: Error | null, message?: string }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-500/10 text-red-600 rounded-full flex items-center justify-center mb-8">
          <AlertOctagon className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8">
          {message || "We encountered an unexpected error. Our team has been notified. Please try refreshing the page."}
        </p>
        
        {error && (
          <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 mb-8 text-left overflow-x-auto text-xs text-red-500 font-mono">
            {error.toString()}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-medium rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
