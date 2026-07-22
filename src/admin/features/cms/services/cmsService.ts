import { type SiteConfig, defaultSiteConfig } from '../types/cms';

const STORAGE_KEY_DRAFT = 'kingsmen_cms_draft';
const STORAGE_KEY_PUBLISHED = 'kingsmen_cms_published';

export const cmsService = {
  getDraftConfig(): SiteConfig {
    const stored = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse CMS draft config', e);
      }
    }
    return this.getPublishedConfig();
  },

  getPublishedConfig(): SiteConfig {
    const stored = localStorage.getItem(STORAGE_KEY_PUBLISHED);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse CMS published config', e);
      }
    }
    return defaultSiteConfig;
  },

  saveDraft(config: SiteConfig): void {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(config));
  },

  publish(config: SiteConfig): void {
    localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(config));
    // Also update draft to match published
    this.saveDraft(config);
  },

  resetToDefault(): void {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(defaultSiteConfig));
  },
  
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY_DRAFT);
    localStorage.removeItem(STORAGE_KEY_PUBLISHED);
  }
};
