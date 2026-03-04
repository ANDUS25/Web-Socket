import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Connection event

wss.on("connection", (socket, request) => {
  socket.on("message", (rawData) => {
    const data = rawData.toString();
    console.log("rawData", data);
  });

  socket.on("error", () => {
    console.error("This is an error", error);
  });

  socket.on("close", () => {
    console.log("Client is disconnected");
  });
});

console.log("WebSocket server is running on wss://localhost:8080");

// to run this on client side in terminal of the VSCode
// type wscat -c ws:localhost:8080
