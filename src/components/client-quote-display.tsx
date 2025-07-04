'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ServerQuoteDisplay from './server-quote-display';

export default function ClientQuoteDisplay() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const quotesRef = useRef<HTMLDivElement>(null);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    const urlTopic = searchParams.get('topic');
    setTopic(urlTopic);
  }, [searchParams]);

  // Handle scrolling and highlighting after topic is set
  useEffect(() => {
    if (topic && quotesRef.current && isClient) {
      const scrollTimer = setTimeout(() => {
        quotesRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });

        if (quotesRef.current) {
          quotesRef.current.classList.add('highlight-on-scroll');
          const highlightTimer = setTimeout(() => {
            quotesRef.current?.classList.remove('highlight-on-scroll');
          }, 2000);
          
          return () => clearTimeout(highlightTimer);
        }
      }, 600);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [topic, isClient]);

  // Don't render anything until client-side hydration is complete
  if (!isClient || !topic) return null;

  return (
    <div 
      ref={quotesRef} 
      id="quotes-section"
      className="scroll-to-quotes"
    >
      <ServerQuoteDisplay topic={topic} />
    </div>
  );
}