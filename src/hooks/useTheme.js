import { useCallback, useEffect, useState } from 'react';

// index.html resolves the initial theme before first paint (localStorage,
// falling back to the system preference); this hook only reads and flips it.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'day'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === 'night' ? 'dark' : 'light';
    localStorage.setItem('jw-theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(t => (t === 'night' ? 'day' : 'night'));
  }, []);

  return { theme, toggle };
}
