import React from 'react';
import { UserAvatar } from '../UserAvatar';
import { DummyDataToggle } from '../DummyDataToggle';
import { Tabs } from '../ui/Tabs';
import { TABS, TabType } from '../../constants/tabs';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (id: TabType) => void;
  useDummyData: boolean;
  onToggleDummyData: () => void;
}

export function Header({ 
  activeTab, 
  onTabChange,
  useDummyData,
  onToggleDummyData
}: HeaderProps) {
  return (
    <header className="bg-[#333333] sticky top-0 z-30 border-b border-accent/10">
      <div className="px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <h1 className="text-[1.15rem] font-normal text-accent font-questrial tracking-wider">
              Sanlara Finance
            </h1>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <Tabs
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={(id) => onTabChange(id as TabType)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DummyDataToggle
              enabled={useDummyData}
              onToggle={onToggleDummyData}
            />
            <UserAvatar 
              onLogout={() => {
                console.log('Logging out...');
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}