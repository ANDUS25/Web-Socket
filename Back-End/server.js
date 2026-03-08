import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import colors from "colors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // using this cors because front and server(db and web-socket) are running on different port
  cors: {
    // using "*" for all client those who hit this web socket url
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection is initiated", colors.bold.bgGreen(socket.id));

  socket.on("joinRoom", async ({ userName }) => {
    console.log(`${userName} has joined the room.`);

    await socket.join("group");

    // Emit to all users in the group, including the joining user
    io.to("group").emit("newUserJoined", {
      message: `${userName} has joined the room!`,
      user: "System",
    });
  });

  socket.on("ChatMessage", async ({ message, user }) => {
    console.log("message", message);

    await socket.join("group");

    io.to("group").emit("newChatMessage", { message, user });
  });
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Hello World!</h1>");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
