import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/styles';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ 
  trigger, 
  children, 
  align = 'right',
  className 
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-2 min-w-[200px]",
          "bg-[#2A2A2A] rounded-lg shadow-lg",
          "border border-accent/10",
          "py-1",
          align === 'right' ? 'right-0' : 'left-0',
          className
        )}>
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}

Dropdown.Item = function DropdownItem({ 
  children, 
  onClick,
  className,
  danger = false
}: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full px-4 py-2 text-left text-sm",
        "transition-colors",
        danger ? "text-rose-400 hover:bg-rose-400/10" : "text-accent/90 hover:bg-accent/5",
        className
      )}
    >
      {children}
    </button>
  );
};