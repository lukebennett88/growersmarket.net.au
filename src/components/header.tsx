import { Nav } from './nav';
import { Shopbar } from './shopbar';
import { Topbar } from './topbar';

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
