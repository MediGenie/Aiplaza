import { useCallback, useEffect, useRef } from 'react';

export function useInteractionObserver(fetch) {
  const target = useRef(null);

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await fetch();
        observer.observe(entry.target);
      }
    },
    [fetch],
  );

  useEffect(() => {
    if (target.current !== null) {
      const observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target.current);
      return () => observer.disconnect();
    }
  }, [onIntersect]);

  return target;
}
