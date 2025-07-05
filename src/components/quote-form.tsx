'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Search, TrendingUp } from 'lucide-react';

export default function QuoteForm() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedTopic, setFocusedTopic] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      // Enhanced alert with better UX
      const inputElement = document.getElementById('topic-input') as HTMLInputElement;
      inputElement?.focus();
      inputElement?.classList.add('animate-pulse', 'border-red-400', 'dark:border-red-500');
      setTimeout(() => {
        inputElement?.classList.remove('animate-pulse', 'border-red-400', 'dark:border-red-500');
      }, 2000);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(`/?topic=${encodeURIComponent(topic.trim())}`);
    setIsLoading(false);
  };

  const suggestedTopics = [
    { name: 'Success', icon: '🏆', gradient: 'from-yellow-400 to-orange-400' },
    { name: 'Motivation', icon: '⚡', gradient: 'from-blue-400 to-purple-400' },
    { name: 'Leadership', icon: '👑', gradient: 'from-purple-400 to-pink-400' },
    { name: 'Productivity', icon: '🚀', gradient: 'from-green-400 to-blue-400' },
    { name: 'Time Management', icon: '⏰', gradient: 'from-indigo-400 to-cyan-400' },
    { name: 'Resilience', icon: '🛡️', gradient: 'from-orange-400 to-red-400' },
    { name: 'Focus', icon: '🎯', gradient: 'from-teal-400 to-green-400' },
    { name: 'Self-Discipline', icon: '💎', gradient: 'from-gray-400 to-slate-400' },
    { name: 'Growth', icon: '🌱', gradient: 'from-emerald-400 to-teal-400' },
    { name: 'Happiness', icon: '😊', gradient: 'from-pink-400 to-rose-400' },
    { name: 'Courage', icon: '💪', gradient: 'from-red-400 to-orange-400' },
    { name: 'Creativity', icon: '🎨', gradient: 'from-indigo-400 to-purple-400' }
  ];

  const handleSuggestedTopic = (suggestedTopic: string) => {
    setTopic(suggestedTopic);
    setFocusedTopic(suggestedTopic);
    setTimeout(() => setFocusedTopic(null), 1000);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label
            htmlFor="topic-input"
            className="flex items-center gap-2 text-base font-semibold text-slate-700 dark:text-slate-300"
          >
            <Search className="w-4 h-4 text-blue-500" />
            Enter a topic for your motivational quotes:
          </label>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative flex gap-3">
              <div className="relative flex-1">
                <input
                  id="topic-input"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., success, motivation, leadership..."
                  className="w-full px-6 py-4 text-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                  maxLength={50}
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <Sparkles className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 disabled:from-slate-300 disabled:via-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:hover:translate-y-0 disabled:hover:shadow-lg min-w-[140px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                {isLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  <span className="flex items-center gap-2 justify-center">
                    <TrendingUp className="w-5 h-5" />
                    Generate
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Enhanced Suggested Topics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
          <p className="text-base font-medium text-slate-600 dark:text-slate-400">
            Or explore these trending topics:
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {suggestedTopics.map((topic) => (
            <button
              key={topic.name}
              onClick={() => handleSuggestedTopic(topic.name)}
              className={`group relative overflow-hidden px-4 py-3 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 backdrop-blur-sm border-2 border-slate-200/60 dark:border-slate-600/60 hover:border-blue-300 dark:hover:border-blue-500 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-md hover:shadow-lg hover:-translate-y-1 ${
                focusedTopic === topic.name ? 'ring-4 ring-blue-500/30 border-blue-400 scale-105' : ''
              }`}
              disabled={isLoading}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative flex flex-col items-center gap-2">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                  {topic.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Tips Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 rounded-2xl"></div>
        <div className="relative p-6 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">💡</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg">
                Pro Tips for Better Quotes
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Try specific topics like <span className="font-medium text-blue-600 dark:text-blue-400">time management</span> vs generic terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Each search generates <span className="font-medium text-purple-600 dark:text-purple-400">3 unique</span> motivational quotes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Popular topics: <span className="font-medium text-indigo-600 dark:text-indigo-400">success, leadership, productivity, growth</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}