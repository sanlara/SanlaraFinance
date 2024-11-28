import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Dropdown } from './ui/Dropdown';

interface UserAvatarProps {
  onLogout?: () => void;
}

export function UserAvatar({ onLogout }: UserAvatarProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-accent/5 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <User className="w-5 h-5 text-accent" />
          </div>
          <span className="text-sm font-medium text-accent">Ricardo Sánchez</span>
        </div>
      }
    >
      <Dropdown.Item onClick={handleLogout} danger>
        <div className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
}