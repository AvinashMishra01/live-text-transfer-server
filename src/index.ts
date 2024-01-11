import { Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const isDev = app.settings.env === "development";
const URL = isDev ? "http://localhost:3000" : process.env.FRONTEND_URL;
app.use(
  cors({
    origin: URL,
  })
);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: URL,
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("getText", (userText: string) => {
    socket.broadcast.emit("newText", userText);
  });
});

httpServer.listen(process.env.PORT || 5000);
