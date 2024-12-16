import React from 'react';
import { Message } from '../types';
import ReactJson from 'react-json-view';

interface MessageLogProps {
  messages: Message[];
}

export default function MessageLog({ messages }: MessageLogProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Message Log</h2>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${message.type === 'sent'
              ? 'bg-blue-50'
              : message.type === 'received'
                ? 'bg-green-50'
                : message.type === 'error'
                  ? 'bg-red-50'
                  : 'bg-gray-50'
              }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                {message.timestamp.toLocaleTimeString()}
              </span>
              <span
                className={`text-sm font-medium ${message.type === 'sent'
                  ? 'text-blue-600'
                  : message.type === 'received'
                    ? 'text-green-600'
                    : message.type === 'error'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
              >
                {message.type.toUpperCase()}
                {message.event && ` - ${message.event}`}
              </span>
            </div>
            <div className="text-sm">
              {typeof message.data === 'object' ? (
                <ReactJson
                  src={message.data}
                  theme="monokai"
                  name={false}
                  collapsed={2}
                  displayDataTypes={false}
                />
              ) : (
                <pre className="whitespace-pre-wrap">{message.data}</pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}