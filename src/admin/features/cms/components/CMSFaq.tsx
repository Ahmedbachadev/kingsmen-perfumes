import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import type { CMSFaqItem } from '../types/cms';

interface Props {
  data: CMSFaqItem[];
  onChange: (data: CMSFaqItem[]) => void;
}

export const CMSFaq: React.FC<Props> = ({ data, onChange }) => {
  const addQuestion = () => {
    const newItem: CMSFaqItem = {
      id: Date.now().toString(),
      question: 'New Question',
      answer: 'Answer goes here',
      sortOrder: data.length + 1,
      isActive: true
    };
    onChange([...data, newItem]);
  };

  const removeQuestion = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const handleChange = (id: string, field: keyof CMSFaqItem, value: any) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newData = [...data].sort((a, b) => a.sortOrder - b.sortOrder);
    const temp = newData[index].sortOrder;
    newData[index].sortOrder = newData[index - 1].sortOrder;
    newData[index - 1].sortOrder = temp;
    onChange(newData);
  };

  const moveDown = (index: number) => {
    if (index === data.length - 1) return;
    const newData = [...data].sort((a, b) => a.sortOrder - b.sortOrder);
    const temp = newData[index].sortOrder;
    newData[index].sortOrder = newData[index + 1].sortOrder;
    newData[index + 1].sortOrder = temp;
    onChange(newData);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-1">FAQ Section</h3>
          <p className="text-sm text-neutral-500">Manage frequently asked questions.</p>
        </div>
        <button
          type="button"
          onClick={addQuestion}
          className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      <div className="space-y-4">
        {data.sort((a, b) => a.sortOrder - b.sortOrder).map((item, index) => (
          <div key={item.id} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex gap-4 group">
            <div className="pt-2 flex flex-col gap-2 text-neutral-400">
              <button 
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="hover:text-neutral-900 disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
                title="Move Up"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
              <button 
                onClick={() => moveDown(index)}
                disabled={index === data.length - 1}
                className="hover:text-neutral-900 disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
                title="Move Down"
              >
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => handleChange(item.id, 'question', e.target.value)}
                    placeholder="Question"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 font-medium"
                  />
                </div>
                <div className="flex items-center gap-4 shrink-0 mt-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={item.isActive} 
                      onChange={(e) => handleChange(item.id, 'isActive', e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-900"></div>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeQuestion(item.id)}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <textarea
                  value={item.answer}
                  onChange={(e) => handleChange(item.id, 'answer', e.target.value)}
                  placeholder="Answer"
                  rows={3}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none text-sm"
                />
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
            <p className="text-neutral-500">No FAQ items yet. Click 'Add Question' to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
};
