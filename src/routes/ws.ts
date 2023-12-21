import { WebSocketServer } from 'ws';
import type { RequestHandler } from '@sveltejs/kit'; // Import SvelteKit types

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  ws.on('message', (message: string) => {
    // Broadcast the message to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

export const get: RequestHandler = async ({ request }) => {
  // Upgrade the request to a WebSocket connection
  if (request.headers.get('upgrade') !== 'websocket') {
    return {
      status: 426,
      body: 'Expected WebSocket request'
    };
  }

  const { socket, response } = await request.webSocket();
  wss.handleUpgrade(request, socket, Buffer.alloc(0), (ws) => {
    wss.emit('connection', ws, request);
  });

  return response;
};
