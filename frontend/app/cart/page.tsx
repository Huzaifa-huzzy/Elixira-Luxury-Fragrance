'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '@/context';
import { CartItem } from '@/components/CartItem';
import { OrderSummary } from '@/components/OrderSummary';

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);

  const handleQuantityChange = (id: string, qty: number) => {
    if (qty < 1) return;
    setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const handleRemove = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = cart.length > 0 ? 12.0 : 0;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = subtotal + shipping + tax;

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
        <h1 className="text-3xl font-serif font-semibold text-charcoal">Your cart</h1>
        <p className="mt-3 text-sm text-stone">Review your selections, update quantities, and proceed to checkout securely.</p>
      </div>
      {cart.length === 0 ? (
        <div className="rounded-[2rem] border border-black/10 bg-white/90 p-10 text-center shadow-luxe">
          <p className="text-sm text-stone">Your cart is empty.</p>
          <Link href="/shop" className="mt-6 inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-black">
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
          <div className="space-y-5">
            {cart.map((item) => (
              <CartItem key={item.id} {...item} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
            ))}
          </div>
          <div className="space-y-6">
            <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
            <Link href="/checkout" className="block rounded-full bg-charcoal px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-ivory transition hover:bg-black">
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
