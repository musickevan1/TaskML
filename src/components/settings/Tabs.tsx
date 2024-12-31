interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="border-b border-electric-500/10">
      <nav className="flex -mb-px overflow-x-auto" aria-label="Settings tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm
              focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2
              transition-colors duration-200
              ${activeTab === tab.id
                ? 'border-electric-500 text-electric-500'
                : 'border-transparent text-cyber-white/70 hover:text-cyber-white hover:border-electric-500/30'}
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}