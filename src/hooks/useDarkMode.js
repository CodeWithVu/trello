import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme') || 'system'
  })

  const [darkMode, setDarkMode] = useState(() => {
    const saveMode = localStorage.getItem('theme')
    if (saveMode === 'dark') return true
    if (saveMode === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    let currentMode = false

    const updateTheme = () => {
      if (mode === 'system') {
        localStorage.removeItem('theme')
        currentMode = mediaQuery.matches
      } else {
        localStorage.setItem('theme', mode)
        currentMode = (mode === 'dark')
      }

      setDarkMode(currentMode)

      if (currentMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    updateTheme()

    if (mode === 'system') {
      mediaQuery.addEventListener('change', updateTheme)
      return () => mediaQuery.removeEventListener('change', updateTheme)
    }
  }, [mode])

  return [darkMode, setMode, mode]
}
