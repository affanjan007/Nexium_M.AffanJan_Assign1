'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import ServerQuoteDisplay from './server-quote-display';

export default function ClientQuoteDisplay() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const quotesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topic && quotesRef.current) {
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
  }, [topic]);

  if (!topic) return null;

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
