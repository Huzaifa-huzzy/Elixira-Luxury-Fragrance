import Link from 'next/link';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const supportLinks = [
  { label: 'Help center', href: '/help' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-ivory text-charcoal">
      <div className="site-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-charcoal text-xl font-semibold text-ivory">E</div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-stone">Elixira</p>
                <p className="text-lg font-serif font-semibold text-charcoal">Luxury Fragrance</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-stone/90">
              Discover curated scents, timeless gift collections, and expert fragrance advice for every occasion.
              Elevate your senses with premium perfume, cologne, and seasonal scent experiences.
            </p>
            <div className="space-y-2 rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-charcoal">Sign up for exclusive offers</p>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-black/10 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
                />
                <button type="submit" className="inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-stone">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-stone">Explore</h2>
            <ul className="space-y-3 text-sm text-charcoal">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-charcoal/70">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-stone">Support</h2>
            <ul className="space-y-3 text-sm text-charcoal">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-charcoal/70">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-black/10 pt-6 text-sm text-stone sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Elixira. Crafted for modern luxury.</p>
          <p>Designed to complement premium scent discovery and elegant checkout experiences.</p>
        </div>
      </div>
    </footer>
  );
}
