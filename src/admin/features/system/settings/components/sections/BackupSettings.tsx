import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { Database, Download, UploadCloud } from 'lucide-react';
import { format } from 'date-fns';

export const BackupSettings: React.FC = () => {
 // Mock data for backup since cloud backups are not implemented per requirements
 const lastBackup = new Date();

 return (
 <SettingsSection>
 <SettingsCard 
 title="Database Backups" 
 description="Manage your store's data snapshots."
 >
 <div className="flex items-center justify-between p-6 bg-neutral-50 border border-neutral-200 rounded-xl">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
 <Database className="w-6 h-6" />
 </div>
 <div>
 <h4 className="font-medium text-neutral-900 flex items-center gap-2">
 System Healthy
 <span className="w-2 h-2 rounded-full bg-green-500"></span>
 </h4>
 <p className="text-sm text-neutral-500">
 Last auto-backup: {format(lastBackup, 'MMM dd, yyyy HH:mm')}
 </p>
 </div>
 </div>
 </div>

 <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
 <button className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors text-neutral-900 font-medium">
 <Download className="w-4 h-4" />
 Create Manual Backup
 </button>
 <button className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors text-neutral-900 font-medium">
 <UploadCloud className="w-4 h-4" />
 Restore from Backup
 </button>
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
