import React, { ReactNode } from 'react';

interface SettingsCardProps {
 title: string;
 description?: string;
 children: ReactNode;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, children }) => {
 return (
 <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-6 shadow-sm">
 <div className="p-6 border-b border-neutral-200 ">
 <h3 className="text-lg font-medium text-neutral-900 ">{title}</h3>
 {description && (
 <p className="text-sm text-neutral-500 mt-1">{description}</p>
 )}
 </div>
 <div className="p-6 space-y-6">
 {children}
 </div>
 </div>
 );
};

export const SettingsSection: React.FC<{ children: ReactNode }> = ({ children }) => {
 return (
 <div className="space-y-6 max-w-4xl">
 {children}
 </div>
 );
};
