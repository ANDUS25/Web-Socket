import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Connection is initiated".socket);
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Hello World!</h1>");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
