import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "../components/theme-toggle";
import { ClientToaster } from "../components/ClientToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quote Generator - Daily Motivation & Inspiration",
  description: "Generate personalized motivational quotes based on your chosen topic. Beautiful, minimal design with instant results to fuel your ambition and mindset.",
  keywords: "quotes, motivation, inspiration, generator, personal development, daily motivation, mindset",
  authors: [{ name: "Quote Generator Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased min-h-screen text-foreground
          bg-gradient-to-br from-slate-300 via-gray-300 to-slate-400
          dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-gray-900
          transition-all duration-500 ease-out
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Animated Background Pattern */}
          <div
            className="fixed inset-0 -z-20 opacity-[0.02] dark:opacity-[0.01]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15,23,42) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />
          
          {/* Floating Orbs */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/15 dark:bg-blue-900/10 rounded-full blur-3xl floating" />
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/15 dark:bg-purple-900/10 rounded-full blur-3xl floating" style={{animationDelay: '2s'}} />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-400/15 dark:bg-indigo-900/10 rounded-full blur-3xl floating" style={{animationDelay: '4s'}} />
          </div>

          <div className="flex flex-col min-h-screen relative">
            {/* Enhanced Header */}
            <header className="relative border-b border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm bg-white/30 dark:bg-slate-900/30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-slate-800/20" />
              <div className="container mx-auto px-4 py-6 relative">
                <div className="flex items-center justify-between">
                  <div className="animate-slideInLeft flex-1">
                    <h1 className="text-3xl font-bold text-center tracking-tight">
                      <span className="inline-flex items-center gap-2">
                        <span className="text-3xl animate-pulse">✨</span>
                        <span className="gradient-text">Quote Generator</span>
                      </span>
                    </h1>
                    <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                      Your daily dose of inspiration
                    </p>
                  </div>
                  
                  {/* Theme Toggle Button */}
                  <div className="animate-slideInRight">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </header>
            
            {/* Enhanced Main Content */}
            <main className="flex-1 container mx-auto px-4 py-12 relative">
              <div className="animate-fadeInUp">
                {children}
              </div>
            </main>
            
            {/* Enhanced Footer */}
            <footer className="relative border-t border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm bg-white/30 dark:bg-slate-900/30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-slate-800/10" />
              <div className="container mx-auto px-4 py-8 relative">
                <div className="text-center space-y-3 animate-fadeInUp">
                  <div className="flex justify-center items-center gap-2 text-2xl">
                    <span className="animate-pulse">🌟</span>
                    <span className="animate-pulse" style={{animationDelay: '0.5s'}}>💫</span>
                    <span className="animate-pulse" style={{animationDelay: '1s'}}>⭐</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    &copy; 2025 Quote Generator
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Crafted with passion for daily motivation
                  </p>
                </div>
              </div>
            </footer>
          </div>
          <ClientToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}