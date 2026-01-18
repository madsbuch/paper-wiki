import { useEffect, useRef } from 'react';

interface MathJaxProps {
  children: string;
  inline?: boolean;
  className?: string;
}

export default function MathJax({ children, inline = false, className = '' }: MathJaxProps) {
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && window.MathJax) {
      window.MathJax.typesetPromise([containerRef.current]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, [children]);

  const Component = inline ? 'span' : 'div';
  const math = inline ? `$${children}$` : `$$${children}$$`;

  return (
    <Component ref={containerRef as any} className={className}>
      {math}
    </Component>
  );
}

declare global {
  interface Window {
    MathJax?: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>;
    };
  }
}
