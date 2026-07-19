import { useProducts } from '../hooks/useProducts';

export default function DebugProductsPage() {
  const { products, loading, error, refetch } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>Debug Products</h1>
      <button onClick={refetch} style={{ border: '1px solid white', padding: '8px', marginBottom: '20px' }}>Refetch</button>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
