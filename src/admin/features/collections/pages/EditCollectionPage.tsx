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
      </div>
    );
  }

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
