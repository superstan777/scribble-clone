import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";

export const socket: Socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
  // socket.emit("ready", { playerId: socket.id });
});
