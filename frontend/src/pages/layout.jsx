'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import ThemeProvider from '@/context/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <title>FURRY MARKET - Маркетплей фурри-товаров</title>
        <meta name="description" content="FURRY MARKET - лучший маркетплей фурри-товаров и аксессуаров" />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff'
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
