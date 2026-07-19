import React from 'react';
import { Cloud, HardDrive, Download, RotateCcw } from 'lucide-react';

export const BackupSettings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Database Backups</h3>
        <p className="text-sm text-neutral-500">Manage data backups. Cloud backups are handled automatically by Supabase.</p>
      </div>

      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white rounded-full border border-neutral-200 shadow-sm flex items-center justify-center">
            <Cloud className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-neutral-900">Cloud Backup Status</h4>
            <p className="text-sm text-neutral-500">Active and running daily via Supabase PITR</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-neutral-200">
            <span className="block text-xs text-neutral-500 uppercase font-semibold mb-1">Last Backup</span>
            <span className="block font-medium text-neutral-900">Today, 03:00 AM</span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-neutral-200">
            <span className="block text-xs text-neutral-500 uppercase font-semibold mb-1">Database Size</span>
            <span className="block font-medium text-neutral-900">42 MB</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" /> Manual Backup
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" /> Restore Point
          </button>
        </div>
      </div>
    </div>
  );
};
