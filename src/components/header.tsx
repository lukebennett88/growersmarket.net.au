import { Topbar } from './topbar';
import { Shopbar } from './shopbar';
import { Nav } from './nav';

function Header() {
  return (
    <header className="sticky top-0 z-10">
      <Topbar />
      <Shopbar />
      <Nav />
    </header>
  );
}

export { Header };
