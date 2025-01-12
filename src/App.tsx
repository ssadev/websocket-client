import React, { useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/Tabs";
import ConnectionPanel from "./components/ConnectionPanel";
import MessagesPanel from "./components/MessagesPanel";
import EventsPanel from "./components/EventsPanel";
import ParamsPanel from "./components/ParamsPanel";
import HeadersPanel, { Header } from "./components/HeadersPanel";
import SettingsPanel from "./components/SettingsPanel";
import MessageLog from "./components/MessageLog";
import { Settings, Message } from "./types";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [params, setParams] = useState<{ key: string; value: string }[]>([]);

  const [settings, setSettings] = useState<Settings>({
    handshakePath: "/socket.io",
    handshakeTimeout: 20000,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  const connect = useCallback(
    (
      url: string,
      params: Record<string, string>,
      headers: Record<string, string>
    ) => {
      if (socket) {
        socket.disconnect();
      }
      const query = new URLSearchParams(params).toString();
      const newSocket = io(url + (query ? `?${query}` : ""), {
        path: settings.handshakePath,
        timeout: settings.handshakeTimeout,
        reconnectionDelay: settings.reconnectionDelay,
        reconnectionDelayMax: settings.reconnectionDelayMax,
        reconnectionAttempts: settings.reconnectionAttempts,
        extraHeaders: headers,
      });

      newSocket.on("connect", () => {
        setConnected(true);
        addMessage("system", "Connected to server");
      });

      newSocket.on("disconnect", () => {
        setConnected(false);
        addMessage("system", "Disconnected from server");
      });

      newSocket.on("connect_error", (error) => {
        addMessage("error", `Connection error: ${error.message}`);
      });

      events.forEach((event) => {
        newSocket.on(event, (data) => {
          addMessage("received", data, event);
        });
      });

      setSocket(newSocket);
    },
    [events, settings]
  );

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket]);

  const addMessage = (type: string, data: unknown, event?: string) => {
    setMessages((prev) => [
      {
        id: Date.now(),
        timestamp: new Date(),
        type,
        event,
        data,
      },
      ...prev,
    ]);
  };

  const sendMessage = useCallback(
    (event: string, data: unknown) => {
      if (socket && connected) {
        socket.emit(event, data);
        addMessage("sent", data, event);
      }
    },
    [socket, connected]
  );

  const addEvent = useCallback(
    (event: string) => {
      if (!events.includes(event)) {
        setEvents((prev) => [...prev, event]);
        if (socket) {
          socket.on(event, (data) => {
            addMessage("received", data, event);
          });
        }
      }
    },
    [socket, events]
  );

  const removeEvent = useCallback(
    (event: string) => {
      setEvents((prev) => prev.filter((e) => e !== event));
      if (socket) {
        socket.off(event);
      }
    },
    [socket]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <ConnectionPanel
          connected={connected}
          onConnect={connect}
          headers={headers.reduce((acc: Record<string, string>, obj) => {
            acc[obj.key] = obj.value;
            return acc;
          }, {})}
          params={params.reduce((acc: Record<string, string>, obj) => {
            acc[obj.key] = obj.value;
            return acc;
          }, {})}
          onDisconnect={disconnect}
        />

        <Tabs defaultValue="messages">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="params">Params</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <MessagesPanel onSend={sendMessage} connected={connected} />
          </TabsContent>

          <TabsContent value="events">
            <EventsPanel
              events={events}
              onAddEvent={addEvent}
              onRemoveEvent={removeEvent}
            />
          </TabsContent>

          <TabsContent value="params">
            <ParamsPanel params={params} addParam={setParams} />
          </TabsContent>

          <TabsContent value="headers">
            <HeadersPanel headers={headers} addHeader={setHeaders} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel settings={settings} onSettingsChange={setSettings} />
          </TabsContent>
        </Tabs>

        <MessageLog messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

export default App;
