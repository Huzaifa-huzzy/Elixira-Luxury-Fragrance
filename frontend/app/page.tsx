 'use client';

import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { HomeFeatureCard } from '@/components/HomeFeatureCard';
import { fetcher } from '@/lib/api';

const categoryCards = [
  {
    title: 'For Him',
    href: '/shop?gender=Men',
    image:
      'https://images.unsplash.com/photo-1595425964078-6b9a4e6e1f91?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'For Her',
    href: '/shop?gender=Women',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Unisex',
    href: '/shop?gender=Unisex',
    image:
      'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1200&q=80',
  },
];

const dealCards = [
  {
    title: 'Fresh Citrus Drop',
    subtitle: 'Up to 30% off selected summer picks',
    href: '/shop?type=Citrus',
    image:
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Night Oud Edit',
    subtitle: 'Long-lasting profiles for evening wear',
    href: '/shop?type=Oud',
    image:
      'https://images.unsplash.com/photo-1615634262417-f7f49cbf69de?auto=format&fit=crop&w=1200&q=80',
  },
];

const fragranceNoteCards = [
  {
    title: 'Woody',
    subtitle: 'Warm, deep, and elegant for all-day confidence.',
    href: '/shop?type=Woody',
    image:
      'https://images.unsplash.com/photo-1633879815563-3e4d7f2ba3a7?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Oriental',
    subtitle: 'Rich spices and amber tones for statement evenings.',
    href: '/shop?type=Oriental',
    image:
      'https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Fresh',
    subtitle: 'Crisp citrus and aquatic accords for daily wear.',
    href: '/shop?type=Fresh',
    image:
      'https://images.unsplash.com/photo-1512777576244-b846ac3d816f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const blogCards = [
  {
    title: 'Best citrus perfumes for summer wear',
    href: '/stories',
  },
  {
    title: 'How to choose between EDP and EDT',
    href: '/stories',
  },
  {
    title: '5 gifting scents that always impress',
    href: '/stories',
  },
];

const categoryTabs = [
  { label: 'Loyalty', value: 'Loyalty' },
  { label: 'Gift Box', value: 'Gift Box' },
  { label: 'Oud', value: 'Oud' },
];

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  type: string;
  range?: string;
  description?: string;
}

export default function HomePage() {
  const { data, isLoading } = useSWR('/products?pageNumber=1&pageSize=1000', fetcher);
  const [activeCategory, setActiveCategory] = useState('Loyalty');
  const [slideIndex, setSlideIndex] = useState(0);

  const productArray = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data as Product[];
    if (Array.isArray(data.products)) return data.products as Product[];
    return [];
  }, [data]);

  const categoryProducts = useMemo(() => {
    const normalize = (value: string) => value.toLowerCase().replace(/[\s-]/g, '');
    const hasAny = (text: string, keywords: string[]) =>
      keywords.some((keyword) => text.includes(keyword));

    const keywordsByCategory: Record<string, string[]> = {
      Loyalty: ['loyalty', 'under1500', 'budget', 'daily'],
      'Gift Box': ['giftbox', 'gift', 'giftset', 'box', 'bundle'],
      Oud: ['oud', 'oudh'],
    };

    const keywords = keywordsByCategory[activeCategory] || [normalize(activeCategory)];

    const matched = productArray.filter((product) => {
      const searchable = normalize(
        [
          product.category || '',
          product.type || '',
          product.range || '',
          product.name || '',
          product.description || '',
        ].join(' '),
      );
      return hasAny(searchable, keywords);
    });

    if (matched.length > 0) return matched;

    // Fallbacks so each tab always shows real DB products.
    if (activeCategory === 'Loyalty') {
      return [...productArray].sort((a, b) => a.price - b.price);
    }
    if (activeCategory === 'Gift Box') {
      return [...productArray]
        .filter((item) => item.images?.length > 0)
        .sort((a, b) => b.price - a.price);
    }
    if (activeCategory === 'Oud') {
      return [...productArray]
        .sort((a, b) => b.price - a.price)
        .filter((item) => (item.type || '').length > 0);
    }
    return productArray;
  }, [activeCategory, productArray]);

  const visibleSlides = 4;
  const maxSlideIndex = Math.max(0, categoryProducts.length - visibleSlides);
  const shownProducts = categoryProducts.slice(slideIndex, slideIndex + visibleSlides);

  return (
    <section className="space-y-14 py-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-charcoal shadow-luxe">
        <Image
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=80"
          alt="Fragrance hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6 text-white">
            <p className="text-xs uppercase tracking-[0.38em] text-[#d8b982]">
              Premium E-Commerce Fragrance House
            </p>
            <h1 className="max-w-2xl text-4xl font-serif font-semibold leading-tight sm:text-5xl">
              Find your signature scent with a modern, luxury shopping experience.
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Discover curated perfumes, best-selling impressions, and elegant gift
              options with fast checkout, trusted delivery, and real customer
              reviews.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-ivory"
              >
                Shop now
              </Link>
              <Link
                href="/collections"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse collections
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-white/85 sm:text-sm">
              <span className="rounded-full border border-white/20 px-3 py-1.5">
                Free shipping over Rs.5,000
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1.5">
                Secure payment
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1.5">
                Premium quality
              </span>
            </div>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-[1.6rem] border border-white/20 bg-black/30 shadow-xl backdrop-blur-sm">
            <Image
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury fragrance showcase"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.24em] text-[#d8b982]">
                Featured this week
              </p>
              <p className="mt-2 text-xl font-semibold">Signature Oud Reserve</p>
              <p className="mt-1 text-sm text-white/80">
                Bold, warm, and long-lasting for evening wear.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-charcoal">Shop by category</h2>
          <Link href="/shop" className="text-sm font-medium text-charcoal hover:underline">
            View all
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                setActiveCategory(tab.value);
                setSlideIndex(0);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === tab.value
                  ? 'bg-charcoal text-ivory'
                  : 'border border-black/10 bg-white text-charcoal hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="rounded-[1.4rem] border border-black/10 bg-white/90 p-4 shadow-luxe">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-stone">
              {isLoading
                ? 'Loading products...'
                : `${categoryProducts.length} products in ${activeCategory}`}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => Math.max(prev - 1, 0))}
                disabled={slideIndex === 0}
                className="rounded-full border border-black/10 bg-ivory px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => Math.min(prev + 1, maxSlideIndex))}
                disabled={slideIndex >= maxSlideIndex}
                className="rounded-full border border-black/10 bg-ivory px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="overflow-hidden rounded-xl border border-black/10 bg-white p-3">
                  <div className="h-40 animate-pulse rounded-lg bg-gray-200" />
                  <div className="mt-3 h-4 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : shownProducts.length === 0 ? (
            <div className="rounded-xl bg-ivory p-6 text-center text-sm text-stone">
              {activeCategory} category ke products database me nahi mile.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {shownProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="group overflow-hidden rounded-xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <Image
                      src={
                        product.images?.[0] ||
                        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80'
                      }
                      alt={product.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1 p-3">
                    <p className="line-clamp-2 text-sm font-semibold text-charcoal">{product.name}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-stone">{product.category}</p>
                    <p className="text-sm font-semibold text-charcoal">Rs.{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {dealCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative h-52 overflow-hidden rounded-[1.5rem] border border-black/10 bg-charcoal shadow-luxe"
          >
            <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-sm flex-col justify-center p-6 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-[#d8b982]">
                Limited offer
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-white/80">{card.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <HomeFeatureCard title="Fine curation" description="Deep filter controls by category, style, longevity, and audience." />
        <HomeFeatureCard title="Secure checkout" description="Smooth payment flow with trusted security and order confidence." />
        <HomeFeatureCard title="Fast delivery" description="Reliable shipping and responsive support for every order." />
      </div>

      <div className="rounded-[1.8rem] border border-black/10 bg-white/90 p-6 shadow-luxe">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-ivory p-4 text-center">
            <p className="text-lg font-semibold text-charcoal">50,000+</p>
            <p className="text-xs uppercase tracking-[0.2em] text-stone">Happy Customers</p>
          </div>
          <div className="rounded-2xl bg-ivory p-4 text-center">
            <p className="text-lg font-semibold text-charcoal">24h</p>
            <p className="text-xs uppercase tracking-[0.2em] text-stone">Fast Dispatch</p>
          </div>
          <div className="rounded-2xl bg-ivory p-4 text-center">
            <p className="text-lg font-semibold text-charcoal">Premium</p>
            <p className="text-xs uppercase tracking-[0.2em] text-stone">Quality Control</p>
          </div>
          <div className="rounded-2xl bg-ivory p-4 text-center">
            <p className="text-lg font-semibold text-charcoal">Secure</p>
            <p className="text-xs uppercase tracking-[0.2em] text-stone">Payments</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-charcoal">Fragrance Notes</h2>
          <Link href="/shop" className="text-sm font-medium text-charcoal hover:underline">
            Explore all notes
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {fragranceNoteCards.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative h-[350px] overflow-hidden rounded-[1.6rem] border border-black/10 bg-charcoal shadow-luxe"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition group-hover:from-black/90 group-hover:via-black/45 group-hover:to-black/20" />
              <div className="absolute inset-0 border border-white/10 opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[2rem] font-semibold leading-none tracking-tight">{item.title}</p>
                <p className="mt-3 max-w-[90%] text-sm leading-6 text-white/85">{item.subtitle}</p>
                <span className="mt-4 inline-flex rounded-full border border-white/35 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  Discover
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.6rem] border border-black/10 bg-white/90 p-6 shadow-luxe">
          <p className="text-xs uppercase tracking-[0.24em] text-stone">Customer reviews</p>
          <h3 className="mt-2 text-2xl font-semibold text-charcoal">What shoppers say</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-ivory p-4 text-sm text-stone">
              "Packaging and scent quality exceeded expectations. Delivery was very fast."
            </div>
            <div className="rounded-2xl bg-ivory p-4 text-sm text-stone">
              "Found my daily fragrance in one visit. Smooth checkout and great support."
            </div>
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-black/10 bg-charcoal p-6 text-white shadow-luxe">
          <p className="text-xs uppercase tracking-[0.24em] text-[#d8b982]">Insights</p>
          <h3 className="mt-2 text-2xl font-semibold">From our blog</h3>
          <div className="mt-4 space-y-3">
            {blogCards.map((blog) => (
              <Link key={blog.title} href={blog.href} className="block rounded-xl border border-white/15 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10">
                {blog.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone">
              Ready to elevate your collection?
            </p>
            <h3 className="mt-3 text-3xl font-serif font-semibold text-charcoal">
              Start exploring bestselling fragrances today.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone">
              Browse premium picks, compare notes, and find your next everyday
              signature in minutes.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-ivory transition hover:bg-black"
          >
            Go to shop
          </Link>
        </div>
      </div>
    </section>
  );
}
