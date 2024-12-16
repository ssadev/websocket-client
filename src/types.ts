export interface Settings {
  handshakePath: string;
  handshakeTimeout: number;
  reconnectionDelay: number;
  reconnectionDelayMax: number;
  reconnectionAttempts: number;
}

export interface Message {
  id: number;
  timestamp: Date;
  type: string;
  event?: string;
  data: any;
}