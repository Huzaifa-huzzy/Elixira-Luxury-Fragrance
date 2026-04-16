import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  numReviews: number;
  image: string;
  category: string;
}

export function ProductCard({ id, name, price, rating, numReviews, image, category }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-luxe transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-80 overflow-hidden bg-slate-100">
        <Image src={image} alt={name} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-6">
        <span className="text-xs uppercase tracking-[0.28em] text-stone">{category}</span>
        <h2 className="text-xl font-semibold text-charcoal">{name}</h2>
        <div className="flex items-center justify-between text-sm text-stone">
          <p>{rating.toFixed(1)} ★</p>
          <p>{numReviews} reviews</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-charcoal">${price.toFixed(2)}</p>
          <Link href={`/product/${id}`} className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ivory transition hover:bg-black">
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
