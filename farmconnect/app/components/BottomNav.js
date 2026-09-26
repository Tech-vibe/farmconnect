'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './Icons';

const NAV_ITEMS = [
  { href: '/',               Icon: Icons.Home,      label: 'Home' },
  { href: '/discover',       Icon: Icons.Discover,  label: 'Discover' },
  { href: '/policy-matcher', Icon: Icons.Policies,  label: 'Policies' },
  { href: '/register',       Icon: Icons.Register,  label: 'Register' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ href, Icon, label }) => {
        const isActive = href === '/'
          ? pathname === '/'
          : pathname.startsWith(href);

        return (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <div className={`bottom-nav-item${isActive ? ' active' : ''}`}>
              <Icon />
              <span className="bottom-nav-label">{label}</span>
              <div className="bottom-nav-dot" />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
