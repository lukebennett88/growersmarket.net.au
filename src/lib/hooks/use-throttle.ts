import * as React from 'react';

function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastRan = React.useRef(Date.now());

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = window.setTimeout(() => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));

      return () => window.clearTimeout(handler);
    }
  }, [value, limit]);

  return throttledValue;
}

export { useThrottle };
