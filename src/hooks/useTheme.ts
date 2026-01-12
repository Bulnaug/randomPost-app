import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return (saved as Theme) || "light"
  })

  useEffect(() => {
    const root = window.document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return { theme, setTheme }
}