import { useEffect } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>;
    };
  }
}

/**
 * Global component that triggers MathJax typesetting on navigation.
 * This ensures math formulas are rendered correctly when navigating
 * between pages without a full page reload.
 */
export default function MathJaxTypeset() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is updated after navigation
    const timeout = setTimeout(() => {
      if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([document.body]).catch((err: Error) =>
          console.error("MathJax typesetting failed:", err),
        );
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
