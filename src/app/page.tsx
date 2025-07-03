import QuoteForm from "../components/quote-form";
import ClientQuoteDisplay from "../components/client-quote-display";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 animate-fadeInUp">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-4xl animate-pulse">✨</span>
            <h2 className="text-6xl sm:text-7xl font-extrabold tracking-tight gradient-text">
              Find Your Daily
            </h2>
            <span className="text-4xl animate-pulse" style={{animationDelay: '0.5s'}}>🌟</span>
          </div>
          <h3 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-slate-200">
            Motivation
          </h3>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            Personalized quotes to fuel your
          </p>
          <div className="inline-flex flex-wrap justify-center gap-3 text-lg font-semibold">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full animate-scaleIn">
              ambition
            </span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full animate-scaleIn" style={{animationDelay: '0.2s'}}>
              mindset
            </span>
            <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-full animate-scaleIn" style={{animationDelay: '0.4s'}}>
              success
            </span>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="card-glass p-8 sm:p-10 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Generate Your Inspiration
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Choose a topic and let us craft the perfect motivation for you
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* Quote Display Section */}
      <div className="animate-fadeInUp scroll-to-quotes" style={{animationDelay: '0.5s'}} id="quotes-section">
        <ClientQuoteDisplay />
      </div>

      {/* Features Section */}
      <section className="animate-fadeInUp" style={{animationDelay: '0.7s'}}>
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Why Choose Our Generator?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Experience the perfect blend of technology and inspiration
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-glass p-8 text-center space-y-4 group stagger-animation">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              🎯
            </div>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">Topic-Based</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter any topic and get relevant motivational quotes tailored to your specific needs and goals
            </p>
          </div>
          
          <div className="card-glass p-8 text-center space-y-4 group stagger-animation">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              ⚡
            </div>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">Instant Results</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Get 3 inspiring quotes immediately with lightning-fast loading and beautiful animations
            </p>
          </div>
          
          <div className="card-glass p-8 text-center space-y-4 group stagger-animation">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              💡
            </div>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">Daily Inspiration</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Perfect for morning motivation, afternoon boosts, or whenever you need that extra spark
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center card-glass p-12 animate-fadeInUp" style={{animationDelay: '0.9s'}}>
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Ready to Transform Your Day?
          </h3>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Join thousands who start their day with personalized motivation
          </p>
          <div className="flex justify-center gap-2 text-2xl">
            <span className="animate-pulse">🚀</span>
            <span className="animate-pulse" style={{animationDelay: '0.3s'}}>💪</span>
            <span className="animate-pulse" style={{animationDelay: '0.6s'}}>🎉</span>
          </div>
        </div>
      </section>
    </div>
  );
}