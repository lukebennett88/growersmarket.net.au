/**
 * See https://usehooks.com/useOnClickOutside/ for details
 *
 * Example of how to use this hook:
 *
 * import { useOnClickOutside } from '../hooks';
 *
 *  // Create a ref that we add to the element
 *  // for which we want to detect * outside clicks
 *  const ref = useRef();
 *
 * // Function that gets called when we click outside of the ref
 * function handleClose() {
 *    setMobileMenuOpen(false);
 *  }
 *
 *  // Call hook passing in the ref and a function to call on outside click
 *  useOnClickOutside(ref, handleClose);
 */

import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export { useOnClickOutside };
