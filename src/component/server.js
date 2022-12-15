const express = require('express');
const app = express();
const cors = require("cors");
const port = 5000;
const axios = require('axios');

const http = require('http');
const server = http.Server(app);
const url = `http://localhost:${port}`
let max_idx = 0

const socketio = require("socket.io")(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
});

axios.get('http://localhost:4000/quizdb')
  .then((result) => {
    max_idx = result.data.length - 1
  })
  .catch();

socketio.on("connection", (socket) => {
  socket.on("join",(userName) => {
    socketio.emit("user_connect",`${userName} 님이 입장했습니다.`)
    console.log(`${userName} 입장`);
    socket.on("send_message", (message) => {
      if(message[1]==message[2])
      {
        socketio.emit("message", message);
        socketio.emit("correct",message);
        console.log(`correct: ${message}`);
      }
      else
      {
        socketio.emit("message", message);
      }
    });
    socket.on("master_index", (tmp_idx) => {
      if(tmp_idx>max_idx)
        tmp_idx=0;
      socketio.emit("index", tmp_idx);
    });  
    socket.on("game_start", (idx) => {
      socketio.emit("start_settings", idx);
      console.log('start');
    }); 
  });
});



server.listen(port, function() {
    console.log(`Running ${port}`);
});
// db 유저 정보 
