import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import colors from "colors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173/",
  },
});

io.on("connection", (socket) => {
  console.log("Connection is initiated", colors.bold.bgGreen(socket.id));

  socket.on("joinRoom", (userInfo) => {
    console.log(`${userInfo.name} has joined the room.`);
  });
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Hello World!</h1>");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
