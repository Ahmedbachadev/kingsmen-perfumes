<<<<<<< HEAD
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CollectionForm } from '../components/CollectionForm';
import { useCollection } from '../hooks/useCollection';
import { useUpdateCollection } from '../hooks/useUpdateCollection';

export const EditCollectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { collection, loading: fetchLoading, error: fetchError } = useCollection(id);
  const { updateCollection, loading: updateLoading, errors, serverError } = useUpdateCollection();

  const handleSubmit = async (data: any) => {
    if (!id) return false;
    const success = await updateCollection(id, data);
    return success;
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (fetchError || !collection) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-neutral-900">Collection not found</h3>
        <p className="mt-2 text-sm text-neutral-500">{fetchError}</p>
        <button
          onClick={() => navigate('/admin/collections')}
          className="mt-6 text-sm font-medium text-neutral-900 hover:underline"
        >
          Back to Collections
        </button>
=======
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { CollectionForm } from '../components/CollectionForm';
import { CollectionProductSelector } from '../components/CollectionProductSelector';
import { CollectionProductSorter } from '../components/CollectionProductSorter';
import { CollectionService, type CollectionUpdate } from '../services/collectionService';

export default function EditCollectionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<Partial<CollectionUpdate>>({});
  const [products, setProducts] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      
      try {
        const collectionData = await CollectionService.getCollection(id);
        setFormData(collectionData);
      } catch (colErr: any) {
        console.error('Failed to load collection details:', colErr);
        alert(`Collection error: ${colErr.message || JSON.stringify(colErr)}`);
        navigate('/admin/catalog/collections');
        return;
      }
      
      try {
        const productsData = await CollectionService.getCollectionProducts(id);
        setProducts(productsData);
      } catch (prodErr: any) {
        console.error('Failed to load collection products:', prodErr);
        // Do not crash the whole page if products fail to load
        setProducts([]);
        alert(`Products load error: ${prodErr.message || JSON.stringify(prodErr)}`);
      }
      
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.slug?.trim()) newErrors.slug = 'Slug is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!id || !validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setIsSaving(true);
      
      // Update collection info
      await CollectionService.updateCollection(id, formData);
      
      // Update products order
      if (products.length > 0) {
        await CollectionService.updateCollectionProductsOrder(products.map(p => p.id));
      }
      
      navigate('/admin/catalog/collections');
    } catch (error) {
      console.error('Failed to update collection:', error);
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (updates: Partial<CollectionUpdate>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    if (Object.keys(updates).some(k => errors[k])) {
      const newErrors = { ...errors };
      Object.keys(updates).forEach(k => delete newErrors[k]);
      setErrors(newErrors);
    }
  };

  const handleAddProducts = async (productIds: string[]) => {
    if (!id) return;
    await CollectionService.assignProductsToCollection(id, productIds);
    // Refresh products
    const productsData = await CollectionService.getCollectionProducts(id);
    setProducts(productsData);
  };

  const handleRemoveProduct = async (productId: string) => {
    await CollectionService.removeProductsFromCollection([productId]);
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleReorderProducts = (newOrder: any[]) => {
    setProducts(newOrder);
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
>>>>>>> 3fef0dc (production ready version with admin panel)
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/collections')}
          className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Edit Collection</h1>
          <p className="mt-1 text-sm text-neutral-500">Update collection details and manage products.</p>
        </div>
      </div>

      <CollectionForm
        initialData={collection}
        collectionId={id}
        onSubmit={handleSubmit}
        loading={updateLoading}
        errors={errors}
        serverError={serverError}
      />
    </div>
  );
};
=======
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/catalog/collections')}
            className="w-10 h-10 bg-white border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Collection</h1>
            <p className="text-slate-500 mt-1">{formData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/catalog/collections')}
            className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="xl:col-span-2 space-y-8">
          <CollectionForm 
            data={formData} 
            onChange={updateField} 
            errors={errors} 
          />
        </div>

        {/* Right Column - Products */}
        <div className="xl:col-span-1 space-y-8">
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sticky top-6">
            <h2 className="text-base font-semibold text-slate-900 mb-6 flex items-center justify-between">
              Products
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                {products.length} assigned
              </span>
            </h2>
            
            <div className="space-y-6">
              <CollectionProductSelector
                collectionId={id!}
                existingProductIds={products.map(p => p.id)}
                onAddProducts={handleAddProducts}
              />
              
              <div className="border-t border-slate-100"></div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-4">Assigned Products (Drag to reorder)</p>
                <CollectionProductSorter 
                  products={products} 
                  onReorder={handleReorderProducts}
                  onRemove={handleRemoveProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 3fef0dc (production ready version with admin panel)
