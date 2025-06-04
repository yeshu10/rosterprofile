"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from "@/components/Navbar";
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Provider store={store}>
          <Navbar />
          <main className="min-h-screen bg-gray-100 text-gray-900">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
