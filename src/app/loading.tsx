export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-8">
        {/* Enhanced loading animation */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
          
          {/* Inner ring */}
          <div className="absolute inset-2 w-12 h-12 border-4 border-purple-500/20 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
            <div className="absolute top-0 left-0 w-2 h-2 bg-purple-500 rounded-full"></div>
          </div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl animate-pulse">✨</div>
          </div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">
            Crafting Your Inspiration
          </h3>
          <p className="text-gray-400 max-w-sm mx-auto">
            Our AI is analyzing your topic and generating personalized quotes just for you...
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}