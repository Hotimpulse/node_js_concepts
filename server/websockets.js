import { WebSocketServer } from "ws";

const PORT = 5000;

const wss = new WebSocketServer(
  {
    port: PORT
  },
  () => console.log(`Server started on port ${PORT}`)
);

wss.on("connection", (ws) => {
  ws.id = Date.now();

  ws.on("message", (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message, id) {
  wss.clients.forEach((client) => {
    // if (client.id === id) {
    //   client.send(JSON.stringify(message));
    // }
    client.send(JSON.stringify(message));
  });
}
