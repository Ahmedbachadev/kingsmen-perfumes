<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CollectionForm } from '../components/CollectionForm';
import { useCreateCollection } from '../hooks/useCreateCollection';

export const AddCollectionPage = () => {
  const navigate = useNavigate();
  const { createCollection, loading, errors, serverError } = useCreateCollection();

  const handleSubmit = async (data: any) => {
    const success = await createCollection(data);
    if (success) {
      navigate('/admin/collections');
    }
    return success;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/collections')}
          className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Add Collection</h1>
          <p className="mt-1 text-sm text-neutral-500">Create a new product collection.</p>
        </div>
      </div>

      <CollectionForm
        onSubmit={handleSubmit}
        loading={loading}
        errors={errors}
        serverError={serverError}
      />
    </div>
  );
};
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { CollectionForm } from '../components/CollectionForm';
import { CollectionService, type CollectionInsert } from '../services/collectionService';

export default function AddCollectionPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<CollectionInsert>>({
    name: '',
    slug: '',
    status: 'draft',
    is_featured: false,
    image_url: null,
    banner_image_url: null,
    short_description: '',
    description: '',
    seo_title: '',
    seo_description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.slug?.trim()) newErrors.slug = 'Slug is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setIsSubmitting(true);
      const newCollection = await CollectionService.createCollection(formData as CollectionInsert);
      // Redirect to edit page to allow adding products
      navigate(`/admin/catalog/collections/${newCollection.id}`);
    } catch (error) {
      console.error('Failed to create collection:', error);
      alert('Failed to create collection. Make sure the slug is unique.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (updates: Partial<CollectionInsert>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    
    // Clear error for the field being updated
    if (Object.keys(updates).some(k => errors[k])) {
      const newErrors = { ...errors };
      Object.keys(updates).forEach(k => delete newErrors[k]);
      setErrors(newErrors);
    }
  };

  return (
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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Collection</h1>
            <p className="text-slate-500 mt-1">Add a new product collection</p>
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
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Save Collection'}
          </button>
        </div>
      </div>

      <CollectionForm 
        data={formData} 
        onChange={updateField} 
        errors={errors} 
      />
    </div>
  );
}
>>>>>>> 3fef0dc (production ready version with admin panel)
