'use client';

import { useEffect, useState } from 'react';
import { productFetcher } from '@/lib/productsApi';
import api from '@/lib/productsApi';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', category: '', stock: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    productFetcher('/products').then((data) => {
      setProducts(data.products ?? []);
      setLoading(false);
    }).catch(() => {
      setMessage('Could not load admin products.');
      setLoading(false);
    });
  }, []);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post('/products', {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        gender: 'Unisex',
        fragranceType: 'Luxury',
        description: 'An exquisite fragrance.',
        images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'],
        stock: Number(form.stock),
      });
      setProducts((current) => [response.data, ...current]);
      setForm({ name: '', price: '', category: '', stock: '' });
      setMessage('Product created successfully.');
    } catch {
      setMessage('Unable to create product.');
    }
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
        <p className="text-sm uppercase tracking-[0.28em] text-stone">Admin products</p>
        <h1 className="mt-3 text-3xl font-serif font-semibold text-charcoal">Catalog control</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <form onSubmit={handleAdd} className="space-y-5 rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
          <h2 className="text-xl font-semibold text-charcoal">Add new product</h2>
          <div>
            <label className="mb-2 block text-sm font-medium text-charcoal">Name</label>
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Price</label>
              <input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} required type="number" className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Stock</label>
              <input value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} required type="number" className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-charcoal">Category</label>
            <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
          </div>
          {message && <p className="rounded-3xl bg-ivory p-4 text-sm text-charcoal">{message}</p>}
          <button type="submit" className="rounded-full bg-charcoal px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-ivory transition hover:bg-black">Create product</button>
        </form>
        <div className="space-y-5">
          <h2 className="text-xl font-semibold text-charcoal">Live products</h2>
          {loading ? (
            <div className="rounded-[1.75rem] border border-black/10 bg-white/90 p-6 shadow-sm">Loading product list…</div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product._id} className="rounded-3xl border border-black/10 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4 text-sm text-stone">
                    <div>
                      <p className="font-semibold text-charcoal">{product.name}</p>
                      <p>{product.category}</p>
                    </div>
                    <p>${product.price.toFixed(2)}</p>
                    <p>{product.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
