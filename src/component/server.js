const express = require('express');
const app = express();
const cors = require("cors");
const port = 4000;

const http = require('http');
const server = http.Server(app);
const url = `http://localhost:${port}`
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // 몽고디비 서버에 연결
    console.log("Connected to mongod server");
});


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
