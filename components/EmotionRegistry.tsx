'use client';

import createCache from '@emotion/cache';
import { CacheProvider }  from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState, type ReactNode } from 'react';

export function EmotionRegistry({ children }: { children: ReactNode }) {
  const [registry] = useState(() => {
    const cache = createCache({ key: 'mui' });
    cache.compat = true;

    let inserted: string[] = [];
    const origInsert = cache.insert.bind(cache);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (cache as any).insert = (...args: any[]) => {
      const serialized = args[1] as { name: string };
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (origInsert as any)(...args);
    };

    return {
      cache,
      flush() {
        const prev = inserted;
        inserted = [];
        return prev;
      },
    };
  });

  useServerInsertedHTML(() => {
    const names = registry.flush();
    if (!names.length) return null;
    const styles = names
      .map((n) => registry.cache.inserted[n])
      .filter(Boolean)
      .join('');
    return (
      <style
        key={registry.cache.key}
        data-emotion={`${registry.cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
