'use client';

import { useSearchParams } from 'next/navigation';
import ServerQuoteDisplay from './server-quote-display';

export default function ClientQuoteDisplay() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');

  if (!topic) return null;

  return <ServerQuoteDisplay topic={topic} />;
}
