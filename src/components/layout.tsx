import * as React from 'react';

import { Header } from './header';
import { Footer } from './footer';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className="relative flex flex-col min-h-screen font-sans antialiased bg-white text-gray-dark fill-available">
      <SkipNavLink
        contentId="main-content"
        className="absolute left-0 ml-4 font-bold border border-white focus:z-30 bg-yellow text-green-dark top-4 sm:ml-6 lg:ml-8"
      >
        <div className="px-4 py-2 border border-dashed border-green-dark">
          Skip Nav
        </div>
      </SkipNavLink>
      <Header />
      <SkipNavContent id="main-content" />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* <Breakpoint /> */}
    </div>
  );
}

// function Breakpoint() {
//   return (
//     <div className="fixed bottom-0 w-full px-4 py-3 mx-auto font-bold text-center bg-white border-t shadow max-w-screen-2xl sm:px-6 lg:px-8">
//       <div className="sm:hidden">Mobile</div>
//       <div className="hidden sm:block md:hidden">SM</div>
//       <div className="hidden md:block lg:hidden">MD</div>
//       <div className="hidden lg:block xl:hidden">LG</div>
//       <div className="hidden xl:block">XL</div>
//     </div>
//   );
// }

export { Layout };
