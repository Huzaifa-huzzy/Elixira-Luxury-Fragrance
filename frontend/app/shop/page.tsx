"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { productFetcher } from "@/lib/productsApi";
import { CustomDropdown } from "@/components/CustomDropdown";

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  numReviews: number;
  images: string[];
  category: string;
  gender: string;
  range: string;
  genre: string;
  type: string;
  season: string;
  sillage: string;
  lasting: string;
  fragranceType: string;
  stock: number;
  description: string;
}

const sortOptions = [
  { label: "Newest arrivals", value: "newest" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Top rated", value: "ratingDesc" },
  { label: "Most reviewed", value: "reviewsDesc" },
];

const noteGroups = ["Floral", "Woody", "Citrus", "Oriental", "Fresh", "Green"];
const concentrationOptions = ["EDP", "EDT", "Parfum", "Vial"];
const longevityOptions = ["Upto 7 hrs", "Upto 12 hrs", "Upto 24 hrs"];
const perPageOptions = [12, 24, 48];
const sizeChips = ["30ML", "50ML", "100ML"];
const API_PAGE_SIZE = 1000;

function getStockLabel(stock: number) {
  if (stock === 0) return "Out of stock";
  if (stock <= 5) return "Only a few left";
  if (stock <= 12) return "Low stock";
  return "In stock";
}

function getStockBadge(stock: number) {
  if (stock === 0) return "bg-red-100 text-red-700";
  if (stock <= 5) return "bg-amber-100 text-amber-800";
  return "bg-emerald-100 text-emerald-800";
}

function renderStars(rating: number) {
  const filledStars = Math.max(0, Math.min(5, Math.round(rating)));
  return Array.from({ length: 5 }).map((_, index) =>
    index < filledStars ? "*" : "o",
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useSWR(
    `/products?pageNumber=1&pageSize=${API_PAGE_SIZE}`,
    productFetcher,
  );

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const [note, setNote] = useState("");
  const [concentration, setConcentration] = useState("");
  const [longevity, setLongevity] = useState("");
  const [availability, setAvailability] = useState("");
  const [sort, setSort] = useState("newest");
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const productArray = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data as Product[];
    if (Array.isArray(data.products)) return data.products as Product[];
    return [];
  }, [data]);

  const categories = useMemo(() => Array.from(new Set(productArray.map((item) => item.category))).sort(), [productArray]);
  const brands = useMemo(() => Array.from(new Set(productArray.map((item) => item.genre))).sort(), [productArray]);

  const filteredProducts = useMemo(() => {
    return productArray
      .filter((product) => {
        const searchableText = [product.name, product.category, product.type, product.genre, product.description].join(" ").toLowerCase();
        const matchesSearch = searchableText.includes(search.toLowerCase());
        const matchesCategory = category ? product.category === category : true;
        const matchesBrand = brand ? product.genre === brand : true;
        const matchesGender = gender ? product.gender === gender : true;
        const matchesNote = note ? product.type === note : true;
        const matchesConcentration = concentration ? product.fragranceType === concentration : true;
        const matchesLongevity = longevity ? product.lasting === longevity : true;
        const matchesAvailability = availability
          ? availability === "In stock"
            ? product.stock > 12
            : availability === "Low stock"
              ? product.stock > 0 && product.stock <= 12
              : product.stock === 0
          : true;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesBrand &&
          matchesGender &&
          matchesNote &&
          matchesConcentration &&
          matchesLongevity &&
          matchesAvailability
        );
      })
      .sort((a, b) => {
        if (sort === "priceAsc") return a.price - b.price;
        if (sort === "priceDesc") return b.price - a.price;
        if (sort === "ratingDesc") return b.rating - a.rating;
        if (sort === "reviewsDesc") return b.numReviews - a.numReviews;
        return 0;
      });
  }, [availability, brand, category, concentration, gender, longevity, note, productArray, search, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, brand, gender, note, concentration, longevity, availability, sort, productsPerPage]);

  const totalProducts = filteredProducts.length;
  const pageCount = Math.max(1, Math.ceil(totalProducts / productsPerPage));
  const pageProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const toggleWishlist = (id: string) => {
    setWishlist((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const clearAllFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setGender("");
    setNote("");
    setConcentration("");
    setLongevity("");
    setAvailability("");
    setSort("newest");
    setMobileFiltersOpen(false);
  };

  useEffect(() => {
    const typeParam = searchParams.get("type") || "";
    const genderParam = searchParams.get("gender") || "";
    const categoryParam = searchParams.get("category") || "";
    const brandParam = searchParams.get("brand") || "";
    const searchParam = searchParams.get("search") || "";

    setNote(typeParam);
    setGender(genderParam);
    setCategory(categoryParam);
    setBrand(brandParam);
    setSearch(searchParam);
  }, [searchParams]);

  if (isLoading) {
    return <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-luxe">Loading products...</section>;
  }

  if (error) {
    const message = error instanceof Error ? error.message : "Unable to load products";
    return (
      <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-luxe">
        <p className="text-sm font-semibold text-charcoal">Products load failed</p>
        <p className="mt-2 text-sm leading-7 text-stone">
          {message}. Try opening <a className="font-medium text-charcoal underline" href="/api/products">/api/products</a> to see the API response.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-8 pb-10">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-charcoal p-8 text-white shadow-luxe md:p-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c8a165]">
            Curated Signature Scents
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-serif font-semibold leading-tight md:text-5xl">
            Discover premium fragrances crafted for every mood and moment.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
            Shop top impressions and modern classics with verified ratings, rich
            scent notes, and powerful filtering.
          </p>
        </div>
      </div>

      <div className="grid gap-7 xl:grid-cols-[300px_1fr]">
        <aside className="hidden space-y-4 xl:sticky xl:top-24 xl:self-start xl:block">
          <div className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-luxe">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-stone">Filters</h2>
              <button type="button" onClick={clearAllFilters} className="text-xs font-medium text-charcoal hover:underline">Reset</button>
            </div>
            <div className="mt-4 space-y-4">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" className="w-full rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm outline-none transition focus:border-charcoal" />
              <CustomDropdown
                label="Category"
                value={category}
                placeholder="All categories"
                options={categories.map((item) => ({ label: item, value: item }))}
                onChange={setCategory}
              />
              <CustomDropdown
                label="Brand"
                value={brand}
                placeholder="All brands"
                options={brands.map((item) => ({ label: item, value: item }))}
                onChange={setBrand}
              />
              <CustomDropdown
                label="Gender"
                value={gender}
                placeholder="All"
                options={[
                  { label: "For Him", value: "Men" },
                  { label: "For Her", value: "Women" },
                  { label: "Unisex", value: "Unisex" },
                ]}
                onChange={setGender}
              />
              <CustomDropdown
                label="Fragrance Notes"
                value={note}
                placeholder="Any notes"
                options={noteGroups.map((item) => ({ label: item, value: item }))}
                onChange={setNote}
              />
              <CustomDropdown
                label="Concentration"
                value={concentration}
                placeholder="All types"
                options={concentrationOptions.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={setConcentration}
              />
              <CustomDropdown
                label="Longevity"
                value={longevity}
                placeholder="Any duration"
                options={longevityOptions.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={setLongevity}
              />
              <CustomDropdown
                label="Availability"
                value={availability}
                placeholder="All availability"
                options={[
                  { label: "In stock", value: "In stock" },
                  { label: "Low stock", value: "Low stock" },
                  { label: "Out of stock", value: "Out of stock" },
                ]}
                onChange={setAvailability}
              />
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-luxe">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-stone">Showing {pageProducts.length} of {totalProducts} products</p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex overflow-hidden rounded-full border border-black/10 bg-ivory">
                  <button type="button" onClick={() => setViewMode("grid")} className={`px-4 py-2 text-sm ${viewMode === "grid" ? "bg-charcoal text-ivory" : "text-charcoal"}`}>Grid</button>
                  <button type="button" onClick={() => setViewMode("list")} className={`px-4 py-2 text-sm ${viewMode === "list" ? "bg-charcoal text-ivory" : "text-charcoal"}`}>List</button>
                </div>
                <div className="min-w-[200px]">
                  <CustomDropdown
                    value={sort}
                    placeholder="Sort by"
                    options={sortOptions.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    onChange={(value) => setSort(value || "newest")}
                    allowClear={false}
                  />
                </div>
                <div className="min-w-[170px]">
                  <CustomDropdown
                    value={String(productsPerPage)}
                    placeholder="Per page"
                    options={perPageOptions.map((item) => ({
                      label: `${item} per page`,
                      value: String(item),
                    }))}
                    onChange={(value) => setProductsPerPage(Number(value || 12))}
                    allowClear={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1"}`}>
            {pageProducts.map((product) => {
              const stars = renderStars(product.rating);
              if (viewMode === "grid") {
                return (
                  <article key={product._id} className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-xl">
                    <Link href={`/product/${product._id}`} className="block">
                      <div className="relative aspect-[3/3.7] bg-gray-100">
                        <Image src={product.images[0] || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80"} alt={product.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/10 opacity-0 transition group-hover:opacity-100" />
                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-rose-500">-15%</span>
                        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setQuickView(product);
                            }}
                            className="flex-1 rounded-lg bg-white px-2 py-2 text-xs font-semibold text-charcoal shadow"
                          >
                            Quick View
                          </button>
                          <Link
                            href="/cart"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 rounded-lg bg-charcoal px-2 py-2 text-center text-xs font-semibold text-white shadow"
                          >
                            Cart
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(product._id);
                            }}
                            className={`rounded-lg px-2 py-2 text-xs font-semibold shadow ${
                              wishlist.includes(product._id)
                                ? "bg-rose-100 text-rose-700"
                                : "bg-white text-charcoal"
                            }`}
                          >
                            Wish
                          </button>
                        </div>
                      </div>
                    </Link>
                    <div className="space-y-3 p-4">
                      <div className="flex items-center gap-0.5 text-sm text-amber-400">{stars.map((star, i) => <span key={i}>{star}</span>)}<span className="ml-1 text-sm text-gray-500">{product.numReviews} reviews</span></div>
                      <h2 className="line-clamp-2 min-h-[3rem] text-[1.04rem] font-semibold leading-6 text-gray-700">{product.name}</h2>
                      <p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700">Rs.{Math.round(product.price * 0.65).toLocaleString()}.00 - Rs.{Math.round(product.price * 2.15).toLocaleString()}.00</p>
                      <div className="flex flex-wrap gap-2">{sizeChips.map((size) => <button key={size} type="button" onClick={() => setQuickView(product)} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-50">{size}</button>)}</div>
                    </div>
                  </article>
                );
              }

              return (
                <article key={product._id} className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm lg:flex">
                  <div className="relative h-72 bg-gray-100 lg:h-auto lg:w-5/12">
                    <Image src={product.images[0] || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80"} alt={product.name} fill className="object-cover" />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-full bg-black/75 px-3 py-1 text-xs font-medium text-white">{product.fragranceType}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStockBadge(product.stock)}`}>{getStockLabel(product.stock)}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone">{product.category} • {product.gender}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-charcoal">{product.name}</h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-stone">{product.description}</p>
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-gray-100 pt-5">
                      <div>
                        <div className="flex items-center gap-1 text-amber-500">{stars.map((star, i) => <span key={i}>{star}</span>)}<span className="ml-1 text-sm text-gray-500">{product.numReviews} reviews</span></div>
                        <p className="mt-2 text-2xl font-semibold text-charcoal">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setQuickView(product)} className="rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Quick View</button>
                        <Link href={`/product/${product._id}`} className="rounded-2xl bg-charcoal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black">View details</Link>
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={() => toggleWishlist(product._id)} className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-white/90 text-sm ${wishlist.includes(product._id) ? "border-rose-500 text-rose-600" : "border-black/10 text-gray-500"}`} aria-label="Toggle wishlist">W</button>
                </article>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-black/10 bg-white/90 px-5 py-4 text-sm text-stone shadow-luxe">
            <p>Page {currentPage} of {pageCount}</p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="rounded-full border border-black/10 bg-ivory px-4 py-2 disabled:opacity-60">Prev</button>
              <button type="button" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount} className="rounded-full border border-black/10 bg-ivory px-4 py-2 disabled:opacity-60">Next</button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="fixed left-3 top-1/2 z-40 flex -translate-y-1/2 items-center gap-2 rounded-r-2xl border border-black/10 bg-white px-3 py-3 text-sm font-medium text-charcoal shadow-lg xl:hidden"
      >
        <span className="text-base">[]</span>
        <span>Open sidebar</span>
      </button>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-[88vw] max-w-[360px] overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <h2 className="text-xl font-semibold text-charcoal">SIDEBAR</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-xl text-charcoal"
              >
                x
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="w-full rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm outline-none transition focus:border-charcoal"
              />
              <CustomDropdown
                label="Category"
                value={category}
                placeholder="All categories"
                options={categories.map((item) => ({ label: item, value: item }))}
                onChange={setCategory}
              />
              <CustomDropdown
                label="Brand"
                value={brand}
                placeholder="All brands"
                options={brands.map((item) => ({ label: item, value: item }))}
                onChange={setBrand}
              />
              <CustomDropdown
                label="Gender"
                value={gender}
                placeholder="All"
                options={[
                  { label: "For Him", value: "Men" },
                  { label: "For Her", value: "Women" },
                  { label: "Unisex", value: "Unisex" },
                ]}
                onChange={setGender}
              />
              <CustomDropdown
                label="Fragrance Notes"
                value={note}
                placeholder="Any notes"
                options={noteGroups.map((item) => ({ label: item, value: item }))}
                onChange={setNote}
              />
              <CustomDropdown
                label="Concentration"
                value={concentration}
                placeholder="All types"
                options={concentrationOptions.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={setConcentration}
              />
              <CustomDropdown
                label="Longevity"
                value={longevity}
                placeholder="Any duration"
                options={longevityOptions.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={setLongevity}
              />
              <CustomDropdown
                label="Availability"
                value={availability}
                placeholder="All availability"
                options={[
                  { label: "In stock", value: "In stock" },
                  { label: "Low stock", value: "Low stock" },
                  { label: "Out of stock", value: "Out of stock" },
                ]}
                onChange={setAvailability}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-black/10 pt-4">
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-xl border border-black/10 bg-ivory px-4 py-3 text-sm font-medium text-charcoal"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-xl bg-charcoal px-4 py-3 text-sm font-semibold text-ivory"
              >
                Apply
              </button>
            </div>
          </aside>
        </div>
      )}

      {quickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <h2 className="text-2xl font-semibold text-charcoal">{quickView.name}</h2>
              <button type="button" onClick={() => setQuickView(null)} className="rounded-full border border-black/10 bg-ivory px-4 py-2 text-sm font-semibold text-charcoal">Close</button>
            </div>
            <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative h-96 overflow-hidden rounded-[1.5rem] bg-slate-100">
                <Image src={quickView.images[0]} alt={quickView.name} fill className="object-cover" />
              </div>
              <div className="space-y-5">
                <p className="text-xl font-semibold text-charcoal">${quickView.price.toFixed(2)}</p>
                <p className="text-sm leading-7 text-stone">{quickView.description}</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory">Add to cart</button>
                  <button type="button" onClick={() => toggleWishlist(quickView._id)} className="rounded-full border border-black/10 bg-ivory px-6 py-3 text-sm font-semibold text-charcoal">{wishlist.includes(quickView._id) ? "Remove from wishlist" : "Add to wishlist"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-luxe">
          Loading products...
        </section>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}

