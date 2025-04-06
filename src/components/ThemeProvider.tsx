
"use client";

import * as React from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vibe-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  // Initialize theme from localStorage on mount only
  React.useEffect(() => {
    const getThemeFromStorage = () => {
      try {
        const storedTheme = localStorage.getItem(storageKey);
        if (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system") {
          return storedTheme as Theme;
        }
        return defaultTheme;
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        return defaultTheme;
      }
    };

    setTheme(getThemeFromStorage());
  }, [storageKey, defaultTheme]);

  // Update document classes when theme changes
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Handle theme changes and storage
  const handleSetTheme = React.useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
    setTheme(newTheme);
  }, [storageKey]);

  // Create a memoized value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      theme,
      setTheme: handleSetTheme,
    }),
    [theme, handleSetTheme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
