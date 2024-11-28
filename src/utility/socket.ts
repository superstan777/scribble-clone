import { io, Socket } from "socket.io-client";

// const SERVER_URL = "http://localhost:3001";
const SERVER_URL = "https://scribble-clone-backend-iw1g.onrender.com";

export const socket: Socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});
