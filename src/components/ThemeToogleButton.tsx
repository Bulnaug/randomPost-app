// components/ThemeToggleButton.tsx
import { useTheme } from "../hooks/useTheme";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      className="
        absolute top-4 right-4
        p-2 rounded-full
        bg-gray-200 dark:bg-gray-700
        hover:scale-105 transition
        z-50
      "
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}