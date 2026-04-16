'use client';

import { useContext, useState } from 'react';
import { CartContext } from '@/context';
import { useRouter } from 'next/navigation';

interface ProductDetailClientProps {
  product: any;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { cart, setCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addToCart = () => {
    const updated = [...cart];
    const index = updated.findIndex((item) => item.id === product._id);
    if (index >= 0) {
      updated[index].qty += qty;
    } else {
      updated.push({ id: product._id, name: product.name, image: product.images[0], price: product.price, qty });
    }
    setCart(updated);
    router.push('/cart');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-charcoal">Quantity</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(event) => setQty(Number(event.target.value))}
          className="w-24 rounded-3xl border border-black/10 bg-ivory px-4 py-3 text-sm text-charcoal outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <button onClick={addToCart} className="rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-ivory transition hover:bg-black">
          Add to cart
        </button>
        <button className="rounded-full border border-charcoal px-7 py-3 text-sm font-semibold text-charcoal transition hover:bg-charcoal hover:text-ivory">
          Buy now
        </button>
      </div>
      <div className="rounded-3xl bg-ivory p-5 text-sm text-stone">
        <p className="font-medium text-charcoal">Need assistance?</p>
        <p className="mt-2">Login to leave a review and complete checkout with your saved profile details.</p>
      </div>
    </div>
  );
}
