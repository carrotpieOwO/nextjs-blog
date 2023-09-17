import { useState, useEffect, RefObject } from 'react';

function useVisibility<T extends HTMLElement>(ref: RefObject<T>): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.03, // 구성 요소가 표시되는 것으로 간주되어야 하는 시기를 제어하려면 이 값을 조정합니다.
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}

export default useVisibility;