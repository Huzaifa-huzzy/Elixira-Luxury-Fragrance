export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 rounded-[2rem] border border-black/10 bg-white/90 p-10 shadow-luxe">
      <p className="text-sm uppercase tracking-[0.28em] text-stone">Our story</p>
      <h1 className="text-3xl font-serif font-semibold text-charcoal">A scent house built for refined discovery.</h1>
      <p className="text-sm leading-7 text-stone">
        Elixira delivers an elevated fragrance experience by blending rare ingredients, elegant packaging, and a seamless checkout journey. Every product page, shopping flow, and account screen is designed for thoughtful curation.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-black/10 bg-ivory p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-charcoal">Premium sourcing</h2>
          <p className="text-sm text-stone">Each fragrance is selected for its crafted complexity and luxurious finish.</p>
        </div>
        <div className="rounded-[1.75rem] border border-black/10 bg-ivory p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-charcoal">Effortless service</h2>
          <p className="text-sm text-stone">Your account, cart, and checkout remain polished from the first browse to final delivery.</p>
        </div>
      </div>
    </section>
  );
}
