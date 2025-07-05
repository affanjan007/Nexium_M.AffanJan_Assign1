'use client';

import { useEffect, useState } from 'react';
import { getQuotesByTopic, type Quote } from '@/lib/quotes';
import { Copy, Share2, Heart, BookOpen, Quote as QuoteIcon, Sparkles, Clock, Shield, Target, Gem } from 'lucide-react';
import { toast } from 'sonner';

interface QuoteDisplayProps {
  topic: string;
}

export default function QuoteDisplay({ topic }: QuoteDisplayProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedQuotes, setLikedQuotes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const generateQuotes = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const topicQuotes = getQuotesByTopic(topic, 3, topic);
      setQuotes(topicQuotes);
      setIsLoading(false);
    };

    if (topic) {
      generateQuotes();
    }
  }, [topic]);

  const handleCopyQuote = async (quote: Quote) => {
    const text = `"${quote.text}" - ${quote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Quote copied to clipboard!', {
        description: 'Ready to share your inspiration',
        duration: 2000,
      });
    } catch {
      toast.error('Failed to copy quote');
    }
  };

  const handleShareQuote = async (quote: Quote) => {
    const text = `"${quote.text}" - ${quote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspirational Quote',
          text: text,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      await handleCopyQuote(quote);
    }
  };

  const handleLikeQuote = (quoteId: string) => {
    setLikedQuotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(quoteId)) {
        newSet.delete(quoteId);
        toast.success('Removed from favorites');
      } else {
        newSet.add(quoteId);
        toast.success('Added to favorites!');
      }
      return newSet;
    });
  };

  // Get topic icon based on the topic name
  const getTopicIcon = (topicName: string) => {
    const lowerTopic = topicName.toLowerCase();
    if (lowerTopic.includes('time')) return <Clock className="w-8 h-8 text-white" />;
    if (lowerTopic.includes('resilience')) return <Shield className="w-8 h-8 text-white" />;
    if (lowerTopic.includes('focus')) return <Target className="w-8 h-8 text-white" />;
    if (lowerTopic.includes('discipline')) return <Gem className="w-8 h-8 text-white" />;
    if (lowerTopic.includes('success')) return <span className="text-2xl">🏆</span>;
    if (lowerTopic.includes('leadership')) return <span className="text-2xl">👑</span>;
    if (lowerTopic.includes('motivation')) return <span className="text-2xl">⚡</span>;
    if (lowerTopic.includes('productivity')) return <span className="text-2xl">🚀</span>;
    return <QuoteIcon className="w-8 h-8 text-white" />;
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-16">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-spin opacity-20"></div>
            <div className="relative w-20 h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border border-white/20">
              <BookOpen className="w-10 h-10 text-blue-500 animate-pulse" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              ✨ Crafting Your Inspiration
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Generating personalized quotes for{' '}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {topic}
              </span>
            </p>
            <div className="flex justify-center space-x-1 mt-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>

        {/* Enhanced Loading Skeleton */}
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 p-8">
              <div className="animate-pulse">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full"></div>
                  <div className="flex-1 space-y-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-4/5"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/5"></div>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3"></div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-20"></div>
                      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-24"></div>
                      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-6xl">🤔</span>
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            No quotes found
          </h3>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Try a different topic or explore our suggested topics above to discover new inspiration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Enhanced Header with Dynamic Icon */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
              {getTopicIcon(topic)}
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-yellow-800" />
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-200">
              Quotes about{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 capitalize">
                {topic}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
              3 inspiring quotes to fuel your journey ✨
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Quotes Grid */}
      <div className="space-y-10">
        {quotes.map((quote, index) => (
          <QuoteCard 
            key={`${quote.id}-${topic}`} 
            quote={quote} 
            index={index}
            isLiked={likedQuotes.has(quote.id)}
            onCopy={() => handleCopyQuote(quote)}
            onShare={() => handleShareQuote(quote)}
            onLike={() => handleLikeQuote(quote.id)}
          />
        ))}
      </div>

      {/* Enhanced Call to Action with New Topic Suggestions */}
      <div className="space-y-6">
        <div className="text-center pt-12">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-lg">
            <span className="text-2xl">🎯</span>
            <div className="text-left">
              <span className="block text-slate-600 dark:text-slate-400 font-medium">
                Want more inspiration?
              </span>
              <span className="block text-blue-600 dark:text-blue-400 font-bold">
                Try another topic above! ✨
              </span>
            </div>
          </div>
        </div>

        {/* New Topic Suggestions */}
        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-600/60">
          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <span className="text-xl">🔥</span>
            Try these powerful topics:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Time Management', 'Resilience', 'Focus', 'Self-Discipline'].map((newTopic) => (
              <div key={newTopic} className="flex items-center gap-2 px-3 py-2 bg-white/70 dark:bg-slate-800/70 rounded-lg border border-slate-200/60 dark:border-slate-600/60">
                <span className="text-sm">
                  {newTopic === 'Time Management' ? '⏰' : 
                   newTopic === 'Resilience' ? '🛡️' : 
                   newTopic === 'Focus' ? '🎯' : '💎'}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {newTopic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuoteCardProps {
  quote: Quote;
  index: number;
  isLiked: boolean;
  onCopy: () => void;
  onShare: () => void;
  onLike: () => void;
}

function QuoteCard({ quote, index, isLiked, onCopy, onShare, onLike }: QuoteCardProps) {
  // Enhanced card styles with new topic-based styling
  const getCardStyle = (topics: string[]) => {
    const topicString = topics.join(' ').toLowerCase();
    
    if (topicString.includes('time')) {
      return {
        gradient: 'from-indigo-500/10 via-cyan-500/10 to-blue-500/10',
        border: 'border-indigo-200 dark:border-indigo-800',
        accent: 'from-indigo-400 to-cyan-400',
        icon: '⏰',
        shadow: 'hover:shadow-indigo-500/10'
      };
    }
    if (topicString.includes('resilience')) {
      return {
        gradient: 'from-orange-500/10 via-red-500/10 to-rose-500/10',
        border: 'border-orange-200 dark:border-orange-800',
        accent: 'from-orange-400 to-red-400',
        icon: '🛡️',
        shadow: 'hover:shadow-orange-500/10'
      };
    }
    if (topicString.includes('focus')) {
      return {
        gradient: 'from-teal-500/10 via-green-500/10 to-emerald-500/10',
        border: 'border-teal-200 dark:border-teal-800',
        accent: 'from-teal-400 to-green-400',
        icon: '🎯',
        shadow: 'hover:shadow-teal-500/10'
      };
    }
    if (topicString.includes('discipline')) {
      return {
        gradient: 'from-gray-500/10 via-slate-500/10 to-zinc-500/10',
        border: 'border-gray-200 dark:border-gray-800',
        accent: 'from-gray-400 to-slate-400',
        icon: '💎',
        shadow: 'hover:shadow-gray-500/10'
      };
    }

    // Default styles for existing topics
    const cardStyles = [
      {
        gradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
        border: 'border-blue-200 dark:border-blue-800',
        accent: 'from-blue-400 to-indigo-400',
        icon: '💎',
        shadow: 'hover:shadow-blue-500/10'
      },
      {
        gradient: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
        border: 'border-emerald-200 dark:border-emerald-800',
        accent: 'from-emerald-400 to-teal-400',
        icon: '🌟',
        shadow: 'hover:shadow-emerald-500/10'
      },
      {
        gradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
        border: 'border-purple-200 dark:border-purple-800',
        accent: 'from-purple-400 to-pink-400',
        icon: '🚀',
        shadow: 'hover:shadow-purple-500/10'
      }
    ];

    return cardStyles[index % cardStyles.length];
  };

  const style = getCardStyle(quote.topic);

  return (
    <div 
      className={`group relative overflow-hidden p-10 bg-gradient-to-br ${style.gradient} backdrop-blur-sm border-2 ${style.border} rounded-3xl transition-all duration-700 hover:shadow-2xl ${style.shadow} hover:-translate-y-3 animate-fadeInUp`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Enhanced Decorative Elements */}
      <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${style.accent}`}></div>
      <div className="absolute top-6 right-6 text-4xl opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110">
        {style.icon}
      </div>
      <div className="absolute bottom-6 left-6 w-32 h-32 bg-gradient-to-br from-white/5 to-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex items-start gap-8 relative z-10">
        {/* Enhanced Quote Number Badge */}
        <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${style.accent} rounded-2xl flex items-center justify-center shadow-xl text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300`}>
          {index + 1}
        </div>

        {/* Enhanced Quote Content */}
        <div className="flex-1 space-y-8">
          <blockquote className="text-2xl leading-relaxed font-semibold text-slate-800 dark:text-slate-200 relative">
            <QuoteIcon className="absolute -top-4 -left-4 w-8 h-8 text-slate-300 dark:text-slate-600 opacity-50" />
            <span className="ml-6 block">{quote.text}</span>
          </blockquote>

          <div className="flex items-center justify-between">
            <cite className="text-lg font-bold text-slate-600 dark:text-slate-400 not-italic">
              — {quote.author}
            </cite>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-white/70 dark:bg-slate-800/70 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 shadow-sm">
                Quote #{index + 1}
              </span>
            </div>
          </div>

          {/* Enhanced Tags */}
          <div className="flex flex-wrap gap-3">
            {quote.topic.slice(0, 4).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-600/60 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer hover:scale-105 shadow-sm"
              >
                #{tag}
              </span>
            ))}
            {quote.topic.length > 4 && (
              <span className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-600/60 shadow-sm">
                +{quote.topic.length - 4} more
              </span>
            )}
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={onLike}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                isLiked 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-2 border-red-200 dark:border-red-800' 
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 border-2 border-slate-200 dark:border-slate-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>

            <button
              onClick={onCopy}
              className="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-semibold transition-all duration-300 border-2 border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Copy className="w-5 h-5" />
              <span>Copy</span>
            </button>

            <button
              onClick={onShare}
              className="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 hover:bg-green-50 dark:hover:bg-green-900/20 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 rounded-xl font-semibold transition-all duration-300 border-2 border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}