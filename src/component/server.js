const express = require('express');
const app = express();
const cors = require("cors");
const port = 4000;

const http = require('http');
const server = http.Server(app);
const url = `http://localhost:${port}`



const socketio = require("socket.io")(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

socketio.on("connection", (socket) => {
    socket.on("message", (message) => {
      socketio.emit("message", message);
      console.log(`message: ${message}`);
    });
  });

  

server.listen(port, function() {
    console.log(`Running ${port}`);
});
