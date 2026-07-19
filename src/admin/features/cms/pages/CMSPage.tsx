import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { useCMSContext } from '../../../../contexts/CMSContext';
import { Save, Eye, EyeOff, RotateCcw, UploadCloud } from 'lucide-react';
import { CMSHero } from '../components/CMSHero';
import { CMSAbout } from '../components/CMSAbout';
import { CMSCollections } from '../components/CMSCollections';
import { CMSFaq } from '../components/CMSFaq';
import { CMSNewsletter } from '../components/CMSNewsletter';
import { CMSFooter } from '../components/CMSFooter';
import { CMSSeo } from '../components/CMSSeo';

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'collections', label: 'Collections' },
  { id: 'faq', label: 'FAQ' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'footer', label: 'Footer' },
  { id: 'seo', label: 'SEO' },
];

const CMSPage: React.FC = () => {
  const { 
    draftConfig, 
    updateDraft, 
    publishChanges, 
    resetToDefault,
    isDirty,
    isPreviewMode,
    setPreviewMode
  } = useCMSContext();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [autoSave, setAutoSave] = useState(true);
  const [justPublished, setJustPublished] = useState(false);

  // If autosave is on, updateDraft saves to localStorage automatically within context
  const handleChange = (section: string, data: any) => {
    updateDraft({
      ...draftConfig,
      [section]: data
    });
  };

  const handlePublish = () => {
    publishChanges();
    setJustPublished(true);
    setTimeout(() => setJustPublished(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all CMS content back to the default Kingsmen Perfumes template? This cannot be undone.')) {
      resetToDefault();
    }
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'hero':
        return <CMSHero data={draftConfig.hero} onChange={(data) => handleChange('hero', data)} />;
      case 'about':
        return <CMSAbout data={draftConfig.about} onChange={(data) => handleChange('about', data)} />;
      case 'collections':
        return <CMSCollections data={draftConfig.collections} onChange={(data) => handleChange('collections', data)} />;
      case 'faq':
        return <CMSFaq data={draftConfig.faq} onChange={(data) => handleChange('faq', data)} />;
      case 'newsletter':
        return <CMSNewsletter data={draftConfig.newsletter} onChange={(data) => handleChange('newsletter', data)} />;
      case 'footer':
        return <CMSFooter data={draftConfig.footer} onChange={(data) => handleChange('footer', data)} />;
      case 'seo':
        return <CMSSeo data={draftConfig.seo} onChange={(data) => handleChange('seo', data)} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <PageHeader 
          title="Website CMS" 
          description="Manage homepage content and site configurations."
          breadcrumbs={[{ label: 'CMS' }]}
        />
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-neutral-600 mr-4 cursor-pointer">
            <input 
              type="checkbox" 
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            Auto-save Draft
          </label>
          
          <button
            onClick={() => setPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isPreviewMode ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {isPreviewMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isPreviewMode ? 'Previewing Draft' : 'Preview Mode'}
          </button>

          {!autoSave && isDirty && (
            <button
              onClick={() => updateDraft(draftConfig)} // Just explicitly trigger a save
              className="flex items-center gap-2 bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-medium"
            >
              <Save className="w-4 h-4" /> Save Draft
            </button>
          )}

          <button
            onClick={handlePublish}
            disabled={!isDirty && !justPublished}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              justPublished 
                ? 'bg-green-600 text-white'
                : isDirty 
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                  : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            {justPublished ? 'Published!' : 'Publish Changes'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-8 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 shrink-0 bg-white rounded-xl border border-neutral-200 shadow-sm p-4 overflow-y-auto">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-neutral-900 text-white' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
          </div>
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 overflow-y-auto pb-20 custom-scrollbar pr-4">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default CMSPage;
