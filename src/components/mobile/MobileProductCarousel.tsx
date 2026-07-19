import { MobileCollectionCard } from './MobileCollectionCard';
import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

export const MobileProductCarousel = () => {
  const { products, loading } = useProducts();
  // Filter or take a subset for the carousel. For demo, we take the first 4 products.
  const carouselProducts = products.slice(0, 4); 
  
  if (loading && products.length === 0) return null;

  return (
    <div className="w-full flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 gap-5 pb-8 pt-4">
      {carouselProducts.map(p => (
        <div key={p.id} className="snap-center flex-shrink-0">
          <Link to={`/products/${p.handle}`}>
            <MobileCollectionCard product={p} />
          </Link>
        </div>
      ))}
    </div>
  );
};
