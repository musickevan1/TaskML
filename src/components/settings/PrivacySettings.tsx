import { useState } from 'react';
import SettingToggle from './SettingToggle';
import { Eye, Lock, Share2 } from 'lucide-react';

export default function PrivacySettings() {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    taskSharing: true,
    activityTracking: false
  });

  const handleChange = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Control your privacy and data sharing preferences.
        </p>
      </div>

      <div className="space-y-4">
        <SettingToggle
          icon={Eye}
          title="Profile Visibility"
          description="Allow others to see your profile and activity"
          enabled={settings.profileVisibility}
          onChange={() => handleChange('profileVisibility')}
        />

        <SettingToggle
          icon={Share2}
          title="Task Sharing"
          description="Enable task sharing with team members"
          enabled={settings.taskSharing}
          onChange={() => handleChange('taskSharing')}
        />

        <SettingToggle
          icon={Lock}
          title="Activity Tracking"
          description="Allow tracking of task completion metrics"
          enabled={settings.activityTracking}
          onChange={() => handleChange('activityTracking')}
        />
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-md">
        <p className="text-sm text-yellow-700">
          Your privacy is important to us. We never share your personal data with third parties
          without your explicit consent.
        </p>
      </div>
    </div>
  );
}