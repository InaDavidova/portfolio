import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function useScrollToAnchor(): void {
  const location = useLocation();
  const lastHash = useRef<string>("");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      timeoutId = setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        lastHash.current = "";
      }, 100);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [location.hash]);
}

export default useScrollToAnchor;
