import React from 'react';
import { Package, Search, Plus, Filter } from 'lucide-react';

export default function InventoryReportsPage() {
 return (
 <div className="p-6">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
 <div>
 <h1 className="text-2xl font-bold text-neutral-900 ">InventoryReports</h1>
 <p className="text-sm text-neutral-500 mt-1">Manage your inventoryreports.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors">
 <Plus className="w-4 h-4" />
 <span>Create New</span>
 </button>
 </div>

 <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
 <div className="p-4 border-b border-neutral-200 flex flex-col sm:flex-row gap-4 justify-between">
 <div className="relative flex-1 max-w-md">
 <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
 <input 
 type="text" 
 placeholder="Search..." 
 className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-none rounded-lg focus:ring-2 focus:ring-neutral-900 text-sm"
 />
 </div>
 <button className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700 ">
 <Filter className="w-4 h-4" />
 <span>Filters</span>
 </button>
 </div>
 
 <div className="p-12 flex flex-col items-center justify-center text-center">
 <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
 <Package className="w-8 h-8 text-neutral-400" />
 </div>
 <h3 className="text-lg font-medium text-neutral-900 mb-2">No data yet</h3>
 <p className="text-sm text-neutral-500 max-w-sm">
 This module has been scaffolded for InventoryReports. Full CRUD functionality will be implemented soon.
 </p>
 </div>
 </div>
 </div>
 );
}
