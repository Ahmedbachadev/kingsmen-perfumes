import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ShopifyProduct } from '../services/shopify/types';

export interface CartItemType extends ShopifyProduct {
  quantity: number;
}

interface CartContextType {
  isOpen: boolean;
  items: CartItemType[];
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: ShopifyProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItemType[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('kingsmen_cart');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kingsmen_cart', JSON.stringify(items));
  }, [items]);

  const toggleLenisEvent = useCallback((state: boolean) => {
    window.dispatchEvent(new CustomEvent('cart-toggled', { detail: { isOpen: state } }));
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
    toggleLenisEvent(true);
  }, [toggleLenisEvent]);

  const closeCart = useCallback(() => {
    setIsOpen(false);
    toggleLenisEvent(false);
  }, [toggleLenisEvent]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  const addToCart = (product: ShopifyProduct, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
    openCart(); // Auto-open cart on add
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = useCallback(() => {
    setItems([]);
<<<<<<< HEAD
=======
    localStorage.removeItem('kingsmen_cart');
>>>>>>> 3fef0dc (production ready version with admin panel)
  }, []);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        items,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
