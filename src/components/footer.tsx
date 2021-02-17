import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import siteNavigation from '../data/site-navigation.json';
import siteSettings from '../data/site-settings.json';
import { ContactForm } from './contact-form';

function Footer() {
  const [
    categories,
    information,
    myAccount,
  ] = siteNavigation.footerNavigation.navLinks;
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-light">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="px-4 py-12 mx-auto max-w-screen-2xl sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-7 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/">
              <a className="block mx-auto max-w-max">
                <Image
                  src="/logo.png"
                  width={200}
                  height={107}
                  layout="intrinsic"
                  alt="Growers Market"
                  className="drop-shadow"
                />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12 sm:grid-cols-3 xl:mt-0 xl:col-span-3">
            <div className="col-span-2 sm:col-span-3">
              <h3 className="text-xl font-bold tracking-wider text-green-dark">
                Links
              </h3>
            </div>
            <div>
              <h4 className="font-bold tracking-wider text-green-dark">
                {categories.subHeading}
              </h4>
              <ul className="mt-4 space-y-4">
                {siteNavigation.footerNavigation.collectionPages.map(
                  ({ id, route, title }) => (
                    <FooterLink key={id} route={route} title={title} />
                  )
                )}
                {categories.links.map(({ id, route, title }) => (
                  <FooterLink key={id} route={route} title={title} />
                ))}
              </ul>
            </div>
            <div>
              <div>
                <h4 className="font-bold tracking-wider text-green-dark">
                  {information.subHeading}
                </h4>
                <ul className="mt-4 space-y-4">
                  {information.links.map(({ id, route, title }) => (
                    <FooterLink key={id} route={route} title={title} />
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h4 className="font-bold tracking-wider text-green-dark">
                  {myAccount.subHeading}
                </h4>
                <ul className="mt-4 space-y-4">
                  {myAccount.links.map(({ id, route, title }) => (
                    <FooterLink key={id} route={route} title={title} />
                  ))}
                </ul>
              </div>
              <div className="hidden mt-12 sm:block">
                <h4 className="font-bold tracking-wider text-green-dark">
                  Follow Us
                </h4>
                <ul className="mt-4 space-y-4">
                  {siteSettings?.socialLinks.map(({ socialNetwork, link }) => (
                    <FooterLink
                      key={socialNetwork}
                      title={socialNetwork}
                      route={link}
                      url
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="sm:hidden">
              <h4 className="font-bold tracking-wider text-green-dark">
                Follow Us
              </h4>
              <ul className="mt-4 space-y-4">
                {siteSettings?.socialLinks.map(({ socialNetwork, link }) => (
                  <FooterLink
                    key={`${socialNetwork} ${link}`}
                    title={socialNetwork}
                    route={link}
                    url
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-8 mt-12 xl:mt-0 xl:col-span-3">
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="text-xl font-bold tracking-wider text-green-dark">
                Contact Us
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="pt-8 mt-12 border-t border-gray-200">
          <p>
            <a
              href="https://www.phirannodesigns.com.au"
              className="text-base text-gray-400 hover:text-gray-900"
            >
              Website by Phiranno Designs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface IFooterLink {
  route: string;
  title: string;
  url?: boolean;
}

function FooterLink({ route, title, url }: IFooterLink): ReactElement {
  return (
    <li>
      <a
        href={`${url ? '' : '/'}${route}`}
        className="text-base text-gray-500 hover:text-gray-900"
      >
        {title}
      </a>
    </li>
  );
}

export { Footer };
