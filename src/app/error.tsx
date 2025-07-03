'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <div className="text-4xl animate-pulse">⚠️</div>
          </div>
          
          <div className="absolute inset-0 w-20 h-20 mx-auto border-2 border-red-500/30 rounded-full animate-ping"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-red-400">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We encountered an unexpected error while generating your quotes. 
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="card-glass p-4 mt-4 text-left">
              <p className="text-xs text-gray-500 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn-primary px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 focus-ring"
          >
            ✨ Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 border border-gray-600 hover:border-gray-500 focus-ring"
          >
            🔄 Refresh Page
          </button>
        </div>

        <div className="text-sm text-gray-500 space-y-2">
          <p>If the problem persists, try:</p>
          <ul className="text-xs space-y-1">
            <li>• Refreshing the page</li>
            <li>• Checking your internet connection</li>
            <li>• Trying a different topic</li>
          </ul>
        </div>
      </div>
    </div>
  );
}