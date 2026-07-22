import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RotateCcw, AlertCircle, Loader2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { cn } from '../../../../../utils/cn';

export const UnsavedChangesBar: React.FC = () => {
 const { hasUnsavedChanges, isSaving, saveChanges, resetChanges } = useSettings();

 const handleSave = async () => {
 try {
 await saveChanges();
 // Normally we'd use a toast here (e.g. react-hot-toast)
 // Since it's global we rely on the context state to clear the bar
 } catch (error) {
 console.error(error);
 }
 };

 return (
 <AnimatePresence>
 {hasUnsavedChanges && (
 <motion.div
 initial={{ y: 100, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 exit={{ y: 100, opacity: 0 }}
 className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl"
 >
 <div className="bg-neutral-900 text-white p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 ">
 <div className="flex items-center gap-3">
 <div className="p-2 bg-white/10 rounded-full">
 <AlertCircle className="w-5 h-5" />
 </div>
 <div>
 <p className="font-medium text-sm">Unsaved changes</p>
 <p className="text-xs text-neutral-400 ">You have modified your settings.</p>
 </div>
 </div>
 
 <div className="flex items-center gap-3 w-full sm:w-auto">
 <button
 onClick={resetChanges}
 disabled={isSaving}
 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
 >
 <RotateCcw className="w-4 h-4" />
 Reset
 </button>
 <button
 onClick={handleSave}
 disabled={isSaving}
 className={cn(
 "flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-xl transition-all",
 "bg-white text-neutral-900 hover:bg-neutral-200",
 "",
 "disabled:opacity-50 disabled:cursor-not-allowed"
 )}
 >
 {isSaving ? (
 <Loader2 className="w-4 h-4 animate-spin" />
 ) : (
 <Save className="w-4 h-4" />
 )}
 {isSaving ? 'Saving...' : 'Save Changes'}
 </button>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
};
