'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuoteForm() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      alert('Please enter a topic to generate quotes!');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(`/?topic=${encodeURIComponent(topic.trim())}`);
    setIsLoading(false);
  };

  const suggestedTopics = [
    'Success', 'Motivation', 'Leadership', 'Productivity',
    'Growth', 'Happiness', 'Courage', 'Creativity'
  ];

  const handleSuggestedTopic = (suggestedTopic: string) => {
    setTopic(suggestedTopic);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="topic-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Enter a topic for your motivational quotes:
          </label>
          <div className="flex gap-3">
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., success, motivation, leadership..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
              disabled={isLoading}
              maxLength={50}
            />
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Quotes'
              )}
            </button>
          </div>
        </div>
      </form>

      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Or try one of these popular topics:
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestedTopics.map((suggestedTopic) => (
            <button
              key={suggestedTopic}
              onClick={() => handleSuggestedTopic(suggestedTopic)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors border border-gray-200 dark:border-gray-600"
              disabled={isLoading}
            >
              #{suggestedTopic}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <p className="font-medium mb-1">💡 Tips:</p>
        <ul className="space-y-1 text-xs">
          <li>• Try topics like &quot;success&quot;, &quot;motivation&quot;, &quot;leadership&quot;, or &quot;productivity&quot;</li>
          <li>• Be specific for better results (e.g., &quot;time management&quot; vs &quot;time&quot;)</li>
          <li>• Each search generates 3 unique motivational quotes</li>
        </ul>
      </div>
    </div>
  );
}
