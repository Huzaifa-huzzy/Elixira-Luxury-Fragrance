'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext, CartContext } from '@/context';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Master Class', href: '/shop?search=Master%20Class' },
  { label: 'Oud', href: '/shop?search=Oud' },
  { label: 'Gift Box', href: '/shop?search=Gift%20Box' },
  { label: 'Arabic', href: '/shop?search=Arabic' },
  { label: 'Loyalty', href: '/shop?search=Loyalty' },
  { label: 'Oriental', href: '/shop?search=Oriental' },
  { label: 'Stories', href: '/stories' },
  { label: 'Contact', href: '/contact' },
];

const accountLinks = [
  { label: 'Profile', href: '/profile' },
  { label: 'Orders', href: '/orders' },
];

export function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="site-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-charcoal text-2xl font-semibold text-ivory">E</div>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.3em] text-stone">Elixira</p>
            <p className="text-lg font-serif font-semibold text-charcoal">Luxury Fragrance</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-stone transition hover:text-charcoal">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                className="hidden items-center gap-2 rounded-full border border-charcoal bg-ivory px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-black/5 lg:inline-flex"
              >
                <span>Hi, {user.name.split(' ')[0]}</span>
                <span className="text-xs text-stone">Account</span>
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-3 w-[220px] space-y-2 rounded-3xl border border-black/10 bg-white p-3 shadow-lg">
                  {accountLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm text-charcoal transition hover:bg-black/5"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-2xl bg-charcoal px-4 py-3 text-sm font-medium text-ivory transition hover:bg-black"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden rounded-full border border-charcoal px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-ivory lg:inline-flex">
              Sign in
            </Link>
          )}

          <Link href="/cart" className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-ivory text-charcoal transition hover:bg-black/5">
            <span className="sr-only">View cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M6 6h15l-1.5 9h-12z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="21" r="1" fill="currentColor" />
              <circle cx="19" cy="21" r="1" fill="currentColor" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -right-1 top-0 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-semibold text-white">
                {cart.reduce((total, item) => total + item.qty, 0)}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-ivory text-charcoal transition hover:bg-black/5 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <div className="site-shell flex flex-col gap-4 py-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-stone">Elixira</p>
                <p className="text-lg font-serif font-semibold text-charcoal">Luxury Fragrance</p>
              </div>
              <button type="button" className="rounded-full bg-black/5 px-3 py-2 text-sm font-medium text-charcoal" onClick={() => setMenuOpen(false)}>
                Close
              </button>
            </div>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-black/5">
                  {link.label}
                </Link>
              ))}
            </div>
            {user ? (
              <div className="space-y-2">
                {accountLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-black/5">
                    {link.label}
                  </Link>
                ))}
                <button type="button" onClick={handleLogout} className="w-full rounded-2xl bg-charcoal px-4 py-3 text-sm font-medium text-ivory transition hover:bg-black">
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/login" className="block rounded-3xl border border-charcoal px-4 py-3 text-center text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-ivory">
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
