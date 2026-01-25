import { useEffect, useRef } from "react";

interface MathJaxProps {
  children: string;
  inline?: boolean;
  className?: string;
}

export default function MathJax({
  children,
  inline = false,
  className = "",
}: MathJaxProps) {
  useEffect(() => {
    if (containerRef.current && window.MathJax) {
      window.MathJax.typesetPromise([containerRef.current]).catch(
        (err: Error) => console.error("MathJax typesetting failed:", err),
      );
    }
  }, [children]);

  if (inline) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const containerRef = useRef<HTMLSpanElement>(null);

    const math = inline ? `$${children}$` : `$$${children}$$`;

    return (
      <span ref={containerRef} className={className}>
        {math}
      </span>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const containerRef = useRef<HTMLDivElement>(null);

  const math = inline ? `$${children}$` : `$$${children}$$`;

  return (
    <div ref={containerRef} className={className}>
      {math}
    </div>
  );
}
