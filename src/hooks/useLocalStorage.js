import { useState, useEffect } from 'react';

/**
 * useLocalStorage — a useState-compatible hook that persists its value to
 * localStorage under `key`, reading it back on mount. Used for workout
 * plans and workout history so progress survives a page refresh.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can fail (private browsing, quota) — fail silently.
    }
  }, [key, value]);

  return [value, setValue];
}
