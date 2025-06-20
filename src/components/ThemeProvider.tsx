
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider defaultTheme="dark" storageKey="vibe-ui-theme" forcedTheme="dark" {...props}>{children}</NextThemesProvider>
}

// Export the useTheme hook
export const useTheme = useNextTheme
