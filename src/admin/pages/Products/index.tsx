import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../features/products/hooks/useProducts';
import { ProductStats } from '../../features/products/components/ProductStats';
import { ProductToolbar } from '../../features/products/components/ProductToolbar';
import { ProductTable } from '../../features/products/components/ProductTable';

const ProductsPage: React.FC = () => {
  const {
    products,
    stats,
    totalCount,
    loading,
    statsLoading,
    error,
    
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    status,
    setStatus,
    
    removeProduct,
    refresh
  } = useProducts({ limit: 10 });

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/admin/products/new');
  };

  const handleEditProduct = (id: string) => {
    navigate(`/admin/products/${id}`);
  };

  const handleViewProduct = (id: string) => {
    alert(`View Product ${id} to be implemented`);
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setPage(1);
  };

  const isFilterActive = search !== '' || status !== 'all';

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Products</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage your fragrance catalogue, inventory, and pricing.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <ProductStats stats={stats} loading={statsLoading} />

      <div className="flex-1 flex flex-col">
        <ProductToolbar 
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          refresh={refresh}
          loading={loading}
          onAddProduct={handleAddProduct}
        />

        <div className="flex-1">
          <ProductTable 
            products={products}
            loading={loading}
            onDelete={removeProduct}
            onEdit={handleEditProduct}
            onView={handleViewProduct}
            onAddProduct={handleAddProduct}
            isFilterActive={isFilterActive}
            clearFilters={clearFilters}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
