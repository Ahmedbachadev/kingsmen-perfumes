import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { SiteConfig } from '../admin/features/cms/types/cms';
import { cmsService } from '../admin/features/cms/services/cmsService';

interface CMSContextType {
  config: SiteConfig;
  draftConfig: SiteConfig;
  updateDraft: (newConfig: SiteConfig) => void;
  publishChanges: () => void;
  resetToDefault: () => void;
  isDirty: boolean;
  isPreviewMode: boolean;
  setPreviewMode: (val: boolean) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publishedConfig, setPublishedConfig] = useState<SiteConfig>(cmsService.getPublishedConfig());
  const [draftConfig, setDraftConfig] = useState<SiteConfig>(cmsService.getDraftConfig());
  const [isPreviewMode, setPreviewMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // Check if draft differs from published
    const publishedStr = JSON.stringify(publishedConfig);
    const draftStr = JSON.stringify(draftConfig);
    setIsDirty(publishedStr !== draftStr);
  }, [publishedConfig, draftConfig]);

  // Sync state between tabs if another tab changes localStorage
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'kingsmen_cms_published') {
        setPublishedConfig(cmsService.getPublishedConfig());
      }
      if (e.key === 'kingsmen_cms_draft') {
        setDraftConfig(cmsService.getDraftConfig());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateDraft = useCallback((newConfig: SiteConfig) => {
    setDraftConfig(newConfig);
    cmsService.saveDraft(newConfig);
  }, []);

  const publishChanges = useCallback(() => {
    cmsService.publish(draftConfig);
    setPublishedConfig(draftConfig);
  }, [draftConfig]);

  const resetToDefault = useCallback(() => {
    cmsService.resetToDefault();
    const newDraft = cmsService.getDraftConfig();
    setDraftConfig(newDraft);
  }, []);

  // What the frontend sees
  const activeConfig = isPreviewMode ? draftConfig : publishedConfig;

  return (
    <CMSContext.Provider value={{
      config: activeConfig,
      draftConfig,
      updateDraft,
      publishChanges,
      resetToDefault,
      isDirty,
      isPreviewMode,
      setPreviewMode
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMSContext = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMSContext must be used within a CMSProvider');
  }
  return context;
};
