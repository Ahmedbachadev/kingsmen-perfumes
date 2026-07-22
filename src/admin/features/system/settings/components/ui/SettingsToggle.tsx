import React from 'react';
import { cn } from '../../../../../utils/cn';

interface SettingsToggleProps {
 label: string;
 description?: string;
 checked: boolean;
 onChange: (checked: boolean) => void;
}

export const SettingsToggle: React.FC<SettingsToggleProps> = ({ 
 label, 
 description, 
 checked, 
 onChange 
}) => {
 return (
 <div className="flex items-start justify-between py-2">
 <div className="pr-4">
 <label className="block text-sm font-medium text-neutral-900 ">
 {label}
 </label>
 {description && (
 <p className="text-sm text-neutral-500 mt-1">{description}</p>
 )}
 </div>
 <button
 type="button"
 role="switch"
 aria-checked={checked}
 onClick={() => onChange(!checked)}
 className={cn(
 "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mt-1",
 checked ? "bg-black " : "bg-neutral-200 "
 )}
 >
 <span
 aria-hidden="true"
 className={cn(
 "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
 checked ? "translate-x-5" : "translate-x-0"
 )}
 />
 </button>
 </div>
 );
};
