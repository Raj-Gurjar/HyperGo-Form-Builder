import { useDraggable } from '@dnd-kit/core';
import { FieldType } from '~/types/form';

interface ToolboxItemProps {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
}

const ToolboxItem = ({ type, label, icon }: ToolboxItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `toolbox-${type}`,
    data: {
      type,
      isToolboxItem: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm cursor-move flex items-center space-x-3
        ${isDragging ? 'opacity-50' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
    >
      <div className="text-blue-500">{icon}</div>
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </div>
  );
};

export default function FormToolbox() {
  const tools = [
    {
      type: 'text' as FieldType,
      label: 'Text Input',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
    },
    {
      type: 'textarea' as FieldType,
      label: 'Text Area',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      ),
    },
    {
      type: 'dropdown' as FieldType,
      label: 'Dropdown',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      ),
    },
    {
      type: 'checkbox' as FieldType,
      label: 'Checkbox',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      type: 'date' as FieldType,
      label: 'Date Picker',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Form Fields</h2>
      <div className="space-y-2">
        {tools.map((tool) => (
          <ToolboxItem key={tool.type} {...tool} />
        ))}
      </div>
    </div>
  );
} 