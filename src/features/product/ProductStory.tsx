import { motion } from 'framer-motion';
import type { ShopifyProduct } from '../../services/shopify/types';

interface ProductStoryProps {
  product: ShopifyProduct;
}

export const ProductStory = ({ product }: ProductStoryProps) => {
  return (
    <section className="relative w-full py-32 lg:py-48 bg-[#0a0a0a] flex items-center justify-center">
      <div className="max-w-[1000px] mx-auto px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-2xl lg:text-5xl font-light text-white leading-[1.6] tracking-wide"
        >
          {product.description || "A deep, resonant fragrance capturing the stillness of dusk. Dark woods layered with subtle spice create an unforgettable trail."}
        </motion.p>
      </div>
    </section>
  );
};
