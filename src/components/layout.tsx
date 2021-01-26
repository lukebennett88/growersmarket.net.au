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
      {/* <Breakpoint /> */}
    </div>
  );
}

function Breakpoint() {
  return (
    <div className="fixed bottom-0 w-full px-4 py-3 mx-auto font-bold text-center bg-white border-t shadow max-w-screen-2xl sm:px-6 lg:px-8">
      <div className="sm:hidden">Mobile</div>
      <div className="hidden sm:block md:hidden">SM</div>
      <div className="hidden md:block lg:hidden">MD</div>
      <div className="hidden lg:block xl:hidden">LG</div>
      <div className="hidden xl:block">XL</div>
    </div>
  );
}

export { Layout };
