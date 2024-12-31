import { Switch } from '../ui/Switch';
import { LucideIcon } from 'lucide-react';

interface SettingToggleProps {
  icon: LucideIcon;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

export default function SettingToggle({
  icon: Icon,
  title,
  description,
  enabled,
  onChange
}: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}