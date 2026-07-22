import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  Mail, 
  Image as ImageIcon, 
  Settings, 
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Boxes
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { supabase } from '../../../lib/supabase';

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileDrawer?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleCollapse, isMobileDrawer }) => {
  const mainLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/cms', icon: Layers, label: 'CMS' },
    { to: '/admin/catalog/products', icon: Package, label: 'Products' },
    { to: '/admin/inventory', icon: Boxes, label: 'Inventory' },
    { to: '/admin/collections', icon: Layers, label: 'Collections' },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
    { to: '/admin/media', icon: ImageIcon, label: 'Media' },
  ];

  const bottomLinks = [
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
    { to: '/admin/profile', icon: UserCircle, label: 'Profile' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside
      className={`bg-white border-r border-neutral-200 flex flex-col h-full transition-all duration-300 ${
        isCollapsed && !isMobileDrawer ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-100 flex-shrink-0">
        {!isCollapsed || isMobileDrawer ? (
          <span className="font-bold text-lg tracking-tight">Kingsmen Admin</span>
        ) : (
          <span className="font-bold text-lg tracking-tight mx-auto">K</span>
        )}
        {!isMobileDrawer && (
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {mainLinks.map((link) => (
          <SidebarItem
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isCollapsed={isCollapsed && !isMobileDrawer}
          />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-neutral-100 space-y-1 flex-shrink-0">
        {bottomLinks.map((link) => (
          <SidebarItem
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isCollapsed={isCollapsed && !isMobileDrawer}
          />
        ))}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-neutral-500 hover:bg-red-50 hover:text-red-600 group`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!isCollapsed || isMobileDrawer) && (
            <span className="whitespace-nowrap overflow-hidden">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};
