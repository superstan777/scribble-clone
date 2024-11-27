// import { io, Socket } from "socket.io-client";

// const SERVER_URL = "http://localhost:3001";

// export const socket: Socket = io(SERVER_URL);

// socket.on("connect", () => {
//   console.log("Socket connected:", socket.id);
// });

import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";
// const SERVER_URL = "https://scribble-clone-backend.vercel.app:3001";

// Retrieve stored socket ID from localStorage
const storedSocketId = localStorage.getItem("socketId");

export const socket: Socket = io(SERVER_URL, {
  auth: {
    socketId: storedSocketId || null,
  },
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
  // Save the current socket ID for future sessions
  localStorage.setItem("socketId", socket.id!);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
