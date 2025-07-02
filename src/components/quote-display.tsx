import { getQuotesByTopic, type Quote } from '@/lib/quotes';

interface QuoteDisplayProps {
  topic: string;
}

export default function QuoteDisplay({ topic }: QuoteDisplayProps) {
  const quotes = getQuotesByTopic(topic, 3);

  if (quotes.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🤔</div>
        <h3 className="text-xl font-semibold mb-2">No quotes found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try a different topic or one of our suggested topics above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
      {quotes.map((quote, index) => (
        <QuoteCard key={quote.id} quote={quote} index={index} />
      ))}
    </div>
  );
}

interface QuoteCardProps {
  quote: Quote;
  index: number;
}

function QuoteCard({ quote, index }: QuoteCardProps) {
  const cardColors = [
    'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800',
    'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800',
    'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800'
  ];

  const iconEmojis = ['💪', '🌟', '🚀'];

  return (
    <div className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${cardColors[index % cardColors.length]}`}>
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">
          {iconEmojis[index % iconEmojis.length]}
        </div>

        <div className="flex-1 space-y-4">
          <blockquote className="text-lg leading-relaxed font-medium text-gray-800 dark:text-gray-200">
            &quot;{quote.text}&quot;
          </blockquote>

          <div className="flex items-center justify-between">
            <cite className="text-sm font-semibold text-gray-600 dark:text-gray-400 not-italic">
              — {quote.author}
            </cite>
            <span className="text-xs bg-white/50 dark:bg-black/20 px-2 py-1 rounded-full font-medium">
              Quote {index + 1}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {quote.topic.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-xs px-2 py-1 bg-white/60 dark:bg-black/30 rounded-full text-gray-600 dark:text-gray-300 border border-white/40 dark:border-gray-600"
              >
                #{tag}
              </span>
            ))}
            {quote.topic.length > 3 && (
              <span className="text-xs px-2 py-1 bg-white/60 dark:bg-black/30 rounded-full text-gray-600 dark:text-gray-300 border border-white/40 dark:border-gray-600">
                +{quote.topic.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
