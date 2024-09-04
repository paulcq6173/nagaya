import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import Footer from '@/app/_components/Footer';
import Hero from '@/app/_components/Hero';

import '@/app/globals.css';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nagaya',
  description: 'All Popular Cartoon and Anime Collection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <main className="max-w-7xl mx-auto bg-[#0F1117]">
          <Hero />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
