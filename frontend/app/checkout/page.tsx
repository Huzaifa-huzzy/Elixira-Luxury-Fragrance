'use client';

import { useContext, useMemo, useState } from 'react';
import { CartContext, AuthContext } from '@/context';
import { createOrder, fetchPaymentIntent } from '@/lib/api';
import { CustomDropdown } from '@/components/CustomDropdown';

export default function CheckoutPage() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [status, setStatus] = useState('');

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const shipping = cart.length > 0 ? 12.0 : 0;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = subtotal + shipping + tax;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      setStatus('Please login before checking out.');
      return;
    }

    try {
      setStatus('Creating payment session…');
      await fetchPaymentIntent({ amount: Math.round(total * 100) });
      await createOrder({ orderItems: cart, shippingAddress: { address, city, postalCode, country }, paymentMethod, shippingPrice: shipping, taxPrice: tax, totalPrice: total });
      setCart([]);
      setStatus('Order placed. Redirecting to order history…');
    } catch (err) {
      setStatus('Unable to place the order. Please try again later.');
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8 rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-stone">Secure checkout</p>
        <h1 className="text-3xl font-serif font-semibold text-charcoal">Complete your purchase</h1>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Address</label>
              <input value={address} onChange={(event) => setAddress(event.target.value)} required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">City</label>
              <input value={city} onChange={(event) => setCity(event.target.value)} required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Postal code</label>
              <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)} required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Country</label>
              <input value={country} onChange={(event) => setCountry(event.target.value)} required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-charcoal">Payment method</label>
            <CustomDropdown
              value={paymentMethod}
              placeholder="Select payment method"
              options={[{ label: 'Stripe', value: 'Stripe' }]}
              onChange={(value) => setPaymentMethod(value || 'Stripe')}
              allowClear={false}
            />
          </div>
          <button type="submit" className="w-full rounded-full bg-charcoal px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-ivory transition hover:bg-black">
            Pay ${total.toFixed(2)}
          </button>
        </div>
        <div className="rounded-[1.75rem] border border-black/10 bg-ivory p-6 text-sm text-stone shadow-sm">
          <p className="mb-4 text-base font-semibold text-charcoal">Order summary</p>
          <div className="space-y-3">
            <div className="flex justify-between"><span>Items</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="mt-3 flex justify-between border-t border-black/10 pt-4 font-semibold text-charcoal"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <p className="mt-6 text-sm leading-6 text-stone">An encrypted Stripe session will handle payment details securely.</p>
          {status && <p className="mt-4 rounded-3xl bg-white p-4 text-sm text-charcoal">{status}</p>}
        </div>
      </form>
    </section>
  );
}
