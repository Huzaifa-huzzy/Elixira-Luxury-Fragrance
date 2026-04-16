'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { AuthContext, CartContext } from '@/context';

export function Providers({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [cart, setCart] = useState<Array<{ id: string; name: string; image: string; price: number; qty: number }>>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('elixiraToken');
    if (storedToken) setToken(storedToken);
    const storedUser = localStorage.getItem('elixiraUser');
    if (storedUser) setUser(JSON.parse(storedUser));
    const storedCart = localStorage.getItem('elixiraCart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('elixiraCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('elixiraToken', token);
    } else {
      localStorage.removeItem('elixiraToken');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('elixiraUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('elixiraUser');
    }
  }, [user]);

  const authState = useMemo(
    () => ({ token, user, setToken, setUser, logout: () => { setToken(null); setUser(null); setCart([]); } }),
    [token, user]
  );

  const cartState = useMemo(
    () => ({ cart, setCart }),
    [cart]
  );

  return (
    <AuthContext.Provider value={authState}>
      <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
    </AuthContext.Provider>
  );
}
