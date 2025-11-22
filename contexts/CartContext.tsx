import { CartItem, Coffee, CoffeeSize } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CART_STORAGE_KEY = 'coffee_cart';

type CartContextType = {
  cart: CartItem[];
  addToCart: (coffee: Coffee, size: CoffeeSize, quantity?: number) => void;
  removeFromCart: (coffeeId: string, size: CoffeeSize) => void;
  updateQuantity: (coffeeId: string, size: CoffeeSize, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from AsyncStorage initially
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const saveCartMutation = useMutation({
    mutationFn: async (newCart: CartItem[]) => {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
      return newCart;
    },
  });

  // Add to cart
  const addToCart = useCallback((coffee: Coffee, size: CoffeeSize, quantity: number = 1) => {
    const sizeInfo = coffee.sizes.find((s) => s.size === size);
    if (!sizeInfo) return;

    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (item) => item.coffee.id === coffee.id && item.size === size
      );

      let newCart: CartItem[];
      if (existingIndex > -1) {
        newCart = [...currentCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
      } else {
        newCart = [
          ...currentCart,
          {
            coffee,
            size,
            quantity,
            price: sizeInfo.price,
          },
        ];
      }

      saveCartMutation.mutate(newCart);
      return newCart;
    });
  }, [saveCartMutation]);

  // Remove from cart
  const removeFromCart = useCallback((coffeeId: string, size: CoffeeSize) => {
    setCart((currentCart) => {
      const newCart = currentCart.filter(
        (item) => !(item.coffee.id === coffeeId && item.size === size)
      );
      saveCartMutation.mutate(newCart);
      return newCart;
    });
  }, [saveCartMutation]);

  // Update quantity
  const updateQuantity = useCallback((coffeeId: string, size: CoffeeSize, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(coffeeId, size);
      return;
    }

    setCart((currentCart) => {
      const newCart = currentCart.map((item) =>
        item.coffee.id === coffeeId && item.size === size ? { ...item, quantity } : item
      );
      saveCartMutation.mutate(newCart);
      return newCart;
    });
  }, [removeFromCart, saveCartMutation]);

  const clearCart = useCallback(() => {
    setCart([]);
    saveCartMutation.mutate([]);
  }, [saveCartMutation]);

  // Initialize cart from AsyncStorage once
  useEffect(() => {
    if (cartQuery.data && cart.length === 0 && cartQuery.data.length > 0) {
      setCart(cartQuery.data);
    }
  }, [cartQuery.data, cart.length]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const value: CartContextType = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isLoading: cartQuery.isLoading,
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount, cartQuery.isLoading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
