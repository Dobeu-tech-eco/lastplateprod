import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function CodeBlock({ code, language }: { code: string; language: string }) {
  const [status, setStatus] = useState('Copy');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Copied');
    } catch {
      setStatus('Copy failed');
    }
  };
  return (
    <div className="relative rounded-md bg-muted p-4">
      <Button variant="outline" size="sm" onClick={copy} aria-label="Copy code">{status}</Button>
      <pre className="overflow-x-auto"><code className={`language-${language}`}>{code}</code></pre>
      <span role="status" className="sr-only">{status}</span>
    </div>
  );
}
