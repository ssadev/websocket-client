import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessagesPanelProps {
  onSend: (event: string, data: any) => void;
  connected: boolean;
}

export default function MessagesPanel({ onSend, connected }: MessagesPanelProps) {
  const [event, setEvent] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'string' | 'json'>('string');

  const handleSend = () => {
    if (!event || !message || !connected) return;

    try {
      const data = messageType === 'json' ? JSON.parse(message) : message;
      onSend(event, data);
      setMessage('');
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="Event name"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={messageType}
          onChange={(e) => setMessageType(e.target.value as 'string' | 'json')}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="string">String</option>
          <option value="json">JSON</option>
        </select>
      </div>
      <div className="flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={messageType === 'json' ? '{"key": "value"}' : 'Message'}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
        <button
          onClick={handleSend}
          disabled={!connected}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}