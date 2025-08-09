// useAnimateInView.ts
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const useAnimateInView = (threshold = 0.2, triggerOnce = true) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);
  
  return { ref, inView: hasAnimated || inView };
};