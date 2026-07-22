import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SettingsService } from '../services/settings.service';
import type { StoreSettings } from '../types';

interface SettingsContextType {
 settings: StoreSettings | null;
 loading: boolean;
 activeTab: string;
 setActiveTab: (tab: string) => void;
 updateSettings: (category: keyof Omit<StoreSettings, 'id' | 'updated_at'>, data: any) => void;
 saveChanges: () => Promise<void>;
 resetChanges: () => void;
 hasUnsavedChanges: boolean;
 isSaving: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 const [originalSettings, setOriginalSettings] = useState<StoreSettings | null>(null);
 const [settings, setSettings] = useState<StoreSettings | null>(null);
 const [loading, setLoading] = useState(true);
 const [isSaving, setIsSaving] = useState(false);
 const [activeTab, setActiveTab] = useState('general');
 const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

 const fetchSettings = async () => {
 setLoading(true);
 const data = await SettingsService.getSettings();
 setOriginalSettings(data ? JSON.parse(JSON.stringify(data)) : null);
 setSettings(data ? JSON.parse(JSON.stringify(data)) : null);
 setHasUnsavedChanges(false);
 setLoading(false);
 };

 useEffect(() => {
 fetchSettings();
 }, []);

 const updateSettings = useCallback((category: keyof Omit<StoreSettings, 'id' | 'updated_at'>, data: any) => {
 setSettings(prev => {
 if (!prev) return prev;
 const next = { ...prev, [category]: data };
 setHasUnsavedChanges(JSON.stringify(next) !== JSON.stringify(originalSettings));
 return next;
 });
 }, [originalSettings]);

 const saveChanges = async () => {
 if (!settings || !hasUnsavedChanges) return;
 setIsSaving(true);
 try {
 // Find which categories changed and save them
 for (const key of Object.keys(settings) as Array<keyof StoreSettings>) {
 if (key !== 'id' && key !== 'updated_at' && JSON.stringify(settings[key]) !== JSON.stringify(originalSettings?.[key])) {
 await SettingsService.updateSettingsCategory(key as any, settings[key]);
 }
 }
 setOriginalSettings(JSON.parse(JSON.stringify(settings)));
 setHasUnsavedChanges(false);
 } catch (error) {
 console.error('Failed to save settings', error);
 throw error;
 } finally {
 setIsSaving(false);
 }
 };

 const resetChanges = useCallback(() => {
 setSettings(originalSettings ? JSON.parse(JSON.stringify(originalSettings)) : null);
 setHasUnsavedChanges(false);
 }, [originalSettings]);

 // Warn before unload
 useEffect(() => {
 const handleBeforeUnload = (e: BeforeUnloadEvent) => {
 if (hasUnsavedChanges) {
 e.preventDefault();
 e.returnValue = '';
 }
 };
 window.addEventListener('beforeunload', handleBeforeUnload);
 return () => window.removeEventListener('beforeunload', handleBeforeUnload);
 }, [hasUnsavedChanges]);

 return (
 <SettingsContext.Provider value={{
 settings,
 loading,
 activeTab,
 setActiveTab,
 updateSettings,
 saveChanges,
 resetChanges,
 hasUnsavedChanges,
 isSaving
 }}>
 {children}
 </SettingsContext.Provider>
 );
};

export const useSettings = () => {
 const context = useContext(SettingsContext);
 if (context === undefined) {
 throw new Error('useSettings must be used within a SettingsProvider');
 }
 return context;
};
