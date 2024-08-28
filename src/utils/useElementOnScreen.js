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
    let refValue;
    const observer = new IntersectionObserver(callbackFunc, options);
    if (elementRef.current) {
      observer.observe(elementRef.current);
      refValue = elementRef.current;
    }

    return () => {
      if (refValue) {
        observer.unobserve(refValue);
      }
    };
  }, [elementRef, options]);

  return [elementRef, isVisible, isSeen];
};

export default useElementOnScreen;
