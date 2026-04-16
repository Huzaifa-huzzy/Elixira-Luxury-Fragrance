import Image from 'next/image';
import Link from 'next/link';

const featuredStories = [
  {
    title: 'Best Citrus-Based Perfumes for Summer',
    excerpt:
      'Discover energizing citrus profiles that stay crisp in warm weather without fading too quickly.',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'EDP vs EDT: Which One Should You Pick?',
    excerpt:
      'Understand concentration, projection, and longevity so you can choose the right fragrance format.',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'How to Build a Signature Fragrance Wardrobe',
    excerpt:
      'A practical guide to selecting day, evening, and special-event scents for every season.',
    image:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function StoriesPage() {
  return (
    <section className="space-y-8 pb-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-charcoal text-white shadow-luxe">
        <Image
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=80"
          alt="Stories hero"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative space-y-5 p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d8b982]">
            Fragrance Journal
          </p>
          <h1 className="max-w-3xl text-4xl font-serif font-semibold leading-tight md:text-5xl">
            Stories, guides, and inspiration from the world of perfumery.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-white/85 md:text-base">
            Explore scent education, seasonal recommendations, and buying tips to
            help you choose fragrances with confidence.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="overflow-hidden rounded-[1.6rem] border border-black/10 bg-white shadow-luxe">
          <div className="relative h-72">
            <Image
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1600&q=80"
              alt="Featured story"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
          <div className="space-y-4 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-stone">
              Featured Story
            </p>
            <h2 className="text-3xl font-serif font-semibold text-charcoal">
              The Art of Layering Fragrances for a Custom Signature Scent
            </h2>
            <p className="text-sm leading-7 text-stone">
              Learn how to pair fresh, woody, and oriental accords to create a
              balanced scent profile that feels uniquely yours.
            </p>
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-black"
            >
              Explore matching scents
            </Link>
          </div>
        </article>

        <div className="space-y-4">
          {featuredStories.map((story) => (
            <article
              key={story.title}
              className="grid gap-4 rounded-[1.2rem] border border-black/10 bg-white p-4 shadow-sm sm:grid-cols-[170px_1fr]"
            >
              <div className="relative h-36 overflow-hidden rounded-xl">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="170px"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-charcoal">{story.title}</h3>
                <p className="text-sm leading-7 text-stone">{story.excerpt}</p>
                <Link
                  href="/shop"
                  className="inline-flex text-sm font-semibold text-charcoal underline-offset-2 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
