import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    // No URL needed — io() connects to the same host that served the page,
    // which is our custom server with Socket.IO attached
    socket = io({ autoConnect: false });
  }
  return socket;
}
