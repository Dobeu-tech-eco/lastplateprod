import type { ReactNode } from 'react';
import { SavePlateLogo } from '@/components/SavePlateLogo';

export function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <nav aria-label="Documentation" className="container mx-auto flex items-center gap-6">
          <a href="/" aria-label="SavePlate home"><SavePlateLogo /></a>
          <a href="/docs">Documentation</a>
          <a href="/docs/getting-started">Getting Started</a>
          <a href="/docs/api-reference">API Reference</a>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-12">{children}</main>
    </div>
  );
}
