'use client';

import { createContext } from 'react';

export type CartProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
};

interface CartContextValue {
  cart: CartProduct[];
  setCart: (cart: CartProduct[]) => void;
}

export const CartContext = createContext<CartContextValue>({
  cart: [],
  setCart: () => {},
});
