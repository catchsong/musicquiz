const express = require('express');
const app = express();
const cors = require("cors");
const port = 5000;

const http = require('http');
const server = http.Server(app);
const url = `http://localhost:${port}`
let idx = 0

const socketio = require("socket.io")(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

socketio.on("connection", (socket) => {
    socket.on("message", (message) => {
      if(message[1]==message[2])
      {
        socketio.emit("message", message);
        socketio.emit("correct",message);
        idx = idx+1;
        if(idx > 2)
          idx = 0;
        socketio.emit("index",idx);
        //console.log(`correct: ${message}`);
      }
      else
      {
        socketio.emit("message", message);
        //console.log(`message: ${message}`);
      }
    });
    
  });

  

server.listen(port, function() {
    console.log(`Running ${port}`);
});
// db 유저 정보 
