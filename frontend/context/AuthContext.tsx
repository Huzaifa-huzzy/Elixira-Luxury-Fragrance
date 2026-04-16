'use client';

import { createContext } from 'react';

interface AuthContextValue {
  token: string | null;
  user: { name: string; email: string; role: string } | null;
  setToken: (token: string | null) => void;
  setUser: (user: { name: string; email: string; role: string } | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {},
});
