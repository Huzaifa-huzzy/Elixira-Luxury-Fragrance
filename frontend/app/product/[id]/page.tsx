import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchProductById } from '@/lib/api';
import { ProductDetailClient } from '@/components/ProductDetailClient';

interface ProductPageProps {
  params: { id: string };
}

async function getProduct(id: string) {
  try {
    const response = await fetchProductById(id);
    return response.data;
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <section className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="rounded-[2rem] border border-black/10 bg-white/90 p-6 shadow-luxe">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-slate-100">
            <Image src={product.images[0] || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'} alt={product.name} fill className="object-cover" />
          </div>
        </div>
        <div className="space-y-6 rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-stone">{product.category}</p>
            <h1 className="text-4xl font-serif font-semibold text-charcoal">{product.name}</h1>
            <p className="text-sm uppercase tracking-[0.24em] text-stone">{product.gender} · {product.fragranceType}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-ivory p-5 text-sm text-stone">
              <h2 className="font-semibold text-charcoal">Sillage</h2>
              <p className="mt-2">{product.sillage}</p>
            </div>
            <div className="rounded-3xl bg-ivory p-5 text-sm text-stone">
              <h2 className="font-semibold text-charcoal">Longevity</h2>
              <p className="mt-2">{product.lasting}</p>
            </div>
          </div>
          <div className="space-y-4 text-stone">
            <p className="text-lg font-semibold text-charcoal">${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <p className="text-sm text-stone/80">Ingredients: {product.ingredients || 'Proprietary blend'}</p>
          </div>
          <ProductDetailClient product={product} />
        </div>
      </div>
    </section>
  );
}
