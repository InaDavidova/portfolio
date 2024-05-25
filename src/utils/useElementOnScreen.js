import { useEffect, useRef, useState } from "react";

const useElementOnScreen = (options) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSeen, setIsSeen] = useState(false);

  const callbackFunc = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    if (entry.isIntersecting) {
      setIsSeen(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunc, options);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, options]);

  return [elementRef, isVisible, isSeen];
};

export default useElementOnScreen;
