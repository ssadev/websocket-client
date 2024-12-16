import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface EventsPanelProps {
  events: string[];
  onAddEvent: (event: string) => void;
  onRemoveEvent: (event: string) => void;
}

export default function EventsPanel({ events, onAddEvent, onRemoveEvent }: EventsPanelProps) {
  const [newEvent, setNewEvent] = useState('');

  const handleAdd = () => {
    if (newEvent && !events.includes(newEvent)) {
      onAddEvent(newEvent);
      setNewEvent('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Event name to listen"
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
        {events.map((event) => (
          <div
            key={event}
            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
          >
            <span>{event}</span>
            <button
              onClick={() => onRemoveEvent(event)}
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