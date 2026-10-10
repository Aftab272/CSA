import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'csa_theme';

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('csa-theme');
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch (e) {
    // ignore local storage errors
  }
  // User explicitly asked for default to be white / light mode
  return 'light';
}

function applyThemeToDocument(nextTheme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', nextTheme);
  
  if (nextTheme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#111827';
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
    document.body.style.backgroundColor = '#050816';
    document.body.style.color = '#ffffff';
  }

  try {
    localStorage.setItem(STORAGE_KEY, nextTheme);
    localStorage.setItem('csa-theme', nextTheme);
  } catch (e) {
    // ignore
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
