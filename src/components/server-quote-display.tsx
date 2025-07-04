import QuoteDisplay from './quote-display';

export default function ServerQuoteDisplay({ topic }: { topic: string }) {
  return (
    <section className="space-y-6">
      <h3 className="text-2xl font-semibold text-center">
        Motivational Quotes for &quot;{topic}&quot;
      </h3>
      <QuoteDisplay topic={topic} />
    </section>
  );
}