'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './Icons';

const LINKS = [
  { href: '/discover',        label: 'Discover' },
  { href: '/policy-matcher',  label: 'Policies' },
  { href: '/register',        label: 'Register' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <div className="navbar-brand-icon">
            <Icons.Leaf />
          </div>
          FarmConnect
        </Link>
        <div className="navbar-links">
          {LINKS.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(l.href + '/');
            return (
              <Link key={l.href} href={l.href} className={`navbar-link${isActive ? ' active' : ''}`}>
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
