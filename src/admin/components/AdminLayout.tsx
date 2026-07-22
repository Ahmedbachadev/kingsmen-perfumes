import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { 
 LayoutDashboard, 
 Bell, 
 Settings, 
 LogOut, 
 BarChart3, 
 PackageSearch, 
 Layers, 
 Wallet, 
 HardDriveDownload, 
 Megaphone, 
 Search,
 ShoppingCart,
 Users,
 CreditCard,
 Layout,
 MessageSquare,
 HelpCircle,
 Tag,
 Image,
 Mail,
 UserPlus,
 Star,
 Activity,
 FileText,
 Boxes,
 Archive
} from 'lucide-react';
import { NotificationBadge } from '../features/system/notifications/components/NotificationBadge';
import { GlobalSearch } from './GlobalSearch';
import { cn } from '../utils/cn';

// Helper for Sidebar links
const SidebarLink = ({ to, icon: Icon, children }: { to: string, icon: any, children: React.ReactNode }) => {
 const location = useLocation();
 const isActive = location.pathname === to;
 return (
 <Link 
 to={to} 
 className={cn(
 "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ease-out text-sm font-medium",
 isActive 
 ? "bg-slate-100 text-indigo-600 shadow-sm" 
 : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:scale-[0.98]"
 )}
 >
 <Icon className={cn("w-5 h-5", isActive ? "text-indigo-600 " : "text-slate-400")} />
 {children}
 </Link>
 );
};

const SidebarGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
 <div className="mb-6">
 <h3 className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
 {title}
 </h3>
 <div className="space-y-1">
 {children}
 </div>
 </div>
);

export function AdminLayout() {
 return (
 <div className="flex h-screen bg-[#FBFBFD] font-sans text-slate-900 ">
 {/* Sidebar - Desktop */}
 <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-y-auto custom-scrollbar z-40">
 <div className="sticky top-0 z-10 p-5 bg-white/90 backdrop-blur-md">
 <Link to="/admin" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
 Admin Panel
 </Link>
 </div>
 
 <nav className="flex-1 px-4 py-2">
 <SidebarGroup title="Overview">
 <SidebarLink to="/admin" icon={LayoutDashboard}>Dashboard</SidebarLink>
 </SidebarGroup>

 <SidebarGroup title="Catalog">
 <SidebarLink to="/admin/catalog/products" icon={PackageSearch}>Products</SidebarLink>
 <SidebarLink to="/admin/catalog/collections" icon={Layers}>Collections</SidebarLink>
 <SidebarLink to="/admin/catalog/categories" icon={Archive}>Categories</SidebarLink>
 <SidebarLink to="/admin/catalog/inventory" icon={Boxes}>Inventory</SidebarLink>
 <SidebarLink to="/admin/catalog/media-library" icon={Image}>Media Library</SidebarLink>
 </SidebarGroup>

 <SidebarGroup title="Sales">
 <SidebarLink to="/admin/sales/orders" icon={ShoppingCart}>Orders</SidebarLink>
 <SidebarLink to="/admin/sales/customers" icon={Users}>Customers</SidebarLink>
 <SidebarLink to="/admin/sales/checkout-settings" icon={CreditCard}>Checkout Settings</SidebarLink>
 </SidebarGroup>

 <SidebarGroup title="Content">
 <SidebarLink to="/admin/content/homepage-cms" icon={Layout}>Homepage CMS</SidebarLink>
 <SidebarLink to="/admin/content/faq" icon={HelpCircle}>FAQ</SidebarLink>
 <SidebarLink to="/admin/content/testimonials" icon={MessageSquare}>Testimonials</SidebarLink>
 </SidebarGroup>

 <SidebarGroup title="Marketing">
 <SidebarLink to="/admin/marketing/dashboard" icon={Megaphone}>Marketing Dashboard</SidebarLink>
 <SidebarLink to="/admin/marketing/coupons" icon={Tag}>Coupons</SidebarLink>
 <SidebarLink to="/admin/marketing/promotional-banners" icon={Image}>Promotional Banners</SidebarLink>
 <SidebarLink to="/admin/marketing/newsletter-campaigns" icon={Mail}>Newsletter Campaigns</SidebarLink>
 <SidebarLink to="/admin/marketing/subscribers" icon={UserPlus}>Subscribers</SidebarLink>
 <SidebarLink to="/admin/marketing/featured-products" icon={Star}>Featured Products</SidebarLink>
 <SidebarLink to="/admin/marketing/featured-collections" icon={Layers}>Featured Collections</SidebarLink>
 <SidebarLink to="/admin/marketing/homepage-promotions" icon={Layout}>Homepage Promotions</SidebarLink>
 <SidebarLink to="/admin/marketing/campaign-analytics" icon={Activity}>Campaign Analytics</SidebarLink>
 </SidebarGroup>

 <SidebarGroup title="Reports">
 <SidebarLink to="/admin/reports/dashboard" icon={BarChart3}>Reports Dashboard</SidebarLink>
 <SidebarLink to="/admin/reports/sales" icon={BarChart3}>Sales Reports</SidebarLink>
 <SidebarLink to="/admin/reports/products" icon={FileText}>Product Reports</SidebarLink>
 <SidebarLink to="/admin/reports/customers" icon={Users}>Customer Reports</SidebarLink>
 <SidebarLink to="/admin/reports/inventory" icon={Boxes}>Inventory Reports</SidebarLink>
 <SidebarLink to="/admin/reports/collections" icon={Layers}>Collection Reports</SidebarLink>
 <SidebarLink to="/admin/reports/financial" icon={Wallet}>Financial Reports</SidebarLink>
 <SidebarLink to="/admin/reports/export-center" icon={HardDriveDownload}>Export Center</SidebarLink>
 </SidebarGroup>

 <SidebarGroup title="System">
 <SidebarLink to="/admin/system/notifications" icon={Bell}>Notifications</SidebarLink>
 <SidebarLink to="/admin/system/settings" icon={Settings}>Settings</SidebarLink>
 </SidebarGroup>
 </nav>
 
 <div className="sticky bottom-0 p-4 border-t border-slate-200/60 bg-white backdrop-blur-md">
 <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out hover:scale-[0.98]">
 <LogOut className="w-5 h-5" />
 Log out
 </button>
 </div>
 </aside>

 {/* Main Content */}
 <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
 <GlobalSearch />
 
 {/* Header - Glassmorphism */}
 <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 z-30 sticky top-0 transition-all duration-300">
 <div className="flex items-center md:hidden">
 <Link to="/admin" className="text-xl font-bold tracking-tight text-slate-900 ">
 Admin
 </Link>
 </div>
 
 <div className="hidden md:flex flex-1 items-center px-4">
 <button 
 onClick={() => window.dispatchEvent(new CustomEvent('openGlobalSearch'))}
 className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 bg-slate-100/50 hover:bg-slate-100 rounded-lg transition-all duration-300 ease-out w-64 border border-slate-200/60 shadow-sm"
 >
 <Search className="w-4 h-4" />
 <span>Search...</span>
 <kbd className="ml-auto text-[10px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 ">Ctrl K</kbd>
 </button>
 </div>
 
 <div className="flex items-center justify-end flex-1 md:flex-none gap-5">
 <NotificationBadge />
 <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
 <span className="text-sm font-semibold text-white">A</span>
 </div>
 </div>
 </header>

 {/* Page Content */}
 <div className="flex-1 overflow-auto">
 <Outlet />
 </div>
 </main>
 </div>
 <Toaster
   position="bottom-right"
   toastOptions={{
     duration: 4000,
     style: {
       borderRadius: '12px',
       background: '#1e293b',
       color: '#f8fafc',
       fontSize: '14px',
       fontWeight: '500',
       padding: '12px 16px',
       boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
     },
     success: {
       iconTheme: { primary: '#22c55e', secondary: '#f8fafc' },
     },
     error: {
       iconTheme: { primary: '#ef4444', secondary: '#f8fafc' },
       duration: 6000,
     },
   }}
 />
 );
}
