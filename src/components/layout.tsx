import * as React from 'react';

import { Header } from './header';
import { Footer } from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased bg-white text-gray-dark fill-available">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export { Layout };
