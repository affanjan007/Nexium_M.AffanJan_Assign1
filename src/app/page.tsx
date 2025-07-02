import QuoteForm from "../components/quote-form";
import ClientQuoteDisplay from "../components/client-quote-display";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Find Your Daily Motivation
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Generate inspiring quotes tailored to your chosen topic. Get the motivation you need to power through your day.
        </p>
      </section>

      <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <QuoteForm />
      </section>

      <ClientQuoteDisplay />

      <section className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="text-center space-y-2">
          <div className="text-3xl">🎯</div>
          <h3 className="font-semibold">Topic-Based</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter any topic and get relevant motivational quotes
          </p>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl">⚡</div>
          <h3 className="font-semibold">Instant Results</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get 3 inspiring quotes immediately with fast loading
          </p>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl">💡</div>
          <h3 className="font-semibold">Daily Inspiration</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Perfect for morning motivation or when you need a boost
          </p>
        </div>
      </section>
    </div>
  );
}
