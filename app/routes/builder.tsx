import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams, Link } from '@remix-run/react';
import Header from '~/components/Header';
import FormToolbox from '~/components/FormToolbox';
import FormCanvas from '~/components/FormCanvas';
import { FormField, FieldType } from '~/types/form';

export default function Builder() {
  const [searchParams] = useSearchParams();
  const formId = searchParams.get('form') || `form_${uuidv4()}`;
  const [formName, setFormName] = useState('Untitled Form');
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [tempFormName, setTempFormName] = useState('');

  // Load saved form from localStorage on component mount
  useEffect(() => {
    const savedForm = localStorage.getItem(formId);
    if (savedForm) {
      const formData = JSON.parse(savedForm);
      setFields(formData.fields || []);
      setFormName(formData.name || 'Untitled Form');
      setIsEditing(true);
    }
  }, [formId]);

  const handleSaveClick = () => {
    setTempFormName(formName);
    setShowSaveModal(true);
  };

  const handleSaveForm = () => {
    if (!tempFormName.trim()) {
      alert('Please enter a form name');
      return;
    }
    
    const formData = {
      name: tempFormName,
      fields,
      lastModified: new Date().toISOString()
    };
    localStorage.setItem(formId, JSON.stringify(formData));
    setFormName(tempFormName);
    setShowSaveModal(false);
    alert('Form saved successfully!');
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeData = active.data.current as { type: FieldType; isToolboxItem: boolean };

      if (activeData.isToolboxItem) {
        const newField: FormField = {
          id: uuidv4(),
          type: activeData.type,
          label: `New ${activeData.type} field`,
          required: false,
          ...(activeData.type === 'text' || activeData.type === 'textarea' ? {
            placeholder: `Enter ${activeData.type}...`
          } : {}),
          ...(activeData.type === 'dropdown' ? {
            options: ['Option 1', 'Option 2', 'Option 3']
          } : {})
        };

        setFields((prevFields) => [...prevFields, newField]);
        setSelectedFieldId(newField.id);
      } else {
        const oldIndex = fields.findIndex((field) => field.id === active.id);
        const newIndex = fields.findIndex((field) => field.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newFields = [...fields];
          const [movedField] = newFields.splice(oldIndex, 1);
          newFields.splice(newIndex, 0, movedField);
          setFields(newFields);
        }
      }
    }

    setActiveId(null);
  };

  const handleFieldUpdate = (updatedField: FormField) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === updatedField.id ? updatedField : field))
    );
  };

  const handleFieldDelete = (id: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
    if (selectedFieldId === id) {
      setSelectedFieldId(null);
    }
  };

  const handleFieldReorder = (reorderedFields: FormField[]) => {
    setFields(reorderedFields);
  };

  const getDragOverlayContent = () => {
    if (!activeId) return null;
    
    const field = fields.find(f => f.id === activeId);
    if (field) {
      return field.label;
    }
    
    // For toolbox items
    return activeId.replace('toolbox-', '');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap">
          <FormToolbox />
          <div className="flex-1">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-4">
                <Link
                  to="/my-forms"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ← Back to My Forms
                </Link>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="px-3 py-2 text-xl text-blue-500 font-semibold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:text-white"
                  placeholder="Untitled Form"
                />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSaveClick}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Save Form
                </button>
              </div>
            </div>
            <FormCanvas
              fields={fields}
              selectedFieldId={selectedFieldId}
              onFieldSelect={setSelectedFieldId}
              onFieldUpdate={handleFieldUpdate}
              onFieldDelete={handleFieldDelete}
              onFieldReorder={handleFieldReorder}
            />
          </div>
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <span className="text-gray-700 dark:text-gray-300">
                {getDragOverlayContent()}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Save Form
            </h2>
            <div className="mb-4">
              <label htmlFor="formName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Form Name
              </label>
              <input
                type="text"
                id="formName"
                value={tempFormName}
                onChange={(e) => setTempFormName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter form name"
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveForm}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 