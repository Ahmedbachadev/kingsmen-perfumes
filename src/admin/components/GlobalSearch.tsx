import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, Users, Layers, Settings, FileText, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { cn } from '../utils/cn';

interface SearchResult {
 id: string;
 title: string;
 subtitle?: string;
 type: 'product' | 'collection' | 'customer' | 'order' | 'page';
 url: string;
}

export const GlobalSearch: React.FC = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [query, setQuery] = useState('');
 const [results, setResults] = useState<SearchResult[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [selectedIndex, setSelectedIndex] = useState(0);
 
 const inputRef = useRef<HTMLInputElement>(null);
 const navigate = useNavigate();

 // Handle Ctrl+K shortcut and custom events
 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
 e.preventDefault();
 setIsOpen((prev) => !prev);
 }
 if (e.key === 'Escape' && isOpen) {
 setIsOpen(false);
 }
 };
 
 const handleOpenEvent = () => setIsOpen(true);

 window.addEventListener('keydown', handleKeyDown);
 window.addEventListener('openGlobalSearch', handleOpenEvent);
 return () => {
 window.removeEventListener('keydown', handleKeyDown);
 window.removeEventListener('openGlobalSearch', handleOpenEvent);
 };
 }, [isOpen]);

 // Focus input when opened
 useEffect(() => {
 if (isOpen) {
 setTimeout(() => inputRef.current?.focus(), 100);
 setQuery('');
 setResults([]);
 }
 }, [isOpen]);

 // Handle Search Logic
 useEffect(() => {
 if (!query.trim()) {
 setResults([]);
 return;
 }

 const fetchResults = async () => {
 setIsLoading(true);
 try {
 const mockPages: SearchResult[] = [
 { id: 'settings', title: 'General Settings', type: 'page', url: '/admin/settings' },
 { id: 'financial', title: 'Financial Reports', type: 'page', url: '/admin/financial-reports' },
 { id: 'export', title: 'Export Center', type: 'page', url: '/admin/export-center' },
 { id: 'marketing', title: 'Marketing Dashboard', type: 'page', url: '/admin/marketing' }
 ].filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

 // We simulate DB queries if we don't have perfect indexes setup
 const { data: products } = await supabase
 .from('products')
 .select('id, title, handle, category')
 .ilike('title', `%${query}%`)
 .limit(3);

 const { data: profiles } = await supabase
 .from('profiles')
 .select('id, full_name, email')
 .ilike('full_name', `%${query}%`)
 .limit(3);

 const formattedProducts: SearchResult[] = (products || []).map(p => ({
 id: p.id,
 title: p.title,
 subtitle: p.category,
 type: 'product',
 url: `/admin/products/${p.id}` // Placeholder routes for demo
 }));

 const formattedProfiles: SearchResult[] = (profiles || []).map(p => ({
 id: p.id,
 title: p.full_name || 'Unknown',
 subtitle: p.email,
 type: 'customer',
 url: `/admin/customers/${p.id}` // Placeholder routes for demo
 }));

 setResults([...mockPages, ...formattedProducts, ...formattedProfiles]);
 setSelectedIndex(0);
 } catch (error) {
 console.error('Search error:', error);
 } finally {
 setIsLoading(false);
 }
 };

 const debounceId = setTimeout(fetchResults, 300);
 return () => clearTimeout(debounceId);
 }, [query]);

 // Keyboard navigation within results
 const handleKeyDown = (e: React.KeyboardEvent) => {
 if (e.key === 'ArrowDown') {
 e.preventDefault();
 setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
 } else if (e.key === 'ArrowUp') {
 e.preventDefault();
 setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
 } else if (e.key === 'Enter') {
 e.preventDefault();
 if (results[selectedIndex]) {
 handleSelect(results[selectedIndex]);
 }
 }
 };

 const handleSelect = (result: SearchResult) => {
 navigate(result.url);
 setIsOpen(false);
 };

 const getIcon = (type: SearchResult['type']) => {
 switch (type) {
 case 'product': return <Package className="w-4 h-4 text-emerald-500" />;
 case 'customer': return <Users className="w-4 h-4 text-blue-500" />;
 case 'collection': return <Layers className="w-4 h-4 text-pink-500" />;
 case 'order': return <FileText className="w-4 h-4 text-amber-500" />;
 default: return <Settings className="w-4 h-4 text-neutral-500" />;
 }
 };

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
 {/* Backdrop */}
 <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
 
 {/* Modal */}
 <div 
 className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col"
 role="dialog"
 aria-modal="true"
 >
 <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-100 ">
 <Search className="w-5 h-5 text-neutral-400" />
 <input
 ref={inputRef}
 type="text"
 className="flex-1 bg-transparent border-none outline-none text-neutral-900 placeholder:text-neutral-400 text-lg"
 placeholder="Search products, orders, customers..."
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 onKeyDown={handleKeyDown}
 />
 <button 
 onClick={() => setIsOpen(false)}
 className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 transition-colors"
 >
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="max-h-[60vh] overflow-y-auto">
 {isLoading && query.trim() && (
 <div className="p-4 text-center text-sm text-neutral-500 flex justify-center">
 <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
 </div>
 )}

 {!isLoading && query.trim() && results.length === 0 && (
 <div className="p-8 text-center text-sm text-neutral-500">
 No results found for "{query}"
 </div>
 )}

 {!isLoading && results.length > 0 && (
 <ul className="p-2 space-y-1">
 {results.map((result, index) => (
 <li key={`${result.id}-${index}`}>
 <button
 onClick={() => handleSelect(result)}
 onMouseEnter={() => setSelectedIndex(index)}
 className={cn(
 "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-left",
 selectedIndex === index 
 ? "bg-neutral-100 " 
 : "hover:bg-neutral-50"
 )}
 >
 <div className="shrink-0 p-2 rounded-lg bg-white border border-neutral-200 shadow-sm">
 {getIcon(result.type)}
 </div>
 <div>
 <div className="text-sm font-medium text-neutral-900 ">{result.title}</div>
 {result.subtitle && (
 <div className="text-xs text-neutral-500 ">{result.subtitle}</div>
 )}
 </div>
 <span className="ml-auto text-[10px] uppercase font-bold tracking-wider text-neutral-400">
 {result.type}
 </span>
 </button>
 </li>
 ))}
 </ul>
 )}

 {!query.trim() && (
 <div className="p-6 text-center text-sm text-neutral-500">
 <Search className="w-8 h-8 mx-auto mb-3 text-neutral-300 " />
 Start typing to search across your store.
 </div>
 )}
 </div>
 
 <div className="px-4 py-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
 <div className="flex gap-4">
 <span className="flex items-center gap-1"><kbd className="bg-white border rounded px-1.5 py-0.5">↑</kbd> <kbd className="bg-white border rounded px-1.5 py-0.5">↓</kbd> to navigate</span>
 <span className="flex items-center gap-1"><kbd className="bg-white border rounded px-1.5 py-0.5">Enter</kbd> to select</span>
 </div>
 <span><kbd className="bg-white border rounded px-1.5 py-0.5">ESC</kbd> to close</span>
 </div>
 </div>
 </div>
 );
};
