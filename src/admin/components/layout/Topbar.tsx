import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../auth/useAuth';

interface TopbarProps {
  toggleMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ toggleMobileSidebar }) => {
  const { user } = useAuth();
  
  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 sticky top-0 z-10 flex-shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 -ml-2 rounded-md hover:bg-neutral-100 text-neutral-500 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg max-w-md w-full border border-neutral-200 focus-within:bg-white focus-within:border-neutral-300 transition-colors">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search across the admin panel..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder-neutral-400 text-neutral-800"
          />
          <div className="flex items-center gap-1">
            <kbd className="hidden md:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 bg-white border border-neutral-200 rounded">
              ⌘
            </kbd>
            <kbd className="hidden md:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 bg-white border border-neutral-200 rounded">
              K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-neutral-200 mx-2 hidden sm:block"></div>
        
        <button className="flex items-center gap-2 p-1 pl-2 pr-1 rounded-full hover:bg-neutral-100 transition-colors text-left">
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-medium text-neutral-700 leading-none mb-1">Admin</span>
            <span className="text-xs text-neutral-500 leading-none">{user?.email || 'Loading...'}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 border border-neutral-300 overflow-hidden ml-1">
            <User className="w-4 h-4" />
          </div>
        </button>
      </div>
    </header>
  );
};
