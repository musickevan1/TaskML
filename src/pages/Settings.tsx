import { useState } from 'react';
import { Tabs } from '../components/settings/Tabs';
import NotificationSettings from '../components/settings/NotificationSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import AccountSettings from '../components/settings/AccountSettings';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');

  const tabs = [
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'account', label: 'Account' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-cyber-white mb-6">Settings</h1>
      
      <div className="bg-space-800 shadow-neon rounded-lg">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        
        <div className="p-6">
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'account' && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}