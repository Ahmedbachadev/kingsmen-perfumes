import React from 'react';
import { cn } from '../../../../../utils/cn';

interface SettingsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 label: string;
 description?: string;
 error?: string;
}

export const SettingsInput: React.FC<SettingsInputProps> = ({ 
 label, 
 description, 
 error, 
 className,
 ...props 
}) => {
 return (
 <div className="w-full">
 <label className="block text-sm font-medium text-neutral-900 mb-1">
 {label}
 </label>
 {description && (
 <p className="text-sm text-neutral-500 mb-2">{description}</p>
 )}
 <input
 className={cn(
 "w-full px-4 py-2 bg-white border rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow",
 error 
 ? "border-red-500 focus:ring-red-500" 
 : "border-neutral-200 ",
 className
 )}
 {...props}
 />
 {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
 </div>
 );
};
