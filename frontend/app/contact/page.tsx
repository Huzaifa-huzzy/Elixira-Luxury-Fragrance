import Link from 'next/link';

export default function ContactPage() {
  return (
    <section className="space-y-8 pb-10">
      <div className="rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe md:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-stone">Contact</p>
        <h1 className="mt-3 text-4xl font-serif font-semibold text-charcoal md:text-5xl">
          We are here to help with every fragrance decision.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-stone md:text-base">
          Reach out for order support, gifting consultation, product guidance, or
          wholesale inquiries. Our team responds quickly with practical help.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.6rem] border border-black/10 bg-white p-6 shadow-luxe">
          <h2 className="text-2xl font-semibold text-charcoal">Send us a message</h2>
          <form className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-charcoal">First name</label>
                <input
                  type="text"
                  placeholder="Your first name"
                  className="w-full rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-charcoal">Last name</label>
                <input
                  type="text"
                  placeholder="Your last name"
                  className="w-full rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Subject</label>
              <input
                type="text"
                placeholder="Order support, product question, gifting..."
                className="w-full rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal"
              />
            </div>
            <button
              type="button"
              className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-black"
            >
              Send message
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.4rem] border border-black/10 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-stone">Customer Support</p>
            <p className="mt-2 text-lg font-semibold text-charcoal">support@elixira.com</p>
            <p className="mt-1 text-sm text-stone">Response within 24 hours</p>
          </div>
          <div className="rounded-[1.4rem] border border-black/10 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-stone">Phone</p>
            <p className="mt-2 text-lg font-semibold text-charcoal">+92 300 1234567</p>
            <p className="mt-1 text-sm text-stone">Mon-Sat, 10:00 AM - 7:00 PM</p>
          </div>
          <div className="rounded-[1.4rem] border border-black/10 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-stone">Visit Store</p>
            <p className="mt-2 text-sm leading-7 text-charcoal">
              Elixira Fragrance Studio, Main Boulevard, Lahore, Pakistan.
            </p>
            <Link
              href="/shop"
              className="mt-3 inline-flex text-sm font-semibold text-charcoal underline-offset-2 hover:underline"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
