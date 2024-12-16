import React from 'react';
import { Settings } from '../types';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export default function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const handleChange = (key: keyof Settings, value: string | number) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Handshake Path
          </label>
          <input
            type="text"
            value={settings.handshakePath}
            onChange={(e) => handleChange('handshakePath', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Handshake Timeout (ms)
          </label>
          <input
            type="number"
            value={settings.handshakeTimeout}
            onChange={(e) => handleChange('handshakeTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reconnection Delay (ms)
          </label>
          <input
            type="number"
            value={settings.reconnectionDelay}
            onChange={(e) => handleChange('reconnectionDelay', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Reconnection Delay (ms)
          </label>
          <input
            type="number"
            value={settings.reconnectionDelayMax}
            onChange={(e) => handleChange('reconnectionDelayMax', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reconnection Attempts
          </label>
          <input
            type="number"
            value={settings.reconnectionAttempts}
            onChange={(e) => handleChange('reconnectionAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}