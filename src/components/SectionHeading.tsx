export default function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-12 sm:mb-16">
      <h2 data-reveal className="font-display text-4xl font-bold tracking-tight text-fg sm:text-6xl">
        {title}
      </h2>
      <p data-reveal className="mt-4 max-w-xl text-lg text-muted">
        {subtitle}
      </p>
    </div>
  );
}
