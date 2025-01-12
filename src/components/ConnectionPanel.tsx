import React, { useState } from "react";
import { Power, PowerOff } from "lucide-react";

interface ConnectionPanelProps {
  connected: boolean;
  headers: Record<string, string>;
  params: Record<string, string>;
  onConnect: (
    url: string,
    params: Record<string, string>,
    headers: Record<string, string>
  ) => void;
  onDisconnect: () => void;
}

export default function ConnectionPanel({
  connected,
  onConnect,
  onDisconnect,
  headers,
  params,
}: ConnectionPanelProps) {
  const [url, setUrl] = useState("");

  const handleConnect = () => {
    if (!connected && url) {
      onConnect(url, params, headers);
    } else {
      onDisconnect();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="WebSocket URL (ws:// or wss://)"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleConnect}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            connected
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {connected ? (
            <>
              <PowerOff size={18} /> Disconnect
            </>
          ) : (
            <>
              <Power size={18} /> Connect
            </>
          )}
        </button>
      </div>
    </div>
  );
}
