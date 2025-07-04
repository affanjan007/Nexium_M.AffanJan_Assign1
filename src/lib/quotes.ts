export interface Quote {
  id: string;
  text: string;
  author: string;
  topic: string[];
}

export const quotesDatabase: Quote[] = [
  // Success quotes
  {
    id: "1",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    topic: ["success", "courage", "persistence", "failure"]
  },
  {
    id: "2",
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    topic: ["success", "action", "motivation", "productivity"]
  },
  {
    id: "3",
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    topic: ["success", "ambition", "growth", "excellence"]
  },

  // Motivation quotes
  {
    id: "4",
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    topic: ["motivation", "dreams", "future", "belief"]
  },
  {
    id: "5",
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    topic: ["motivation", "hope", "perseverance", "strength"]
  },
  {
    id: "6",
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    topic: ["motivation", "belief", "confidence", "mindset"]
  },

  // Leadership quotes
  {
    id: "7",
    text: "A leader is one who knows the way, goes the way, and shows the way.",
    author: "John C. Maxwell",
    topic: ["leadership", "guidance", "example", "direction"]
  },
  {
    id: "8",
    text: "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.",
    author: "Ronald Reagan",
    topic: ["leadership", "teamwork", "inspiration", "achievement"]
  },
  {
    id: "9",
    text: "Leadership is not about being in charge. It's about taking care of those in your charge.",
    author: "Simon Sinek",
    topic: ["leadership", "care", "responsibility", "service"]
  },

  // Productivity quotes
  {
    id: "10",
    text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    author: "Stephen Covey",
    topic: ["productivity", "priorities", "time management", "planning"]
  },
  {
    id: "11",
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
    topic: ["productivity", "focus", "efficiency", "work"]
  },
  {
    id: "12",
    text: "You don't have to be great to get started, but you have to get started to be great.",
    author: "Les Brown",
    topic: ["productivity", "action", "improvement", "beginning"]
  },

  // General inspiration
  {
    id: "13",
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    topic: ["inspiration", "journey", "beginning", "possibility"]
  },
  {
    id: "14",
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    topic: ["inspiration", "opportunity", "challenges", "growth"]
  },
  {
    id: "15",
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    topic: ["inspiration", "life", "present", "mindfulness"]
  }
];

// Simple hash function for deterministic randomization
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Deterministic shuffle using seed
function deterministicShuffle<T>(array: T[], seed: string): T[] {
  const shuffled = [...array];
  const hash = hashString(seed);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (hash + i) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

export function getQuotesByTopic(topic: string, limit: number = 3, seed?: string): Quote[] {
  const normalizedTopic = topic.toLowerCase().trim();

  const matchingQuotes = quotesDatabase.filter(quote =>
    quote.topic.some(t => 
      t.toLowerCase().includes(normalizedTopic) || 
      normalizedTopic.includes(t.toLowerCase())
    )
  );

  if (matchingQuotes.length >= limit) {
    // Use deterministic shuffle if seed is provided
    const shuffledQuotes = seed 
      ? deterministicShuffle(matchingQuotes, seed)
      : matchingQuotes;
    return shuffledQuotes.slice(0, limit);
  }

  const inspirationalQuotes = quotesDatabase.filter(quote =>
    quote.topic.includes("inspiration") || quote.topic.includes("motivation")
  );

  const combinedQuotes = [...matchingQuotes, ...inspirationalQuotes];
  const uniqueQuotes = removeDuplicates(combinedQuotes);

  // Use deterministic shuffle if seed is provided
  const shuffledQuotes = seed 
    ? deterministicShuffle(uniqueQuotes, seed)
    : uniqueQuotes;
    
  return shuffledQuotes.slice(0, limit);
}

function removeDuplicates(quotes: Quote[]): Quote[] {
  const seen = new Set();
  return quotes.filter(quote => {
    if (seen.has(quote.id)) {
      return false;
    }
    seen.add(quote.id);
    return true;
  });
}

export function getAvailableTopics(): string[] {
  const allTopics = quotesDatabase.flatMap(quote => quote.topic);
  return [...new Set(allTopics)].sort();
}