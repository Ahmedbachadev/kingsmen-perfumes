import React, { createContext, useContext, useEffect, useState } from 'react';
import type { StoreSettings } from '../types/settings';
import { getStoreSettings, updateSettingsSection } from '../services/settingsService';

interface SettingsContextType {
  settings: StoreSettings | null;
  draftSettings: StoreSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  error: Error | null;
  isDirty: boolean;
  updateDraft: <K extends keyof StoreSettings>(section: K, data: StoreSettings[K]) => void;
  saveSettings: <K extends keyof StoreSettings>(section: K) => Promise<void>;
  resetSettings: () => void;
  refetchSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [draftSettings, setDraftSettings] = useState<StoreSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getStoreSettings();
      setSettings(data);
      setDraftSettings(data);
      setIsDirty(false);
    } catch (err: any) {
      console.error('Failed to load settings:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateDraft = <K extends keyof StoreSettings>(section: K, data: StoreSettings[K]) => {
    if (!draftSettings) return;
    setDraftSettings({ ...draftSettings, [section]: data });
    setIsDirty(true);
  };

  const saveSettings = async <K extends keyof StoreSettings>(section: K) => {
    if (!draftSettings) return;
    try {
      setIsSaving(true);
      await updateSettingsSection(section, draftSettings[section]);
      
      // Update original settings with the newly saved section
      setSettings((prev) => {
        if (!prev) return prev;
        return { ...prev, [section]: draftSettings[section] };
      });
      setIsDirty(false);
    } catch (err: any) {
      console.error(`Failed to save ${section} settings:`, err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const resetSettings = () => {
    if (!settings) return;
    setDraftSettings({ ...settings });
    setIsDirty(false);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        draftSettings,
        isLoading,
        isSaving,
        error,
        isDirty,
        updateDraft,
        saveSettings,
        resetSettings,
        refetchSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
};
