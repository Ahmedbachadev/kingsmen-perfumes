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
