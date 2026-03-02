import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Connection event 

wss.on('connection',(socket, request)=>{
  
})