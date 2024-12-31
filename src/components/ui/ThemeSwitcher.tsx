import { useTheme } from '../../contexts/ThemeContext';
import { Theme } from '../../types/theme';
import { Palette } from 'lucide-react';

const themeOptions: { value: Theme; label: string }[] = [
  { value: 'solar', label: 'Solar' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'forest', label: 'Forest' }
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Palette className="h-5 w-5 text-primary/70" />
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="bg-surface border border-primary/20 rounded-md px-2 py-1
                 text-sm text-primary focus:outline-none focus:ring-2
                 focus:ring-primary/50 theme-transition"
      >
        {themeOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}