'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/orders', label: 'Orders' },
  { href: '/fulfillment', label: 'Fulfillment Analysis' },
  { href: '/recommendations', label: 'Recommendations' },
  { href: '/workflows', label: 'Workflows' },
  { href: '/settings', label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          {links.map(({ href, label }) => (
            <li key={href} className="mb-2">
              <Link href={href}>
                <p
                  className={`block p-2 rounded hover:bg-gray-700 ${pathname === href ? 'bg-gray-700' : ''}`}>
                  {label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
