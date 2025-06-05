"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, setTheme } = useTheme()
  const [previousTheme, setPreviousTheme] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Store the current theme when the component mounts
  useEffect(() => {
    // Only run this once on mount
    if (!mounted) {
      // Remember the current theme for later
      if (theme && theme !== 'light') {
        setPreviousTheme(theme)
      }
      // Force light theme
      setTheme('light')
      setMounted(true)
    }
  }, [theme, setTheme, mounted])

  // Store the theme preference in localStorage for later retrieval
  useEffect(() => {
    if (previousTheme) {
      localStorage.setItem('vexxa-previous-theme', previousTheme)
    }
  }, [previousTheme])

  return <>{children}</>
}
