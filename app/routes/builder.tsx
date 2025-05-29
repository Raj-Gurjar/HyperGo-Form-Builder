import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import Header from '~/components/Header';
import FormToolbox from '~/components/FormToolbox';
import FormCanvas from '~/components/FormCanvas';
import { FormField, FieldType } from '~/types/form';

export default function Builder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

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
        <div className="flex">
          <FormToolbox />
          <FormCanvas
            fields={fields}
            selectedFieldId={selectedFieldId}
            onFieldSelect={setSelectedFieldId}
            onFieldUpdate={handleFieldUpdate}
            onFieldDelete={handleFieldDelete}
            onFieldReorder={handleFieldReorder}
          />
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
    </div>
  );
} 