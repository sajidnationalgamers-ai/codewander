import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'CodeWander — Tech Blog & Developer Tools',
    template: '%s | CodeWander',
  },
  description: 'Explore tutorials, deep dives, and tools for modern developers. Covering AI, Web Dev, Apps, Cybersecurity, and DevOps.',
  keywords: ['tech blog', 'programming', 'AI', 'web development', 'tutorials', 'coding'],
  authors: [{ name: 'CodeWander Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codewander.dev',
    siteName: 'CodeWander',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@codewander',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4870405746698257"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}