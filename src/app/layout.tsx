'use client';

import './globals.scss';
import CountrySearch from '@/components/semantic/CountrySearch/CountrySearch';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className="bg-white text-black px-6 py-3 min-h-screen flex flex-col items-center justify-center">
        <div className="app-container flex flex-col flex-1 items-center justify-center w-full relative">
          {/* Top-left favicon link */}
          {!isHomePage && (
            <Link
              href="/"
              className="absolute top-4 left-4 flex items-center gap-2 hover:opacity-80 transition"
            >
              <img
                src="/favicon.ico"
                alt="Home"
                className="w-6 h-6"
              />
            </Link>
          )}

          <header>
            <CountrySearch isCompact={!isHomePage} />
          </header>

          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
