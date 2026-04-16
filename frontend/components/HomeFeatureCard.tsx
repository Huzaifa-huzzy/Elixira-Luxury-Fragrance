interface HomeFeatureCardProps {
  title: string;
  description: string;
}

export function HomeFeatureCard({ title, description }: HomeFeatureCardProps) {
  return (
    <article className="rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe transition hover:-translate-y-1 hover:shadow-2xl">
      <h2 className="text-xl font-semibold text-charcoal">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-stone/90">{description}</p>
    </article>
  );
}
