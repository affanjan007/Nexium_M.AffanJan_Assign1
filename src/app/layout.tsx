import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quote Generator - Motivational Quotes App",
  description: "Generate motivational quotes based on your chosen topic. Built with Next.js and modern web technologies.",
  keywords: "quotes, motivation, inspiration, generator, personal development",
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="flex flex-col min-h-screen">
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-center">
                🌟 Quote Generator
              </h1>
            </div>
          </header>
          
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          
          <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>&copy; 2025 Quote Generator. Built with Next.js</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}