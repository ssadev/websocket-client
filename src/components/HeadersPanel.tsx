import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export interface Header {
  key: string;
  value: string;
}
export interface HeadersPanelProps {
  headers: Header[],
  addHeader: (headers: Header[]) => void
}

export default function HeadersPanel({ headers, addHeader }: HeadersPanelProps) {
  // const [headers, setHeaders] = useState<Header[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAdd = () => {
    if (newKey && newValue) {
      addHeader([...headers, { key: newKey, value: newValue }]);
      // setHeaders([...headers, { key: newKey, value: newValue }]);
      setNewKey('');
      setNewValue('');
    }
  };

  const handleRemove = (index: number) => {
    addHeader(headers.filter((_, i) => i !== index));
    // setHeaders(headers.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Header key"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Header value"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="space-y-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
          >
            <div className="flex-1 flex gap-2">
              <span className="font-medium">{header.key}:</span>
              <span>{header.value}</span>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-600"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}