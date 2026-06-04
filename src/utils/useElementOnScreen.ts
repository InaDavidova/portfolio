import { RefObject, useCallback, useEffect, useRef, useState } from "react";

/**
 * Observes an element's intersection with the viewport (or a custom root)
 * and reports whether it is currently visible. The observer is cleaned up
 * automatically on unmount or when the options change.
 */
function useElementOnScreen<T extends Element = HTMLDivElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { root = null, rootMargin = "0px", threshold = 0 } = options ?? {};

  const callbackFunc: IntersectionObserverCallback = useCallback((entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const node = elementRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(callbackFunc, {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [callbackFunc, root, rootMargin, threshold]);

  return [elementRef, isVisible];
}

export default useElementOnScreen;
