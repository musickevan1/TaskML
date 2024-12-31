import { useState } from 'react';
import { Bell, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { Toggle } from '../ui/Toggle';
import { ToggleGroup } from '../ui/ToggleGroup';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    mentions: true,
    updates: false
  });

  const handleChange = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <ToggleGroup
        label="Email Preferences"
        description="Control how you receive email notifications"
      >
        <Toggle
          icon={Mail}
          label="Email Notifications"
          description="Receive task updates and reminders via email"
          checked={settings.emailNotifications}
          onChange={() => handleChange('emailNotifications')}
        />
        
        <Toggle
          icon={AlertCircle}
          label="Important Updates"
          description="Get notified about critical changes and updates"
          checked={settings.updates}
          onChange={() => handleChange('updates')}
        />
      </ToggleGroup>

      <ToggleGroup
        label="Push Notifications"
        description="Manage your real-time notifications"
      >
        <Toggle
          icon={Bell}
          label="Push Notifications"
          description="Get instant notifications on your device"
          checked={settings.pushNotifications}
          onChange={() => handleChange('pushNotifications')}
        />
        
        <Toggle
          icon={MessageSquare}
          label="Task Reminders"
          description="Get reminded about upcoming and overdue tasks"
          checked={settings.taskReminders}
          onChange={() => handleChange('taskReminders')}
        />
      </ToggleGroup>
    </div>
  );
}