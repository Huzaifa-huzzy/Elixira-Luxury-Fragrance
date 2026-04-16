'use client';

import { useEffect, useState } from 'react';
import { fetchMyOrders } from '@/lib/api';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyOrders()
      .then((response) => setOrders(response.data))
      .catch(() => setError('Unable to load order history.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
        <p className="text-sm uppercase tracking-[0.28em] text-stone">Order history</p>
        <h1 className="mt-3 text-3xl font-serif font-semibold text-charcoal">Recent purchases</h1>
      </div>
      {loading ? (
        <div className="rounded-[2rem] border border-black/10 bg-white/90 p-10 text-center shadow-luxe">Loading orders…</div>
      ) : error ? (
        <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center text-red-700 shadow-luxe">{error}</div>
      ) : orders.length === 0 ? (
        <div className="rounded-[2rem] border border-black/10 bg-white/90 p-10 text-center shadow-luxe">
          <p className="text-sm text-stone">No orders yet. Start with a luxury scent from the shop.</p>
          <Link href="/shop" className="mt-6 inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-black">
            Browse fragrances
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="rounded-[1.75rem] border border-black/10 bg-white/90 p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-stone">Order {order._id}</p>
                  <p className="mt-2 text-lg font-semibold text-charcoal">Total ${order.totalPrice.toFixed(2)}</p>
                </div>
                <div className="space-y-1 text-sm text-stone">
                  <p>{order.isPaid ? 'Paid' : 'Pending payment'}</p>
                  <p>{order.isDelivered ? 'Delivered' : 'Processing'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
