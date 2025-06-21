
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      defaultTheme="dark" 
      forcedTheme="dark"
      enableSystem={false}
      enableColorScheme={false}
      attribute="class"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// Export a custom useTheme hook that always returns dark theme
export const useTheme = () => {
  return {
    theme: 'dark',
    setTheme: () => {}, // No-op function since theme is forced to dark
    systemTheme: 'dark',
    resolvedTheme: 'dark',
    themes: ['dark']
  };
};
