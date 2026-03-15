import colors from "colors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { Events } from "./utils/String.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // using this cors because front and server(db and `web-socket) are running on different port
  cors: {
    // using "*" for all client those who hit this web socket url
    origin: "*",
  },
});

io.on(Events.CONNECTION, (socket) => {
  console.log("Connection is initiated", colors.bold.bgGreen(socket.id));

  socket.on(Events.JOIN_ROOM, async ({ userName }) => {
    // console.log(`${userName} has joined the room.`);

    await socket.join(Events.GROUP);

    // Emit to all users in the group, including the joining user
    io.to(Events.GROUP).emit(Events.NEW_USER_JOINED, {
      message: `${userName} has joined the room!`,
      user: Events.SYSTEM,
    });
  });

  socket.on(Events.CHAT_MESSAGE, async ({ message, user }) => {
    // console.log("message", message);

    await socket.join(Events.GROUP);

    io.to(Events.GROUP).emit(Events.NEW_CHAT_MESSAGE, { message, user });
  });
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Hello World!</h1>");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
