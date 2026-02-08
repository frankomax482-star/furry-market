import { useEffect, useState } from 'react';
import { useThemeStore } from '../utils/store';

export default function ThemeProvider({ children }) {
  const { isDark, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check system preference on mount
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme-storage');
      
      if (savedTheme) {
        try {
          const theme = JSON.parse(savedTheme);
          setTheme(theme.state?.isDark ?? prefersDark);
        } catch {
          setTheme(prefersDark);
        }
      } else {
        setTheme(prefersDark);
      }
    }
  }, [setTheme]);

  useEffect(() => {
    if (!mounted) return;
    
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDark, mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return children;
  }

  return children;
}
