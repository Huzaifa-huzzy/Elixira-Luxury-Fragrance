import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Elixira | Luxury Fragrance Boutique',
  description: 'A premium fragrance storefront with elegant shopping, checkout, and admin controls.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="bg-ivory text-charcoal min-h-screen">
            <Navbar />
            <main className="site-shell w-full py-6">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
