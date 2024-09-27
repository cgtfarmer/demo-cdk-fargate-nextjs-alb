'use client'

import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { usePathname } from 'next/navigation';

interface NavbarLink {
  name: string;

  path: string;
};

const navbarLinks: NavbarLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Users', path: '/users' }
];

function matchesCurrentPath(path: string) {
  const pathname = usePathname();

  return [path, `${path}/`].includes(pathname);
};

export default function Component() {
  const navLinks = navbarLinks.map((link) => {
    return (
      <Link key={link.name} href={link.path} passHref legacyBehavior>
        <Nav.Link active={matchesCurrentPath(link.path)}>
          {link.name}
        </Nav.Link>
      </Link>
    );
  });

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-3">
      <Link href="/" passHref legacyBehavior>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="navbar-top" />

      <Navbar.Collapse id="navbar-top">
        <Nav className="me-auto">
          {navLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
