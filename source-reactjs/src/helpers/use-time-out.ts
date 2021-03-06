import { useState, useEffect } from 'react';
/**
 * custom hooks
 * return state use time out 
 */

export default (value: string, timeout: number) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);
    return () => clearTimeout(handler);
  }, [value, timeout]);

  return state;
}