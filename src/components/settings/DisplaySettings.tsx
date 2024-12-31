import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Theme } from '../../types/theme';
import { Moon, Monitor } from 'lucide-react';
import { Toggle } from '../ui/Toggle';
import { ToggleGroup } from '../ui/ToggleGroup';
import CyberButton from '../ui/CyberButton';

export default function DisplaySettings() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    darkMode: theme === 'midnight',
    compactView: true,
  });
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: selectedTheme === 'midnight'
    }));
  }, [selectedTheme]);

  const handleThemeSelect = (newTheme: Theme) => {
    setSelectedTheme(newTheme);
    setHasChanges(true);
  };

  const handleSettingChange = (key: keyof typeof settings) => {
    if (key === 'darkMode') {
      const newTheme = !settings.darkMode ? 'midnight' : 'solar';
      setSelectedTheme(newTheme);
    }
    
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      setHasChanges(true);
      return newSettings;
    });
  };

  const handleApplyChanges = () => {
    setTheme(selectedTheme);
    setHasChanges(false);
  };

  return (
    <div className="space-y-8">
      <ToggleGroup
        label="Theme"
        description="Choose your preferred color theme"
      >
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[
            { id: 'solar', name: 'Solar', description: 'Light theme with warm, energetic tones' },
            { id: 'midnight', name: 'Midnight', description: 'Dark theme with deep, calming colors' },
            { id: 'ocean', name: 'Ocean', description: 'Medium contrast with cool, professional blues' },
            { id: 'forest', name: 'Forest', description: 'Nature-inspired green palette' }
          ].map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => handleThemeSelect(themeOption.id as Theme)}
              className={`theme-card ${selectedTheme === themeOption.id ? 'active' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full bg-primary`} />
                <div className="text-left">
                  <p className="font-medium">{themeOption.name}</p>
                  <p className="text-sm text-text/70">{themeOption.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ToggleGroup>

      <ToggleGroup
        label="Display Options"
        description="Customize your viewing experience"
      >
        <Toggle
          icon={Moon}
          label="Dark Mode"
          description="Use dark theme for reduced eye strain"
          checked={settings.darkMode}
          onChange={() => handleSettingChange('darkMode')}
        />

        <Toggle
          icon={Monitor}
          label="Compact View"
          description="Show more content with reduced spacing"
          checked={settings.compactView}
          onChange={() => handleSettingChange('compactView')}
        />
      </ToggleGroup>

      {hasChanges && (
        <div className="flex justify-end pt-4">
          <CyberButton
            onClick={handleApplyChanges}
            className="w-full sm:w-auto"
          >
            Apply Changes
          </CyberButton>
        </div>
      )}
    </div>
  );
}