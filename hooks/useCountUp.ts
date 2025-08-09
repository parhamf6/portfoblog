// hooks/useCountUp.ts
import { useState, useEffect } from 'react';

export const useCountUp = (target: number, start: boolean) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    const duration = 2000; // Animation duration in ms
    const startTime = Date.now();
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = Math.floor(easeOutQuart * target);
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, start]);
  
  return count;
};