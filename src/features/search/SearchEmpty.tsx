import { SearchX } from 'lucide-react';

export const SearchEmpty = ({ query, loading }: { query: string; loading: boolean }) => {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        ) : (
          <SearchX className="w-5 h-5 text-white/40" />
        )}
      </div>
      <p className="text-white text-sm tracking-wide font-light mb-1">
        {loading ? 'Searching...' : 'No results found'}
      </p>
      {!loading && (
        <p className="text-white/40 text-xs tracking-wide font-light">
          We couldn't find anything matching "{query}". Try another term.
        </p>
      )}
    </div>
  );
};
