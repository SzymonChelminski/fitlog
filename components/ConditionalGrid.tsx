'use client';

/**
 * ConditionalGrid
 *
 * Renders the animated grid background only on /dashboard.
 * Kept as a separate thin wrapper so layout.tsx can remain a server component
 * while usePathname (client-only hook) is isolated here.
 */

import { usePathname } from 'next/navigation';
import { GridBackground } from './GridBackground';

export function ConditionalGrid() {
  const pathname = usePathname();
  if (pathname !== '/dashboard') return null;
  return <GridBackground />;
}
