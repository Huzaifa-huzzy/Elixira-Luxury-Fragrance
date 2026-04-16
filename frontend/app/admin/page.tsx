'use client';

import Link from 'next/link';

export default function AdminPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
        <p className="text-sm uppercase tracking-[0.28em] text-stone">Admin hub</p>
        <h1 className="mt-3 text-3xl font-serif font-semibold text-charcoal">Manage products and orders</h1>
        <p className="mt-3 text-sm leading-7 text-stone">Use this page to add new fragrances, update inventory, and review order fulfillment status.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Link href="/admin/products" className="rounded-[1.75rem] border border-black/10 bg-white/90 p-8 shadow-luxe transition hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-charcoal">Product management</h2>
          <p className="mt-3 text-sm text-stone">Create, edit, and remove products for the premium fragrance catalog.</p>
        </Link>
        <Link href="/orders" className="rounded-[1.75rem] border border-black/10 bg-white/90 p-8 shadow-luxe transition hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-charcoal">Order overview</h2>
          <p className="mt-3 text-sm text-stone">Review customer orders, payment status, and delivery updates.</p>
        </Link>
      </div>
    </section>
  );
}
