import { RefObject, useEffect, useRef } from "react";

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onClickOutside: () => void
): void {
  const callbackRef = useRef(onClickOutside);

  useEffect(() => {
    callbackRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target;
      if (
        ref.current &&
        target instanceof Node &&
        !ref.current.contains(target)
      ) {
        callbackRef.current();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callbackRef.current();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [ref]);
}

export default useClickOutside;
