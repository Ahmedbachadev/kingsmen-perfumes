import React from 'react';
import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon: Icon,
  label,
  isCollapsed,
}) => {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
          isActive
            ? 'bg-neutral-100 text-neutral-900 font-medium'
            : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
        }`
      }
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          className="whitespace-nowrap overflow-hidden"
        >
          {label}
        </motion.span>
      )}
    </NavLink>
  );
};
